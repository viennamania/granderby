import React, { useRef, useEffect } from 'react';

import Image from 'next/image';

export default function WalkingAdnim({ time, npcSrc }: any) {
  const ref = useRef(null);
  useEffect(() => {
    import('@lottiefiles/lottie-player');
  });
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center">
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
            src="/npcRace/at1.gif"
            width={80}
            height={80}
            alt="snail"
            className="rounded-lg"
          />
        </div>
        {/*
                {time && <p className="text-xl text-white">Last {time} seconds for bets</p>}
                */}

        {time && (
          <div className="item-center flex w-full justify-center gap-1 bg-transparent text-2xl text-white">
            <div className="glow-text p-2 font-medium text-white ">
              {' '}
              Last {time} seconds for bets{' '}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
