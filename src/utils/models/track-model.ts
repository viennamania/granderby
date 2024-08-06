import { ITrackClaim } from '@/utils/interfaces/track-claim-interface';

import { Schema, models, model } from 'mongoose';

////import { connectMongo } from '@/utils/services/database';
////connectMongo();

import dbConnect from '@/lib/db/dbConnect';
import { create } from 'lodash';

dbConnect();

/*

      // write claim history
      // holderAddress, claimedBalance, transaction?.receipt?.transactionHash

      */

const TrackClaimSchema = new Schema({
  holderAddress: { type: String, required: true },
  claimedBalance: { type: Number, required: true },
  transactionHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const TrackClaimModel =
  models.Trackclaim || model<ITrackClaim>('Trackclaim', TrackClaimSchema);

// insert claim history
export const insertTrackClaim = async (
  holderAddress: string,
  claimedBalance: number,
  transactionHash: string
): Promise<ITrackClaim> => {
  const trackClaim = new TrackClaimModel({
    holderAddress,
    claimedBalance,
    transactionHash,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return await trackClaim.save();
};

export const getClaimHistoryByHolderAddress = async (
  holderAddress: String
): Promise<ITrackClaim[]> => {
  ///console.log('getTransferHistoryByTokenId', tokenId);

  return await TrackClaimModel.find({
    holderAddress: holderAddress,
  })
    .sort({ createdAt: -1 })
    .limit(100);
};
