import cn from 'classnames';
import { useEffect, useState, useMemo } from 'react';
import { NextSeo } from 'next-seo';

import CoinSlider from '@/components/ui/coin-card';
import AssetSlider from '@/components/ui/asset-card';

import PortfolioChart from '@/components/ui/chats/user-portfolio-chart';
import UserProfitChartUsers from '@/components/ui/chats/user-profit-chart-users';

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

import WalkingAnim from '@/components/horseRace/watchScreen/walkingAnim';

//import BetInputs from '@/components/horseRace/watchScreen/betInputsGranderby';

import EntryTables from '@/components/horseRace/watchScreen/entryTables';

import BetTables from '@/components/horseRace/watchScreen/betTablesGranderby';

//@ts-ignore
import { Socket, io } from 'socket.io-client';

import LastWinners from '@/components/horseRace/watchScreen/lastWinnersGranderby';

import OwnedFeeds from '@/components/search/feeds-horse-owned-widget';
//import OwnedFeeds from '@/components/search/feeds-horse-owned';

import GameHistoryTable from '@/components/nft-transaction/user-game-history-table';

import TransferHistoryTable from '@/components/nft-transaction/user-transfer-history-table';

import RaceHistoryTable from '@/components/nft-transaction/race-history-table';

import FeedsCoinUser from '@/components/search/feeds-coin-user-asset';

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
  tokenContractAddressHV,
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

import Collapse from '@/components/ui/collapse';

import CollapsePortfolio from '@/components/ui/collapse-portfolio';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';

import CryptoCurrencyPricingSkeleton from '@/components/ui/skeleton/CryptoCurrencyPricingSkeleton';

import toast from 'react-hot-toast';
//import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Button from '@/components/ui/button';
import AnchorLink from '@/components/ui/links/anchor-link';
import { InfoIcon } from '@/components/icons/info-icon';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import { LongArrowLeft } from '@/components/icons/long-arrow-left';
import Scrollbar from '@/components/ui/scrollbar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { LinkIcon } from '@/components/icons/link-icon';

import { useRouter } from 'next/router';
import { add, get, stubString } from 'lodash';

import { Refresh } from '@/components/icons/refresh';

import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
} from 'react-table';

import { format } from 'date-fns';

import { useModal } from '@/components/modal-views/context';

import { Twitter } from '@/components/icons/brands/twitter';
import { time } from 'console';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CommitIcon from '@mui/icons-material/Commit';

const COLUMNS = [
  /*
  {

    Header: 'Action',
    accessor: 'action',
    minWidth: 100,
    maxWidth: 100,
  },
  */

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Asset</div>,
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
            width={18}
            height={18}
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
    minWidth: 70,
    maxWidth: 70,
  },
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Amount</div>,
    accessor: 'amount',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="text-sm font-bold ltr:text-right rtl:text-left xl:text-xl ">
        {value}
      </div>
    ),
    minWidth: 100,
    maxWidth: 100,
  },

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Type</div>,
    accessor: 'category',
    // @ts-ignore
    Cell: ({ cell: { value } }) => <div className="ltext-left">{value}</div>,
    minWidth: 60,
    maxWidth: 60,
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
];

