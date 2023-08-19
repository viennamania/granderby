import cn from 'classnames';

import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import type { NextPageWithLayout } from '@/types';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';

import { ConnectButton } from '@paperxyz/embedded-wallet-service-rainbowkit';
//import { renderPaperCheckoutLink } from '@paperxyz/js-client-sdk';

import { CheckoutWithCard } from '@paperxyz/react-client-sdk';
import { createCheckoutWithCardElement } from '@paperxyz/js-client-sdk';

//import { useAccount } from 'wagmi';

//import RootLayout from './layout';

import RootLayout from '@/layouts/_root-layout';

import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

import NFTCard from '@/components/nft/NFTCard';

//import '@rainbow-me/rainbowkit/styles.css';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { PaperEmbeddedWalletProvider } from '@paperxyz/embedded-wallet-service-rainbowkit';

import { Stack, Snackbar, Alert } from '@mui/material';

import Head from 'next/head';

import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import AnchorLink from '@/components/ui/links/anchor-link';

import LiveNftPricingSlider from '@/components/ui/live-nft-horse-pricing-slider';

import LivePricingSliderRetro from '@/components/ui/live-pricing-slider-retro';

import {
  nftDropContractAddressCoupon,
  tokenContractAddressGRD,
} from '@/config/contractAddresses';

import {
  useTokenBalance,
  ConnectWallet,
  detectContractFeature,
  useActiveClaimCondition,
  useActiveClaimConditionForWallet,
  useAddress,
  useClaimConditions,
  useClaimedNFTSupply,
  useClaimerProofs,
  useClaimIneligibilityReasons,
  useContract,
  useContractMetadata,
  useNFT,
  useUnclaimedNFTSupply,
  Web3Button,
  useOwnedNFTs,
  ThirdwebNftMedia,
} from '@thirdweb-dev/react';

import { BigNumber, utils } from 'ethers';
import { useMemo } from 'react';
import { HeadingImage } from '@/components/HeadingImage';
import { useToast } from '@/components/ui/use-toast';
import { parseIneligibility } from '@/utils/parseIneligibility';

import { ContractWrapper } from '@thirdweb-dev/sdk/dist/declarations/src/evm/core/classes/contract-wrapper';

///import { CheckoutWithCard } from '@paperxyz/react-client-sdk';

/* ======================================
              Main Component
======================================= */
///const HomePage = () => {

//MintPage.title = 'Homepage';

/*
const Product = (props) => {
    const { title, description } = props;
    */

//export default function VideoPage({ video }) {

//export default function Test({ title }) {

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: 'Granderby - Mint',
      description: 'powered by MOMOCON',
      image: '/mint-bg.png',
    },
  };
};

const MintPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  //const MintPage: NextPageWithLayout = (props) => {
  //const MintPage: NextPageWithLayout = ({title, image}) => {

  const { title, description, image } = props;

  const { layout } = useLayout();

  const { contract: nftDropContract } = useContract(
    nftDropContractAddressCoupon,
    'nft-drop'
  );

  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );

  const [loading, setLoading] = useState(true);
  const [hasNFT, setHasNFT] = useState(false);

  const [sdkClientSecret, setSdkClientSecret] = useState();

  const tokenid = 0;

  const contractQuery = useContract(nftDropContractAddressCoupon);

  const contractMetadata = useContractMetadata(contractQuery.contract);

  console.log('contractMetadata', contractMetadata);

  const { toast } = useToast();
  const theme = 'dark';
  //const root = window.document.documentElement;
  //root.classList.add(theme);

  const address = useAddress();

  console.log('address', address);

  const { data: ownedNfts } = useOwnedNFTs(
    contractQuery.contract,
    address || ''
  );

  console.log('ownedNfts', { ownedNfts });

  const [quantity, setQuantity] = useState(1);

  const claimConditions = useClaimConditions(contractQuery.contract, tokenid);

  /*
  const activeClaimCondition = useActiveClaimConditionForWallet(
    contractQuery.contract,
    address,
    tokenid
  );
  */

  const activeClaimCondition = useActiveClaimCondition(
    contractQuery.contract,
    tokenid
  );

  console.log('activeClaimCondition', { activeClaimCondition });

  const claimerProofs = useClaimerProofs(
    contractQuery.contract,
    address || '',
    tokenid
  );

  const claimIneligibilityReasons = useClaimIneligibilityReasons(
    contractQuery.contract,
    {
      quantity,
      walletAddress: address || '',
    },
    tokenid
  );

  const unclaimedSupply = useUnclaimedNFTSupply(contractQuery.contract);

  const claimedSupply = useClaimedNFTSupply(contractQuery.contract);

  const { data: firstNft, isLoading: firstNftLoading } = useNFT(
    contractQuery.contract,
    tokenid
  );

  console.log({ firstNft, firstNftLoading });

  const firstNftLoading2 = true;

  const numberClaimed = useMemo(() => {
    /////////return BigNumber.from(claimedSupply.data || 0).toString();
    return '0';
  }, [claimedSupply]);

  const numberTotal = useMemo(() => {
    /*
    return BigNumber.from(claimedSupply.data || 0)
      .add(BigNumber.from(unclaimedSupply.data || 0))
      .toString();
      */
    return '10000';
  }, [claimedSupply.data, unclaimedSupply.data]);

  const priceToMint = useMemo(() => {
    const bnPrice = BigNumber.from(
      activeClaimCondition.data?.currencyMetadata.value || 0
    );
    return `${utils.formatUnits(
      bnPrice.mul(quantity).toString(),
      activeClaimCondition.data?.currencyMetadata.decimals || 18
    )} ${activeClaimCondition.data?.currencyMetadata.symbol}`;
  }, [
    activeClaimCondition.data?.currencyMetadata.decimals,
    activeClaimCondition.data?.currencyMetadata.symbol,
    activeClaimCondition.data?.currencyMetadata.value,
    quantity,
  ]);

  const maxClaimable = useMemo(() => {
    let bnMaxClaimable;
    try {
      bnMaxClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimableSupply || 0
      );
    } catch (e) {
      bnMaxClaimable = BigNumber.from(1_000_000);
    }

    let perTransactionClaimable;
    try {
      perTransactionClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimablePerWallet || 0
      );
    } catch (e) {
      perTransactionClaimable = BigNumber.from(1_000_000);
    }

    if (perTransactionClaimable.lte(bnMaxClaimable)) {
      bnMaxClaimable = perTransactionClaimable;
    }

    const snapshotClaimable = claimerProofs.data?.maxClaimable;

    if (snapshotClaimable) {
      if (snapshotClaimable === '0') {
        // allowed unlimited for the snapshot
        bnMaxClaimable = BigNumber.from(1_000_000);
      } else {
        try {
          bnMaxClaimable = BigNumber.from(snapshotClaimable);
        } catch (e) {
          // fall back to default case
        }
      }
    }

    ///const maxAvailable = BigNumber.from(unclaimedSupply.data || 0);
    const maxAvailable = BigNumber.from(10);

    console.log({ maxAvailable, bnMaxClaimable });

    let max;
    if (maxAvailable.lt(bnMaxClaimable)) {
      max = maxAvailable;
    } else {
      max = bnMaxClaimable;
    }

    if (max.gte(1_000_000)) {
      return 1_000_000;
    }
    return max.toNumber();
  }, [
    claimerProofs.data?.maxClaimable,
    unclaimedSupply.data,
    activeClaimCondition.data?.maxClaimableSupply,
    activeClaimCondition.data?.maxClaimablePerWallet,
  ]);

  const isOpenEdition = useMemo(() => {
    if (contractQuery?.contract) {
      const contractWrapper = (contractQuery.contract as any)
        .contractWrapper as ContractWrapper<any>;

      const featureDetected = detectContractFeature(
        contractWrapper,
        'ERC721SharedMetadata'
      );

      return featureDetected;
    }
    return false;
  }, [contractQuery.contract]);

  const isSoldOut = useMemo(() => {
    try {
      return (
        (activeClaimCondition.isSuccess &&
          BigNumber.from(activeClaimCondition.data?.availableSupply || 0).lte(
            0
          )) ||
        (numberClaimed === numberTotal && !isOpenEdition)
      );
    } catch (e) {
      return false;
    }
  }, [
    activeClaimCondition.data?.availableSupply,
    activeClaimCondition.isSuccess,
    numberClaimed,
    numberTotal,
    isOpenEdition,
  ]);

  const canClaim = useMemo(() => {
    return (
      activeClaimCondition.isSuccess &&
      claimIneligibilityReasons.isSuccess &&
      claimIneligibilityReasons.data?.length === 0 &&
      !isSoldOut
    );
  }, [
    activeClaimCondition.isSuccess,
    claimIneligibilityReasons.data?.length,
    claimIneligibilityReasons.isSuccess,
    isSoldOut,
  ]);

  const isLoading = useMemo(() => {
    console.log(
      'activeClaimCondition.isLoading',
      activeClaimCondition.isLoading
    );
    console.log('unclaimedSupply.isLoading', unclaimedSupply.isLoading);
    console.log('claimedSupply.isLoading', claimedSupply.isLoading);

    return (
      activeClaimCondition.isLoading ||
      //////unclaimedSupply.isLoading ||
      /////////claimedSupply.isLoading ||

      !contractQuery.contract
    );
  }, [
    activeClaimCondition.isLoading,
    contractQuery.contract,
    claimedSupply.isLoading,
    unclaimedSupply.isLoading,
  ]);

  console.log('isLoading==============', isLoading);

  const buttonLoading = useMemo(
    () => isLoading || claimIneligibilityReasons.isLoading,
    [claimIneligibilityReasons.isLoading, isLoading]
  );

  console.log('buttonLoading==============', buttonLoading);

  const buttonText = useMemo(() => {
    if (isSoldOut) {
      return 'Sold Out';
    }

    if (canClaim) {
      const pricePerToken = BigNumber.from(
        activeClaimCondition.data?.currencyMetadata.value || 0
      );
      if (pricePerToken.eq(0)) {
        return 'Mint (Free)';
      }
      return `Mint (${priceToMint})`;
    }

    if (claimIneligibilityReasons.data?.length) {
      return parseIneligibility(claimIneligibilityReasons.data, quantity);
    }

    if (buttonLoading) {
      return 'Checking eligibility...';
    }

    return 'Minting not available';
  }, [
    isSoldOut,
    canClaim,
    claimIneligibilityReasons.data,
    buttonLoading,
    activeClaimCondition.data?.currencyMetadata.value,
    priceToMint,
    quantity,
  ]);

  const dropNotReady = useMemo(
    () =>
      claimConditions.data?.length === 0 ||
      claimConditions.data?.every((cc) => cc.maxClaimableSupply === '0'),
    [claimConditions.data]
  );

  const dropStartingSoon = useMemo(
    () =>
      (claimConditions.data &&
        claimConditions.data.length > 0 &&
        activeClaimCondition.isError) ||
      (activeClaimCondition.data &&
        activeClaimCondition.data.startTime > new Date()),
    [
      activeClaimCondition.data,
      activeClaimCondition.isError,
      claimConditions.data,
    ]
  );

  useEffect(() => {
    const checkSdkClientSecret = async () => {
      if (address) {
        const res = await fetch('/api/checkout?address=' + address);

        //console.log("res", res);

        const { sdkClientSecret } = await res.json();

        //console.log("sdkClientSecret", sdkClientSecret);

        setSdkClientSecret(sdkClientSecret);

        /*
        const options = {
          colorBackground: '#fefae0',
          colorPrimary: '#606c38',
          colorText: '#283618',
          borderRadius: 6,
          inputBackgroundColor: '#faedcd',
          inputBorderColor: '#d4a373',
        };
        
        createCheckoutWithCardElement({
          sdkClientSecret: sdkClientSecret,
          elementOrId: "paper-checkout-container",
          appName: "My Web3 App",
          
          options,
      
          onError(error) {
            console.error("Payment error:", error);
          },
          onPaymentSuccess({ id }) {
            console.log("Payment successful.");
          },
        });
        */
      }
    };

    checkSdkClientSecret();
  }, [address]);

  const mintNFT = async () => {
    try {
      /*
      const { contract: nftDropContract } = useContract(
        nftDropContractAddressHorse,
        'nft-drop'
      );
      */

      /*
      const contract = await sdk.getContract(nftDropContractAddressHorse);

      const tx = await contract.erc721.claim(1);
      */

      const tx = await nftDropContract?.erc721.claim(1);

      console.log(tx);

      alert('NFT Claimed!');
    } catch (e) {
      console.log(e);
    }
  };

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

      {/* page content here */}
      <div className="flex flex-col justify-center text-center">
        {/* Header */}
        <h1 className="mb-2 mt-2 text-3xl">Coupon</h1>

        {/*
        <video id="intro-video" src="/mov/nft.mp4" muted autoPlay></video>
  */}

        {/*
        <LiveNftPricingSlider limits={4} />
        */}

        <div className=" mt-10 flex flex-row justify-center">
          {address && sdkClientSecret && (
            <div className="w-[380px] rounded-lg border p-5">
              <CheckoutWithCard
                sdkClientSecret={sdkClientSecret}
                //onPriceUpdate={ (quantity, unitPrice, networkFees, serviceFees, total) => {
                onPriceUpdate={(priceSummary) => {
                  console.log('Payment successful priceSummary', priceSummary);
                  /*
                  console.log('Payment successful quantity', quantity);
                  console.log('Payment successful unitPrice', unitPrice);
                  console.log('Payment successful networkFees', networkFees);
                  console.log('Payment successful serviceFees', serviceFees);
                  console.log('Payment successful total', total);
                  */
                }}
                onPaymentSuccess={(result) => {
                  console.log('Payment successful result', result);

                  mintNFT();
                }}
              />
            </div>
          )}
        </div>

        {/*
        <div className=" mt-10 flex flex-row justify-center">

          <Web3Button
            theme="light"
            //colorMode="dark"
            //accentColor="#5204BF"
            contractAddress={nftDropContractAddressHorse}
            action={async (contract) => {
              console.log('Web3Button contract=', contract);

              try {
                const tx = await contract.erc721.claim(1);

                console.log(tx);
                alert('NFT Claimed!');
              } catch (e) {
                console.log(e);
              }
            }}
          >
            Claim An NFT
          </Web3Button>
        </div>
        */}

        <div className="mb-3 mt-16">
          {!address ? (
            <>
              <ConnectWallet />
              <h4>to see my own coupons</h4>
            </>
          ) : (
            <>
              <h3>my own coupons</h3>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {ownedNfts?.map((nft) => (
            <div
              className="mb-2 flex flex-col  items-center justify-center gap-3"
              key={nft.metadata.id.toString()}
            >
              <div className="justifiy-center flex flex-row items-center gap-2">
                {nft.metadata.name} x {nft.quantityOwned}
              </div>
              {/*
              <ThirdwebNftMedia
                metadata={nft.metadata}
                className="rounded-lg "
              />
              */}
              <Image
                src={nft.metadata.image || ''}
                width={200}
                height={200}
                alt={String(nft.metadata.name) || ''}
                className="rounded-lg "
              />
            </div>
          ))}
        </div>

        {/* Blog Posts */}
        {/*
      {hasNFT ? (
        <div className="bg-dark-main text-light-main mx-auto mb-10 mt-8 max-w-5xl p-4">
          <div className="grid grid-cols-2 gap-4">
            {posts.map((post, index) => (
              <div
                key={index}
                className="bg-dark-secondary min-h-[200px] rounded p-4 text-left"
              >
                <h2 className="text-light-secondary mb-2 text-xl">
                  {post.title}
                </h2>
                <p className="text-light-tertiary mt-3">{post.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-dark-main text-light-main mx-auto mb-10 mt-8 max-w-5xl p-4">
          <div className="grid grid-cols-2 gap-4">
            {dummyPosts.map((post, index) => (
              <div
                key={index}
                className="bg-dark-secondary min-h-[200px] rounded p-4 text-left"
              >
                <h2 className="text-light-secondary mb-2 text-xl blur-sm">
                  {post.title}
                </h2>
                <p className="text-light-tertiary mt-3 blur-sm">
                  {post.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
            */}

        {/* Buy NFT Button */}
        {/*
      {!address ? null : hasNFT ? null : (
        <button
          onClick={() =>
            renderPaperCheckoutLink({
              checkoutLinkUrl: shareableLink,
            })
          }
          className="bg-dark-tertiary hover:bg-dark-quaternary rounded px-5 py-3 transition-all"
        >
          Buy with Paper
        </button>
      )}
        */}

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="hidden h-full w-full items-center justify-center lg:col-span-5 lg:flex lg:px-12">
            <HeadingImage
              src={
                contractMetadata.data?.image || firstNft?.metadata.image || ''
                //'/images/coupons/Coupon_u.png'
              }
              isLoading={isLoading}
            />
          </div>

          <div className="col-span-1 flex h-full w-full items-center justify-center lg:col-span-7">
            <div className="flex w-full max-w-xl flex-col gap-4 rounded-xl p-5 lg:border lg:border-gray-400 lg:dark:border-gray-800">
              <div className="flex flex-col gap-2 xs:gap-4">
                {isLoading ? (
                  <div
                    role="status"
                    className="animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0"
                  >
                    <div className="w-full">
                      <div className="h-10 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>
                ) : isOpenEdition ? null : (
                  <p>
                    {/*
                  <span className="text-lg font-bold tracking-wider text-gray-500 xs:text-xl lg:text-2xl">
                      {numberClaimed}
                  </span>{" "}
                  <span className="text-lg font-bold tracking-wider xs:text-xl lg:text-2xl">
                      / {numberTotal} minted
                  </span>
                  */}
                  </p>
                )}
                <h1 className="line-clamp-1 text-2xl font-bold xs:text-3xl lg:text-4xl">
                  {contractMetadata.isLoading ? (
                    <div
                      role="status"
                      className="animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0"
                    >
                      <div className="w-full">
                        <div className="h-8 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    contractMetadata.data?.name
                  )}
                </h1>
                {contractMetadata.data?.description ||
                contractMetadata.isLoading ? (
                  <div className="line-clamp-2 text-gray-500">
                    {contractMetadata.isLoading ? (
                      <div
                        role="status"
                        className="animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0"
                      >
                        <div className="w-full">
                          <div className="mb-2.5 h-2 max-w-[480px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                          <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      contractMetadata.data?.description
                    )}
                  </div>
                ) : null}
              </div>

              <div className="flex w-full gap-4">
                {dropNotReady ? (
                  <span className="text-red-500">
                    This drop is not ready to be minted yet. (No claim condition
                    set)
                  </span>
                ) : dropStartingSoon ? (
                  <span className="text-gray-500">
                    Drop is starting soon. Please check back later.
                  </span>
                ) : (
                  <div className="flex w-full flex-col gap-4">
                    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-4 ">
                      <div className="flex h-11 w-full rounded-lg border border-gray-400 px-2 dark:border-gray-800 md:w-full">
                        <button
                          onClick={() => {
                            const value = quantity - 1;
                            if (value > maxClaimable) {
                              setQuantity(maxClaimable);
                            } else if (value < 1) {
                              setQuantity(1);
                            } else {
                              setQuantity(value);
                            }
                          }}
                          className="flex h-full items-center justify-center rounded-l-md px-2 text-center text-2xl disabled:cursor-not-allowed disabled:text-gray-500 dark:text-white dark:disabled:text-gray-600"
                          disabled={isSoldOut || quantity - 1 < 1}
                        >
                          -
                        </button>
                        <p className="flex h-full w-full items-center justify-center text-center font-mono dark:text-white lg:w-full">
                          {!isLoading && isSoldOut ? 'Sold Out' : quantity}
                        </p>
                        <button
                          onClick={() => {
                            const value = quantity + 1;
                            if (value > maxClaimable) {
                              setQuantity(maxClaimable);
                            } else if (value < 1) {
                              setQuantity(1);
                            } else {
                              setQuantity(value);
                            }
                          }}
                          className={
                            'flex h-full items-center justify-center rounded-r-md px-2 text-center text-2xl disabled:cursor-not-allowed disabled:text-gray-500 dark:text-white dark:disabled:text-gray-600'
                          }
                          disabled={isSoldOut || quantity + 1 > maxClaimable}
                        >
                          +
                        </button>
                      </div>

                      <Web3Button
                        contractAddress={
                          contractQuery.contract?.getAddress() || ''
                        }
                        /*
                      style={{
                          backgroundColor:
                          colors[primaryColor as keyof typeof colors] ||
                          primaryColor,
                          maxHeight: "43px",
                      }}
                      */

                        theme={theme}
                        action={(cntr) => cntr.erc1155.claim(tokenid, quantity)}
                        isDisabled={!canClaim || buttonLoading}
                        onError={(err) => {
                          console.error(err);
                          console.log({ err });

                          toast({
                            title: 'Failed to mint drop',
                            description: (err as any).reason || '',
                            duration: 9000,
                            variant: 'destructive',
                          });
                        }}
                        onSuccess={() => {
                          toast({
                            title: 'Successfully minted',
                            description:
                              'The NFT has been transferred to my wallet',
                            duration: 5000,
                            className: 'bg-green-500',
                          });
                        }}
                      >
                        {buttonLoading ? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="mr-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          buttonText
                        )}
                      </Web3Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex w-full items-center justify-center xs:mb-8 xs:mt-0 lg:hidden">
                <HeadingImage
                  src={
                    contractMetadata.data?.image ||
                    firstNft?.metadata.image ||
                    //''
                    '/images/coupons/Coupon_u.png'
                  }
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

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
};

MintPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

//MintPage.title = 'Homepage';

export default MintPage;
