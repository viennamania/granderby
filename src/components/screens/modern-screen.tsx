import cn from 'classnames';
import { useEffect, useState, useMemo } from 'react';
import { NextSeo } from 'next-seo';

import CoinSlider from '@/components/ui/coin-card';
import AssetSlider from '@/components/ui/asset-card';

import OverviewChart from '@/components/ui/chats/overview-chart';
import LiquidityChart from '@/components/ui/chats/liquidity-chart';
import VolumeChart from '@/components/ui/chats/volume-chart';
import TopPools from '@/components/ui/top-pools';
import TransactionTable from '@/components/transaction/transaction-table';
import TopCurrencyTable from '@/components/top-currency/currency-table';

import { coinSlideData } from '@/data/static/coin-slide-data';
import { assetSlideData } from '@/data/static/asset-slide-data';

import Avatar from '@/components/ui/avatar';
import TopupButton from '@/components/ui/topup-button';

import Image from '@/components/ui/image';
import IcoApple from '@/assets-landing/images/ico-apple.svg';
import IcoAndroid from '@/assets-landing/images/ico-android.svg';

//images
import AuthorImage from '@/assets/images/profile.png';
import SystemImage from '@/assets/images/logo.png';

import WalkingAnim from '@/components/horseRace/watchScreen/walkingAnim';

//import BetInputs from '@/components/horseRace/watchScreen/betInputsGranderby';

import EntryTables from '@/components/horseRace/watchScreen/entryTables';

import BetTables from '@/components/horseRace/watchScreen/betTablesGranderby';

//@ts-ignore
import { Socket, io } from 'socket.io-client';

import LastWinners from '@/components/horseRace/watchScreen/lastWinnersGranderby';

import OwnedFeeds from '@/components/search/feeds-horse-owned-widget';
//import OwnedFeeds from '@/components/search/feeds-horse-owned';

import {
  ConnectWallet,
  useDisconnect,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
  usePaperWalletUserEmail,
} from '@thirdweb-dev/react';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
  stakingContractAddressJockey,
  tokenContractAddressGRD,
  addressAirdropReward,
  addressRaceReward,
} from '@/config/contractAddresses';

import { BigNumber, ethers } from 'ethers';

import LiveNftPricingSlider from '@/components/ui/live-nft-horse-pricing-slider';

import LivePricingSliderRetro from '@/components/ui/live-pricing-slider-retro';
import Link from 'next/link';

import { IHorseGame } from '@/utils/horseRace/interfaces/horseGame';

import CollapseIntroVideo from '@/components/ui/collapse-intro-video';
import CollapseLivePricing from '@/components/ui/collapse-live-pricing';
import CollapseLastWinners from '@/components/ui/collapse-last-winners';
import CollapseCurrentEvent from '@/components/ui/collapse-current-event';

import CollapsePortfolio from '@/components/ui/collapse-portfolio';

import CryptoCurrencyPricingSkeleton from '@/components/ui/skeleton/CryptoCurrencyPricingSkeleton';

import toast from 'react-hot-toast';
//import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useRouter } from 'next/router';

import { format } from 'date-fns';

import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
} from 'react-table';

import Button from '@/components/ui/button';
import Scrollbar from '@/components/ui/scrollbar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { ArrowRight } from '@/components/icons/arrow-right';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import { LongArrowLeft } from '@/components/icons/long-arrow-left';
import { LinkIcon } from '@/components/icons/link-icon';
import { Refresh } from '@/components/icons/refresh';
import { InfoIcon } from '@/components/icons/info-icon';

import { useDrawer } from '@/components/drawer-views/context';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';

import PortfolioChart from '@/components/ui/chats/portfolio-chart';

import ProfitChart from '@/components/ui/chats/profilt-chart';
import ProfitChartUsers from '@/components/ui/chats/profilt-chart-users';

import { tr } from 'date-fns/locale';

import CommitIcon from '@mui/icons-material/Commit';

import MailOutlineIcon from '@mui/icons-material/MailOutline';

import AvTimerOutlinedIcon from '@mui/icons-material/AvTimerOutlined';

import { kv } from '@vercel/kv';
import { set } from 'lodash';

