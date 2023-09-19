import cn from 'classnames';
import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';

import CoinSlider from '@/components/ui/coin-card';
import AssetSlider from '@/components/ui/asset-card';

import OverviewChart from '@/components/ui/chats/overview-chart';
import LiquidityChart from '@/components/ui/chats/liquidity-chart';
import VolumeChart from '@/components/ui/chats/volume-chart';
import TopPools from '@/components/ui/top-pools';
import TransactionTable from '@/components/transaction/transaction-table';
import TopCurrencyTable from '@/components/top-currency/currency-table';

import { coinSlideData } from '@/data/static/coin-slide-data';
import { assetSlideData } from '@/data/static/asset-slide-data';

import Avatar from '@/components/ui/avatar';
import TopupButton from '@/components/ui/topup-button';

import Image from '@/components/ui/image';
import IcoApple from '@/assets-landing/images/ico-apple.svg';
import IcoAndroid from '@/assets-landing/images/ico-android.svg';

//images
import AuthorImage from '@/assets/images/author.jpg';

import WalkingAnim from '@/components/horseRace/watchScreen/walkingAnim';

//import BetInputs from '@/components/horseRace/watchScreen/betInputsGranderby';

import EntryTables from '@/components/horseRace/watchScreen/entryTables';

import BetTables from '@/components/horseRace/watchScreen/betTablesGranderby';

//@ts-ignore
import { Socket, io } from 'socket.io-client';

import LastWinners from '@/components/horseRace/watchScreen/lastWinnersGranderby';

import OwnedFeeds from '@/components/search/feeds-horse-owned-widget';
//import OwnedFeeds from '@/components/search/feeds-horse-owned';

import {
  ConnectWallet,
  useDisconnect,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
  usePaperWalletUserEmail,
} from '@thirdweb-dev/react';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
  stakingContractAddressJockey,
  tokenContractAddressGRD,
} from '@/config/contractAddresses';

import { BigNumber, ethers } from 'ethers';

import LiveNftPricingSlider from '@/components/ui/live-nft-horse-pricing-slider';

import LivePricingSliderRetro from '@/components/ui/live-pricing-slider-retro';
import Link from 'next/link';

import { IHorseGame } from '@/utils/horseRace/interfaces/horseGame';

import CollapseIntroVideo from '@/components/ui/collapse-intro-video';
import CollapseLivePricing from '@/components/ui/collapse-live-pricing';
import CollapseLastWinners from '@/components/ui/collapse-last-winners';
import CollapseCurrentEvent from '@/components/ui/collapse-current-event';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';

import CryptoCurrencyPricingSkeleton from '@/components/ui/skeleton/CryptoCurrencyPricingSkeleton';

import toast from 'react-hot-toast';

