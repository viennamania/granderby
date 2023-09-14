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
import Slider from 'rc-slider';
import {
  weeklyComparison,
  monthlyComparison,
  yearlyComparison,
} from '@/data/static/price-history';
import { Tag } from '@/components/icons/tag';

import { LongArrowUp } from '@/components/icons/long-arrow-up';
import { ArrowUp } from '@/components/icons/arrow-up';

import { ArrowRight } from '@/components/icons/arrow-right';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import { LongArrowLeft } from '@/components/icons/long-arrow-left';
import { LinkIcon } from '@/components/icons/link-icon';
import { ArrowLinkIcon } from '@/components/icons/arrow-link-icon';
import AnchorLink from '@/components/ui/links/anchor-link';

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

import { useRouter } from 'next/router';

import {
  stakingContractAddressHorseAAA,
  stakingContractAddressHorseBBB,
  stakingContractAddressHorseCCC,
  marketplaceContractAddress,
  marketplaceContractAddressChaoscube,
  tokenContractAddressUSDC,
  tokenContractAddressGRD,
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
  ConnectWallet,
} from '@thirdweb-dev/react';
import { set } from 'lodash';
import { Button } from '@mui/material';

////import { useToast } from '@/components/ui/use-toast';

import toast from 'react-hot-toast';

