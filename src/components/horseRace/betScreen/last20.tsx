import React, { useEffect, useState } from 'react';

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
      <h6 className=" mb-1 border-b text-gray-200">Last 20 Race Winners</h6>
      <div className="relative flex flex-col gap-1 bg-gradient-to-b from-green-500 to-red-500 bg-clip-text text-transparent">
        {last20Game &&
          last20Game.map((item: any) => {
            return (
              <div
                key={item._id}
                className="flex flex-row items-center justify-center"
              >
                <span className=" w-16 text-xs text-sky-500">
                  NPC#{item.winnerNft}
                </span>
                <span className=" w-16 text-xs">{item.winnerHorse}</span> -
                <span className=" text-xs ">
                  {/*new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })*/}
                  &nbsp;
                  {new Date(item.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
