import Image from 'next/image';
import { useEffect, useState } from 'react';
//@ts-ignore
import { io } from 'socket.io-client';
////import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { deleteCookie, getCookie, hasCookie } from 'cookies-next';

let socket;
export default function Race({ npcNames, flag, setFlag }: any) {
  const [status, setStatus] = useState<any>();
  const [progress1, setProgress1] = useState<any>(0);
  const [progress2, setProgress2] = useState<any>(0);
  const [progress3, setProgress3] = useState<any>(0);
  const [progress4, setProgress4] = useState<any>(0);
  const [progress5, setProgress5] = useState<any>(0);
  const [fence, setFence] = useState(0);
  const [horses, setHorses] = useState<any>([]);
  const [winner, setWinner] = useState<any>();
  const [soundStatus, setSoundStatus] = useState(true);
  const [finishLine, setFinishLine] = useState(false);
  const [selectedHorse, setSelectedHorse] = useState<any>(null);

  setTimeout(() => {
    setHorses([
      {
        id: 1,
        progress: progress1,
        name: `${npcNames.horse1}`,
        nft: `${npcNames.nft1}`,
        media: `${npcNames.media1?.thumbnail || '/images/logo.png'}`,
      },
      {
        id: 2,
        progress: progress2,
        name: `${npcNames.horse2}`,
        nft: `${npcNames.nft2}`,
        media: `${npcNames.media2?.thumbnail || '/images/logo.png'}`,
      },
      {
        id: 3,
        progress: progress3,
        name: `${npcNames.horse3}`,
        nft: `${npcNames.nft3}`,
        media: `${npcNames.media3?.thumbnail || '/images/logo.png'}`,
      },
      {
        id: 4,
        progress: progress4,
        name: `${npcNames.horse4}`,
        nft: `${npcNames.nft4}`,
        media: `${npcNames.media4?.thumbnail || '/images/logo.png'}`,
      },
      {
        id: 5,
        progress: progress5,
        name: `${npcNames.horse5}`,
        nft: `${npcNames.nft5}`,
        media: `${npcNames.media5?.thumbnail || '/images/logo.png'}`,
      },
    ]);
  }, 40);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = () => {
    if (hasCookie('horse')) {
      setSelectedHorse(getCookie('horse'));
    }

    const socket = io(`${process.env.NEXT_PUBLIC_HORSE_RACE_SOCKET_URL}`, {
      transports: ['websocket'],
    });
    socket.on('connect', () => {});

    socket.on('status', (data: any) => {
      setStatus(data);
    });

    socket.on('winner', (data: any) => {
      setWinner(data), deleteCookie('horse');
    });

    socket.on('horse1', (data: any) => {
      setProgress1(data);
    });

    socket.on('horse2', (data: any) => {
      setProgress2(data);
    });

    socket.on('horse3', (data: any) => {
      setProgress3(data);
    });

    socket.on('horse4', (data: any) => {
      setProgress4(data);
    });

    socket.on('horse5', (data: any) => {
      setProgress5(data);
    });
  };

  useEffect(() => {
    if (flag === true) {
      setFinishLine(true);
      setTimeout(() => {
        setFinishLine(false);
        setFlag(false);
      }, 8000);
    }
  }, [flag]);

  setTimeout(() => {
    setFence(fence - 1);
  }, 60);

  return (
    <div className="min-h-screen min-w-full items-center overflow-x-hidden ">
      <audio
        src="/horseRace/racing.mp3"
        typeof="audio/mpeg"
        autoPlay={soundStatus}
        muted={!soundStatus}
      />

      <div className="flex flex-row">
        <div
          className="relative flex w-full flex-col items-start justify-center gap-2 "
          style={{
            backgroundImage: `url('/horseRace/dirt2.jpg')`,
            backgroundSize: '150px',
          }}
        >
          {/* //? Finish line */}
          <div
            className={`absolute top-[27%] z-[999px] h-2/3 w-4 bg-[url(/horseRace/finish.png)] transition-all duration-1000 ease-linear ${
              finishLine ? ' right-0 ' : '-right-[16px]'
            }`}
          ></div>

          <div className="   relative flex w-full items-center justify-center text-gray-800 md:h-48">
            {/*
                        <div onClick={() => {
                            setSoundStatus(!soundStatus)
                        }} className="absolute text-sm right-0 md:right-10 flex flex-col text-center items-center justify-center fill-gray-200 text-gray-200">{soundStatus ? <> <BsFillVolumeUpFill className="w-8 h-8" /> Sound On </> : <> <BsFillVolumeMuteFill className="w-8 h-8" /> Sound Off</>}
                        </div>
                        */}

            <div className="  flex flex-col gap-1 rounded-xl bg-gradient-to-t from-black to-transparent md:mt-5 md:h-44 md:w-full lg:px-5 xl:w-2/3">
              <div className="mt-5 flex flex-row gap-1">
                {horses

                  .sort((a: any, b: any) => a.progress - b.progress)
                  .map((horse: any, index: number) => {
                    return (
                      /*
                                            <div key={index} className={`md:h-32 w-full xl:w-1/5 md:border-[2px] p-2 rounded-md flex-col flex ${selectedHorse === horse.name ? "bg-green-500" : null}`}>
                                        */
                      <div
                        key={index}
                        className={`flex w-1/5 flex-col rounded-md p-2 md:h-32 md:border-[2px] xl:w-1/5 ${
                          selectedHorse === horse.name ? 'bg-green-500' : null
                        }`}
                      >
                        <div className="w-15 flex-row items-center justify-center rounded-md bg-white p-2 text-center">
                          #{horse.nft}
                          <br></br>
                          {horse.name}
                        </div>

                        <div className="mt-2 w-full flex-col items-center justify-center  md:flex">
                          <Image
                            //src={`/npcRace/at${horse.id}.gif`}

                            src={horse.media}
                            width="40"
                            height="40"
                            alt={'at'}
                            className="rounded-lg"
                          />
                          {/*
                                                    <div className="bg-white mt-4 px-5 rounded-md text-sm shadow-lg">
                                                        {horse.name}
                                                    </div>
                                                    */}
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="flex items-center justify-center text-center"></div>
            </div>
          </div>

          <div
            style={{
              backgroundImage: `url('/horseRace/grass.jpeg')`,
              backgroundSize: '150px',
            }}
            className="h-full w-full"
          >
            <div
              style={{
                backgroundImage: `url('/horseRace/fence.png')`,
                backgroundSize: '120px',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: `${finishLine ? '0px' : `${fence}%`} 0px`,
              }}
              className="h-14 w-full"
            ></div>

            <div
              className="relative flex min-w-[150px] items-end justify-end pt-0 "
              style={{
                width: `${progress1}%`,
              }}
            >
              <Image
                //src={"/npcRace/at1.gif"}
                src={npcNames.media1?.thumbnail || '/images/logo.png'}
                width="50"
                height="50"
                alt={'at'}
                className="rounded-lg"
              />
              {selectedHorse === npcNames.horse1 && (
                <Image
                  src={'/horseRace/star.png'}
                  width="35"
                  height="35"
                  className="absolute right-[35px] top-0"
                  alt="star"
                />
              )}

              <div className="ml-2">
                <span className="font-extrabold text-sky-100">
                  #{npcNames.nft1}
                </span>{' '}
                {npcNames.horse1}
              </div>
            </div>

            <div
              className="relative  flex min-w-[150px] items-end justify-end pt-3 "
              style={{
                width: `${progress2}%`,
              }}
            >
              <Image
                //src={"/npcRace/at2.gif"}
                src={npcNames.media2?.thumbnail || '/images/logo.png'}
                width="50"
                height="50"
                alt={'at'}
                className="rounded-lg"
              />
              {selectedHorse === npcNames.horse2 && (
                <Image
                  src={'/horseRace/star.png'}
                  width="35"
                  height="35"
                  className="absolute right-[35px] top-0"
                  alt="star"
                />
              )}

              <div className="ml-2">
                <span className="font-extrabold text-sky-100">
                  #{npcNames.nft2}
                </span>{' '}
                {npcNames.horse2}
              </div>
            </div>

            <div
              className="relative  flex min-w-[150px] items-end justify-end pt-3 "
              style={{
                width: `${progress3}%`,
              }}
            >
              <Image
                //src={"/npcRace/at3.gif"}
                src={npcNames.media3?.thumbnail || '/images/logo.png'}
                width="50"
                height="50"
                alt={'at'}
                className="rounded-lg"
              />
              {selectedHorse === npcNames.horse3 && (
                <Image
                  src={'/horseRace/star.png'}
                  width="35"
                  height="35"
                  className="absolute right-[35px] top-0"
                  alt="star"
                />
              )}

              <div className="ml-2">
                <span className="font-extrabold text-sky-100">
                  #{npcNames.nft3}
                </span>{' '}
                {npcNames.horse3}
              </div>
            </div>

            <div
              className="relative  flex min-w-[150px] items-end justify-end pt-3 "
              style={{
                width: `${progress4}%`,
              }}
            >
              <Image
                //src={"/npcRace/at4.gif"}
                src={npcNames.media4?.thumbnail || '/images/logo.png'}
                width="50"
                height="50"
                alt={'at'}
                className="rounded-lg"
              />
              {selectedHorse === npcNames.horse4 && (
                <Image
                  src={'/horseRace/star.png'}
                  width="35"
                  height="35"
                  className="absolute right-[35px] top-0"
                  alt="star"
                />
              )}

              <div className="ml-2">
                <span className="font-extrabold text-sky-100">
                  #{npcNames.nft4}
                </span>{' '}
                {npcNames.horse4}
              </div>
            </div>

            <div
              className="relative  flex min-w-[150px] items-end justify-end pb-5 pt-3"
              style={{
                width: `${progress5}%`,
              }}
            >
              <Image
                //src={"/npcRace/at5.gif"}
                src={npcNames.media5?.thumbnail || '/images/logo.png'}
                width="50"
                height="50"
                alt={'at'}
                className="rounded-lg"
              />
              {selectedHorse === npcNames.horse5 && (
                <Image
                  src={'/horseRace/star.png'}
                  width="35"
                  height="35"
                  className="absolute right-[35px] top-0"
                  alt="star"
                />
              )}

              <div className="ml-2">
                <span className="font-extrabold text-sky-100">
                  #{npcNames.nft5}
                </span>{' '}
                {npcNames.horse5}
              </div>
            </div>

            <div
              style={{
                backgroundImage: `url('/horseRace/fence.png')`,
                backgroundSize: '120px',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: `${finishLine ? '0px' : `${fence}%`} 0px`,
              }}
              className="-mt-3 h-14 w-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
