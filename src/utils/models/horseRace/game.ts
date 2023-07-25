import { connectMongo } from '@/utils/services/database';
import { Schema, models, model } from 'mongoose';
import { User } from '../user-model';
import { IHorseGame } from '@/utils/horseRace/interfaces/horseGame';

connectMongo();

const HorseGameSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  betAmount: {
    type: Number,
    required: true,
  },
  selectedSide: {
    type: String,
    required: true,
  },
});

export const HorseGame =
  models.HorseRace || model('HorseRace', HorseGameSchema);

export const newGameHorse = async (
  userId: string,
  username: string,
  img: string,
  betAmount: number,
  selectedSide: string
) => {
  const games = await HorseGame.findOne({ userId: userId });
  if (games) {
    return { success: false, message: 'User already in game' };
  }
  const game = new HorseGame({
    userId,
    username,
    img,
    betAmount,
    selectedSide,
  });
  const user = await User.findOne({ _id: userId });

  if (user) {
    if (user.deposit < betAmount) {
      return { success: false, message: 'Not enough money' };
    }
  }

  if (user) {
    user.deposit -= betAmount;
    await user.save();
  } else {
    return { success: false, message: 'User not found' };
  }

  await game.save();
  return { success: true, game };
};

export const getHorseGames = async () => {
  let games: IHorseGame[];
  games = await HorseGame.find({})
    .sort({ _id: -1 })
    .select('-userId')
    .select('-_id');
  return games;
};

export const getHorseGameByUserId = async (userId: string) => {
  return HorseGame.findOne({ userId });
};

export const deleteOneHorseGame = async (
  userId: string,
  selectedSide: string
) => {
  return HorseGame.deleteOne({ userId: userId, selectedSide: selectedSide });
};

export const deleteAllHorseGames = async () => {
  let games: IHorseGame[];
  games = await HorseGame.find({}).sort({ _id: -1 });
  await HorseGame.deleteMany({}, games);
  return { success: true, games };
};
