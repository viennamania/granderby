import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import Farms from '@/components/farms/farms';

import SaleHistoryTable from '@/components/nft-transaction/sale-history-table';

export const getStaticProps: GetStaticProps = async (context: any) => {
  const contractAddress: string = context.params?.contractAddress;

  const pageid = 'horse';
  const title = 'Granderby Horse NFT';
  const description =
    'Items 3,645 · Created Jun 2023 · Creator earnings 0% · Chain Polygon · Category Gaming';

  return {
    props: {
      pageid: pageid,
      //////nftMetadata: nft,
      title: title,
      description: description,
    },
  };
};

const SalesPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  return (
    <>
      <NextSeo title="Sales" description="Granderby - Web3 NFT Game" />

      <div className="flex h-full w-full flex-col items-start justify-start">
        <span className="text-2xl font-bold xl:text-4xl ">Sales</span>

        <SaleHistoryTable nftMetadata={null} />
      </div>
    </>
  );
};

SalesPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default SalesPage;
