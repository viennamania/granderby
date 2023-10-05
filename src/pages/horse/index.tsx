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

import Search from '@/components/search/search-horse';

import ShareView from '@/components/nft/share-view';

import dynamic from 'next/dynamic';

import CoinInput from '@/components/ui/coin-input';

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

const HorsePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { layout } = useLayout();

  const address = useAddress();

  return (
    <>
      <NextSeo title="Profile" description="Granderby - Web3 NFT Game" />

      <div
        className="relative h-36 w-full
        sm:h-44
        md:h-64
        xl:h-80
        2xl:h-96
        3xl:h-[448px]"
      >
        <Image
          src={authorData?.cover_image?.thumbnail}
          placeholder="blur"
          fill
          //className="object-fill"
          className="h-full w-full object-cover"
          alt="Cover Image"
        />

        {/*
        <Image
          src={`https://granderby.io/api/og/dynamic-image-page?id=horse`}
          placeholder="blur"
          blurDataURL="https://granderby.io/images/logo.png"
          fill
          //className="object-cover"
          className="h-full w-full object-cover"
          alt="Cover Image"
        />
        */}
      </div>

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

        <Search />
      </div>

      {/*
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center text-2xl font-bold">Coming Soon</div>
          <div className="text-center text-xl font-bold">Rent your horse</div>
        </div>
      </div>
        */}

      {/*
      <footer>
        <div className=" flex-cols mt-10 flex items-center justify-center gap-3 bg-gray-800 pb-5 pt-10 text-white ">
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
      */}
    </>
  );
};

HorsePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default HorsePage;
