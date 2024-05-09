import { ISwapRequest } from '@/utils/interfaces/swaprequest-interface';

import mongoose, { model, models, Schema } from 'mongoose';

//import { connectMongo } from '../services/database';

///connectMongo();

import dbConnect from '@/lib/db/dbConnect';
import { tr } from 'date-fns/locale';

dbConnect();

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
