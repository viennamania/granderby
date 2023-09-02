import { useState, useEffect } from 'react';
import Image from 'next/image';

import NFTCard from '@/components//nft-horse/NFTCard';

import { useDrawer } from '@/components/drawer-views/context';
import { set } from 'lodash';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';

export default function LastWinnersPage({ npcs }: any) {
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

  const { openDrawer } = useDrawer();

  const [drawerHorseInfoTokenId, setDrawerHorseInfoTokenId] = useLocalStorage(
    'drawer-horse-info-tokenid'
  );

  return (
    <div className=" flex flex-col items-center justify-center gap-3  bg-white p-5 text-black backdrop-blur-md ">
      {/*
      <div className=" mb-2 border-b text-xl">Last Race Winners</div>
      */}

      <div className="text-xl font-bold ">
        <span>Win Prize: {sonKazananlar?.winPrize}</span>
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
          <div className=" flex flex-row items-center justify-center gap-2 ">
            {sonKazananlar &&
              sonKazananlar.placements.map((item: any) => {
                return (
                  <div
                    key={item.line}
                    className="flex items-center justify-center"
                  >
                    <span className="">{item.line}:</span>
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
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  );
}
