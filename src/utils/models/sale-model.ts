import { ISaleHistory } from '@/utils/interfaces/sale-interface';

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

const HorseSaleSchema = new Schema({
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
});

export const HorseSaleModel =
  models.Horsesale || model<ISaleHistory>('Horsesale', HorseSaleSchema);

export const getSaleHistory = async (): Promise<ISaleHistory[]> => {
  return await HorseSaleModel.find({})
    .sort({
      blockTimestamp: -1,
    })
    .limit(1000);
};

export const getSaleHistoryByTokenId = async (
  tokenId: String
): Promise<ISaleHistory[]> => {
  ///console.log('getSaleHistoryByTokenId', tokenId);

  return await HorseSaleModel.find({
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
    .limit(10);
};

export const getSaleHistoryByHolder = async (
  address: String
): Promise<ISaleHistory[]> => {
  ///console.log('getSaleHistoryByTokenId', tokenId);

  return await HorseSaleModel.find({
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

    to: address.toLowerCase(),
  })
    .sort({ blockTimestamp: -1 })
    .limit(10);
};

export const getUserDailyTradePrice = async (
  address: String
  //): Promise<ITransferHistory[]> => {
): Promise<any[]> => {
  ///console.log('getDailyVolumnByHolder', address);

  if (address === undefined) {
    return [];
  }

  return await HorseSaleModel.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [
              { to: address.toLowerCase() },
              { from: address.toLowerCase() },
            ],
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
        /* total is set for the sum of each contract */
        /*
        contract: {
          $addToSet: '$rawContract.address',
        },

        category: {
          $addToSet: '$category',
        },

        // sum each contract of set
        totalErc20: {
          // sum each contract of set
          $sum: {
            $cond: [{ $eq: ['$category', 'erc20'] }, 1, 0],
          },
        },
        totalErc721: {
          // sum each contract of set
          $sum: {
            $cond: [{ $eq: ['$category', 'erc721'] }, 1, 0],
          },
        },
        totalGRD: {
          // sum each contract of set
          $sum: {
            $cond: [
              {
                $eq: [
                  '$rawContract.address',
                  tokenContractAddressGRD.toLowerCase(),
                ],
              },
              1,
              0,
            ],
          },
        },
        */
        /* sum of totalPricePaid */
        total: {
          $sum: {
            $toDouble: '$totalPricePaid',
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
    /*
    {
      $limit: 30,
    },
    */
  ]);
};
