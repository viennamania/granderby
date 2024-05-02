import type { NextApiRequest, NextApiResponse } from 'next';

import { Network, Alchemy } from 'alchemy-sdk';

import { nftDropContractAddressHorse } from '@/config/contractAddresses';
import { all } from 'axios';

import { setHorseNftByTokenId } from '@/utils/models/horse-model';

/*
export default async function handler(req, res) {


  const { pageKey, pageSize } = JSON.parse(req.body);

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

*/

export default async function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  //const { pageKey, pageSize } = req.query;

  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    ///apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH',
    network: Network.MATIC_MAINNET,
  };
  const alchemy = new Alchemy(settings);

  try {
    let allNfts = [] as any;

    let pageKey = '';
    let pageSize = 100;

    do {
      const nfts = await alchemy.nft.getNftsForContract(
        nftDropContractAddressHorse,
        {
          pageKey: pageKey ? pageKey : null,
          pageSize: pageSize ? pageSize : null,
        }
      );

      // update nfthorses

      nfts.nfts.forEach(async (nft) => {
        const result = await setHorseNftByTokenId(nft.tokenId, nft);

        allNfts.push(nft.tokenId);
      });

      console.log('pageKey', nfts.pageKey);

      pageKey = nfts.pageKey ? nfts.pageKey : '';

      //allNfts = allNfts.concat(nfts.nfts);
    } while (pageKey !== '');

    res.status(200).json({
      nfts: allNfts,
    });

    // the rest of your code
  } catch (e) {
    console.warn(e);
    res.status(500).send({
      message: 'something went wrong, check the log in your terminal',
    });
  }
}
