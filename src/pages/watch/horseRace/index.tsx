import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { NextPageWithLayout } from '@/types';

import RootLayout from '@/layouts/_root-layout';

import BetInputs from '@/components/horseRace/watchScreen/betInputs';
import BetTables from '@/components/horseRace/watchScreen/betTables';

import WalkingAnim from '@/components/horseRace/watchScreen/walkingAnim';

import Race from '@/components/horseRace/watchScreen/race';

import React, { useEffect, useState } from 'react';

//import LastWinnersPage from '@/components/horseRace/betScreen/lastWinners';
//import Last20GamePage from '@/components/horseRace/betScreen/last20';

//@ts-ignore
import { Socket, io } from 'socket.io-client';

//import Layout from '@/components/layout/Layout'

import { ISettings } from '@/utils/interfaces/settings-interface';
import { IUser } from '@/utils/interfaces/user-interface';

import { GetServerSidePropsContext } from 'next';

import { myGetServerSideProps } from '@/helpers';

import { deleteCookie } from 'cookies-next';

import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';

import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
//import { Check } from '@/components/icons/check';
//import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';

// Bebas Neue
let socket;

export const getStaticProps: GetStaticProps = async () => {
  //const { user, settings }: any = await myGetServerSideProps(context)

  /*
  const npcNamesResponse = await fetch(
    process.env.API_URL + `/api/games/horseRace/settings/horseNames?method=all`
  );
  const npcNames = await npcNamesResponse.json();

  console.log('npcNames[0]', npcNames.npcNames[0]);
  */

  /*
    if (settings.games[1].active === false) {
        return {
            redirect: {
                destination: '/',
            }
        }
    }
    */

  /*
    return {
      props: {},
      
    };
    */

  return {
    props: {
      //user: user ?? null,
      //settings: settings ?? null,
      //npcNames: npcNames.npcNames[0],
      //inputs: npcNames.npcNames[0].inputs,
    },
  };
};

const WatchPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  //const { npcNames: npcNames, inputs } = props;
  //const { inputs } = props;

  //export default function Hipodrom({ user, settings, npcNames, inputs }: { user: IUser | null, settings: ISettings | null, npcNames: any, inputs: any }
  //    ) {

  //export default function Hipodrom(
  //{ user, settings, inputs }:
  //{ user: IUser | null, settings: ISettings | null, inputs: any }
  //) {

  const [socket, setSocket] = useState<Socket | null>(null);

  const [status, setStatus] = useState<any>();
  const [time, setTime] = useState<any>(0);
  const [horse1Oran, setHorse1Oran] = useState<any>([]);
  const [horse2Oran, setHorse2Oran] = useState<any>([]);
  const [horse3Oran, setHorse3Oran] = useState<any>([]);
  const [horse4Oran, setHorse4Oran] = useState<any>([]);
  const [horse5Oran, setHorse5Oran] = useState<any>([]);
  const [flag, setFlag] = useState<any>(false);
  const [balance, setBalance] = useState<any>(0);

  const [npcNames, setNpcNames] = useState<any>([]);

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

    socketa.on('flag', (data: any) => {
      setFlag(data);
    });

    return () => {
      socketa.disconnect();
    };
  };

  useEffect(() => {
    if (status == false) {
      deleteCookie('horse');
    }

    async function getNpcNames() {
      const npcNamesResponse = await fetch(
        `/api/games/horseRace/settings/horseNames?method=all`
      );
      const npcNames = await npcNamesResponse.json();

      console.log('npcNames[0]', npcNames.npcNames[0]);
      setNpcNames(npcNames.npcNames[0]);

      //npcNames.npcNames[0].nft1
    }

    getNpcNames();
  }, [status]);

  function getBalance(balance: any) {
    setBalance(balance);
  }

  return (
    <>
      {/*
            <Layout user={user}
                settings={settings}
                title={`${settings?.texts.index.game1Title} | ${settings?.settings.general.siteName}`}
                description={settings?.texts.index.game1Description}
                getBalance={getBalance}>
        */}

      {/*
                <div className='w-full flex flex-col lg:flex-row gap-5 items-center justify-center p-5 '>
                    
                    {settings?.texts?.index.game1Title ?? "Race"} - You are watching

                </div>
*/}

      {!status ? (
        <div className=" justify-top relative flex h-full w-full flex-col items-center gap-5 bg-[#0C0E1A] px-10 pb-10">
          {/*
                            <LastWinnersPage npcs={npcNames} />
                            
                            <Last20GamePage />
                            */}

          {time ? (
            <>
              {/*
                                <div className="bg-center bg-no-repeat bg-contain bg-[url(/snailRace/back.svg)] h-full ">
                                */}

              <div className="   justify-top flex flex-col items-center bg-gradient-radial from-transparent via-[#0C0E1A] to-transparent p-5 bg-blend-difference md:gap-14 md:px-32  md:py-10">
                <WalkingAnim time={time} npcSrc={'/npcRace/at.json'} />
              </div>

              {/*
                                </div>
                                */}

              {/*
                <BetInputs
                    horse1={horse1Oran}
                    horse2={horse2Oran}
                    horse3={horse3Oran}
                    horse4={horse4Oran}
                    horse5={horse5Oran}
                    //user={user}
                    user={null}
                    npcs={npcNames}
                    //inputs={inputs}
                    inputs={null}
                    balance={balance}
                />
                */}

              <BetTables npcs={npcNames} />
            </>
          ) : (
            <>
              {/*
                                <div className="bg-center bg-no-repeat bg-contain bg-[url(/snailRace/back.svg)] h-full ">
                                */}
              <div className="h-full bg-[url(/snailRace/1683723489-asd.jpg)] bg-contain bg-center bg-no-repeat ">
                <div className="item-center mt-20 flex w-full justify-center gap-1 bg-transparent text-2xl text-white">
                  Loading Game...
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <Race npcNames={npcNames} flag={flag} setFlag={setFlag} />
      )}

      {/*
            </Layout>
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
};

WatchPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default WatchPage;

/*
export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { user, settings }: any = await myGetServerSideProps(context)

    const npcNamesResponse = await fetch(process.env.API_URL + `/api/games/horseRace/settings/horseNames?method=all`,)
    const npcNames = await npcNamesResponse.json()

    console.log("npcNames[0]", npcNames.npcNames[0])


    if (settings.games[1].active === false) {
        return {
            redirect: {
                destination: '/',
            }
        }
    }

    return {
        props: {
            user: user ?? null,
            settings: settings ?? null,
            ////npcNames: npcNames.npcNames[0],
            inputs: npcNames.npcNames[0].inputs
        }
    }

}
*/
