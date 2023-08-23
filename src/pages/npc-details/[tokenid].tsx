import NftSinglePrice from '@/components/nft-pricing-table/nft-single-price-npc';

import RootLayout from '@/layouts/_root-layout';
import { NextPageWithLayout } from '@/types';
import React, { useEffect, useState } from 'react';

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

import { nftDropContractAddressNpc } from '@/config/contractAddresses';

import {
  ThirdwebNftMedia,
  useContract,
  useNFT,
  Web3Button,
} from '@thirdweb-dev/react';

import { get } from 'http';
import { set } from 'date-fns';

function SinglePrice(tokenid: any) {
  console.log('SinglePrice tokenid============', tokenid);

  const [isOpen, setIsOpen] = useState(false);
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  /*
  const { contract } = useContract(
    nftDropContractAddressNpc,
    'nft-drop'
  );
  const { data: nftMetadata } = useNFT(contract, tokenid.tokenid);


  console.log("nftMetadata", nftMetadata);
  */

  return (
    <>
      <div className="mt-0 flex flex-wrap gap-6 lg:flex-nowrap ">
        <div
          className={`w-full 2xl:w-full 
        ${layout === LAYOUT_OPTIONS.RETRO ? '' : 'lg:w-2/3'}`}
        >
          <NftSinglePrice
            tokenid={tokenid.tokenid}
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

            {/*
            <NftInfo nftMetadata={nftMetadata} />
          */}

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
  );
}

const AssetSinglePrice: NextPageWithLayout = () => {
  const router = useRouter();

  console.log(' AssetSinglePrice id======', router.query.tokenid);

  return <SinglePrice tokenid={router.query.tokenid} />;
};

AssetSinglePrice.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export default AssetSinglePrice;
