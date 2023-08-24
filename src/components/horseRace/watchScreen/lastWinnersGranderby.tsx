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

    if (
      data &&
      data?.lastGame?.placements[0]?.nft?.tokenId ===
        sonKazananlar?.placements[0]?.nft?.tokenId
    )
      return;

    setSonKazananlar(undefined);

    //setSonKazananlar(data.lastGame);

    setTimeout(() => {
      setSonKazananlar(data.lastGame);
    }, 1000);
  };

  useEffect(() => {
    getSonKazananlar();
  }, [npcs]);

  const { openDrawer } = useDrawer();

  const [drawerHorseInfoTokenId, setDrawerHorseInfoTokenId] = useLocalStorage(
    'drawer-horse-info-tokenid'
  );

  return (
    <div className=" flex flex-col items-center justify-center gap-3 rounded-lg bg-black/20 p-5 text-white backdrop-blur-md lg:flex">
      {/*
      <div className=" mb-2 border-b text-xl">Last Race Winners</div>
      */}

      <div className="text-xl font-bold">
        Win Prize: {sonKazananlar?.winPrize}
      </div>

      <div className="grid grid-cols-3 gap-10">
        {sonKazananlar &&
          sonKazananlar.placements.map((item: any) => {
            if (item.line > 3) return;

            return (
              <div
                key={item.line}
                className="flex items-center justify-start gap-2"
              >
                <div className=" flex flex-col gap-1  text-left  text-sm text-green-500">
                  <span className="w-12">Rank{item.line}</span>

                  {/*
                  <span className=" mr-3 w-12 text-right text-sky-500">
                    #{item.nft?.tokenId}
                  </span>
                  <span>{item.horse}</span>
                  */}

                  <button
                    className=" flex "
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
    </div>
  );
}
