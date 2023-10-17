import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import ComparisonChart from '@/components/ui/chats/comparison-chart';
import Avatar from '@/components/ui/avatar';
import OverviewChart from '@/components/ui/chats/overview-chart';
import TopPools from '@/components/ui/top-pools';
import TransactionTable from '@/components/transaction/transaction-table';
import WalletCard from '@/components/ui/wallet-card';
import TransactCoin from '@/components/ui/transact-coin';
import PriceFeedSlider from '@/components/ui/live-price-feed';
import { priceFeedData } from '@/data/static/price-feed';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';

//images
import AuthorImage from '@/assets/images/profile.png';

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
} from '@thirdweb-dev/react';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
  stakingContractAddressJockey,
  tokenContractAddressGRD,
} from '../../config/contractAddresses';

import { BigNumber, ethers } from 'ethers';

const topPoolsLimit = (breakpoint: string) => {
  switch (breakpoint) {
    case 'md':
      return 5;
    case '2xl':
      return 5;
    default:
      return 4;
  }
};

export default function MinimalScreen() {
  const [limit, setLimit] = useState(4);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    setLimit(topPoolsLimit(breakpoint));
  }, [breakpoint]);

  const address = useAddress();
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

  return (
    <>
      <NextSeo
        title="Granderby Minimal"
        description="Granderby - Web3 NFT Game"
      />
      <div className="">
        <PriceFeedSlider
          limit={4}
          priceFeeds={priceFeedData}
          gridClassName="grid-cols-1 gap-6 2xl:grid-cols-4"
        />
        <div className="mt-6 grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex items-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark md:col-span-1 md:h-[678px] lg:col-span-5 lg:h-[644px] xl:col-span-3 xl:row-start-1 xl:row-end-2 xl:h-auto 2xl:col-span-3 2xl:h-full 2xl:p-6 3xl:col-span-3 3xl:p-8">
            <div className="w-full">
              <div className="mb-8 h-full">
                {!address ? (
                  <ConnectWallet />
                ) : (
                  <>
                    <Avatar
                      image={AuthorImage}
                      alt="Author"
                      className="mx-auto mb-6"
                      size="lg"
                    />

                    <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                      My Balance
                    </h3>
                    <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                      {/*$10,86,000*/}
                      <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
                    </div>

                    <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                      Claimable Rewards (Horse)
                    </h3>
                    <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                      <b>
                        {!claimableRewardsHorse
                          ? 'Loading...'
                          : ethers.utils.formatUnits(claimableRewardsHorse, 18)}
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
                          : ethers.utils.formatUnits(
                              claimableRewardsJockey,
                              18
                            )}
                      </b>{' '}
                      {tokenBalance?.symbol}
                    </div>
                  </>
                )}
              </div>

              <span className="-mx-6 block border-t border-dashed border-t-gray-200 dark:border-t-gray-700 3xl:-mx-8" />
              <TransactCoin className="mt-6" />
            </div>
          </div>

          <div className=" md:col-span-2 lg:col-span-12 lg:col-start-6 lg:col-end-13 lg:row-start-1 lg:row-end-2 xl:col-start-4 xl:col-end-10 xl:row-start-1 xl:row-end-2 2xl:col-span-8 2xl:col-start-4 2xl:col-end-10 2xl:row-start-1 2xl:row-end-2 3xl:col-span-6 3xl:col-start-4 3xl:col-end-10 3xl:row-start-1 3xl:row-end-2">
            <ComparisonChart />
          </div>

          <div className="md:col-span-2 lg:col-span-6 lg:row-start-2 lg:row-end-3 xl:col-start-10 xl:col-end-13 xl:row-start-1 xl:row-end-2 2xl:col-start-10 2xl:col-end-13 2xl:row-start-1 2xl:row-end-2 3xl:col-span-3 3xl:row-start-1">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              <OverviewChart chartWrapperClass="h-[224px] lg:h-[214px] xl:h-[190px] 2xl:h-[214px] 3xl:h-[268px] 4xl:h-[352px]" />
              <TopPools limit={limit} />
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-full xl:col-start-1 xl:col-end-9 xl:row-start-2 xl:row-end-3 2xl:col-start-1 2xl:col-end-10 2xl:row-start-2 2xl:row-end-3 3xl:col-span-9 3xl:row-start-2 3xl:row-end-3">
            <TransactionTable />
          </div>

          <div className="md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 lg:col-span-6 lg:row-start-2 lg:row-end-3 xl:col-start-9 xl:col-end-13 xl:row-start-2 xl:row-end-3 2xl:col-start-10 2xl:col-end-13 2xl:row-start-2 2xl:row-end-3 3xl:col-span-3 3xl:row-start-2 3xl:row-end-3">
            <WalletCard />
          </div>
        </div>
      </div>
    </>
  );
}
