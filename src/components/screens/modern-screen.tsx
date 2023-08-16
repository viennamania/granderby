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

export default function ModernScreen() {
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

    return () => {
      socketa.disconnect();
    };
  };

  useEffect(() => {
    if (status == false) {
      ////deleteCookie('horse');
    }

    async function getNpcNames() {
      const npcNamesResponse = await fetch(
        `/api/games/horseRace/settings/horseNames?method=all`
      );
      const response = await npcNamesResponse.json();

      ///console.log('getNpcNames response', response);

      //const data = useOwnedNFTs(nftDropContractHorse, address);

      setNpcNames(response.npcNames[0]);

      //npcNames.npcNames[0].nft1
    }

    getNpcNames();
  }, [status]);

  return (
    <div className="mb-10">
      <NextSeo title="Granderby" description="Granderby - Web3 NFT Game" />

      <div className="flex flex-wrap">
        {!address && (
          <>
            <video
              id="intro-video"
              src="/mov/intro.mp4"
              muted
              autoPlay
              className="rounded-lg"
            ></video>
          </>
        )}

        <div className="mt-5 w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[calc(100%-256px)] lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
          {/*
          <AssetSlider coins={assetSlideData} />
        */}

          <LiveNftPricingSlider limits={4} />

          <div className="justify-left mt-5 flex w-full items-center ">
            <Image
              src="/horseRace/racecourse_happy_valley.png"
              alt="raceTrack"
              width={150}
              height={150}
            />

            <Link className="hidden xl:block" href="/live">
              <Image
                src="/horseRace/live.gif"
                alt="live"
                width={100}
                height={100}
              />
            </Link>
          </div>

          <div className="items-top mt-0 flex  w-full flex-row justify-center gap-2  rounded-md border  bg-black  p-2 ">
            {time ? (
              <WalkingAnim time={time} npcSrc={'/npcRace/at.json'} />
            ) : (
              <div className="flex w-full items-center justify-center text-2xl text-white ">
                Loading game...
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col items-center justify-center rounded-lg bg-white p-2 shadow-card dark:bg-light-dark xl:p-8">
            <div className="mb-1 text-center text-lg text-black xl:text-2xl">
              My horses <span className="font-bold text-red-500">RUN</span>, My{' '}
              <span className="font-bold text-blue-500">EARN</span> !{' '}
              <span className="text-block text-xs ">©</span>
            </div>

            <EntryTables
              horse1={horse1Oran}
              horse2={horse2Oran}
              horse3={horse3Oran}
              horse4={horse4Oran}
              horse5={horse5Oran}
              horse6={horse6Oran}
              horse7={horse7Oran}
              horse8={horse8Oran}
              horse9={horse9Oran}
              horse10={horse10Oran}
              //user={user}
              user={null}
              npcs={npcNames}
              //inputs={inputs}
              inputs={null}
              balance={0}
            />
          </div>
          {/*
          <div className="items-top mt-5 flex w-full justify-center ">
            <BetTables npcs={npcNames} />
          </div>
          */}
        </div>

        <div className="mt-3 w-full  sm:w-1/2 md:w-64 lg:w-72 2xl:w-80 3xl:w-[358px]">
          <div className="justify-top flex h-full flex-col items-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark xl:p-8">
            {!address ? (
              <div className="flex flex-col justify-center">
                <ConnectWallet theme="light" />
                <h3> to experience the GRANDERBY service</h3>

                <div className="mt-5 hidden  flex-row items-center justify-center p-5 xl:flex ">
                  <Image
                    src="/horseRace/mobile-app.png"
                    alt="mobile-app"
                    width={300}
                    height={1000}
                    className="rounded-lg"
                  />
                </div>

                <div className="btn-wrap flex w-full flex-col items-center justify-center gap-5">
                  <button className="btn-app ">
                    <Image
                      src={IcoApple}
                      alt="apple"
                      width={300}
                      height={100}
                      className="w-full"
                    />
                    Download App
                  </button>

                  <button className="btn-app ">
                    <Image
                      src={IcoAndroid}
                      alt="android"
                      width={300}
                      height={100}
                      className="w-full"
                    />
                    Download App
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-5 flex flex-row items-center justify-center xl:hidden">
                  <ConnectWallet theme="dark" />
                </div>

                {/*
                <Avatar
                  image={AuthorImage}
                  alt="Author"
                  className="mx-auto mb-6"
                  size="lg"
                />
                */}

                {/*
                <div className="mb-5 flex justify-center">
                  <ConnectWallet theme="dark" />
                </div>
              */}

                <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                  My horses
                </h3>

                <OwnedFeeds />

                {/*
                <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                  My Balance
                </h3>
                <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                  <b>{Number(tokenBalance?.displayValue).toFixed(2)}</b>{' '}
                  {tokenBalance?.symbol}
                </div>


                <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                  Claimable Rewards (Horse)
                </h3>
                <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                  <b>
                    {!claimableRewardsHorse
                      ? 'Loading...'
                      : Number(
                          ethers.utils.formatUnits(claimableRewardsHorse, 18)
                        ).toFixed(2)}
                  </b>{' '}
                  {tokenBalance?.symbol}
                </div>

                <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                  Claimable Rewards (Jockey)
                </h3>
                <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                  <b>
                    {!claimableRewardsJockey
                      ? 'Loading...'
                      : Number(
                          ethers.utils.formatUnits(claimableRewardsJockey, 18)
                        ).toFixed(2)}
                  </b>{' '}
                  {tokenBalance?.symbol}
                </div>
                */}

                {/*
                <TopupButton />
                */}
              </>
            )}
          </div>
        </div>
      </div>

      {/*
      <div className="mt-8 grid gap-6 sm:my-10 md:grid-cols-2">
        <LiquidityChart />
        <VolumeChart />
      </div>

      <div className="my-8 sm:my-10">
        <TopCurrencyTable />
      </div>


      <div className="flex flex-wrap">
        <div
          className={cn(
            'w-full lg:w-[calc(100%-288px)] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]'
          )}
        >
          <TransactionTable />
        </div>
        <div
          className={cn(
            'order-first mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 lg:order-1 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]'
          )}
        >
          <OverviewChart />
          <TopPools />
        </div>
      </div>
          */}
    </div>
  );
}
