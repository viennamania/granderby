import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import Farms from '@/components/farms/farms';

import TransferHistoryTable from '@/components/nft-transaction/transfer-history-table';

const SchedulePage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Farms" description="Granderby - Web3 NFT Game" />

      <div className="flex h-full w-full flex-col items-start justify-start">
        <span className="text-2xl font-bold xl:text-4xl ">Transfers</span>

        {/*
      <Farms />
      */}

        <TransferHistoryTable nftMetadata={null} />
      </div>
    </>
  );
};

SchedulePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default SchedulePage;
