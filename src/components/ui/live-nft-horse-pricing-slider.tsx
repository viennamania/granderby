import { ArrowUp } from '@/components/icons/arrow-up';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination, Autoplay } from 'swiper';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import cn from 'classnames';

import Image from '@/components/ui/image';

import { useRouter } from 'next/router';

import { useDrawer } from '@/components/drawer-views/context';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';

import { priceFeedData } from '@/data/static/nft-horse-price-feed';

import { ChevronForward } from '@/components/icons/chevron-forward';

import React, { use, useEffect, useState } from 'react';

type Price = {
  name: number;
  value: number;
};

type LivePriceFeedProps = {
  id: string;
  name: string;
  symbol: string;
  icon: React.ReactElement;
  balance: string;
  usdBalance: string;
  logo: string;
  change: string;
  isChangePositive: boolean;
  isBorder?: boolean;
  prices: Price[];
};

export function LivePricingFeed({
  id,
  name,
  symbol,
  icon,
  balance,
  usdBalance,
  logo,
  change,
  isChangePositive,
  prices,
  isBorder,
}: LivePriceFeedProps) {
  const { openDrawer } = useDrawer();

  const [drawerHorseInfoTokenId, setDrawerHorseInfoTokenId] = useLocalStorage(
    'drawer-horse-info-tokenid'
  );

  const [transactions1, setTransactions1] = React.useState([]);

  const getLast20 = async () => {
    ///console.log('price-history-table nftMetadata.?metadata?.id: ', nftMetadata?.metadata?.id);

    const response = await fetch('/api/nft/horse/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'getAllByTokenId',
        tokenId: '537', // 584, 520, 500, 555,
      }),
    });
    const data = await response.json();

    //console.log('data.all: ', data.all);

    ///setSaleHistory(data.all);

    const transactions = [] as any;

    data.all?.map((buy: any, index: number) => {
      const transactionData = {
        id: buy.blockNum,
        //transactionType: transfer.from === address ? 'Send' : 'Receive',
        transactionType: 'Send',
        createdAt: buy.blockTimestamp,

        //address: transfer.from === address ? transfer.to : transfer.from,
        address: buy.buyer,

        amount: {
          totalPricePaid: buy.totalPricePaid,
          paidToken: buy.paidToken,
        },
        status: 'Completed',
      };

      //console.log('transactionData: ', transactionData);

      ////setTransers((transfers) => [...transfers, transactionData]);

      transactions.push(transactionData);
    });

    console.log('pricing-slider transactions: ', transactions);

    setTransactions1(transactions);
  };

  useEffect(() => {
    getLast20();
  }, []);

  return (
    <div
      className={cn(
        'flex flex-row items-center gap-4 rounded-lg bg-white p-5 shadow-[0_8px_16px_rgba(17,24,39,0.05)] dark:bg-light-dark '
      )}
    >
      <button
        //className="w-full flex-col"

        className={`gold-btn flex border border-black p-1 text-center text-black ${
          id === '0'
            ? 'gold-btn-active'
            : id === '1000'
            ? 'bg-[#ffc000]'
            : 'bg-transparent'
        } disabled:bg-transparent disabled:text-white disabled:opacity-70 disabled:shadow-none`}
        //onClick={() => router.push('/horse-details/' + id)}
        onClick={() => {
          setDrawerHorseInfoTokenId(id);
          openDrawer('DRAWER_HORSE_INFO', id);
        }}
      >
        <div className="flex w-[80px] flex-col items-center justify-center">
          <Image
            src={logo}
            alt={name}
            width={200}
            height={200}
            className="rounded-md "
          />

          {/*icon*/}

          <div className="mt-2 flex flex-col items-center justify-center">
            <h4 className="text-sm font-medium text-gray-900  dark:text-white">
              #{id}
            </h4>
            <h4 className="text-sm font-medium text-gray-900  dark:text-white">
              {name}
            </h4>
          </div>
        </div>
      </button>

      <div className="flex w-full flex-col justify-between">
        <div className="mb-2 text-sm font-medium tracking-tighter text-gray-900 dark:text-white lg:text-lg 2xl:text-xl 3xl:text-2xl">
          {balance}
          <span className="ml-3">{symbol}</span>
        </div>

        <div className="flex items-center text-xs font-medium 2xl:text-sm">
          <span
            className="truncate tracking-tighter text-gray-600 ltr:mr-5 rtl:ml-5 dark:text-gray-400 2xl:w-24 3xl:w-auto"
            title={`${usdBalance} USD`}
          >
            {usdBalance} USD
          </span>

          <span
            className={`flex items-center  ${
              isChangePositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            <span
              className={`ltr:mr-2 rtl:ml-2 ${
                !isChangePositive ? 'rotate-180' : ''
              }`}
            >
              <ArrowUp />
            </span>
            {change}
          </span>
        </div>

        <div
          className="h-20 w-full overflow-hidden"
          data-hello={isChangePositive ? '#22c55e' : '#D6455D'}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={prices}>
              <defs>
                <linearGradient
                  id={`${name}-${id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={isChangePositive ? '#22c55e' : '#D6455D'}
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="100%"
                    stopColor={isChangePositive ? '#22c55e' : '#D6455D'}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                type="linear"
                dataKey="value"
                stroke={isChangePositive ? '#22c55e' : '#D6455D'}
                strokeWidth={2.5}
                fill={`url(#${`${name}-${id}`})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default function LiveNftPricingSlider({ limits }: { limits: number }) {
  const router = useRouter();

  const breakpoint = useBreakpoint();

  const limit = limits ?? 4;

  const sliderBreakPoints = {
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1600: {
      slidesPerView: limit,
      spaceBetween: 24,
    },
  };

  return (
    <div className="flex w-full flex-col">
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={sliderBreakPoints}
        pagination={{ clickable: true }}
        observer={true}
        dir="ltr"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="w-full pb-10"
      >
        {priceFeedData.map((item) => (
          <SwiperSlide key={item.id}>
            <LivePricingFeed {...item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-2 flex w-full flex-row items-center justify-between gap-5">
        <div className="text-sm font-bold ">
          Total Trade:{' '}
          <span className="text-xl font-bold text-green-600">{'17,422'} </span>
          USD
        </div>

        <div className="  flex justify-end ">
          <div className="flex flex-col items-center justify-center gap-1">
            <Image
              src="/images/market.png"
              alt="market"
              width={25}
              height={20}
            />
            {/*
            <Image
              src="/images/logo-opensea.svg"
              alt="market"
              width={80}
              height={50}
            />
            */}
          </div>

          <button
            className="ml-5 flex flex-row items-center justify-center gap-3"
            ///onClick={(e) => router.push('/coin/usdc')}
            onClick={() => {
              router.push('https://granderby.market');
              ///router.push('/horse-details/' + nft?.metadata?.id);
            }}
          >
            <ChevronForward className="mr-10 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
