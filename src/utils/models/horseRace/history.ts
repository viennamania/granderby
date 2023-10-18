import { IHorseHistory } from '@/utils/horseRace/interfaces/horseHistory';

import { Schema, models, model } from 'mongoose';

/////import { connectMongo } from '@/utils/services/database';
//////connectMongo();

import dbConnect from '@/lib/db/dbConnect';

dbConnect();

const HorseHistorySchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  winnerHorse: {
    type: String,
    required: true,
  },
  winnerNft: {
    type: Object,
    required: true,
  },
  placements: {
    type: Array,
    line: {
      type: Number,
      required: true,
    },
    horse: {
      type: String,
      required: true,
    },
  },
  winPrize: {
    type: Number,
    required: false,
  },
});

export const HorseHistoryModel =
  models.HorseHistory ||
  model<IHorseHistory>('HorseHistory', HorseHistorySchema);

export const newHorseHistory = async (
  winnerHorse: string,
  placements: { line: number; horse: string }[]
): Promise<IHorseHistory> => {
  const history = new HorseHistoryModel({ winnerHorse, placements });
  return await history.save();
};

export const getHorseHistory = async (): Promise<IHorseHistory[]> => {
  return await HorseHistoryModel.find().sort({ date: -1 }).limit(10);
};

export const getHorseLastHistory = async (): Promise<IHorseHistory> => {
  return await HorseHistoryModel.findOne().sort({ date: -1 });
};

// getDailyWinPrize

export const getDailyWinPrize = async (): Promise<any[]> => {
  console.log('getDailyWinPrize===');

  return await HorseHistoryModel.aggregate([
    {
      $match: {
        $and: [
          {
            $expr: { $ne: ['$winnerHorse', ''] },
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
            date: { $toDate: '$date' },
          },
          // contract
          // $contract: '$rawContract.address',
        },
        //category : { $first: '$category' },

        //contract: {
        //  $addToSet: '$rawContract.address',
        //},

        //category: {
        //  $addToSet: '$category',
        //},

        totalHorse1: {
          // sum each contract of set
          $sum: {
            $cond: [
              {
                $eq: ['$winnerNft.tokenId', '0'],
              },
              1,
              0,
            ],
          },
        },
        totalHorse2: {
          // sum each contract of set
          $sum: {
            $cond: [
              {
                $eq: ['$winnerNft.tokenId', '10'],
              },
              1,
              0,
            ],
          },
        },
        totalHorse3: {
          // sum each contract of set
          $sum: {
            $cond: [
              {
                $eq: ['$winnerNft.tokenId', '1001'],
              },
              1,
              0,
            ],
          },
        },

        // sum each contract of set
        totalWinPrize: {
          // sum each contract of set
          /*
          $sum: {
            $cond: [{ $eq: ['$winnerHorse', '1'] }, 1, 0],
          },
          */
          $sum: '$winPrize',
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

/*
export const getDailyVolumn = async (): //): Promise<ITransferHistory[]> => {
Promise<any[]> => {
  console.log('getDailyVolumn===');

  return await HorseTransferModel.aggregate([
    {

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

*/
