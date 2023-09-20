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
  const [isOpen, setIsOpen] = useState(false);
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  const { contract } = useContract(nftDropContractAddressHorse, 'nft-drop');

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
                    href={`/horse`}
                  >
                    {nftMetadata?.metadata?.description}
                  </Link>
                  <div className="mt-2 flex flex-row items-center justify-start ">
                    <span className="ml-2 text-left text-lg font-bold text-black dark:text-white xl:text-xl">
                      #{nftMetadata?.metadata?.id}
                    </span>
                  </div>
                  <div className="mb-3 mt-3 flex w-full flex-row items-center justify-start gap-2.5">
                    <div className="text-left text-2xl font-bold capitalize text-black underline decoration-sky-500 dark:text-white xl:text-3xl">
                      {nftMetadata?.metadata?.name}
                    </div>
                  </div>

                  {/* owned by */}

                  {isLoadingStakerAddress ? (
                    <div className="mt-0 flex flex-col items-center justify-center gap-5 p-3">
                      <div className="text-sm font-bold xl:text-lg">
                        <b>Loading Owner...</b>
                      </div>
                    </div>
                  ) : (
                    <div className=" item-center flex w-full justify-start  gap-4 ">
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
                  contractAddress={nftDropContractAddressHorse}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              </div>
            </div>

            {layout === LAYOUT_OPTIONS.RETRO ? (
              <InfoDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : (
              <div className="flex w-full flex-col">
                <div className="items-left hidden w-full flex-col justify-center lg:flex xl:flex  ">
                  <Link
                    className=" text-left text-sm font-bold text-blue-500  dark:text-white xl:text-lg "
                    href={`/horse`}
                  >
                    {/*nftMetadata?.metadata?.description*/}
                    Granderby Horse NFT
                  </Link>

                  <div className="mt-2 flex flex-row items-center justify-start ">
                    {/*
                    <Image src="/images/logo-gd.png" alt="gd" width={18} height={18} />
                    */}

                    <span className="ml-2 text-left text-lg font-bold text-black dark:text-white xl:text-xl">
                      #{nftMetadata?.metadata?.id}
                    </span>
                  </div>

                  <div className="mb-3 mt-3 flex w-full flex-row items-center justify-start gap-2.5">
                    <div className="text-left text-2xl font-bold capitalize text-black underline decoration-sky-500 dark:text-white xl:text-4xl">
                      {nftMetadata?.metadata?.name}
                    </div>
                  </div>

                  {/* owned by */}

                  {isLoadingStakerAddress ? (
                    <div className="mt-0 flex flex-col items-center justify-center gap-5 p-3">
                      <div className="text-sm font-bold xl:text-lg">
                        <b>Loading Owner...</b>
                      </div>
                    </div>
                  ) : (
                    <div className=" item-center flex w-full justify-start  gap-4 ">
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

                <div className="w-full rounded-lg bg-white py-8 shadow-card dark:bg-light-dark ">
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

      <footer>
        <div className="flex-cols mt-10 flex items-center justify-center gap-3 bg-gray-800 pb-5 pt-10 text-white ">
          <div>Copyright ©MOMOCON</div>

          <AnchorLink href="/terms">Terms of Service</AnchorLink>

          <div>Privacy Policy</div>
        </div>

        <div className=" flex-cols flex items-center justify-center gap-3 bg-gray-800 pb-20 pt-3 text-white ">
          <div>
            <Image src={LogoMomocon} alt="MOMOCON" width={48} height={48} />
          </div>

          <AnchorLink
            href="https://www.instagram.com/nftgranderby"
            target="_blank"
            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </AnchorLink>
          <AnchorLink
            href="https://twitter.com/nftgranderby"
            target="_blank"
            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
          >
            <Twitter className="h-4 w-4" /> Twitter
          </AnchorLink>
        </div>
      </footer>
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
  ///export const getStaticProps: GetStaticProps = async (context) => {

  const tokenid: any = context.params?.tokenid;

  // If used on the FRONTEND pass your 'clientId'
  const sdk = new ThirdwebSDK('polygon', {
    clientId: '79125a56ef0c1629d4863b6df0a43cce',
  });

  const contract = await sdk.getContract(nftDropContractAddressHorse);

  const nft = await contract.erc721.get(tokenid);

  ///console.log('nft======>', nft);

  return {
    props: {
      tokenid: tokenid,
      //////nftMetadata: nft,
      title: '#' + tokenid + '-' + nft?.metadata?.name,
      description: nft?.metadata?.description,
      //image: '/images/logo.png',
      //image: data?.metadata?.image,
      image: nft?.metadata?.image,
    },
  };
}

/*
export async function getServerSideProps(context:any) {
  const tokenid: any = context.params?.tokenid;

  console.log("tokenid", tokenid);

  //const tokenid: any = context.query.slug;

  // If used on the FRONTEND pass your 'clientId'
  const sdk = new ThirdwebSDK('polygon', {
    clientId: '79125a56ef0c1629d4863b6df0a43cce',
  });

  const contract = await sdk.getContract(nftDropContractAddressHorse);

  const nft = await contract.erc721.get(tokenid);

  ///console.log('nft======>', nft);

  return {
    props: {
      tokenid: tokenid,
      //////nftMetadata: nft,
      title: '#' + tokenid + '-' + nft?.metadata?.name,
      description: nft?.metadata?.description,
      //image: '/images/logo.png',
      //image: data?.metadata?.image,
      image: nft?.metadata?.image,
    },
  };
}
*/

const AssetSinglePrice: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { tokenid, title, description, image } = props;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <meta property="og:type" content="website"></meta>

        <meta property="og:site_name" content="GRANDERBY"></meta>

        <meta property="og:image:width" content="1400"></meta>
        <meta property="og:image:height" content="1400"></meta>

        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="og:image" content={image}></meta>

        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:image" content={image}></meta>

        <title>{title}</title>
      </Head>

      <SinglePrice tokenid={tokenid} />
    </>
  );
};

AssetSinglePrice.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export default AssetSinglePrice;
