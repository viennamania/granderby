import { useState, Fragment, useEffect, use } from 'react';
import { format } from 'date-fns';
import cn from 'classnames';
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

import { Bitcoin } from '@/components/icons/bitcoin';
import Image from '@/components/ui/image';

import { Refresh } from '@/components/icons/refresh';
import { RadioGroup } from '@/components/ui/radio-group';
import Collapse from '@/components/ui/collapse';

import { motion } from 'framer-motion';
import {
  weeklyComparison,
  monthlyComparison,
  yearlyComparison,
} from '@/data/static/price-history';
import { Tag } from '@/components/icons/tag';
import { LongArrowUp } from '@/components/icons/long-arrow-up';
import { ArrowUp } from '@/components/icons/arrow-up';

import { Listbox, Transition } from '@headlessui/react';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import { InfoCircle } from '@/components/icons/info-circle';
import Progressbar from '@/components/ui/progressbar';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';
import PopoverContent from '@/components/cryptocurrency-pricing-table/popover-content';

import { Network, Alchemy } from 'alchemy-sdk';

import Link from 'next/link';

import RaceHistoryTable from '@/components/nft-transaction/race-history-table';

import { LongArrowLeft } from '@/components/icons/long-arrow-left';

import { ArrowRight } from '@/components/icons/arrow-right';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
} from '@/config/contractAddresses';

import {
  useAddress,
  ThirdwebNftMedia,
  useContract,
  useNFT,
  Web3Button,
  useContractRead,
} from '@thirdweb-dev/react';

import { useModal } from '@/components/modal-views/context';
import Button from '@/components/ui/button';

///import { priceFeedData } from '@/data/static/price-feed';
import { priceFeedData } from '@/data/static/nft-horse-price-feed';
import { is } from 'date-fns/locale';

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

