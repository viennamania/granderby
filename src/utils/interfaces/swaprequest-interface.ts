import mongoose from 'mongoose';

export interface ISwapRequest {
  _id: mongoose.Types.ObjectId;
  fromCoinTxHash: string;
  fromCoin: string;
  toCoin: string;
  fromAmount: number;
  fromAmountFee: number;
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
