import mongoose from 'mongoose';

export interface IHorseGame {
  _id: mongoose.Types.ObjectId;
  userToken: string;
  username: string;
  img: string;
  betAmount: number;
  selectedSide: string;
}