export default function PortfolioScreen({
  userAddress,
}: {
  userAddress?: string;
}) {
  console.log('PortfolioScreen userAddress: ', userAddress);

  /////const address = useAddress();

  const router = useRouter();

  const { openModal } = useModal();

  /////const emailQuery = usePaperWalletUserEmail();

  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalance } = useTokenBalance(tokenContract, userAddress);

  const { contract: tokenContractHV } = useContract(
    tokenContractAddressHV,
    'token'
  );
  const { data: tokenBalanceHV } = useTokenBalance(
    tokenContractHV,
    userAddress
  );

  const [claimableRewardsHorse, setClaimableRewardsHorse] =
    useState<BigNumber>();
  const [claimableRewardsJockey, setClaimableRewardsJockey] =
    useState<BigNumber>();

  const { contract: stakingContractHorse, isLoading: isLoadingHorse } =
    useContract(stakingContractAddressHorseAAA);

  const { contract: stakingContractJockey, isLoading: isLoadingJockey } =
    useContract(stakingContractAddressJockey);

  useEffect(() => {
    if (!stakingContractHorse || !userAddress) return;

    async function loadClaimableRewards() {
      const stakeInfo = await stakingContractHorse?.call('getStakeInfo', [
        userAddress,
      ]);
      ////const stakeInfo = await contract?.call("getStakeInfo", );
      setClaimableRewardsHorse(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [userAddress, stakingContractHorse]);

  useEffect(() => {
    if (!stakingContractJockey || !userAddress) return;

    async function loadClaimableRewards() {
      const stakeInfo = await stakingContractJockey?.call('getStakeInfo', [
        userAddress,
      ]);
      ////const stakeInfo = await contract?.call("getStakeInfo", );
      setClaimableRewardsJockey(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [userAddress, stakingContractJockey]);

  const [npcNames, setNpcNames] = useState<any>([]);

  /*
  const [volumn, setVolumn] = useState<any>(0);

  useEffect(() => {
    async function getVolumn() {

      const response = await fetch('/api/nft/user/history/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'getVolumn',
          address: userAddress,
        }),
      });
      const data = await response.json();

      setVolumn(data);
    }

    if (userAddress) {
      getVolumn();
    }
  }, [userAddress]);
  */

  const [horsesCount, setHorsesCount] = useState<any>(0);
  const [jockeysCount, setJockeysCount] = useState<any>(0);

  const [horsesTotalPricePaid, setHorsesTotalPricePaid] = useState<any>(0);

  useEffect(() => {
    async function getHorsesCount() {
      if (!userAddress) return;

      const response = await fetch('/api/nft/getHorsesCount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'getAllByHolder',
          holder: userAddress,
          ///grades: selectedGradesStorage,
          grades: [],
          manes: [],
        }),
      });
      const data = await response.json();

      console.log('getHorsesCount data====', data);

      setHorsesCount(data.total);

      setHorsesTotalPricePaid(data.totalPricePaid);
    }

    async function getJockeysCount() {
      //console.log("getJokeysCount address====", address);

      if (!userAddress) return;

      const response = await fetch('/api/nft/getJockeysCount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'getAllByHolder',
          holder: userAddress,
          ///grades: selectedGradesStorage,
          grades: [],
          manes: [],
        }),
      });
      const data = await response.json();

      ///console.log('getJockeysCount data====', data);

      setJockeysCount(data.total);
    }

    getHorsesCount();
    getJockeysCount();
  }, [userAddress]);

  const [transfers, setTransfers] = useState([]);

  const columns = useMemo(() => COLUMNS, []);

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
      data: transfers,
      initialState: { pageSize: 5 },
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination
  );
  const { pageIndex } = state;

  const limit = 5;

  const getLatest = async () => {
    ///console.log('price-history-table nftMetadata?.metadata?.id: ', nftMetadata?.metadata?.id);

    const response = await fetch('/api/ft/user/history/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'getLatest',
        limit: limit,
        address: userAddress?.toLowerCase(),
      }),
    });
    const data = await response.json();

    const transactions = [] as any;

    data.all?.map((transfer: any, index: number) => {
      ///console.log('transfer: ', transfer);

      const transactionData = {
        action: transfer.action,
        hash: transfer.hash,
        id: transfer.blockNum,
        //transactionType: transfer.from === address ? 'Send' : 'Receive',

        transactionType:
          transfer.tokenFrom === userAddress?.toLowerCase()
            ? 'Send'
            : 'Receive',

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
          transfer.tokenTo === stakingContractAddressHorseAAA.toLowerCase()
            ? 'Register'
            : transfer.tokenFrom ===
              stakingContractAddressHorseAAA.toLowerCase()
            ? 'Unregister'
            : transfer.tokenFrom === userAddress?.toLowerCase()
            ? 'Send'
            : transfer.tokenFrom ===
              '0x0000000000000000000000000000000000000000'.toLowerCase()
            ? 'Mint'
            : transfer.asset === 'SUGAR' &&
              transfer.tokenFrom ===
                '0xe38A3D8786924E2c1C427a4CA5269e6C9D37BC9C'.toLocaleLowerCase()
            ? 'Reward'
            : 'Receive',
      };

      transactions.push(transactionData);
    });

    setTransfers(transactions);

    ///console.log('getLatest transfers: ', transactions);
  };

  useEffect(() => {
    if (!userAddress) return;

    getLatest();

    //setInterval(() => {
    ///getLatest();
    //}, 10000);
  }, [userAddress]);

  return (
    <div className="mb-10">
      <NextSeo title="Granderby" description="Granderby - Web3 NFT Game" />

      <div className=" flex flex-wrap items-center justify-center">
        {/*
        <div className="  mt-3 w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[calc(100%-256px)] lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
        */}

        {/*
          <AssetSlider coins={assetSlideData} />
          */}

        {/*
        {address ? (
          <div className=" flex flex-col rounded-lg border"></div>
        ) : (
          <> </>
        )}
        */}

        {/*
        <div className="mt-10 flex w-full flex-col rounded-lg border">
          <Collapse label="Performance" initialOpen={true}>
            {address ? (
              <div className="flex h-[490px] flex-col items-center justify-center p-5">
                <LiveNftPricingSlider limits={2} />

              </div>
            ) : (
              <></>
            )}
          </Collapse>
        </div>
            */}

        <div className="flex w-full flex-row items-center justify-center rounded-lg border p-5">
          <div className=" flex w-full flex-col">
            <div className="  flex flex-row items-center justify-start gap-2">
              {/* MailOutlineIcon */}
              <div className="flex flex-row items-center justify-start gap-2">
                <CommitIcon className="h-5 w-5" />
              </div>

              <span className=" text-xl font-bold">Transfer Performance</span>
            </div>
            <div className="mt-5 flex w-full flex-col gap-5">
              <PortfolioChart userAddress={userAddress ? userAddress : ''} />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-row items-center justify-center rounded-lg border p-5">
          <div className=" flex w-full flex-col">
            <div className="  flex flex-row items-center justify-start gap-2">
              {/* MailOutlineIcon */}
              <div className="flex flex-row items-center justify-start gap-2">
                <CommitIcon className="h-5 w-5" />
              </div>

              <span className=" text-xl font-bold">Profit Performance</span>
            </div>
            <div className="mt-5 flex w-full flex-col gap-5">
              <UserProfitChartUsers userAddress={userAddress?.toLowerCase()} />
            </div>
          </div>
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-5 ">
          <div className=" flex flex-col rounded-lg border p-5">
            <span className=" text-2xl font-bold">Assets</span>

            {/*
            <button
              className="ml-10 flex flex-row items-center justify-start "
              onClick={() => openModal('SHARE_VIEW')}
            >
              <Twitter className="h-5 w-5" />

              <span className=" text-left text-lg font-bold text-black dark:text-white xl:text-xl">
                share
              </span>
            </button>
            */}

            {userAddress ? (
              <div className="mt-5 flex flex-col items-start justify-center gap-5">
                <div className="flex w-full flex-row items-center justify-center rounded-lg border p-5">
                  <FeedsCoinUser
                    //contractAddress={nftDropContractAddressHorseZedRun}
                    userAddress={userAddress}
                  />
                </div>

                <div className="grid w-full grid-cols-3 items-center justify-center gap-1">
                  {/*
                    <button

                    className={`gold-btn flex  flex-row items-center justify-center gap-2   border-none p-2 text-center text-black ${
                      limit === 0
                        ? 'gold-btn-active'
                        : limit === 1000
                        ? 'bg-[#ffc000]'
                        : 'bg-transparent'
                    } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
                    ///onClick={(e) => router.push('/coin/usdc')}
                    onClick={() => {
                      router.push('https://granderby.market');
                      ///router.push('/horse-details/' + nft?.metadata?.id);
                    }}
                  >
                    <Image
                      src="/images/market.png"
                      alt="market"
                      width={25}
                      height={20}
                    />
        

                    <span>GRANDERBY MARKET</span>

                    <ChevronForward className=" rtl:rotate-180" />
                  </button>
                  */}

                  <button
                    className={`   gold-btn flex  flex-col items-center justify-center gap-2  rounded-lg border  p-2 text-center text-black ${'bg-transparent'} disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
                    ///onClick={(e) => router.push('/coin/usdc')}
                    onClick={() => {
                      router.push(`/user-asset/${userAddress}`);
                      ///router.push('/horse-details/' + nft?.metadata?.id);
                    }}
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div className="flex flex-col items-center justify-center gap-5">
                        <span className="text-lg">Horse</span>
                        <span className="text-xl font-bold xl:text-2xl">
                          {horsesCount}
                        </span>
                      </div>
                      <Image
                        src="/images/button/horse.png"
                        alt="logo"
                        width={25}
                        height={25}
                      />
                    </div>

                    <span className=" h-16 text-lg font-bold text-green-600 xl:text-xl">
                      {horsesTotalPricePaid} USD
                    </span>
                  </button>

                  <button
                    className={`   gold-btn flex  flex-col items-center justify-center gap-2  rounded-lg border  p-2 text-center text-black ${'bg-transparent'} disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
                    ///onClick={(e) => router.push('/coin/usdc')}
                    onClick={() => {
                      router.push('/my-asset');
                      ///router.push('/horse-details/' + nft?.metadata?.id);
                    }}
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div className="flex flex-col items-center justify-center gap-5">
                        <span className="text-lg">Jockey</span>
                        <span className="text-xl font-bold xl:text-2xl">
                          {jockeysCount}
                        </span>
                      </div>
                      <Image
                        src="/images/button/jockey.png"
                        alt="logo"
                        width={25}
                        height={25}
                      />
                    </div>
                    <span className=" h-16 text-lg font-bold text-gray-600 xl:text-xl">
                      0 USD
                    </span>
                  </button>

                  <button
                    className={`  gold-btn flex  flex-col items-center justify-center gap-2  rounded-lg border  p-2 text-center text-black ${'bg-transparent'} disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
                    ///onClick={(e) => router.push('/coin/usdc')}
                    onClick={() => {
                      router.push('/my-asset');
                      ///router.push('/horse-details/' + nft?.metadata?.id);
                    }}
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div className="flex flex-col items-center justify-center gap-5">
                        <span className="text-lg">Track</span>
                        <span className="text-xl font-bold xl:text-2xl">
                          {Number(tokenBalanceHV?.displayValue).toFixed(0)}
                        </span>
                      </div>
                      <Image
                        src="/images/button/track.png"
                        alt="logo"
                        width={25}
                        height={25}
                      />
                    </div>
                    <span className=" h-16  text-lg font-bold text-gray-600 xl:text-xl">
                      0 USD
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <> </>
            )}

            {/*
            <Collapse label="Assets" initialOpen={true} >
              <div className="flex h-[490px] flex-col items-center justify-start p-5">
                <div>
                  {horsesCount} horses
                </div>

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

            </Collapse>
            */}

            {/*
              <Collapse label="Live Pricing" initialOpen={true}>
                <div className="m-5 p-5">


                  <CryptoCurrencyPricingSkeleton />

                </div>
              </Collapse>
              */}
          </div>

          <div className=" flex flex-col rounded-lg border p-5">
            <GameHistoryTable address={userAddress} />
          </div>
        </div>
      </div>

      {/*
      <div className=" flex flex-col rounded-lg border p-5">
        <span className=" text-2xl font-bold">Race Schedule</span>

        {address ? <RaceHistoryTable tokenId={undefined} /> : <></>}
      </div>
      */}

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

      {/*
      <div className="mt-10 flex flex-wrap">
        <div className="w-full lg:w-[calc(100%-288px)] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
          <TransactionTable />
        </div>
        <div className="order-first mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 lg:order-1 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]">
          <OverviewChart />
          <TopPools />
        </div>

      </div>
          */}
    </div>
  );
}
