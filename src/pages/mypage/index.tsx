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

import { useAddress } from '@thirdweb-dev/react';

import AnchorLink from '@/components/ui/links/anchor-link';

import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';

import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
//import { Check } from '@/components/icons/check';
//import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';

///import Search from '@/components/search/search-horse';

import Search from '@/components/search/search-asset';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const MyPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { layout } = useLayout();

  const address = useAddress();

  {
    /* if not address notice connect wallet */
  }

  if (!address) {
    return (
      <>
        <NextSeo title="My Page" description="Granderby - Web3 NFT Game" />

        {/* title */}
        <div className="mb-10 flex items-center justify-start">
          <div className="text-center text-2xl font-bold">My Page</div>
        </div>

        <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
          <Image
            src={authorData?.cover_image?.thumbnail}
            placeholder="blur"
            fill
            className="h-full w-full object-fill"
            alt="Cover Image"
          />
        </div>

        <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
          <Avatar
            size="xl"
            image={authorData?.avatar?.thumbnail}
            alt="Author"
            className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
          />
          <div className="flex flex-col items-center justify-center">
            <div className="text-center text-2xl font-bold">Login</div>
            <div className="text-center text-xl font-bold">
              to see your profile
            </div>
          </div>
        </div>
      </>
    );
  }

  // render retro layout profile
  if (layout === LAYOUT_OPTIONS.RETRO) {
    return (
      <>
        <NextSeo title="Profile" description="Granderby - Web3 NFT Game" />

        <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
          <Image
            src={authorData?.cover_image?.thumbnail}
            placeholder="blur"
            fill
            className="h-full w-full object-fill"
            alt="Cover Image"
          />
        </div>

        <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
          <Avatar
            size="xl"
            image={authorData?.avatar?.thumbnail}
            alt="Author"
            className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
          />
          <RetroProfile />
        </div>
      </>
    );
  } else {
    // render default profile

    return (
      <>
        <NextSeo title="My Page" description="Granderby - Web3 NFT Game" />

        {/* title */}
        <div className="flex items-center justify-start ">
          <div className="text-center text-2xl font-bold">My Page</div>
        </div>

        {address ? (
          <div className="flex flex-col items-start justify-center gap-2">
            <span className="text-xs xl:text-lg">My Wallet Address:</span>
            <span className="text-sm font-bold xl:text-lg">{address}</span>
          </div>
        ) : (
          <div className="relative h-36 w-full overflow-hidden  sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
            <Image
              src={authorData?.cover_image?.thumbnail}
              placeholder="blur"
              fill
              //className="object-fill"
              className="h-full w-full object-cover"
              alt="Cover Image"
            />
          </div>
        )}

        <div className=" mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
          {/*
          {!address ? (
            <></>
          ) : (
            <Avatar
              size="xl"
              image={authorData?.avatar?.thumbnail}
              alt="Author"
              className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
            />
          )}
            */}

          {/*
          <Profile />
            */}

          {/*
          <Search />
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
  }
};

MyPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default MyPage;
