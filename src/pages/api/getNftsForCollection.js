import { Network, Alchemy } from 'alchemy-sdk';

import { nftDropContractAddress } from '../../config/contractAddresses';

export default async function handler(req, res) {
  const { pageKey, pageSize } = JSON.parse(req.body);

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  console.log(chain);

  const settings = {
    //apiKey: process.env.ALCHEMY_API_KEY,
    apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH',
    network: Network.MATIC_MAINNET,
  };
  const alchemy = new Alchemy(settings);

  try {
    const nfts = await alchemy.nft.getNftsForContract(nftDropContractAddress, {
      pageKey: pageKey ? pageKey : null,
      pageSize: pageSize ? pageSize : null,
    });
    const formattedNfts = nfts.nfts.map((nft) => {
      const { contract, title, tokenType, tokenId, description, media } = nft;

      return {
        contract: contract.address,
        symbol: contract.symbol,
        media: media[0]?.gateway
          ? media[0]?.gateway
          : 'https://via.placeholder.com/500',
        collectionName: contract.openSea?.collectionName,
        verified: contract.openSea?.safelistRequestStatus,
        tokenType,
        tokenId,
        title,
        description,
        format: media[0]?.format ? media[0]?.format : 'png',
      };
    });

    const filteredNfts = formattedNfts.filter(
      (nft) => nft.title.length && nft.description.length && nft.media
    );

    res.status(200).json({
      nfts: filteredNfts.length ? filteredNfts : null,
      pageKey: nfts.pageKey,
    });
    // the rest of your code
  } catch (e) {
    console.warn(e);
    res.status(500).send({
      message: 'something went wrong, check the log in your terminal',
    });
  }
}
