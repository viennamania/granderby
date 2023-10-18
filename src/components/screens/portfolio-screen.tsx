import cn from 'classnames';
import { useEffect, useState, useMemo } from 'react';
import { NextSeo } from 'next-seo';

import CoinSlider from '@/components/ui/coin-card';
import AssetSlider from '@/components/ui/asset-card';

import PortfolioChart from '@/components/ui/chats/my-portfolio-chart';

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

import FeedsCoinOwned from '@/components/search/feeds-coin-owned-asset';

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
import { add, get } from 'lodash';

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
      <div className="ltr:text-right rtl:text-left">
        {format(Date.parse(value), 'yyy-MM-dd hh:mm:ss')}
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

export default function PortfolioScreen() {
  const address = useAddress();

  const router = useRouter();

  const { openModal } = useModal();

  /////const emailQuery = usePaperWalletUserEmail();

  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  const { contract: tokenContractHV } = useContract(
    tokenContractAddressHV,
    'token'
  );
  const { data: tokenBalanceHV } = useTokenBalance(tokenContractHV, address);

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

  const [horsesCount, setHorsesCount] = useState<any>(0);
  const [jockeysCount, setJockeysCount] = useState<any>(0);

  const [horsesTotalPricePaid, setHorsesTotalPricePaid] = useState<any>(0);

  useEffect(() => {
    async function getHorsesCount() {
      if (!address) return;

      const response = await fetch('/api/nft/getHorsesCount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'getAllByHolder',
          holder: address,
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

      if (!address) return;

      const response = await fetch('/api/nft/getJockeysCount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'getAllByHolder',
          holder: address,
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
  }, [address]);

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
        address: address?.toLowerCase(),
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
          transfer.tokenFrom === address?.toLowerCase() ? 'Send' : 'Receive',

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
            : transfer.tokenFrom === address?.toLowerCase()
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
    getLatest();

    //setInterval(() => {
    ///getLatest();
    //}, 10000);
  }, [address]);

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
            <div className="  flex flex-row items-center justify-between gap-2">
              <span className=" text-2xl font-bold">Performance</span>

              <Button
                className="h-8 bg-green-500 font-normal text-black hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white md:h-8 xl:h-8 "
                onClick={() => router.push(`/my-portfolio/performance`)}
              >
                <span className="flex items-center gap-2">
                  <InfoIcon className="h-3 w-3" />{' '}
                  <span className="text-xs">View All</span>
                </span>
              </Button>
            </div>

            <div className="mt-5 flex w-full flex-col gap-5 md:flex-row xl:flex-row">
              <div className=" md:w-2/3 xl:w-2/3">
                <PortfolioChart userAddress={address ? address : ''} />
              </div>

              <div className=" rounded-lg p-2 shadow-card  md:w-1/3 xl:w-1/3">
                <div className="flex flex-row items-center justify-between gap-2">
                  <span className="text-xl font-bold">Transfers</span>
                  {/* reload button */}
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      onClick={() => {
                        getLatest();
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
                            <tr
                              {...headerGroup.getHeaderGroupProps()}
                              key={idx}
                            >
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
                                className="mb-3 items-center rounded-lg bg-white uppercase shadow-card last:mb-0 dark:bg-light-dark"
                              >
                                {row.cells.map((cell, idx) => {
                                  return (
                                    <td
                                      {...cell.getCellProps()}
                                      key={idx}
                                      //className="px-2 py-4 tracking-[1px] ltr:first:pl-4 ltr:last:pr-4 rtl:first:pr-8 rtl:last:pl-8 md:px-4 md:py-6 md:ltr:first:pl-8 md:ltr:last:pr-8 3xl:py-5"
                                      className="px-2 py-1 tracking-[1px] "
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
          </div>
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2 ">
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

            {address ? (
              <div className="mt-5 flex flex-col items-start justify-center gap-5">
                <div className="flex w-full flex-row items-center justify-center rounded-lg border p-5">
                  <FeedsCoinOwned
                  //contractAddress={nftDropContractAddressHorseZedRun}
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
                    className={`gold-btn flex  flex-col items-center justify-center gap-2  rounded-lg border  p-2 text-center text-black ${'bg-transparent'} disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
                    ///onClick={(e) => router.push('/coin/usdc')}
                    onClick={() => {
                      router.push('/my-asset');
                      ///router.push('/horse-details/' + nft?.metadata?.id);
                    }}
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div className="flex flex-col items-center justify-center gap-5">
                        <span className="text-lg">Horse</span>

                        <div className="flex flex-row items-center justify-center gap-2">
                          <span className="text-xl font-bold xl:text-2xl">
                            {horsesCount}
                          </span>
                          <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                        </div>
                      </div>
                      <Image
                        src="/images/button/horse.png"
                        alt="logo"
                        width={25}
                        height={25}
                      />
                    </div>

                    <span className="text-lg font-bold text-green-600 xl:text-xl">
                      {horsesTotalPricePaid} USD
                    </span>
                  </button>

                  <button
                    className={`gold-btn flex  flex-col items-center justify-center gap-2  rounded-lg border  p-2 text-center text-black ${'bg-transparent'} disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
                    ///onClick={(e) => router.push('/coin/usdc')}
                    onClick={() => {
                      router.push('/my-asset');
                      ///router.push('/horse-details/' + nft?.metadata?.id);
                    }}
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div className="flex flex-col items-center justify-center gap-5">
                        <span className="text-lg">Jockey</span>

                        <div className="flex flex-row items-center justify-center gap-2">
                          <span className="text-xl font-bold xl:text-2xl">
                            {jockeysCount}
                          </span>
                          <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                        </div>
                      </div>

                      <Image
                        src="/images/button/jockey.png"
                        alt="logo"
                        width={25}
                        height={25}
                      />
                    </div>
                    <span className="text-lg font-bold text-gray-600 xl:text-xl">
                      0 USD
                    </span>
                  </button>

                  <button
                    className={`gold-btn flex  flex-col items-center justify-center gap-2  rounded-lg border  p-2 text-center text-black ${'bg-transparent'} disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
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
                    <span className="text-lg font-bold text-gray-600 xl:text-xl">
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
            <GameHistoryTable address={address} />
          </div>
        </div>

        {/* message list */}
        {/* comming soon */}
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-2 rounded-lg border p-10">
          <span className="text-lg font-bold text-gray-600 xl:text-xl">
            Race Entry List
          </span>
          <span className="text-lg font-bold text-gray-600 xl:text-xl">
            Coming Soon
          </span>
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
