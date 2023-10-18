import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import { useLayout } from '@/lib/hooks/use-layout';

import { LAYOUT_OPTIONS } from '@/lib/constants';
import Image from '@/components/ui/image';
import Avatar from '@/components/ui/avatar';

import Profile from '@/components/rent-horse/profile';

import RetroProfile from '@/components/rent-horse/retro-profile';
// static data
import { authorData } from '@/data/static/authorHorse';
import RootLayout from '@/layouts/_root-layout';

import { useAddress } from '@thirdweb-dev/react';

import AnchorLink from '@/components/ui/links/anchor-link';

import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';

import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';

import { SearchIcon } from '@/components/icons/search';

///import Search from '@/components/search/search-horse';

import Search from '@/components/search/search-portfolio';

import CollapseLivePricing from '@/components/ui/collapse-live-pricing';
import LiveNftPricingSlider from '@/components/ui/live-nft-horse-pricing-slider';

import PortfolioScreen from '@/components/screens/portfolio-screen';

import { useMemo, useState, useEffect } from 'react';

import { useCopyToClipboard } from 'react-use';
import { Copy } from '@/components/icons/copy';
import { Check } from '@/components/icons/check';

import { useQRCode } from 'next-qrcode';

import { useRouter } from 'next/router';
import { add, get } from 'lodash';

import { Refresh } from '@/components/icons/refresh';
import { InfoIcon } from '@/components/icons/info-icon';

import Button from '@/components/ui/button';
import Scrollbar from '@/components/ui/scrollbar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import { LongArrowLeft } from '@/components/icons/long-arrow-left';

import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
} from 'react-table';

import { format } from 'date-fns';

const COLUMNS = [
  {
    Header: 'Action',
    accessor: 'action',
    minWidth: 60,
    maxWidth: 60,
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

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Contents</div>,
    accessor: 'category',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="text-xs text-green-600 ltr:text-right rtl:text-left xl:text-sm">
        {value}
      </div>
    ),
    minWidth: 150,
    maxWidth: 150,
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
    minWidth: 180,
    maxWidth: 180,
  },
];

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
} from '@/config/contractAddresses';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const PortfolioPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { layout } = useLayout();

  const address = useAddress();

  const router = useRouter();

  const { Canvas } = useQRCode();

  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();

  function handleCopyToClipboard() {
    copyToClipboard(address as string);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }

  const [games, setGames] = useState([]);

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
      data: games,
      initialState: { pageSize: 30 },
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination
  );

  const { pageIndex } = state;

  const getLast20 = async () => {
    ///console.log('price-history-table nftMetadata?.metadata?.id: ', nftMetadata?.metadata?.id);

    const response = await fetch('/api/nft/user/history/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'getAll',
        address: address?.toLowerCase(),
      }),
    });
    const data = await response.json();

    ///console.log('data.all: ', data.all);

    //console.log('data.total: ', data.total);

    ///setTotalCount(data.total);

    ///setSaleHistory(data.all);

    const games = [] as any;

    data.all?.map((game: any, index: number) => {
      //console.log('transfer: ', transfer);

      const gameData = {
        action: game.action,
        hash: game.hash,
        id: game.blockNum,
        //transactionType: transfer.from === address ? 'Send' : 'Receive',
        transactionType: 'Send',
        createdAt: game.blockTimestamp,

        tokenFrom: game.tokenFrom,
        tokenTo: game.tokenTo,

        asset: game.asset,

        tokenId: game.tokenId,
        amount:
          game.category === 'erc20'
            ? Number(game.value).toFixed(2)
            : `#` + game.tokenId,

        logs4Address: game.logs4Address,

        category:
          game.tokenTo === stakingContractAddressHorseAAA.toLowerCase()
            ? 'Registered'
            : game.tokenFrom === stakingContractAddressHorseAAA.toLowerCase()
            ? 'Unregistered'
            : game.tokenFrom === address?.toLowerCase()
            ? 'Send to ' + game.tokenTo?.substring(0, 6) + '...'
            : 'Receive from ' + game.tokenFrom?.substring(0, 6) + '...',
      };

      //console.log('transactionData: ', transactionData);

      ////setTransers((transfers) => [...transfers, transactionData]);

      games.push(gameData);
    });

    ///console.log('transactions: ', transactions);

    setGames(games);
  };

  useEffect(() => {
    getLast20();
  }, [address]);

  if (!address) {
    return (
      <>
        <NextSeo title="Gift Box" description="Granderby - Web3 NFT Game" />

        {/* title */}
        <div className="mb-10 flex items-center justify-start">
          <div className="text-center text-2xl font-bold">Gift Box</div>
        </div>

        <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
          <Image
            src={authorData?.cover_image?.thumbnail}
            placeholder="blur"
            fill
            className="h-full w-full object-fill"
            alt="Cover Image"
          />
        </div>

        <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
          <Avatar
            size="xl"
            image={authorData?.avatar?.thumbnail}
            alt="Author"
            className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
          />
          <div className="flex flex-col items-center justify-center">
            <div className="text-center text-2xl font-bold">Login</div>
            <div className="text-center text-xl font-bold">
              to see your gift box
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NextSeo title="Profile" description="Granderby - Web3 NFT Game" />

      <div className=" mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        {/* title */}
        <div className="flex items-center justify-start">
          <div className="text-center text-2xl font-bold">Gift Box</div>
        </div>

        {!address ? (
          <></>
        ) : (
          <div className="mt-5 flex w-full flex-col">
            <div className="flex flex-row items-center justify-between  gap-2">
              <div className="flex flex-row gap-2">
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
            </div>

            <div className="flex flex-row items-center justify-start gap-2">
              {/* reload button */}
              {/*
              <HistoryIcon className="h-6 w-6" />
              <span className="text-sm">History</span>
      
      
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
              */}
            </div>

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

            <div className="mt-3 flex flex-col rounded-lg border p-5">
              <div className="-mx-0.5 dark:[&_.os-scrollbar_.os-scrollbar-track_.os-scrollbar-handle:before]:!bg-white/50">
                {/*
                <div className="m-3 flex flex-row items-center justify-start gap-2 ">
                  <span className="text-sm">Total Transfers</span>
                  <span className="text-4xl font-bold text-green-600 xl:text-6xl">
                    {totlaCount}
                  </span>
                </div>
                */}

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
                              className="mb-1 items-center rounded-lg bg-white uppercase shadow-card last:mb-0 dark:bg-light-dark"
                            >
                              {row.cells.map((cell, idx) => {
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    key={idx}
                                    className="px-2 py-2 tracking-[1px] "
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
        )}
      </div>
    </>
  );
};

PortfolioPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default PortfolioPage;
