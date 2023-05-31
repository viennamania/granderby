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
  {
    name: 'RANKING',
    icon: <Ranking />,
    href: routes.ranking,
  },
  {
    name: 'ASSET',
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

  {
    name: 'RACE',
    icon: <RaceIcon />,
    href: routes.race,
  },

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

  {
    name: 'Profile',
    icon: <ProfileIcon />,
    href: routes.profile,
  },
  /*
  {
    name: 'Landing',
    icon: <FarmIcon />,
    href: routes.landing,
  },
  */
  {
    name: 'Minting',
    icon: <FarmIcon />,
    href: routes.mint,
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
];
