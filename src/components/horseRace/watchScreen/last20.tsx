import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Last20GamePage() {
  const [last20Game, setLast20Game] = useState<any>();

  const getLast20 = async () => {
    const response = await fetch('/api/games/horseRace/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'getAll',
      }),
    });
    const data = await response.json();
    setLast20Game(data.all);
  };

  useEffect(() => {
    getLast20();
  }, []);

  return (
    <div className="absolute left-5 top-10  hidden flex-col items-center justify-center gap-3  rounded-lg bg-black/20 p-3 backdrop-blur-md lg:flex">
      <div className=" mb-1 border-b text-xl text-gray-200">
        Last 10 Race Winners
      </div>
      <div className="relative flex flex-col gap-1 bg-gradient-to-b from-green-500 to-red-500 bg-clip-text text-transparent">
        {last20Game &&
          last20Game.map((item: any) => {
            return (
              <div
                key={item._id}
                className="flex flex-row items-center justify-center"
              >
                <div className="flex w-10 flex-col text-right text-xs text-sky-500">
                  <Image
                    src={item.nft?.media[0].thumbnail}
                    width={28}
                    height={28}
                    alt="alt"
                  />
                </div>

                <div className="flex w-10 flex-col text-right text-xs text-sky-500">
                  <Image
                    src={`/horseRace/${item.nft?.contract.address}.png`}
                    width={28}
                    height={28}
                    alt="alt"
                  />
                </div>

                <div className="flex w-12 flex-col text-left text-xs text-sky-500">
                  <span className=" text-xs text-sky-500">
                    #{item.winnerNft?.tokenId}{' '}
                  </span>

                  <span className=" text-xs">{item.winnerHorse}</span>
                </div>

                <span className=" w-10 text-right text-xs ">
                  {Number(item.totalBet).toFixed(0)}
                </span>
                <span className=" w-8 text-right text-xs">
                  {Number(item.winPrize).toFixed(2)}
                </span>

                <span className=" ml-2 text-xs">
                  {/*new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })*/}
                  &nbsp;
                  {new Date(item.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    // second: 'numeric',
                  })}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
