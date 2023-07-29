import { Schema, models, model } from 'mongoose';
import { INpc } from '../interfaces/npc-interface';

//import { connectMongo } from '../services/database';
import clientPromise from '@/lib/mongodb';

import { getCoinConvert } from './settings-model';

//connectMongo();

const NpcSchema = new Schema({
  /*
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
  */

  TEXTURE_KEY: {
    type: String,
    required: true,
    default: '',
  },
  HORSEBODY: {
    type: String,
    required: true,
    default: '',
  },
  HORSEMANE: {
    type: String,
    required: true,
    default: '',
  },
  HORSETAIL: {
    type: String,
    required: true,
    default: '',
  },
  HORSEBODYMASK: {
    type: String,
    required: true,
    default: '',
  },
  HORSEHEADMASK: {
    type: String,
    required: true,
    default: '',
  },
  HORSELEGMASK: {
    type: String,
    required: true,
    default: '',
  },
  HORSEMANEMASK: {
    type: String,
    required: true,
    default: '',
  },
  HORSETAILMASK: {
    type: String,
    required: true,
    default: '',
  },
  HORSEBODYACC: {
    type: String,
    required: true,
    default: '',
  },
  HORSEHEADACC: {
    type: String,
    required: true,
    default: '',
  },
  HORSELEGACC: {
    type: String,
    required: true,
    default: '',
  },
  HORSESIZE: {
    type: String,
    required: true,
    default: '',
  },
  HORSEBODYCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSEMANECOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSETAILCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSEBODYMASKCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSEHEADMASKCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSELEGMASKCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSEMANEMASKCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSETAILMASKCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSEBODYACCCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSEHEADACCCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSELEGACCCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  COMMENT: {
    type: String,
    required: true,
    default: '',
  },
  GRADE: {
    type: String,
    required: true,
    default: '',
  },
  WORLD: {
    type: String,
    required: true,
    default: '',
  },
});

export const Npc = models.Horseextend || model('Horseextend', NpcSchema);

console.log('Npc', Npc);

export const newNpc = async (
  username: string,
  email: string,
  pass: string,
  walletAddress: string,
  bonus: number
) => {
  const checkUser = await Npc.findOne({ email: email });
  if (checkUser) {
    return { success: false, message: 'User already exists' };
  }
  const user = new Npc({
    username: username,
    email: email,
    pass: pass,
    walletAddress: walletAddress,
    deposit: bonus,
  });
  return await user.save();
};

export const loginNpc = async (email: string) => {
  const user = await Npc.findOne({ email: email });
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

export const getNpc = async (_id: string) => {
  const user = await Npc.findOne({ _id: _id });
  if (user) {
    return { success: true, user };
  } else {
    return { success: false, message: 'User not found' };
  }
};

export const getNpcFromEmail = async (email: string) => {
  const user = await Npc.findOne({ email: email });
  if (user) {
    return { success: true, user };
  } else {
    return { success: false, message: 'User not found' };
  }
};

export const getNpcFromTextureKey = async (textureKye: string) => {
  console.log('getNpcFromTextureKey', textureKye);

  /*
  ///console.log("getNpcFromTextureKey", textureKye);

  const user = await Npc.findOne({ TEXTURE_KEY: textureKye });

  ////const user = await Npc.findOne({ texture_key: textureKye});

  //const user = await Npc.findOne({ _id: "64c1e28568445fe469888f13"});

  if (user) {
    return { success: true, user };
  } else {
    return { success: false, message: 'User not found' };
  }
  */

  const client = await clientPromise;

  /////console.log('client', client);

  const db = client.db('granderby');

  const user = await db
    .collection('horseextends')
    .findOne({ TEXTURE_KEY: textureKye });

  /////console.log("user", user);

  // 특단의 조치를 취하기로
  /////const res = client.close();
  //////console.log('res', res);

  if (user) {
    return { success: true, user };
  } else {
    return { success: false, message: 'User not found' };
  }
};

export const getAllNpcs = async () => {
  ///const users: INpc[] = (await Npc.find({ status: true })) as INpc[];

  const users: INpc[] = (await Npc.find({})) as INpc[];

  if (users) {
    return { success: true, users };
  } else {
    return { success: false, message: 'Users not found' };
  }
};

export const airdrop = async (amount: any) => {
  const users: INpc[] = (await Npc.find({ status: true })) as INpc[];
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

export const updateNpc = async (
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
  const updatedUser: INpc = (await Npc.findOneAndUpdate(
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
  )) as INpc;
  if (updatedUser) {
    return { success: true, updatedUser };
  }
  return { success: false, message: 'User not found' };
};

export const deleteNpc = async (_id: string) => {
  const check = await Npc.findOne({ _id: _id });

  const pasifUser: INpc = (await Npc.findOneAndUpdate(
    { _id: _id },
    {
      status: false,
    },
    { new: true }
  )) as INpc;
  if (pasifUser) {
    if (check.admin) {
      return { success: false, message: 'Admin can not be deleted' };
    }
    return { success: true, pasifUser };
  }
  return { success: false, message: 'User not found' };
};

export const makeDepositMatic = async (_id: string, amount: number) => {
  const updatedUser: INpc = (await Npc.findOneAndUpdate(
    { _id: _id },
    {
      $inc: { maticBalance: amount },
    },
    { new: true }
  )) as INpc;
  if (updatedUser) {
    return { success: true, updatedUser };
  }
  return { success: false, message: 'User not found' };
};

export const makeDepositCoin = async (_id: string, amount: number) => {
  const user = await Npc.findOne({ _id: _id });
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
  const updatedUser: INpc = (await Npc.findOneAndUpdate(
    { _id: _id },
    {
      $inc: { deposit: amount },
    },
    { new: true }
  )) as INpc;
  if (updatedUser) {
    return { success: true, updatedUser };
  }
  return { success: false, message: 'User not found' };
};

export const makeWinDepositCoin = async (_id: string, amount: number) => {
  const user = await Npc.findOne({ _id: _id });
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  user.deposit = user.deposit + amount;
  await user.save();
  return { success: true, user };
};

export const swapToMatic = async (_id: string, amount: number) => {
  const user = await Npc.findOne({ _id: _id });
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
  const user = await Npc.findOne({ _id: _id });
  if (!user) {
    return { success: false, message: 'User not found' };
  }

  user.deposit -= amount;
  await user.save();
  return { success: true, user };
};

export const makeWithdrawMatic = async (_id: string, amount: number) => {
  const user = await Npc.findOne({ _id: _id });
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

export const getNpcBalance = async (_id: string) => {
  const userBalance = await Npc.findOne({ _id: _id });
  if (!userBalance) {
    return { success: false, message: 'User not found' };
  }
  return { success: true, userBalance: userBalance.deposit };
};

export const changePassword = async (_id: string, pass: string) => {
  const user = await Npc.findOne({ _id: _id });
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  user.pass = pass;
  await user.save();
  return { success: true, user };
};

export const changeNpcImage = async (_id: string, filepath: string) => {
  const user: INpc = (await Npc.findByIdAndUpdate(_id, {
    $set: { img: filepath },
  })) as INpc;
  return user;
};

export const npcCount = async () => {
  const count = await Npc.countDocuments({ status: true });
  return count;
};
