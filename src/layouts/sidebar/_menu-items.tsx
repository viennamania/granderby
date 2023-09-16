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

import { SearchIcon } from '@/components/icons/search';

import { BookIcon } from '@/components/icons/book';

import { LivePricing } from '@/components/icons/live-pricing';

import { Ranking } from '@/components/icons/ranking';

import { Live } from '@/components/icons/live-icon';

import { RaceIcon } from '@/components/icons/race-icon';

export const menuItems = [
  {
    name: 'HOME',
    icon: <HomeIcon />,
    href: routes.home,
  },
  /*
  {
    name: 'RANKING',
    icon: <Ranking />,
    href: routes.ranking,
  },
  */

  {
    name: 'LIVE',
    icon: <Ranking />,
    href: routes.live,
  },

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
    name: 'ASSETS',
    icon: <SearchIcon />,
    href: routes.rentHorse,
    dropdownItems: [
      {
        name: 'Horse',
        icon: <CompassIcon />,
        href: routes.horse,
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
      {
        name: 'Item',
        icon: <PlusCircle />,
        href: routes.rentItem,
      },

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
    name: 'WALLET',
    icon: <FarmIcon />,
    href: routes.walletUsdc,
    dropdownItems: [
      {
        name: 'USDC',
        icon: <Usdc />,
        href: routes.walletUsdc,
      },
      {
        name: 'GRD',
        icon: <GrdIcon />,
        href: routes.walletGrd,
      },
    ],
  },

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
    name: 'SHOP',
    icon: <ExchangeIcon />,
    href: routes.mint,
    dropdownItems: [
      {
        name: 'Horse',
        icon: <PlusCircle />,
        href: routes.buyHorse,
      },
      {
        name: 'Carrot',
        icon: <PlusCircle />,
        href: routes.mintCarrot,
      },
      {
        name: 'Coupon',
        icon: <PlusCircle />,
        href: routes.mintCoupon,
      },
      {
        name: 'Ticket',
        icon: <PlusCircle />,
        href: routes.mintTicket,
      },
    ],
  },

  /*
  {
    name: 'Live Pricing',
    icon: <Ranking />,
    href: routes.livePricing,
  },
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
