import Image from 'next/image';
import { useEffect, useState } from 'react';
//@ts-ignore
import { io } from 'socket.io-client';
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from 'react-icons/bs';
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
      { id: 1, progress: progress1, name: `${npcNames.horse1}` },
      { id: 2, progress: progress2, name: `${npcNames.horse2}` },
      { id: 3, progress: progress3, name: `${npcNames.horse3}` },
      { id: 4, progress: progress4, name: `${npcNames.horse4}` },
      { id: 5, progress: progress5, name: `${npcNames.horse5}` },
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
        src="/snailRace/racing.mp3"
        typeof="audio/mpeg"
        autoPlay={soundStatus}
        muted={!soundStatus}
      />

      <div className="flex flex-row">
        <div
          className="relative flex w-full flex-col items-start justify-center gap-2 "
          style={{
            backgroundImage: `url('/snailRace/dirt2.jpg')`,
            backgroundSize: '150px',
          }}
        >
          {/* //? Finish line */}
          <div
            className={`absolute top-[27%] z-[999px] h-2/3 w-4 bg-[url(/snailRace/finish.png)] transition-all duration-1000 ease-linear ${
              finishLine ? ' right-0 ' : '-right-[16px]'
            }`}
          ></div>

          <div className="relative flex w-full items-center justify-center text-gray-800 md:h-44">
            <div
              onClick={() => {
                setSoundStatus(!soundStatus);
              }}
              className="absolute right-0 flex flex-col items-center justify-center fill-gray-200 text-center text-gray-200 md:right-10"
            >
              {soundStatus ? (
                <>
                  {' '}
                  <BsFillVolumeUpFill className="h-8 w-8" /> Sound On{' '}
                </>
              ) : (
                <>
                  {' '}
                  <BsFillVolumeMuteFill className="h-8 w-8" /> Sound Off
                </>
              )}
            </div>
            <div className="flex flex-col gap-1 rounded-xl bg-gradient-to-t from-black to-transparent md:mt-5 md:h-44 md:w-full lg:px-5 xl:w-2/3">
              <div className="mt-5 flex flex-row gap-3">
                {horses
                  .sort((a: any, b: any) => a.progress - b.progress)
                  .map((horse: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`flex w-full flex-col rounded-md p-2 md:h-32 md:border-[2px] xl:w-1/5 ${
                          selectedHorse === horse.name ? 'bg-green-500' : null
                        }`}
                      >
                        <div className="h-7 w-7 flex-row items-center justify-center rounded-full bg-white text-center">
                          {horse.id}
                        </div>
                        <div className="hidden w-full flex-col items-center justify-center md:flex">
                          <Image
                            src={`/npcRace/at${horse.id}.png`}
                            width="50"
                            height="50"
                            alt={'at'}
                          />
                          <div className="mt-4 rounded-md bg-white px-5 text-xl shadow-lg">
                            {horse.name}
                          </div>
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
              backgroundImage: `url('/snailRace/grass.jpeg')`,
              backgroundSize: '150px',
            }}
            className="h-full w-full"
          >
            <div
              style={{
                backgroundImage: `url('/snailRace/fence.png')`,
                backgroundSize: '120px',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: `${finishLine ? '0px' : `${fence}%`} 0px`,
              }}
              className="h-14 w-full"
            ></div>

            <div
              className="relative flex min-w-[150px] items-end justify-end pt-3 "
              style={{
                width: `${progress1}%`,
              }}
            >
              <Image
                src={'/npcRace/at1.png'}
                width="80"
                height="80"
                alt={'at'}
              />
              {selectedHorse === npcNames.horse1 && (
                <Image
                  src={'/snailRace/star.png'}
                  width="35"
                  height="35"
                  className="absolute right-[35px] top-0"
                  alt="star"
                />
              )}
            </div>

            <div
              className="relative  flex min-w-[150px] items-end justify-end pt-3 "
              style={{
                width: `${progress2}%`,
              }}
            >
              <Image
                src={'/npcRace/at2.png'}
                width="80"
                height="80"
                alt={'at'}
              />
              {selectedHorse === npcNames.horse2 && (
                <Image
                  src={'/snailRace/star.png'}
                  width="35"
                  height="35"
                  className="absolute right-[35px] top-0"
                  alt="star"
                />
              )}
            </div>

            <div
              className="relative  flex min-w-[150px] items-end justify-end pt-3 "
              style={{
                width: `${progress3}%`,
              }}
            >
              <Image
                src={'/npcRace/at3.png'}
                width="80"
                height="80"
                alt={'at'}
              />
              {selectedHorse === npcNames.horse3 && (
                <Image
                  src={'/snailRace/star.png'}
                  width="35"
                  height="35"
                  className="absolute right-[35px] top-0"
                  alt="star"
                />
              )}
            </div>

            <div
              className="relative  flex min-w-[150px] items-end justify-end pt-3 "
              style={{
                width: `${progress4}%`,
              }}
            >
              <Image
                src={'/npcRace/at4.png'}
                width="80"
                height="80"
                alt={'at'}
              />
              {selectedHorse === npcNames.horse4 && (
                <Image
                  src={'/snailRace/star.png'}
                  width="35"
                  height="35"
                  className="absolute right-[35px] top-0"
                  alt="star"
                />
              )}
            </div>

            <div
              className="relative  flex min-w-[150px] items-end justify-end pb-5 pt-3"
              style={{
                width: `${progress5}%`,
              }}
            >
              <Image
                src={'/npcRace/at5.png'}
                width="80"
                height="80"
                alt={'at'}
              />
              {selectedHorse === npcNames.horse5 && (
                <Image
                  src={'/snailRace/star.png'}
                  width="35"
                  height="35"
                  className="absolute right-[35px] top-0"
                  alt="star"
                />
              )}
            </div>

            <div
              style={{
                backgroundImage: `url('/snailRace/fence.png')`,
                backgroundSize: '120px',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: `${finishLine ? '0px' : `${fence}%`} 0px`,
              }}
              className="-mt-8 h-14 w-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
