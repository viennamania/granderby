import NftSinglePrice from '@/components/nft-pricing-table/nft-single-price';

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
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
  marketplaceContractAddress,
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
  useNetworkMismatch,
  useNetwork,
} from '@thirdweb-dev/react';

import { get } from 'http';
import { set } from 'date-fns';

import { ThirdwebSDK } from '@thirdweb-dev/sdk';

import Button from '@/components/ui/button/button';
import { useModal } from '@/components/modal-views/context';

import Collapse from '@/components/ui/collapse';

import TransferHistoryTable from '@/components/nft-transaction/transfer-history-table';

import cn from 'classnames';

import PriceHistoryTable from '@/components/nft-transaction/price-history-table';

import PointHistoryTable from '@/components/nft-transaction/point-history-table';

import { format } from 'date-fns';
import { add, at } from 'lodash';

function SinglePrice(tokenid: any) {
  const [isOpen, setIsOpen] = useState(false);
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  const { openModal } = useModal();

  const router = useRouter();

  const { contract } = useContract(nftDropContractAddressHorse, 'nft-drop');

  //const { data: nftMetadata, isLoading } = useNFT(contract, tokenid.tokenid);

  ///console.log('nftMetadata======>', nftMetadata);

  const [isLoading, setIsLoading] = useState(true);
  const [owner, setOwner] = useState('');
  const [nftMetadata, setNftMetadata] = useState<any>(null);
  /* /api/nft/getOneByTokenId */

  const [gameHorseName, setGameHorseName] = useState<any>(null);
  const [gameHorseDescription, setGameHorseDescription] = useState<any>(null);

  const [gameHorseInfo, setGameHorseInfo] = useState<any>(null);

  const [gameHorseStatus, setGameHorseStatus] = useState<any>(null);

  const [gameHorseBalance, setGameHorseBalance] = useState<number>(0);

  const [liveHorseInfo, setLiveHorseInfo] = useState<any>(null);

  useEffect(() => {
    async function getNft() {
      setIsLoading(true);
      const response = await fetch('/api/nft/getOneByTokenId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenId: tokenid.tokenid,
        }),
      });
      const data = await response.json();

      ///console.log('data', data);

      //console.log('tokenid.tokenid======', tokenid.tokenid);
      //console.log('data.horse', data?.horse);

      //console.log('data.horse.nft.rawMetadata.image', data?.horse?.nft?.rawMetadata?.image);

      setOwner(data?.horse?.holder);

      setNftMetadata(data?.horse?.nft);

      console.log('data?.horse?.nft', data?.horse?.nft);

      // gameHorseDescription => {trait_type: "name"}
      setGameHorseName(
        data?.horse?.gameHorseDescription?.find(
          (item: any) => item?.trait_type === 'name'
        )?.value
      );

      ///console.log('gameHorseName', gameHorseName);

      // gameHorseDescription => {trait_type: "desription"}
      setGameHorseDescription(
        data?.horse?.gameHorseDescription?.find(
          (item: any) => item?.trait_type === 'description'
        )?.value
      );

      ///console.log('gameHorseDescription', gameHorseDescription);

      setGameHorseInfo(data?.horse?.gameHorseInfo);
      /*
        BODY_PATTERN: 'Smoke',
        HEAD_PATTERN: 'Smoke',
        LEG_PATTERN: 'Long Boots',
        MANE: 'Sporty',
        MANE_PATTERN: 'None',
        TAIL: 'Brush',
        TAIL_PATTERN: 'None',
        LEG_HAIR: 'None',
        LEG_HAIR_PATTERN: 'Long Boots',
        WING: 'None',
        HORN: 'None',
        COLOR_SET_NO: 482,
      */

      ////setGameHorseStatus(data?.horse?.gameHorseStatus);

      /*
      [
        {
            "trait_type": "AGE",
            "value": ""
        },
        {
            "trait_type": "OVERALL",
            "value": ""
        },
        {
            "trait_type": "FRONT",
            "value": ""
        },
        {
            "trait_type": "STRETCH",
            "value": ""
        },
        {
            "trait_type": "WEIGHT",
            "value": ""
        },
        {
            "trait_type": "RUNTYPE",
            "value": ""
        }
      ]
      */

      //Overall -speed
      //Front -precending
      //Stretch -Overtaking

      setGameHorseStatus([
        {
          trait_type: 'AGE',
          value:
            data?.horse?.liveHorseInfo?.AGE &&
            data?.horse?.liveHorseInfo?.AGE !== ''
              ? data?.horse?.liveHorseInfo?.AGE
              : '0',
        },
        {
          trait_type: 'OVERALL',
          value:
            data?.horse?.liveHorseInfo?.SPEED &&
            data?.horse?.liveHorseInfo?.SPEED !== ''
              ? data?.horse?.liveHorseInfo?.SPEED
              : '0',
        },
        {
          trait_type: 'FRONT',
          value:
            data?.horse?.liveHorseInfo?.PRECENDING &&
            data?.horse?.liveHorseInfo?.PRECENDING !== ''
              ? data?.horse?.liveHorseInfo?.PRECENDING
              : '0',
        },
        {
          trait_type: 'STRETCH',
          value:
            data?.horse?.liveHorseInfo?.OVERTAKING &&
            data?.horse?.liveHorseInfo?.OVERTAKING !== ''
              ? data?.horse?.liveHorseInfo?.OVERTAKING
              : '0',
        },
        {
          trait_type: 'WEIGHT',
          value:
            data?.horse?.liveHorseInfo?.WEIGHT &&
            data?.horse?.liveHorseInfo?.WEIGHT !== ''
              ? data?.horse?.liveHorseInfo?.WEIGHT
              : '0',
        },
        {
          trait_type: 'RUNTYPE',
          value:
            data?.horse?.liveHorseInfo?.RUNTYPE &&
            data?.horse?.liveHorseInfo?.RUNTYPE !== ''
              ? data?.horse?.liveHorseInfo?.RUNTYPE
              : '0',
        },
      ]);

      setLiveHorseInfo(data?.horse?.liveHorseInfo);

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

      setIsLoading(false);
    }

    async function getNftBalance() {
      if (!tokenid.tokenid) return;

      const response = await fetch('/api/nft/getBalanceByTokenId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenId: tokenid.tokenid,
        }),
      });
      const data = await response.json();

      console.log('data', data);

      setGameHorseBalance(data?.balance || 0);
    }

    getNft();

    getNftBalance();
  }, [tokenid.tokenid]);

  console.log('gameHorseStatus', gameHorseStatus);

  console.log('liveHorseInfo', liveHorseInfo);

  const { contract: contractStaking, isLoading: isLoadingContractStaking } =
    useContract(stakingContractAddressHorseAAA);

  const { data: stakerAddress, isLoading: isLoadingStakerAddress } =
    useContractRead(contractStaking, 'stakerAddress', [
      //nftMetadata?.metadata?.id,

      tokenid.tokenid,
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

  ///console.log('address===========>>>>>>>>', address);

  const [attributes, setAttributes] = useState([] as string[]);

  useEffect(() => {
    let arrAttribute = [] as any;

    //nftMetadata?.metadata?.attributes?.map((attribute: any) => {

    // nftMetadata?.metadata?.attributes is array of objects
    // type assertion to any

    ///nftMetadata?.metadata?.attributes?.map((attribute: any) => {

    ///const attributes = nftMetadata?.metadata?.attributes as any;

    const attributes = nftMetadata?.rawMetadata?.attributes as any;

    console.log('attributes', attributes);

    attributes?.map((attribute: any) => {
      if (false) {
      } else if (attribute.trait_type === 'Grade') {
      } else if (attribute.trait_type === 'Preceding') {
      } else if (attribute.trait_type === 'Overtaking') {
      } else if (attribute.trait_type === 'Spirit') {
      } else if (attribute.trait_type === 'Agility') {
      } else if (attribute.trait_type === 'Weight') {
      } else if (attribute.trait_type === 'Drivinghabits') {
      } else if (attribute.trait_type === 'Record') {
      } else if (attribute.trait_type === 'textureKey') {
      } else if (attribute.trait_type === 'Texture Key') {
      } else if (attribute.trait_type === 'BodyMask') {
      } else if (attribute.trait_type === 'HeadMask') {
      } else if (attribute.trait_type === 'LegMask') {
      } else if (attribute.trait_type === 'BodyAcc') {
      } else if (attribute.trait_type === 'HeadAcc') {
      } else if (attribute.trait_type === 'LegAcc') {
      } else if (attribute.trait_type === 'Comment') {
      } else if (attribute.trait_type === 'World') {
      } else if (attribute.trait_type === 'BodyColor') {
      } else if (attribute.trait_type === 'ManeColor') {
      } else if (attribute.trait_type === 'TailColor') {
      } else if (attribute.trait_type === 'BodyMaskColor') {
      } else if (attribute.trait_type === 'HeadMaskColor') {
      } else if (attribute.trait_type === 'LegMaskColor') {
      } else if (attribute.trait_type === 'ManeMaskColor') {
      } else if (attribute.trait_type === 'TailMaskColor') {
      } else if (attribute.trait_type === 'BodyAccColor') {
      } else if (attribute.trait_type === 'HeadAccColor') {
      } else if (attribute.trait_type === 'LegAccColor') {
      } else {
        if (attribute) {
          arrAttribute.push(attribute);
          //attributes.push(attribute);
        }
      }
    });

    ///console.log("arrAttribute", arrAttribute);

    setAttributes(arrAttribute);

    //}, [nftMetadata?.metadata?.attributes]);
  }, [nftMetadata?.rawMetadata?.attributes]);

  ///console.log('attributes======>', attributes);

  const { contract: nftDropContract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );

  const [toAddress, setToAddress] = useState('');
  const [isSending, setIsSending] = useState(false);

  async function transferNft(id: string, toAddress: string) {
    if (id === undefined) {
      alert(`🌊 Please enter a valid tokenId`);
      return;
    }

    if (toAddress === '') {
      alert(`🌊 Please enter a valid address`);
      return;
    }

    setIsSending(true);

    try {
      const transaction = await nftDropContract?.erc721.transfer(toAddress, id);

      console.log(`🌊 Sent transaction with hash: ${transaction?.receipt}`);

      //alert (`🌊 Sent transaction with hash: ${transaction?.receipt}`);

      alert(`🌊 Successfully transfered!`);

      setIsSending(false);

      setToAddress('');

      return transaction;
    } catch (error) {
      console.error(error);

      alert(`🌊 Failed to send transaction with hash: ${error}`);

      setIsSending(false);
    }
  }

  const { contract: marketplace } = useContract(
    marketplaceContractAddress,
    'marketplace-v3'
  );

  const {
    data: directListings,
    isLoading: loadingListings,
    error,
  } = useValidDirectListings(marketplace);

  //console.log('nft-single-price directListings======>', directListings);

  const [directListing, setDirectListing] = useState<any>(null);

  useEffect(() => {
    setDirectListing(null);

    if (directListings) {
      directListings.map((listing: any) => {
        /////if (listing.tokenId === nftMetadata?.metadata?.id) {

        if (listing.tokenId === tokenid.tokenid) {
          //setListingId(listing.id);

          setDirectListing(listing);

          ////console.log('nft-single-price listing', listing);

          return;
        }
      });
    }
    ////}, [directListings, nftMetadata?.metadata?.id]);
  }, [directListings, tokenid.tokenid]);

  // Hooks to detect user is on the right network and switch them if they are not
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  async function buyNft() {
    try {
      // Ensure user is on the correct network

      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Polygon);
        return;
      }

      // Simple one-liner for buying the NFT
      /*
        await marketplace?.buyFromListing(listingId.listingId, 1);
        */

      // The ID of the listing you want to buy from
      //const listingId = 0;
      // Quantity of the asset you want to buy
      const quantityDesired = 1;

      await marketplace?.directListings?.buyFromListing(
        directListing?.id,
        quantityDesired,
        address
      );

      alert('NFT bought successfully!');
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center  gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-6 lg:flex-nowrap ">
              <div className=" flex flex-col items-center justify-start  gap-6  lg:w-2/5 xl:w-2/5 2xl:w-2/5">
                {/* nft title */}

                <div className="items-left  mb-6  w-full flex-col justify-center  lg:hidden xl:hidden">
                  <Link
                    className=" text-left text-lg capitalize text-blue-500 dark:text-white "
                    href={`/horse`}
                  >
                    {/*nftMetadata?.metadata?.description*/}

                    {nftMetadata?.description}
                  </Link>

                  <div className="mb-3 mt-3 flex w-full flex-row items-center justify-start gap-2.5">
                    <div className="text-left text-2xl font-bold capitalize text-black dark:text-white xl:text-3xl">
                      {/*nftMetadata?.title*/}

                      {gameHorseDescription}
                    </div>
                  </div>

                  <div className="mt-2 flex flex-row items-center justify-between  ">
                    <button
                      className=" flex flex-row items-center justify-start "
                      onClick={() =>
                        router.push(
                          ///`https://polygonscan.com/nft/${nftDropContractAddressHorse}/${nftMetadata?.metadata?.id}`
                          `https://polygonscan.com/nft/${nftDropContractAddressHorse}/${tokenid.tokenid}`
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
                        #{tokenid.tokenid}
                      </span>
                    </button>

                    {/*
                      <button
                        className="ml-10 flex flex-row items-center justify-start "
                        onClick={() => openModal('SHARE_VIEW')}
                      >
                        
                        <Twitter className="h-5 w-5" />

                        <span className=" text-left text-lg font-bold text-black dark:text-white xl:text-xl">
                          share
                        </span>
                      </button>
                      */}
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
                              {owner === address?.toUpperCase() ? (
                                <div className="text-xl font-bold text-blue-600">
                                  Me
                                </div>
                              ) : (
                                <button
                                  className=" flex flex-row items-center justify-start  "
                                  onClick={() =>
                                    router.push(`/user-portfolio/${owner}`)
                                  }
                                >
                                  <span>{owner?.substring(0, 10)}...</span>
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
                              {stakerAddress &&
                              stakerAddress === address?.toUpperCase() ? (
                                <div className="text-xl font-bold text-blue-600">
                                  Me
                                </div>
                              ) : (
                                <button
                                  className=" flex flex-row items-center justify-start  "
                                  onClick={() =>
                                    router.push(
                                      `/user-portfolio/${stakerAddress}`
                                    )
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

                <div className=" flex flex-col items-center justify-center gap-6 ">
                  <Image
                    /*
                    src={
                      nftMetadata?.metadata?.image
                        ? nftMetadata?.metadata?.image
                        : '/default-nft.png'
                    }
                    */
                    src={
                      nftMetadata?.rawMetadata?.image
                        ? nftMetadata?.rawMetadata?.image
                        : '/default-nft.png'
                    }
                    alt="nft"
                    width={1024}
                    height={1024}
                    /*
                    style={{
                      objectFit: "contain",
                      //objectFit: "cover",
                      objectPosition: "center",
                    }}
                    */

                    className=" w-auto rounded-lg "
                  />
                </div>

                <div className=" flex w-full flex-col rounded-lg border ">
                  <Collapse label="Description" initialOpen={true}>
                    <div className="p-5 text-sm font-medium text-gray-900 dark:text-white">
                      {gameHorseDescription}
                    </div>
                  </Collapse>
                </div>

                <div className=" flex w-full flex-col rounded-lg border ">
                  <Collapse label="Properties" initialOpen={true}>
                    {/* nft attributes details */}

                    <div className=" grid grid-cols-2  items-center justify-between gap-2 p-2 xl:grid-cols-3 2xl:grid-cols-3  ">
                      {
                        //nftMetadata?.metadata?.attributes?.map((attribute: any) => (

                        gameHorseInfo?.map((attribute: any) => (
                          <div key={attribute?.trait_type}>
                            <div
                              className="   flex flex-col items-center gap-3 rounded-md bg-gray-100 p-1 text-sm font-medium text-gray-900 dark:text-white
                                      lg:flex-wrap xl:text-sm 2xl:flex-nowrap  "
                            >
                              <span className={cn('flex ', 'flex-row')}>
                                <span>{attribute?.trait_type}</span>
                              </span>

                              <span className="text-xs  font-semibold xl:text-sm">
                                {/*
                                          {attribute?.value?.toString().length < 8
                                            ? attribute?.value?.toString()
                                            : attribute?.value?.toString().substring(0, 8)}
                                          ...
                                          */}
                                {attribute?.value}
                              </span>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </Collapse>
                </div>

                <div className=" flex w-full flex-col rounded-lg border ">
                  <Collapse label="Status" initialOpen={true}>
                    {/* nft attributes details */}

                    <div className=" grid grid-cols-2  items-center justify-between gap-2 p-2 xl:grid-cols-3 2xl:grid-cols-3  ">
                      {
                        //nftMetadata?.metadata?.attributes?.map((attribute: any) => (

                        gameHorseStatus?.map((attribute: any) => (
                          <div key={attribute?.trait_type}>
                            <div
                              className="   flex flex-col items-center gap-3 rounded-md bg-gray-100 p-1 text-sm font-medium text-gray-900 dark:text-white
                                      lg:flex-wrap xl:text-sm 2xl:flex-nowrap  "
                            >
                              <span className={cn('flex ', 'flex-row')}>
                                <span>{attribute?.trait_type}</span>
                              </span>

                              <span className="text-xs  font-semibold xl:text-sm">
                                {/*
                                          {attribute?.value?.toString().length < 8
                                            ? attribute?.value?.toString()
                                            : attribute?.value?.toString().substring(0, 8)}
                                          ...
                                          */}
                                {attribute?.value !== ''
                                  ? attribute?.value
                                  : '0'}
                              </span>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </Collapse>
                </div>

                {/* nft profits */}
                {/*
                <div className=" flex w-full flex-col rounded-lg border ">
                  <Collapse label="Profits" initialOpen={true}>
                
                    <div className="flex w-full flex-row items-center justify-center gap-20 p-3">
                      <div className="flex flex-col items-center justify-center gap-5">
                        <span className="text-xl font-bold">ALLOWANCE</span>
                        <Image
                          src="/images/icon-gdp.png"
                          alt="sugar"
                          width={30}
                          height={30}
                        />
                      </div>

                      <div className=" flex w-64 flex-row items-center justify-between gap-2  rounded-lg bg-slate-100 p-3 pl-5 pr-5">
                        <div className="flex flex-col items-end justify-center gap-2">
                          <div className="flex flex-row items-center justify-center gap-2">
                            <div className="  text-xl font-bold">
                              Accumulate:
                            </div>
                            <div className=" flex w-20 flex-row items-center justify-end gap-2">
                              <span className="  text-xl font-bold">
                                {
                                  // dollar format

                                  gameHorseBalance
                                }
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-row items-center justify-center gap-2">
                            <div className="  text-xl font-bold">Keep:</div>
                            <div className=" flex w-20 flex-row items-center justify-end gap-2">
                              <span className="  text-xl font-bold">
                                {gameHorseBalance}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-row items-center justify-center gap-2">
                            <div className="  text-xl font-bold">Last:</div>

                            <div className="flex w-20 flex-row items-center justify-end gap-2">
                              <span className="  text-lg font-bold text-green-600">
                                +{gameHorseBalance}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
                */}
                {/* end of nft profits */}

                {/*
                <div className=" flex w-full flex-col rounded-lg border ">
                  <Collapse label="Properties" initialOpen={true}>
                 
                    <div className=" grid grid-cols-2  items-center justify-between gap-2 p-2 xl:grid-cols-4 2xl:grid-cols-4  ">
                      {
                        //nftMetadata?.metadata?.attributes?.map((attribute: any) => (

                        attributes?.map((attribute: any) => (
                          <div key={attribute?.trait_type}>
                            <div
                              className="   xl:text-md flex flex-col items-center gap-3 rounded-md bg-gray-100 p-3 text-sm font-medium text-gray-900
                                      dark:text-white lg:flex-wrap 2xl:flex-nowrap  "
                            >
                              <span className={cn('flex ', 'flex-row')}>
                                <span>{attribute?.trait_type}</span>
                              </span>

                              <span className="xl:text-md  text-xs font-semibold">
                               
                                {attribute?.value}
                              </span>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </Collapse>
                </div>
                */}
              </div>

              {layout === LAYOUT_OPTIONS.RETRO ? (
                <InfoDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
              ) : (
                <div className=" flex  w-3/5 flex-col ">
                  <div className="items-left mb-10 hidden w-full flex-col justify-center lg:flex xl:flex  ">
                    <Link
                      className=" text-left text-sm font-bold text-blue-500  dark:text-white xl:text-lg "
                      href={`/horse`}
                    >
                      {nftMetadata?.description}
                      {/*Granderby Horse NFT*/}
                    </Link>

                    <div className="mb-3 mt-3 flex w-full flex-row items-center justify-start gap-5">
                      <div className="text-left text-2xl font-bold capitalize text-black  dark:text-white xl:text-4xl">
                        {/*nftMetadata?.title*/}
                        {gameHorseName}
                      </div>
                      <div className="mr-5 flex flex-row items-center justify-between ">
                        <button
                          className=" flex flex-row items-center justify-start  "
                          onClick={() =>
                            router.push(
                              `https://polygonscan.com/nft/${nftDropContractAddressHorse}/${tokenid.tokenid}`
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
                            #{tokenid.tokenid}
                          </span>
                        </button>
                      </div>
                      {/*
                      <button
                        className="ml-10 flex flex-row items-center justify-start "
                        onClick={() => openModal('SHARE_VIEW')}
                      >
                        <Twitter className="h-5 w-5" />

                        <span className=" text-left text-lg font-bold text-black dark:text-white xl:text-xl">
                          share
                        </span>
                      </button>
                      */}
                      UID: {liveHorseInfo?.HORSE_UID}
                    </div>

                    <div className="font-sm mt-2 flex flex-row items-center justify-between text-black  ">
                      affiliated to City One Field
                    </div>

                    {/* owned by */}
                    <div className="mt-3 flex w-full items-center justify-start  gap-4 ">
                      {isLoadingStakerAddress ? (
                        <div className="text-sm font-bold xl:text-lg">
                          <b>Loading Owner...</b>
                        </div>
                      ) : (
                        <>
                          <div className="flex  items-center justify-start text-sm tracking-wider text-black ">
                            Owned by
                          </div>
                          <div className="rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
                            {stakerAddress &&
                            stakerAddress ===
                              '0x0000000000000000000000000000000000000000' ? (
                              <>
                                {owner === address?.toUpperCase() ? (
                                  <div className="text-xl font-bold text-blue-600">
                                    Me
                                  </div>
                                ) : (
                                  <button
                                    className=" flex flex-row items-center justify-start  "
                                    onClick={() =>
                                      router.push(`/user-portfolio/${owner}`)
                                    }
                                  >
                                    <span>
                                      {/*
                                      {owner?.substring(0, 10)}...
                                      */}
                                      {
                                        // capitalize all

                                        owner.toUpperCase()
                                      }
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
                                {stakerAddress &&
                                stakerAddress === address?.toUpperCase() ? (
                                  <div className="text-xl font-bold text-blue-600">
                                    Me
                                  </div>
                                ) : (
                                  <button
                                    className=" flex flex-row items-center justify-start  "
                                    onClick={() =>
                                      router.push(
                                        `/user-portfolio/${stakerAddress}`
                                      )
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

                    {address &&
                      address.toUpperCase() === owner.toUpperCase() && (
                        <div className="mt-5 flex flex-row items-center justify-center gap-2">
                          <input
                            className=" w-full text-black"
                            type="text"
                            name="toAddress"
                            placeholder="To Address"
                            value={toAddress}
                            onChange={(e) => {
                              setToAddress(e.target.value);
                            }}
                          />
                          <Web3Button
                            theme="light"
                            contractAddress={nftDropContractAddressHorse}
                            action={() => {
                              //contract?.call('withdraw', [[nft.metadata.id]])
                              //contract?.call('withdraw', [[nft.metadata.id]])
                              //contract.erc1155.claim(0, 1);

                              ///contract.erc20.transfer(toAddress, amount);

                              transferNft(
                                tokenid.tokenid as string,

                                toAddress
                              );
                            }}
                            onSuccess={() => {
                              //setAmount(0);
                              //setToAddress('');

                              console.log(`🌊 Successfully transfered!`);
                              //alert('Successfully transfered!');

                              //setSuccessMsgSnackbar('Your request has been sent successfully' );
                              //handleClickSucc();
                            }}
                            onError={(error) => {
                              console.error('Failed to transfer', error);
                              alert('Failed to transfer');
                              //setErrMsgSnackbar('Failed to transfer');
                              //handleClickErr();
                            }}
                          >
                            Send
                          </Web3Button>
                        </div>
                      )}
                  </div>

                  <div className=" flex w-full flex-col rounded-lg border ">
                    <Collapse label="Price History" initialOpen={true}>
                      <PriceHistoryTable nftMetadata={nftMetadata} />
                    </Collapse>
                  </div>

                  <div className="mt-5 flex w-full flex-col rounded-lg border ">
                    <Collapse label="Listings" initialOpen={true}>
                      {!directListing ? (
                        <div className="p-5 text-center text-sm font-bold xl:text-lg">
                          No listings yet
                        </div>
                      ) : (
                        <div className="flex flex-row items-center justify-center gap-2">
                          <div className="flex flex-col gap-5 p-5">
                            <div className="flex flex-row items-center justify-start gap-2">
                              <Image
                                src="/images/sale.png"
                                alt="sale"
                                width={30}
                                height={30}
                              />
                              <div className=" text-sm font-bold xl:text-lg">
                                Sell Price
                              </div>
                            </div>

                            <div className=" text-xl font-bold xl:text-2xl">
                              <div className="flex flex-row items-center justify-start gap-2">
                                <Image
                                  src="/images/market.png"
                                  alt="market"
                                  width={30}
                                  height={30}
                                />

                                <div className="flex flex-row items-center justify-center gap-3">
                                  <span className="text-2xl font-bold text-green-600 xl:text-4xl ">
                                    {
                                      directListing?.currencyValuePerToken
                                        .displayValue
                                    }
                                  </span>
                                  <span className="text-sm xl:text-lg">
                                    {' '}
                                    {
                                      directListing?.currencyValuePerToken
                                        .symbol
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>

                            <span className="text-xs">
                              {format(
                                new Date(
                                  directListing?.startTimeInSeconds * 1000
                                ),

                                'yyy-MM-dd hh:mm:ss'
                              )}
                            </span>

                            {address && address.toUpperCase() === owner && (
                              <Web3Button
                                theme="light"
                                action={(contract) =>
                                  //contract?.call('withdraw', [[nft?.metadata?.id]])
                                  //contract?.call('cancel', [[directListing?.id]])

                                  contract?.directListings.cancelListing(
                                    directListing?.id
                                  )
                                }
                                onSuccess={() =>
                                  alert(`🌊 Successfully canceled listing!`)
                                }
                                contractAddress={marketplaceContractAddress}
                              >
                                <span className="flex items-center gap-2">
                                  Cancel Sale
                                </span>
                              </Web3Button>
                            )}

                            {/*
                        {!address && (
                          <div className="flex flex-row items-center justify-center">
                            <ConnectWallet theme="light" btnTitle="Login" />
                            <span className="text-sm font-bold xl:text-xl">
                              &nbsp;&nbsp;for Buy Now
                            </span>
                          </div>
                        )}
                        */}

                            {address && address.toUpperCase() !== owner && (
                              <>
                                {/*
                            <div className="text-sm font-bold xl:text-xl">
                              <Web3Button
                                theme="light"
                                action={(contract) =>
                                  //contract?.call('withdraw', [[nftMetadata?.tokenId]])
                                  buyNft()

                                }
                                contractAddress={marketplaceContractAddress}
                              >
                                <span className="flex items-center gap-2">Buy</span>
                              </Web3Button>
                              {!address && (
                                <span className="text-sm font-bold xl:text-xl">
                                  &nbsp;&nbsp;for Buy Now
                                </span>
                              )}
                            </div>
                            */}

                                {/*
                            <div className=" flex flex-row items-center justify-center  gap-2">
                              <span className="text-md  xl:text-xl">My Balance:</span>

                              {isLoadingTokenBalanceUSDC && (
                                <div className=" text-md  xl:text-xl">Loading...</div>
                              )}
                              <div className="text-md  xl:text-xl">
                                {Number(tokenBalanceUSDC?.displayValue).toFixed(2)}{' '}
                                {tokenBalanceUSDC?.symbol}
                              </div>
                            </div>
                            */}
                              </>
                            )}
                          </div>

                          {/*
                        {address && address !== owner && (
                          <>
                            <div className="text-sm font-bold xl:text-xl">
                              <Web3Button
                                theme="light"
                                action={(contract) =>
                                  //contract?.call('withdraw', [[nftMetadata?.tokenId]])
                                  buyNft()
                                }
                                contractAddress={marketplaceContractAddress}
                              >
                                <span className="flex items-center gap-2">Buy</span>
                              </Web3Button>
                              {!address && (
                                <span className="text-sm font-bold xl:text-xl">
                                  &nbsp;&nbsp;for Buy Now
                                </span>
                              )}
                            </div>

                            <div className=" flex flex-row items-center justify-center  gap-2">
                              <span className="text-md  xl:text-xl">My Balance:</span>

                              {isLoadingTokenBalanceUSDC && (
                                <div className=" text-md  xl:text-xl">Loading...</div>
                              )}
                              <div className="text-md  xl:text-xl">
                                {Number(tokenBalanceUSDC?.displayValue).toFixed(2)}{' '}
                                {tokenBalanceUSDC?.symbol}
                              </div>
                            </div>
                          </>
                        )}

                        */}
                        </div>
                      )}
                    </Collapse>
                  </div>

                  {/* nft profits */}
                  <div className="mt-5 flex w-full flex-col rounded-lg border ">
                    <Collapse label="Profits" initialOpen={true}>
                      <div className=" flex flex-col items-center justify-center gap-5">
                        <div className="flex w-full flex-row items-center justify-center gap-20 p-3">
                          <div className="flex flex-col items-center justify-center gap-5">
                            <span className="text-xl font-bold">ALLOWANCE</span>
                            <Image
                              src="/images/icon-gdp.png"
                              alt="sugar"
                              width={30}
                              height={30}
                            />
                          </div>

                          <div className=" flex w-64 flex-row items-center justify-between gap-2  rounded-lg bg-slate-100 p-3 pl-5 pr-5">
                            <div className="flex flex-col items-end justify-center gap-2">
                              <div className="flex flex-row items-center justify-center gap-2">
                                <div className="  text-xl font-bold">
                                  Accumulate:
                                </div>
                                <div className=" flex w-20 flex-row items-center justify-end gap-2">
                                  <span className="  text-xl font-bold">
                                    {
                                      // dollar format

                                      gameHorseBalance
                                    }
                                  </span>
                                </div>
                              </div>

                              <div className="flex flex-row items-center justify-center gap-2">
                                <div className="  text-xl font-bold">Keep:</div>
                                <div className=" flex w-20 flex-row items-center justify-end gap-2">
                                  <span className="  text-xl font-bold">
                                    {gameHorseBalance}
                                  </span>
                                </div>
                              </div>

                              <div className="flex flex-row items-center justify-center gap-2">
                                <div className="  text-xl font-bold">Last:</div>

                                <div className="flex w-20 flex-row items-center justify-end gap-2">
                                  <span className="  text-lg font-bold text-green-600">
                                    +{gameHorseBalance}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className=" flex w-full flex-col  ">
                          <PointHistoryTable tokenid={nftMetadata.tokenId} />
                        </div>
                      </div>
                    </Collapse>
                  </div>
                  {/* end of nft profits */}
                </div>
              )}
            </div>
          </div>

          <div className=" flex w-full flex-col rounded-lg border">
            <Collapse label="Item Activity" initialOpen={true}>
              <TransferHistoryTable nftMetadata={nftMetadata} />
            </Collapse>
          </div>
        </div>
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
