import { connectMongo } from '@/utils/services/database';
import { Schema, model, models } from 'mongoose';

connectMongo();

export const HorsesModel =
  models.Horses ||
  model(
    'Horses',
    new Schema({
      horse1: String,
      horse2: String,
      horse3: String,
      horse4: String,
      horse5: String,
      nft1: Number,
      nft2: Number,
      nft3: Number,
      nft4: Number,
      nft5: Number,
      media1: String,
      media2: String,
      media3: String,
      media4: String,
      media5: String,
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

export const editHorseNames = async (
  horse1: string,
  horse2: string,
  horse3: string,
  horse4: string,
  horse5: string
) => {
  const newHorseNames = await HorsesModel.updateOne(
    {},
    { horse1, horse2, horse3, horse4, horse5 },
    { upsert: true }
  );
  return newHorseNames;
};

export const updateHorseInputs = async (
  input1: number,
  input2: number,
  input3: number,
  input4: number,
  input5: number,
  input6: number
) => {
  const newHorseInputs = await HorsesModel.updateOne(
    {},
    { inputs: { input1, input2, input3, input4, input5, input6 } },
    { upsert: true }
  );
  return newHorseInputs;
};

export const getHorseNames = async () => {
  const horses = await HorsesModel.find({});
  return horses;
};

export const getHorseInputs = async () => {
  const inputs = await HorsesModel.find({});
  return inputs;
};
