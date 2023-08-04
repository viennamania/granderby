import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LastWinnersMobilePage({ npcs }: any) {
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

    console.log('getSonKazananlar data====', data);

    setSonKazananlar(data.lastGame);
  };

  useEffect(() => {
    getSonKazananlar();
  }, []);

  return (
    <div className="absolute right-5 top-20 flex-col items-center justify-center gap-3 rounded-lg bg-black/20 p-5 text-white backdrop-blur-md lg:flex">
      <div className=" mb-2 border-b text-xl">Last Race Winners</div>

      <div className="">
        {sonKazananlar &&
          sonKazananlar.placements.map((item: any) => {
            return (
              <div
                key={item.line}
                className="flex items-center justify-start gap-2"
              >
                <p className=" text-left  text-sm text-green-500">
                  Rank{item.line} -{' '}
                  <span className="text-sky-500">#{item.nft?.tokenId}</span>{' '}
                  {item.horse}
                </p>

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