export default function IntroScreen() {
  const address = useAddress();

  /////const emailQuery = usePaperWalletUserEmail();

  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  const [claimableRewardsHorse, setClaimableRewardsHorse] =
    useState<BigNumber>();
  const [claimableRewardsJockey, setClaimableRewardsJockey] =
    useState<BigNumber>();

  const { contract: stakingContractHorse, isLoading: isLoadingHorse } =
    useContract(stakingContractAddressHorseAAA);

  const { contract: stakingContractJockey, isLoading: isLoadingJockey } =
    useContract(stakingContractAddressJockey);

  useEffect(() => {
    if (!stakingContractHorse || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await stakingContractHorse?.call('getStakeInfo', [
        address,
      ]);
      ////const stakeInfo = await contract?.call("getStakeInfo", );
      setClaimableRewardsHorse(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, stakingContractHorse]);

  useEffect(() => {
    if (!stakingContractJockey || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await stakingContractJockey?.call('getStakeInfo', [
        address,
      ]);
      ////const stakeInfo = await contract?.call("getStakeInfo", );
      setClaimableRewardsJockey(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, stakingContractJockey]);

  const [npcNames, setNpcNames] = useState<any>([]);

  const [horse1Oran, setHorse1Oran] = useState<any>([]);
  const [horse2Oran, setHorse2Oran] = useState<any>([]);
  const [horse3Oran, setHorse3Oran] = useState<any>([]);
  const [horse4Oran, setHorse4Oran] = useState<any>([]);
  const [horse5Oran, setHorse5Oran] = useState<any>([]);
  const [horse6Oran, setHorse6Oran] = useState<any>([]);
  const [horse7Oran, setHorse7Oran] = useState<any>([]);
  const [horse8Oran, setHorse8Oran] = useState<any>([]);
  const [horse9Oran, setHorse9Oran] = useState<any>([]);
  const [horse10Oran, setHorse10Oran] = useState<any>([]);

  const [socket, setSocket] = useState<Socket | null>(null);

  const [status, setStatus] = useState<any>();
  const [time, setTime] = useState<any>(0);

  const [horses, setHorses] = useState<any>([]);

  const [progress1, setProgress1] = useState<any>(0);
  const [progress2, setProgress2] = useState<any>(0);
  const [progress3, setProgress3] = useState<any>(0);
  const [progress4, setProgress4] = useState<any>(0);
  const [progress5, setProgress5] = useState<any>(0);

  const [selectedHorse, setSelectedHorse] = useState<any>(null);

  const [games, setGames] = useState<any>();
  const [betAmountTotal, setBetAmountTotal] = useState<any>(0);

  const [betAmount1, setBetAmount1] = useState<any>(0);
  const [betAmount2, setBetAmount2] = useState<any>(0);
  const [betAmount3, setBetAmount3] = useState<any>(0);
  const [betAmount4, setBetAmount4] = useState<any>(0);
  const [betAmount5, setBetAmount5] = useState<any>(0);
  const [betAmount6, setBetAmount6] = useState<any>(0);
  const [betAmount7, setBetAmount7] = useState<any>(0);
  const [betAmount8, setBetAmount8] = useState<any>(0);
  const [betAmount9, setBetAmount9] = useState<any>(0);
  const [betAmount10, setBetAmount10] = useState<any>(0);

  setTimeout(() => {
    setHorses([
      {
        id: 1,
        progress: progress1,
        name: `${npcNames.horse1}`,
        nft: `${npcNames.nft1?.tokenId}`,
        media: `${
          npcNames.media1?.thumbnail ||
          //'/images/logo.png'
          `/horseRace/${npcNames.nft1?.contract}.png`
        }`,
      },
      {
        id: 2,
        progress: progress2,
        name: `${npcNames.horse2}`,
        nft: `${npcNames.nft2?.tokenId}`,
        media: `${
          npcNames.media2?.thumbnail ||
          //'/images/logo.png'
          `/horseRace/${npcNames.nft2?.contract}.png`
        }`,
      },
      {
        id: 3,
        progress: progress3,
        name: `${npcNames.horse3}`,
        nft: `${npcNames.nft3?.tokenId}`,
        media: `${
          npcNames.media3?.thumbnail ||
          //'/images/logo.png'
          `/horseRace/${npcNames.nft3?.contract}.png`
        }`,
      },
      {
        id: 4,
        progress: progress4,
        name: `${npcNames.horse4}`,
        nft: `${npcNames.nft4?.tokenId}`,
        media: `${
          npcNames.media4?.thumbnail ||
          //'/images/logo.png'
          `/horseRace/${npcNames.nft4?.contract}.png`
        }`,
      },
      {
        id: 5,
        progress: progress5,
        name: `${npcNames.horse5}`,
        nft: `${npcNames.nft5?.tokenId}`,
        media: `${
          npcNames.media5?.thumbnail ||
          //'/images/logo.png'
          `/horseRace/${npcNames.nft5?.contract}.png`
        }`,
      },
    ]);
  }, 40);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = () => {
    ///console.log("snailRace socketInitializer socket", socket);

    if (socket) return;

    const socketa = io(process.env.NEXT_PUBLIC_HORSE_RACE_SOCKET_URL as string);

    setSocket(socketa);

    socketa.on('status', (data: any) => {
      console.log('socket status======', data);

      setStatus(data);
    });

    socketa.on('time', (data: any) => {
      setTime(data);
    });

    socketa.on('horse1Rate', (data: any) => {
      setHorse1Oran(data);
    });
    socketa.on('horse2Rate', (data: any) => {
      setHorse2Oran(data);
    });
    socketa.on('horse3Rate', (data: any) => {
      setHorse3Oran(data);
    });
    socketa.on('horse4Rate', (data: any) => {
      setHorse4Oran(data);
    });
    socketa.on('horse5Rate', (data: any) => {
      setHorse5Oran(data);
    });
    socketa.on('horse6Rate', (data: any) => {
      setHorse6Oran(data);
    });
    socketa.on('horse7Rate', (data: any) => {
      setHorse7Oran(data);
    });
    socketa.on('horse8Rate', (data: any) => {
      setHorse8Oran(data);
    });
    socketa.on('horse9Rate', (data: any) => {
      setHorse9Oran(data);
    });
    socketa.on('horse10Rate', (data: any) => {
      setHorse10Oran(data);
    });

    /*
    socketa.on('flag', (data: any) => {
      setFlag(data);
    });
    */

    socketa.on('horse1', (data: any) => {
      setProgress1(data);
    });

    socketa.on('horse2', (data: any) => {
      setProgress2(data);
    });

    socketa.on('horse3', (data: any) => {
      setProgress3(data);
    });

    socketa.on('horse4', (data: any) => {
      setProgress4(data);
    });

    socketa.on('horse5', (data: any) => {
      setProgress5(data);
    });

    return () => {
      socketa.disconnect();
    };
  };

  useEffect(() => {
    if (status === false) {
      ////deleteCookie('horse');
      //toast.success('status false')
    }

    async function getNpcNames() {
      const npcNamesResponse = await fetch(
        `/api/games/horseRace/settings/horseNames?method=all`
      );
      const response = await npcNamesResponse.json();

      //console.log('getNpcNames response.npcNames[0]', response.npcNames[0]);

      //const data = useOwnedNFTs(nftDropContractHorse, address);

      setNpcNames(response.npcNames[0]);
    }

    getNpcNames();
  }, [status]);

  const getGames = async () => {
    const res = await fetch('/api/games/horseRace/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'getGames',
      }),
    });
    const data = await res.json();

    ////console.log("getGames data====", data);

    setGames(data.games);

    setBetAmountTotal(0);

    setBetAmount1(0);
    setBetAmount2(0);
    setBetAmount3(0);
    setBetAmount4(0);
    setBetAmount5(0);
    setBetAmount6(0);
    setBetAmount7(0);
    setBetAmount8(0);
    setBetAmount9(0);
    setBetAmount10(0);

    games?.map((game: IHorseGame, i: number) => {
      if (game.selectedSide === npcNames.horse1) {
        setBetAmount1((prev: any) => prev + game.betAmount);

        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse2) {
        setBetAmount2((prev: any) => prev + game.betAmount);

        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse3) {
        setBetAmount3((prev: any) => prev + game.betAmount);

        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse4) {
        setBetAmount4((prev: any) => prev + game.betAmount);

        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse5) {
        setBetAmount5((prev: any) => prev + game.betAmount);

        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse6) {
        setBetAmount6((prev: any) => prev + game.betAmount);
        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse7) {
        setBetAmount7((prev: any) => prev + game.betAmount);
        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse8) {
        setBetAmount8((prev: any) => prev + game.betAmount);
        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse9) {
        setBetAmount9((prev: any) => prev + game.betAmount);
        setBetAmountTotal((prev: any) => prev + game.betAmount);
      } else if (game.selectedSide === npcNames.horse10) {
        setBetAmount10((prev: any) => prev + game.betAmount);
        setBetAmountTotal((prev: any) => prev + game.betAmount);
      }
    });
  };

  useEffect(() => {
    //getGames();

    const interval = setInterval(() => {
      getGames();
    }, 10000);

    //return () => clearInterval(interval);
  }, []);

  /*
  useEffect(() => {
    if (status === true) {
      console.log('status true====', status);

      setBetAmountTotal(0);

      setBetAmount1(0);
      setBetAmount2(0);
      setBetAmount3(0);
      setBetAmount4(0);
      setBetAmount5(0);
      setBetAmount6(0);
      setBetAmount7(0);
      setBetAmount8(0);
      setBetAmount9(0);
      setBetAmount10(0);
    }
  }, [status]);
  */

  return (
    <div className="mb-10">
      <NextSeo title="Granderby" description="Granderby - Web3 NFT Game" />

      <div className="mb-20 flex flex-wrap">
        {!address && (
          <CollapseIntroVideo label="Introduction" initialOpen={true}>
            <video
              id="intro-video"
              src="/mov/intro.mp4"
              muted
              autoPlay
              className="rounded-lg"
            ></video>
          </CollapseIntroVideo>
        )}
      </div>
    </div>
  );
}
