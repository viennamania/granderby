import { IUser } from '@/utils/interfaces/user-interface';
import { Stack, Snackbar, Alert } from '@mui/material';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import { FaCoins } from 'react-icons/fa';

import {
  nftDropContractAddressEntry,
  //tokenContractAddressGRD,
  tokenContractAddressGRD,
} from '@/config/contractAddresses';

import {
  useTokenBalance,
  ConnectWallet,
  detectContractFeature,
  useActiveClaimConditionForWallet,
  useAddress,
  useContract,
  useContractMetadata,
  useNFT,
  useClaimConditions,
  useClaimerProofs,
  useClaimIneligibilityReasons,
  useClaimedNFTSupply,
  useUnclaimedNFTSupply,
  Web3Button,
  useOwnedNFTs,
  ThirdwebNftMedia,
} from '@thirdweb-dev/react';

import { BigNumber, utils } from 'ethers';
import { useMemo } from 'react';
import { HeadingImage } from '@/components/HeadingImage';
import { useToast } from '@/components/ui/use-toast';
import { parseIneligibility } from '@/utils/parseIneligibility';

import {
  ////contractConst,
  primaryColorConst,
  ///themeConst,
} from '@/consts/parameters';

import { ContractWrapper } from '@thirdweb-dev/sdk/dist/declarations/src/evm/core/classes/contract-wrapper';

///const urlParams = new URL(window.location.toString()).searchParams;
//const contractAddress = urlParams.get("contract") || contractConst || "";

const contractAddress = nftDropContractAddressEntry;

//const primaryColor =
//  urlParams.get("primaryColor") || primaryColorConst || undefined;
const primaryColor = primaryColorConst;

const colors = {
  purple: '#7C3AED',
  blue: '#3B82F6',
  orange: '#F59E0B',
  pink: '#EC4899',
  green: '#10B981',
  red: '#EF4444',
  teal: '#14B8A6',
  cyan: '#22D3EE',
  yellow: '#FBBF24',
} as const;

