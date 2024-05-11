import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { HorseIcon } from '@/components/icons/horse';

import { FarmIcon } from '@/components/icons/farm';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';
import { Usdc } from '@/components/icons/usdc';
import { GrdIcon } from '@/components/icons/grd-icon';
import { GasIcon } from '@/components/icons/gas-icon';

import { SearchIcon } from '@/components/icons/search';

import { Bitcoin } from '@/components/icons/bitcoin';

import { BookIcon } from '@/components/icons/book';

import { LivePricing } from '@/components/icons/live-pricing';

import { Ranking } from '@/components/icons/ranking';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';

import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';

import { Live } from '@/components/icons/live-icon';

import { RaceIcon } from '@/components/icons/race-icon';

export const menuItems = [
  /*
  {
    name: 'HOME',
    icon: <HomeIcon />,
    href: routes.home,
  },
  */

  /*
  {
    name: 'INTRODUCTION',
    icon: <HomeIcon />,
    href: routes.intro,
  },
  */

  {
    name: 'INTRODUCTION',
    icon: <HomeIcon />,
    href: routes.intro,
    dropdownItems: [
      {
        name: 'NFT Granderby',
        icon: <CompassIcon />,
        href: routes.intro,
      },
      {
        name: 'NFT Trade',
        icon: <PlusCircle />,
        href: routes.intro,
      },
      {
        name: 'Training',
        icon: <DiskIcon />,
        href: routes.intro,
      },

      {
        name: 'Asset Management',
        icon: <VideogameAssetOutlinedIcon />,
        href: routes.intro,
      },

      {
        name: 'Partners',
        icon: <DiskIcon />,
        href: routes.intro,
      },

      {
        name: 'Roadmap',
        icon: <DiskIcon />,
        href: routes.intro,
      },

      {
        name: 'Whitepaper',
        icon: <DiskIcon />,
        href: routes.intro,
      },
    ],
  },

  /*
  {
    name: 'RANKING',
    icon: <Ranking />,
    href: routes.ranking,
  },
  */

  /*
  {
    name: 'ASSETS',
    icon: <CompassIcon />,
    href: routes.searchHorse,
    dropdownItems: [
      {
        name: 'Horse',
        icon: <CompassIcon />,
        href: routes.searchHorse,
      },
      {
        name: 'Jockey',
        icon: <PlusCircle />,
        href: routes.searchJockey,
      },
      {
        name: 'TRVC',
        icon: <DiskIcon />,
        href: routes.searchTrack,
      },

      {
        name: 'Car',
        icon: <DiskIcon />,
        href: routes.searchCar,
      },

      {
        name: 'Trump',
        icon: <DiskIcon />,
        href: routes.searchTrump,
      },

      {
        name: 'Reddit',
        icon: <DiskIcon />,
        href: routes.searchReddit,
      },
    ],
  },
  */

  /*
  {
    name: 'RACE',
    icon: <CompassIcon />,
    href: routes.liveRacing,
  },
  */

  /*
  {
    name: 'MARKET',
    icon: <CompassIcon />,
    href: routes.searchHorse,
    dropdownItems: [
      {
        name: 'Horse',
        icon: <CompassIcon />,
        href: routes.searchHorse,
      },
      {
        name: 'Jockey',
        icon: <PlusCircle />,
        href: routes.searchJockey,
      },
      {
        name: 'Track',
        icon: <DiskIcon />,
        href: routes.searchTrack,
      },
    ],
  },
  */

  /*
  {
    name: 'PROFILE',
    icon: <ProfileIcon />,
    href: routes.profile,
  },
  */

  {
    name: 'ASSET MANAGEMENT',
    icon: <VideogameAssetOutlinedIcon />,
    href: routes.myasset,
    dropdownItems: [
      {
        name: 'Portfolio',
        icon: <PlusCircle />,
        href: routes.myportfolio,
      },
      {
        name: 'NFT',
        icon: <PlusCircle />,
        href: routes.myasset,
      },
      /*
      {
        name: 'Item',
        icon: <PlusCircle />,
        href: routes.myitem,
      },
      */

      /*
      {
        name: 'Horse',
        icon: <CompassIcon />,
        href: routes.myhorse,
      },

      
      {
        name: 'Jockey',
        icon: <PlusCircle />,
        href: routes.rentJockey,
      },

      {
        name: 'Track',
        icon: <PlusCircle />,
        href: routes.track,
      },
      */

      /*
      {
        name: 'TRVC',
        icon: <PlusCircle />,
        href: routes.rentTRVC,
      },
      */
    ],
  },

  {
    name: 'RACE',
    icon: <PlusCircle />,
    href: routes.live,
    dropdownItems: [
      {
        name: 'Schedule',
        icon: <PlusCircle />,
        href: routes.raceSchedule,
      },
      {
        name: 'Finished',
        icon: <PlusCircle />,
        href: routes.raceFinished,
      },
      {
        name: 'Live',
        icon: <PlusCircle />,
        href: routes.live,
      },
    ],
  },

  /*
  {
    name: 'COIN',
    icon: <PlusCircle />,
    href: routes.coinUsdc,
    dropdownItems: [
      {
        name: 'USDC',
        icon: <Usdc />,
        href: routes.coinUsdc,
      },
      {
        name: 'GRD',
        icon: <GrdIcon />,
        href: routes.coinGrd,
      },
    ],
  },
  */

  /*
  {
    name: 'RACETRACK',
    icon: <FarmIcon />,
    href: routes.racetrack,
  },
  */

  /*
  {
    name: 'FIELD',
    icon: <FarmIcon />,
    href: routes.fieldHorse,
    dropdownItems: [
      {
        name: 'Horse',
        icon: <CompassIcon />,
        href: routes.fieldHorse,
      },

    ],
  },
  */

  /*
  {
    name: 'Landing',
    icon: <FarmIcon />,
    href: routes.landing,
  },
  */

  /*
  {
    name: 'Minting',
    icon: <FarmIcon />,
    href: routes.mint,
  },
  */

  {
    name: 'NFT',
    icon: <SearchIcon />,
    href: routes.mint,
    dropdownItems: [
      {
        name: 'Horse',
        icon: <CompassIcon />,
        href: routes.horse,
      },

      {
        name: 'Jockey',
        icon: <PlusCircle />,
        href: routes.jockey,
      },
      {
        name: 'Track',
        icon: <PlusCircle />,
        href: routes.track,
      },
      {
        name: 'Market',
        icon: <PlusCircle />,
        href: routes.buyHorse,
      },
      /*
      {
        name: 'Horse',
        icon: <PlusCircle />,
        href: routes.buyHorse,
      },
      */
      /*
      {
        name: 'Carrot',
        icon: <PlusCircle />,
        href: routes.mintCarrot,
      },
      */

      /*
      {
        name: 'Ticket',
        icon: <PlusCircle />,
        href: routes.mintTicket,
      },
      */
    ],
  },
  {
    name: 'RANK',
    //icon: <Ranking />,
    icon: <MilitaryTechOutlinedIcon />,
    href: routes.rankHorse,
    dropdownItems: [
      {
        name: 'Horse',
        icon: <CompassIcon />,
        href: routes.rankHorse,
      },

      {
        name: 'Jockey',
        icon: <PlusCircle />,
        href: routes.rankJockey,
      },
      {
        name: 'Track',
        icon: <PlusCircle />,
        href: routes.rankTrack,
      },
      {
        name: 'User',
        icon: <PlusCircle />,
        href: routes.rankUser,
      },
      {
        name: 'Leaderboard',
        icon: <PlusCircle />,
        href: routes.leaderboard,
      },
    ],
  },

  /*
  {
    name: 'SHOP',
    //icon: <ExchangeIcon />,
    icon: <ShoppingBagOutlinedIcon />,
    href: routes.mintCoupon,
    dropdownItems: [
      {
        name: 'Carrot',
        icon: <ExchangeIcon />,
        href: routes.mintCarrotPackage,
      },
      {
        name: 'Coupon',
        icon: <ExchangeIcon />,
        href: routes.mintCoupon,
      },
      {
        name: 'Ticket',
        icon: <ExchangeIcon />,
        href: routes.mintTicket,
      },
    ],
  },
  */

  /*
  {
    name: 'Farm',
    icon: <FarmIcon />,
    href: routes.farms,
  },
  {
    name: 'Swap',
    icon: <ExchangeIcon />,
    href: routes.swap,
  },
  {
    name: 'Liquidity',
    icon: <PoolIcon />,
    href: routes.liquidity,
  },
  */

  /*
  {
    name: 'NFTs',
    icon: <CompassIcon />,
    href: routes.search,
    dropdownItems: [
      {
        name: 'Explore NFTs',
        icon: <CompassIcon />,
        href: routes.search,
      },
      {
        name: 'Create NFT',
        icon: <PlusCircle />,
        href: routes.createNft,
      },
      {
        name: 'NFT Details',
        icon: <DiskIcon />,
        href: routes.nftDetails,
      },
    ],
  },


  {
    name: 'Vote',
    icon: <VoteIcon />,
    href: routes.vote,
    dropdownItems: [
      {
        name: 'Explore',
        href: routes.vote,
      },
      {
        name: 'Vote with pools',
        href: routes.proposals,
      },
      {
        name: 'Create proposal',
        href: routes.createProposal,
      },
    ],
  },
  */

  /*
  {
    name: 'Market',
    icon: <VoteIcon />,
    href: routes.marketplace,
    dropdownItems: [
      {
        name: 'Buy',
        href: routes.marketplace,
      },
      {
        name: 'Create Bid',
        href: routes.createBid,
      },
    ],
  },
  */
];
