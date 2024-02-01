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

import { format } from 'date-fns';
import { add } from 'lodash';

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

  const [attributes, setAttributes] = useState([] as string[]);

  useEffect(() => {
    let arrAttribute = [] as any;

    //nftMetadata?.metadata?.attributes?.map((attribute: any) => {

    // nftMetadata?.metadata?.attributes is array of objects
    // type assertion to any

    ///nftMetadata?.metadata?.attributes?.map((attribute: any) => {

    const attributes = nftMetadata?.metadata?.attributes as any;

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
  }, [nftMetadata?.metadata?.attributes]);

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
        if (listing.tokenId === nftMetadata?.metadata?.id) {
          //setListingId(listing.id);

          setDirectListing(listing);

          ////console.log('nft-single-price listing', listing);

          return;
        }
      });
    }
  }, [directListings, nftMetadata?.metadata?.id]);

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
                    {nftMetadata?.metadata?.description}
                  </Link>

                  <div className="mb-3 mt-3 flex w-full flex-row items-center justify-start gap-2.5">
                    <div className="text-left text-2xl font-bold capitalize text-black dark:text-white xl:text-3xl">
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
                              {nftMetadata?.owner === address ? (
                                <div className="text-xl font-bold text-blue-600">
                                  Me
                                </div>
                              ) : (
                                <button
                                  className=" flex flex-row items-center justify-start  "
                                  onClick={() =>
                                    router.push(
                                      `/user-portfolio/${nftMetadata?.owner}`
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
                </div>

                <div className=" flex w-full flex-col rounded-lg border ">
                  <Collapse label="Description" initialOpen={true}>
                    <div className="p-5 text-sm font-medium text-gray-900 dark:text-white">
                      By InKenter
                    </div>
                  </Collapse>
                </div>

                <div className=" flex w-full flex-col rounded-lg border ">
                  <Collapse label="Properties" initialOpen={true}>
                    {/* nft attributes details */}

                    <div className=" grid grid-cols-2  items-center justify-between gap-2 p-2 xl:grid-cols-4 2xl:grid-cols-4  ">
                      {
                        //nftMetadata?.metadata?.attributes?.map((attribute: any) => (

                        attributes?.map((attribute: any) => (
                          <div key={attribute?.trait_type}>
                            <div
                              className="   flex flex-col items-center gap-3 rounded-md bg-gray-100 p-3 text-sm font-medium text-gray-900 dark:text-white
                                      lg:flex-wrap xl:text-lg 2xl:flex-nowrap  "
                            >
                              <span className={cn('flex ', 'flex-row')}>
                                <span>{attribute?.trait_type}</span>
                              </span>

                              <span className="xl:text-md  text-xs font-semibold">
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
                      {nftMetadata?.metadata?.description}
                      {/*Granderby Horse NFT*/}
                    </Link>

                    <div className="mb-3 mt-3 flex w-full flex-row items-center justify-start gap-5">
                      <div className="text-left text-2xl font-bold capitalize text-black  dark:text-white xl:text-4xl">
                        {nftMetadata?.metadata?.name}
                      </div>

                      <div className="mr-5 flex flex-row items-center justify-between ">
                        <button
                          className=" flex flex-row items-center justify-start  "
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
                                {nftMetadata?.owner === address ? (
                                  <div className="text-xl font-bold text-blue-600">
                                    Me
                                  </div>
                                ) : (
                                  <button
                                    className=" flex flex-row items-center justify-start  "
                                    onClick={() =>
                                      router.push(
                                        `/user-portfolio/${nftMetadata?.owner}`
                                      )
                                    }
                                  >
                                    <span>
                                      {/*
                                      {nftMetadata?.owner?.substring(0, 10)}...
                                      */}
                                      {
                                        // capitalize all

                                        nftMetadata?.owner.toUpperCase()
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
                                {stakerAddress && stakerAddress === address ? (
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

                    {address && address === nftMetadata?.owner && (
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
                              nftMetadata?.metadata?.id as string,

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

                  {/*
                  <div className=" flex flex-col rounded-lg border ">
                    <NftInfo nftMetadata={nftMetadata} />
                  </div>
                  */}

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
                                  {directListing?.currencyValuePerToken.symbol}
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

                          {address && address === nftMetadata?.owner && (
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

                          {address && address !== nftMetadata?.owner && (
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
                      )}
                    </Collapse>
                  </div>
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
