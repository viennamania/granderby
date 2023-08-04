import mongoose from 'mongoose';

export interface IHorseHistory {
  _id: mongoose.Types.ObjectId;
  date: Date;
  winnerHorse: string;
  winnerNft: {
    contract: string;
    tokenId: string;
  };
  placements: {
    line: number;
    horse: string;
  }[];
}