export default function BetInputs({
  horse1,
  horse2,
  horse3,
  horse4,
  horse5,
  horse6,
  horse7,
  horse8,
  horse9,
  horse10,
  user,
  npcs,
  inputs,
  balance,
}: {
  horse1: any;
  horse2: any;
  horse3: any;
  horse4: any;
  horse5: any;
  horse6: any;
  horse7: any;
  horse8: any;
  horse9: any;
  horse10: any;
  user: IUser | null;
  npcs: any;
  inputs: any;
  balance: any;
}) {
  const [chosenNpc, setChosenNpc] = useState<any>(null);
  const [betAmount, setBetAmount] = useState<any>(0);
  const [placedBet, setPlacedBet] = useState<any>(false);

  const [succ, setSucc] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState<String>('');

  const handleClickSucc = () => {
    setSucc(true);
  };

  const handleCloseSucc = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSucc(false);
  };

  const handleClickErr = () => {
    setErr(true);
  };

  const handleCloseErr = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setErr(false);
  };

  const placeBet = async () => {
    if (user) {
      if (betAmount > balance) {
        setErrMsg('You don`t have enough money to bet this amount');
        handleClickErr();
        return;
      }
      if (betAmount === 0) {
        setErrMsg('You need to enter a bet amount');
        handleClickErr();
        return;
      }
      if (betAmount < 0) {
        setErrMsg('You cannot bet a negative amount');
        handleClickErr();
        return;
      }
      if (chosenNpc === null) {
        setErrMsg('You need to select a horse to bet');
        handleClickErr();
        return;
      }
      const formInputs = {
        method: 'newGame',
        userToken: getCookie('token'),
        img: user.img,
        username: user?.username,
        betAmount: betAmount,
        selectedSide: chosenNpc,
      };
      const res = await fetch('/api/games/horseRace/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInputs),
      });
      const data = await res.json();
      if (data.message === 'Success') {
        handleClickSucc();
        setCookie('horse', chosenNpc);
        setPlacedBet(true);
      } else {
        setErrMsg('You have already placed a bet');
        handleClickErr();
      }
    } else {
      setErrMsg('You need to login to place a bet');
      handleClickErr();
    }
  };

  const [tokenid, setTokenid] = useState<BigNumber>(BigNumber.from(0));

  const contractQuery = useContract(contractAddress);

  const contractMetadata = useContractMetadata(contractQuery.contract);

  ////console.log("contractMetadata", contractMetadata);

  const { toast } = useToast();
  const theme = 'dark';
  //const root = window.document.documentElement;
  //root.classList.add(theme);

  const address = useAddress();

  /*
    const { data: ownedNfts } = useOwnedNFTs(contractQuery.contract, address || "");
  
  
    console.log("ownedNfts", { ownedNfts });
    */

  const [quantity, setQuantity] = useState(1);

  const claimConditions = useClaimConditions(contractQuery.contract, tokenid);

  const activeClaimCondition = useActiveClaimConditionForWallet(
    contractQuery.contract,
    address,
    tokenid
  );

  /////console.log("activeClaimCondition", { activeClaimCondition });

  const claimerProofs = useClaimerProofs(
    contractQuery.contract,
    address || '',
    tokenid
  );

  const claimIneligibilityReasons = useClaimIneligibilityReasons(
    contractQuery.contract,
    {
      quantity,
      walletAddress: address || '',
    },
    tokenid
  );

  const unclaimedSupply = useUnclaimedNFTSupply(contractQuery.contract);

  const claimedSupply = useClaimedNFTSupply(contractQuery.contract);

  /*
    const { data: firstNft, isLoading: firstNftLoading } = useNFT(
      contractQuery.contract,
      tokenid,
    );

    console.log({ firstNft, firstNftLoading });

    const firstNftLoading2 = true;
    */

  const numberClaimed = useMemo(() => {
    /////////return BigNumber.from(claimedSupply.data || 0).toString();
    return '0';

    ////}, [claimedSupply]);
  }, []);

  const numberTotal = useMemo(() => {
    /*
      return BigNumber.from(claimedSupply.data || 0)
        .add(BigNumber.from(unclaimedSupply.data || 0))
        .toString();
        */
    return '10000';

    ////}, [claimedSupply.data, unclaimedSupply.data]);
  }, []);

  ///console.log("============", { numberClaimed, numberTotal });

  const priceToMint = useMemo(() => {
    const bnPrice = BigNumber.from(
      activeClaimCondition.data?.currencyMetadata.value || 0
    );
    return `${utils.formatUnits(
      bnPrice.mul(quantity).toString(),
      activeClaimCondition.data?.currencyMetadata.decimals || 18
    )} ${activeClaimCondition.data?.currencyMetadata.symbol}`;
  }, [
    activeClaimCondition.data?.currencyMetadata.decimals,
    activeClaimCondition.data?.currencyMetadata.symbol,
    activeClaimCondition.data?.currencyMetadata.value,
    quantity,
  ]);

  const maxClaimable = useMemo(() => {
    let bnMaxClaimable;
    try {
      bnMaxClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimableSupply || 0
      );
    } catch (e) {
      bnMaxClaimable = BigNumber.from(1_000_000);
    }

    let perTransactionClaimable;
    try {
      perTransactionClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimablePerWallet || 0
      );
    } catch (e) {
      perTransactionClaimable = BigNumber.from(1_000_000);
    }

    if (perTransactionClaimable.lte(bnMaxClaimable)) {
      bnMaxClaimable = perTransactionClaimable;
    }

    const snapshotClaimable = claimerProofs.data?.maxClaimable;

    if (snapshotClaimable) {
      if (snapshotClaimable === '0') {
        // allowed unlimited for the snapshot
        bnMaxClaimable = BigNumber.from(1_000_000);
      } else {
        try {
          bnMaxClaimable = BigNumber.from(snapshotClaimable);
        } catch (e) {
          // fall back to default case
        }
      }
    }

    ////const maxAvailable = BigNumber.from(unclaimedSupply.data || 0);

    const maxAvailable = BigNumber.from(10);

    ////console.log({ maxAvailable, bnMaxClaimable });

    let max;
    if (maxAvailable.lt(bnMaxClaimable)) {
      max = maxAvailable;
    } else {
      max = bnMaxClaimable;
    }

    if (max.gte(1_000_000)) {
      return 1_000_000;
    }
    return max.toNumber();
  }, [
    claimerProofs.data?.maxClaimable,
    //unclaimedSupply.data,
    activeClaimCondition.data?.maxClaimableSupply,
    activeClaimCondition.data?.maxClaimablePerWallet,
  ]);

  const isOpenEdition = useMemo(() => {
    if (contractQuery?.contract) {
      const contractWrapper = (contractQuery.contract as any)
        .contractWrapper as ContractWrapper<any>;

      const featureDetected = detectContractFeature(
        contractWrapper,
        'ERC721SharedMetadata'
      );

      return featureDetected;
    }

    return false;
  }, [contractQuery.contract]);

  const isSoldOut = useMemo(() => {
    try {
      return (
        (activeClaimCondition.isSuccess &&
          BigNumber.from(activeClaimCondition.data?.availableSupply || 0).lte(
            0
          )) ||
        (numberClaimed === numberTotal && !isOpenEdition)
      );
    } catch (e) {
      return false;
    }
  }, [
    activeClaimCondition.data?.availableSupply,
    activeClaimCondition.isSuccess,
    numberClaimed,
    numberTotal,
    isOpenEdition,
  ]);

  const canClaim = useMemo(() => {
    return (
      activeClaimCondition.isSuccess &&
      claimIneligibilityReasons.isSuccess &&
      claimIneligibilityReasons.data?.length === 0 &&
      !isSoldOut
    );
  }, [
    activeClaimCondition.isSuccess,
    claimIneligibilityReasons.data?.length,
    claimIneligibilityReasons.isSuccess,
    isSoldOut,
  ]);

  const isLoading = useMemo(() => {
    return (
      activeClaimCondition.isLoading ||
      //////unclaimedSupply.isLoading ||
      /////////claimedSupply.isLoading ||

      !contractQuery.contract
    );
  }, [
    activeClaimCondition.isLoading,
    contractQuery.contract,
    //claimedSupply.isLoading,
    //unclaimedSupply.isLoading,
  ]);

  /////console.log("isLoading==============", isLoading)

  const buttonLoading = useMemo(
    () => isLoading || claimIneligibilityReasons.isLoading,
    [claimIneligibilityReasons.isLoading, isLoading]
  );

  /////console.log("buttonLoading==============", buttonLoading)

  const buttonText = useMemo(() => {
    if (isSoldOut) {
      return 'Sold Out';
    }

    if (canClaim) {
      const pricePerToken = BigNumber.from(
        activeClaimCondition.data?.currencyMetadata.value || 0
      );
      if (pricePerToken.eq(0)) {
        return 'Bet (Free)';
      }
      return `Bet (${priceToMint})`;
    }
    if (claimIneligibilityReasons.data?.length) {
      return parseIneligibility(claimIneligibilityReasons.data, quantity);
    }
    if (buttonLoading) {
      return 'Checking eligibility...';
    }

    return 'Betting not available';
  }, [
    isSoldOut,
    canClaim,
    claimIneligibilityReasons.data,
    buttonLoading,
    activeClaimCondition.data?.currencyMetadata.value,
    priceToMint,
    quantity,
  ]);

  const dropNotReady = useMemo(
    () =>
      claimConditions.data?.length === 0 ||
      claimConditions.data?.every((cc) => cc.maxClaimableSupply === '0'),
    [claimConditions.data]
  );

  const dropStartingSoon = useMemo(
    () =>
      (claimConditions.data &&
        claimConditions.data.length > 0 &&
        activeClaimCondition.isError) ||
      (activeClaimCondition.data &&
        activeClaimCondition.data.startTime > new Date()),
    [
      activeClaimCondition.data,
      activeClaimCondition.isError,
      claimConditions.data,
    ]
  );

  return (
    <>
      {
        //hasCookie('horse') &&
        address && (
          <div className="item-center flex w-full justify-center gap-1 bg-transparent text-xl text-white">
            <div className="glow-text p-2 font-medium text-white ">
              {chosenNpc && betAmount ? (
                <div>
                  You choose {chosenNpc ?? ' '} and bet {betAmount ?? ' '}
                </div>
              ) : (
                <div>You choose {chosenNpc ?? ' '}</div>
              )}
            </div>
          </div>
        )
      }

      <div className="disabled flex w-full flex-col items-center justify-center gap-5 lg:w-2/3">
        {/* //? Input amount manuel */}
        {/*
                <div className='flex items-center w-full md:w-1/2 relative'>
                    <div className='absolute left-5 z-10'> <FaCoins className='fill-yellow-500' /> </div>
                    <input onChange={(e: any) => {
                        setBetAmount(e.target.value)
                    }}
                        value={betAmount === 0 ? '' : betAmount}
                        type="number"
                        disabled={placedBet}
                        placeholder='Enter your bet'
                        className='w-full pl-20 rounded-lg p-2 bg-transparent border text-white' />
                    <button
                        disabled={placedBet}
                        onClick={() => { setBetAmount(0) }}
                        className='absolute right-5 z-10 btn btn-xs btn-outline border-gray-700'>Clear</button>
                </div>
                */}
        {/* //? Miktar Selector Buttons */}
        {/*
                <div className='grid grid-cols-4 content-center md:flex w-full gap-3 items-center justify-center text-white'>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount + inputs.input1)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'>
                        +{inputs.input1}
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount + inputs.input2)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'>
                        +{inputs.input2}
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount + inputs.input3)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'>
                        {
                            inputs.input3
                        }
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount + inputs.input4)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'>
                        +{inputs.input4}
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount + inputs.input5)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'>
                        +{inputs.input5}
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount + inputs.input6)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'>
                        +{inputs.input6}
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount * 2)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'> x2 </button>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount / 2)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'> /2 </button>
                    {user && <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(balance - 0.00001)
                        }}
                        className='w-20 green-btn h-10 rounded-lg hidden md:block font-medium-repeat text-black border disabled:opacity-70'> Max </button>}
                </div>
                */}

        {/* //? Horse Select Buttons */}
        <div className="flex w-full flex-row items-center justify-center gap-3 text-xl  font-bold md:flex-row md:justify-around">
          Entry
        </div>

        <div className="flex w-full flex-row items-center justify-center gap-3  text-xs md:flex-row md:justify-around">
          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs.horse1);
              setTokenid(BigNumber.from(0));
            }}
            className={`gold-btn h-20 w-44 border border-white p-1 text-center text-white ${
              chosenNpc === npcs.horse1
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm">Line 1</span>
              <div className="flex items-center justify-center">
                <span>{npcs.horse1}</span>
              </div>
              <span className="text-sm">x {horse1}</span>
            </div>
          </button>

          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs.horse2);
              setTokenid(BigNumber.from(1));
            }}
            className={`gold-btn h-20 w-44 border  border-white p-1 text-center  text-white ${
              chosenNpc === npcs.horse2
                ? 'gold-btn-active '
                : chosenNpc === 0
                ? ''
                : ''
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm">Line 2</span>
              <div className="flex items-center justify-center">
                <span>{npcs.horse2}</span>
              </div>
              <span className="text-sm">x {horse2}</span>
            </div>
          </button>
          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs.horse3);
              setTokenid(BigNumber.from(2));
            }}
            className={`gold-btn h-20 w-44 border border-white p-1 text-center text-white ${
              chosenNpc === npcs.horse3
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm ">Line 3</span>
              <div className="flex items-center justify-center">
                <span>{npcs.horse3}</span>
              </div>
              <span className="text-sm">x {horse3}</span>
            </div>
          </button>
          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs.horse4);
              setTokenid(BigNumber.from(3));
            }}
            className={`gold-btn h-20 w-44 border border-white p-1 text-center text-white ${
              chosenNpc === npcs.horse4
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm">Line 4</span>
              <div className="flex items-center justify-center">
                <span>{npcs.horse4}</span>
              </div>
              <span className="text-sm">x {horse4}</span>
            </div>
          </button>

          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs.horse5);
              setTokenid(BigNumber.from(4));
            }}
            className={` gold-btn h-20 w-44 border border-white p-1 text-center text-white ${
              chosenNpc === npcs.horse5
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm">Line 5</span>
              <div className="flex items-center justify-center">
                <span>{npcs.horse5}</span>
              </div>
              <span className="text-sm">x {horse5}</span>
            </div>
          </button>

          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs.horse6);
              setTokenid(BigNumber.from(4));
            }}
            className={` gold-btn h-20 w-44 border border-white p-1 text-center text-white ${
              chosenNpc === npcs.horse6
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm">Line 6</span>
              <div className="flex items-center justify-center">
                <span>{npcs.horse6}</span>
              </div>
              <span className="text-sm">x {horse6}</span>
            </div>
          </button>


          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs.horse7);
              setTokenid(BigNumber.from(4));
            }}
            className={` gold-btn h-20 w-44 border border-white p-1 text-center text-white ${
              chosenNpc === npcs.horse7
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm">Line 7</span>
              <div className="flex items-center justify-center">
                <span>{npcs.horse7}</span>
              </div>
              <span className="text-sm">x {horse7}</span>
            </div>
          </button>



          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs.horse8);
              setTokenid(BigNumber.from(4));
            }}
            className={` gold-btn h-20 w-44 border border-white p-1 text-center text-white ${
              chosenNpc === npcs.horse8
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm">Line 8</span>
              <div className="flex items-center justify-center">
                <span>{npcs.horse8}</span>
              </div>
              <span className="text-sm">x {horse8}</span>
            </div>
          </button>


          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs.horse9);
              setTokenid(BigNumber.from(4));
            }}
            className={` gold-btn h-20 w-44 border border-white p-1 text-center text-white ${
              chosenNpc === npcs.horse9
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm">Line 9</span>
              <div className="flex items-center justify-center">
                <span>{npcs.horse9}</span>
              </div>
              <span className="text-sm">x {horse9}</span>
            </div>
          </button>


          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs.horse10);
              setTokenid(BigNumber.from(4));
            }}
            className={` gold-btn h-20 w-44 border border-white p-1 text-center text-white ${
              chosenNpc === npcs.horse10
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm">Line 10</span>
              <div className="flex items-center justify-center">
                <span>{npcs.horse10}</span>
              </div>
              <span className="text-sm">x {horse10}</span>
            </div>
          </button>



        </div>

        {/* //? Place Bet Button */}
        {/*
                <button
                    disabled={placedBet} onClick={placeBet} className='emerald-btn duration-300 transition-all mt-5 w-32 p-2 disabled:text-white disabled:shadow-none disabled:bg-transparent disabled:opacity-50'>Place Bet </button>
                */}

        <div className="flex flex-col gap-2 xs:gap-4">
          {isLoading ? (
            <div
              role="status"
              className="animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0"
            >
              <div className="w-full">
                <div className="h-10 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          ) : isOpenEdition ? null : (
            <p>
              {/*
                      <span className="text-lg font-bold tracking-wider text-gray-500 xs:text-xl lg:text-2xl">
                          {numberClaimed}
                      </span>{" "}
                      <span className="text-lg font-bold tracking-wider xs:text-xl lg:text-2xl">
                          / {numberTotal} minted
                      </span>
                      */}
            </p>
          )}

          <h1 className="line-clamp-1 text-2xl font-bold xs:text-3xl lg:text-4xl">
            {contractMetadata.isLoading ? (
              <div
                role="status"
                className="animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0"
              >
                <div className="w-full">
                  <div className="h-8 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              contractMetadata.data?.name
            )}
          </h1>

          {contractMetadata.data?.description || contractMetadata.isLoading ? (
            <div className="line-clamp-2 text-gray-500">
              {contractMetadata.isLoading ? (
                <div
                  role="status"
                  className="animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0"
                >
                  <div className="w-full">
                    <div className="mb-2.5 h-2 max-w-[480px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                contractMetadata.data?.description
              )}
            </div>
          ) : null}
        </div>

        <div className="flex w-full gap-4">
          {dropNotReady ? (
            <span className="text-red-500">
              This drop is not ready to be minted yet. (No claim condition set)
            </span>
          ) : dropStartingSoon ? (
            <span className="text-gray-500">
              Drop is starting soon. Please check back later.
            </span>
          ) : (
            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-4 ">
                <div className="flex h-11 w-full rounded-lg border border-gray-400 px-2 dark:border-gray-800 md:w-full">
                  <button
                    onClick={() => {
                      const value = quantity - 1;
                      if (value > maxClaimable) {
                        setQuantity(maxClaimable);
                      } else if (value < 1) {
                        setQuantity(1);
                      } else {
                        setQuantity(value);
                      }
                    }}
                    className="flex h-full items-center justify-center rounded-l-md px-2 text-center text-2xl disabled:cursor-not-allowed disabled:text-gray-500 dark:text-white dark:disabled:text-gray-600"
                    disabled={isSoldOut || quantity - 1 < 1}
                  >
                    -
                  </button>

                  <p className="flex h-full w-full items-center justify-center text-center font-mono dark:text-white lg:w-full">
                    {!isLoading && isSoldOut ? 'Sold Out' : quantity}
                  </p>
                  <button
                    onClick={() => {
                      const value = quantity + 1;
                      if (value > maxClaimable) {
                        setQuantity(maxClaimable);
                      } else if (value < 1) {
                        setQuantity(1);
                      } else {
                        setQuantity(value);
                      }
                    }}
                    className={
                      'flex h-full items-center justify-center rounded-r-md px-2 text-center text-2xl disabled:cursor-not-allowed disabled:text-gray-500 dark:text-white dark:disabled:text-gray-600'
                    }
                    disabled={isSoldOut || quantity + 1 > maxClaimable}
                  >
                    +
                  </button>
                </div>

                <Web3Button
                  contractAddress={contractQuery.contract?.getAddress() || ''}
                  style={{
                    backgroundColor:
                      colors[primaryColor as keyof typeof colors] ||
                      primaryColor,
                    maxHeight: '43px',
                  }}
                  theme={theme}
                  action={(cntr) => {
                    if (chosenNpc === null) {
                      setErrMsg('You need to select a horse to bet');
                      handleClickErr();
                      return;
                    }

                    const ret = cntr.erc1155.claim(tokenid, quantity);

                    ///console.log("Web3Button action", { ret });
                  }}
                  isDisabled={!canClaim || buttonLoading}
                  onError={(err) => {
                    console.error(err);
                    console.log({ err });

                    toast({
                      title: 'Failed to mint drop',
                      description: (err as any).reason || '',
                      duration: 9000,
                      variant: 'destructive',
                    });
                  }}
                  onSuccess={() => {
                    toast({
                      title: 'Successfully minted',
                      description:
                        'The NFT has been transferred to your wallet',
                      duration: 5000,
                      className: 'bg-green-500',
                    });
                  }}
                >
                  {buttonLoading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="mr-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    buttonText
                  )}
                </Web3Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={succ} autoHideDuration={6000} onClose={handleCloseSucc}>
          <Alert
            onClose={handleCloseSucc}
            severity="success"
            sx={{ width: '100%' }}
          >
            You have successfully placed your bet!
          </Alert>
        </Snackbar>
        <Snackbar open={err} autoHideDuration={6000} onClose={handleCloseErr}>
          <Alert
            onClose={handleCloseErr}
            severity="error"
            sx={{ width: '100%' }}
          >
            {errMsg}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
