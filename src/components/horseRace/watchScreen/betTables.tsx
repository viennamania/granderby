import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { IHorseGame } from '../../../utils/horseRace/interfaces/horseGame';
import Image from 'next/image';

export default function BetTables({ npcs }: any) {
  const [games, setGames] = useState<any>();
  const [status, setStatus] = useState<any>();
  const [winner, setWinner] = useState<any>();

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = () => {
    const socket = io(`${process.env.NEXT_PUBLIC_HORSE_RACE_SOCKET_URL}`, {
      transports: ['websocket'],
    });
    socket.on('connect', () => {
      console.log('socket connected=====================');
    });
    socket.on('status', (data: any) => {
      console.log('status data====', data);

      setStatus(data);
    });
    socket.on('winner', (data: any) => {
      setWinner(data);
    });
  };

  const getGames = async () => {
    const res = await fetch('/api/games/horseRace/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'getGames',
      }),
    });
    const data = await res.json();

    ////console.log("getGames data====", data);

    setGames(data.games);
  };

  useEffect(() => {
    getGames();
  });

  return (
    <>
      <div className="flex w-full flex-col items-center lg:w-2/3">
        <div className="grid w-full grid-cols-5 gap-1 rounded-lg text-gray-200 lg:grid-cols-5  lg:gap-3">
          <div className="flex max-h-[300px] w-full flex-col items-center overflow-y-hidden rounded-lg border border-black bg-[#16171c] p-2">
            <div className="flex w-full flex-col items-center justify-center">
              {/*
              <div className=" mb-2 w-full border-black  text-center text-sm ">
                <span className=" text-sky-500">#{npcs.nft1}</span>
              </div>
              */}

              <Image
                src={npcs.media1}
                width={100}
                height={100}
                alt="pp"
                className="h-[45px] w-[45px] rounded-md"
              />
            </div>

            <ul className="mt-2 flex list-disc flex-col gap-2">
              {games?.map((game: IHorseGame, i: number) => {
                if (game.selectedSide === npcs.horse1) {
                  return (
                    <li key={i} className="flex items-center gap-1">
                      <div className="flex h-[15px] w-[15px] flex-col items-center justify-center">
                        <Image
                          src={game.img}
                          width={100}
                          height={100}
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                          alt="pp"
                          className="h-[25px] w-[25px] rounded-full"
                        />
                      </div>

                      <span className=" w-3 text-xs">
                        {`${game.username.slice(0, 2)}...`}
                      </span>
                      <span className="text-sm text-yellow-500">
                        {game.betAmount}
                      </span>
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          <div className="flex max-h-[300px] w-full flex-col items-center overflow-y-hidden rounded-lg border border-black bg-[#16171c] p-2">
            <div className="flex w-full flex-col items-center justify-center">
              {/*
              <div className=" mb-2 w-full border-black  text-center text-sm ">
                <span className=" text-sky-500">#{npcs.nft2}</span>
              </div>
              */}
              <Image
                src={npcs.media2}
                width={100}
                height={100}
                alt="pp"
                className="h-[45px] w-[45px] rounded-md"
              />
            </div>
            <ul className="mt-2 flex list-disc flex-col gap-2">
              {games?.map((game: IHorseGame, i: number) => {
                if (game.selectedSide === npcs.horse2) {
                  return (
                    <li key={i} className="flex items-center gap-1">
                      <div className="flex h-[15px] w-[15px] flex-col items-center justify-center">
                        <Image
                          src={game.img}
                          width={100}
                          height={100}
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                          alt="pp"
                          className="h-[25px] w-[25px] rounded-full"
                        />
                      </div>
                      <span className="w-3 text-xs">
                        {`${game.username.slice(0, 2)}...`}
                      </span>
                      <span className="text-sm text-yellow-500">
                        {game.betAmount}
                      </span>{' '}
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          <div className="flex max-h-[300px] w-full flex-col items-center overflow-y-hidden rounded-lg border border-black bg-[#16171c] p-2">
            <div className="flex w-full flex-col items-center justify-center">
              {/*
              <div className=" mb-2 w-full border-black  text-center text-sm ">
                <span className=" text-sky-500">#{npcs.nft3}</span>
              </div>
              */}
              <Image
                src={npcs.media3}
                width={100}
                height={100}
                alt="pp"
                className="h-[45px] w-[45px] rounded-md"
              />
            </div>
            <ul className="mt-2 flex list-disc flex-col gap-2">
              {games?.map((game: IHorseGame, i: number) => {
                if (game.selectedSide === npcs.horse3) {
                  return (
                    <li key={i} className="flex items-center gap-1">
                      <div className="flex h-[15px] w-[15px] flex-col items-center justify-center">
                        <Image
                          src={game.img}
                          width={100}
                          height={100}
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                          alt="pp"
                          className="h-[25px] w-[25px] rounded-full"
                        />
                      </div>
                      <span className="w-3 text-xs">
                        {`${game.username.slice(0, 2)}...`}
                      </span>
                      <span className="text-sm text-yellow-500">
                        {game.betAmount}
                      </span>{' '}
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          <div className="flex max-h-[300px] w-full flex-col items-center overflow-y-hidden rounded-lg border border-black bg-[#16171c] p-2">
            <div className="flex w-full flex-col items-center justify-center">
              {/*
              <div className=" mb-2 w-full border-black  text-center text-sm ">
                <span className=" text-sky-500">#{npcs.nft4}</span>
              </div>
              */}
              <Image
                src={npcs.media4}
                width={100}
                height={100}
                alt="pp"
                className="h-[45px] w-[45px] rounded-md"
              />
            </div>
            <ul className="mt-2 flex list-disc flex-col gap-2">
              {games?.map((game: IHorseGame, i: number) => {
                if (game.selectedSide === npcs.horse4) {
                  return (
                    <li key={i} className="flex items-center gap-1">
                      <div className="flex h-[15px] w-[15px] flex-col items-center justify-center">
                        <Image
                          src={game.img}
                          width={100}
                          height={100}
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                          alt="pp"
                          className="h-[15px] w-[15px] rounded-full"
                        />
                      </div>
                      <span className="w-3 text-xs ">
                        {`${game.username.slice(0, 2)}...`}
                      </span>
                      <span className="text-sm text-yellow-500">
                        {game.betAmount}
                      </span>{' '}
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          <div className="flex max-h-[300px] w-full flex-col items-center overflow-y-hidden rounded-lg border border-black bg-[#16171c] p-2">
            <div className="flex w-full flex-col items-center justify-center">
              {/*
              <div className=" mb-2 w-full border-black  text-center text-sm ">
                <span className=" text-sky-500">#{npcs.nft5}</span>
              </div>
              */}
              <Image
                src={npcs.media5}
                width={100}
                height={100}
                alt="pp"
                className="h-[45px] w-[45px] rounded-md"
              />
            </div>
            <ul className="mt-2 flex list-disc flex-col gap-2">
              {games?.map((game: IHorseGame, i: number) => {
                if (game.selectedSide === npcs.horse5) {
                  return (
                    <li key={i} className="flex items-center gap-1">
                      <div className="flex h-[15px] w-[15px] flex-col items-center justify-center">
                        <Image
                          src={game.img}
                          width={100}
                          height={100}
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                          alt="pp"
                          className="h-[15px] w-[15px] rounded-full"
                        />
                      </div>
                      <span className="w-3 text-xs">
                        {`${game.username.slice(0, 2)}...`}
                      </span>
                      <span className="text-sm text-yellow-500">
                        {game.betAmount}
                      </span>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
