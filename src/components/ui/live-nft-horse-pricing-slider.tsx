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
  const router = useRouter();

  const { openDrawer } = useDrawer();

  const [drawerHorseInfoTokenId, setDrawerHorseInfoTokenId] = useLocalStorage(
    'drawer-horse-info-tokenid'
  );

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-lg bg-white p-5 shadow-[0_8px_16px_rgba(17,24,39,0.05)] dark:bg-light-dark lg:flex-row'
      )}
    >
      <button
        className="w-full flex-col"
        //onClick={() => router.push('/horse-details/' + id)}
        onClick={() => {
          setDrawerHorseInfoTokenId(id);
          openDrawer('DRAWER_HORSE_INFO', id);
        }}
      >
        <div className="mb-3 flex items-center">
          <div className="h-[54px] w-[54px]">
            <Image
              src={logo}
              alt={name}
              width={200}
              height={200}
              className="rounded-md"
            />
          </div>
          {/*icon*/}

          <div className="flex flex-col">
            <h4 className="text-sm font-medium text-gray-900 ltr:ml-3 rtl:mr-3 dark:text-white">
              # {id}
            </h4>
            <h4 className="text-sm font-medium text-gray-900 ltr:ml-3 rtl:mr-3 dark:text-white">
              {name}
            </h4>
          </div>
        </div>

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
      </button>

      <div
        className="h-20 w-full overflow-hidden"
        data-hello={isChangePositive ? '#22c55e' : '#D6455D'}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={prices}>
            <defs>
              <linearGradient id={`${name}-${id}`} x1="0" y1="0" x2="0" y2="1">
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
  );
}

export default function LiveNftPricingSlider({ limits }: { limits: number }) {
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
  );
}
