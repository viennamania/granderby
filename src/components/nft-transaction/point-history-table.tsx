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

import { nftDropContractAddressHorse } from '@/config/contractAddresses';

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
            className="truncate tracking-tighter text-gray-600 dark:text-gray-400 2xl:w-24 3xl:w-auto ltr:mr-5 rtl:ml-5"
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
    //Header: 'ID',
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">ID</div>,
    accessor: 'id',
    minWidth: 100,
    maxWidth: 100,
  },
  */
  /*
  {
    Header: 'Type',
    accessor: 'transactionType',
    minWidth: 30,
    maxWidth: 40,
  },
  */

  /*
            {
          idx: '633256',
          GameId: '1001028123',
          Race_Date: '2024-02-08T00:00:00.000Z',
          Horse_Uid: '862',
          Horse_Grade: 3,
          Payment_Date: '2024-02-29T01:40:24.893Z',
          Payment_Status: 1,
          Amount: 509,
          Row_RegTime: '2024-02-28T09:23:24.907Z'
        },
        */

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">idx</div>,
    accessor: 'idx',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ml-1 text-left text-xs -tracking-[1px]">{value}</div>
    ),
    minWidth: 80,
    maxWidth: 80,
  },

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Date</div>,
    accessor: 'Payment_Date',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-right rtl:text-left">
        {format(Date.parse(value), 'yyy-MM-dd hh:mm:ss')}
      </div>
    ),
    minWidth: 200,
    maxWidth: 200,
  },

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Amount</div>,
    accessor: 'Amount',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="-tracking-[1px] ltr:text-right rtl:text-left">
        <strong className="mb-0.5 flex items-center justify-end text-base md:mb-1.5 md:text-lg lg:text-base 3xl:text-2xl">
          <div className="flex flex-row items-center justify-end gap-2 ">
            {value}
          </div>
        </strong>
      </div>
    ),
    minWidth: 100,
    maxWidth: 200,
  },

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">GameId</div>,
    accessor: 'GameId',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-right rtl:text-left">{value}</div>
    ),
    minWidth: 80,
    maxWidth: 120,
  },

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Status</div>,
    accessor: 'Payment_Status',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="font-bold text-green-600 ltr:text-right rtl:text-left">
        {value === 1 ? 'Completed' : 'Pending'}
      </div>
    ),
    minWidth: 80,
    maxWidth: 120,
  },
];

export default function PointHistoryTable({
  //nftMetadata,
  tokenid,
}: {
  //nftMetadata?: any;
  tokenid?: any;
}) {
  const router = useRouter();

  console.log('PointHistoryTable tokenid: ', tokenid);

  //const data = React.useMemo(() => transactionData, [ ]);

  const columns = React.useMemo(() => COLUMNS, []);

  const [transactions, setTransactions] = React.useState([]);

  useEffect(() => {
    const getBalanceHistory = async () => {
      console.log('getBalanceHistory tokenId', tokenid);

      if (!tokenid) return;

      const response = await fetch('/api/nft/getBalanceHistoryByTokenId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenId: tokenid,
        }),
      });
      const data = await response.json();

      console.log('point-history-table data', data);

      /*
          {
          idx: '633256',
          GameId: '1001028123',
          Race_Date: '2024-02-08T00:00:00.000Z',
          Horse_Uid: '862',
          Horse_Grade: 3,
          Payment_Date: '2024-02-29T01:40:24.893Z',
          Payment_Status: 1,
          Amount: 509,
          Row_RegTime: '2024-02-28T09:23:24.907Z'
        },
        */

      setTransactions(data?.balanceHistory || null);
    };

    getBalanceHistory();
  }, [tokenid]);

  const address = useAddress();

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
      //data,
      data: transactions,
      initialState: { pageSize: 5 },
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination
  );

  const { pageIndex } = state;

  const pageKey = '1';
  const pageSize = '10';

  /*
  useEffect(() => {

    const getTransactions = async () => {
      //if (address) {

      // post to api to get transactions
      const formInputs = {
        pageKey: pageKey,
        pageSize: pageSize,
        contract: nftDropContractAddressHorse,
        //address: address,
      };

      const res = await fetch('/api/nft/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInputs),
      });

      const data = await res.json();

      //console.log('getTransactions data: ', data);


      ///setTransers(data.transfers);

      const transactions = [] as any;

      data.transactions?.map((transfer: any, index: number) => {
        if (index > 1) return;

        const transactionData = {
          id: transfer.blockNum,
          //transactionType: transfer.from === address ? 'Send' : 'Receive',
          transactionType: 'Send',
          createdAt: transfer.createdAt,

          //address: transfer.from === address ? transfer.to : transfer.from,
          address: transfer.to,

          amount: {
            balance: transfer.value,
            usdBalance: '11,032.24',
          },
          status: 'Completed',
        };

        //console.log('transactionData: ', transactionData);

        ////setTransers((transfers) => [...transfers, transactionData]);

        transactions.push(transactionData);
      });

      ///console.log('transactions: ', transactions);

      setTransactions(transactions);
    };

    //};

    getTransactions();

    //}, [address]);
  }, []);
  */

  const [saleHistory, setSaleHistory] = useState([] as any);

  const [totlaCount, setTotalCount] = useState();

  const [attributeGrade, setAttributeGrade] = useState(null);

  const [priceFeedDataIndex, setPriceFeedDataIndex] = useState(0);

  return (
    <div className="flex w-full flex-col rounded-lg bg-slate-100 p-5 dark:bg-light-dark">
      {/*
      <LivePricingFeed {...priceFeedData[priceFeedDataIndex]} />
      */}

      {/*
      <div className=" rounded-tl-lg rounded-tr-lg bg-white px-4 pt-6 dark:bg-light-dark md:px-8 md:pt-8">
        <div className="flex flex-col items-center justify-between border-b border-dashed border-gray-200 pb-5 dark:border-gray-700 md:flex-row">
          <h2 className="sm:text-md mb-3 shrink-0 text-lg font-medium uppercase text-black dark:text-white md:mb-0 md:text-xl">
            Price History
          </h2>
        </div>
      </div>
      */}

      <div className="flex flex-row items-center justify-between border-b border-dashed border-gray-200 pb-5 dark:border-gray-700 ">
        <div className="flex items-center justify-start gap-2">
          <HistoryIcon className="h-4 w-4" />

          <div className="   text-sm font-medium  text-black dark:text-white lg:text-lg">
            Allowance History
          </div>
        </div>

        {/* reload button */}
        {/*
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={() => {
              //getTransfers();
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
        */}
      </div>

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
                        className="group  bg-white px-2 py-5 font-normal first:rounded-bl-lg last:rounded-br-lg dark:bg-light-dark md:px-4 ltr:first:pl-8 ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8"
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
                            className="px-2 py-4 tracking-[1px] md:px-4 md:py-6 3xl:py-5 ltr:first:pl-4 ltr:last:pr-4 md:ltr:first:pl-8 md:ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8"
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
  );
}
