import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';

import RootLayout from '@/layouts/_root-layout';

import Farms from '@/components/fields/fields';

const FieldsPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Fields" description="Granderby - Web3 NFT Game" />

      <Farms />
    </>
  );
};

FieldsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default FieldsPage;
