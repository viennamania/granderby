import mongoose from 'mongoose';

/*
      // write claim history
      // holderAddress, claimedBalance, transaction?.receipt?.transactionHash

      */

export interface ITrackClaim {
  _id: mongoose.Types.ObjectId;

  holderAddress: string;
  claimedBalance: number;
  transactionHash: string;
  createdAt: Date;
  updatedAt: Date;
}
