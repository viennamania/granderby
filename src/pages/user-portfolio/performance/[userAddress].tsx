import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import Image from '@/components/ui/image';
import Avatar from '@/components/ui/avatar';

import Profile from '@/components/rent-horse/profile';

import RetroProfile from '@/components/rent-horse/retro-profile';
// static data
import { authorData } from '@/data/static/authorHorse';
import RootLayout from '@/layouts/_root-layout';

export async function getStaticPaths() {
  return {
    paths: [{ params: { userAddress: '1' } }],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const userAddress: string = context.params?.userAddress;

  return {
    props: {
      userAddress: userAddress,
    },
  };
};

const PerformancePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { layout } = useLayout();

  const { userAddress } = props;

  console.log('user-portfolio performance userAddress', userAddress);

  return (
    <>
      <NextSeo title="Performance" description="Granderby - Web3 NFT Game" />

      {/*
      <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
        <Image
          src={authorData?.cover_image?.thumbnail}
          placeholder="blur"
          fill
          //className="object-fill"
          className="h-full w-full object-cover"
          alt="Cover Image"
        />
      </div>
      */}

      <div className=" mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        <h1 className="text-2x xl:text-4xl">Performance</h1>

        {!userAddress ? (
          <></>
        ) : (
          <div className="mt-5 flex flex-col items-start justify-center"></div>
        )}

        {/*
        <Profile />
        */}

        {/*
        <PerformanceScreen />
        */}
      </div>

      {/*
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center text-2xl font-bold">Coming Soon</div>
          <div className="text-center text-xl font-bold">Rent your horse</div>
        </div>
      </div>
        */}
    </>
  );
};

PerformancePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default PerformancePage;
