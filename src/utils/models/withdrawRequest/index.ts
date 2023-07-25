import { connectMongo } from '@/utils/services/database';
import { Schema, model, models } from 'mongoose';
import { getUser } from '../user-model';

connectMongo();

export const withdrawRequestSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  withdrawAmount: {
    type: Number,
    required: true,
  },
  withdrawType: {
    type: String,
    required: true,
  },
  walletTo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Waiting',
  },
  isPayed: {
    type: Boolean,
    default: false,
  },
  txHash: {
    type: String,
    default: '',
  },
});

export const WithdrawModel =
  models.WithdrawRequest || model('WithdrawRequest', withdrawRequestSchema);

export const newWithdrawRequest = async (
  userId: string,
  withdrawAmount: number,
  withdrawType: string
) => {
  const user = await getUser(userId);
  const newWithdrawRequest = new WithdrawModel({
    userId: userId,
    email: user.user.email,
    username: user.user.username,
    withdrawAmount: withdrawAmount,
    withdrawType: withdrawType,
    walletTo: user.user.walletAddress,
  });
  return await newWithdrawRequest.save();
};

export const getAllWithdrawRequests = async () => {
  const withdrawRequests = await WithdrawModel.find();
  return withdrawRequests;
};

export const getWithdrawRequest = async (id: string) => {
  const withdrawRequest = await WithdrawModel.findOne({ _id: id });
  return withdrawRequest;
};

export const updateWithdrawRequest = async (
  id: string,
  status: string,
  isPayed: boolean,
  txHash: string
) => {
  const withdrawRequest = await WithdrawModel.findOne({ _id: id });
  if (!withdrawRequest) {
    return { success: false, message: 'Withdraw request not found' };
  }
  withdrawRequest.status = status;
  withdrawRequest.isPayed = isPayed;
  withdrawRequest.txHash = txHash;
  await withdrawRequest.save();
  return { success: true, withdrawRequest };
};

export const cancelWithdrawRequest = async (id: string) => {
  const withdrawRequest = await WithdrawModel.findOne({ _id: id });
  if (!withdrawRequest) {
    return { success: false, message: 'Withdraw request not found' };
  }
  withdrawRequest.status = 'Rejected';
  const user = await getUser(withdrawRequest.userId);
  if (!user.success) {
    return { success: false, message: 'User not found' };
  }

  user.user.maticBalance += withdrawRequest.withdrawAmount;
  await user.user.save();
  await withdrawRequest.save();
  return { success: true, withdrawRequest };
};

export const getUserWithdrawRequests = async (userId: string) => {
  const user = await getUser(userId);
  if (!user.success) {
    return { success: false, message: 'User not found' };
  }
  const withdrawRequests = await WithdrawModel.find({ userId: userId }).select(
    '-userId'
  );
  return withdrawRequests;
};

export const deleteWithdrawRequest = async (id: string) => {
  const withdrawRequest = await WithdrawModel.findOneAndDelete({ _id: id });
  if (!withdrawRequest) {
    return { success: false, message: 'Withdraw request not found' };
  }
  return { success: true };
};
