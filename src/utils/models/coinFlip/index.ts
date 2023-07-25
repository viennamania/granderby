import WinLost from '@/utils/coinFlip/enums/winLost.enum';
import ICoinFlip from '@/utils/coinFlip/interfaces/game.interface';
import { connectMongo } from '@/utils/services/database';
import mongoose, { model, models, Schema } from 'mongoose';

connectMongo();

export const CoinFlip =
  models.CoinFlip ||
  model(
    'CoinFlip',
    new Schema({
      userId: String,
      username: String,
      img: String,
      pickedSide: String,
      betAmount: Number,
      betResult: String,
    })
  );

export const getByUserId = async (id: string) => {
  const games: ICoinFlip[] = (await CoinFlip.find({
    userId: id,
  })) as ICoinFlip[];
  if (games) {
    return { success: true, games };
  } else {
    return { success: false, message: 'Games not found.' };
  }
};

export const getAllCoinFlips = async (limit: number = 0) => {
  let games: ICoinFlip[];
  if (limit > 0) {
    games = await CoinFlip.find({})
      .sort({ _id: -1 })
      .limit(limit)
      .select('-userId');
  } else {
    games = await CoinFlip.find({}).sort({ _id: -1 }).select('-userId');
  }

  if (games.length > 0) {
    return { success: true, games };
  } else {
    return { success: false, message: 'No games found.' };
  }
};

export const insertCoinFlipGame = async (
  userId: string,
  pickedSide: string,
  username: string,
  img: string,
  betAmount: string,
  betResult: string
) => {
  const game = new CoinFlip({
    userId,
    pickedSide,
    username,
    img,
    betAmount,
    betResult,
  });
  const result = await game.save();
  if (result) {
    return { success: true, game: result };
  } else {
    return { success: false, message: 'Game not inserted.' };
  }
};

export const getCoinStreak = async () => {
  const games: ICoinFlip[] = (await CoinFlip.find({})
    .sort({
      _id: -1,
    })
    .select('-userId')) as ICoinFlip[];
  if (games.length > 0) {
    let streak: any[] = [];
    games.map((game, i) => {
      streak.push({ count: 0, game });
    });

    // calculate win/lost streak
    let winStreak = 0;
    let lostStreak = 0;
    let winStreakWallet = '';
    let lostStreakWallet = '';
    streak.reverse();
    streak.map((streak, i) => {
      if (streak.game.betResult === WinLost.WIN) {
        winStreak += 1;
        lostStreak = 0;
        if (winStreak > 1) {
          streak.count = winStreak;
          winStreakWallet = streak.game.wallet;
        }
      } else if (streak.game.betResult === WinLost.LOST) {
        lostStreak++;
        winStreak = 0;
        if (lostStreak > 1) {
          streak.count = lostStreak;
          lostStreakWallet = streak.game.wallet;
        }
      }
    });

    streak.reverse();
    return streak;
  }
};

export const getCoinFlipLeaderBoard = async () => {
  const games: ICoinFlip[] = await CoinFlip.find({
    _id: {
      $lt: mongoose.Types.ObjectId.createFromTime(
        Date.now() / 1000 - 24 * 60 * 60
      ),
    },
    betResult: 'win',
  }).sort({ _id: -1 });
  return games;
};
