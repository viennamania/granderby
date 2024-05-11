import React, { use, useEffect, useState } from 'react';

import cn from 'classnames';

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

import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';

import { useAddress } from '@thirdweb-dev/react';
import { add, set } from 'lodash';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
  addressRaceReward,
  addressAirdropReward,
} from '@/config/contractAddresses';

import { tr } from 'date-fns/locale';
import { array } from 'yup';

import { format } from 'date-fns';

import Image from '@/components/ui/image';
import { useRouter } from 'next/router';

import { ArrowUp } from '@/components/icons/arrow-up';
import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  CartesianGrid,
  Bar,
} from 'recharts';

///import { priceFeedData } from '@/data/static/price-feed';
import { priceFeedData } from '@/data/static/nft-horse-price-feed';

import { HistoryIcon } from '@/components/icons/history';
import { Refresh } from '@/components/icons/refresh';
import { InfoIcon } from '@/components/icons/info-icon';

import { useDrawer } from '@/components/drawer-views/context';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';

import MailOutlineIcon from '@mui/icons-material/MailOutline';

type Price = {
  name: number;
  value: number;
};

type LivePriceFeedProps = {
  id: string;
  name: string;
  symbol: string;
  icon: React.ReactElement;
  balance: string;
  usdBalance: string;
  logo: string;
  change: string;
  isChangePositive: boolean;
  isBorder?: boolean;
  prices: Price[];
};

