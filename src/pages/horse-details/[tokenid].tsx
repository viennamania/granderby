import NftSinglePrice from '@/components/nft-pricing-table/nft-single-price';

import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import RootLayout from '@/layouts/_root-layout';
import { NextPageWithLayout } from '@/types';
import React, { useEffect, useState } from 'react';

import Head from 'next/head';

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

import { nftDropContractAddressHorse } from '@/config/contractAddresses';

import {
  ThirdwebNftMedia,
  useContract,
  useNFT,
  Web3Button,
} from '@thirdweb-dev/react';

import { get } from 'http';
import { set } from 'date-fns';

function SinglePrice(tokenid: any) {
  const [isOpen, setIsOpen] = useState(false);
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  const { contract } = useContract(nftDropContractAddressHorse, 'nft-drop');
  const { data: nftMetadata, isLoading } = useNFT(contract, tokenid.tokenid);

  ///console.log('nftMetadata======>', nftMetadata);

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="mt-0 flex flex-wrap gap-6 lg:flex-nowrap ">
            <div
              className={`w-full 2xl:w-full 
          ${layout === LAYOUT_OPTIONS.RETRO ? '' : 'lg:w-2/3'}`}
            >
              <NftSinglePrice
                //tokenid={tokenid.tokenid}
                nftMetadata={nftMetadata}
                contractAddress={nftDropContractAddressHorse}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </div>

            {layout === LAYOUT_OPTIONS.RETRO ? (
              <InfoDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : (
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
            )}
          </div>

          <div className="mt-0">
            <TransactionTable />

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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: 'Granderby',
      description: 'powered by MOMOCON',
      image: '/images/logo.png',
      //image: {nftMetadata?.metadata?.image},
    },
  };
};

const AssetSinglePrice: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { title, description, image } = props;

  const router = useRouter();

  console.log('id======', router.query.tokenid);

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

        <title>{router.query.tokenid}</title>
      </Head>

      <SinglePrice tokenid={router.query.tokenid} />
    </>
  );
};

AssetSinglePrice.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export default AssetSinglePrice;
