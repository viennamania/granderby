import type {
  CryptoQueryOptions,
  NextPageWithLayout,
  SettingsQueryOptions,
} from '@/types';
import RootLayout from '@/layouts/_root-layout';
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { API_ENDPOINTS } from '@/data/utils/endpoints';
import client from '@/data/utils';
import { useCoins } from '@/hooks/useCoin';
import { NextSeo } from 'next-seo';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

import CryptocurrencyPricingTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-pricing-table';

import LivePricingSlider from '@/components/ui/live-pricing-slider';

import LivePricingSliderRetro from '@/components/ui/live-pricing-slider-retro';

import LiveNftPricingSlider from '@/components/ui/live-nft-horse-pricing-slider';

import CryptoCurrencyPricingSkeleton from '@/components/ui/skeleton/CryptoCurrencyPricingSkeleton';
import CryptocurrencyPricingRetroTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-pricing-retro-table';

import Image from '@/components/ui/image';

import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';

import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';
import AnchorLink from '@/components/ui/links/anchor-link';

import Races from '@/components/races/races';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery(
        [API_ENDPOINTS.SETTINGS, { language: locale }],
        ({ queryKey }) =>
          client.settings.all(queryKey[1] as SettingsQueryOptions)
      ),
      queryClient.prefetchInfiniteQuery(
        [API_ENDPOINTS.PRICING, { language: locale }],
        ({ queryKey }) => client.coins.all(queryKey[1] as CryptoQueryOptions)
      ),
    ]);
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 300, // In seconds
    };
  } catch (error) {
    //* if we get here, the product doesn't exist or something else went wrong
    return {
      notFound: true,
    };
  }
};

function CoinPrices() {
  const { layout } = useLayout();
  // const { isLoading, error } = useCoins();

  // if (isLoading) {
  //   return <CryptoCurrencyPricingSkeleton />;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  if (layout === LAYOUT_OPTIONS.RETRO) {
    return (
      <>
        <NextSeo title="Race List" description="Granderby - Web3 NFT Game" />
        <LivePricingSliderRetro limits={3} />
        <CryptocurrencyPricingRetroTable />
      </>
    );
  }

  return (
    <>
      <NextSeo title="Race List" description="Granderby - Web3 NFT Game" />

      {/*
      <LivePricingSlider limits={4} />
  */}

      <div className="mb-10 ">
        <LiveNftPricingSlider limits={4} />
      </div>

      <div className="mb-10 ">
        <h4>Race List</h4>

        <Races />
      </div>

      {/*
      <CryptocurrencyPricingTable />
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

const LiveDemo: NextPageWithLayout = () => {
  return <CoinPrices />;
};

LiveDemo.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default LiveDemo;
