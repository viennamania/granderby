import { IStakeHistory } from '@/utils/interfaces/stake-interface';

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

const HorseStakeSchema = new Schema({
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

  register: {
    type: String,
    required: true,
  },
  staker: {
    type: String,
    required: true,
  },
});

export const HorseStakeModel =
  models.Horsestake || model<IStakeHistory>('Horsestake', HorseStakeSchema);

export const getStakeHistory = async (): Promise<IStakeHistory[]> => {
  return await HorseStakeModel.find({}).sort({ blockTimestamp: -1 });
  //.limit(100);
};

export const getStakeHistoryByTokenId = async (
  tokenId: String
): Promise<IStakeHistory[]> => {
  console.log('getStakeHistoryByTokenId', tokenId);

  if (tokenId === undefined) {
    return await HorseStakeModel.find({}).sort({ blockTimestamp: -1 });
    //.limit(100);
  }

  return await HorseStakeModel.find({
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
  }).sort({ blockTimestamp: -1 });
  //.limit(100);
};
