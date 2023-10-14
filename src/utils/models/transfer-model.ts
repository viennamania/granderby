import { ITransferHistory } from '@/utils/interfaces/transfer-interface';

import { Schema, models, model } from 'mongoose';

////import { connectMongo } from '@/utils/services/database';
////connectMongo();

import dbConnect from '@/lib/db/dbConnect';

dbConnect();

/*
            blockNum: item.blockNum,
            uniqueId: item.uniqueId,
            hash: item.hash,
            from: item.from,
            to: item.to,
            value: item.value,
            erc721TokenId: item.erc721TokenId,
            erc1155Metadata: item.erc1155Metadata,
            tokenId: item.tokenId,
            asset: item.asset,
            category: item.category,
            rawContract: item.rawContract,
            blockTimestamp: item.blockTimestamp,
            data: receipt.logs[4]?.data,
            buyer: buyer,
            quantityBought: quantityBought,
            totalPricePaid: totalPricePaid,
*/

const HorseTransferSchema = new Schema({
  blockTimestamp: {
    type: String,
    required: true,
  },
  blockNum: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  erc721TokenId: {
    type: String,
    required: true,
  },
  erc1155Metadata: {
    type: String,
    required: true,
  },
  tokenId: {
    type: String,
    required: true,
  },
  asset: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rawContract: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  tokenFrom: {
    type: String,
    required: true,
  },
  tokenTo: {
    type: String,
    required: true,
  },
  logs4Address: {
    type: String,
    required: true,
  },
});

export const HorseTransferModel =
  models.Horsetransfer ||
  model<ITransferHistory>('Horsetransfer', HorseTransferSchema);

export const getTransferHistoryByTokenId = async (
  tokenId: String
): Promise<ITransferHistory[]> => {
  console.log('getTransferHistoryByTokenId', tokenId);

  if (tokenId === undefined) {
    return await HorseTransferModel.find({})
      .sort({ blockTimestamp: -1 })
      .limit(100);
  }

  return await HorseTransferModel.find({
    /*
    'placements': {
      $elemMatch: {
        nft: tokenId,
        //value: grades,
        //value: { $in: grades },
      },
    },
    */
    //'placements.nft': tokenId,

    //'placements': { $in: [ {"nft" : tokenId} ] } ,

    /*
    placements: {
      $elemMatch: { 'nft.tokenId': tokenId },
    },
    */

    tokenId: tokenId,
  })
    .sort({ blockTimestamp: -1 })
    .limit(100);
};

export const getTransferHistoryByHolder = async (
  address: String
): Promise<ITransferHistory[]> => {
  console.log('getTransferHistoryByHolder', address);

  return await HorseTransferModel.find({
    $or: [{ tokenFrom: address }, { tokenTo: address }],
  })
    .sort({ blockTimestamp: -1 })
    .limit(100);
};

export const getNftTransferHistoryByHolder = async (
  address: String
): Promise<ITransferHistory[]> => {
  console.log('getTransferHistoryByHolder', address);

  return await HorseTransferModel.find({
    $and: [
      {
        category: 'erc721',
      },
      {
        $or: [
          { tokenFrom: address.toLowerCase() },
          { tokenTo: address.toLowerCase() },
        ],
      },
    ],
  })
    .sort({ blockTimestamp: -1 })
    .limit(100);
};

export const getTransferHistoryLatestByHolder = async (
  limit: String,
  address: String
): Promise<ITransferHistory[]> => {
  console.log('getTransferHistoryByHolder', address);

  return await HorseTransferModel.find({
    $or: [{ tokenFrom: address }, { tokenTo: address }],
  })
    .sort({ blockTimestamp: -1 })
    .limit(limit as any);
};
