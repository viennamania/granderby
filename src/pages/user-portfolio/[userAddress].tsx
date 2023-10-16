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

import { SearchIcon } from '@/components/icons/search';

///import Search from '@/components/search/search-horse';

import Search from '@/components/search/search-portfolio';

import CollapseLivePricing from '@/components/ui/collapse-live-pricing';
import LiveNftPricingSlider from '@/components/ui/live-nft-horse-pricing-slider';

import PortfolioScreen from '@/components/screens/user-portfolio-screen';

import { useState, useEffect } from 'react';

import { useCopyToClipboard } from 'react-use';
import { Copy } from '@/components/icons/copy';
import { Check } from '@/components/icons/check';

import { useQRCode } from 'next-qrcode';

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

const PortfolioPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { userAddress } = props;

  console.log('user-portfolio userAddress', userAddress);

  const { layout } = useLayout();

  const address = useAddress();

  const { Canvas } = useQRCode();

  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();

  function handleCopyToClipboard() {
    copyToClipboard(address as string);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }

  const [horsesTotalPricePaid, setHorsesTotalPricePaid] = useState<any>(0);

  useEffect(() => {
    async function getHorsesCount() {
      if (!userAddress) return;

      const response = await fetch('/api/nft/getHorsesCount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'getAllByHolder',
          holder: userAddress,
          ///grades: selectedGradesStorage,
          grades: [],
          manes: [],
        }),
      });
      const data = await response.json();

      setHorsesTotalPricePaid(data.totalPricePaid);
    }

    getHorsesCount();
  }, [userAddress]);

  return (
    <>
      <NextSeo title="Portfolio" description="Granderby - Web3 NFT Game" />

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
        <h1 className="text-2xl xl:text-4xl">User Portfolio</h1>

        <div className="mt-5 flex flex-row items-center justify-start gap-3">
          <span className=" text-sm xl:text-xl">Total Price:</span>
          <span className=" text-sm font-bold xl:text-xl">
            {horsesTotalPricePaid} USD
          </span>
        </div>

        {!userAddress ? (
          <></>
        ) : (
          <div className="mt-5 flex flex-col items-start justify-center">
            {/*
            <div className="mb-5 mt-5 flex flex-row items-center justify-center gap-3">
              <span className=" text-sm">{address}</span>

              <div title="Copy Address" onClick={() => handleCopyToClipboard()}>
                {copyButtonStatus ? (
                  <Check className="h-auto w-3.5 text-green-500" />
                ) : (
                  <Copy className="h-auto w-3.5" />
                )}
              </div>
            </div>
            */}

            {/*
            <Canvas
              text={address}
              options={{
                level: 'M',
                margin: 3,
                scale: 4,
                width: 150,
                color: {
                  dark: '#010599FF',
                  light: '#FFBF60FF',
                },
              }}
            />
            */}
          </div>
        )}

        {/*
        <Profile />
          */}

        {/*
        <CollapseLivePricing label="Live Pricing">
          <div className="p-5">
            <LiveNftPricingSlider limits={2} />
          </div>
        </CollapseLivePricing>
        */}

        {/*
        <Search />
        */}

        <PortfolioScreen userAddress={userAddress} />
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

PortfolioPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default PortfolioPage;