const COLUMNS = [
  {
    Header: 'User',
    accessor: 'user',
    minWidth: 100,
    maxWidth: 100,
  },

  /*
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Hash</div>,
    accessor: 'hash',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <button
        className=" flex flex-row items-center justify-start "
        onClick={() =>
          //alert("clicked")

          (location.href = 'https://polygonscan.com/tx/' + value)
        }
      >
        <Image src="/images/logo-polygon.png" alt="gd" width={13} height={13} />

        <div className="ml-1 text-left text-xs -tracking-[1px]  ">
          {value.substring(0, 6) + '...'}
        </div>
      </button>
    ),
    minWidth: 80,
    maxWidth: 80,
  },
  */

  /*
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Item</div>,
    accessor: 'asset',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="text-xs font-bold ltr:text-right rtl:text-left xl:text-xs ">
        {value === 'CARROT' && (
          <Image
            src="/images/shop/icon-carrot.png"
            alt="gd"
            width={18}
            height={18}
          />
        )}
        {value === 'SUGAR' && (
          <Image
            src="/images/shop/icon-sugar.png"
            alt="gd"
            width={18}
            height={18}
          />
        )}
        {value === 'GRD' && (
          <Image
            src="/images/shop/icon-grd.png"
            alt="gd"
            width={38}
            height={38}
          />
        )}
        {value === 'GRANDERBY' && (
          <Image src="/images/shop/horse.png" alt="gd" width={28} height={28} />
        )}
        {value === 'GCOW' && (
          <Image src="/images/icon-usdc.png" alt="gd" width={18} height={18} />
        )}
      </div>
    ),
    minWidth: 80,
    maxWidth: 80,
  },
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">TokenID</div>,
    accessor: 'amount',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="text-sm font-bold ltr:text-right rtl:text-left xl:text-xl ">
        {value}
      </div>
    ),
    minWidth: 80,
    maxWidth: 80,
  },
  */

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Messages</div>,
    accessor: 'category',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="text-xs text-green-600 ltr:text-right rtl:text-left xl:text-sm">
        {value}
      </div>
    ),
    minWidth: 250,
    maxWidth: 250,
  },

  /*
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">From</div>,
    accessor: 'tokenFrom',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="flex items-center justify-start">
        <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
        {value == '0x0000000000000000000000000000000000000000'
          ? 'Drops'
          : value?.length > 6
          ? value?.substring(0, 6) + '...'
          : value}
      </div>
    ),
    minWidth: 90,
    maxWidth: 90,
  },
  */

  /*
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">To/From</div>,
    accessor: 'tokenTo',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="flex items-center justify-start">
        <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
        {value == '0x0000000000000000000000000000000000000000'
          ? 'Drops'
          : value?.length > 6
          ? value?.substring(0, 6) + '...'
          : value}
      </div>
    ),
    minWidth: 120,
    maxWidth: 120,
  },
  */

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Date</div>,
    accessor: 'createdAt',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className=" flex flex-row items-center justify-end gap-2 ">
        {/* AvTimerOutlinedIcon color gray */}
        {/*
        <AvTimerOutlinedIcon fontSize='small' />
        */}
        {/* differece between now and createdAt */}

        {Math.floor(
          (new Date().getTime() - Date.parse(value)) / 1000 / 60 / 60 / 24
        ) > 0 ? (
          <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
            {Math.floor(
              (new Date().getTime() - Date.parse(value)) / 1000 / 60 / 60 / 24
            )}{' '}
            days ago
          </div>
        ) : Math.floor(
            (new Date().getTime() - Date.parse(value)) / 1000 / 60 / 60
          ) > 0 ? (
          <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
            {Math.floor(
              (new Date().getTime() - Date.parse(value)) / 1000 / 60 / 60
            )}{' '}
            hours ago
          </div>
        ) : Math.floor((new Date().getTime() - Date.parse(value)) / 1000 / 60) >
          0 ? (
          <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
            {Math.floor((new Date().getTime() - Date.parse(value)) / 1000 / 60)}{' '}
            minutes ago
          </div>
        ) : Math.floor((new Date().getTime() - Date.parse(value)) / 1000) >
          0 ? (
          <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
            {Math.floor((new Date().getTime() - Date.parse(value)) / 1000)}{' '}
            seconds ago
          </div>
        ) : (
          <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
            just now
          </div>
        )}

        {/*
          format(Date.parse(value), 'yyy-MM-dd hh:mm:ss')
        */}
      </div>
    ),
    minWidth: 120,
    maxWidth: 120,
  },

  {
    Header: () => <div className="mr-auto">Hash</div>,
    accessor: 'hash',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <button
        className=" flex flex-row items-center justify-start "
        onClick={() =>
          //alert("clicked")

          (location.href = 'https://polygonscan.com/tx/' + value)
        }
      >
        <Image src="/images/logo-polygon.png" alt="gd" width={13} height={13} />

        <div className="ml-1 text-left text-xs -tracking-[1px]  ">
          {value.substring(0, 6) + '...'}
        </div>
      </button>
    ),
    minWidth: 50,
    maxWidth: 50,
  },

  /*
  {
    Header: 'Type',
    accessor: 'type',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="text-xs ltr:text-right rtl:text-left">{value}</div>
    ),
    minWidth: 80,
    maxWidth: 80,
  },
  */
];

