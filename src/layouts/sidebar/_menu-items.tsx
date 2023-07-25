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

import { LivePricing } from '@/components/icons/live-pricing';
import { Ranking } from '@/components/icons/ranking';

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
    name: 'WALLET',
    icon: <ProfileIcon />,
    href: routes.wallet,
  },

  {
    name: 'ASSETS',
    icon: <FarmIcon />,
    href: routes.rentHorse,
    dropdownItems: [
      {
        name: 'Horse',
        icon: <CompassIcon />,
        href: routes.rentHorse,
      },
      {
        name: 'Jockey',
        icon: <PlusCircle />,
        href: routes.rentJockey,
      },
      {
        name: 'Track',
        icon: <PlusCircle />,
        href: routes.rentTrack,
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

  /*
  {
    name: 'MINT',
    icon: <FarmIcon />,
    href: routes.mint,
    dropdownItems: [
      {
        name: 'Horse',
        icon: <CompassIcon />,
        href: routes.mintHorse,
      },
      {
        name: 'Jockey',
        icon: <PlusCircle />,
        href: routes.mintJockey,
      },
    ],
  },
  */

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
