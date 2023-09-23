import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import Farms from '@/components/farms/farms';

const FinishedPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Farms" description="Granderby - Web3 NFT Game" />

      <Farms />
    </>
  );
};

FinishedPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default FinishedPage;
