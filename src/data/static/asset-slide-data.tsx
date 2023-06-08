//images
import BitcoinImage from '@/assets/images/coin/bitcoin.svg';
import TetherImage from '@/assets/images/coin/tether.svg';
import CardanoImage from '@/assets/images/coin/cardano.svg';
import BinanceImage from '@/assets/images/coin/binance.svg';

import HorseImage1 from '@/assets/images/horse/Hrs_00006000.png';
import HorseImage2 from '@/assets/images/horse/Hrs_00006001.png';
import HorseImage3 from '@/assets/images/horse/Hrs_00006002.png';
import HorseImage4 from '@/assets/images/horse/Hrs_00006003.png';

export const assetSlideData = [
  {
    id: '0',
    name: 'Granderby Horse #0',
    symbol: 'BTC',
    balance: '0.2231345',
    usdBalance: '11,032.24',
    logo: HorseImage1,
    change: '+12.5%',
    isChangePositive: true,
    color: '#FDEDD4',
  },
  {
    id: '1',
    name: 'Granderby Horse #1',
    symbol: 'USDT',
    balance: '1.2345',
    usdBalance: '1,032.24',
    logo: HorseImage2,
    change: '-1.5%',
    isChangePositive: false,
    color: '#E1F9F1',
  },
  {
    id: '2',
    name: 'Granderby Horse #2',
    symbol: 'ADA',
    balance: '1.2370',
    usdBalance: '532.94',
    logo: HorseImage3,
    change: '+12.5%',
    isChangePositive: true,
    color: '#DBE3FF',
  },
  {
    id: '3',
    name: 'Granderby Horse #3',
    symbol: 'BUSD',
    balance: '240.55',
    usdBalance: '340.24',
    logo: HorseImage4,
    change: '+1.5%',
    isChangePositive: true,
    color: '#FBF5D5',
  },
];
