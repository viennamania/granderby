import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import Image from '@/components/ui/image';
import Avatar from '@/components/ui/avatar';

import Profile from '@/components/rent-horse/profile';

import RetroProfile from '@/components/rent-horse/retro-profile';
// static data
import { authorData } from '@/data/static/authorHorse';
import RootLayout from '@/layouts/_root-layout';

import AnchorLink from '@/components/ui/links/anchor-link';

import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';

import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
//import { Check } from '@/components/icons/check';
//import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';

import Search from '@/components/search/search-horse';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';

import styles from '@/styles/Home.module.css';

import { CheckoutWithCard } from '@paperxyz/react-client-sdk';

import {
  MediaRenderer,
  useNetwork,
  useNetworkMismatch,
  useListing,
  useContract,
  useDirectListing,
  Web3Button,
  useAddress,
  useBalance,
  useTokenBalance,
} from '@thirdweb-dev/react';

import {
  ChainId,
  ListingType,
  Marketplace,
  NATIVE_TOKENS,
  NATIVE_TOKEN_ADDRESS,
} from '@thirdweb-dev/sdk';

import { BigNumber, ethers } from 'ethers';

import {
  tokenContractAddressGRD,
  tokenContractAddressUSDC,
  marketplaceContractAddress,
} from '@/config/contractAddresses';

