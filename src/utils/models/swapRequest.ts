import { ISwapRequest } from '@/utils/interfaces/swaprequest-interface';

import mongoose, { model, models, Schema } from 'mongoose';

//import { connectMongo } from '../services/database';

///connectMongo();

import dbConnect from '@/lib/db/dbConnect';
import { tr } from 'date-fns/locale';

dbConnect();

import clientPromise from '@/lib/mongodb';

///import { ObjectId } from 'mongodb';

// fromCoinTxHash, fromCoin, toCoin, fromAmount, toAmount, fromWallet, toWallet, status, txHash, userID, email1, createdAt

export const SwapRequestSchema = new Schema({
  fromCoinTxHash: {
    type: String,
    required: true,
  },
  fromCoin: {
    type: String,
    required: true,
  },
  toCoin: {
    type: String,
    required: true,
  },
  fromAmount: {
    type: Number,
    required: true,
  },
  fromAmountFee: {
    type: Number,
    required: true,
  },
  toAmount: {
    type: Number,
    required: true,
  },
  fromWallet: {
    type: String,
    required: true,
  },
  toWallet: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Waiting',
  },
  txHash: {
    type: String,
    default: '',
  },
  userID: {
    type: String,
    required: true,
  },
  email1: {
    type: String,
    unique: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
    default: 'Matic',
  },
});

/*
export const HorseStakeModel =
  models.Horsestake || model<IStakeHistory>('Horsestake', HorseStakeSchema);

*/

export const SwapRequestModel =
  models.Swaprequest || model<ISwapRequest>('Swaprequest', SwapRequestSchema);

export const newSwapRequest = async (
  fromCoinTxHash: string,
  fromCoin: string,
  toCoin: string,
  fromAmount: number,
  fromAmountFee: number,
  toAmount: number,
  fromWallet: string,
  toWallet: string,
  userID: string,
  email1: string
) => {
  const newSwapRequest = new SwapRequestModel({
    fromCoinTxHash,
    fromCoin,
    toCoin,
    fromAmount,
    fromAmountFee,
    toAmount,
    fromWallet,
    toWallet,
    userID,
    email1,
  });
  if (!newSwapRequest) {
    return null;
  }
  return await newSwapRequest.save();
};

// getAllSwapRequests order by createdAt desc
// join with user table to get email1
// fromWallet of swapRequest is wallet address of user
// walletAddress of user is wallet address of user
// aggregate swapRequest by fromWallet and user walletAddress

/*
export const getAllSwapRequests = async () => {

  const requests = await SwapRequestModel.find().sort({
    createdAt: -1,
  });

  if (requests) {
    return requests;
  } else {
    return null;
  }
};
*/

// conver fromWallet of swapRequest to lowercase
// and covert walletAddress of user to lowercase

export const getAllSwapRequests = async () => {
  const client = await clientPromise;
  const collection = client
    .db('granderby')
    .collection('swaprequests')
    .aggregate([
      {
        $lookup: {
          // convert fromWallet of swapRequest to lowercase
          // and covert walletAddress of user to lowercase

          from: 'users', // left join with users table for each swapRequest

          localField: 'fromWallet', // primary key of swapRequest table

          foreignField: 'walletAddress', // primary key of users table

          as: 'user', // alias for userinfo table
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          fromCoinTxHash: 1,
          fromCoin: 1,
          toCoin: 1,
          fromAmount: 1,
          fromAmountFee: 1,
          toAmount: 1,
          fromWallet: 1,
          toWallet: 1,
          status: 1,
          txHash: 1,
          userID: 1,
          email: '$user.email',
          createdAt: 1,
          type: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

  const data = await collection.toArray();

  if (data) {
    return data;
  } else {
    return null;
  }
};

export const getAllSwapRequestsByStatusWaiting = async () => {
  const requests = await SwapRequestModel.find({ status: 'Waiting' }).sort({
    createdAt: -1,
  });

  if (requests) {
    return requests;
  } else {
    return null;
  }
};

// getAllSwapRequestsByWallet order by createdAt desc

export const getAllSwapRequestsByWallet = async (fromWallet: string) => {
  const requests = await SwapRequestModel.find({ fromWallet }).sort({
    createdAt: -1,
  });

  if (requests) {
    return requests;
  } else {
    return null;
  }
};

/*
export const getPaymentRequest = async (_id: string) => {
  const request = await PaymentRequest.find({ _id });
  if (request) {
    return request;
  } else {
    return null;
  }
};

export const getAllPaymentRequests = async () => {
  const requests = await PaymentRequest.find();
  if (requests) {
    return requests;
  } else {
    return null;
  }
};
*/

// get sum of from now to 24 hours ago of toAmount by fromWallet
export const getSumDayFromAmountByWallet = async (fromWallet: string) => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const sum = await SwapRequestModel.aggregate([
    {
      $match: {
        fromWallet,
        createdAt: { $gte: date },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$toAmount' },
      },
    },
  ]);

  if (sum[0]) {
    return sum[0].total;
  } else {
    return 0;
  }
};

// setSwapRequestsStatusById from 'waiting' to 'Completed' and update txHash

export const setSwapRequestsStatusById = async (
  _id: string,
  txHash: string
) => {
  /*
  const swapRequest = await SwapRequestModel.findOne ({ _id });
  
  // check if swapRequest exists and status is 'Waiting'

  if (swapRequest && swapRequest.status === 'Waiting') {

    swapRequest.status = 'Completed';
    swapRequest.txHash = txHash;

    return await swapRequest.save();

  } else {
    return null;
  }
  */

  const client = await clientPromise;
  const collection = client.db('granderby').collection('swaprequests');

  const data = await collection.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(_id),
      status: 'Waiting',
    },
    {
      $set: {
        status: 'Completed',
        txHash: txHash,
      },
    }
  );

  if (data) {
    return data;
  } else {
    return null;
  }
};

// getSumSwap
// get sum of fromAmount+fromAmountFee, toAmount
// where status is 'Completed'
export const getSumSwap = async () => {
  const sum = await SwapRequestModel.aggregate([
    {
      $match: {
        status: 'Completed',
      },
    },
    {
      $group: {
        _id: null,
        fromAmount: {
          $sum: {
            $add: ['$fromAmount', '$fromAmountFee'],
          },
        },
        toAmount: { $sum: '$toAmount' },
      },
    },
  ]);

  ///console.log('sum', sum);

  if (sum[0]) {
    return sum[0];
  } else {
    return null;
  }
};
