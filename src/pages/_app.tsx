import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
// import { Fira_Code } from 'next/font/google';

import { ThemeProvider } from 'next-themes';

import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.css';

/*
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
*/

import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
//import SettingsButton from '@/components/settings/settings-button';
//import SettingsDrawer from '@/components/settings/settings-drawer';

import EntriesButton from '@/components/entries/entries-button';
import EntriesDrawer from '@/components/entries/entries-drawer';

//import InventoriesButton from '@/components/inventories/inventories-button';
//import InventoriesDrawer from '@/components/inventories/inventories-drawer';

import { WalletProvider } from '@/lib/hooks/use-connect';

import {
  ThirdwebProvider,
  paperWallet,
  metamaskWallet,
  walletConnect,
  localWallet,
  smartWallet,
  embeddedWallet,
} from '@thirdweb-dev/react';

//import { PaperEmbeddedWalletProvider } from '@paperxyz/embedded-wallet-service-rainbowkit';

import { Polygon } from '@thirdweb-dev/chains';

import Explorers from '@/components/cryptocurrency-pricing-table/explorers';

import 'overlayscrollbars/overlayscrollbars.css';

// base css file
import 'swiper/css';
import 'swiper/css/pagination';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';

import '@/assets-landing/css/aos.min.css';
import '@/assets-landing/css/granderby.css';
import '@/assets-landing/css/popup.css';
import '@/assets-landing/css/swiper.min.css';

import { useState } from 'react';

import Head from 'next/head';

import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from '@/lib/gtag';

import { Analytics } from '@vercel/analytics/react';

import React from 'react';

import { Toaster } from 'react-hot-toast';

import 'node_modules/flag-icons/css/flag-icons.min.css';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// const firaCode = Fira_Code({
//   weight: ['400', '500', '700'],
//   style: ['normal'],
//   subsets: ['latin'],
//   variable: '--font-body',
// });

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  // inject the next app with the latest version of `@google/model-viewer`

  const pageid = pageProps?.pageid;
  const tokenid = pageProps?.tokenid;
  const title = pageProps?.title;
  const description = pageProps?.description;
  ///const image = pageProps?.image;

  var image = '';

  if (pageid === 'horse' || pageid === 'home') {
    image = `https://granderby.io/api/og/dynamic-image-page?id=${pageid}`;
  } else {
    image = `https://granderby.io/api/og/dynamic-image?tokenid=${tokenid}`;
  }

  //could remove this if you don't need to page level layout
  const getLayout = Component.getLayout ?? ((page) => page);

  /******* */

  const [queryClient] = useState(() => new QueryClient());
  ////const queryClient = new QueryClient();

  const clientId =
    process.env.NEXT_PUBLIC_CLIENT_ID === undefined
      ? ''
      : process.env.NEXT_PUBLIC_CLIENT_ID;

  gtag.useGtag();

  /*
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url:any) => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])
  */

  //console.log("process.env.THIRDWEB_CLIENT_ID", process.env.THIRDWEB_CLIENT_ID);
  //console.log("process.env.PAPER_CLIENT_ID", process.env.PAPER_CLIENT_ID);

  /*
  const smartWalletConfig = smartWallet(
  

    {
      factoryAddress: '0x20c70BD6588511F1824fbe116928c3D6c4B989aB',
      gasless: true,
      personalWallets: [localWallet()],
    }

  );
  */

  /*
  const walletConfig = metamaskWallet(); // or use any other wallet

  const smartWalletConfig = smartWallet(walletConfig, {
    factoryAddress: '0x20c70BD6588511F1824fbe116928c3D6c4B989aB',
    gasless: true,
  });
  */

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

      <QueryClientProvider client={queryClient}>
        <ThirdwebProvider
          //queryClient={queryClient}
          ///clientId={process.env.THIRDWEB_CLIENT_ID || ''}

          //clientId="79125a56ef0c1629d4863b6df0a43cce"

          //clientId="c010fb6a9ed040cb62604793a5e56982"

          //clientId="054cf4b72c7cd869a7e49cfb8ea6a26d" // 0xe38

          clientId="2da76340ce7c9721c232ca29f9a6bd0e" // 0x4897
          activeChain={Polygon}
          supportedWallets={[
            ///smartWalletConfig,

            walletConnect(),

            metamaskWallet(),

            paperWallet({
              //paperClientId: process.env.PAPER_CLIENT_ID || '', // granderby
              paperClientId: 'efa05253-e8b1-4adb-b978-996f8f2f409c',
            }),
          ]}

          /*
          sdkOptions={{
            gasless: {
              openzeppelin: {
                relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL,
              },
            },
          }}
          */
        >
          {/* <div className={`${firaCode.variable} font-body`}> */}

          <Analytics />

          {getLayout(<Component {...pageProps} />)}
          {/*
            <Component {...pageProps} />
            */}

          {/*
            <SettingsButton />
            */}

          {/*}
          <SettingsDrawer />
          */}

          {/*
          <EntriesButton />
          <EntriesDrawer />
          */}

          <Toaster />

          {/*
          <InventoriesButton />
          <InventoriesDrawer />
        */}

          <ModalsContainer />

          <DrawersContainer />
        </ThirdwebProvider>
      </QueryClientProvider>
    </>
  );
}

export default CustomApp;
