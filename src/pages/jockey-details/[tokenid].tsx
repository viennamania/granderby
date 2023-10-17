import NftSinglePrice from '@/components/nft-pricing-table/nft-single-price';

import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import RootLayout from '@/layouts/_root-layout';
import { NextPageWithLayout } from '@/types';
import React, { useEffect, useState } from 'react';

import Head from 'next/head';

import Image from '@/components/ui/image';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import AnchorLink from '@/components/ui/links/anchor-link';
import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';

import NftInfo from '@/components/nft-pricing-table/nft-info';

import { CoinConverter } from '@/components/ui/transact-coin';
import CoinTabs from '@/components/cryptocurrency-pricing-table/coin-tabs';
import TopCoin from '@/components/cryptocurrency-pricing-table/top-coin';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

import InfoDrawer from '@/components/cryptocurrency-pricing-table/info-drawer';

import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';

import { useRouter } from 'next/router';

import Link from 'next/link';

import {
  nftDropContractAddressJockey,
  stakingContractAddressHorseAAA,
} from '@/config/contractAddresses';

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
  useValidDirectListings,
  useNFT,
} from '@thirdweb-dev/react';

import { get } from 'http';
import { set } from 'date-fns';

import { ThirdwebSDK } from '@thirdweb-dev/sdk';

import Button from '@/components/ui/button/button';
import { useModal } from '@/components/modal-views/context';

