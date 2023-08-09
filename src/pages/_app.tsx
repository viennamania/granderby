import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
// import { Fira_Code } from 'next/font/google';

import { ThemeProvider } from 'next-themes';

import { QueryClient, QueryClientProvider } from 'react-query';

/*
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
*/

import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';
import { WalletProvider } from '@/lib/hooks/use-connect';

import {
  ThirdwebProvider,
  paperWallet,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';

import { PaperEmbeddedWalletProvider } from '@paperxyz/embedded-wallet-service-rainbowkit';

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

  //could remove this if you don't need to page level layout
  const getLayout = Component.getLayout ?? ((page) => page);

  /******* */

  ///const [queryClient] = useState(() => new QueryClient());
  const queryClient = new QueryClient();

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

        <meta
          property="og:title"
          content="Granderby - powered by MOMOCON"
        ></meta>
        <meta
          property="og:description"
          content="GRANDERBY is a game where players raise and manage NFT horses to enter them into races and earn tokens."
        ></meta>
        <meta property="og:image" content="/intro-bg.png"></meta>

        <meta name="twitter:image" content="/intro-bg.png"></meta>

        <title>Granderby - powered by MOMOCON</title>
      </Head>

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <QueryClientProvider client={queryClient}>
        {/*
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="light"
      >
      */}

        {/*

        <PaperEmbeddedWalletProvider
          appName="Paper RainbowKit Provider"
          walletOptions={{
            clientId: clientId,
            ///chain: 'Mumbai',
            chain: 'Goerli',
          }}
        >
        */}

        <ThirdwebProvider
          //queryClient={queryClient}
          //clientId={process.env.THIRDWEB_CLIENT_ID || ''}
          clientId="79125a56ef0c1629d4863b6df0a43cce"
          activeChain={Polygon}
          supportedWallets={[
            walletConnect(),

            metamaskWallet(),

            paperWallet({
              //paperClientId: process.env.PAPER_CLIENT_ID || '', // granderby
              paperClientId: 'efa05253-e8b1-4adb-b978-996f8f2f409c',
            }),
          ]}
          sdkOptions={{
            gasless: {
              openzeppelin: {
                relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL,
              },
            },

            /*
              gasless: {
                biconomy: {
                  apiKey: 'BlotrRJre.fe0d620c-d56f-4663-8e63-8cf5e6400dcd',
                  apiId: 'fd500daa-7efb-4e68-b488-4b2f9f212ab6',
                },
              },
              */
          }}
        >
          {/*
            <WalletProvider>
      */}
          {/* <div className={`${firaCode.variable} font-body`}> */}

          <Analytics />

          {getLayout(<Component {...pageProps} />)}
          {/*
            <Component {...pageProps} />
            */}

          {/*
            <SettingsButton />
    */}

          <SettingsDrawer />

          <ModalsContainer />
          <DrawersContainer />
          {/* </div> */}

          {/*
            </WalletProvider>
    */}
        </ThirdwebProvider>

        {/*   
        </PaperEmbeddedWalletProvider>
      */}
        {/*
      </ThemeProvider>
      */}
      </QueryClientProvider>
    </>
  );
}

export default CustomApp;
