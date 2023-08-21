import { model, models, Schema } from 'mongoose';

///import { connectMongo } from '../services/database';

///connectMongo();

import dbConnect from '@/lib/db/dbConnect';

dbConnect();

const SettingsSchema = new Schema({
  requestType: {
    type: String,
    required: true,
  },
  chat: {
    type: Boolean,
    required: false,
  },
  welcomeBonus: {
    type: Number,
    default: 0,
  },
  bannerUrl: {
    type: String,
    required: false,
  },
  networks: {
    type: Array,
    required: false,
  },
  settings: {
    type: Object,
    required: false,
  },
  games: {
    type: Array,
    required: false,
  },
  token: {
    type: Object,
    required: false,
  },
  main: {
    type: Object,
    required: false,
  },
  texts: {
    type: Object,
    required: false,
  },
});

export const SettingModel =
  models.Settings || model('Settings', SettingsSchema);

export const createSettings = async (
  requestType: string,
  chat: boolean,
  networks: any
) => {
  const settings = new SettingModel({
    requestType,
    chat,
    networks: [],
    settings: {},
  });
  await settings.save();
};

export const getSettings = async () => {
  const settings = await SettingModel.find();

  console.log('getSettings', settings);

  return settings;
};

export const updateSettings = async (
  _id: string,
  requestType: string,
  chat: boolean,
  networks: any
) => {
  console.log('updateSettings', _id, requestType, chat, networks);

  const settings = await SettingModel.findOne({ _id });

  settings.requestType = requestType;
  settings.chat = chat;
  settings.networks = [];

  networks.forEach((network: any) => {
    settings.networks.push(network);
  });

  settings.save();

  return settings;
};

export const updateSettingsSettings = async (_id: string, settings: any) => {
  const settingsOb = await SettingModel.findOne({ _id });
  settingsOb.settings = settings;
  settingsOb.save();
  return settingsOb;
};

export const deleteSettings = async (_id: string) => {
  const deleted = await SettingModel.findOneAndDelete({ _id });
  return deleted;
};

export const getCoinConvert = async () => {
  const settings = await SettingModel.find();
  return {
    coin: settings[0].token.symbol,
    multiplier: settings[0].token.multiplier,
  };
};

export const createGameSettings = async (games: any) => {
  const settings = await SettingModel.find();
  settings[0].games = games;
  settings[0].save();

  return settings[0];
};

export const getGameSettings = async () => {
  const settings = await SettingModel.find();
  return settings[0].games;
};

export const updateGameStatus = async (gameId: number, active: boolean) => {
  await SettingModel.updateOne(
    { 'games.id': gameId },
    { $set: { 'games.$.active': active } }
  );
  const settings = await SettingModel.findOne();
  return settings?.games || [];
};

export const createTokenSettings = async (token: any, main: any) => {
  console.log('createTokenSettings', token, main);

  const settings = await SettingModel.find();

  settings[0].token = token;
  settings[0].main = main;
  settings[0].save();
  return settings[0];
};

export const changeWelcomeBonus = async (bonus: number) => {
  const settings = await SettingModel.find();
  settings[0].welcomeBonus = bonus;
  settings[0].save();
  return settings[0];
};

export const updateTexts = async (texts: any) => {
  const settings = await SettingModel.find();
  settings[0].texts = texts;
  settings[0].save();
  return settings[0];
};

export const setBannerUrl = async (url: string) => {
  const settings = await SettingModel.find();
  settings[0].bannerUrl = url;
  settings[0].save();
  return settings[0];
};

export const getWithdrawType = async () => {
  const type = await SettingModel.find();
  return type[0].requestType;
};
