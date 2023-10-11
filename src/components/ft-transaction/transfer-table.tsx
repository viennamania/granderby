import React, { useEffect } from 'react';

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

import { TransactionData } from '@/data/static/token-transaction-data';

import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';

import { useAddress } from '@thirdweb-dev/react';
import { add, set } from 'lodash';

import { tr } from 'date-fns/locale';
import { array } from 'yup';

import { ethers } from 'ethers';

import { HistoryIcon } from '@/components/icons/history';
import { Refresh } from '@/components/icons/refresh';

import moment from 'moment';

import { BigNumber } from 'ethers';
import { utils } from 'ethers';

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
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Type</div>,
    accessor: 'transactionType',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltext-left">
        {value === 'Send' ? (
          <div className="-tracking-[1px] ">
            <LongArrowRight className="h-5 w-5  md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-7 xl:w-7" />
            <span className="text-orange-600  dark:text-gray-400">{value}</span>
          </div>
        ) : (
          <div className="-tracking-[1px]">
            <LongArrowLeft className="h-5 w-5  md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-7 xl:w-7" />
            <span className="text-green-600 dark:text-gray-400">{value}</span>
          </div>
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
      <div className="-tracking-[1px] ltr:text-right rtl:text-left">
        <strong className="mb-0.5 flex justify-end text-2xl font-bold md:mb-1.5 md:text-2xl xl:text-3xl 3xl:text-3xl">
          {Number(value).toFixed(2)}

          {/*
          <span className="inline-block text-[#2b57a2] ltr:ml-1.5 rtl:mr-1.5 md:ltr:ml-2 md:rtl:mr-2">
            ROM
          </span>
          */}
        </strong>
        {/*
        <span className="text-gray-600 dark:text-gray-400">
          ${value.usdBalance}
        </span>
        */}
      </div>
    ),
    minWidth: 150,
    maxWidth: 150,
  },
  /*
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Asset</div>,
    accessor: 'symbol',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-right rtl:text-left">{value}</div>
    ),
    minWidth: 80,
    maxWidth: 120,
  },
  */
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Date</div>,
    accessor: 'createdAt',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-right rtl:text-left">
        {moment(value).local().format('YYYY-MM-DD HH:mm:ss')}
      </div>
    ),
    minWidth: 100,
    maxWidth: 130,
  },

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">From / To</div>,
    accessor: 'address',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="flex items-center justify-end">
        {value == '0x0000000000000000000000000000000000000000'
          ? 'Drops'
          : value.length > 10
          ? //? value.substring(0, 10) + '...'
            value
          : value}
      </div>
    ),
    minWidth: 400,
    maxWidth: 400,
  },

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Status</div>,
    accessor: 'status',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="font-bold text-green-600 ltr:text-right rtl:text-left">
        {value}
      </div>
    ),
    minWidth: 70,
    maxWidth: 100,
  },

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Tx Hash</div>,
    accessor: 'tx_hash',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div
        className="flex items-center justify-end"
        onClick={() => {
          window.open(
            `https://bscscan.com/tx/${value}`,
            '_blank' // <- This is what makes it open in a new window.
          );
        }}
      >
        <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
        {value == '0x0000000000000000000000000000000000000000'
          ? 'Drops'
          : value.length > 10
          ? value.substring(0, 10) + '...'
          : value}
      </div>
    ),
    minWidth: 90,
    maxWidth: 150,
  },
];

export default function TransferTable(
  contractAddress: string
  ///address : string,
) {
  /////console.log('TransferTable contractAddress: ', contractAddress);

  ///const data = React.useMemo(() => TransactionData, []);

  //const data = React.useMemo(() => transactionData, [ ]);

  const columns = React.useMemo(() => COLUMNS, []);

  const [transfers, setTransfers] = React.useState([]);

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
      data: transfers,
      initialState: { pageSize: 10 },
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination
  );

  const { pageIndex } = state;

  const pageKey = '1';
  const pageSize = '50';

  const getTransfers = async () => {
    if (address) {
      // post to api to get transactions
      const formInputs = {
        pageKey: pageKey,
        pageSize: pageSize,
        contract: contractAddress,
        address: address,
      };

      const res = await fetch('/api/ft/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInputs),
      });

      const data = await res.json();

      //console.log('TransferTable data: ', data);

      const transfers = [] as any;

      data.data?.map((transfer: any) => {
        /// console.log("transaction.amount", BigInt(transaction.amount));

        console.log('transfer-table transfer: ', transfer);

        const transferData = {
          id: transfer._id,

          transactionType:
            transfer.tokenFrom === address.toLowerCase() ? 'Send' : 'Receive',
          //transactionType: "Send",

          createdAt: transfer.blockTimestamp,

          address:
            transfer.tokenFrom === address.toLowerCase()
              ? transfer.tokenTo
              : transfer.tokenFrom,

          ///address: transaction.to,

          ///amount: ethers.utils.formatEther(String(transaction.amount)),
          //amount: utils.formatUnits(transaction.amount, 18),
          //amount: 0,
          amount: transfer.value,

          status: 'Completed',
          tx_hash: transfer.hash,
        };

        transfers.push(transferData);
      });

      ///console.log('transfer-table transfers: ', transfers);

      setTransfers(transfers);
    }
  };

  useEffect(() => {
    /*
    let timer1 = setTimeout(() => getTransactions(), 10000);

    // this will clear Timeout
    // when component unmount like in willComponentUnmount
    // and show will not change to true
    return () => {
      clearTimeout(timer1);
    };
    */

    //console.log('TransferTable useEffect address: ', address);

    getTransfers();

    setTimeout(() => {
      getTransfers();
    }, 10000);
  }, [address]);

  return (
    <div className="">
      <div className="rounded-tl-lg rounded-tr-lg bg-white px-4 pt-6 dark:bg-light-dark md:px-8 md:pt-8">
        <div className="flex flex-row items-center justify-between border-b border-dashed border-gray-200 pb-5 dark:border-gray-700 ">
          <div className="flex items-center justify-start gap-2">
            <HistoryIcon className="h-6 w-6" />

            <div className="   text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:mb-0 md:text-2xl">
              Tranfer History
            </div>
          </div>

          {/* reload button */}
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={() => {
                getTransfers();
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
      </div>

      {address && (
        <>
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
                          className="mb-3 items-center rounded-lg bg-white uppercase shadow-card last:mb-0 dark:bg-light-dark"
                        >
                          {row.cells.map((cell, idx) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                key={idx}
                                className="px-2 py-4 tracking-[1px] ltr:first:pl-4 ltr:last:pr-4 rtl:first:pr-8 rtl:last:pl-8 md:px-4 md:py-6 md:ltr:first:pl-8 md:ltr:last:pr-8 3xl:py-5"
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
        </>
      )}
    </div>
  );
}
