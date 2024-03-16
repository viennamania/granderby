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

import { Network, Alchemy } from 'alchemy-sdk';

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

  ////console.log(' MyHorseDetails tokenid======>', tokenid);

  const [isOpen, setIsOpen] = useState(false);
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  const { openModal } = useModal();

  const router = useRouter();

  const { contract } = useContract(nftDropContractAddressHorse, 'nft-drop');

  const { data: nftMetadata, isLoading } = useNFT(contract, tokenid);

  ////console.log('nftMetadata======>', nftMetadata);

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

  /*
  const settings = {
    ///apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key. creath.park@gmail.com

    ///apiKey: '8YyZWFtcbLkYveYaB9sjOC3KPWInNu07', // Replace with your Alchemy API Key. songpalabs@gmail.com
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.MATIC_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);

  useEffect(() => {
    const main = async () => {
      // getNftMetadata(npcNames[0].nft1.contract, npcNames[0].nft1.tokenId)

      const response = await alchemy.nft?.getNftMetadata(
        nftDropContractAddressHorse,
        tokenid
      );

      console.log('getNftMetadata response=', response);

   

  
    };

    main();
  }, []);
  */

  /* /api/nft/getOneByTokenId */
  const [nft, setNft] = useState<any>(null);
  const [horseData, setHorseData] = useState<any>(null);

  const [imageUrl, setImageUrl] = useState<any>(null);

  useEffect(() => {
    async function getNft() {
      const response = await fetch('/api/nft/getOneByTokenId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenId: tokenid,
        }),
      });
      const data = await response.json();

      ///console.log('data.horse', data?.horse);

      setHorseData(data?.horse);

      //console.log('data.horse.nft.tokenUri.raw', data?.horse?.nft?.tokenUri.raw);

      /*
      {"id":"3647","name":"Granderby Horse #3647","description":"Granderby NFT Horses","image":"https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/hrs/Hrs_00202647.png","attributes":[{"trait_type":"Speed","value":83},{"trait_type":"Preceding","value":0},{"trait_type":"Overtaking","value":0},{"trait_type":"Stamina","value":193},{"trait_type":"Spirit","value":0},{"trait_type":"Power","value":102},{"trait_type":"Agility","value":0},{"trait_type":"Weight","value":0},{"trait_type":"Drivinghabits","value":0},{"trait_type":"Record","value":0},{"trait_type":"textureKey","value":"Hrs_00202647"},{"trait_type":"Texture Key"},{"trait_type":"Mane","value":"Sporty Mane"},{"trait_type":"Tail","value":"Brush Tail"},{"trait_type":"BodyMask","value":"Ho_Pa_01_20_BodyPa"},{"trait_type":"HeadMask","value":"Ho_Pa_02_20_HeadPa"},{"trait_type":"LegMask","value":"Ho_Pa_03_03_LegPa"},{"trait_type":"ManeMask","value":"Zebra"},{"trait_type":"TailMask","value":"Gradation"},{"trait_type":"BodyAcc","value":"None"},{"trait_type":"HeadAcc","value":"None"},{"trait_type":"LegAcc","value":"None"},{"trait_type":"Size","value":"Normal"},{"trait_type":"BodyColor","value":"F6F6F6"},{"trait_type":"ManeColor","value":"1E56A0"},{"trait_type":"TailColor","value":"1E56A0"},{"trait_type":"BodyMaskColor","value":"163172"},{"trait_type":"HeadMaskColor","value":"163172"},{"trait_type":"LegMaskColor","value":"D6E4F0"},{"trait_type":"ManeMaskColor","value":"D6E4F0"},{"trait_type":"TailMaskColor","value":"D6E4F0"},{"trait_type":"BodyAccColor","value":"FFFFFF"},{"trait_type":"HeadAccColor","value":"FFFFFF"},{"trait_type":"LegAccColor","value":"1E56A0"},{"trait_type":"Comment","value":""},{"trait_type":"Grade","value":"D"},{"trait_type":"World","value":""},{"trait_type":"BODY_PATTERN"},{"trait_type":"HEAD_PATTERN"},{"trait_type":"LEG_PATTERN"},{"trait_type":"MANE"},{"trait_type":"MANE_PATTERN"},{"trait_type":"TAIL"},{"trait_type":"TAIL_PATTERN"},{"trait_type":"LEG_HAIR"},{"trait_type":"LEG_HAIR_PATTERN"},{"trait_type":"WING"},{"trait_type":"HORN"},{"trait_type":"COLOR_SET_NO"}],"animation_url":"","external_url":"https://granderby.io/horse-details/3647"}
      */

      //console.log('data.horse.nft.rawMetadata.image', data?.horse?.nft?.rawMetadata?.image);

      const tokenUrl = data?.horse?.nft?.tokenUri?.raw;
      const responseNft = await fetch(tokenUrl);
      const dataNft = await responseNft.json();

      ///console.log('dataNft', dataNft);

      setImageUrl(dataNft?.image);

      setNft(data?.horse?.nft);

      /*
      data?.horse?.totalPricePaid;

      if (
        data?.horse?.paidToken === '0x0000000000000000000000000000000000001010'
      ) {
        const price =
          (data?.horse?.totalPricePaid / 1000000000000000000) * 0.66;
        setLastPrice(price);
      } else if (
        data?.horse?.paidToken === '0xe426D2410f20B0434FE2ce56299a1543d3fDe450'
      ) {
        const price = data?.horse?.totalPricePaid / 1000000000000000000;
        setLastPrice(price);
      } else if (
        data?.horse?.paidToken === '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
      ) {
        const price = data?.horse?.totalPricePaid / 1000000;
        setLastPrice(price);
      }
      */
    }

    getNft();
  }, [tokenid]);

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
                  /*
                  src={
                    nftMetadata?.metadata?.image
                      ? nftMetadata?.metadata?.image
                      : '/default-nft.png'
                  }
                  */
                  /*
                  src={
                    nft?.rawMetadata?.image
                      ? nft?.rawMetadata?.image
                      : '/default-nft.png'
                  }
                  */

                  src={imageUrl ? imageUrl : '/default-nft.png'}
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
              {/*}
              <NftInfo nftMetadata={nftMetadata} />
              */}
              {/*
              <NftInfo nftMetadata={nft?.rawMetadata} />
              */}

              <NftInfo horseData={horseData} />
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
