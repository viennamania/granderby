import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import VoteList from '@/components/vote/vote-list';
import { ExportIcon } from '@/components/icons/export-icon';
// static data
import { getVotesByStatus } from '@/data/static/vote-data';
import votePool from '@/assets/images/vote-pool.svg';

import RootLayout from '@/layouts/_root-layout';
////import RootLayout from '@/layouts/_root-layout-live';

import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

//import movIntro from '@/assets-landing/mov/intro.mp4';

import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';

import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import AnchorLink from '@/components/ui/links/anchor-link';

import phonePC from '@/assets-landing/images/img-app.png';
import phoneMobile from '@/assets-landing/images/0_asset.png';

import EntryTables from '@/components/horseRace/watchScreen/entryTables';

import BetInputs from '@/components/horseRace/watchScreen/betInputsGranderby';

import BetTables from '@/components/horseRace/watchScreen/betTablesGranderby';

import Search from '@/components/search/search-horse';

import { useDrawer } from '@/components/drawer-views/context';

import OwnedFeeds from '@/components/search/feeds-horse-owned-widget';

import WalkingAnim from '@/components/horseRace/watchScreen/walkingAnim';

//@ts-ignore
import { Socket, io } from 'socket.io-client';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
  tokenContractAddressGRD,
} from '@/config/contractAddresses';

import {
  ConnectWallet,
  useDisconnect,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from '@thirdweb-dev/react';

import Head from 'next/head';

import {
  Filters,
  GridSwitcher,
  SortList,
} from '@/components/search/filters-horse';

import { OptionIcon } from '@/components/icons/option';

import Sidebar from '@/layouts/sidebar/_expandable-right';
//import Sidebar from '@/layouts/sidebar/_retro-right';

import SidebarTwo from '@/layouts/sidebar/_retro-right';

/*
import InventoriesButton from '@/components/inventories/inventories-button';
import InventoriesDrawer from '@/components/inventories/inventories-drawer';
*/

import EntriesButton from '@/components/entries/entries-button';
import EntriesDrawer from '@/components/entries/entries-drawer';

import { CoinExplore } from '@/data/static/coin-list';
import Explorers from '@/components/cryptocurrency-pricing-table/explorers';

import LastWinnersPage from '@/components/horseRace/watchScreen/lastWinnersGranderby';

import Collapse from '@/components/ui/collapse-last-winners';
import { useLocalStorage } from '@/lib/hooks/use-local-storage';

/*
      <Header className="ltr:xl:pl-72 rtl:xl:pr-72 ltr:2xl:pl-[320px] rtl:2xl:pr-[320px] ltr:3xl:pl-80 rtl:3xl:pr-80" />
      <Sidebar className="z-40 hidden xl:block" />
      <main
        className={cn(
          'min-h-[100vh] pt-4 pb-16 sm:pb-20 ltr:lg:pr-80 rtl:lg:pl-80 xl:pb-24 ltr:xl:pl-72 rtl:xl:pr-72 ltr:2xl:pl-80 rtl:2xl:pr-80 3xl:pt-0.5 ltr:3xl:pr-[350px] rtl:3xl:pl-[350px]',
          contentClassName
        )}
      >
        <div className="px-4 sm:px-6 lg:px-8 3xl:px-10">{children}</div>
      </main>
      <SidebarTwo className="ltr:right-0 ltr:left-auto rtl:left-0 rtl:right-auto  xl:block" />
      */

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: 'Granderby - Home',
      description: 'powered by MOMOCON',
      image: '/intro-bg.png',
    },
  };
};

const LivePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { title, image, description } = props;

  const { openDrawer } = useDrawer();

  const router = useRouter();
  const { layout } = useLayout();

  const [npcNames, setNpcNames] = useState<any>([]);

  const [horse1Oran, setHorse1Oran] = useState<any>([]);
  const [horse2Oran, setHorse2Oran] = useState<any>([]);
  const [horse3Oran, setHorse3Oran] = useState<any>([]);
  const [horse4Oran, setHorse4Oran] = useState<any>([]);
  const [horse5Oran, setHorse5Oran] = useState<any>([]);
  const [horse6Oran, setHorse6Oran] = useState<any>([]);
  const [horse7Oran, setHorse7Oran] = useState<any>([]);
  const [horse8Oran, setHorse8Oran] = useState<any>([]);
  const [horse9Oran, setHorse9Oran] = useState<any>([]);
  const [horse10Oran, setHorse10Oran] = useState<any>([]);

  const [socket, setSocket] = useState<Socket | null>(null);

  const [status, setStatus] = useState<any>();
  const [time, setTime] = useState<any>(0);

  const address = useAddress();

  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalance, isLoading: tokenBalanceIsLoading } =
    useTokenBalance(tokenContract, address);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = () => {
    ///console.log("snailRace socketInitializer socket", socket);

    if (socket) return;

    const socketa = io(process.env.NEXT_PUBLIC_HORSE_RACE_SOCKET_URL as string);

    setSocket(socketa);

    socketa.on('status', (data: any) => {
      console.log('socket status======', data);

      setStatus(data);
    });

    socketa.on('time', (data: any) => {
      setTime(data);
    });

    socketa.on('horse1Rate', (data: any) => {
      setHorse1Oran(data);
    });
    socketa.on('horse2Rate', (data: any) => {
      setHorse2Oran(data);
    });
    socketa.on('horse3Rate', (data: any) => {
      setHorse3Oran(data);
    });
    socketa.on('horse4Rate', (data: any) => {
      setHorse4Oran(data);
    });
    socketa.on('horse5Rate', (data: any) => {
      setHorse5Oran(data);
    });
    socketa.on('horse6Rate', (data: any) => {
      setHorse6Oran(data);
    });
    socketa.on('horse7Rate', (data: any) => {
      setHorse7Oran(data);
    });
    socketa.on('horse8Rate', (data: any) => {
      setHorse8Oran(data);
    });
    socketa.on('horse9Rate', (data: any) => {
      setHorse9Oran(data);
    });
    socketa.on('horse10Rate', (data: any) => {
      setHorse10Oran(data);
    });

    /*
    socketa.on('flag', (data: any) => {
      setFlag(data);
    });
    */

    return () => {
      socketa.disconnect();
    };
  };

  useEffect(() => {
    if (status == false) {
      ////deleteCookie('horse');
    }

    async function getNpcNames() {
      const npcNamesResponse = await fetch(
        `/api/games/horseRace/settings/horseNames?method=all`
      );
      const response = await npcNamesResponse.json();

      ///console.log('getNpcNames response', response);

      //const data = useOwnedNFTs(nftDropContractHorse, address);

      setNpcNames(response.npcNames[0]);

      //npcNames.npcNames[0].nft1
    }

    getNpcNames();
  }, [status]);

  {
    /*
  useEffect(() => {
    Array.from(document.getElementsByTagName("iframe")).forEach((iframe) => {
      iframe?.contentWindow?.addEventListener(
        "load",
        () => {
          const doc = iframe.contentWindow?.document;
          iframe.height = doc?.body.scrollHeight;
        },
        true
      );
      iframe.contentWindow.addEventListener(
        "resize",
        () => {
          iframe.height = iframe?.contentWindow?.document?.body?.scrollHeight + 40;
        },
        true
      );
    });
  }, []);
*/
  }

  const [lastWinersIsOpen] = useLocalStorage('last-winners-isopen');

  return (
    <>
      <NextSeo
        title="Landing"
        description="Granderby - NFT Horse Racing Game"
      />

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

        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>

        <title>{title}</title>
      </Head>

      {/*
      <Sidebar className="z-40 hidden xl:block" />
  */}

      {/*
      <InventoriesButton />
      <InventoriesDrawer />
*/}

      {/*
      <EntriesButton />
      <EntriesDrawer />
      */}

      <div className=" mx-auto flex w-full shrink-0 flex-col  items-center  justify-center ">
        {/*
            export type DRAWER_VIEW =
              | 'DASHBOARD_SIDEBAR'
              | 'DRAWER_MENU'
              | 'DRAWER_SEARCH'
              | 'DRAWER_FILTER'
              | 'DRAWER_PREVIEW_NFT';
            */}

        {/*
            <Button
              shape="rounded"
              size="small"
              variant="ghost"
              color="gray"
              //onClick={() => openDrawer('DRAWER_PREVIEW_NFT')}
              onClick={() => openDrawer('DRAWER_SEARCH')}
              className="!h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
            >
              <OptionIcon className="relative h-auto w-[18px]" />
            </Button>
            */}

        {/*
        <div className="flex w-full flex-row items-center justify-end gap-2">
          <div className="flex w-full items-center justify-start">
            {!address ? (
              <div className="flex flex-row items-center justify-center gap-2 ">
                <div>
                  <ConnectWallet theme="light" />
                </div>
                <div className=" text-sm xl:text-xl xl:font-bold">
                  to see my registered horses
                </div>
              </div>
            ) : (
              <div className="flex flex-col ">
                <OwnedFeeds />
              </div>
            )}
          </div>
        </div>
        */}

        {/*
        <div className="justify-left mt-0 flex w-full items-center ">
          <Image
            src="/horseRace/racecourse_happy_valley.png"
            alt="raceTrack"
            width={150}
            height={150}
          />
        </div>
        */}

        <Collapse label="Last Race Winners" initialOpen={lastWinersIsOpen}>
          <div className="m-0 rounded-lg bg-black">
            <LastWinnersPage npcs={npcNames} />
          </div>
        </Collapse>

        <div className="justify-left mt-0 flex h-[50px] w-full items-center  ">
          <Image src="/horseRace/live.gif" alt="live" width={100} height={30} />
        </div>

        <div className="items-top mt-0 flex  w-full flex-col justify-center gap-2  rounded-md border  bg-black  p-2 xl:hidden ">
          {time ? (
            <WalkingAnim time={time} npcSrc={'/npcRace/at.json'} />
          ) : (
            <div className="flex w-full items-center justify-center text-2xl text-white ">
              Loading game...
            </div>
          )}
        </div>

        <div className=" flex w-full items-center justify-center  ">
          <iframe
            src="https://granderby.io/webgl/granderby/inapp.html"
            //width="100vw"
            //height="100vh"
            //////sandbox="allow-scripts allow-modal"
            //width: 100vw;
            //height: 100vw;

            //style="width: 100vw; height: 100vh; border: none;"
            style={{
              //width: '100vw',
              width: '100%',
              height: '100vh',
              //height: '100%',
              border: 'none',
              margin: '0',
              padding: '0',
              overflow: 'hidden',
            }}
          ></iframe>
        </div>
      </div>

      {/*
      <div className="items-top mx-auto mt-5 flex w-full shrink-0 flex-col justify-center gap-5 md:flex-row md:px-4 xl:gap-5 xl:px-0 3xl:max-w-[1700px] 3xl:px-12">
        <div className="items-top flex w-full justify-center">
          <BetInputs
            horse1={horse1Oran}
            horse2={horse2Oran}
            horse3={horse3Oran}
            horse4={horse4Oran}
            horse5={horse5Oran}
            horse6={horse6Oran}
            horse7={horse7Oran}
            horse8={horse8Oran}
            horse9={horse9Oran}
            horse10={horse10Oran}
            //user={user}
            user={null}
            npcs={npcNames}
            //inputs={inputs}
            inputs={null}
            balance={0}
          />
        </div>

        <div className="items-top mt-0 flex w-full justify-center ">
          <BetTables npcs={npcNames} />
        </div>
      </div>
          */}

      {/*
        <div className="mx-auto mt-10 flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
          <Search />
        </div>
        */}

      {/* delete footer */}
    </>
  );
};

LivePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default LivePage;
