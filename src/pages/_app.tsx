import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
// import { Fira_Code } from 'next/font/google';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from 'react-query';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';
import { WalletProvider } from '@/lib/hooks/use-connect';

import { ThirdwebProvider, paperWallet } from '@thirdweb-dev/react';
import { PaperEmbeddedWalletProvider } from '@paperxyz/embedded-wallet-service-rainbowkit';

import { Polygon } from '@thirdweb-dev/chains';

import Image from '@/components/ui/image';
import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';

import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';
import AnchorLink from '@/components/ui/links/anchor-link';
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

  const [queryClient] = useState(() => new QueryClient());

  const clientId =
    process.env.NEXT_PUBLIC_CLIENT_ID === undefined
      ? ''
      : process.env.NEXT_PUBLIC_CLIENT_ID;

  return (
    <>
      <Head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />

        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="GRANDERBY"></meta>
        <meta property="og:title" content="GRANDERBY"></meta>
        <meta property="og:description" content="powered by MOMOCON"></meta>
        <meta property="og:image" content="/intro-bg.png"></meta>

        <meta property="og:image:width" content="1400"></meta>
        <meta property="og:image:height" content="1400"></meta>

        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:image" content="/intro-bg.png"></meta>

        <title>Granderby - Asset Manager</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
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
            activeChain={Polygon}
            supportedWallets={[
              paperWallet({
                clientId: 'efa05253-e8b1-4adb-b978-996f8f2f409c',
              }),
            ]}
            sdkOptions={{
              gasless: {
                openzeppelin: {
                  relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL,
                },
              },
            }}
          >
            {/*
            <WalletProvider>
      */}
            {/* <div className={`${firaCode.variable} font-body`}> */}

            {getLayout(<Component {...pageProps} />)}

            <SettingsButton />
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
        </ThemeProvider>
      </QueryClientProvider>

      {/*
      footer{ background-color: #021E33; padding: 20px 0 20px;}
footer .footer-wrap{ display: flex; flex-flow: column; justify-content: center; align-items: center;}
footer .footer-wrap p{ text-align: center; color: #fff; font-size:0.875rem; padding-top: 1rem;}
    */}

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

export default CustomApp;
