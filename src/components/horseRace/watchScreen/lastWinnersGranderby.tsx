import { useState, useEffect } from 'react';
import Image from 'next/image';

import NFTCard from '@/components//nft-horse/NFTCard';

import { useDrawer } from '@/components/drawer-views/context';
import { set } from 'lodash';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';

import toast from 'react-hot-toast';

import { format } from 'date-fns';

export default function LastWinnersPage({ npcs }: any, status: any) {
  const [sonKazananlar, setSonKazananlar] = useState<any>();

  // last game winners
  const getSonKazananlar = async () => {
    const response = await fetch('/api/games/horseRace/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'getLast',
      }),
    });
    const data = await response.json();

    ///console.log('getSonKazananlar data  ====', data);

    /*
    if (
      data &&
      data?.lastGame?.placements[0]?.nft?.tokenId ===
        sonKazananlar?.placements[0]?.nft?.tokenId
    )
      return;

    */

    setSonKazananlar(undefined);

    setSonKazananlar(data.lastGame);

    //console.log('getSonKazananlar   ====', sonKazananlar);

    /*
    setTimeout(() => {
      setSonKazananlar(data.lastGame);
    }, 1000);
    */

    //console.log("sonKazananlar.placements", sonKazananlar.placements);
  };

  useEffect(() => {
    getSonKazananlar();
  }, [npcs]);

  /*
  useEffect(() => {

    if (status === true) return;

    if (!sonKazananlar) return;

    toast.custom((t) => (

      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
    
              <NFTCard
                tokenId={sonKazananlar?.placements[0].nft?.tokenId}
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Emilia Gates
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Win Prize: {sonKazananlar?.winPrize}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    )
    //.then((t) => setTimeout(() => toast.dismiss(t.id), 20000));
    , {
      duration: 20000,
    });

  }, [status]);
  */

  const { openDrawer } = useDrawer();

  const [drawerHorseInfoTokenId, setDrawerHorseInfoTokenId] = useLocalStorage(
    'drawer-horse-info-tokenid'
  );

  return (
    <div className=" flex flex-col items-center justify-center gap-3  bg-white p-5 text-black backdrop-blur-md ">
      {/*
      <div className=" mb-2 border-b text-xl">Last Race Winners</div>
      */}

      <div className="flex flex-row items-center justify-center gap-5 ">
        <span className="text-xl font-bold">
          Win Prize: {Number(sonKazananlar?.winPrize).toFixed(2)}
        </span>
      </div>

      <div className=" flex flex-row items-center justify-center gap-5 ">
        {sonKazananlar &&
          sonKazananlar.placements.map((item: any) => {
            if (item.line > 3) return;

            return (
              <div
                key={item.line}
                className="flex w-full items-center justify-center gap-2"
              >
                <div className=" flex flex-col gap-1 text-left  text-sm text-black">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <span className="w-12">RANK{item.line}</span>
                    {item.line === 1 && (
                      <span className=" font-bold text-green-600 ">WINNER</span>
                    )}
                  </div>

                  {/*
                  <span className=" mr-3 w-12 text-right text-sky-500">
                    #{item.nft?.tokenId}
                  </span>
                  <span>{item.horse}</span>
                  */}

                  <button
                    //className=" flex text-blue-500 mt-2"

                    className={`gold-btn block border border-black p-1 text-center text-black ${
                      item.nft?.tokenId === 0
                        ? 'gold-btn-active'
                        : item.nft?.tokenId === 1000
                        ? 'bg-[#ffc000]'
                        : 'bg-transparent'
                    } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
                    onClick={() => {
                      setDrawerHorseInfoTokenId(item.nft?.tokenId);
                      openDrawer('DRAWER_HORSE_INFO', item.nft?.tokenId);
                    }}
                  >
                    <NFTCard
                      tokenId={item.nft?.tokenId}
                      key={item.nft?.tokenId}
                    />

                    {/*
                    <Image
                      src={item.nft?.image}
                      width={200}
                      height={200}
                      alt="winner"
                    />
                    */}
                  </button>
                </div>

                {/*
                <Image
                  src={`/npcRace/at${
                    item.horse === npcs.horse1
                      ? 1
                      : item.horse === npcs.horse2
                      ? 2
                      : item.horse === npcs.horse3
                      ? 3
                      : item.horse === npcs.horse4
                      ? 4
                      : 5
                  }.png`}
                  width={50}
                  height={50}
                  alt="alt1"
                />
                */}
              </div>
            );
          })}
      </div>

      <div className="mt-3 flex w-full flex-row items-center justify-between gap-5">
        <div className="flex flex-col items-center justify-center gap-5">
          <span className="text-lg">
            {format(Date.parse(sonKazananlar?.date || 0), 'yyy-MM-dd hh:mm:ss')}
          </span>

          <div className=" flex flex-wrap items-center justify-center gap-2 ">
            {sonKazananlar &&
              sonKazananlar.placements.map((item: any) => {
                return (
                  <div
                    key={item.line}
                    className="flex items-center justify-center text-xs"
                  >
                    <span className="text-sm text-red-600">{item.line}:</span>
                    <span className="">#{item.nft.tokenId}:</span>
                    <span className=" font-bold text-green-600 ">
                      {item.bet}
                    </span>
                  </div>
                );
              })}
          </div>

          <div className="text-sm font-bold ">
            Total Bet:{' '}
            <span className="font-bold text-green-600">
              {sonKazananlar?.totalBet}
            </span>
          </div>
        </div>

        <div className="  flex justify-end ">
          <Image
            src="/images/inkent.jpeg"
            alt="inkent"
            width={70}
            height={50}
          />
        </div>
      </div>
    </div>
  );
}
