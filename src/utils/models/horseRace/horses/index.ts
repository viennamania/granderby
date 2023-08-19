import { Schema, model, models } from 'mongoose';

///import { connectMongo } from '@/utils/services/database';
////connectMongo();

import dbConnect from '@/lib/db/dbConnect';

dbConnect();

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
      horse6: String,
      horse7: String,
      horse8: String,
      horse9: String,
      horse10: String,
      nft1: Number,
      nft2: Number,
      nft3: Number,
      nft4: Number,
      nft5: Number,
      nft6: Number,
      nft7: Number,
      nft8: Number,
      nft9: Number,
      nft10: Number,
      inputs: {
        type: Object,
        default: {
          input1: 1,
          input2: 2,
          input3: 3,
          input4: 4,
          input5: 5,
          input6: 6,
          input7: 7,
          input8: 8,
          input9: 9,
          input10: 10,
        },
      },
    })
  );

export const editHorseNames = async (
  horse1: string,
  horse2: string,
  horse3: string,
  horse4: string,
  horse5: string,
  horse6: string,
  horse7: string,
  horse8: string,
  horse9: string,
  horse10: string
) => {
  const newHorseNames = await HorsesModel.updateOne(
    {},
    {
      horse1,
      horse2,
      horse3,
      horse4,
      horse5,
      horse6,
      horse7,
      horse8,
      horse9,
      horse10,
    },
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
  input6: number,
  input7: number,
  input8: number,
  input9: number,
  input10: number
) => {
  const newHorseInputs = await HorsesModel.updateOne(
    {},
    {
      inputs: {
        input1,
        input2,
        input3,
        input4,
        input5,
        input6,
        input7,
        input8,
        input9,
        input10,
      },
    },
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
