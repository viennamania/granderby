import mongoose from 'mongoose';

export interface ISettings {
  _id: mongoose.Types.ObjectId;
  requestType: string;
  chat: boolean;
  welcomeBonus: number;
  bannerUrl: string;
  networks: any;
  settings: {
    general: {
      siteDescription: string;
      siteName: string;
      scrollingText: string;
      logoText: string;
      copyRightText: string;
    };
  };
  games: [
    {
      active: boolean;
      name: string;
      id: number;
    },
    {
      active: boolean;
      name: string;
      id: number;
    },
    {
      active: boolean;
      name: string;
      id: number;
    }
  ];
  token: {
    status: boolean;
    address: string;
    multiplier: number;
    decimals: number;
    img: string;
    symbol: string;
    gasLimit: number;
  };
  main: {
    status: boolean;
    swapStatus: boolean;
    toAddress: string;
    gasLimit: number;
    symbol: string;
  };
  texts: {
    index: {
      text: string;
      game1Title: string;
      game2Title: string;
      game3Title: string;
      game1Description: string;
      game2Description: string;
      game3Description: string;
    };
  };
}
