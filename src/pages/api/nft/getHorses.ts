// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { getAllHorses } from '@/utils/models/horse-model';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  const { pageNumber, pageSize } = req.query;

  const { grades, manes, holder, sort } = req.body;

  //console.log('getHorses grades', grades);
  //console.log('getHorses manes', manes);
  //console.log('getHorses holder', holder);

  var nfts = [] as any;

  const data = await getAllHorses(
    Number(pageNumber),
    Number(pageSize),
    grades,
    manes,
    holder,
    sort
  );

  ///console.log('getHorses data====', data);

  nfts = data.nfts;

  //console.log("nfts count", data.nfts.length);

  //console.log("nfts", data.nfts);

  const pageKey = data.pageNumber;

  const formattedNfts = nfts?.map((nft: any) => {
    const {
      contract,
      title,
      tokenType,
      tokenId,
      description,
      media,
      rawMetadata,
    } = nft.nft;

    /*
    console.log("getHorses nft", nft);
    console.log("getHorses nft tokenId", nft.tokenId);
    console.log("getHorses nft _id", nft._id);
    console.log("getHorses nft nft", nft.nft);

    */

    //console.log("getHorses nft holder", nft.holder);

    //console.log("getHorses nft totalPricePaid", nft.totalPricePaid);

    const holder = nft.holder;

    const totalPricePaid = nft.totalPricePaid;
    const paidToken = nft.paidToken;

    const logsNewSale = nft.logsNewSale;

    //console.log('getHorses holder', holder);
    //console.log('getHorses totalPricePaid', totalPricePaid);
    //console.log('getHorses logsNewSale', logsNewSale);

    //console.log('rawMetadata', rawMetadata);

    return {
      logsNewSale: logsNewSale,
      totalPricePaid: totalPricePaid,
      paidToken: paidToken,
      holder: holder,
      contract: contract?.address,
      symbol: contract?.symbol,
      media: media[0]?.gateway
        ? media[0]?.gateway
        : 'https://via.placeholder.com/500',
      collectionName: contract.openSea?.collectionName,
      verified: contract.openSea?.safelistRequestStatus,
      tokenType,
      tokenId,
      title: rawMetadata?.name ? rawMetadata.name : title,
      description,
      format: media[0]?.format ? media[0]?.format : 'png',

      //attributes: rawMetadata?.attributes,

      grade: rawMetadata?.attributes?.find(
        (attribute: any) => attribute.trait_type === 'Grade'
      )?.value,
    };
  });

  res.status(200).json({
    nfts: formattedNfts ? formattedNfts : [],
    //pageKey: nfts.pageKey,
    ///pageKey: null,
    pageKey: pageKey,
  });

  ///return res.status(200).json({ success: true, nfts: response, pageKey: 'aaaaa' });

  /*
  return res
    .status(200)
    .json({ success: true, nfts: response, pageKey: 'aaaaa' });

  */
}
