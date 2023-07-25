import { Schema, models, model } from 'mongoose';
import { IUser } from '../interfaces/user-interface';
import { connectMongo } from '../services/database';
import { getCoinConvert } from './settings-model';

connectMongo();

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  pass: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  deposit: {
    type: Number,
    required: false,
    default: 0,
  },
  img: {
    type: String,
    required: true,
    default: `${process.env.API_URL}/images/users/default.gif`,
  },
  admin: {
    type: Boolean,
    required: false,
    default: false,
  },
  newPassToken: {
    type: String,
    required: false,
    default: '',
  },
  maticBalance: {
    type: Number,
    required: false,
    default: 0,
  },
  walletAddress: {
    type: String,
    required: true,
    default: '',
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export const User = models.User || model('User', UserSchema);

export const newUser = async (
  username: string,
  email: string,
  pass: string,
  walletAddress: string,
  bonus: number
) => {
  const checkUser = await User.findOne({ email: email });
  if (checkUser) {
    return { success: false, message: 'User already exists' };
  }
  const user = new User({
    username: username,
    email: email,
    pass: pass,
    walletAddress: walletAddress,
    deposit: bonus,
  });
  return await user.save();
};

export const loginUser = async (email: string) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  if (!user.status) {
    return { success: false, message: 'User Banned' };
  }
  if (user) {
    return { success: true, user };
  } else {
    return { success: false, message: 'User not found' };
  }
};

export const getUser = async (_id: string) => {
  const user = await User.findOne({ _id: _id });
  if (user) {
    return { success: true, user };
  } else {
    return { success: false, message: 'User not found' };
  }
};

export const getAllUsers = async () => {
  const users: IUser[] = (await User.find({ status: true })) as IUser[];
  if (users) {
    return { success: true, users };
  } else {
    return { success: false, message: 'Users not found' };
  }
};

export const airdrop = async (amount: any) => {
  const users: IUser[] = (await User.find({ status: true })) as IUser[];
  if (users) {
    users.forEach(async (user) => {
      user.deposit += amount;
      await user.save();
    });
    return { success: true, users };
  } else {
    return { success: false, message: 'Users not found' };
  }
};

export const updateUser = async (
  _id: string,
  username: string,
  email: string,
  pass: string,
  deposit: number,
  img: string,
  admin: boolean,
  newPassToken: string,
  maticBalance: number,
  walletAddress: string
) => {
  const updatedUser: IUser = (await User.findOneAndUpdate(
    { _id: _id },
    {
      username: username,
      email: email,
      pass: pass,
      deposit: deposit,
      img: img,
      admin: admin,
      newPassToken: newPassToken,
      maticBalance: maticBalance,
      walletAddress: walletAddress,
    },
    { new: true }
  )) as IUser;
  if (updatedUser) {
    return { success: true, updatedUser };
  }
  return { success: false, message: 'User not found' };
};

export const deleteUser = async (_id: string) => {
  const check = await User.findOne({ _id: _id });

  const pasifUser: IUser = (await User.findOneAndUpdate(
    { _id: _id },
    {
      status: false,
    },
    { new: true }
  )) as IUser;
  if (pasifUser) {
    if (check.admin) {
      return { success: false, message: 'Admin can not be deleted' };
    }
    return { success: true, pasifUser };
  }
  return { success: false, message: 'User not found' };
};

export const makeDepositMatic = async (_id: string, amount: number) => {
  const updatedUser: IUser = (await User.findOneAndUpdate(
    { _id: _id },
    {
      $inc: { maticBalance: amount },
    },
    { new: true }
  )) as IUser;
  if (updatedUser) {
    return { success: true, updatedUser };
  }
  return { success: false, message: 'User not found' };
};

export const makeDepositCoin = async (_id: string, amount: number) => {
  const user = await User.findOne({ _id: _id });
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  const coin = await getCoinConvert();
  if (user.maticBalance < amount) {
    return { success: false, message: `Not Enough ${coin.coin}` };
  }
  user.deposit += amount * coin.multiplier;
  user.maticBalance -= amount;
  await user.save();
  return { success: true, user };
};

export const makeDepositToken = async (_id: string, amount: number) => {
  const updatedUser: IUser = (await User.findOneAndUpdate(
    { _id: _id },
    {
      $inc: { deposit: amount },
    },
    { new: true }
  )) as IUser;
  if (updatedUser) {
    return { success: true, updatedUser };
  }
  return { success: false, message: 'User not found' };
};

export const makeWinDepositCoin = async (_id: string, amount: number) => {
  const user = await User.findOne({ _id: _id });
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  user.deposit = user.deposit + amount;
  await user.save();
  return { success: true, user };
};

export const swapToMatic = async (_id: string, amount: number) => {
  const user = await User.findOne({ _id: _id });
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  const coin = await getCoinConvert();
  if (user.deposit < amount) {
    return { success: false, message: `Not Enough ${coin.coin}` };
  }
  user.deposit -= amount;
  user.maticBalance += amount / coin.multiplier;
  await user.save();
  return { success: true, user };
};

export const makeWithdrawCoin = async (_id: string, amount: number) => {
  const user = await User.findOne({ _id: _id });
  if (!user) {
    return { success: false, message: 'User not found' };
  }

  user.deposit -= amount;
  await user.save();
  return { success: true, user };
};

export const makeWithdrawMatic = async (_id: string, amount: number) => {
  const user = await User.findOne({ _id: _id });
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  if (user.maticBalance < amount) {
    return { success: false, message: 'Not Enough Matic' };
  }
  user.maticBalance -= amount;
  await user.save();
  return { success: true, user };
};

export const getUserBalance = async (_id: string) => {
  const userBalance = await User.findOne({ _id: _id });
  if (!userBalance) {
    return { success: false, message: 'User not found' };
  }
  return { success: true, userBalance: userBalance.deposit };
};

export const changePassword = async (_id: string, pass: string) => {
  const user = await User.findOne({ _id: _id });
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  user.pass = pass;
  await user.save();
  return { success: true, user };
};

export const changeUserImage = async (_id: string, filepath: string) => {
  const user: IUser = (await User.findByIdAndUpdate(_id, {
    $set: { img: filepath },
  })) as IUser;
  return user;
};

export const userCount = async () => {
  const count = await User.countDocuments({ status: true });
  return count;
};
