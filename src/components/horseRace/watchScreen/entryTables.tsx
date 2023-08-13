import { IUser } from '@/utils/interfaces/user-interface';
import { Stack, Snackbar, Alert } from '@mui/material';
import { getCookie, hasCookie, setCookie } from 'cookies-next';

import { useState, useEffect } from 'react';

////import { FaCoins } from 'react-icons/fa';




import { BigNumber, utils } from 'ethers';
import { useMemo } from 'react';
import { HeadingImage } from '@/components/HeadingImage';
import { useToast } from '@/components/ui/use-toast';
import { parseIneligibility } from '@/utils/parseIneligibility';

import Image from 'next/image';

import Button from '@/components/ui/button';
import { OptionIcon } from '@/components/icons/option';

import { useDrawer } from '@/components/drawer-views/context';
import { add } from 'lodash';


import {
  ///nftDropContractAddressEntry,
  nftDropContractAddressCar,
  tokenContractAddressGRD,
} from '@/config/contractAddresses';

import {
  useAddress,
  useTokenBalance,
  ThirdwebNftMedia,
  useContract,
  useNFT,
  Web3Button,
} from '@thirdweb-dev/react';

/*
import {
  ////contractConst,
  primaryColorConst,
  ///themeConst,
} from '@/consts/parameters';
*/

///import { ContractWrapper } from '@thirdweb-dev/sdk/dist/declarations/src/evm/core/classes/contract-wrapper';

///const urlParams = new URL(window.location.toString()).searchParams;
//const contractAddress = urlParams.get("contract") || contractConst || "";

//const contractAddress = nftDropContractAddressEntry;
///const contractAddress = nftDropContractAddressCar;

/*
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
*/


