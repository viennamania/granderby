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

function SinglePrice(tokenid: any) {
  const [isOpen, setIsOpen] = useState(false);
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  const { openModal } = useModal();

  const router = useRouter();

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
              className={`w-full 
              ${layout === LAYOUT_OPTIONS.RETRO ? '' : 'lg:w-2/3'}`}
            >
              <div className=" flex flex-col">
                {/* nft title */}

                <div className="items-left  mb-5  w-full flex-col justify-center ">
                  <Link
                    className=" text-left text-lg capitalize text-blue-500 dark:text-white "
                    href={`/my-asset`}
                  >
                    {/*nftMetadata?.metadata?.description*/}
                    My NFT
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
                  nftMetadata={nftMetadata}
                  contractAddress={nftDropContractAddressHorse}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              </div>
            </div>

            <div className=" flex w-full flex-col">
              <div className=" w-full rounded-lg bg-white  shadow-card dark:bg-light-dark ">
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

  /*
  // If used on the FRONTEND pass your 'clientId'
  const sdk = new ThirdwebSDK('polygon', {
    clientId: '79125a56ef0c1629d4863b6df0a43cce',
  });

  const contract = await sdk.getContract(nftDropContractAddressHorse);

  const nft = await contract.erc721.get(tokenid);

  ///console.log('nft======>', nft);
  */

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
      {/*
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
      */}

      <SinglePrice tokenid={tokenid} />
    </>
  );
};

AssetSinglePrice.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export default AssetSinglePrice;
