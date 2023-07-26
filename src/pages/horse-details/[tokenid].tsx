import NftSinglePrice from '@/components/nft-pricing-table/nft-single-price';

import RootLayout from '@/layouts/_root-layout';
import { NextPageWithLayout } from '@/types';
import React, { useState } from 'react';

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

import Image from '@/components/ui/image';

import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';

import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';
import AnchorLink from '@/components/ui/links/anchor-link';

import { useRouter } from 'next/router';

function SinglePrice(tokenid: any) {
  const [isOpen, setIsOpen] = useState(false);
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  return (
    <>
      <div className="flex flex-wrap gap-6 lg:flex-nowrap">
        <div
          className={`w-full 2xl:w-full 
        ${layout === LAYOUT_OPTIONS.RETRO ? '' : 'lg:w-2/3'}`}
        >
          <NftSinglePrice
            tokenid={tokenid}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>

        {layout === LAYOUT_OPTIONS.RETRO ? (
          <InfoDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
        ) : (
          <div className="w-full rounded-lg bg-white py-8 shadow-card dark:bg-light-dark xl:max-w-[358px]">
            <h2 className="px-8 text-base font-medium uppercase text-gray-700 dark:text-gray-200">
              NFT Info
            </h2>

            <NftInfo />

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

      <div className="mt-10">
        <HistoryTable />
      </div>

      {/*
      <div className="mt-10">
        <CoinTabs />
      </div> 
      */}

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

const AssetSinglePrice: NextPageWithLayout = () => {
  const router = useRouter();

  console.log('id======', router.query.tokenid);

  return <SinglePrice tokenid={router.query.tokenid} />;
};

AssetSinglePrice.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export default AssetSinglePrice;
