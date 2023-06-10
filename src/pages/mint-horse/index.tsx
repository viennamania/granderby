import cn from 'classnames';

import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import type { NextPageWithLayout } from '@/types';

import Link from 'next/link';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
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
} from '@thirdweb-dev/react';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorse,
  tokenContractAddressGRD,
} from '../../config/contractAddresses';

import { Stack, Snackbar, Alert } from '@mui/material';

import Head from 'next/head';

export type BlogPost = {
  title: string;
  description: string;
};

const dummyPosts: BlogPost[] = [
  {
    title: 'Lorem Ipsum Dolor Sit Amet',
    description:
      'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Vestibulum Ante Ipsum Primis',
    description:
      'Faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel.',
  },
  {
    title: 'Mauris Blandit Aliquet Elit',
    description:
      'Etiam erat velit, scelerisque in dictum non, consectetur eget mi. Vestibulum ante ipsum primis in faucibus.',
  },
  {
    title: 'Cras Ultricies Ligula Sed',
    description:
      'Pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  },
];

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

  const address = useAddress();

  const { contract: nftDropContract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );

  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  /////console.log('owenedNfts', ownedNfts);

  const [loading, setLoading] = useState(true);
  const [hasNFT, setHasNFT] = useState(false);

  const [sdkClientSecret, setSdkClientSecret] = useState();

  // Thirdweb Stuff
  //const sdk = new ThirdwebSDK('mumbai');

  //const sdk = new ThirdwebSDK('goerli');

  const sdk = new ThirdwebSDK('polygon');

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
  const shareableLink = process.env.NEXT_PUBLIC_SHAREABLE_LINK!;
  const minimumBalance = 1;
  const erc1155TokenId = 0;

  /*
  const { address, connector } = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected });
      console.log('Connected');
    },
    onDisconnect() {
      console.log('Disconnected');
      setPosts([]);
      setHasNFT(false);
    },
  });
  

  useEffect(() => {
    const checkNFT = async () => {
      const contract = await sdk.getContract(contractAddress);

      if (address) {
        const balance = await contract.erc1155.balanceOf(
          address,
          erc1155TokenId
        );
        // const balance = await contract.erc721.balanceOf(address);
        const isValid = balance.gte(minimumBalance);

        if (isValid) {
          const res = await fetch('/api/blogPosts');
          ///const res = await fetch('/apiBlogPosts');
          const posts = await res.json();
          setPosts(posts.data);
          setHasNFT(true);
        } else {
          setPosts([]);
          setHasNFT(false);
        }
      }
    };

    checkNFT();
  }, [address]);

  // Fixes Hydration Issues
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) return null;
  */

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
        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="og:image" content={image}></meta>

        <meta name="twitter:image" content={image}></meta>

        <title>{title}</title>
      </Head>

      {/* page content here */}
      <div className="flex flex-col justify-center text-center">
        {/* Header */}
        <h1 className="mb-2 mt-2 text-3xl">Mint Horse</h1>

        <video id="intro-video" src="/mov/nft.mp4" muted autoPlay></video>

        <div className="mb-10">
          {!address ? (
            <>
              <div className="m-5">No wallet connected</div>
              <ConnectWallet theme="light" />
            </>
          ) : (
            <>
              <div className="m-5">Wallet connected</div>
            </>
          )}

          {/*
        {!address && <div className="m-5">No wallet connected</div>}

        <Web3Button
          theme="light"
          //colorMode="dark"
          //accentColor="#5204BF"
          contractAddress={nftDropContractAddressHorse}
          action={async (contract) => {
            //console.log('Web3Button contract=', contract);

            try {
              const tx = await contract.erc721.claim(1);

              console.log(tx);
              alert('NFT Claimed!');
            } catch (e) {
              console.log(e);
            }
          }}

        >
          Claim An Horse NFT
        </Web3Button>
        */}
        </div>

        {/*
            <div id="paper-checkout-container" className="w-[380px]" />
            */}

        <div className="mb-10 flex flex-row justify-center">
          {sdkClientSecret && (
            <div className="w-[380px]">
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

        <div
          className={cn(
            'grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4 ',
            layout === LAYOUT_OPTIONS.RETRO
              ? 'md:grid-cols-2'
              : 'md:grid-cols-1'
          )}
        >
          {ownedNfts?.map((nft) => (
            <div
              className="mb-5 flex flex-col items-center justify-center"
              key={nft.metadata.id.toString()}
            >
              <ThirdwebNftMedia
                metadata={nft.metadata}
                className="rounded-lg "
              />
              <h4>{nft.metadata.name}</h4>
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

        {/*
<Stack spacing={2} sx={{ width: "100%" }}>
   


</Stack>
   */}
      </div>
    </>
  );
};

MintPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

//MintPage.title = 'Homepage';

export default MintPage;
