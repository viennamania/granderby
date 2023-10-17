import { ITransferHistory } from '@/utils/interfaces/transfer-interface';

import { Schema, models, model } from 'mongoose';

////import { connectMongo } from '@/utils/services/database';
////connectMongo();

import dbConnect from '@/lib/db/dbConnect';

import {
  addressRaceReward,
  addressAirdropReward,
  addressInvalid1,
} from '@/config/contractAddresses';

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

  buyer: {
    type: String,
    required: true,
  },
  listingCreator: {
    type: String,
    required: true,
  },
  quantityBought: {
    type: String,
    required: true,
  },
  totalPricePaid: {
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

export const HorseTransferModel =
  models.Horsegame || model<ITransferHistory>('Horsegame', HorseTransferSchema);

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
  console.log('getTransferHistoryByHolder===', address);

  if (address === undefined) {
    return [];
  }

  return await HorseTransferModel.find({
    $and: [
      {
        $expr: { $ne: ['$tokenFrom', '$tokenTo'] },
      },
      {
        $expr: {
          $ne: [
            '$tokenTo',
            '0xe38A3D8786924E2c1C427a4CA5269e6C9D37BC9C'.toLowerCase(),
          ],
        },
      },
      //{
      //  $expr: { $ne: ['$tokenFrom', ''] },
      //},
      {
        $or: [
          { tokenFrom: address },
          { tokenTo: address },
          { buyer: address },
          { listingCreator: address },
          { staker: address },
        ],
      },
    ],

    /*
    $or: [
      { tokenFrom: address },
      { tokenTo: address },
      { buyer: address },
      { listingCreator: address },
      { staker: address },
    ],
    */
  })
    .sort({ blockTimestamp: -1 })
    .limit(100);
};

export const getFtTransferHistoryByHolder = async (
  limit: Number,
  address: String
): Promise<ITransferHistory[]> => {
  console.log('getFtTransferHistoryByHolder', address);
  if (address === undefined) {
    return [];
  }
  return await HorseTransferModel.find({
    $and: [
      {
        category: 'erc20',
      },
      //{
      //  $expr: { $ne: ['$tokenFrom', '$tokenTo'] },
      //},
      {
        $expr: {
          $ne: [
            '$tokenTo',
            '0xe38A3D8786924E2c1C427a4CA5269e6C9D37BC9C'.toLowerCase(),
          ],
        },
      },
      {
        $or: [{ tokenFrom: address }, { tokenTo: address }],
      },
    ],
  })
    .sort({ blockTimestamp: -1 })
    .limit(limit as any);
};

export const getNftTransferHistoryByHolder = async (
  address: String
): Promise<ITransferHistory[]> => {
  console.log('getTransferHistoryByHolder', address);
  if (address === undefined) {
    return [];
  }
  return await HorseTransferModel.find({
    $or: [
      { tokenFrom: address },
      { tokenTo: address },
      { buyer: address },
      { listingCreator: address },
      { staker: address },
    ],
    /*
    $and: [
      {
        category: 'erc721',
      },
      {
        $or: [
          { tokenFrom: address?.toLowerCase() },
          { tokenTo: address?.toLowerCase() },
        ],
      },
    ],
    */
  })
    .sort({ blockTimestamp: -1 })
    .limit(100);
};

export const getTransferHistoryLatestByHolder = async (
  limit: String,
  address: String
): Promise<ITransferHistory[]> => {
  console.log('getTransferHistoryLatestByHolder', address);
  if (address === undefined) {
    return [];
  }
  return await HorseTransferModel.find({
    $or: [
      { tokenFrom: address },
      { tokenTo: address },
      { buyer: address },
      { listingCreator: address },
      { staker: address },
    ],
  })
    .sort({ blockTimestamp: -1 })
    .limit(limit as any);
};

