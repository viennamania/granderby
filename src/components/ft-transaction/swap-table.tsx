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

import Image from 'next/image';

import { tokenContractAddressGDP } from '@/config/contractAddresses';

/*

createdAt
: 
"2024-05-09T07:35:32.376Z"
email1
: 
"email1"
fromAmount
: 
100000
fromCoin
: 
"GDP"
fromCoinTxHash
: 
"0x7bec6908e7ca3da2ad00953f91364d664e470da467d44658f558cacd37b46376"
fromWallet
: 
"0xbF9dfe7D364B827111424d3b03F5f6f5f1B05df3"
status
: 
"Waiting"
toAmount
: 
1
toCoin
: 
"USDT"
toWallet
: 
"0x26597616ed4e44379ba0Eb1EB86C4cFd82606F3E"
txHash
: 
""
type
: 
"Matic"
userID
: 
"userID"
*/

const COLUMNS = [
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Hash</div>,
    accessor: 'fromCoinTxHash',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <button
        className=" flex flex-row items-center justify-center "
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
  {
    Header: () => (
      <div className="ltr:ml-auto rtl:mr-auto">From Amount(GDP)</div>
    ),
    accessor: 'fromAmount',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltext-left">
        <strong className="mb-0.5 flex justify-end text-2xl font-bold md:mb-1.5 md:text-2xl xl:text-3xl 3xl:text-3xl">
          {Number(value).toFixed(2)}
        </strong>
      </div>
    ),
    minWidth: 100,
    maxWidth: 100,
  },
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Fee(GDP)</div>,
    accessor: 'fromAmountFee',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltext-left">
        <strong className="mb-0.5 flex justify-end text-2xl font-bold md:mb-1.5 md:text-2xl xl:text-3xl 3xl:text-3xl">
          {value === undefined ? '0.00' : Number(value).toFixed(2)}
        </strong>
      </div>
    ),
    minWidth: 80,
    maxWidth: 80,
  },
  {
    Header: () => (
      <div className="ltr:ml-auto rtl:mr-auto">To Amount(USDT)</div>
    ),
    accessor: 'toAmount',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="-tracking-[1px] ltr:text-right rtl:text-left">
        <strong className="mb-0.5 flex justify-end text-2xl font-bold md:mb-1.5 md:text-2xl xl:text-3xl 3xl:text-3xl">
          {Number(value).toFixed(2)}
        </strong>
      </div>
    ),
    minWidth: 100,
    maxWidth: 100,
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
    Header: () => <div className=" ml-auto ">To Wallet Address</div>,
    accessor: 'toWallet',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="flex items-center justify-center  ">
        <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
        {
          <div className="text-left  text-xl font-bold -tracking-[1px] ">
            {value.substring(0, 6) + '...'}
          </div>
        }
      </div>
    ),
    minWidth: 100,
    maxWidth: 100,
  },
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Hash</div>,
    accessor: 'txHash',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <button
        className=" flex flex-row items-center justify-center "
        onClick={() =>
          //alert("clicked")

          (location.href = 'https://polygonscan.com/tx/' + value)
        }
      >
        <Image src="/images/logo-polygon.png" alt="gd" width={13} height={13} />

        <div className="ml-1 text-left  -tracking-[1px]  ">
          {value.substring(0, 6) + '...'}
        </div>
      </button>
    ),
    minWidth: 50,
    maxWidth: 50,
  },

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Progress</div>,
    accessor: 'status',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div
        className={`font-bold ltr:text-right rtl:text-left
        ${
          value === 'Waiting'
            ? 'text-[#FFA502]'
            : value === 'Progressing'
            ? 'text-[#2DCE89]'
            : 'text-[#2DCE89]'
        }
      `}
      >
        {value === 'Waiting' ? 'Progressing' : 'Completed'}
      </div>
    ),
    minWidth: 70,
    maxWidth: 100,
  },

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Date</div>,
    accessor: 'createdAt',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-right rtl:text-left">
        {moment(value).local().format('YYYY-MM-DD HH:mm:ss')}
      </div>
    ),
    minWidth: 80,
    maxWidth: 80,
  },
];

export default function SwapTable() {
  //contractAddress: string
  ///address : string,
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

  const contractAddress = tokenContractAddressGDP.toLowerCase();

  const getTransfers = async () => {
    if (address) {
      // post to api to get transactions
      const formInputs = {
        pageKey: pageKey,
        pageSize: pageSize,
        contract: contractAddress,
        fromWallet: address,
      };

      const res = await fetch('/api/ft/swaphistory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInputs),
      });

      const data = await res.json();

      ///console.log('swaphistory data.swapRequests: ', data?.swapRequests );

      ///console.log('transfer-table transfers: ', transfers);

      // setTransfers(transfers);

      if (data?.swapRequests) {
        setTransfers(data?.swapRequests);
      } else {
        setTransfers([]);
      }
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
              SWAP History
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
