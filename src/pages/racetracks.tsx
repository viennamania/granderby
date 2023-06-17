import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';

import RootLayout from '@/layouts/_root-layout';

import Racetracks from '@/components/racetracks/racetracks';

const RacetracksPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Racetracks" description="Granderby - Web3 NFT Game" />

      <Racetracks />
    </>
  );
};

RacetracksPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default RacetracksPage;