function SinglePrice(tokenid: any) {
  const [isOpen, setIsOpen] = useState(false);
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  const { openModal } = useModal();

  const router = useRouter();

  const { contract } = useContract(nftDropContractAddressJockey, 'nft-drop');

  const { data: nftMetadata, isLoading } = useNFT(contract, tokenid.tokenid);

  ///console.log('nftMetadata======>', nftMetadata);

  const { contract: contractStaking, isLoading: isLoadingContractStaking } =
    useContract(stakingContractAddressHorseAAA);

  const { data: stakerAddress, isLoading: isLoadingStakerAddress } =
    useContractRead(contractStaking, 'stakerAddress', [
      nftMetadata?.metadata?.id,
    ]);

  const { data: stakeInfo, isLoading: isLoadingStakeInfo } = useContractRead(
    contractStaking,
    'getStakeInfo',
    [stakerAddress]
  );

  const [stakeInfoCount, setStakeInfoCount] = useState<any>(null);

  useEffect(() => {
    if (!stakeInfo) return;

    setStakeInfoCount(stakeInfo?.[0]?.length);
  }, [stakeInfo]);

  const address = useAddress();

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-6 lg:flex-nowrap ">
            <div
              className={`w-full 2xl:w-full 
              ${layout === LAYOUT_OPTIONS.RETRO ? '' : 'lg:w-2/3'}`}
            >
              <div className=" flex flex-col">
                {/* nft title */}

                <div className="items-left  mb-5  w-full flex-col justify-center  lg:hidden xl:hidden">
                  <Link
                    className=" text-left text-lg capitalize text-blue-500 dark:text-white "
                    href={`/jockey`}
                  >
                    {nftMetadata?.metadata?.description}
                  </Link>

                  <div className="mb-3 mt-3 flex w-full flex-row items-center justify-start gap-2.5">
                    <div className="text-left text-2xl font-bold capitalize text-black underline decoration-sky-500 dark:text-white xl:text-3xl">
                      {nftMetadata?.metadata?.name}
                    </div>
                  </div>

                  <div className="mt-2 flex flex-row items-center justify-between  ">
                    <button
                      className=" flex flex-row items-center justify-start "
                      onClick={() =>
                        router.push(
                          `https://polygonscan.com/nft/${nftDropContractAddressJockey}/${nftMetadata?.metadata?.id}`
                        )
                      }
                    >
                      <Image
                        src="/images/logo-polygon.png"
                        alt="gd"
                        width={18}
                        height={18}
                      />

                      <span className="ml-2 text-left text-lg font-bold text-black dark:text-white xl:text-xl">
                        #{nftMetadata?.metadata?.id}
                      </span>
                    </button>

                    <button
                      className="ml-10 flex flex-row items-center justify-start "
                      onClick={() => openModal('SHARE_VIEW')}
                    >
                      {/*
                      <Image
                        src="/images/logo-polygon.png"
                        alt="gd"
                        width={18}
                        height={18}
                      />
                    */}
                      <Twitter className="h-5 w-5" />

                      <span className=" text-left text-lg font-bold text-black dark:text-white xl:text-xl">
                        share
                      </span>
                    </button>
                  </div>

                  {/* owned by */}
                  <div className="mt-5 flex w-full items-center justify-start  gap-4 ">
                    {isLoadingStakerAddress ? (
                      <div className="text-sm font-bold xl:text-lg">
                        <b>Loading Owner...</b>
                      </div>
                    ) : (
                      <>
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
                                <button
                                  className=" flex flex-row items-center justify-start  "
                                  onClick={() =>
                                    router.push(
                                      `/user-asset/${nftMetadata?.owner}`
                                    )
                                  }
                                >
                                  <span>
                                    {nftMetadata?.owner?.substring(0, 10)}...
                                  </span>
                                  {/*
                                {stakeInfoCount && stakeInfoCount > 1 && (
                                  <span className="text-xs text-gray-400">
                                    +{stakeInfoCount - 1}
                                  </span>
                                )}
                                */}
                                </button>
                              )}
                            </>
                          ) : (
                            <>
                              {stakerAddress && stakerAddress === address ? (
                                <div className="text-xl font-bold text-blue-600">
                                  Me
                                </div>
                              ) : (
                                <button
                                  className=" flex flex-row items-center justify-start  "
                                  onClick={() =>
                                    router.push(`/user-asset/${stakerAddress}`)
                                  }
                                >
                                  <span>
                                    {stakerAddress?.substring(0, 10)}...
                                  </span>
                                  Registered
                                  {/*
                                {stakeInfoCount && stakeInfoCount > 1 && (
                                  <span className="text-xs text-gray-400">
                                    +{stakeInfoCount - 1}
                                  </span>
                                )}
                                */}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* end of nft title */}

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

                <NftSinglePrice
                  //tokenid={tokenid.tokenid}
                  nftMetadata={nftMetadata}
                  contractAddress={nftDropContractAddressJockey}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              </div>
            </div>

            {layout === LAYOUT_OPTIONS.RETRO ? (
              <InfoDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : (
              <div className=" flex w-full flex-col">
                <div className="items-left hidden w-full flex-col justify-center lg:flex xl:flex  ">
                  <Link
                    className=" text-left text-sm font-bold text-blue-500  dark:text-white xl:text-lg "
                    href={`/jockey`}
                  >
                    {nftMetadata?.metadata?.description}
                    {/*Granderby Horse NFT*/}
                  </Link>

                  <div className="mb-3 mt-3 flex w-full flex-row items-center justify-start gap-2.5">
                    <div className="text-left text-2xl font-bold capitalize text-black underline decoration-sky-500 dark:text-white xl:text-4xl">
                      {nftMetadata?.metadata?.name}
                    </div>
                  </div>

                  <div className="mr-5 mt-2 flex flex-row items-center justify-between ">
                    <button
                      className=" flex flex-row items-center justify-start  "
                      onClick={() =>
                        router.push(
                          `https://polygonscan.com/nft/${nftDropContractAddressJockey}/${nftMetadata?.metadata?.id}`
                        )
                      }
                    >
                      <Image
                        src="/images/logo-polygon.png"
                        alt="gd"
                        width={18}
                        height={18}
                      />

                      <span className="ml-2 text-left text-lg font-bold text-black dark:text-white xl:text-xl">
                        #{nftMetadata?.metadata?.id}
                      </span>
                    </button>

                    <button
                      className="ml-10 flex flex-row items-center justify-start "
                      onClick={() => openModal('SHARE_VIEW')}
                    >
                      {/*
                      <Image
                        src={"/images/logo-polygon.png"}
                        alt="gd"
                        width={18}
                        height={18}
                      />
                      */}
                      <Twitter className="h-5 w-5" />

                      <span className="text-left text-lg font-bold text-black dark:text-white xl:text-xl">
                        Share
                      </span>
                    </button>
                  </div>

                  {/* owned by */}
                  <div className="mt-10 flex w-full items-center justify-start  gap-4 ">
                    {isLoadingStakerAddress ? (
                      <div className="text-sm font-bold xl:text-lg">
                        <b>Loading Owner...</b>
                      </div>
                    ) : (
                      <>
                        <div className="flex w-[140px] items-center justify-start text-sm tracking-wider text-[#6B7280] ">
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
                                <button
                                  className=" flex flex-row items-center justify-start  "
                                  onClick={() =>
                                    router.push(
                                      `/user-asset/${nftMetadata?.owner}`
                                    )
                                  }
                                >
                                  <span>
                                    {nftMetadata?.owner?.substring(0, 10)}...
                                  </span>
                                  {/*
                                {stakeInfoCount && stakeInfoCount > 1 && (
                                  <span className="text-xs text-gray-400">
                                    +{stakeInfoCount - 1}
                                  </span>
                                )}
                                */}
                                </button>
                              )}
                            </>
                          ) : (
                            <>
                              {stakerAddress && stakerAddress === address ? (
                                <div className="text-xl font-bold text-blue-600">
                                  Me
                                </div>
                              ) : (
                                <button
                                  className=" flex flex-row items-center justify-start  "
                                  onClick={() =>
                                    router.push(`/user-asset/${stakerAddress}`)
                                  }
                                >
                                  <span>
                                    {stakerAddress?.substring(0, 10)}...
                                  </span>
                                  Registered
                                  {/*stakeInfoCount && stakeInfoCount > 1 && (
                                  <span className="text-xs text-gray-400">
                                    +{stakeInfoCount - 1}
                                  </span>
                                )*/}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-10 w-full rounded-lg bg-white  shadow-card dark:bg-light-dark ">
                  {/*
                  <h2 className="px-8 text-base font-medium uppercase text-gray-700 dark:text-gray-200">
                    NFT Info
                  </h2>
                  */}

                  <NftInfo nftMetadata={nftMetadata} />

                  {/*
                  <div>
                    <span className="block border-t border-dashed border-t-gray-200 dark:border-t-gray-700" />
                    <CoinConverter />
                  </div>
                  */}

                  {/*
                  <div className="px-8 pb-10">
                    <h2 className="text-base font-medium uppercase text-gray-700 dark:text-gray-200">
                      Top Coins
                    </h2>
                    <TopCoin />
                  </div>
                  */}
                </div>
              </div>
            )}
          </div>

          <div className="mt-0">
            {/*
            <TransactionTable />
          */}

            {/*
        <HistoryTable />
        */}
          </div>

          {/*
      <div className="mt-10">
        <CoinTabs />
      </div> 
      */}
        </>
      )}

      {/* delete footer */}
    </>
  );
}

//// GetStaticPaths

export async function getStaticPaths() {
  return {
    paths: [{ params: { tokenid: '1' } }],
    fallback: true,

    /*
    paths: [
      { params: { tokenid: '1' } },
      { params: { tokenid: '2' } },
      { params: { tokenid: '3' } },
      { params: { tokenid: '4' } },
      { params: { tokenid: '5' } },
      { params: { tokenid: '6' } },
      { params: { tokenid: '7' } },
    ],
    fallback: true,
    
    */
  };
}

export async function getStaticProps(context: any) {
  ////export const getStaticProps: GetStaticProps = async (context: any) => {

  const tokenid: string = context.params?.tokenid;

  return {
    props: {
      tokenid: tokenid,
    },
  };
}

const AssetSinglePrice: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { tokenid } = props;

  return (
    <>
      <SinglePrice tokenid={tokenid} />
    </>
  );
};

AssetSinglePrice.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export default AssetSinglePrice;