function Grade(grade: any) {
  /*
  var valueGrade = '';

  if (grade?.grade?.length > 35) {
    console.log('Grade grade.grade[35]====', grade?.grade[35]);

    valueGrade = grade?.grade[35];
  }
  */

  var checkedS = false;
  var checkedU = false;
  var checkedA = false;
  var checkedB = false;
  var checkedC = false;
  var checkedD = false;

  if (grade?.grade === 'S') {
    checkedS = true;
  } else if (grade?.grade === 'U') {
    checkedU = true;
  } else if (grade?.grade === 'A') {
    checkedA = true;
  } else if (grade?.grade === 'B') {
    checkedB = true;
  } else if (grade?.grade === 'C') {
    checkedC = true;
  } else if (grade?.grade === 'D') {
    checkedD = true;
  }

  return (
    <RadioGroup
      value={grade}
      //onChange={setGrade}
      className="grid grid-cols-1 gap-2 "
    >
      <RadioGroup.Option value="U">
        {(
          {
            //checked
            //checked = valueGrade === 'U' ? true : false,
          }
        ) => (
          <span
            className={` flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid p-2 text-center text-xs font-medium uppercase tracking-wide transition-all ${
              checkedU
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            <Image
              src="/images/grade-u.png"
              alt="Grade U"
              width={15}
              height={15}
            />
            &nbsp; Grade U
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="S">
        {(
          {
            //checked = valueGrade === 'S' ? true : false,
          }
        ) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-xs font-medium uppercase tracking-wide transition-all ${
              checkedS
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            <Image
              src="/images/grade-s.png"
              alt="Grade S"
              width={15}
              height={15}
            />
            &nbsp; Grade S
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="A">
        {(
          {
            //checked
          }
        ) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-xs font-medium uppercase tracking-wide transition-all ${
              checkedA
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            <Image
              src="/images/grade-a.png"
              alt="Grade A"
              width={15}
              height={15}
            />
            &nbsp; Grade A
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="B">
        {(
          {
            //checked = valueGrade === 'B' ? true : false,
          }
        ) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-xs font-medium uppercase tracking-wide transition-all ${
              checkedB
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            <Image
              src="/images/grade-b.png"
              alt="Grade B"
              width={15}
              height={15}
            />
            &nbsp; Grade B
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="C">
        {(
          {
            ///checked = valueGrade === 'C' ? true : false,
          }
        ) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-xs font-medium uppercase tracking-wide transition-all ${
              checkedC
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            <Image
              src="/images/grade-c.png"
              alt="Grade C"
              width={15}
              height={15}
            />
            &nbsp; Grade C
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="D">
        {(
          {
            //const check = valueGrade === 'D' ? true : false,
            ///var check = false;
            ////var check = valueGrade === 'D' ? true : false
          }
        ) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-xs font-medium uppercase tracking-wide transition-all ${
              checkedD
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            <Image
              src="/images/grade-d.png"
              alt="Grade D"
              width={15}
              height={15}
            />
            &nbsp; Grade D
          </span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
}

interface RadioOptionProps {
  value: string;
}

function RadioGroupOption({ value }: RadioOptionProps) {
  return (
    <RadioGroup.Option value={value}>
      {({ checked }) => (
        <span
          className={`relative flex h-8 cursor-pointer items-center justify-center rounded-lg px-3 text-sm uppercase tracking-wider ${
            checked ? 'text-white' : 'text-brand dark:text-gray-400'
          }`}
        >
          {checked && (
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-brand shadow-large"
              layoutId="statusIndicator"
            />
          )}
          <span className="relative flex items-center leading-none">
            {value}
          </span>
        </span>
      )}
    </RadioGroup.Option>
  );
}

const currency = [
  { id: 1, name: 'USD' },
  { id: 2, name: 'CAD' },
  { id: 3, name: 'BTC' },
];

interface NftDrawerProps {
  tokenid: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function NftSinglePrice({
  tokenid,
  isOpen,
  setIsOpen,
}: NftDrawerProps) {
  //console.log("NftSinglePrice tokenid", tokenid);

  const [price, setPrice] = useState(6.2);
  const [date, setDate] = useState(1624147200);
  const [status, setStatus] = useState('Month');
  const [chartData, setChartData] = useState(monthlyComparison);
  const [priceDiff, setPriceDiff] = useState(-1.107);
  const [percentage, setPercentage] = useState('2.22%');
  const [toggleCoin, setToggleCoin] = useState(false);
  const [selected, setSelected] = useState(currency[0]);
  const formattedDate = format(new Date(date * 1000), 'MMMM d, yyyy hh:mma');
  const { layout } = useLayout();

  const address = useAddress();

  const { contract } = useContract(nftDropContractAddressHorse, 'nft-drop');

  const { data: nftMetadata, isLoading: isLoadingUseNFT } = useNFT(
    contract,
    tokenid
  );

  ///console.log('nft.metadata.name', nft?.metadata.name);

  const { contract: contractStaking, isLoading: isLoadingStaking } =
    useContract(stakingContractAddressHorseAAA);

  const { data: stakerAddress, isLoading } = useContractRead(
    contractStaking,
    'stakerAddress',
    [tokenid]
  );

  ///console.log('stakerAddress', stakerAddress);

  const handleOnChange = (value: string) => {
    setStatus(value);
    switch (value) {
      case 'Week':
        setChartData(weeklyComparison);
        break;
      case 'Month':
        setChartData(monthlyComparison);
        break;
      case 'Year':
        setChartData(yearlyComparison);
        break;
      default:
        setChartData(monthlyComparison);
        break;
    }
  };

  const { openModal } = useModal();

  const [attributeGrade, setAttributeGrade] = useState(null);
  const [attributeSize, setAttributeSize] = useState(null);
  const [attributeSpped, setAttributeSpeed] = useState(null);
  const [attributeStamina, setAttributeStamina] = useState(null);
  const [attributePower, setAttributePower] = useState(null);

  useEffect(() => {
    nftMetadata?.metadata?.attributes?.map((attribute: any) => {
      if (attribute.trait_type === 'Grade') {
        setAttributeGrade(attribute.value);
      }
      if (attribute.trait_type === 'Size') {
        setAttributeSize(attribute.value);
      }
      if (attribute.trait_type === 'Speed') {
        setAttributeSpeed(attribute.value);

        //console.log('attributeSpeed', attribute.value);
      }
      if (attribute.trait_type === 'Stamina') {
        setAttributeStamina(attribute.value);
      }
      if (attribute.trait_type === 'Power') {
        setAttributePower(attribute.value);
      }
    });
  }, [nftMetadata?.metadata?.attributes]);

  const [indexPriceFeedData, setIndexPriceFeedData] = useState(0);

  useEffect(() => {
    const grade = nftMetadata?.metadata?.attributes?.map((attribute: any) => {
      ///console.log('attribute', attribute);
      if (attribute.trait_type === 'Grade') {
        console.log('attribute.value', attribute.value);

        return attribute.value;
      }
    });

    if (grade === 'S') {
      setIndexPriceFeedData(0);
    } else if (grade === 'U') {
      setIndexPriceFeedData(1);
    } else if (grade === 'A') {
      setIndexPriceFeedData(2);
    } else if (grade === 'B') {
      setIndexPriceFeedData(3);
    } else if (grade === 'C') {
      setIndexPriceFeedData(4);
    } else if (grade === 'D') {
      setIndexPriceFeedData(5);
    }

    console.log('indexPriceFeedData', indexPriceFeedData);
  }, [nftMetadata?.metadata?.attributes]);

  const [raceHistory, setRaceHistory] = useState([]);

  const getLast20 = async () => {
    setRaceHistory([]);

    const response = await fetch('/api/games/horseRace/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'getAllByTokenId',
        tokenId: nftMetadata?.metadata?.id,
      }),
    });
    const data = await response.json();
    ///setLast20Game(data.all);

    ///console.log('data.all: ', data.all);

    const raceHistoryData = [] as any;

    data?.all?.map((item: any) => {
      const placements =
        '#' +
        item.placements[0]?.nft?.tokenId +
        ' #' +
        item.placements[1]?.nft?.tokenId +
        ' #' +
        item.placements[2]?.nft?.tokenId +
        ' #' +
        item.placements[3]?.nft?.tokenId +
        ' #' +
        item.placements[4]?.nft?.tokenId +
        ' #' +
        item.placements[5]?.nft?.tokenId +
        ' #' +
        item.placements[6]?.nft?.tokenId +
        ' #' +
        item.placements[7]?.nft?.tokenId +
        ' #' +
        item.placements[8]?.nft?.tokenId +
        ' #' +
        item.placements[9]?.nft?.tokenId;

      var line = '';

      item.placements.map((placement: any) => {
        if (placement.nft?.tokenId == nftMetadata?.metadata?.id) {
          line = placement.line;
          return;
        }
      });

      const raceData = {
        id: item._id.substring(0, 6),
        //transactionType: transfer.from === address ? 'Send' : 'Receive',
        transactionType: item.nft?.title,
        createdAt: item.date,

        //address: transfer.from === address ? transfer.to : transfer.from,
        placements: placements,

        amount: {
          balance: item.nft?.tokenId,
          usdBalance: '11,032.24',
        },
        rank: line,
      };

      //console.log('raceData: ', raceData);

      ////setTransers((transfers) => [...transfers, transactionData]);

      raceHistoryData.push(raceData);
    });

    setRaceHistory(raceHistoryData);
  };

  useEffect(() => {
    getLast20();
  }, [nftMetadata?.metadata?.id]);

  return (
    <div className="h-full rounded-lg  bg-white shadow-card dark:bg-light-dark ">
      <div className=" flex flex-col items-center justify-between  gap-2 p-2 lg:flex-row ">
        <div className="flex w-full flex-wrap items-center gap-3 text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 sm:text-base ">
          <span className="flex w-full items-center  gap-2.5  ">
            <span className="items-left flex w-full flex-col  gap-2.5 ">
              <div className="items-left flex w-full flex-col justify-center ">
                <div className="flex flex-col items-center justify-start gap-2.5">
                  <div className="flex w-full flex-row items-center justify-start ">
                    <Image
                      src="/images/logo-gd.png"
                      alt="gd"
                      width={18}
                      height={18}
                    />

                    <span className="ml-2 text-left text-lg font-bold text-black dark:text-white xl:text-xl">
                      #{nftMetadata?.metadata?.id}
                    </span>
                  </div>

                  <div className="flex w-full flex-row items-center justify-start gap-2.5 underline decoration-sky-500">
                    {/*attributeGrade && (
                        <Image
                          src={`/images/grade-${attributeGrade?.toLowerCase()}.png`}
                          alt="Grade"
                          width={30}
                          height={30}
                        />
                      )*/}
                    <div className="text-left text-2xl font-bold capitalize text-black dark:text-white xl:text-3xl">
                      {nftMetadata?.metadata?.name}
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-start gap-2.5">
                    <div className="flex flex-row items-center justify-start gap-2.5">
                      <span className="text-xs">Speed:</span>
                      {attributeSpped && (
                        <div className="text-left text-xl capitalize  text-red-600 dark:text-white">
                          {attributeSpped}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row items-center justify-start gap-2.5">
                      <span className="text-xs">Stamina:</span>
                      {attributeStamina && (
                        <div className="text-left text-xl capitalize  text-green-600 dark:text-white">
                          {attributeStamina}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row items-center justify-start gap-2.5">
                      <span className="text-xs">Power:</span>
                      {attributePower && (
                        <div className="text-left text-xl capitalize  text-blue-600 dark:text-white">
                          {attributePower}
                        </div>
                      )}
                    </div>
                  </div>

                  {/*
                      <Button
                        size="small"
                        shape="rounded"
                        variant="solid"
                        color="gray"
                        className="dark:bg-gray-800"
                        onClick={() => openModal('SHARE_VIEW')}
                      >
                        SHARE
                      </Button>
                      */}
                </div>

                {/* registered in */}
                <div className="mt-2 flex flex-col items-center justify-center gap-2 rounded-lg   p-2 ">
                  {isLoadingStaking ? (
                    <div className=" flex flex-col items-center justify-center gap-5">
                      <div className="text-xl font-bold xl:text-2xl">
                        <b>Loading register...</b>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="">
                        {stakerAddress &&
                          stakerAddress ===
                            '0x0000000000000000000000000000000000000000' && (
                            <div className="mt-2 flex flex-row items-center gap-4 ">
                              <div className="text-sm font-bold xl:text-lg">
                                <b>Not registered </b>
                              </div>
                            </div>
                          )}

                        {stakerAddress &&
                          stakerAddress !==
                            '0x0000000000000000000000000000000000000000' && (
                            <div className=" flex items-center justify-start gap-2 ">
                              <div className="flex text-sm tracking-wider text-[#6B7280]">
                                Registered in
                              </div>
                              {/*
                              <div className=" rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
                                <span>
                                  {stakingContractAddressHorseAAA?.substring(
                                    0,
                                    6
                                  )}
                                  ...
                                </span>
                              </div>
                              */}
                              <Image
                                src="/images/inkent.jpeg"
                                alt="raceTrack"
                                width={35}
                                height={50}
                              />

                              {/*
                                <div className="flex flex-col text-xs">
                                  <span>1.8 GRD</span>
                                  <span>per Hour</span>
                                </div>
                                */}

                              {/*
                            <AnchorLink
                              href={`/horse-details/${nftMetadata?.metadata?.id}`}
                              className="inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white "
                            >
                              on {nftMetadata?.metadata?.mintedDate}
                              <ArrowLinkIcon className="h-3 w-3 ltr:ml-2 rtl:mr-2" />
                            </AnchorLink>
                              */}
                            </div>
                          )}
                      </div>

                      <div className="mb-3 flex flex-row">
                        {raceHistory && raceHistory.length === 0 ? (
                          <div>
                            <div className="text-sm font-bold xl:text-lg">
                              <b>No record </b>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-row items-center justify-center">
                              <div className="text-6xl font-bold  text-red-600 ">
                                {raceHistory[0]?.rank}{' '}
                              </div>

                              <div className="m-5 flex flex-col gap-1">
                                <div className=" text-xs  ">Last rank</div>
                                <div className="text-xs">
                                  {format(
                                    Date.parse(raceHistory[0]?.createdAt || 0),
                                    'yyy-MM-dd hh:mm:ss'
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="m-2 flex flex-row items-center justify-center">
                              <div className="ml-2 flex flex-row items-center justify-center gap-1 ">
                                <div className="text-3xl font-bold  text-green-600 ">
                                  {raceHistory[4]?.rank}
                                </div>
                                <ArrowRight className="m-2 h-2 w-2 " />
                                <div className="text-3xl font-bold  text-green-600 ">
                                  {raceHistory[3]?.rank}
                                </div>
                                <ArrowRight className="m-2 h-2 w-2 " />
                                <div className="text-3xl font-bold  text-green-600 ">
                                  {raceHistory[2]?.rank}
                                </div>
                                <ArrowRight className="m-2 h-2 w-2 " />
                                <div className="text-3xl font-bold  text-green-600 ">
                                  {raceHistory[1]?.rank}
                                </div>
                                <ArrowRight className="m-2 h-2 w-2 " />
                                <div className="text-3xl font-bold  text-green-600 ">
                                  {raceHistory[0]?.rank}
                                </div>{' '}
                                {raceHistory[0]?.rank >
                                  raceHistory[1]?.rank && (
                                  <LongArrowUp className=" h-8 w-8 rotate-180  text-red-600 " />
                                )}
                                {raceHistory[0]?.rank <
                                  raceHistory[1]?.rank && (
                                  <LongArrowUp className="h-8 w-8  text-sky-600 " />
                                )}
                                {raceHistory[0]?.rank ===
                                  raceHistory[1]?.rank && (
                                  <ArrowRight className="h-5 w-5  text-gray-600 " />
                                )}
                              </div>
                            </div>

                            <div className="text-xs ">
                              Next entery:&nbsp;
                              <span className="text-xs">
                                {/*raceHistory[0].createdAt*/}Not reserved
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* owned by */}
                <div className="mt-5 flex flex-row items-center justify-center gap-4 ">
                  <div className="flex w-28 flex-wrap  text-xs tracking-wider text-[#6B7280]">
                    Owned by
                  </div>
                  <div className="flex flex-col rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-xs font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
                    {stakerAddress &&
                    stakerAddress ===
                      '0x0000000000000000000000000000000000000000' ? (
                      <>
                        {nftMetadata?.owner === address ? (
                          <div className="text-xl font-bold text-blue-600">
                            Me
                          </div>
                        ) : (
                          <span>{nftMetadata?.owner?.substring(0, 10)}...</span>
                        )}
                      </>
                    ) : (
                      <>
                        {stakerAddress && stakerAddress === address ? (
                          <div className="text-xl font-bold text-blue-600">
                            Me
                          </div>
                        ) : (
                          <span>{stakerAddress?.substring(0, 10)}...</span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex w-full flex-col items-center">
                  <div className="flex flex-row items-center gap-4 ">
                    <Image
                      //src="https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/hrs/Hrs_00000000.png"
                      src={
                        nftMetadata?.metadata?.image
                          ? nftMetadata?.metadata?.image
                          : '/default-nft.png'
                      }
                      alt="nft"
                      width={180}
                      height={180}
                      className=" rounded-lg "
                    />

                    <Grade grade={attributeGrade} />
                  </div>

                  <div className="mt-5 flex w-full items-center ">
                    <Collapse label="Race History" initialOpen={true}>
                      <RaceHistoryTable tokenId={nftMetadata?.metadata?.id} />
                    </Collapse>
                  </div>
                </div>
              </div>

              {/*
                  <LivePricingFeed {...priceFeedData[indexPriceFeedData]} />
                  */}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
