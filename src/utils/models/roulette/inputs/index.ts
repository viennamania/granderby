import { connectMongo } from '@/utils/services/database';
import { models, model, Schema } from 'mongoose';

connectMongo();

export const RouletteSettingsModel =
  models.RouletteSettings ||
  model(
    'RouletteSettings',
    new Schema({
      inputs: {
        type: Object,
        default: {
          input1: 1,
          input2: 2,
          input3: 3,
          input4: 4,
          input5: 5,
          input6: 6,
        },
      },
    })
  );

export const updateRouletteInputs = async (
  input1: number,
  input2: number,
  input3: number,
  input4: number,
  input5: number,
  input6: number
) => {
  const newRouletteInputs = await RouletteSettingsModel.updateOne(
    {},
    { inputs: { input1, input2, input3, input4, input5, input6 } },
    { upsert: true }
  );
  return newRouletteInputs;
};

export const getRouletteInputs = async () => {
  const rouletteInputs = await RouletteSettingsModel.findOne();
  return rouletteInputs;
};
