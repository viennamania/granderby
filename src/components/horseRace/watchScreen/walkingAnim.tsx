import React, { useRef, useEffect } from 'react';

import Image from 'next/image';

export default function WalkingAdnim({ time, npcSrc }: any) {
  const ref = useRef(null);

  /*
    useEffect(() => {
        import("@lottiefiles/lottie-player");
    });
    */

  return (
    <>
      <div className="  flex w-full flex-col items-center justify-center">
        <div className="justify-top flex w-full items-center">
          {/*
                    <lottie-player
                        id="firstLottie"
                        ref={ref}
                        autoplay
                        loop
                        mode="normal"
                        src={npcSrc}
                        style={{ width: "300px", height: "300px" }}
                    ></lottie-player>
                    */}

          <Image
            src="/horseRace/at1.gif"
            width={80}
            height={80}
            alt="horse"
            className="rounded-lg"
          />
        </div>
        {/*
                {time && <p className="text-xl text-white">Last {time} seconds for bets</p>}
                */}

        {time && time === -1 && (
          <div className="item-center flex w-full justify-center gap-1 bg-transparent  text-white">
            <div className="glow-text font-lg p-2 text-white ">
              <span className="text-6xl font-bold">Comming Soon...</span>
            </div>
          </div>
        )}

        {time && time !== -1 && (
          <div className="item-center flex w-full justify-center gap-1 bg-transparent  text-white">
            <div className="glow-text font-lg p-2 text-white ">
              {' '}
              Last <span className="text-6xl font-bold">{time}</span> seconds
              before game start{' '}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
