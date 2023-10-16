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
import AuthorImage from '@/assets/images/author.jpg';

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
      <div className="ltr:text-right rtl:text-left">
        {format(Date.parse(value), 'yyy-MM-dd hh:mm:ss')}
      </div>
    ),
    minWidth: 120,
    maxWidth: 120,
  },
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

  setTimeout(() => {
    setHorses([
      {
        id: 1,
        progress: progress1,
        name: `${npcNames.horse1}`,
        nft: `${npcNames.nft1?.tokenId}`,
        media: `${
          npcNames.media1?.thumbnail ||
          //'/images/logo.png'
          `/horseRace/${npcNames.nft1?.contract}.png`
        }`,
      },
      {
        id: 2,
        progress: progress2,
        name: `${npcNames.horse2}`,
        nft: `${npcNames.nft2?.tokenId}`,
        media: `${
          npcNames.media2?.thumbnail ||
          //'/images/logo.png'
          `/horseRace/${npcNames.nft2?.contract}.png`
        }`,
      },
      {
        id: 3,
        progress: progress3,
        name: `${npcNames.horse3}`,
        nft: `${npcNames.nft3?.tokenId}`,
        media: `${
          npcNames.media3?.thumbnail ||
          //'/images/logo.png'
          `/horseRace/${npcNames.nft3?.contract}.png`
        }`,
      },
      {
        id: 4,
        progress: progress4,
        name: `${npcNames.horse4}`,
        nft: `${npcNames.nft4?.tokenId}`,
        media: `${
          npcNames.media4?.thumbnail ||
          //'/images/logo.png'
          `/horseRace/${npcNames.nft4?.contract}.png`
        }`,
      },
      {
        id: 5,
        progress: progress5,
        name: `${npcNames.horse5}`,
        nft: `${npcNames.nft5?.tokenId}`,
        media: `${
          npcNames.media5?.thumbnail ||
          //'/images/logo.png'
          `/horseRace/${npcNames.nft5?.contract}.png`
        }`,
      },
    ]);
  }, 40);

  useEffect(() => {
    ////socketInitializer();
  }, []);

  const socketInitializer = () => {
    ///console.log("snailRace socketInitializer socket", socket);

    if (socket) return;

    const socketa = io(process.env.NEXT_PUBLIC_HORSE_RACE_SOCKET_URL as string);

    setSocket(socketa);

    socketa.on('status', (data: any) => {
      console.log('socket status======', data);

      setStatus(data);
    });

    socketa.on('time', (data: any) => {
      setTime(data);
    });

    socketa.on('horse1Rate', (data: any) => {
      setHorse1Oran(data);
    });
    socketa.on('horse2Rate', (data: any) => {
      setHorse2Oran(data);
    });
    socketa.on('horse3Rate', (data: any) => {
      setHorse3Oran(data);
    });
    socketa.on('horse4Rate', (data: any) => {
      setHorse4Oran(data);
    });
    socketa.on('horse5Rate', (data: any) => {
      setHorse5Oran(data);
    });
    socketa.on('horse6Rate', (data: any) => {
      setHorse6Oran(data);
    });
    socketa.on('horse7Rate', (data: any) => {
      setHorse7Oran(data);
    });
    socketa.on('horse8Rate', (data: any) => {
      setHorse8Oran(data);
    });
    socketa.on('horse9Rate', (data: any) => {
      setHorse9Oran(data);
    });
    socketa.on('horse10Rate', (data: any) => {
      setHorse10Oran(data);
    });

    /*
    socketa.on('flag', (data: any) => {
      setFlag(data);
    });
    */

    socketa.on('horse1', (data: any) => {
      setProgress1(data);
    });

    socketa.on('horse2', (data: any) => {
      setProgress2(data);
    });

    socketa.on('horse3', (data: any) => {
      setProgress3(data);
    });

    socketa.on('horse4', (data: any) => {
      setProgress4(data);
    });

    socketa.on('horse5', (data: any) => {
      setProgress5(data);
    });

    return () => {
      socketa.disconnect();
    };
  };

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

  useEffect(() => {
    //getGames();

    const interval = setInterval(() => {
      getGames();
    }, 10000);

    //return () => clearInterval(interval);
  }, []);

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

  const getLast20 = async () => {
    ///console.log('price-history-table nftMetadata?.metadata?.id: ', nftMetadata?.metadata?.id);

    const response = await fetch('/api/nft/history/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'getLatest',
        limit: 10,
        ///address: address?.toLowerCase(),
      }),
    });
    const data = await response.json();

    ///console.log('data.all: ', data.all);

    //console.log('data.total: ', data.total);

    ///setTotalCount(data.total);

    ///setSaleHistory(data.all);

    const transactions = [] as any;

    data.all?.map((transfer: any, index: number) => {
      //console.log('transfer: ', transfer);

      const transactionData = {
        user: (
          <div className="flex items-center justify-start">
            <Avatar
              size="sm"
              image={AuthorImage}
              alt="Rubywalsh"
              className="border-white bg-gray-300 ltr:mr-3 rtl:ml-3 dark:bg-gray-400"
            />

            <div className="flex items-center justify-start">
              <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
              {transfer.tokenFrom?.substring(0, 6) + '...'}
            </div>
          </div>
        ),

        action: transfer.action,
        hash: transfer.hash,
        id: transfer.blockNum,
        //transactionType: transfer.from === address ? 'Send' : 'Receive',
        transactionType: 'Send',
        createdAt: transfer.blockTimestamp,

        tokenFrom: transfer.tokenFrom,
        tokenTo: transfer.tokenTo,

        asset: transfer.asset,

        tokenId: transfer.tokenId,
        amount:
          transfer.category === 'erc20'
            ? Number(transfer.value).toFixed(2)
            : `#` + transfer.tokenId,

        logs4Address: transfer.logs4Address,

        category:
          transfer.tokenTo === stakingContractAddressHorseAAA.toLowerCase() ? (
            <div className="flex items-center justify-start gap-2">
              <button
                className=" flex flex-row items-center justify-start "
                onClick={() => {
                  setDrawerHorseInfoTokenId(transfer.tokenId);
                  openDrawer('DRAWER_HORSE_INFO', transfer.tokenId);
                }}
              >
                <Image
                  src="/images/shop/horse.png"
                  alt="horse"
                  width={18}
                  height={18}
                />

                <span className="text-xl font-bold text-black  underline decoration-sky-500   ">
                  #{transfer.tokenId}
                </span>
              </button>

              <span className="text-xs">Registered</span>
            </div>
          ) : transfer.tokenFrom ===
            stakingContractAddressHorseAAA.toLowerCase() ? (
            //'Unregistered'

            <div className="flex items-center justify-start gap-2">
              <button
                className=" flex flex-row items-center justify-start "
                onClick={() => {
                  setDrawerHorseInfoTokenId(transfer.tokenId);
                  openDrawer('DRAWER_HORSE_INFO', transfer.tokenId);
                }}
              >
                <Image
                  src="/images/shop/horse.png"
                  alt="horse"
                  width={18}
                  height={18}
                />

                <span className="text-xl font-bold text-black underline decoration-sky-500">
                  #{transfer.tokenId}
                </span>
              </button>
              <span className="text-xs">Unregistered</span>
            </div>
          ) : transfer.tokenFrom === address?.toLowerCase() ? (
            <div className="flex items-center justify-start">
              {transfer.asset === 'GRD' && (
                <div className="flex items-center justify-start gap-2">
                  <Image
                    src="/images/shop/icon-grd.png"
                    alt="gd"
                    width={18}
                    height={18}
                  />
                  <span className="text-xs">Sent to</span>

                  <div className="flex items-center justify-start">
                    <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
                    {transfer.tokenTo?.substring(0, 6) + '...'}
                  </div>

                  <span className="text-xl font-bold text-black">
                    {Number(transfer.value).toFixed(2)}
                  </span>
                </div>
              )}
              {transfer.asset === 'CARROT' && (
                <div className="flex items-center justify-start gap-2">
                  <Image
                    src="/images/shop/icon-carrot.png"
                    alt="gd"
                    width={18}
                    height={18}
                  />
                  <span className="text-xs">Sent to</span>
                  <span>{transfer.tokenTo?.substring(0, 6) + '...'}</span>
                  <span className="text-xl font-bold text-black">
                    {Number(transfer.value).toFixed(2)}
                  </span>
                </div>
              )}
              {transfer.asset === 'SUGAR' && (
                <div className="flex items-center justify-start gap-2">
                  <Image
                    src="/images/shop/icon-sugar.png"
                    alt="gd"
                    width={18}
                    height={18}
                  />
                  <span className="text-xs">Sent to</span>
                  <span>{transfer.tokenTo?.substring(0, 6) + '...'}</span>

                  <span className="text-xl font-bold text-black">
                    {Number(transfer.value).toFixed(2)}
                  </span>
                </div>
              )}
              {transfer.asset === 'GRANDERBY' && (
                <div className="flex items-center justify-start gap-2">
                  <button
                    className=" flex flex-row items-center justify-start "
                    onClick={() => {
                      setDrawerHorseInfoTokenId(transfer.tokenId);
                      openDrawer('DRAWER_HORSE_INFO', transfer.tokenId);
                    }}
                  >
                    <Image
                      src="/images/shop/horse.png"
                      alt="horse"
                      width={18}
                      height={18}
                    />

                    <span className="text-xl font-bold text-black  underline decoration-sky-500">
                      #{transfer.tokenId}
                    </span>
                  </button>
                  <span className="text-xs">Sent to</span>
                  <span>{transfer.tokenTo?.substring(0, 6) + '...'}</span>
                </div>
              )}
            </div>
          ) : transfer.category === 'erc20' ? (
            <div className="flex items-center justify-start">
              {transfer.tokenFrom ===
              '0x0000000000000000000000000000000000000000' ? (
                <div className="flex items-center justify-start">
                  {transfer.asset === 'GRD' && (
                    <div className="flex items-center justify-start gap-2">
                      <Image
                        src="/images/shop/icon-grd.png"
                        alt="gd"
                        width={18}
                        height={18}
                      />

                      <span className="text-xs">Minted</span>

                      <span className="text-xl font-bold text-black">
                        {Number(transfer.value).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {transfer.asset === 'CARROT' && (
                    <div className="flex items-center justify-start gap-2">
                      <Image
                        src="/images/shop/icon-carrot.png"
                        alt="gd"
                        width={18}
                        height={18}
                      />
                      <span className="text-xs">Baught</span>
                      <span className="text-xl font-bold text-black">
                        {Number(transfer.value).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {transfer.asset === 'SUGAR' && (
                    <div className="flex items-center justify-start gap-2">
                      <Image
                        src="/images/shop/icon-sugar.png"
                        alt="gd"
                        width={18}
                        height={18}
                      />
                      <span className="text-xs">Minted</span>

                      <span className="text-xl font-bold text-black">
                        {Number(transfer.value).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-start">
                  {transfer.asset === 'GRD' && (
                    <div className="flex items-center justify-start gap-2">
                      <Image
                        src="/images/shop/icon-grd.png"
                        alt="gd"
                        width={18}
                        height={18}
                      />
                      <span className="text-xs">Received from</span>

                      <div className="flex items-center justify-start">
                        <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
                        {transfer.tokenFrom?.substring(0, 6) + '...'}
                      </div>

                      <span className="text-xl font-bold text-black">
                        {Number(transfer.value).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {transfer.asset === 'CARROT' && (
                    <div className="flex items-center justify-start gap-2">
                      <Image
                        src="/images/shop/icon-carrot.png"
                        alt="gd"
                        width={18}
                        height={18}
                      />
                      <span className="text-xs">Reveived from</span>
                      <span>{transfer.tokenFrom?.substring(0, 6) + '...'}</span>
                      <span className="text-xl font-bold text-black">
                        {Number(transfer.value).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {transfer.asset === 'SUGAR' && (
                    <div className="flex items-center justify-start gap-2">
                      <Image
                        src="/images/shop/icon-sugar.png"
                        alt="gd"
                        width={18}
                        height={18}
                      />

                      {transfer.tokenFrom ===
                      addressAirdropReward.toLowerCase() ? (
                        <span className="text-xs">Rewarded for trading</span>
                      ) : transfer.tokenFrom ===
                        addressRaceReward.toLowerCase() ? (
                        <span className="text-xs">Rewarded for racing</span>
                      ) : (
                        <>
                          <span className="text-xs">Received from</span>
                          <div className="flex items-center justify-start">
                            <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
                            {transfer.tokenFrom?.substring(0, 6) + '...'}
                          </div>
                        </>
                      )}

                      <span className="text-xl font-bold text-black">
                        {Number(transfer.value).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : transfer.category === 'erc721' ? (
            <div className="flex items-center justify-start gap-2">
              <button
                className=" flex flex-row items-center justify-start "
                onClick={() => {
                  setDrawerHorseInfoTokenId(transfer.tokenId);
                  openDrawer('DRAWER_HORSE_INFO', transfer.tokenId);
                }}
              >
                {transfer.asset === 'GRANDERBY' && (
                  <Image
                    src="/images/shop/horse.png"
                    alt="horse"
                    width={18}
                    height={18}
                  />
                )}
                <span className="text-xl font-bold text-black underline decoration-sky-500  ">
                  #{transfer.tokenId}
                </span>
              </button>

              <span className="text-xs">Received from holder</span>

              <div className="flex items-center justify-start text-xs">
                <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
                {transfer.tokenFrom?.substring(0, 6) + '...'}
              </div>
            </div>
          ) : (
            ''
          ),
      };

      //console.log('transactionData: ', transactionData);

      ////setTransers((transfers) => [...transfers, transactionData]);

      transactions.push(transactionData);
    });

    ///console.log('transactions: ', transactions);

    setTransactions(transactions);
  };

  useEffect(() => {
    getLast20();
  }, [address]);

  const { openDrawer } = useDrawer();

  const [drawerHorseInfoTokenId, setDrawerHorseInfoTokenId] = useLocalStorage(
    'drawer-horse-info-tokenid'
  );

  return (
    <div className="mb-10">
      <NextSeo title="Granderby" description="Granderby - Web3 NFT Game" />

      <div className="mb-20 flex flex-wrap items-center justify-center">
        {/*
        <div className="  mt-3 w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[calc(100%-256px)] lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
        */}

        {/*
          <AssetSlider coins={assetSlideData} />
          */}

        {address ? (
          <>
            {/*
          <div className=" flex flex-col rounded-lg border">
            <CollapsePortfolio label="Last Race Winners">
              <div className="flex h-[490px] flex-col items-center justify-center p-5">
                <LastWinners npcs={npcNames} status={status} />

                <div className="mb-5 flex h-full  items-end justify-center">
                  <Button
                    className="mt-5"
                    shape="rounded"
                    color="success"
                    onClick={() => {
                      router.push('/my-asset');
                    }}
                  >
                    <div className="text-2xl">My NFT</div>
                  </Button>
                </div>
              </div>
            </CollapsePortfolio>
          </div>
          */}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            <Image src="/images/logo.png" alt="logo" width={300} height={300} />

            <div className="text-2xl font-bold xl:text-4xl">NFT GRANDERBY</div>
            <div className="items-center justify-center p-2 text-xl xl:text-2xl">
              NFT horse racing game where you can experience all the fun of
              horse racing
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
        )}

        <div className="mt-10 flex w-full flex-col  xl:w-2/3">
          <div className="flex flex-row items-center justify-between  gap-2">
            <div className="flex flex-row gap-2">
              <span className=" text-2xl font-bold">News</span>
              {/* reload button */}
              <div className="flex items-center justify-center gap-2">
                <Button
                  onClick={() => {
                    getLast20();
                  }}
                  title="Reload"
                  shape="circle"
                  variant="transparent"
                  size="small"
                  className="text-gray-700 dark:text-white"
                >
                  <Refresh className="h-auto w-4 rtl:rotate-180" />
                </Button>
              </div>
            </div>

            <Button
              className="h-8 bg-green-500 font-normal text-black hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white md:h-8 xl:h-8 "
              onClick={() => router.push(`/my-portfolio/game`)}
            >
              <span className="flex items-center gap-2">
                <InfoIcon className="h-3 w-3" />{' '}
                <span className="text-xs">View All</span>
              </span>
            </Button>
          </div>

          <div className="mt-3 flex flex-col rounded-lg border p-5">
            <div className="-mx-0.5 dark:[&_.os-scrollbar_.os-scrollbar-track_.os-scrollbar-handle:before]:!bg-white/50">
              <Scrollbar
                style={{ width: '100%' }}
                autoHide="never"
                className=""
              >
                <div className="px-0.5">
                  <table
                    {...getTableProps()}
                    className="transaction-table w-full border-separate border-0"
                  >
                    <thead className="text-sm text-gray-500 dark:text-gray-300">
                      {headerGroups.map((headerGroup, idx) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                          {headerGroup.headers.map((column, idx) => (
                            <th
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                              key={idx}
                              className="group  bg-white px-2 py-5 font-normal first:rounded-bl-lg last:rounded-br-lg ltr:first:pl-8 ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8 dark:bg-light-dark md:px-4"
                            >
                              <div className="flex items-center">
                                {column.render('Header')}
                                {column.canResize && (
                                  <div
                                    {...column.getResizerProps()}
                                    className={`resizer ${
                                      column.isResizing ? 'isResizing' : ''
                                    }`}
                                  />
                                )}
                                <span className="ltr:ml-1 rtl:mr-1">
                                  {column.isSorted ? (
                                    column.isSortedDesc ? (
                                      <ChevronDown />
                                    ) : (
                                      <ChevronDown className="rotate-180" />
                                    )
                                  ) : (
                                    <ChevronDown className="rotate-180 opacity-0 transition group-hover:opacity-50" />
                                  )}
                                </span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody
                      {...getTableBodyProps()}
                      className="text-xs font-medium text-gray-900 dark:text-white 3xl:text-sm"
                    >
                      {page.map((row, idx) => {
                        prepareRow(row);
                        return (
                          <tr
                            {...row.getRowProps()}
                            key={idx}
                            className=" mb-1 items-center rounded-lg bg-white uppercase shadow-card last:mb-0 dark:bg-light-dark"
                          >
                            {row.cells.map((cell, idx) => {
                              return (
                                <td
                                  {...cell.getCellProps()}
                                  key={idx}
                                  className="ml-2 px-2 py-2 tracking-[1px] "
                                >
                                  {cell.render('Cell')}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Scrollbar>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 xl:grid-cols-2 ">
          <div className=" flex flex-col rounded-lg border  ">
            <CollapseLivePricing label="Live Pricing">
              <div className="flex h-[490px] flex-col items-center justify-start p-5">
                <LiveNftPricingSlider limits={2} />

                <div className="mb-5 flex h-full flex-row  items-end justify-center">
                  <Button
                    shape="rounded"
                    color="success"
                    onClick={() => {
                      router.push('/buy-horse');
                    }}
                  >
                    <div className="text-2xl">BUY NOW</div>
                  </Button>
                </div>
              </div>

              {/*
              <div className='w-full items-center justify-center'>
                <Link
                  className=" h-[40px] w-[180px]  flex-row items-center justify-center rounded-lg bg-black xl:flex"
                  href="/live"
                >
                  <Image
                    src="/horseRace/live.gif"
                    alt="live"
                    width={100}
                    height={30}
                    className="mb-1"
                  />
                  <span className="mr-2 text-white">for bet</span>
                </Link>
              </div>
              */}
            </CollapseLivePricing>

            {/*
              <Collapse label="Live Pricing" initialOpen={true}>
                <div className="m-5 p-5">


                  <CryptoCurrencyPricingSkeleton />

                </div>
              </Collapse>
              */}
          </div>

          <div className=" flex flex-col rounded-lg border">
            <CollapseLastWinners label="Last Race Winners">
              <div className="flex h-[490px] flex-col items-center justify-center p-5">
                <LastWinners npcs={npcNames} status={status} />

                <div className="mb-5 flex h-full  items-end justify-center">
                  <Button
                    className="mt-5"
                    shape="rounded"
                    color="success"
                    onClick={() => {
                      router.push('/live');
                    }}
                  >
                    <div className="text-2xl">LIVE NOW</div>
                  </Button>
                </div>
              </div>
            </CollapseLastWinners>
          </div>

          {/*
          <div className="items-top mt-0 flex  w-full flex-row justify-center gap-2  rounded-md border  bg-black  p-2 ">
            {time ? (
              <div className="w-full">
                {time === -1 ? (
                  <div className="mt-0 flex flex-row gap-1">
                    {horses

                      .sort((a: any, b: any) => a.progress - b.progress)
                      .map((horse: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className={`flex w-1/5 flex-col items-center justify-center rounded-md p-2 md:h-32 xl:w-1/5 ${
                              selectedHorse === horse.name ? 'bg-green-500' : null
                            }`}
                          >
                            <div className="flex-row items-center justify-center rounded-md bg-white p-2 text-center">
                              #{horse.nft}
                            </div>

                            <div className="mt-2 w-full flex-col items-center justify-center  md:flex">
                              <Image
                                //src={horse.media}
                                src={
                                  '/horseRace/bib_gui_' + (horse.id - 1) + '.png'
                                }
                                width="80"
                                height="80"
                                alt={'at'}
                                className=" xl:w-[150px] "
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <WalkingAnim time={time} npcSrc={'/npcRace/at.json'} />
                )}
              </div>
            ) : (
              <div className="flex w-full items-center justify-center text-2xl text-white ">
                Loading game...
              </div>
            )}

            <div className=" flex flex-row  items-center justify-end ">
              <Link
                className="hidden h-[40px] w-[180px]  flex-row items-center justify-center rounded-lg bg-black xl:flex"
                href="/live"
              >
                <Image
                  src="/horseRace/live.gif"
                  alt="live"
                  width={100}
                  height={30}
                  className="mb-1"
                />
                <span className="mr-2 text-white">for bet</span>
              </Link>
            </div>
          </div>
          */}

          {/*
          <div className="mt-5 flex">
            <CollapseCurrentEvent label="Current Event">
              <div className="mt-5 flex flex-col items-center justify-center rounded-lg bg-white p-5 shadow-card dark:bg-light-dark ">
                <div className="mb-1 text-center text-sm text-black xl:text-lg">
                  My horses <span className="font-bold text-red-500">RUN</span>, I{' '}
                  <span className="font-bold text-blue-500">EARN</span> !{' '}
                  <span className="text-block text-xs ">©</span>
                </div>

                <EntryTables
                  horse1={horse1Oran}
                  horse2={horse2Oran}
                  horse3={horse3Oran}
                  horse4={horse4Oran}
                  horse5={horse5Oran}
                  horse6={horse6Oran}
                  horse7={horse7Oran}
                  horse8={horse8Oran}
                  horse9={horse9Oran}
                  horse10={horse10Oran}
                  //user={user}
                  user={null}
                  npcs={npcNames}
                  //inputs={inputs}
                  inputs={null}
                  balance={0}
                />
              </div>
            </CollapseCurrentEvent>
          </div>
          */}

          <div className="items-top mt-5 flex w-full justify-center ">
            {/*
              <BetTables npcs={npcNames} />
              */}

            {/*
              <div className="mb-2 flex w-full items-center justify-center rounded-lg text-3xl font-bold text-yellow-500">
                Total bet: {betAmountTotal}
              </div>
              */}
          </div>

          {/*
          </div>
          */}

          {/*
          <div className="mt-3 w-full  sm:w-1/2 md:w-64 lg:w-72 2xl:w-80 3xl:w-[358px]">
            <div className="justify-top flex h-full flex-col items-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark xl:p-8">
              {!address ? (
                <div className="flex flex-col justify-center">
                  <ConnectWallet theme="light" />
                  <h5> to experience the GRANDERBY</h5>

                  <div className="mt-5 hidden  flex-row items-center justify-center p-5 xl:flex ">
                    <Image
                      src="/horseRace/mobile-app.png"
                      alt="mobile-app"
                      width={300}
                      height={1000}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="btn-wrap flex w-full flex-col items-center justify-center gap-5">
                    <button className="btn-app flex ">
                      <Image
                        src={IcoApple}
                        alt="apple"
                        width={300}
                        height={100}
                        className="w-full"
                      />
                      <div className="flex">Download App</div>
                    </button>

                    <button className="btn-app  ">
                      <Image
                        src={IcoAndroid}
                        alt="android"
                        width={300}
                        height={100}
                        className="w-full"
                      />
                      <div className="flex">Download App</div>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-5 flex flex-row items-center justify-center ">
                    <ConnectWallet theme="dark" />
                  </div>



                  <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                    My horses
                  </h3>

                  <OwnedFeeds />

            
                </>
              )}
            </div>
          </div>
          */}
        </div>
      </div>

      {/*
      <div className="mt-8 grid gap-6 sm:my-10 md:grid-cols-2">
        <LiquidityChart />
        <VolumeChart />
      </div>

      <div className="my-8 sm:my-10">
        <TopCurrencyTable />
      </div>


      <div className="flex flex-wrap">
        <div
          className={cn(
            'w-full lg:w-[calc(100%-288px)] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]'
          )}
        >
          <TransactionTable />
        </div>
        <div
          className={cn(
            'order-first mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 lg:order-1 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]'
          )}
        >
          <OverviewChart />
          <TopPools />
        </div>
      </div>
          */}
    </div>
  );
}