export const getTransferHistoryLatest = async (
  limit: String
): Promise<ITransferHistory[]> => {
  console.log('getTransferHistoryLatest', limit);

  return await HorseTransferModel.find({
    $and: [
      {
        $expr: { $ne: ['$tokenFrom', addressInvalid1] },
      },
      {
        $expr: { $ne: ['$tokenTo', addressInvalid1] },
      },
      {
        $expr: { $ne: ['$tokenFrom', '$tokenTo'] },
      },
      {
        $expr: {
          $ne: ['$tokenTo', addressRaceReward.toLowerCase()],
        },
      },
      {
        $expr: {
          $ne: ['$tokenTo', addressAirdropReward.toLowerCase()],
        },
      },
      {
        $expr: {
          $ne: [
            '$tokenTo',
            '0xe38A3D8786924E2c1C427a4CA5269e6C9D37BC9C'.toLowerCase(),
          ],
        },
      },
    ],

    /*
    $or: [
      
      { tokenFrom: address },
      { tokenTo: address },
      { buyer: address },
      { listingCreator: address },
      { staker: address },
    ],
    */
  })
    .sort({ blockTimestamp: -1 })
    .limit(limit as any);
};

export const getTransferHistoryLatestByHolderByCategory = async (
  limit: String,
  address: String,
  category: String
): Promise<ITransferHistory[]> => {
  console.log('getTransferHistoryLatestByHolder', address);
  if (address === undefined) {
    return [];
  }
  return await HorseTransferModel.find({
    $and: [
      {
        category: category,
      },
      {
        $or: [
          { tokenFrom: address },
          { tokenTo: address },
          { buyer: address },
          { listingCreator: address },
          { staker: address },
        ],
      },
    ],
  })
    .sort({ blockTimestamp: -1 })
    .limit(limit as any);
};

// query for dayly volume

export const getDailyVolumnByHolder = async (
  address: String
  //): Promise<ITransferHistory[]> => {
): Promise<any[]> => {
  console.log('getDailyVolumnByHolder', address);

  if (address === undefined) {
    return [];
  }

  return await HorseTransferModel.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [
              { tokenFrom: address },
              { tokenTo: address },
              { buyer: address },
              { listingCreator: address },
              { staker: address },
            ],
          },
          {
            $expr: { $ne: ['$tokenFrom', '$tokenTo'] },
          },
          {
            $expr: {
              $ne: ['$tokenTo', addressRaceReward.toLowerCase()],
            },
          },
          {
            $expr: {
              $ne: ['$tokenTo', addressAirdropReward.toLowerCase()],
            },
          },
          {
            $expr: {
              $ne: [
                '$tokenTo',
                '0xe38A3D8786924E2c1C427a4CA5269e6C9D37BC9C'.toLowerCase(),
              ],
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: {
          //$dateToString: { format: '%Y-%m-%d', date: '$blockTimestamp' },
          $dateToString: {
            format: '%Y-%m-%d',
            date: { $toDate: '$blockTimestamp' },
          },
          // contract
          // $contract: '$rawContract.address',
        },
        //category : { $first: '$category' },
        contract: { $first: '$rawContract.address' },
        total: { $sum: 1 },
      },
    },
    {
      $sort: { _id: -1 },
    },
    {
      $limit: 30,
    },
  ]);
};

export const getDailyVolumn = async (): //): Promise<ITransferHistory[]> => {
Promise<any[]> => {
  console.log('getDailyVolumn===');

  return await HorseTransferModel.aggregate([
    {
      /* from now on, 7 days ago */

      $match: {
        $and: [
          /*
          {

            blockTimestamp: {
              $gte:   new Date(new Date().getTime() - 100 * 24 * 60 * 60 * 1000),
            },
          },
          */

          {
            $expr: { $ne: ['$tokenFrom', '$tokenTo'] },
          },
          {
            $expr: {
              $ne: ['$tokenTo', addressRaceReward.toLowerCase()],
            },
          },
          {
            $expr: {
              $ne: ['$tokenTo', addressAirdropReward.toLowerCase()],
            },
          },
          {
            $expr: {
              $ne: [
                '$tokenTo',
                '0xe38A3D8786924E2c1C427a4CA5269e6C9D37BC9C'.toLowerCase(),
              ],
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: {
          //$dateToString: { format: '%Y-%m-%d', date: '$blockTimestamp' },
          $dateToString: {
            format: '%Y-%m-%d',
            date: { $toDate: '$blockTimestamp' },
          },
          // contract
          // $contract: '$rawContract.address',
        },
        //category : { $first: '$category' },
        contract: { $first: '$rawContract.address' },
        total: { $sum: 1 },
      },
    },
    {
      //$sort: { _id: -1 },
      $sort: { _id: 1 },
    },
    //{
    //  $limit: 30,
    //},
  ]);
};