export default function entryTables({
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
  console.log('BetInputsGranderby', {
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
  });





  const address = useAddress();


  const { contract: tokenContract } = useContract (
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalance, isLoading: tokenBalanceIsLoading } =
    useTokenBalance(tokenContract, address);

  const [chosenNpc, setChosenNpc] = useState<any>(null);
  const [betAmount, setBetAmount] = useState<any>(0);
  const [placedBet, setPlacedBet] = useState<any>(false);

  const [succ, setSucc] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState<String>('');

  const { openDrawer } = useDrawer();

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

  //const [tokenid, setTokenid] = useState<BigNumber>(BigNumber.from(0));

  ////console.log("contractMetadata", contractMetadata);

  //const { toast } = useToast();
  const theme = 'dark';
  //const root = window.document.documentElement;
  //root.classList.add(theme);

  //const address = useAddress();

  /*
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


  const numberClaimed = useMemo(() => {
    /////////return BigNumber.from(claimedSupply.data || 0).toString();
    return '0';

    ////}, [claimedSupply]);
  }, []);

  const numberTotal = useMemo(() => {
    
      //return BigNumber.from(claimedSupply.data || 0)
      //  .add(BigNumber.from(unclaimedSupply.data || 0))
      //  .toString();
        
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
  */

  return (
    <>
      {/*
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
              */}

      <div className="disabled items-center justify-center ">
        {/* //? Input amount manuel */}

        {address && (
          <>
            
          </>
        )}

        {/* //? Miktar Selector Buttons */}

        {/*}
            <div className=' 
              grid grid-cols-4 content-center md:flex w-full gap-3 items-center justify-center text-black
            '>
                <button
                    disabled={placedBet}
                    onClick={() => {
                        setBetAmount(betAmount + inputs?.input1)
                    }}
                    className='w-20 green-btn h-10 rounded-lg font-medium border disabled:opacity-70'>

                    +{inputs?.input1}


                </button>

                <button
                    disabled={placedBet}
                    onClick={() => {
                        setBetAmount(betAmount + inputs?.input2)
                    }}
                    className='w-20 green-btn h-10 rounded-l font-medium border disabled:opacity-70'>
                    +{inputs?.input2}
                </button>
                <button
                    disabled={placedBet}
                    onClick={() => {
                        setBetAmount(betAmount + inputs?.input3)
                    }}
                    className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'>
                    {
                        inputs?.input3
                    }
                </button>
                <button
                    disabled={placedBet}
                    onClick={() => {
                        setBetAmount(betAmount + inputs?.input4)
                    }}
                    className='w-20 green-btn h-10 rounded-lg font-medium border disabled:opacity-70'>
                    +{inputs?.input4}
                </button>
                <button
                    disabled={placedBet}
                    onClick={() => {
                        setBetAmount(betAmount + inputs?.input5)
                    }}
                    className='w-20 green-btn h-10 rounded-lg  font-medium border disabled:opacity-70'>
                    +{inputs?.input5}
                </button>
                <button
                    disabled={placedBet}
                    onClick={() => {
                        setBetAmount(betAmount + inputs?.input6)
                    }}
                    className='w-20 green-btn h-10 rounded-lg  font-medium border disabled:opacity-70'>
                    +{inputs?.input6}
                </button>
                <button
                    disabled={placedBet}
                    onClick={() => {
                        setBetAmount(betAmount * 2)
                    }}
                    className='w-20 green-btn h-10 rounded-lg  font-medium border disabled:opacity-70'> x2 </button>
                <button
                    disabled={placedBet}
                    onClick={() => {
                        setBetAmount(betAmount / 2)
                    }}
                    className='w-20 green-btn h-10 rounded-lg  font-medium border disabled:opacity-70'> /2 </button>
                {user && <button
                    disabled={placedBet}
                    onClick={() => {
                        setBetAmount(balance - 0.00001)
                    }}
                    className='w-20 green-btn h-10 rounded-lg hidden md:block font-medium-repeat text-black border disabled:opacity-70'> Max </button>}
            </div>
                */}

        {/* //? Horse Select Buttons */}
        <div className="mb-2 flex items-center justify-center  text-sm text-white  ">
          ENTRY
        </div>

        <div className="  flex  flex-col   items-center justify-center gap-1  text-xs">
          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs?.horse1);
              //setTokenid(BigNumber.from(0));
            }}
            className={`gold-btn block border border-black p-1 text-center text-black ${
              chosenNpc === npcs?.horse1
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-row items-center justify-center ">
              

              <div className="block items-center justify-center">
                {/*
                <Button
                  shape="rounded"
                  size="small"
                  variant="ghost"
                  color="gray"
                  //onClick={() => openDrawer('DRAWER_PREVIEW_NFT')}
                  onClick={() => openDrawer('DRAWER_HORSE_INFO')}
                  className=" !h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
                >
                  <OptionIcon className="relative h-auto w-[18px]" />
                </Button>
                */}

                <Image
                  src={npcs?.media1?.thumbnail || '/horseRace/logo.png'}
                  width={300}
                  height={300}
                  alt="pp"
                  className="  h-[25px] w-[25px] rounded-md xl:h-[40px] xl:w-[40px]"
                />

                <span className=" text-sm font-bold text-sky-500 xl:text-sm">
                  #{npcs?.nft1?.tokenId}
                </span>
              </div>

              {/*
              <span className="text-xs">{npcs?.horse1}</span>
              */}
              {/*
              <span className="text-md font-bold">x{horse1}</span>
              */}
            </div>
          </button>

          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs?.horse2);
              //setTokenid(BigNumber.from(1));
            }}
            className={`gold-btn block border  border-black p-1 text-center  text-black ${
              chosenNpc === npcs?.horse2
                ? 'gold-btn-active '
                : chosenNpc === 0
                ? ''
                : ''
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-row items-center justify-center">

              <div className="block items-center justify-center">
                {/*
                <Button
                  shape="rounded"
                  size="small"
                  variant="ghost"
                  color="gray"
                  //onClick={() => openDrawer('DRAWER_PREVIEW_NFT')}
                  onClick={() => openDrawer('DRAWER_HORSE_INFO')}
                  className=" !h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
                >
                  <OptionIcon className="relative h-auto w-[18px]" />
                </Button>
                */}

                <Image
                  src={npcs?.media2?.thumbnail || '/horseRace/logo.png'}
                  width={300}
                  height={300}
                  alt="pp"
                  className=" h-[25px] w-[25px] rounded-md xl:h-[40px] xl:w-[40px]"
                />

                <span className=" text-sm font-bold text-sky-500 xl:text-sm">
                  #{npcs?.nft2?.tokenId}
                </span>
              </div>
              {/*
              <span className="text-xs">{npcs.horse2}</span>
              */}
              {/*
              <span className="text-md font-bold">x{horse2}</span>
              */}
            </div>
          </button>

          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs?.horse3);
              //setTokenid(BigNumber.from(2));
            }}
            className={`gold-btn block border border-black p-1 text-center text-black ${
              chosenNpc === npcs?.horse3
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-row items-center justify-center">

              <div className="block items-center justify-center">
                {/*
                <Button
                  shape="rounded"
                  size="small"
                  variant="ghost"
                  color="gray"
                  //onClick={() => openDrawer('DRAWER_PREVIEW_NFT')}
                  onClick={() => openDrawer('DRAWER_HORSE_INFO')}
                  className=" !h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
                >
                  <OptionIcon className="relative h-auto w-[18px]" />
                </Button>
                */}

                <Image
                  src={npcs?.media3?.thumbnail || '/horseRace/logo.png'}
                  width={300}
                  height={300}
                  alt="pp"
                  className=" h-[25px] w-[25px] rounded-md xl:h-[40px] xl:w-[40px]"
                />

                <span className=" text-sm font-bold text-sky-500 xl:text-sm">
                  #{npcs?.nft3?.tokenId}
                </span>
              </div>
              {/*
              <span className="text-xs">{npcs?.horse3}</span>
              */}
              {/*
              <span className="text-md font-bold">x{horse3}</span>
              */}
            </div>
          </button>

          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs?.horse4);
              //setTokenid(BigNumber.from(3));
            }}
            className={`gold-btn block border border-black p-1 text-center text-black ${
              chosenNpc === npcs.horse4
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-row items-center justify-center">


              <div className="flex flex-col items-center justify-center">
                {/*
                <Button
                  shape="rounded"
                  size="small"
                  variant="ghost"
                  color="gray"
                  //onClick={() => openDrawer('DRAWER_PREVIEW_NFT')}
                  onClick={() => openDrawer('DRAWER_HORSE_INFO')}
                  className=" !h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
                >
                  <OptionIcon className="relative h-auto w-[18px]" />
                </Button>
                */}

                <Image
                  src={npcs?.media4?.thumbnail || '/horseRace/logo.png'}
                  width={300}
                  height={300}
                  alt="pp"
                  className="  h-[25px] w-[25px] rounded-md xl:h-[40px] xl:w-[40px]"
                />

                <span className=" text-sm font-bold text-sky-500 xl:text-sm">
                  #{npcs?.nft4?.tokenId}
                </span>
              </div>

              {/*
              <span className="text-xs">{npcs?.horse4}</span>
              */}
              {/*
              <span className="text-md font-bold">x{horse4}</span>
              */}
            </div>
          </button>

          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs?.horse5);
              //setTokenid(BigNumber.from(4));
            }}
            className={` gold-btn block border border-black p-1 text-center text-black ${
              chosenNpc === npcs?.horse5
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-row items-center justify-center">


              <div className="block items-center justify-center">
                {/*
                <Button
                  shape="rounded"
                  size="small"
                  variant="ghost"
                  color="gray"
                  //onClick={() => openDrawer('DRAWER_PREVIEW_NFT')}
                  onClick={() => openDrawer('DRAWER_HORSE_INFO')}
                  className=" !h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
                >
                  <OptionIcon className="relative h-auto w-[18px]" />
                </Button>
                */}

                <Image
                  src={npcs?.media5?.thumbnail || '/horseRace/logo.png'}
                  width={300}
                  height={300}
                  alt="pp"
                  className=" h-[25px] w-[25px] rounded-md xl:h-[40px] xl:w-[40px]"
                />

                <span className=" text-sm font-bold text-sky-500 xl:text-sm">
                  #{npcs?.nft5?.tokenId}
                </span>
              </div>

              {/*
              <span className="text-xs">{npcs?.horse5}</span>
              */}
              {/*
              <span className="text-md font-bold">x{horse5}</span>
              */}
            </div>
          </button>


          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs?.horse6);
              //setTokenid(BigNumber.from(4));
            }}
            className={` gold-btn block border border-black p-1 text-center text-black ${
              chosenNpc === npcs?.horse6
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-row items-center justify-center">


              <div className="block items-center justify-center">
                {/*
                <Button
                  shape="rounded"
                  size="small"
                  variant="ghost"
                  color="gray"
                  //onClick={() => openDrawer('DRAWER_PREVIEW_NFT')}
                  onClick={() => openDrawer('DRAWER_HORSE_INFO')}
                  className=" !h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
                >
                  <OptionIcon className="relative h-auto w-[18px]" />
                </Button>
                */}

                <Image
                  src={npcs?.media6?.thumbnail || '/horseRace/logo.png'}
                  width={300}
                  height={300}
                  alt="pp"
                  className="  h-[25px] w-[25px] rounded-md xl:h-[40px] xl:w-[40px]"
                />

                <span className=" text-sm font-bold text-sky-500 xl:text-sm">
                  #{npcs?.nft6?.tokenId}
                </span>
              </div>

              {/*
              <span className="text-xs">{npcs?.horse5}</span>
              */}
              {/*
              <span className="text-md font-bold">x{horse5}</span>
              */}
            </div>
          </button>




          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs?.horse7);
              //setTokenid(BigNumber.from(4));
            }}
            className={` gold-btn block border border-black p-1 text-center text-black ${
              chosenNpc === npcs?.horse7
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-row items-center justify-center">


              <div className="block items-center justify-center">
                {/*
                <Button
                  shape="rounded"
                  size="small"
                  variant="ghost"
                  color="gray"
                  //onClick={() => openDrawer('DRAWER_PREVIEW_NFT')}
                  onClick={() => openDrawer('DRAWER_HORSE_INFO')}
                  className=" !h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
                >
                  <OptionIcon className="relative h-auto w-[18px]" />
                </Button>
                */}

                <Image
                  src={npcs?.media7?.thumbnail || '/horseRace/logo.png'}
                  width={300}
                  height={300}
                  alt="pp"
                  className=" h-[25px] w-[25px] rounded-md xl:h-[40px] xl:w-[40px]"
                />

                <span className=" text-sm font-bold text-sky-500 xl:text-sm">
                  #{npcs?.nft7?.tokenId}
                </span>
              </div>

              {/*
              <span className="text-xs">{npcs?.horse5}</span>
              */}
              {/*
              <span className="text-md font-bold">x{horse5}</span>
              */}
            </div>
          </button>



          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs?.horse8);
              //setTokenid(BigNumber.from(4));
            }}
            className={` gold-btn block border border-black p-1 text-center text-black ${
              chosenNpc === npcs?.horse8
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-row items-center justify-center">

              <div className="block items-center justify-center">
                {/*
                <Button
                  shape="rounded"
                  size="small"
                  variant="ghost"
                  color="gray"
                  //onClick={() => openDrawer('DRAWER_PREVIEW_NFT')}
                  onClick={() => openDrawer('DRAWER_HORSE_INFO')}
                  className=" !h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
                >
                  <OptionIcon className="relative h-auto w-[18px]" />
                </Button>
                */}

                <Image
                  src={npcs?.media8?.thumbnail || '/horseRace/logo.png'}
                  width={300}
                  height={300}
                  alt="pp"
                  className="  h-[25px] w-[25px] rounded-md xl:h-[40px] xl:w-[40px]"
                />

                <span className=" text-sm font-bold text-sky-500 xl:text-sm">
                  #{npcs?.nft8?.tokenId}
                </span>
              </div>

              {/*
              <span className="text-xs">{npcs?.horse5}</span>
              */}
              {/*
              <span className="text-md font-bold">x{horse5}</span>
              */}
            </div>
          </button>


          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs?.horse9);
              //setTokenid(BigNumber.from(4));
            }}
            className={` gold-btn block border border-black p-1 text-center text-black ${
              chosenNpc === npcs?.horse9
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-row items-center justify-center">

              <div className="block items-center justify-center">
                {/*
                <Button
                  shape="rounded"
                  size="small"
                  variant="ghost"
                  color="gray"
                  //onClick={() => openDrawer('DRAWER_PREVIEW_NFT')}
                  onClick={() => openDrawer('DRAWER_HORSE_INFO')}
                  className=" !h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
                >
                  <OptionIcon className="relative h-auto w-[18px]" />
                </Button>
                */}

                <Image
                  src={npcs?.media9?.thumbnail || '/horseRace/logo.png'}
                  width={300}
                  height={300}
                  alt="pp"
                  className=" h-[25px] w-[25px] rounded-md xl:h-[40px] xl:w-[40px]"
                />

                <span className=" text-sm font-bold text-sky-500 xl:text-sm">
                  #{npcs?.nft9?.tokenId}
                </span>
              </div>

              {/*
              <span className="text-xs">{npcs?.horse5}</span>
              */}
              {/*
              <span className="text-md font-bold">x{horse5}</span>
              */}
            </div>
          </button>

          <button
            disabled={placedBet}
            onClick={() => {
              setChosenNpc(npcs?.horse10);
              //setTokenid(BigNumber.from(4));
            }}
            className={` gold-btn block border border-black p-1 text-center text-black ${
              chosenNpc === npcs?.horse10
                ? 'gold-btn-active'
                : chosenNpc === 0
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
          >
            <div className="flex flex-row items-center justify-center">


              <div className="block items-center justify-center">
                {/*
                <Button
                  shape="rounded"
                  size="small"
                  variant="ghost"
                  color="gray"
                  //onClick={() => openDrawer('DRAWER_PREVIEW_NFT')}
                  onClick={() => openDrawer('DRAWER_HORSE_INFO')}
                  className=" !h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
                >
                  <OptionIcon className="relative h-auto w-[18px]" />
                </Button>
                */}

                <Image
                  src={npcs?.media10?.thumbnail || '/horseRace/logo.png'}
                  width={300}
                  height={300}
                  alt="pp"
                  className=" h-[25px] w-[25px] rounded-md xl:h-[40px] xl:w-[40px]"
                />

                <span className=" text-sm font-bold text-sky-500 xl:text-sm">
                  #{npcs?.nft10?.tokenId}
                </span>
              </div>

              {/*
              <span className="text-xs">{npcs?.horse5}</span>
              */}
              {/*
              <span className="text-md font-bold">x{horse5}</span>
              */}
            </div>
          </button>


        </div>
      </div>

      {/*
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
          */}
    </>
  );
  
}