function SinglePrice(listingid: any) {
  const { layout } = useLayout();

  const router = useRouter();

  const listingId = listingid.listingid;

  const address = useAddress();

  const { data: balance, isLoading: isLoadingBalance } =
    useBalance(NATIVE_TOKEN_ADDRESS);

  const [sdkClientSecret, setSdkClientSecret] = useState();

  useEffect(() => {
    const checkSdkClientSecret = async () => {
      if (address) {
        const res = await fetch('/api/checkout?address=' + address);

        console.log('checkSdkClientSecret res', res);

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

  const { contract: tokenContractGRD } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalanceGRD } = useTokenBalance(tokenContractGRD, address);

  const { contract: tokenContractUSDC } = useContract(
    tokenContractAddressUSDC,
    'token'
  );
  const { data: tokenBalanceUSDC } = useTokenBalance(
    tokenContractUSDC,
    address
  );

  // Hooks to detect user is on the right network and switch them if they are not
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  // Initialize the marketplace contract
  const { contract: marketplace } = useContract(
    marketplaceContractAddress,
    'marketplace-v3'
  );

  // Fetch the listing from the marketplace contract
  /*
  const { data: listing, isLoading: loadingListing } = useListing(
    marketplace,
    listingId
  );
  */

  const {
    //mutateAsync: createDirectListing,
    data: directListing,
    isLoading: loadingListing,
    error,
  } = useDirectListing(marketplace, listingId);

  // Store the bid amount the user entered into the bidding textbox
  const [bidAmount, setBidAmount] = useState<string>('');

  if (loadingListing) {
    return <div className={styles.loadingOrError}>Loading...</div>;
  }

  console.log('directListing', directListing);

  if (!directListing) {
    return <div className={styles.loadingOrError}>Listing not found</div>;
  }

  async function createBidOrOffer() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Polygon);
        return;
      }

      /*
      // If the listing type is a direct listing, then we can create an offer.
      if (listing?.type === ListingType.Direct) {
        await marketplace?.direct.makeOffer(
          listingId, // The listingId of the listing we want to make an offer for
          1, // Quantity = 1
          NATIVE_TOKENS[ChainId.Goerli].wrapped.address, // Wrapped Ether address on Goerli
          bidAmount // The offer amount the user entered
        );
      }
    */

      // If the listing type is an auction listing, then we can create a bid.
      /*
      if (directListing?.type === ListingType.Auction) {

        ////////await marketplace?.auction.makeBid(listingId, bidAmount);

      }
      */

      /*
      alert(
        `${
          directListing?.type === ListingType.Auction ? "Bid" : "Offer"
        } created successfully!`
      );
      */
      alert('Offer created successfully!');
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function buyNft() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Polygon);
        return;
      }

      // Simple one-liner for buying the NFT
      /*
      await marketplace?.buyFromListing(listingId, 1);
      */

      // The ID of the listing you want to buy from
      //const listingId = 0;
      // Quantity of the asset you want to buy
      const quantityDesired = 1;

      await marketplace?.directListings.buyFromListing(
        listingId,
        quantityDesired,
        address
      );

      alert('NFT bought successfully!');
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  // render retro layout profile
  if (layout === LAYOUT_OPTIONS.RETRO) {
    return (
      <>
        <NextSeo title="Profile" description="Granderby - Web3 NFT Game" />

        <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
          <Image
            src={authorData?.cover_image?.thumbnail}
            placeholder="blur"
            fill
            className="h-full w-full object-fill"
            alt="Cover Image"
          />
        </div>

        <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
          <Avatar
            size="xl"
            image={authorData?.avatar?.thumbnail}
            alt="Author"
            className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
          />
          <RetroProfile />
        </div>
      </>
    );
  } else {
    // render default profile

    return (
      <>
        <NextSeo title="Profile" description="Granderby - Web3 NFT Game" />

        <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
          <Image
            src={authorData?.cover_image?.thumbnail}
            placeholder="blur"
            fill
            //className="object-fill"
            className="h-full w-full object-cover"
            alt="Cover Image"
          />
        </div>

        <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
          {address && (
            <>
              {/*
        <h3>
          <b>
            {!balance?.value
              ? 'Loading...'
              : Number(
                  ethers.utils.formatUnits(balance?.value, 18)
                ).toFixed(2)}
          </b>{' '}
          {balance?.symbol}
        </h3>
              */}
              {/*
        <h3>
          My Balance: <b>{Number(tokenBalanceGRD?.displayValue).toFixed(2)}</b>{' '}
          {tokenBalanceGRD?.symbol}
        </h3>
            */}

              {/*
        <h3>
          My Balance: <b>{Number(tokenBalanceUSDC?.displayValue).toFixed(2)}</b>{' '}
          {tokenBalanceUSDC?.symbol}
        </h3>
          */}
            </>
          )}

          <h3 className="flex w-full items-center justify-center text-xl font-bold">
            {directListing.asset.name}
          </h3>

          {/*
        <div className={styles.leftListing}>
          
          <MediaRenderer
            src={directListing.asset.image}
            className={styles.mainNftImage}
          />

        </div>
        */}

          <div className=" w-full items-center justify-center p-5  ">
            <Image
              //fill
              src={
                directListing.asset.image
                  ? directListing.asset.image
                  : '/default-horse.png'
              }
              alt="nft"
              width={1024}
              height={1024}
              className="rounded-lg object-contain"
            />
          </div>

          <div className={styles.rightListing}>
            <p>
              Own by{' '}
              <b>
                {/*
              {directListing.sellerAddress?.slice(0, 6) +
                "..." +
                directListing.sellerAddress?.slice(36, 40)}
              */}
                {directListing.creatorAddress?.slice(0, 6) +
                  '...' +
                  directListing.creatorAddress?.slice(36, 40)}
              </b>
            </p>

            <h2>
              {/*
            <b>{directListing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
            {directListing.buyoutCurrencyValuePerToken.symbol}
                */}
              <b>{directListing.currencyValuePerToken.displayValue}</b>{' '}
              {directListing.currencyValuePerToken.symbol}
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 20,
                alignItems: 'center',
              }}
            >
              {/*
            <button
              style={{ borderStyle: "none" }}
              className={styles.mainButton}
              onClick={buyNft}
            >
              Buy
            </button>
          */}

              {directListing.quantity === '0' ? (
                <div>Sell completed.</div>
              ) : (
                <div className="m-10">
                  {/*
              <Web3Button
                theme="light"
                action={(contract) =>
                  ////contract?.call('withdraw', [[nft.metadata.id]])
                  buyNft()

                }
                contractAddress={marketplaceContractAddress}
              >
                Buy
              </Web3Button>
              */}

                  <div className="flex flex-row justify-center">
                    {address && sdkClientSecret && (
                      <div className="w-[380px] rounded-lg border bg-white p-5">
                        <CheckoutWithCard
                          sdkClientSecret={sdkClientSecret}
                          //onPriceUpdate={ (quantity, unitPrice, networkFees, serviceFees, total) => {
                          onPriceUpdate={(priceSummary) => {
                            console.log(
                              'Payment successful priceSummary',
                              priceSummary
                            );
                          }}
                          onPaymentSuccess={(result) => {
                            console.log('Payment successful result', result);

                            ////mintNFT();
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/*
            <p style={{ color: "grey" }}>|</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <input
                type="text"
                name="bidAmount"
                className={styles.textInput}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Amount"
                style={{ marginTop: 0, marginLeft: 0, width: 128 }}
              />
              <button
                className={styles.mainButton}
                onClick={createBidOrOffer}
                style={{
                  borderStyle: "none",
                  background: "transparent",
                  width: "fit-content",
                }}
              >
                Make Offer
              </button>
            </div>
              */}
            </div>
          </div>
        </div>

        <footer>
          <div className=" flex-cols flex items-center justify-center gap-3 bg-gray-800 pb-5 pt-10 text-white ">
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
}

const ListingPage: NextPageWithLayout = () => {
  const router = useRouter();

  return <SinglePrice listingid={router.query.listingid} />;
};

ListingPage.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingPage;