import AuctionCountdown from '@/components/nft/auction-countdown';

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
  //tokenid: any;
  nftMetadata: any;
  contractAddress: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function Grade(grade: any) {
  //console.log('grade===', grade);

  /*
  var valueGrade = '';

  if (grade?.grade?.length > 35) {
    //console.log('Grade grade.grade[35]====', grade?.grade[35]);

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

function PriceRange() {
  let [range, setRange] = useState({ min: 0, max: 1000 });

  function handleRangeChange(value: any) {
    setRange({
      min: value[0],
      max: value[1],
    });
  }
  function handleMaxChange(max: number) {
    setRange({
      ...range,
      max: max || range.min,
    });
  }
  function handleMinChange(min: number) {
    setRange({
      ...range,
      min: min || 0,
    });
  }

  return (
    <div className="p-5">
      <div className="mb-4 grid grid-cols-2 gap-2">
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="number"
          value={range.min}
          onChange={(e) => handleMinChange(parseInt(e.target.value))}
          min="0"
          max={range.max}
        />
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="number"
          value={range.max}
          onChange={(e) => handleMaxChange(parseInt(e.target.value))}
          min={range.min}
        />
      </div>
      <Slider
        range
        min={0}
        max={1000}
        value={[range.min, range.max]}
        allowCross={false}
        onChange={(value) => handleRangeChange(value)}
      />
    </div>
  );
}

export default function NftSinglePrice({
  //tokenid,
  contractAddress,
  nftMetadata,
  isOpen,
  setIsOpen,
}: NftDrawerProps) {
  const [price, setPrice] = useState(null);
  const [date, setDate] = useState(1624147200);
  const [status, setStatus] = useState('Month');
  const [chartData, setChartData] = useState(monthlyComparison);
  const [priceDiff, setPriceDiff] = useState(-1.107);
  const [percentage, setPercentage] = useState('2.22%');
  const [toggleCoin, setToggleCoin] = useState(false);
  const [selected, setSelected] = useState(currency[0]);
  const formattedDate = format(new Date(date * 1000), 'MMMM d, yyyy hh:mma');
  const { layout } = useLayout();

  const router = useRouter();

  ////const { toast } = useToast();

  const address = useAddress();

  /*
  const { contract: nftDropContract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );
  */

  //console.log('nftMetadata', nftMetadata);
  //console.log('contractAddress', contractAddress);

  const { contract: nftDropContract } = useContract(
    contractAddress,
    'nft-drop'
  );

  //const { data: nft } = useNFT(nftDropContract, tokenid);

  //console.log('nft', nft);

  ///const attributes: any = nft?.metadata?.attributes;

  const [attributeGrade, setAttributeGrade] = useState(null);

  useEffect(() => {
    setAttributeGrade(null);

    nftMetadata?.metadata?.attributes?.map((attribute: any) => {
      ///console.log('attribute', attribute);
      if (attribute.trait_type === 'Grade') {
        ///console.log('attribute.value', attribute.value);

        setAttributeGrade(attribute.value);

        return;

        //return attribute.value;
      }
    });
  }, [nftMetadata?.metadata?.attributes]);

  ///console.log('attributeGrade', attributeGrade);

  const { contract: contractStaking, isLoading: isLoadingStaking } =
    useContract(stakingContractAddressHorseAAA);

  const { data: stakerAddress, isLoading } = useContractRead(
    contractStaking,
    'stakerAddress',
    [nftMetadata?.metadata?.id]
  );

  const { data: stakeInfo, isLoading: isLoadingStakeInfo } = useContractRead(
    contractStaking,
    'getStakeInfo',
    [stakerAddress]
  );

  ///console.log('stakeInfo', stakeInfo);

  const [stakeInfoCount, setStakeInfoCount] = useState<any>(null);

  useEffect(() => {
    if (!stakeInfo) return;

    setStakeInfoCount(stakeInfo?.[0]?.length);
  }, [stakeInfo]);

  ///console.log('stakerAddress', stakerAddress);

  const { contract: marketplace } = useContract(
    marketplaceContractAddress,
    'marketplace-v3'
  );

  const {
    data: directListings,
    isLoading: loadingListings,
    error,
  } = useValidDirectListings(marketplace);

  //console.log('nft-single-price directListings======>', directListings);

  const [directListing, setDirectListing] = useState<any>(null);

  useEffect(() => {
    setDirectListing(null);

    if (directListings) {
      directListings.map((listing: any) => {
        if (listing.tokenId === nftMetadata?.metadata?.id) {
          //setListingId(listing.id);

          setDirectListing(listing);

          ////console.log('nft-single-price listing', listing);

          return;
        }
      });
    }
  }, [directListings, nftMetadata?.metadata?.id]);

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

  const [raceHistory, setRaceHistory] = useState([]);

  const getLast20 = async () => {
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

  const [saleHistory, setSaleHistory] = useState([] as any);

  const getLastSale20 = async () => {
    console.log(
      'price-history-table nftMetadata.?metadata?.id: ',
      nftMetadata?.metadata?.id
    );

    const response = await fetch('/api/nft/horse/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'getAllByTokenId',
        tokenId: nftMetadata?.metadata?.id,
      }),
    });
    const data = await response.json();

    //console.log('data.all: ', data.all);

    setSaleHistory(data.all);
  };

  useEffect(() => {
    getLastSale20();
  }, [nftMetadata?.metadata?.id]);

  ///console.log('saleHistory[0]', saleHistory[0]);

  async function stakeNft(id: string) {
    ///alert("test stakeNft");

    /*
      toast({
        title: 'Successfully minted',
        description:
          'The NFT has been transferred to your wallet',
        duration: 5000,
        className: 'bg-green-500',
      });
      */

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

    //console.log('staking data=====', data);

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
        directListing?.id,
        quantityDesired,
        address
      );

      alert('NFT bought successfully!');
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function sellNft(id: string) {
    if (!address) return;

    if (!price) {
      alert('Please enter price');
      return;
    }

    /*
    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddressHorseAAA
    );

    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddressHorseAAA, true);
    }

    const data = await stakingContract?.call('stake', [id]);
    */

    //console.log("data",data);

    try {
      const transaction = await marketplace?.directListings.createListing({
        assetContractAddress: contractAddress, // Contract Address of the NFT
        tokenId: id, // Token ID of the NFT.
        //buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        pricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        ///currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        currencyContractAddress: tokenContractAddressUSDC,

        //listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        //quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        startTimestamp: new Date(), // When the listing will start
        endTimestamp: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Optional - when the listing should end (default is 7 days from now)
      });

      return transaction;
    } catch (error) {
      console.error(error);
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
                    {nftMetadata?.metadata?.name}
                  </div>

                  <Image
                    src={
                      nftMetadata?.metadata?.image
                        ? nftMetadata?.metadata?.image
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
                  {nftMetadata?.metadata?.name}
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
                      href={`/derbystars`}
                    >
                      {nftMetadata?.metadata?.description}
                    </Link>

                    <div className="text-left text-sm text-black dark:text-white xl:text-lg">
                      #{nftMetadata?.metadata?.id}
                    </div>
                    <div className="text-left text-xl font-bold capitalize text-black dark:text-white xl:text-2xl">
                      {nftMetadata?.metadata?.name}
                    </div>
                  </div>

                  {loadingListings ? (
                    <div className="mt-0 flex flex-col items-center justify-center gap-5  rounded-lg border p-3 ">
                      <div className="text-sm font-bold xl:text-lg">
                        <b>Loading sale...</b>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-0 flex flex-col items-center justify-center gap-5  rounded-lg border p-3 ">
                      {!directListing || directListing.quantity === '0' ? (
                        <>
                          <div className="text-sm font-bold xl:text-lg">
                            <b>Not for sale </b>
                          </div>

                          <div className="item-center flex flex-row justify-center gap-2 text-sm font-bold xl:text-lg">
                            <button
                              className="w-24 text-sm font-bold xl:text-xl "
                              onClick={() =>
                                router.push(
                                  `https://granderby.market/derbystars-details/${nftMetadata?.metadata?.id}`
                                )
                              }
                            >
                              <Image
                                src="/images/market.png"
                                alt="live"
                                width={30}
                                height={30}
                              />
                            </button>

                            <span className="pt-1 ">Last price:</span>
                            <span className="text-xl font-bold text-green-600 xl:text-3xl">
                              {saleHistory[0]?.paidToken ===
                              '0x0000000000000000000000000000000000001010'
                                ? (
                                    saleHistory[0]?.totalPricePaid /
                                    1000000000000000000
                                  ).toFixed(2)
                                : (
                                    saleHistory[0]?.totalPricePaid / 1000000
                                  ).toFixed(2)}
                            </span>

                            {saleHistory[0]?.paidToken ===
                            '0x0000000000000000000000000000000000001010' ? (
                              <span className="pt-1">MATIC</span>
                            ) : (
                              <span className="pt-1">USDC</span>
                            )}
                          </div>
                          <div className=" flex flex-row items-center justify-start gap-2">
                            {format(
                              Date.parse(saleHistory[0]?.blockTimestamp || 0),
                              'yyy-MM-dd hh:mm:ss'
                            )}
                          </div>

                          <div className="item-center flex flex-row justify-center gap-2 text-sm font-bold xl:text-lg">
                            <button
                              className=" w-24 text-sm font-bold xl:text-xl "
                              onClick={() =>
                                router.push(
                                  `https://opensea.io/assets/matic/0x41fba0bd9f4dc9a968a10aebb792af6a09969f60/${nftMetadata?.metadata?.id}`
                                )
                              }
                            >
                              <Image
                                src="/images/logo-opensea.svg"
                                alt="live"
                                width={80}
                                height={30}
                              />
                            </button>

                            <span className="pt-1 ">Last price:</span>
                            <span className="pt-1">No record</span>
                          </div>

                          {address === nftMetadata?.owner &&
                            address !== stakerAddress && (
                              <div className=" flex flex-row items-center justify-start gap-2">
                                <Web3Button
                                  theme="light"
                                  contractAddress={marketplaceContractAddress}
                                  action={() =>
                                    sellNft(nftMetadata?.metadata?.id || '')
                                  }
                                >
                                  Sell
                                </Web3Button>

                                <input
                                  className=" w-full text-black"
                                  type="number"
                                  name="price"
                                  placeholder="Price"
                                  value={price}
                                  onChange={(e) => {
                                    setPrice(e.target.value as any);
                                  }}
                                />
                                <span className="ml-2 text-xl font-bold text-blue-600">
                                  USDC
                                </span>
                              </div>
                            )}
                        </>
                      ) : (
                        <>
                          <div className="text-xl font-bold xl:text-2xl">
                            {/*
                              <b>{directListing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                              {directListing.buyoutCurrencyValuePerToken.symbol}
                                  */}

                            <div className="flex flex-row gap-3">
                              <Image
                                src="/images/market.png"
                                alt="market"
                                width={30}
                                height={20}
                              />
                              <span>Sell Price</span>
                            </div>

                            <div className="mt-2 flex flex-row items-center justify-center gap-3">
                              <span className="text-3xl font-bold text-green-600 xl:text-4xl">
                                {
                                  directListing?.currencyValuePerToken
                                    .displayValue
                                }
                              </span>
                              <span className="text-sm xl:text-lg">
                                {' '}
                                {directListing?.currencyValuePerToken.symbol}
                              </span>
                            </div>
                          </div>

                          <span className="text-sm">
                            Listing:&nbsp;
                            {format(
                              new Date(
                                directListing?.startTimeInSeconds * 1000
                              ),
                              'yyy-MM-dd hh:mm:ss'
                            )}
                          </span>

                          <div className="text-sm font-bold xl:text-lg">
                            Last price:{' '}
                            <span className="text-xl font-bold text-green-600 xl:text-3xl">
                              {(
                                saleHistory[0]?.totalPricePaid / 1000000
                              ).toFixed(2)}{' '}
                            </span>
                            {directListing?.currencyValuePerToken.symbol}
                          </div>
                          <div className=" flex flex-row items-center justify-start gap-2">
                            {format(
                              Date.parse(saleHistory[0]?.blockTimestamp || 0),
                              'yyy-MM-dd hh:mm:ss'
                            )}
                          </div>

                          {address && address === nftMetadata?.owner && (
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
                                {/*<InfoIcon className="h-3 w-3" /> */} Cancel
                                Sale
                              </span>
                            </Web3Button>
                          )}

                          {!address && (
                            <div className="flex flex-row items-center justify-center">
                              <ConnectWallet
                                theme="light"
                                className="text-sm font-bold xl:text-xl"
                              />
                              <span className="text-sm font-bold xl:text-xl">
                                &nbsp;&nbsp;for Buy Now
                              </span>
                            </div>
                          )}

                          {address && address !== nftMetadata?.owner && (
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
                        </>
                      )}
                    </div>
                  )}

                  {/* registered in */}
                  <div className="mt-1 flex flex-col items-center justify-center gap-2  rounded-lg border ">
                    {isLoadingStaking ? (
                      <div className=" flex flex-col items-center justify-center gap-5 p-3">
                        <div className="text-sm font-bold xl:text-lg">
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

                                {address &&
                                  address === nftMetadata?.owner &&
                                  !directListing && (
                                    <Web3Button
                                      theme="light"
                                      contractAddress={
                                        stakingContractAddressHorseAAA
                                      }
                                      action={() =>
                                        stakeNft(
                                          nftMetadata?.metadata?.id || ''
                                        )
                                      }
                                    >
                                      Register
                                    </Web3Button>
                                  )}
                              </div>
                            )}

                          {stakerAddress &&
                            stakerAddress !==
                              '0x0000000000000000000000000000000000000000' && (
                              <div className=" flex items-center justify-start gap-2 ">
                                <div className="flex text-sm tracking-wider text-[#6B7280]">
                                  Registered in
                                </div>

                                {stakeInfo?.[0].date}

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
                                  width={50}
                                  height={50}
                                />
                                <button
                                  className="text-sm font-bold xl:text-xl "
                                  onClick={() => router.push('/live')}
                                >
                                  <Image
                                    src="/horseRace/live.gif"
                                    alt="live"
                                    width={90}
                                    height={30}
                                  />
                                </button>
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

                          {stakerAddress && stakerAddress === address && (
                            <div className="mt-0 ">
                              <Web3Button
                                theme="light"
                                action={(contract) =>
                                  contract?.call('withdraw', [
                                    [nftMetadata?.metadata?.id],
                                  ])
                                }
                                contractAddress={stakingContractAddressHorseAAA}
                              >
                                Unregister
                              </Web3Button>
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
                              <div className="text-sm font-bold xl:text-lg">
                                Last rank:&nbsp;
                                <span className="text-4xl font-bold text-green-600 xl:text-6xl">
                                  {raceHistory[0].rank}{' '}
                                </span>
                                <span className="text-xs">
                                  {format(
                                    Date.parse(raceHistory[0].createdAt || 0),
                                    'yyy-MM-dd hh:mm:ss'
                                  )}
                                </span>
                              </div>

                              <div className="text-sm font-bold xl:text-lg">
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
                  <div className="mt-1 flex flex-col items-center justify-center gap-5  rounded-lg border p-3 ">
                    {isLoadingStaking ? (
                      <div className="mt-0 flex flex-col items-center justify-center gap-5 p-3">
                        <div className="text-sm font-bold xl:text-lg">
                          <b>Loading Owner...</b>
                        </div>
                      </div>
                    ) : (
                      <div className=" flex items-center  gap-4 ">
                        <div className="w-[140px] text-sm tracking-wider text-[#6B7280]">
                          Owned by
                        </div>
                        <div className="rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
                          {stakerAddress &&
                          stakerAddress ===
                            '0x0000000000000000000000000000000000000000' ? (
                            <>
                              {nftMetadata?.owner === address ? (
                                <div className="text-xl font-bold text-blue-600">
                                  Me
                                </div>
                              ) : (
                                <div>
                                  <span>
                                    {nftMetadata?.owner?.substring(0, 10)}...
                                  </span>
                                  {stakeInfoCount && stakeInfoCount > 1 && (
                                    <span className="text-xs text-gray-400">
                                      +{stakeInfoCount - 1}
                                    </span>
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {stakerAddress && stakerAddress === address ? (
                                <div className="text-xl font-bold text-blue-600">
                                  Me
                                </div>
                              ) : (
                                <div>
                                  <span>
                                    {stakerAddress?.substring(0, 10)}...
                                  </span>
                                  {stakeInfoCount && stakeInfoCount > 1 && (
                                    <span className="text-xs text-gray-400">
                                      +{stakeInfoCount - 1}
                                    </span>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <Image
                    //src="https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/hrs/Hrs_00000000.png"
                    src={
                      nftMetadata?.metadata?.image
                        ? nftMetadata?.metadata?.image
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

            {/*
            <Collapse label="Grade" initialOpen={true}>
              <Grade {...{ grade: attributeGrade }} />
            </Collapse>
            */}

            {/*
            <Collapse label="Speed" initialOpen={true}>
              <PriceRange />
            </Collapse>
            */}

            {/* nft attributes details */}

            <div className="mt-5 grid  grid-cols-2 items-start justify-between gap-2  ">
              {nftMetadata?.metadata?.attributes?.map((attribute: any) => (
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
                      {/*
                      {attribute?.value?.toString().length < 8
                        ? attribute?.value?.toString()
                        : attribute?.value?.toString().substring(0, 8)}
                      ...
                      */}
                      {attribute?.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

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

      {/*
      <AuctionCountdown date={Date.now() + 4000000 * 10} />
    */}
    </div>
  );
}
