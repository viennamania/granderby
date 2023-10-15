import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import RootLayout from '@/layouts/_root-layout';
import { NextPageWithLayout } from '@/types';
import React, { use, useEffect, useState } from 'react';

import Head from 'next/head';

import Image from '@/components/ui/image';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import AnchorLink from '@/components/ui/links/anchor-link';
import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';

import NftSinglePrice from '@/components/nft-pricing-table/nft-single-price';
import NftInfo from '@/components/nft-pricing-table/my-nft-info';

import { CoinConverter } from '@/components/ui/transact-coin';
import CoinTabs from '@/components/cryptocurrency-pricing-table/coin-tabs';
import TopCoin from '@/components/cryptocurrency-pricing-table/top-coin';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

import InfoDrawer from '@/components/cryptocurrency-pricing-table/info-drawer';

import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';

import HistoryTable from '@/components/race-history/history-table';

import TransactionTable from '@/components/nft-transaction/transaction-table';

import { useRouter } from 'next/router';

import Link from 'next/link';

import {
  nftDropContractAddressHorse,
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

function SinglePrice(tokenid: any) {
  const address = useAddress();

  const [isOpen, setIsOpen] = useState(false);
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  const { contract } = useContract(nftDropContractAddressHorse, 'nft-drop');

  /*
  const { data: nftMetadata, isLoading: isLoadingUseNFT } = useNFT(
    contract,
    tokenid.tokenid
  );
  */

  const [isLoadingNFT, setIsLoadingNFT] = useState(true);

  const [searchDataHorse, setSearchDataHorse] = useState<any>();

  const [nftMetadata, setNftMetadata] = useState<any>();

  useEffect(() => {
    async function getHorse() {
      setIsLoadingNFT(true);

      const data = await fetch(
        'https://granderby.io/api/nft/horse/' + tokenid.tokenid,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        }
      ).then((result) => {
        return result.json();
      });

      //console.log('horse-details-owned data', data);

      setSearchDataHorse(data);

      setNftMetadata(data);

      setIsLoadingNFT(false);
    }

    getHorse();
  }, [tokenid]);

  ///console.log('nftMetadata======>', nftMetadata);

  const { contract: contractStaking, isLoading: isLoadingContractStaking } =
    useContract(stakingContractAddressHorseAAA);

  const { data: stakerAddress, isLoading: isLoadingStakerAddress } =
    useContractRead(contractStaking, 'stakerAddress', [tokenid.tokenid]);

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

  if (isLoadingNFT)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );

  if (!address)
    return (
      <div className="flex h-screen items-center justify-center">
        <ConnectWallet
          /*
        theme={
          lightTheme({
            fontFamily: 'Inter, sans-serif',
            colors: {
              //modalBg: "#000000",
              modalBg: '#ffffff',
              accentText: 'green',
              

              // ... etc
            },
          }),
        }
        */
          theme="light"
          welcomeScreen={() => {
            ////return <LiveNftPricingSlider limits={2} />;
            /*
          return (
            <NftSinglePrice
              //tokenid={tokenid.tokenid}
              nftMetadata={nftMetadata}
              contractAddress={nftDropContractAddressHorse}
              isOpen={isOpenWelcome}
              setIsOpen={setIsOpenWelcome}
            />
          );
          */
            /*
          return (

            <div className=' m-10 flex items-center justify-center'>
              <CollapseLastWinners label="Last Race Winners">
                <div className="h-96">
                  <LastWinners npcs={npcNames} status={0} />
                </div>
              </CollapseLastWinners>
            </div>
          )
          */

            return (
              <div className=" mt-10 flex flex-col items-center justify-center p-20">
                {/*
              <div>Last Race Winner</div>

              <LastWinners npcs={npcNames} status={0} />
              */}

                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={300}
                  height={300}
                />
              </div>
            );
          }}
          btnTitle="Login"
        />
      </div>
    );

  {
    /*
  if (address && address !== nftMetadata?.owner)
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-center text-3xl font-bold">
          You do not own this NFT.
        </div>

        <div className="text-center text-2xl font-bold">
          <Link className="text-blue-500 underline" href={`/my-asset`}>
            Go to My NFT
          </Link>
        </div>
      </div>
    );
    */
  }

  return (
    <>
      {isLoadingNFT ? (
        <div className="flex h-screen items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-6 lg:flex-nowrap ">
            <div
              className={`w-full 2xl:w-full 
                
              `}
            >
              <div className=" flex flex-col">
                {/* nft title */}

                <div className="items-left  mb-5  w-full flex-col justify-center  lg:hidden xl:hidden">
                  <Link
                    className=" text-left text-lg font-bold text-blue-500  dark:text-white xl:text-xl "
                    href={`/my-asset`}
                  >
                    My NFT
                  </Link>

                  <div className="mb-3 mt-3 flex w-full flex-row items-center justify-start gap-2.5">
                    <div className="text-left text-2xl font-bold capitalize text-black underline decoration-sky-500 dark:text-white xl:text-3xl">
                      {nftMetadata?.name}
                    </div>
                  </div>

                  <div className="mt-2 flex flex-row items-center justify-start ">
                    <Image
                      src="/images/logo-polygon.png"
                      alt="gd"
                      width={18}
                      height={18}
                    />

                    <span className="ml-2 text-left text-lg font-bold text-black dark:text-white xl:text-xl">
                      #{nftMetadata?.id}
                    </span>
                  </div>

                  {/* owned by */}

                  {isLoadingStakerAddress ? (
                    <div className="mt-0 flex flex-col items-center justify-center gap-5 p-3">
                      <div className="text-sm font-bold xl:text-lg">
                        <b>Loading Owner...</b>
                      </div>
                    </div>
                  ) : (
                    <div className=" flex w-full items-center justify-start  gap-4 ">
                      {/*
                      
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

                      */}
                    </div>
                  )}
                </div>

                {/* end of nft title */}

                <div className="relative">
                  <Image
                    src={
                      nftMetadata?.image
                        ? nftMetadata?.image
                        : '/default-nft.png'
                    }
                    alt="nft"
                    width={1024}
                    height={1024}
                    className=" m-3 rounded-lg"
                  />

                  <Image
                    src="/images/horse-auto.png"
                    alt="nft"
                    width={150}
                    height={150}
                    className="absolute left-0 top-0"
                  />
                </div>

                {/*
                <NftSinglePrice
                  //tokenid={tokenid.tokenid}
                  nftMetadata={nftMetadata}
                  contractAddress={nftDropContractAddressHorse}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
                */}
              </div>
            </div>

            {layout === LAYOUT_OPTIONS.RETRO ? (
              <InfoDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : (
              <div className="flex w-full flex-col">
                <div className="items-left hidden w-full flex-col justify-center lg:flex xl:flex  ">
                  <Link
                    className=" text-left text-lg font-bold text-blue-500  dark:text-white xl:text-xl "
                    href={`/my-asset`}
                  >
                    My NFT
                  </Link>

                  <div className="mb-3 mt-3 flex w-full flex-row items-center justify-start gap-2.5">
                    <div className="text-left text-2xl font-bold capitalize text-black underline decoration-sky-500 dark:text-white xl:text-4xl">
                      {nftMetadata?.name}
                    </div>
                  </div>

                  <div className="mt-2 flex flex-row items-center justify-start ">
                    <Image
                      src="/images/logo-polygon.png"
                      alt="gd"
                      width={18}
                      height={18}
                    />

                    <span className="ml-2 text-left text-lg font-bold text-black dark:text-white xl:text-xl">
                      #{nftMetadata?.id}
                    </span>
                  </div>

                  {/* owned by */}

                  {isLoadingStakerAddress ? (
                    <div className="mt-0 flex flex-col items-center justify-center gap-5 p-3">
                      <div className="text-sm font-bold xl:text-lg">
                        <b>Loading Owner...</b>
                      </div>
                    </div>
                  ) : (
                    <div className=" flex w-full items-center justify-start  gap-4 ">
                      {/*
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

                       */}
                    </div>
                  )}
                </div>

                <div className="mt-3 w-full rounded-lg bg-white py-3 shadow-card dark:bg-light-dark ">
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
  };
}

export async function getStaticProps(context: any) {
  ////export const getStaticProps: GetStaticProps = async (context: any) => {

  const tokenid: string = context.params?.tokenid;

  const res = await fetch('https://granderby.io/api/nft/horse/' + tokenid, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    //body: JSON.stringify(formInputs),
  });

  const data = await res.json();

  //console.log(data);

  var grade = '';
  var size = '';
  var speed = '';
  var stamina = '';
  var power = '';

  data?.attributes?.map((attribute: any) => {
    ///console.log('attribute', attribute);
    if (attribute.trait_type === 'Grade') {
      //setAttributeGrade(attribute.value);
      grade = attribute.value;
    }
    if (attribute.trait_type === 'Size') {
      //setAttributeSize(attribute.value);
      size = attribute.value;
    }
    if (attribute.trait_type === 'Speed') {
      //setAttributeSpeed(attribute.value);
      speed = attribute.value;

      //console.log('attributeSpeed', attribute.value);
    }
    if (attribute.trait_type === 'Stamina') {
      //setAttributeStamina(attribute.value);
      stamina = attribute.value;
    }
    if (attribute.trait_type === 'Power') {
      //setAttributePower(attribute.value);
      power = attribute.value;
    }
  });

  const title = data?.name + ' - #' + tokenid;
  const description =
    'Speed: ' +
    speed +
    ' | ' +
    'Stamina: ' +
    stamina +
    ' | ' +
    'Power: ' +
    power;
  const image = data?.image;

  return {
    props: {
      tokenid: tokenid,
      //////nftMetadata: nft,
      title: title,
      //description: nft?.metadata?.description,
      description: description,
      //image: '/images/logo.png',
      //image: data?.metadata?.image,
      //image: nft?.metadata?.image,
      image: image,
    },
  };
}

const AssetSinglePrice: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { tokenid, title, description, image } = props;

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
