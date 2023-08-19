import { model, models, Schema } from 'mongoose';

/////import { connectMongo } from '@/utils/services/database';
///////connectMongo();

import dbConnect from '@/lib/db/dbConnect';

dbConnect();

export const CoinSettingsModel =
  models.CoinSettings ||
  model(
    'CoinSettings',
    new Schema({
      wallet: String,
      winRate: Number,
      amount1: Number,
      amount2: Number,
      amount3: Number,
      amount4: Number,
      amount5: Number,
      amount6: Number,
    })
  );

export const editCoinFlipSettings = async (
  wallet: string,
  winRate: number,
  amount1: number,
  amount2: number,
  amount3: number,
  amount4: number,
  amount5: number,
  amount6: number
) => {
  const newSettings = await CoinSettingsModel.updateOne(
    {},
    { wallet, winRate, amount1, amount2, amount3, amount4, amount5, amount6 },
    { upsert: true }
  );
  return newSettings;
};

export const getCoinFlipSettings = async () => {
  const settings = await CoinSettingsModel.find({});
  return settings;
};
