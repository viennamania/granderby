import BitcoinImage from '@/assets/images/coin/bitcoin.svg';
import TetherImage from '@/assets/images/coin/tether.svg';
import CardanoImage from '@/assets/images/coin/cardano.svg';
import BinanceImage from '@/assets/images/coin/binance.svg';

import { Bitcoin } from '@/components/icons/bitcoin';
import { Tether } from '@/components/icons/tether';
import { Bnb } from '@/components/icons/bnb';
import { Cardano } from '@/components/icons/cardano';

import { HorseIcon } from '@/components/icons/horse';

import { RaceIcon } from '@/components/icons/race-icon';
import { PowerIcon } from '@/components/icons/power';

///import HorseImage1 from '@/assets/images/nft/Hrs_00006000.png';
const HorseImage1 = '/images/NFT/nft_01.jpg';
const HorseImage2 = '/images/NFT/nft_02.jpg';
const HorseImage3 = '/images/NFT/nft_03.jpg';
const HorseImage4 = '/images/NFT/nft_04.jpg';
const HorseImage5 = '/images/NFT/nft_05.jpg';
const HorseImage6 = '/images/NFT/nft_06.jpg';

export const priceFeedData = [
  {
    id: '524',
    name: 'DISCOREA',
    symbol: 'USD',
    balance: '120.22',
    usdBalance: '120.22',
    logo: HorseImage1,
    change: '+6.5%',
    isChangePositive: true,
    color: '#FDEDD4',
    icon: <HorseIcon />,
    prices: [
      { name: 1, value: 110.44 },
      { name: 2, value: 125.99 },
      { name: 3, value: 99.98 },
      { name: 4, value: 120.55 },
      { name: 5, value: 150.4 },
      { name: 6, value: 153.4 },
      { name: 7, value: 133.4 },
      { name: 8, value: 136.4 },
      { name: 9, value: 143.4 },
    ],
  },
  {
    id: '945',
    name: 'WESTERN',
    symbol: 'USD',
    balance: '162.45',
    usdBalance: '162.45',
    logo: HorseImage2,
    change: '-1.5%',
    isChangePositive: false,
    color: '#E1F9F1',
    icon: <HorseIcon />,
    prices: [
      { name: 1, value: 152.44 },
      { name: 2, value: 122.99 },
      { name: 3, value: 132.98 },
      { name: 4, value: 142.55 },
      { name: 5, value: 132.4 },
      { name: 6, value: 122.4 },
      { name: 7, value: 122.4 },
      { name: 8, value: 104.4 },
      { name: 9, value: 102.4 },
    ],
  },
  {
    id: '232',
    name: 'WINTER',
    symbol: 'USD',
    balance: '632.20',
    usdBalance: '632.20',
    logo: HorseImage3,
    change: '+12.5%',
    isChangePositive: true,
    color: '#DBE3FF',
    icon: <HorseIcon />,
    prices: [
      { name: 1, value: 632.44 },
      { name: 2, value: 632.99 },
      { name: 3, value: 434.98 },
      { name: 4, value: 555.55 },
      { name: 5, value: 543.4 },
      { name: 6, value: 677.4 },
      { name: 7, value: 699.4 },
      { name: 8, value: 722.4 },
      { name: 9, value: 763.4 },
    ],
  },
  {
    id: '2224',
    name: 'MOTRICO',
    symbol: 'USD',
    balance: '1446.55',
    usdBalance: '1446.55',
    logo: HorseImage4,
    change: '+1.5%',
    isChangePositive: true,
    color: '#FBF5D5',
    icon: <HorseIcon />,
    prices: [
      { name: 1, value: 1446.44 },
      { name: 2, value: 1446.99 },
      { name: 3, value: 1446.98 },
      { name: 4, value: 1546.55 },
      { name: 5, value: 1646.4 },
      { name: 6, value: 1636.4 },
      { name: 7, value: 1386.4 },
      { name: 8, value: 1856.4 },
      { name: 9, value: 1886.4 },
    ],
  },
  {
    id: '413',
    name: 'TIZIANO',
    symbol: 'USD',
    balance: '1407.55',
    usdBalance: '1407.55',
    logo: HorseImage5,
    change: '+2.9%',
    isChangePositive: true,
    color: '#FBF5D5',
    icon: <HorseIcon />,
    prices: [
      { name: 1, value: 1507.44 },
      { name: 2, value: 1467.99 },
      { name: 3, value: 1445.98 },
      { name: 4, value: 1346.55 },
      { name: 5, value: 1633.4 },
      { name: 6, value: 1535.4 },
      { name: 7, value: 1336.4 },
      { name: 8, value: 1346.4 },
      { name: 9, value: 1645.4 },
    ],
  },
  {
    id: '1032',
    name: 'VIENNA',
    symbol: 'USD',
    balance: '240.55',
    usdBalance: '240.55',
    logo: HorseImage6,
    change: '-3.5%',
    isChangePositive: false,
    color: '#E1F9F1',
    icon: <HorseIcon />,
    prices: [
      { name: 1, value: 250.44 },
      { name: 2, value: 270.99 },
      { name: 3, value: 250.98 },
      { name: 4, value: 222.55 },
      { name: 5, value: 245.4 },
      { name: 6, value: 235.4 },
      { name: 7, value: 222.4 },
      { name: 8, value: 199.4 },
      { name: 9, value: 156.4 },
    ],
  },
];
