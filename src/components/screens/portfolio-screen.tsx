import cn from 'classnames';
import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';

import CoinSlider from '@/components/ui/coin-card';
import AssetSlider from '@/components/ui/asset-card';

import PortfolioChart from '@/components/ui/chats/portfolio-chart';

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

import TransferHistoryTable from '@/components/nft-transaction/user-transfer-history-table';

import RaceHistoryTable from '@/components/nft-transaction/race-history-table';

import OwnedFeedsCoin from '@/components/search/feeds-coin-owned-asset';

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
  tokenContractAddressHV,
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

import Collapse from '@/components/ui/collapse';

import CollapsePortfolio from '@/components/ui/collapse-portfolio';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';

import CryptoCurrencyPricingSkeleton from '@/components/ui/skeleton/CryptoCurrencyPricingSkeleton';

import toast from 'react-hot-toast';
//import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Button from '@/components/ui/button';
import AnchorLink from '@/components/ui/links/anchor-link';
import { InfoIcon } from '@/components/icons/info-icon';
import { LongArrowRight } from '@/components/icons/long-arrow-right';

import { useRouter } from 'next/router';
import { add } from 'lodash';

export default function PortfolioScreen() {
  const address = useAddress();

  const router = useRouter();

  /////const emailQuery = usePaperWalletUserEmail();

  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  const { contract: tokenContractHV } = useContract(
    tokenContractAddressHV,
    'token'
  );
  const { data: tokenBalanceHV } = useTokenBalance(tokenContractHV, address);

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

  const [horsesCount, setHorsesCount] = useState<any>(0);
  const [jockeysCount, setJockeysCount] = useState<any>(0);

  useEffect(() => {
    async function getHorsesCount() {
      if (!address) return;

      const response = await fetch('/api/nft/getHorsesCount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'getAllByHolder',
          holder: address,
          ///grades: selectedGradesStorage,
          grades: [],
          manes: [],
        }),
      });
      const data = await response.json();

      console.log('getHorsesCount data====', data);

      setHorsesCount(data.total);
    }

    async function getJockeysCount() {
      //console.log("getJokeysCount address====", address);

      if (!address) return;

      const response = await fetch('/api/nft/getJockeysCount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'getAllByHolder',
          holder: address,
          ///grades: selectedGradesStorage,
          grades: [],
          manes: [],
        }),
      });
      const data = await response.json();

      ///console.log('getJockeysCount data====', data);

      setJockeysCount(data.total);
    }

    getHorsesCount();
    getJockeysCount();
  }, [address]);

  const limit = 500;

  return (
    <div className="mb-10">
      <NextSeo title="Granderby" description="Granderby - Web3 NFT Game" />

      <div className="mb-20 flex flex-wrap items-center justify-center">
        {/*
        <div className="  mt-3 w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[calc(100%-256px)] lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
        */}

        {/*
          <AssetSlider coins={assetSlideData} />
          */}

        {address ? (
          <div className=" flex flex-col rounded-lg border"></div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            {/*
            <Image src="/images/logo.png" alt="logo" width={300} height={300} />

            <div className="text-2xl font-bold xl:text-4xl">NFT GRANDERBY</div>
            <div className="items-center justify-center p-2 text-xl xl:text-2xl">
              NFT horse racing game where you can experience all the fun of
              horse racing
            </div>

            <Button
              shape="rounded"
              color="success"
              onClick={() => {
                router.push('/intro');
              }}
            >
              <div className="text-2xl">GAME INTRODUCTION</div>
            </Button>
            */}
          </div>
        )}

        {/*
        <div className="mt-10 flex w-full flex-col rounded-lg border">
          <Collapse label="Performance" initialOpen={true}>
            {address ? (
              <div className="flex h-[490px] flex-col items-center justify-center p-5">
                <LiveNftPricingSlider limits={2} />

              </div>
            ) : (
              <></>
            )}
          </Collapse>
        </div>
            */}

        <div className="mt-10 flex w-full flex-col rounded-lg border">
          <div className="m-5 flex flex-col">
            <span className="mb-5 text-2xl font-bold">Performance</span>
            <PortfolioChart />
          </div>
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-5 xl:grid-cols-2 ">
          <div className=" flex flex-col rounded-lg border p-5">
            <span className=" text-2xl font-bold">Assets</span>

            {address ? (
              <div className="mt-5 flex flex-col items-start justify-center gap-5">
                <div className="flex w-full flex-row items-center justify-center rounded-lg border p-5">
                  <OwnedFeedsCoin
                  //contractAddress={nftDropContractAddressHorseZedRun}
                  />
                </div>

                <div className="grid w-full grid-cols-3 items-center justify-center gap-1">
                  {/*
          <button

            className={`gold-btn flex  flex-row items-center justify-center gap-2   border-none p-2 text-center text-black ${
              limit === 0
                ? 'gold-btn-active'
                : limit === 1000
                ? 'bg-[#ffc000]'
                : 'bg-transparent'
            } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
            ///onClick={(e) => router.push('/coin/usdc')}
            onClick={() => {
              router.push('https://granderby.market');
              ///router.push('/horse-details/' + nft?.metadata?.id);
            }}
          >
            <Image
              src="/images/market.png"
              alt="market"
              width={25}
              height={20}
            />
 

            <span>GRANDERBY MARKET</span>

            <ChevronForward className=" rtl:rotate-180" />
          </button>
          */}

                  <button
                    className={`gold-btn flex  flex-row items-center justify-center gap-2  rounded-lg border  p-2 text-center text-black ${'bg-transparent'} disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
                    ///onClick={(e) => router.push('/coin/usdc')}
                    onClick={() => {
                      router.push('/my-asset');
                      ///router.push('/horse-details/' + nft?.metadata?.id);
                    }}
                  >
                    <div className="flex flex-col items-center justify-center gap-5">
                      <span className="text-lg">Horse</span>
                      <span className="text-xl font-bold xl:text-2xl">
                        {horsesCount}
                      </span>
                    </div>
                    <Image
                      src="/images/button/horse.png"
                      alt="logo"
                      width={25}
                      height={25}
                    />
                  </button>

                  <button
                    className={`gold-btn flex  flex-row items-center justify-center gap-2  rounded-lg border  p-2 text-center text-black ${'bg-transparent'} disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
                    ///onClick={(e) => router.push('/coin/usdc')}
                    onClick={() => {
                      router.push('/my-asset');
                      ///router.push('/horse-details/' + nft?.metadata?.id);
                    }}
                  >
                    <div className="flex flex-col items-center justify-center gap-5">
                      <span className="text-lg">Jockey</span>
                      <span className="text-xl font-bold xl:text-2xl">
                        {jockeysCount}
                      </span>
                    </div>
                    <Image
                      src="/images/button/jockey.png"
                      alt="logo"
                      width={25}
                      height={25}
                    />
                  </button>

                  <button
                    className={`gold-btn flex  flex-row items-center justify-center gap-2  rounded-lg border  p-2 text-center text-black ${'bg-transparent'} disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
                    ///onClick={(e) => router.push('/coin/usdc')}
                    onClick={() => {
                      router.push('/my-asset');
                      ///router.push('/horse-details/' + nft?.metadata?.id);
                    }}
                  >
                    <div className="flex flex-col items-center justify-center gap-5">
                      <span className="text-lg">Track</span>
                      <span className="text-xl font-bold xl:text-2xl">
                        {Number(tokenBalanceHV?.displayValue).toFixed(0)}
                      </span>
                    </div>
                    <Image
                      src="/images/button/track.png"
                      alt="logo"
                      width={25}
                      height={25}
                    />
                  </button>
                </div>
              </div>
            ) : (
              <> </>
            )}

            {/*
            <Collapse label="Assets" initialOpen={true} >
              <div className="flex h-[490px] flex-col items-center justify-start p-5">
                <div>
                  {horsesCount} horses
                </div>

                <div className="mb-5 flex h-full flex-row  items-end justify-center">
                  <Button
                    shape="rounded"
                    color="success"
                    onClick={() => {
                      router.push('/buy-horse');
                    }}
                  >
                    <div className="text-2xl">BUY NOW</div>
                  </Button>
                </div>
              </div>

            </Collapse>
            */}

            {/*
              <Collapse label="Live Pricing" initialOpen={true}>
                <div className="m-5 p-5">


                  <CryptoCurrencyPricingSkeleton />

                </div>
              </Collapse>
              */}
          </div>

          <div className=" flex flex-col rounded-lg border p-5">
            <span className=" text-2xl font-bold">History</span>

            {address ? <TransferHistoryTable address={address} /> : <> </>}
          </div>

          <div className="items-top mt-5 flex w-full justify-center ">
            {/*
              <BetTables npcs={npcNames} />
              */}

            {/*
              <div className="mb-2 flex w-full items-center justify-center rounded-lg text-3xl font-bold text-yellow-500">
                Total bet: {betAmountTotal}
              </div>
              */}
          </div>
        </div>
      </div>

      {/*
      <div className=" flex flex-col rounded-lg border p-5">
        <span className=" text-2xl font-bold">Race Schedule</span>

        {address ? <RaceHistoryTable tokenId={undefined} /> : <></>}
      </div>
      */}

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

      {/*
      <div className="mt-10 flex flex-wrap">
        <div className="w-full lg:w-[calc(100%-288px)] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
          <TransactionTable />
        </div>
        <div className="order-first mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 lg:order-1 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]">
          <OverviewChart />
          <TopPools />
        </div>

      </div>
          */}
    </div>
  );
}
