import { useState, Fragment, useEffect } from 'react';
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

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
  marketplaceContractAddress,
  tokenContractAddressUSDC,
} from '@/config/contractAddresses';

import {
  useAddress,
  ThirdwebNftMedia,
  useContract,
  useNFT,
  Web3Button,
  useContractRead,
  useValidDirectListings,
  useTokenBalance,
  useNetworkMismatch,
  useNetwork,
  ChainId,
} from '@thirdweb-dev/react';
import { set } from 'lodash';

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

function Grade(grade: any) {
  var valueGrade = '';

  if (grade?.grade?.length > 35) {
    console.log('Grade grade.grade[35]====', grade?.grade[35]);

    valueGrade = grade?.grade[35];
  }

  var checkedS = false;
  var checkedU = false;
  var checkedA = false;
  var checkedB = false;
  var checkedC = false;
  var checkedD = false;

  if (valueGrade === 'S') {
    checkedS = true;
  } else if (valueGrade === 'U') {
    checkedU = true;
  } else if (valueGrade === 'A') {
    checkedA = true;
  } else if (valueGrade === 'B') {
    checkedB = true;
  } else if (valueGrade === 'C') {
    checkedC = true;
  } else if (valueGrade === 'D') {
    checkedD = true;
  }

  return (
    <RadioGroup
      value={grade}
      //onChange={setGrade}
      className="grid grid-cols-2 gap-2 p-5"
    >
      <RadioGroup.Option value="U">
        {(
          {
            //checked
            //checked = valueGrade === 'U' ? true : false,
          }
        ) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
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
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
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
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
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
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
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
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
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
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
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

export default function NftSinglePrice({
  tokenid,
  isOpen,
  setIsOpen,
}: NftDrawerProps) {
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

  const { contract: nftDropContract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );

  const { data: nft } = useNFT(nftDropContract, tokenid);

  //console.log('nft', nft);

  ///const attributes: any = nft?.metadata?.attributes;

  const [attributeGrade, setAttributeGrade] = useState(null);

  useEffect(() => {
    const grade = nft?.metadata?.attributes?.map((attribute: any) => {
      ///console.log('attribute', attribute);
      if (attribute.trait_type === 'Grade') {
        console.log('attribute.value', attribute.value);

        return attribute.value;
      }
    });

    setAttributeGrade(grade);
  }, [nft?.metadata?.attributes]);

  const { contract: contractStaking, isLoading: isLoadingContractStaking } =
    useContract(stakingContractAddressHorseAAA);

  const { data: stakerAddress, isLoading } = useContractRead(
    contractStaking,
    'stakerAddress',
    [tokenid]
  );

  console.log('stakerAddress', stakerAddress);

  const { contract: marketplace } = useContract(
    marketplaceContractAddress,
    'marketplace-v3'
  );

  const {
    data: directListings,
    isLoading: loadingListings,
    error,
  } = useValidDirectListings(marketplace);

  console.log('nft-single-price directListings======>', directListings);

  const [directListing, setDirectListing] = useState<any>(null);

  useEffect(() => {
    setDirectListing(null);

    if (directListings) {
      directListings.map((listing: any) => {
        if (listing.tokenId === tokenid) {
          //setListingId(listing.id);

          setDirectListing(listing);

          console.log('nft-single-price listing', listing);

          return;
        }
      });
    }
  }, [directListings, tokenid]);

  const { contract: tokenContractUSDC } = useContract(
    tokenContractAddressUSDC,
    'token'
  );
  const { data: tokenBalanceUSDC, isLoading: isLoadingTokenBalanceUSDC } =
    useTokenBalance(tokenContractUSDC, address);

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

  async function stakeNft(id: string) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddressHorseAAA
    );

    console.log('isApproved', isApproved);

    if (!isApproved) {
      const data = await nftDropContract?.setApprovalForAll(
        stakingContractAddressHorseAAA,
        true
      );

      alert(data);
    }

    const data = await contractStaking?.call('stake', [[id]]);

    console.log('staking data=====', data);

    if (data) {
      alert('Your horse has been registered successfully');
      /*
      setSuccessMsgSnackbar('Your request has been sent successfully');
      handleClickSucc();
      */
    } else {
      alert(data);
      /*
      setErrMsgSnackbar(data);
      handleClickErr();
      */
    }
  }

  // Hooks to detect user is on the right network and switch them if they are not
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  async function buyNft() {
    try {
      // Ensure user is on the correct network

      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Polygon);
        return;
      }

      // Simple one-liner for buying the NFT
      /*
        await marketplace?.buyFromListing(listingId.listingId, 1);
        */

      // The ID of the listing you want to buy from
      //const listingId = 0;
      // Quantity of the asset you want to buy
      const quantityDesired = 1;

      await marketplace?.directListings?.buyFromListing(
        directListing?.listingId,
        quantityDesired,
        address
      );

      alert('NFT bought successfully!');
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div className="h-full rounded-lg  bg-white p-4 shadow-card dark:bg-light-dark sm:p-6 md:p-8">
      {layout === LAYOUT_OPTIONS.RETRO ? (
        <div>
          <div className="flex justify-between gap-4 sm:gap-8 md:items-start lg:flex-row lg:items-center lg:gap-4">
            <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 sm:text-base">
              <span className="flex items-center gap-2.5">
                <span className="flex flex-row items-center gap-2.5">
                  {/*
                  <Bitcoin className="h-auto w-7 lg:w-9" />
                  */}

                  <div className="text-xl font-medium capitalize text-brand dark:text-white">
                    {nft?.metadata?.name}
                  </div>

                  <Image
                    src={
                      nft?.metadata?.image
                        ? nft?.metadata?.image
                        : '/default-nft.png'
                    }
                    //src="https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/hrs/Hrs_00000000.png"

                    ///src={nft?.image}
                    alt="nft"
                    width={500}
                    height={500}
                    ///className="h-auto w-100 lg:w-200"
                  />
                </span>

                <span className="flex items-end text-xl font-medium capitalize text-brand dark:text-white">
                  {nft?.metadata?.name}
                </span>
                {/*
                <span className="text-sm text-gray-400">(BTC/USD)</span>
                */}
              </span>

              {/*
              <span className="flex flex-wrap items-center gap-[5px]">
                <span className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium leading-none text-brand dark:!bg-gray-700 dark:text-white">
                  RANK #5
                </span>
                <span className="w-[65px]">
                  <Listbox value={selected} onChange={setSelected}>
                    <div className="relative rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-brand rtl:text-left dark:bg-gray-700 dark:text-white">
                      <Listbox.Button className="rounded-lg bg-gray-100 text-sm font-medium text-brand dark:bg-gray-700 dark:text-white">
                        <span className="block truncate">{selected.name}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronDown
                            className="h-[10px] w-[12px] text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute left-0 mt-3 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-large focus:outline-none dark:!bg-gray-700 sm:text-sm">
                          {currency.map((item) => (
                            <Listbox.Option
                              key={item.id}
                              className={({ active }) =>
                                `relative cursor-pointer select-none px-4 py-2 transition-all ${
                                  active
                                    ? 'bg-gray-100 text-brand hover:bg-gray-200 dark:bg-gray-700 dark:text-white hover:dark:bg-slate-600'
                                    : 'text-gray-900 dark:text-white'
                                }`
                              }
                              value={item}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {item.name}
                                  </span>
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </span>
              </span>
              */}
            </div>

            <div
              className="relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white text-brand shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none dark:border-gray-700 dark:bg-light-dark dark:text-white"
              onClick={() => setIsOpen(true)}
            >
              <InfoCircle className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-5 flex flex-col items-start justify-between gap-8 lg:flex-row lg:gap-4">
            <div>
              <div className="flex items-end gap-3 text-base font-medium text-gray-900 dark:text-white sm:text-xl lg:flex-wrap 2xl:flex-nowrap">
                <span className="text-2xl font-semibold xl:text-3xl">
                  {price}
                </span>
                <span
                  className={cn(
                    'flex items-end',
                    toggleCoin ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  <span>BTCB</span>/<span>ETH</span>
                </span>

                <span
                  className={cn(
                    'mb-1 flex items-center text-xs sm:mb-0 sm:text-base',
                    priceDiff > 0 ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  <span
                    className={`inline-flex ltr:mr-2 rtl:ml-2 ${
                      priceDiff > 0 ? '' : 'rotate-180'
                    }`}
                  >
                    <ArrowUp />
                  </span>
                  {priceDiff} ({percentage})
                </span>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 sm:text-sm">
                <Refresh /> {formattedDate}
              </div>
            </div>
            <RadioGroup
              value={status}
              onChange={handleOnChange}
              className="mt-2 flex items-center gap-5"
            >
              <RadioGroupOption value="Week" />
              <RadioGroupOption value="Month" />
              <RadioGroupOption value="Year" />
            </RadioGroup>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col justify-between gap-2 md:items-start lg:flex-row lg:items-center lg:gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 sm:text-base">
              <span className="flex items-center gap-2.5">
                <span className="items-left flex flex-col gap-2.5 ">
                  <div className="items-left flex flex-col justify-center ">
                    <Link
                      className=" text-left text-lg capitalize text-blue-500 dark:text-white "
                      href={`/horse`}
                    >
                      Granderby Horse NFT
                    </Link>

                    <div className="text-left text-xl font-bold capitalize text-black dark:text-white xl:text-2xl">
                      #{nft?.metadata?.id} {nft?.metadata?.name}
                    </div>

                    {/* owned by */}
                    <div className="mt-5 flex items-center gap-4 ">
                      <div className="w-[140px] text-sm tracking-wider text-[#6B7280]">
                        Owned by
                      </div>
                      <div className="rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
                        {stakerAddress &&
                        stakerAddress ===
                          '0x0000000000000000000000000000000000000000' ? (
                          <>
                            {nft?.owner === address ? (
                              <div className="text-xl font-bold text-blue-600">
                                Me
                              </div>
                            ) : (
                              <span>{nft?.owner?.substring(0, 10)}...</span>
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

                      {stakerAddress &&
                        stakerAddress ===
                          '0x0000000000000000000000000000000000000000' &&
                        nft?.owner === address && (
                          <div className="mt-2 ">
                            <Web3Button
                              theme="light"
                              contractAddress={stakingContractAddressHorseAAA}
                              action={() => stakeNft(nft?.metadata?.id || '')}
                            >
                              Register
                            </Web3Button>
                          </div>
                        )}

                      {stakerAddress !==
                        '0x0000000000000000000000000000000000000000' && <></>}

                      {stakerAddress && stakerAddress === address && (
                        <div className="mt-2 ">
                          <Web3Button
                            theme="light"
                            action={(contract) =>
                              contract?.call('withdraw', [[nft?.metadata?.id]])
                            }
                            contractAddress={stakingContractAddressHorseAAA}
                          >
                            Unregister
                          </Web3Button>
                        </div>
                      )}
                    </div>

                    {/* registered by */}
                    {stakerAddress &&
                      stakerAddress ===
                        '0x0000000000000000000000000000000000000000' && (
                        <div className="mt-2 flex items-center gap-4 ">
                          <div className="w-[140px] text-sm tracking-wider text-[#6B7280]">
                            Not registered
                          </div>
                        </div>
                      )}

                    {stakerAddress &&
                      stakerAddress !==
                        '0x0000000000000000000000000000000000000000' && (
                        <div className="mt-2 flex items-center gap-4 ">
                          <div className="w-[140px] text-sm tracking-wider text-[#6B7280]">
                            Registered by
                          </div>
                          <div className="rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
                            <span>
                              {stakingContractAddressHorseAAA?.substring(0, 10)}
                              ...
                            </span>
                          </div>
                        </div>
                      )}
                  </div>

                  {!directListing || directListing.quantity === '0' ? (
                    <div className="m-3 flex flex-row  items-center justify-center gap-5">
                      <div className="text-xl font-bold xl:text-2xl">
                        <b>Not for sale </b>
                      </div>
                    </div>
                  ) : (
                    <div className="m-3 flex flex-col items-center justify-center gap-5  rounded-lg border p-5 ">
                      <div className="text-xl font-bold xl:text-2xl">
                        {/*
                          <b>{directListing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                          {directListing.buyoutCurrencyValuePerToken.symbol}
                              */}
                        <span>Sell Price:&nbsp;</span>
                        <b>
                          {directListing?.currencyValuePerToken.displayValue}
                        </b>{' '}
                        {directListing?.currencyValuePerToken.symbol}
                      </div>
                      <div className="text-sm font-bold xl:text-lg">
                        Last price:&nbsp;
                        {directListing?.currencyValuePerToken.displayValue -
                          6}{' '}
                        {directListing?.currencyValuePerToken.symbol}
                      </div>

                      {address && address === nft?.owner && (
                        <Web3Button
                          theme="light"
                          action={(contract) =>
                            //contract?.call('withdraw', [[nft?.metadata?.id]])
                            //contract?.call('cancel', [[directListing?.id]])

                            contract?.directListings.cancelListing(
                              directListing?.id
                            )
                          }
                          contractAddress={marketplaceContractAddress}
                        >
                          <span className="flex items-center gap-2">
                            {/*<InfoIcon className="h-3 w-3" /> */} Cancel Sale
                          </span>
                        </Web3Button>
                      )}

                      {address && address !== nft?.owner && (
                        <>
                          <div className="text-sm font-bold xl:text-xl">
                            <Web3Button
                              theme="light"
                              action={(contract) =>
                                //contract?.call('withdraw', [[nftMetadata?.tokenId]])
                                buyNft()
                              }
                              contractAddress={marketplaceContractAddress}
                            >
                              <span className="flex items-center gap-2">
                                {/*<InfoIcon className="h-3 w-3" /> */} Buy
                              </span>
                            </Web3Button>
                            {!address && (
                              <span className="text-sm font-bold xl:text-xl">
                                &nbsp;&nbsp;for Buy Now
                              </span>
                            )}
                          </div>

                          <div className=" flex flex-row items-center justify-center  gap-2">
                            <span className="text-md  xl:text-xl">
                              My Balance:
                            </span>

                            {isLoadingTokenBalanceUSDC && (
                              <div className=" text-md  xl:text-xl">
                                Loading...
                              </div>
                            )}
                            <div className="text-md  xl:text-xl">
                              {tokenBalanceUSDC?.displayValue}{' '}
                              {tokenBalanceUSDC?.symbol}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  <Image
                    //src="https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/hrs/Hrs_00000000.png"
                    src={
                      nft?.metadata?.image
                        ? nft?.metadata?.image
                        : '/default-nft.png'
                    }
                    alt="nft"
                    width={1024}
                    height={1024}
                    className=" rounded-lg "
                  />
                </span>
              </span>
            </div>

            <Collapse label="Grade" initialOpen={true}>
              <Grade
                grade={
                  /*
                  nft?.metadata?.attributes?.map((attribute: any) => {
                    ///console.log('attribute', attribute);
                    if (attribute.trait_type === 'Grade') {
                      
                      console.log('attribute.value', attribute.value);

                      return attribute.value;
                    }
                  })
                  */

                  attributeGrade
                }
              />
            </Collapse>

            {/* nft attributes details */}
            {/*
            <div className="mt-5 grid  grid-cols-3 items-start justify-between gap-2  ">
              {attributes?.map((attribute: any) => (
                //nft?.metadata?.attributes?.map((attribute:any) => (
                <div key={attribute?.trait_type}>
                  <div
                    className=" flex flex-col items-center gap-3 rounded-md bg-gray-100 p-3 text-sm font-medium text-gray-900 dark:text-white
                   lg:flex-wrap xl:text-lg 2xl:flex-nowrap  "
                  >
                    <span
                      className={cn(
                        'flex ',
                        toggleCoin ? 'flex-row-reverse' : 'flex-row'
                      )}
                    >
                      <span>{attribute?.trait_type}</span>
                    </span>

                    <span className="text-sm  font-semibold xl:text-lg">
                      {attribute?.value?.toString().length < 8
                        ? attribute?.value?.toString()
                        : attribute?.value?.toString().substring(0, 8)}
                      ...
                    </span>
                  </div>
                </div>
              ))}
            </div>
            */}

            {/*
            <div className="mt-5 flex items-end gap-3 text-base font-medium text-gray-900 dark:text-white sm:text-xl lg:flex-wrap 2xl:flex-nowrap">
              <span className="text-2xl font-semibold xl:text-3xl">
                {price}
              </span>

              <span
                className={cn(
                  'flex items-end',
                  toggleCoin ? 'flex-row-reverse' : 'flex-row'
                )}
              >

              </span>

              <span
                className={cn(
                  'mb-1 flex items-center text-xs sm:mb-0 sm:text-base',
                  priceDiff > 0 ? 'text-green-500' : 'text-red-500'
                )}
              >
                <span
                  className={`inline-flex ltr:mr-2 rtl:ml-2 ${
                    priceDiff > 0 ? '' : 'rotate-180'
                  }`}
                >
                  <ArrowUp />
                </span>
                {priceDiff} ({percentage})
              </span>
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 sm:text-sm">
              <Refresh /> {formattedDate}
            </div>

            */}
          </div>

          {/*
          <RadioGroup
            value={status}
            onChange={handleOnChange}
            className="flex items-center gap-5"
          >
            <RadioGroupOption value="Week" />
            <RadioGroupOption value="Month" />
            <RadioGroupOption value="Year" />
          </RadioGroup>
          */}
        </div>
      )}

      {/*
      <div className="py-4">
        <h5 className="pb-5 pt-6 text-base font-medium uppercase">
          Market Stats
        </h5>
        <div className="grid grid-cols-2 gap-7 lg:grid-cols-3 lg:gap-11 3xl:grid-cols-4">
          <div>
            <div className="flex items-center gap-1">
              <div className="text-xs uppercase text-gray-600 dark:text-gray-400 lg:text-sm">
                Market Cap
              </div>
              <Tippy
                content={<PopoverContent />}
                animation="shift-away"
                arrow={true}
              >
                <div>
                  <Tag />
                </div>
              </Tippy>
            </div>
            <h4 className="text-base font-medium text-black dark:text-white lg:text-xl">
              $348.0B
            </h4>
            <span className="block text-xs text-gray-600 dark:text-gray-400 lg:text-sm">
              35% of crypto market
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <div className="text-xs uppercase text-gray-600 dark:text-gray-400 lg:text-sm">
                Volume (24H)
              </div>
              <Tippy
                content={<PopoverContent />}
                animation="shift-away"
                arrow={true}
              >
                <div>
                  <Tag />
                </div>
              </Tippy>
            </div>
            <h4 className="text-base font-medium text-black dark:text-white lg:text-xl">
              $23.5B
            </h4>
            <span className="flex items-center text-xs text-green-500 lg:text-sm">
              <LongArrowUp className="h-4 w-4" /> +12.5%
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <div className="text-xs uppercase text-gray-600 dark:text-gray-400 lg:text-sm">
                Circulating Supply
              </div>
              <Tippy
                content={<PopoverContent />}
                animation="shift-away"
                arrow={true}
              >
                <div>
                  <Tag />
                </div>
              </Tippy>
            </div>
            <h4 className="text-base font-medium text-black dark:text-white lg:text-xl">
              19.1M BTC
            </h4>
            <span className="block text-xs text-gray-600 dark:text-gray-400 lg:text-sm">
              91% of total supply
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <div className="text-xs uppercase text-gray-600 dark:text-gray-400 lg:text-sm">
                Typical Hold Time
              </div>
              <Tippy
                content={<PopoverContent />}
                animation="shift-away"
                arrow={true}
              >
                <div>
                  <Tag />
                </div>
              </Tippy>
            </div>
            <h4 className="text-base font-medium text-black dark:text-white lg:text-xl">
              126 Days
            </h4>
          </div>
          <div className="col-span-2">
            <div className="flex items-center gap-1">
              <div className="text-xs uppercase text-gray-600 dark:text-gray-400 lg:text-sm">
                Trending Activity
              </div>
              <Tippy
                content={<PopoverContent />}
                animation="shift-away"
                arrow={true}
              >
                <div>
                  <Tag />
                </div>
              </Tippy>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <span className="shrink-0 grow-0 basis-auto text-xs text-green-500 lg:text-sm">
                85% Buy
              </span>
              <Progressbar
                color="DEFAULT"
                value={85}
                barClassName="!bg-green-500"
                className="!h-1.5 w-full max-w-[230px]"
              />
              <span className="shrink-0 grow-0 basis-auto text-xs text-gray-600 dark:text-gray-400 lg:text-sm">
                7% Buy
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <div className="text-xs uppercase text-gray-600 dark:text-gray-400 lg:text-sm">
                Volume / Market Cap
              </div>
              <Tippy
                content={<PopoverContent />}
                animation="shift-away"
                arrow={true}
              >
                <div>
                  <Tag />
                </div>
              </Tippy>
            </div>
            <h4 className="text-base font-medium text-black dark:text-white lg:text-xl">
              0.02972
            </h4>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <div className="text-xs uppercase text-gray-600 dark:text-gray-400 lg:text-sm">
                Popularity
              </div>
              <Tippy
                content={<PopoverContent />}
                animation="shift-away"
                arrow={true}
              >
                <div>
                  <Tag />
                </div>
              </Tippy>
            </div>
            <h4 className="text-base font-medium text-black dark:text-white lg:text-xl">
              #1
            </h4>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <div className="text-xs uppercase text-gray-600 dark:text-gray-400 lg:text-sm">
                All time high
              </div>
              <Tippy
                content={<PopoverContent />}
                animation="shift-away"
                arrow={true}
              >
                <div>
                  <Tag />
                </div>
              </Tippy>
            </div>
            <h4 className="text-base font-medium text-black dark:text-white lg:text-xl">
              $68,789.63
            </h4>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <div className="text-xs uppercase text-gray-600 dark:text-gray-400 lg:text-sm">
                Price Change (1H)
              </div>
              <Tippy
                content={<PopoverContent />}
                animation="shift-away"
                arrow={true}
              >
                <div>
                  <Tag />
                </div>
              </Tippy>
            </div>
            <span className="flex items-center text-xs text-green-500 lg:text-sm">
              <LongArrowUp className="h-4 w-4" /> +12.5%
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <div className="text-xs uppercase text-gray-600 dark:text-gray-400 lg:text-sm">
                Price Change (24H)
              </div>
              <Tippy
                content={<PopoverContent />}
                animation="shift-away"
                arrow={true}
              >
                <div>
                  <Tag />
                </div>
              </Tippy>
            </div>
            <span className="flex items-center text-xs text-red-500 lg:text-sm">
              <LongArrowUp className="h-4 w-4" /> -0.63%
            </span>
          </div>
        </div>
      </div>

      */}
    </div>
  );
}