export default function ModernScreen() {
  const address = useAddress();

  const router = useRouter();

  /////const emailQuery = usePaperWalletUserEmail();

  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  const [claimableRewardsHorse, setClaimableRewardsHorse] =
    useState<BigNumber>();
  const [claimableRewardsJockey, setClaimableRewardsJockey] =
    useState<BigNumber>();

  const { contract: stakingContractHorse, isLoading: isLoadingHorse } =
    useContract(stakingContractAddressHorseAAA);

  const { contract: stakingContractJockey, isLoading: isLoadingJockey } =
    useContract(stakingContractAddressJockey);

  useEffect(() => {
    if (!stakingContractHorse || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await stakingContractHorse?.call('getStakeInfo', [
        address,
      ]);
      ////const stakeInfo = await contract?.call("getStakeInfo", );
      setClaimableRewardsHorse(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, stakingContractHorse]);

  useEffect(() => {
    if (!stakingContractJockey || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await stakingContractJockey?.call('getStakeInfo', [
        address,
      ]);
      ////const stakeInfo = await contract?.call("getStakeInfo", );
      setClaimableRewardsJockey(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, stakingContractJockey]);

  const [npcNames, setNpcNames] = useState<any>([]);

  const [horse1Oran, setHorse1Oran] = useState<any>([]);
  const [horse2Oran, setHorse2Oran] = useState<any>([]);
  const [horse3Oran, setHorse3Oran] = useState<any>([]);
  const [horse4Oran, setHorse4Oran] = useState<any>([]);
  const [horse5Oran, setHorse5Oran] = useState<any>([]);
  const [horse6Oran, setHorse6Oran] = useState<any>([]);
  const [horse7Oran, setHorse7Oran] = useState<any>([]);
  const [horse8Oran, setHorse8Oran] = useState<any>([]);
  const [horse9Oran, setHorse9Oran] = useState<any>([]);
  const [horse10Oran, setHorse10Oran] = useState<any>([]);

  const [socket, setSocket] = useState<Socket | null>(null);

  const [status, setStatus] = useState<any>();
  const [time, setTime] = useState<any>(0);

  const [horses, setHorses] = useState<any>([]);

  const [progress1, setProgress1] = useState<any>(0);
  const [progress2, setProgress2] = useState<any>(0);
  const [progress3, setProgress3] = useState<any>(0);
  const [progress4, setProgress4] = useState<any>(0);
  const [progress5, setProgress5] = useState<any>(0);

  const [selectedHorse, setSelectedHorse] = useState<any>(null);

  const [games, setGames] = useState<any>();
  const [betAmountTotal, setBetAmountTotal] = useState<any>(0);

  const [betAmount1, setBetAmount1] = useState<any>(0);
  const [betAmount2, setBetAmount2] = useState<any>(0);
  const [betAmount3, setBetAmount3] = useState<any>(0);
  const [betAmount4, setBetAmount4] = useState<any>(0);
  const [betAmount5, setBetAmount5] = useState<any>(0);
  const [betAmount6, setBetAmount6] = useState<any>(0);
  const [betAmount7, setBetAmount7] = useState<any>(0);
  const [betAmount8, setBetAmount8] = useState<any>(0);
  const [betAmount9, setBetAmount9] = useState<any>(0);
  const [betAmount10, setBetAmount10] = useState<any>(0);

  /*

  useEffect(() => {
    if (status === false) {
      ////deleteCookie('horse');
      //toast.success('status false')
    }

    async function getNpcNames() {
      const npcNamesResponse = await fetch(
        `/api/games/horseRace/settings/horseNames?method=all`
      );
      const response = await npcNamesResponse.json();

      //console.log('getNpcNames response.npcNames[0]', response.npcNames[0]);

      //const data = useOwnedNFTs(nftDropContractHorse, address);

      setNpcNames(response.npcNames[0]);
    }

    getNpcNames();
  }, [status]);
  */

  /*
  const getGames = async () => {
    const res = await fetch('/api/games/horseRace/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'getGames',
      }),
    });
    const data = await res.json();

    ////console.log("getGames data====", data);

    setGames(data.games);

    setBetAmountTotal(0);

    setBetAmount1(0);
    setBetAmount2(0);
    setBetAmount3(0);
    setBetAmount4(0);
    setBetAmount5(0);
    setBetAmount6(0);
    setBetAmount7(0);
    setBetAmount8(0);
    setBetAmount9(0);
    setBetAmount10(0);

    games?.map((game: IHorseGame, i: number) => {
      if (game.selectedSide === npcNames.horse1) {
        setBetAmount1((prev: any) => prev + game.betAmount);

        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse2) {
        setBetAmount2((prev: any) => prev + game.betAmount);

        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse3) {
        setBetAmount3((prev: any) => prev + game.betAmount);

        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse4) {
        setBetAmount4((prev: any) => prev + game.betAmount);

        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse5) {
        setBetAmount5((prev: any) => prev + game.betAmount);

        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse6) {
        setBetAmount6((prev: any) => prev + game.betAmount);
        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse7) {
        setBetAmount7((prev: any) => prev + game.betAmount);
        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse8) {
        setBetAmount8((prev: any) => prev + game.betAmount);
        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse9) {
        setBetAmount9((prev: any) => prev + game.betAmount);
        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse10) {
        setBetAmount10((prev: any) => prev + game.betAmount);
        setBetAmountTotal((prev: any) => prev + game.betAmount);
      }
    });
  };
  */

  /*
  useEffect(() => {
    //getGames();

    const interval = setInterval(() => {
      getGames();
    }, 10000);

    //return () => clearInterval(interval);
  }, []);
  */

  /*
  useEffect(() => {
    if (status === true) {
      console.log('status true====', status);

      setBetAmountTotal(0);

      setBetAmount1(0);
      setBetAmount2(0);
      setBetAmount3(0);
      setBetAmount4(0);
      setBetAmount5(0);
      setBetAmount6(0);
      setBetAmount7(0);
      setBetAmount8(0);
      setBetAmount9(0);
      setBetAmount10(0);
    }
  }, [status]);
  */

  const columns = useMemo(() => COLUMNS, []);

  const [transactions, setTransactions] = useState([]);

  const {
    getTableProps,
    getTableBodyProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data: transactions,
      initialState: { pageSize: 10 },
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination
  );

  const { openDrawer } = useDrawer();

  const [drawerHorseInfoTokenId, setDrawerHorseInfoTokenId] = useLocalStorage(
    'drawer-horse-info-tokenid'
  );

  const [drawerUserInfoUserAddress, setDrawerUserInfoUserAddress] =
    useLocalStorage('drawer-user-info-useraddress');

  const [blockNumber, setBlockNumber] = useState<any>(0);
  useEffect(() => {
    const getBlockNumber = async () => {
      const res = await fetch('/api/getCurrentBlockNumber');
      const data = await res.json();

      console.log('data', data);

      setBlockNumber(
        // hex to decimal
        data?.blockNumber ? parseInt(data?.blockNumber, 16) : 0
      );
    };

    getBlockNumber();

    // time interval
    const interval = setInterval(() => {
      getBlockNumber();
    }, 10000);
  }, []);

  return (
    <div className="mb-10">
      <NextSeo title="Granderby" description="Granderby - Web3 NFT Game" />

      <div className="mb-20 flex flex-wrap items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-5">
          <Image src="/images/logo.png" alt="logo" width={300} height={300} />

          <div className="text-2xl font-bold xl:text-4xl">NFT GRANDERBY</div>
          <div className="items-center justify-center p-2 text-xl xl:text-2xl">
            NFT horse racing game where you can experience all the fun of horse
            racing
          </div>
          {/* blockNumber */}
          <div className="items-center justify-center p-2 text-xl xl:text-2xl">
            Block Number: {blockNumber}
          </div>

          <Button
            shape="rounded"
            color="success"
            onClick={() => {
              router.push('/intro');
            }}
          >
            <div className="text-2xl">GAME INTRODUCTION</div>
          </Button>
        </div>
      </div>
    </div>
  );
}
