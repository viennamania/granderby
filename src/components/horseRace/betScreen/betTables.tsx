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
        <div className="grid w-full grid-cols-1 gap-3 rounded-lg text-gray-200  lg:grid-cols-5">
          <div className="flex max-h-[200px] w-full flex-col items-center overflow-y-hidden rounded-lg border border-black bg-[#16171c] p-2">
            <div className="flex w-full flex-row items-center justify-center">
              <h2 className="mb-2 w-full border-b border-black  text-center text-lg ">
                <span className=" text-sky-500">{npcs.horse1}</span>
              </h2>
            </div>

            <ul className="flex list-disc flex-col gap-2">
              {games?.map((game: IHorseGame, i: number) => {
                if (game.selectedSide === npcs.horse1) {
                  return (
                    <li key={i} className="flex items-center gap-1">
                      <div className="flex h-[25px] w-[25px] flex-col items-center justify-center">
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

                      <span className="w-20">
                        {/*`${game.username.slice(0, 2)}...${game.username.slice(game.username.length - 2, game.username.length)}`*/}
                        {`${game.username.slice(0, 2)}...`}
                      </span>
                      <span className="text-yellow-500">{game.betAmount}</span>
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          <div className="flex max-h-[200px] w-full flex-col items-center overflow-y-hidden rounded-lg border border-black bg-[#16171c] p-2">
            <div className="flex w-full flex-row items-center justify-center">
              <h2 className="mb-2 w-full border-b border-black  text-center text-lg ">
                <span className=" text-sky-500">{npcs.horse2}</span>
              </h2>
            </div>
            <ul className="flex list-disc flex-col gap-2">
              {games?.map((game: IHorseGame, i: number) => {
                if (game.selectedSide === npcs.horse2) {
                  return (
                    <li key={i} className="flex items-center gap-1">
                      <div className="flex h-[25px] w-[25px] flex-col items-center justify-center">
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
                      <span className="w-20">
                        {`${game.username.slice(0, 2)}...`}
                      </span>
                      <span className="text-yellow-500">{game.betAmount}</span>{' '}
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          <div className="flex max-h-[200px] w-full flex-col items-center overflow-y-hidden rounded-lg border border-black bg-[#16171c] p-2">
            <div className="flex w-full flex-row items-center justify-center">
              <h2 className="mb-2 w-full border-b border-black  text-center text-lg ">
                <span className=" text-sky-500">{npcs.horse3}</span>
              </h2>
            </div>
            <ul className="flex list-disc flex-col gap-2">
              {games?.map((game: IHorseGame, i: number) => {
                if (game.selectedSide === npcs.horse3) {
                  return (
                    <li key={i} className="flex items-center gap-1">
                      <div className="flex h-[25px] w-[25px] flex-col items-center justify-center">
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
                      <span className="w-20">
                        {`${game.username.slice(0, 2)}...`}
                      </span>
                      <span className="text-yellow-500">{game.betAmount}</span>{' '}
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          <div className="flex max-h-[200px] w-full flex-col items-center overflow-y-hidden rounded-lg border border-black bg-[#16171c] p-2">
            <div className="flex w-full flex-row items-center justify-center">
              <h2 className="mb-2 w-full border-b border-black  text-center text-lg ">
                <span className=" text-sky-500">{npcs.horse4}</span>
              </h2>
            </div>
            <ul className="flex list-disc flex-col gap-2">
              {games?.map((game: IHorseGame, i: number) => {
                if (game.selectedSide === npcs.horse4) {
                  return (
                    <li key={i} className="flex items-center gap-1">
                      <div className="flex h-[25px] w-[25px] flex-col items-center justify-center">
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
                      <span className="w-20">
                        {`${game.username.slice(0, 2)}...`}
                      </span>
                      <span className="text-yellow-500">{game.betAmount}</span>{' '}
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          <div className="flex max-h-[200px] w-full flex-col items-center overflow-y-hidden rounded-lg border border-black bg-[#16171c] p-2">
            <div className="flex w-full flex-row items-center justify-center">
              <h2 className="mb-2 w-full border-b border-black  text-center text-lg ">
                <span className=" text-sky-500">{npcs.horse5}</span>
              </h2>
            </div>
            <ul className="flex list-disc flex-col gap-2">
              {games?.map((game: IHorseGame, i: number) => {
                if (game.selectedSide === npcs.horse5) {
                  return (
                    <li key={i} className="flex items-center gap-1">
                      <div className="flex h-[25px] w-[25px] flex-col items-center justify-center">
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
                      <span className="w-20">
                        {`${game.username.slice(0, 2)}...`}
                      </span>
                      <span className="text-yellow-500">{game.betAmount}</span>{' '}
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