function LivePricingFeed({
  id,
  name,
  symbol,
  icon,
  balance,
  usdBalance,
  logo,
  change,
  isChangePositive,
  prices,
  isBorder,
}: LivePriceFeedProps) {
  return (
    <div
      className={cn(
        'flex flex-row items-center gap-4 rounded-lg bg-white p-5 shadow-[0_8px_16px_rgba(17,24,39,0.05)] dark:bg-light-dark '
      )}
    >
      <div className="flex w-full flex-col justify-between">
        <div className="mb-2 text-sm font-medium tracking-tighter text-gray-900 dark:text-white lg:text-lg 2xl:text-xl 3xl:text-2xl">
          {balance}
          <span className="ml-3">{symbol}</span>
        </div>

        <div className="flex items-center text-xs font-medium 2xl:text-sm">
          <span
            className="truncate tracking-tighter text-gray-600 ltr:mr-5 rtl:ml-5 dark:text-gray-400 2xl:w-24 3xl:w-auto"
            title={`${usdBalance} USD`}
          >
            {usdBalance} USD
          </span>

          <span
            className={`flex items-center  ${
              isChangePositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            <span
              className={`ltr:mr-2 rtl:ml-2 ${
                !isChangePositive ? 'rotate-180' : ''
              }`}
            >
              <ArrowUp />
            </span>
            {change}
          </span>
        </div>

        <div
          className="h-20 w-full overflow-hidden"
          data-hello={isChangePositive ? '#22c55e' : '#D6455D'}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={prices}>
              <defs>
                <linearGradient
                  id={`${name}-${id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={isChangePositive ? '#22c55e' : '#D6455D'}
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="100%"
                    stopColor={isChangePositive ? '#22c55e' : '#D6455D'}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                type="linear"
                dataKey="value"
                stroke={isChangePositive ? '#22c55e' : '#D6455D'}
                strokeWidth={2.5}
                fill={`url(#${`${name}-${id}`})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/*
export const TransactionData = [
  {
    id: 0,
    transactionType: 'Receive',
    createdAt: '2023-07-18 11:32:20',
    //symbol: 'BTC',
    status: 'Completed',
    address: '0x0898hshiw36...',
    amount: {
      balance: '32.2231345',
      usdBalance: '11,032.24',
    },
  },
  {
    id: 1,
    transactionType: 'Send',
    createdAt: '2023-07-16 16:28:42',
    //symbol: 'BTC',
    status: 'Completed',
    address: '0x0898hshiw36...',
    amount: {
      balance: '43.534',
      usdBalance: '1,032.24',
    },
  },
  {
    id: 2,
    transactionType: 'Receive',
    createdAt: '2023-07-15 06:20:20',
    //symbol: 'BTC',
    status: 'Completed',
    address: '0x0898hshiw36...',
    amount: {
      balance: '645.45',
      usdBalance: '21,032.24',
    },
  },
  {
    id: 3,
    transactionType: 'Send',
    createdAt: '2023-07-15 02:43:25',
    //symbol: 'BTC',
    status: 'Completed',
    address: '0x0898hshiw36...',
    amount: {
      balance: '1225.634',
      usdBalance: '1,232.24',
    },
  },
  {
    id: 4,
    transactionType: 'Receive',
    createdAt: '2023-07-15 02:43:25',
    //symbol: 'BTC',
    status: 'Completed',
    address: '0x0898hshiw36...',
    amount: {
      balance: '43.5422',
      usdBalance: '9,032.24',
    },
  },
  {
    id: 5,
    transactionType: 'Receive',
    createdAt: '2023-07-15 02:43:25',
    //symbol: 'BTC',
    status: 'Completed',
    address: '0x0898hshiw36...',
    amount: {
      balance: '18443.24245',
      usdBalance: '31,032.24',
    },
  },
  {
    id: 6,
    transactionType: 'Receive',
    createdAt: '2023-07-15 17:33:28',
    //symbol: 'BTC',
    status: 'Completed',
    address: '0x0898hshiw36...',
    amount: {
      balance: '422.24245',
      usdBalance: '31,032.24',
    },
  },
];
*/

const COLUMNS = [
  /*
  {
    Header: 'Action',
    accessor: 'action',
    minWidth: 100,
    maxWidth: 100,
  },
  */

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
];

export default function GameHistoryTable() {
  //nftMetadata: any
  const router = useRouter();

  const address = useAddress();

  ///console.log('PriceHistoryTable nftMetadata: ', nftMetadata);

  //const data = React.useMemo(() => transactionData, [ ]);

  const columns = React.useMemo(() => COLUMNS, []);

  const [transactions, setTransactions] = React.useState([]);

  //const address = useAddress();

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

  const { pageIndex } = state;

  const pageKey = '1';
  const pageSize = '10';

  const [totlaCount, setTotalCount] = useState();

  const getLast20 = async () => {
    if (!address) {
      return;
    }

    ///console.log('price-history-table nftMetadata?.metadata?.id: ', nftMetadata?.metadata?.id);

    const response = await fetch('/api/nft/user/history/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'getAllByHolder',
        address: address?.toLowerCase(),
      }),
    });
    const data = await response.json();

    ///console.log('data.all: ', data.all);

    //console.log('data.total: ', data.total);

    setTotalCount(data.total);

    ///setSaleHistory(data.all);

    const transactions = [] as any;

    data.all?.map((transfer: any, index: number) => {
      ///console.log('transfer: ', transfer);

      const transactionData = {
        action: transfer.action,

        type:
          transfer.action === 'ToknesStaked' ? (
            <span className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
              Register
            </span>
          ) : transfer.action === 'TokensWithdrawn' ? (
            <span className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
              Unregister
            </span>
          ) : transfer.action === 'Transfer' ? (
            <span className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
              Transfer
            </span>
          ) : transfer.action === 'TokensWithdrawn' ? (
            <span className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
              Unregister
            </span>
          ) : transfer.action === 'Claim' ? (
            <span className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
              Claim
            </span>
          ) : transfer.action === 'Buy' ? (
            <span className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
              Buy
            </span>
          ) : (
            <span className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
              {transfer.action}
            </span>
          ),

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
          transfer.action === 'TokensWithdrawn' ? (
            <div className="flex items-center justify-start gap-2">
              <Image
                src="/images/shop/horse.png"
                alt="horse"
                width={18}
                height={18}
              />

              <button
                className=" flex w-20 flex-row items-center justify-end "
                onClick={() => {
                  setDrawerHorseInfoTokenId(transfer.tokenId);
                  openDrawer('DRAWER_HORSE_INFO', transfer.tokenId);
                }}
              >
                <span className="text-xl font-bold text-black  underline decoration-sky-500   ">
                  #{transfer.tokenId}
                </span>
              </button>

              <span className="text-xs">Unregistered from racing</span>
            </div>
          ) : transfer.action === 'ToknesStaked' ? (
            <div className="flex items-center justify-start gap-2">
              <Image
                src="/images/shop/horse.png"
                alt="horse"
                width={18}
                height={18}
              />

              <button
                className=" flex w-20 flex-row items-center justify-end "
                onClick={() => {
                  setDrawerHorseInfoTokenId(transfer.tokenId);
                  openDrawer('DRAWER_HORSE_INFO', transfer.tokenId);
                }}
              >
                <span className="text-xl font-bold text-black  underline decoration-sky-500   ">
                  #{transfer.tokenId}
                </span>
              </button>

              <span className="text-xs">Registered for racing</span>
            </div>
          ) : transfer.tokenTo ===
            stakingContractAddressHorseAAA.toLowerCase() ? (
            <div className="flex items-center justify-start gap-2">
              <Image
                src="/images/shop/horse.png"
                alt="horse"
                width={18}
                height={18}
              />

              <button
                className=" flex w-20 flex-row items-center justify-end "
                onClick={() => {
                  setDrawerHorseInfoTokenId(transfer.tokenId);
                  openDrawer('DRAWER_HORSE_INFO', transfer.tokenId);
                }}
              >
                <span className="text-xl font-bold text-black  underline decoration-sky-500   ">
                  #{transfer.tokenId}
                </span>
              </button>

              <span className="text-xs">Registered for racing</span>
            </div>
          ) : transfer.tokenFrom ===
            stakingContractAddressHorseAAA.toLowerCase() ? (
            //'Unregistered'

            <div className="flex items-center justify-start gap-2">
              <Image
                src="/images/shop/horse.png"
                alt="horse"
                width={18}
                height={18}
              />
              <button
                className=" flex w-20 flex-row items-center justify-end "
                onClick={() => {
                  setDrawerHorseInfoTokenId(transfer.tokenId);
                  openDrawer('DRAWER_HORSE_INFO', transfer.tokenId);
                }}
              >
                <span className="text-xl font-bold text-black underline decoration-sky-500">
                  #{transfer.tokenId}
                </span>
              </button>
              <span className="text-xs">Unregistered from racing</span>
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
                  <span className="w-20 text-xl font-bold text-black">
                    {Number(transfer.value).toFixed(2)}
                  </span>
                  <span className="text-xs">Sent to</span>

                  <button
                    className=" flex flex-row items-center justify-start "
                    onClick={() => {
                      setDrawerUserInfoUserAddress(transfer.tokenTo);
                      openDrawer('DRAWER_USER_INFO', 0);
                    }}
                  >
                    <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
                    <span className="text-black">
                      {transfer.tokenTo?.substring(0, 6) + '...'}
                    </span>
                  </button>
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
                  <span className="w-20 text-xl font-bold text-black">
                    {Number(transfer.value).toFixed(2)}
                  </span>

                  <span className="text-xs">Sent to</span>

                  <button
                    className=" flex flex-row items-center justify-start "
                    onClick={() => {
                      setDrawerUserInfoUserAddress(transfer.tokenTo);
                      openDrawer('DRAWER_USER_INFO', 0);
                    }}
                  >
                    <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
                    <span className="text-black">
                      {transfer.tokenTo?.substring(0, 6) + '...'}
                    </span>
                  </button>
                </div>
              )}
              {transfer.asset === 'SUGAR' && (
                <div className="flex items-center justify-start gap-2">
                  <Image
                    src="/images/icon-gdp.png"
                    alt="gd"
                    width={18}
                    height={18}
                  />
                  <span className=" w-32 text-xl font-bold text-black">
                    {Number(transfer.value).toFixed(2)}
                  </span>
                  <span className="text-xs">Sent to</span>

                  <button
                    className=" flex flex-row items-center justify-start "
                    onClick={() => {
                      setDrawerUserInfoUserAddress(transfer.tokenTo);
                      openDrawer('DRAWER_USER_INFO', 0);
                    }}
                  >
                    <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
                    <span className="text-black">
                      {transfer.tokenTo?.substring(0, 6) + '...'}
                    </span>
                  </button>
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

                    <span className=" w-20 text-right text-xl font-bold  text-black underline decoration-sky-500">
                      #{transfer.tokenId}
                    </span>
                  </button>

                  <span className=" w-36 text-xs">Sent to</span>

                  <button
                    className=" flex flex-row items-center justify-start "
                    onClick={() => {
                      setDrawerUserInfoUserAddress(transfer.tokenTo);
                      openDrawer('DRAWER_USER_INFO', 0);
                    }}
                  >
                    <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
                    <span className="text-black">
                      {transfer.tokenTo?.substring(0, 6) + '...'}
                    </span>
                  </button>
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

                      <span className="text-xl font-bold text-black">
                        {Number(transfer.value).toFixed(2)}
                      </span>

                      <span className="text-xs">Minted</span>
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

                      <span className=" w-20 text-xl font-bold text-black">
                        {Number(transfer.value).toFixed(2)}
                      </span>

                      <span className="text-xs">Baught</span>
                    </div>
                  )}
                  {transfer.asset === 'SUGAR' && (
                    <div className="flex items-center justify-start gap-2">
                      <Image
                        src="/images/icon-gdp.png"
                        alt="gd"
                        width={18}
                        height={18}
                      />

                      <span className=" w-32 text-xl font-bold text-black">
                        {Number(transfer.value).toFixed(2)}
                      </span>
                      <span className="text-xs">Minted</span>
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
                      <span className=" w-20 text-xl font-bold text-black">
                        {Number(transfer.value).toFixed(2)}
                      </span>

                      <span className="text-left text-xs">Received from</span>

                      <button
                        className=" flex flex-row items-center justify-start "
                        onClick={() => {
                          setDrawerUserInfoUserAddress(transfer.tokenFrom);
                          openDrawer('DRAWER_USER_INFO', 0);
                        }}
                      >
                        <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
                        <span className="text-black">
                          {transfer.tokenFrom?.substring(0, 6) + '...'}
                        </span>
                      </button>
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
                      <span className=" w-20 text-xl font-bold text-black">
                        {Number(transfer.value).toFixed(2)}
                      </span>
                      <span className="text-left text-xs">Received from</span>
                      <button
                        className=" flex flex-row items-center justify-start "
                        onClick={() => {
                          setDrawerUserInfoUserAddress(transfer.tokenFrom);
                          openDrawer('DRAWER_USER_INFO', 0);
                        }}
                      >
                        <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
                        <span className="text-black">
                          {transfer.tokenFrom?.substring(0, 6) + '...'}
                        </span>
                      </button>
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
                      <span className=" w-20 text-right  text-xl font-bold text-black">
                        {Number(transfer.value).toFixed(2)}
                      </span>

                      {transfer.tokenFrom ===
                      addressAirdropReward.toLowerCase() ? (
                        <span className="text-xs">
                          Rewarded for trading bonus
                        </span>
                      ) : transfer.tokenFrom ===
                        addressRaceReward.toLowerCase() ? (
                        <span className="text-xs">
                          Wined a prize for racing
                        </span>
                      ) : (
                        <>
                          <span className="text-left text-xs">
                            Received from
                          </span>
                          <button
                            className=" flex flex-row items-center justify-start "
                            onClick={() => {
                              setDrawerUserInfoUserAddress(transfer.tokenFrom);
                              openDrawer('DRAWER_USER_INFO', 0);
                            }}
                          >
                            <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
                            <span className="text-black">
                              {transfer.tokenFrom?.substring(0, 6) + '...'}
                            </span>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : transfer.category === 'erc721' ? (
            <div className="flex items-center justify-start gap-2">
              {transfer.asset === 'GRANDERBY' && (
                <Image
                  src="/images/shop/horse.png"
                  alt="horse"
                  width={18}
                  height={18}
                />
              )}
              <button
                className=" flex w-20 flex-row items-center justify-end "
                onClick={() => {
                  setDrawerHorseInfoTokenId(transfer.tokenId);
                  openDrawer('DRAWER_HORSE_INFO', transfer.tokenId);
                }}
              >
                <span className="text-xl font-bold text-black underline decoration-sky-500  ">
                  #{transfer.tokenId}
                </span>
              </button>

              <span className="text-xs">Received from</span>

              <button
                className=" flex flex-row items-center justify-start "
                onClick={() => {
                  setDrawerUserInfoUserAddress(transfer.tokenFrom);
                  openDrawer('DRAWER_USER_INFO', 0);
                }}
              >
                <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
                <span className="text-black">
                  {transfer.tokenFrom?.substring(0, 6) + '...'}
                </span>
              </button>
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

  const [attributeGrade, setAttributeGrade] = useState(null);

  const [priceFeedDataIndex, setPriceFeedDataIndex] = useState(0);

  const { openDrawer } = useDrawer();

  const [drawerHorseInfoTokenId, setDrawerHorseInfoTokenId] = useLocalStorage(
    'drawer-horse-info-tokenid'
  );

  const [drawerUserInfoUserAddress, setDrawerUserInfoUserAddress] =
    useLocalStorage('drawer-user-info-useraddress');

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row items-center justify-between  gap-2">
        <div className="flex flex-row items-center  justify-center gap-2 ">
          {/* message icon MailOutlineIcon */}
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={() => {
                router.push(`/mypage/inbox/game`);
              }}
              title="Messages"
              shape="circle"
              variant="transparent"
              size="small"
              className="text-gray-700 dark:text-white"
            >
              <MailOutlineIcon className="h-auto w-4 rtl:rotate-180" />
            </Button>
          </div>

          <span className=" text-2xl font-bold">Messages</span>

          {/* reload button */}
          <div className="flex items-center justify-center ">
            <Button
              onClick={() => {
                getLast20();
              }}
              title="Reload"
              shape="circle"
              variant="transparent"
              size="small"
              className=" text-gray-700 dark:text-white"
            >
              <Refresh className="h-auto w-4 rtl:rotate-180" />
            </Button>
          </div>
        </div>

        {/*
        <Button
          className="h-8 bg-green-500 font-normal text-black hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white md:h-8 xl:h-8 "
          onClick={() => router.push(`/mypage/inbox/game`)}
        >
          <span className="flex items-center gap-2">
            <InfoIcon className="h-3 w-3" />{' '}
            <span className="text-xs">View All</span>
          </span>
        </Button>
        */}
      </div>

      <div className="mt-3 flex flex-col rounded-lg border p-5">
        <div className="-mx-0.5 dark:[&_.os-scrollbar_.os-scrollbar-track_.os-scrollbar-handle:before]:!bg-white/50">
          <Scrollbar style={{ width: '100%' }} autoHide="never" className="">
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

        <div className="mt-3 flex items-center justify-center rounded-lg bg-white px-5 py-4 text-sm shadow-card dark:bg-light-dark lg:py-6">
          <div className="flex items-center gap-5">
            <Button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              title="Previous"
              shape="circle"
              variant="transparent"
              size="small"
              className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
            >
              <LongArrowLeft className="h-auto w-4 rtl:rotate-180" />
            </Button>
            <div>
              Page{' '}
              <strong className="font-semibold">
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </div>
            <Button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              title="Next"
              shape="circle"
              variant="transparent"
              size="small"
              className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
            >
              <LongArrowRight className="h-auto w-4 rtl:rotate-180 " />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
