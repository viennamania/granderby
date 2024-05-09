import mongoose from 'mongoose';

/*

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
  */
export interface ISwapRequest {
  _id: mongoose.Types.ObjectId;
  fromCoinTxHash: string;
  fromCoin: string;
  toCoin: string;
  fromAmount: number;
  toAmount: number;
  fromWallet: string;
  toWallet: string;
  status: string;
  txHash: string;
  userID: string;
  email1: string;
  createdAt: Date;
  type: string;
}
