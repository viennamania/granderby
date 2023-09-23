import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { NextPageWithLayout } from '@/types';
import RootLayout from '@/layouts/_root-layout';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

import ModernScreen from '@/components/screens/modern-screen';

/*
import MinimalScreen from '@/components/screens/minimal-screen';
import ClassicScreen from '@/components/screens/classic-screen';
import RetroScreen from '@/components/screens/retro-screen';
import MomoconScreen from '@/components/screens/momocon-screen';
*/

import Head from 'next/head';

import Image from '@/components/ui/image';

import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';

import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';
import AnchorLink from '@/components/ui/links/anchor-link';

import { use, useEffect } from 'react';

import { useAddress, usePaperWalletUserEmail } from '@thirdweb-dev/react';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: 'Granderby - Home',
      description: 'powered by MOMOCON',
      image: '/intro-bg.png',
    },
  };
};

const HomePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { title, image, description } = props;

  const { layout } = useLayout();

  const address = useAddress();
  const emailQuery = usePaperWalletUserEmail();

  useEffect(() => {
    async function checkUser() {
      if (address) {
        //console.log('address: ', address);
        //console.log('emailQuery: ', emailQuery);

        var email = '';

        if (emailQuery.data) {
          email = emailQuery.data;
        } else {
          email = address + '@granderby.io';
        }

        const username = email;
        const password = '12345678';

        const formInputs = {
          username: username,
          email: email,
          pass1: password,
          pass2: password,
          walletAddress: address,
          //bonus: settings?.welcomeBonus ?? 0
          bonus: 0,
        };

        const res = await fetch('/api/user?method=create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formInputs),
        });
        const data = await res.json();

        console.log('data: ', data);

        if (data.status) {
          //console.log('data: ', data);
        } else {
          //console.log('user: ', data.user);
        }
      }
    }

    checkUser();
  }, [address, emailQuery]);

  // render morden screen/page
  /*
  if (layout === LAYOUT_OPTIONS.MODERN) {
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1 maximum-scale=1"
          />
          <meta property="og:type" content="website"></meta>

          <meta property="og:site_name" content="GRANDERBY"></meta>
          <meta name="twitter:card" content="summary_large_image"></meta>

          <meta property="og:image:width" content="1400"></meta>
          <meta property="og:image:height" content="1400"></meta>

          <meta property="og:title" content={title}></meta>
          <meta property="og:description" content={description}></meta>
          <meta property="og:image" content={image}></meta>

          <meta name="twitter:image" content={image}></meta>

          <title>{title}</title>
        </Head>

        <ModernScreen />

        <footer>
          <div className="flex-cols mt-10 flex items-center justify-center gap-3 bg-gray-800 pb-5 pt-10 text-white ">
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
  */

  /*
  // render minimal screen/page
  if (layout === LAYOUT_OPTIONS.MINIMAL) {
    return <MinimalScreen />;
  }

  // render classic screen/page
  if (layout === LAYOUT_OPTIONS.CLASSIC) {
    return <ClassicScreen />;
  }

  // render retro screen/page
  if (layout === LAYOUT_OPTIONS.RETRO) {
    return <RetroScreen />;
  }

  // render retro screen/page
  if (layout === LAYOUT_OPTIONS.MOMOCON) {
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1 maximum-scale=1"
          />
          <meta property="og:type" content="website"></meta>

          <meta property="og:site_name" content="GRANDERBY"></meta>
          <meta name="twitter:card" content="summary_large_image"></meta>

          <meta property="og:image:width" content="1400"></meta>
          <meta property="og:image:height" content="1400"></meta>

          <meta property="og:title" content={title}></meta>
          <meta property="og:description" content={description}></meta>
          <meta property="og:image" content={image}></meta>

          <meta name="twitter:image" content={image}></meta>

          <title>{title}</title>
        </Head>

        <MomoconScreen />

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
  */

  // render default screen/page which is modern
  ///return <ModernScreen />;

  // render default screen/page which is minimal
  //return <MinimalScreen />;

  // render default screen/page which is momocon
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <meta property="og:type" content="website"></meta>

        <meta property="og:site_name" content="GRANDERBY"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>

        <meta property="og:image:width" content="1400"></meta>
        <meta property="og:image:height" content="1400"></meta>

        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="og:image" content={image}></meta>

        <meta name="twitter:image" content={image}></meta>

        <title>{title}</title>
      </Head>

      <ModernScreen />
    </>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default HomePage;
