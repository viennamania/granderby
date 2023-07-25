import { IHorseHistory } from '@/utils/horseRace/interfaces/horseHistory';
import { connectMongo } from '@/utils/services/database';
import { Schema, models, model } from 'mongoose';

connectMongo();

const HorseHistorySchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  winnerHorse: {
    type: String,
    required: true,
  },
  winnerNft: {
    type: Number,
    required: true,
  },
  placements: {
    type: Array,
    line: {
      type: Number,
      required: true,
    },
    horse: {
      type: String,
      required: true,
    },
  },
});

export const HorseHistoryModel =
  models.HorseHistory ||
  model<IHorseHistory>('HorseHistory', HorseHistorySchema);

export const newHorseHistory = async (
  winnerHorse: string,
  placements: { line: number; horse: string }[]
): Promise<IHorseHistory> => {
  const history = new HorseHistoryModel({ winnerHorse, placements });
  return await history.save();
};

export const getHorseHistory = async (): Promise<IHorseHistory[]> => {
  return await HorseHistoryModel.find().sort({ date: -1 }).limit(10);
};

export const getHorseLastHistory = async (): Promise<IHorseHistory> => {
  return await HorseHistoryModel.findOne().sort({ date: -1 });
};
