import { ITransferHistory } from '@/utils/interfaces/transfer-interface';

import { Schema, models, model } from 'mongoose';

////import { connectMongo } from '@/utils/services/database';
////connectMongo();

import dbConnect from '@/lib/db/dbConnect';

import {
  addressRaceReward,
  addressAirdropReward,
  addressInvalid1,
  addressInvalid2,
  addressInvalid3,
  tokenContractAddressCARROTDrop,
  tokenContractAddressSUGARDrop,
  nftDropContractAddressHorse,
  tokenContractAddressGRD,
  stakingContractAddressHorseAAA,
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

export const getTransferHistory = async (): Promise<ITransferHistory[]> => {
  console.log('getTransferHistory=======');

  return await HorseTransferModel.find({
    $and: [
      /*
      {
        $expr: { $ne: ['$tokenFrom', '$tokenTo'] },
      },

      */

      {
        $expr: {
          $ne: ['$tokenTo', stakingContractAddressHorseAAA.toLowerCase()],
        },
      },

      {
        $expr: {
          $ne: ['$tokenFrom', stakingContractAddressHorseAAA.toLowerCase()],
        },
      },

      {
        $expr: { $ne: ['$tokenFrom', addressInvalid1.toLowerCase()] },
      },
      {
        $expr: { $ne: ['$tokenTo', addressInvalid1.toLowerCase()] },
      },
      {
        $expr: { $ne: ['$tokenFrom', addressInvalid2.toLowerCase()] },
      },
      {
        $expr: { $ne: ['$tokenTo', addressInvalid2.toLowerCase()] },
      },
      {
        $expr: { $ne: ['$tokenFrom', addressInvalid3.toLowerCase()] },
      },
      {
        $expr: { $ne: ['$tokenTo', addressInvalid3.toLowerCase()] },
      },
      //{
      //  asset: 'GRANDERBY'
      //},

      /*
      {
        $expr: {
          $ne: { '$rawContract.address': '0xe36BD65609c08Cd17b53520293523CF4560533d0'.toLowerCase() },
        }
      },
      */
    ],
  })
    .sort({ blockTimestamp: -1 })
    .limit(100);
};

export const getTransferHistoryLatest = async (
  limit: String
): Promise<ITransferHistory[]> => {
  ////console.log('getTransferHistoryLatest', limit);

  return await HorseTransferModel.find({
    $and: [
      /*
      {
        $expr: {
          $ne: [
            '$tokenFrom',
            '0x0000000000000000000000000000000000000000'.toLowerCase(),
          ],
        },
      },
      */
      {
        $expr: {
          $ne: ['$tokenTo', stakingContractAddressHorseAAA.toLowerCase()],
        },
      },
      {
        $expr: {
          $ne: ['$tokenFrom', stakingContractAddressHorseAAA.toLowerCase()],
        },
      },

      {
        $expr: { $ne: ['$tokenFrom', addressInvalid1.toLowerCase()] },
      },
      {
        $expr: { $ne: ['$tokenTo', addressInvalid1.toLowerCase()] },
      },
      {
        $expr: { $ne: ['$tokenFrom', addressInvalid2.toLowerCase()] },
      },
      {
        $expr: { $ne: ['$tokenTo', addressInvalid2.toLowerCase()] },
      },
      {
        $expr: { $ne: ['$tokenFrom', addressInvalid3.toLowerCase()] },
      },
      {
        $expr: { $ne: ['$tokenTo', addressInvalid3.toLowerCase()] },
      },
      /*
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
      
      {
        $expr: {
          $ne: [
            '$rawContract.address',
            '0xe36BD65609c08Cd17b53520293523CF4560533d0'.toLowerCase(), // G1 Contract
          ],
        },
      },
      */
      /*
      {
        $expr: {
          $ne: { '$rawContract.address': '0xe36BD65609c08Cd17b53520293523CF4560533d0'.toLowerCase() },
        }
      },
      */

      /*
      {
        $expr: {
          $and: [
            {
              $eq: [
                '$category', 'erc721'
              ],
            },
            {
              $ne: [
                '$tokenId', 'NaN'
              ]
            },
          ]
        },
      }
      */
      /*
      {
          $expr: {
            $ne: [
              '$tokenId', 'NaN'
            ]
          },
      }
      */
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

export const getTransferHistoryByTokenId = async (
  tokenId: String
): Promise<ITransferHistory[]> => {
  ///console.log('getTransferHistoryByTokenId', tokenId);

  if (tokenId === undefined) {
    return await HorseTransferModel.find({})
      .sort({ blockTimestamp: -1 })
      .limit(100);
  }

  return await HorseTransferModel.find({
    $and: [
      /*
      {
        $expr: { $ne: ['$tokenFrom', '$tokenTo'] },
      },

      */

      {
        $expr: {
          $ne: ['$tokenTo', stakingContractAddressHorseAAA.toLowerCase()],
        },
      },

      {
        $expr: {
          $ne: ['$tokenFrom', stakingContractAddressHorseAAA.toLowerCase()],
        },
      },

      {
        $expr: { $ne: ['$tokenFrom', addressInvalid1.toLowerCase()] },
      },
      {
        $expr: { $ne: ['$tokenTo', addressInvalid1.toLowerCase()] },
      },
      {
        $expr: { $ne: ['$tokenFrom', addressInvalid2.toLowerCase()] },
      },
      {
        $expr: { $ne: ['$tokenTo', addressInvalid2.toLowerCase()] },
      },
      {
        $expr: { $ne: ['$tokenFrom', addressInvalid3.toLowerCase()] },
      },
      {
        $expr: { $ne: ['$tokenTo', addressInvalid3.toLowerCase()] },
      },
      //{
      //  asset: 'GRANDERBY'
      //},
      {
        tokenId: tokenId,
      },
    ],

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

export const getTransferHistoryLatestByHolderByCategory = async (
  limit: String,
  address: String,
  category: String
): Promise<ITransferHistory[]> => {
  console.log('getTransferHistoryLatestByHolderByCategory', address);
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
  ///console.log('getDailyVolumnByHolder', address);

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
        /* total is set for the sum of each contract */

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
        totalCARROT: {
          // sum each contract of set
          $sum: {
            $cond: [
              {
                $eq: [
                  '$rawContract.address',
                  tokenContractAddressCARROTDrop.toLowerCase(),
                ],
              },
              1,
              0,
            ],
          },
        },
        totalSUGAR: {
          // sum each contract of set
          $sum: {
            $cond: [
              {
                $eq: [
                  '$rawContract.address',
                  tokenContractAddressSUGARDrop.toLowerCase(),
                ],
              },
              1,
              0,
            ],
          },
        },
        totalHORSE: {
          // sum each contract of set
          $sum: {
            $cond: [
              {
                $eq: [
                  '$rawContract.address',
                  nftDropContractAddressHorse.toLowerCase(),
                ],
              },
              1,
              0,
            ],
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

export const getDailyVolumn = async (): //): Promise<ITransferHistory[]> => {
Promise<any[]> => {
  ///console.log('getDailyVolumn===');

  return await HorseTransferModel.aggregate([
    {
      /* from now on, 7 days ago */

      $match: {
        $and: [
          {
            $expr: { $ne: ['$tokenFrom', '$tokenTo'] },
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
        totalCARROT: {
          // sum each contract of set
          $sum: {
            $cond: [
              {
                $eq: [
                  '$rawContract.address',
                  tokenContractAddressCARROTDrop.toLowerCase(),
                ],
              },
              1,
              0,
            ],
          },
        },
        totalSUGAR: {
          // sum each contract of set
          $sum: {
            $cond: [
              {
                $eq: [
                  '$rawContract.address',
                  tokenContractAddressSUGARDrop.toLowerCase(),
                ],
              },
              1,
              0,
            ],
          },
        },
        totalHORSE: {
          // sum each contract of set
          $sum: {
            $cond: [
              {
                $eq: [
                  '$rawContract.address',
                  nftDropContractAddressHorse.toLowerCase(),
                ],
              },
              1,
              0,
            ],
          },
        },
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

// getDailyVolumn for rawContract.address group by date
export const getDailyVolumnForContract =
  async (): //): Promise<ITransferHistory[]> => {
  Promise<any[]> => {
    ///console.log('getDailyVolumn===');

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
            /*
          {
            $or: [
 
              { '$rawContract.address': tokenContractAddressCARROTDrop },
              { '$rawContract.address': tokenContractAddressSUGARDrop },
              { '$rawContract.address': nftDropContractAddressHorse },
            ],

          }
          */
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
            //$contract: '$rawContract.address',

            /*
          $contract0: { '$rawContract.address': tokenContractAddressGRD },
          $contract1: { '$rawContract.address': tokenContractAddressCARROTDrop },
          $contract2: { '$rawContract.address': tokenContractAddressSUGARDrop },
          $contract3: { '$rawContract.address': nftDropContractAddressHorse },
          */
          },

          category: {
            $first: '$category',
          },
          /*
        contract0: { $first: '$contract0' },
        contract1: { $first: '$contract1' },
        contract2: { $first: '$contract2' },
        contract3: { $first: '$contract3' },
        */

          total: {
            $sum: 1,
          },
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
