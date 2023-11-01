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

import NftInfo from '@/components/nft-pricing-table/my-nft-info';

import NftSinglePrice from '@/components/nft-pricing-table/nft-single-price';

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

import Button from '@/components/ui/button/button';
import { useModal } from '@/components/modal-views/context';

import UserProfitChartUsers from '@/components/ui/chats/user-profit-chart-users';

import UserProfitChartHorses from '@/components/ui/chats/user-profit-chart-horses';

//// GetStaticPaths

export async function getStaticPaths() {
  return {
    paths: [{ params: { tokenid: '1' } }],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const tokenid: string = context.params?.tokenid;

  return {
    props: {
      tokenid: tokenid,
    },
  };
};

const MyHorseDetails: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { tokenid } = props;

  {
    /*
  return (
    
    <>

      <SinglePrice tokenid={tokenid} />
    </>

  );
  */
  }

  console.log(' MyHorseDetails tokenid======>', tokenid);

  const [isOpen, setIsOpen] = useState(false);
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  const { openModal } = useModal();

  const router = useRouter();

  const { contract } = useContract(nftDropContractAddressHorse, 'nft-drop');

  const { data: nftMetadata, isLoading } = useNFT(contract, tokenid);

  //console.log('nftMetadata======>', nftMetadata);

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

  if (!address) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl">
        You have to connect wallet.
      </div>
    );
  }

  if (
    address &&
    !isLoading &&
    nftMetadata?.owner === '0x0000000000000000000000000000000000000000'
  ) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl">
        This NFT is wrong.
      </div>
    );
  }

  if (
    address &&
    !isLoading &&
    nftMetadata?.owner !== address &&
    stakerAddress !== address
  ) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl">
        This NFT is not yours.
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* nft title */}
          <div className="items-left  w-full flex-col justify-center ">
            <Link
              className=" text-left text-lg capitalize text-blue-500 dark:text-white "
              href={`/my-asset`}
            >
              My NFT
            </Link>

            {/*
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
                    `https://polygonscan.com/nft/${nftDropContractAddressHorse}/${nftMetadata?.metadata?.id}`
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
            </div>
            */}
          </div>
          {/* end of nft title */}

          <div className="flex flex-wrap gap-6 lg:flex-nowrap ">
            <div className={`w-full lg:w-1/3`}>
              <div className=" flex flex-col">
                <Image
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

                {/*
                <NftSinglePrice
                  nftMetadata={nftMetadata}
                  contractAddress={nftDropContractAddressHorse}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
                */}
              </div>
            </div>

            <div className="flex w-full flex-col  lg:w-2/3 ">
              <NftInfo nftMetadata={nftMetadata} />
            </div>
          </div>

          {/*
          <div className="flex w-full  flex-col gap-5 rounded-lg border p-5">
            <div className="flex flex-row items-center justify-start text-2xl font-extrabold xl:text-3xl">
              Status
            </div>
            <div className="mt-5  grid grid-rows-2 items-center justify-between gap-5">
              <UserProfitChartUsers userAddress={address?.toLowerCase()} />
              <UserProfitChartHorses userAddress={address?.toLowerCase()} />
            </div>
          </div>
          */}
        </div>
      )}

      {/* delete footer */}
    </>
  );
};

MyHorseDetails.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default MyHorseDetails;
