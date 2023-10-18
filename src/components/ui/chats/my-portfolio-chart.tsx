import cn from 'classnames';

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

import { useEffect, useState } from 'react';

import {
  tokenContractAddressUSDC,
  tokenContractAddressGCOW,
  tokenContractAddressGRD,
  tokenContractAddressCARROTDrop,
  tokenContractAddressSUGARDrop,
  nftDropContractAddressHorse,
} from '@/config/contractAddresses';
import { time } from 'console';
import { m } from 'framer-motion';

import { useAddress } from '@thirdweb-dev/react';

const data = [
  {
    name: '10 / 7',
    GRD: 4000,
    CARROT: 2400,
    SUGAR: 2400,
  },
  {
    name: '10 / 8',
    GRD: 3000,
    CARROT: 1398,
    SUGAR: 2210,
  },
  {
    name: '10 / 9',
    GRD: 2000,
    CARROT: 9800,
    SUGAR: 2290,
  },
  {
    name: '10 / 10',
    GRD: 2780,
    CARROT: 3908,
    SUGAR: 2000,
  },
  {
    name: '10 / 11',
    GRD: 1890,
    CARROT: 4800,
    SUGAR: 2181,
  },
  {
    name: '10 / 12',
    GRD: 2390,
    CARROT: 3800,
    SUGAR: 2500,
  },
  {
    name: '10 / 13',
    GRD: 3490,
    CARROT: 4300,
    SUGAR: 2100,
  },
  {
    name: '10 / 14',
    GRD: 3442,
    CARROT: 4133,
    SUGAR: 2334,
  },
];

interface Props {
  chartWrapperClass?: string;
}

export default function PortfolioChart({ chartWrapperClass }: Props) {
  const { layout } = useLayout();

  const address = useAddress();

  const [volumn, setVolumn] = useState([] as any);

  useEffect(() => {
    async function getVolumn() {
      if (!address) {
        return;
      }

      const response = await fetch('/api/nft/user/history/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'getVolumnByHolder',
          address: address.toLowerCase(),
        }),
      });

      const data = await response.json();

      ///console.log('data', data);

      const volumn = [] as any;

      data?.all?.map((item: any) => {
        ///console.log('item', item);

        const name = item._id;

        // find total same contract is 0x41fba0bd9f4dc9a968a10aebb792af6a09969f60 from data.all

        // sugar contract address  "0x631459bf14c9dd1a30b955dfcba08106b00c1359"

        //const totalGRD = data.all.filter((item: any) => item._id === name && item.contract?.toLowerCase() === tokenContractAddressGRD.toLowerCase()).total;

        /*
        var totalGRD = 0;
        data.all.map((item: any) => {
          if (
            item._id === name &&
            item.contract?.toLowerCase() ===
              tokenContractAddressGRD.toLowerCase()
          ) {
            totalGRD = item.total;
            return item.total;
          }
        });

        //const totalCARROT = data.all.filter((item: any) => item._id === name && item.contract?.toLowerCase() === tokenContractAddressCARROTDrop.toLowerCase()).total;

        var totalCARROT = 0;
        data.all.map((item: any) => {
          if (
            item._id === name &&
            item.contract?.toLowerCase() ===
              tokenContractAddressCARROTDrop.toLowerCase()
          ) {
            totalCARROT = item.total;
            return item.total;
          }
        });

        ///const totalSUGAR = data.all.filter((item: any) => item._id === name && item.contract?.toLowerCase() === tokenContractAddressSUGARDrop.toLowerCase()).total;

        var totalSUGAR = 0;
        data.all.map((item: any) => {
          if (
            item._id === name &&
            item.contract?.toLowerCase() ===
              tokenContractAddressSUGARDrop.toLowerCase()
          ) {
            totalSUGAR = item.total;
            return item.total;
          }
        });

        //const totalHORSE = data.all.filter((item: any) => item._id === name && item.contract?.toLowerCase() === nftDropContractAddressHorse.toLowerCase()).total;
        var totalHORSE = 0;
        data.all.map((item: any) => {
          if (
            item._id === name &&
            item.contract?.toLowerCase() ===
              nftDropContractAddressHorse.toLowerCase()
          ) {
            totalHORSE = item.total;
            return item.total;
          }
        });
        */

        volumn.push({
          name: name,
          GRD: item.totalGRD,
          CARROT: item.totalCARROT,
          SUGAR: item.totalSUGAR,
          HORSE: item.totalHORSE,
        });
      });

      ////console.log('volumn', volumn);

      setVolumn(volumn);
    }

    const interval = setInterval(() => {
      getVolumn();
    }, 10000);
  }, [address]);

  /* if address is empty then loading view */
  if (!address) {
    return (
      <div
        className={cn(
          ///'rounded-lg bg-light-dark p-6 text-white shadow-card sm:p-8',
          'rounded-lg  p-2 shadow-card',
          {
            'w-full lg:w-[49%]': layout === LAYOUT_OPTIONS.RETRO,
          }
        )}
      >
        <div className={cn('mt-5 h-80 w-full', chartWrapperClass)}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="natural"
                dataKey="CARROT"
                stroke="#1E40AF"
                strokeWidth={4}
                dot={false}
              />
              <Line
                type="natural"
                dataKey="GRD"
                stroke="#374151"
                strokeWidth={4}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  /* if empoty volumn then loading view */
  if (volumn.length === 0) {
    return (
      <div
        className={cn(
          ///'rounded-lg bg-light-dark p-6 text-white shadow-card sm:p-8',
          'rounded-lg  p-2 shadow-card',
          {
            'w-full lg:w-[49%]': layout === LAYOUT_OPTIONS.RETRO,
          }
        )}
      >
        <div className={cn('mt-5 h-80 w-full', chartWrapperClass)}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="natural"
                dataKey="CARROT"
                stroke="#1E40AF"
                strokeWidth={4}
                dot={false}
              />
              <Line
                type="natural"
                dataKey="GRD"
                stroke="#374151"
                strokeWidth={4}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* loading view overlap */}
        <div className=" left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div className=" text-2xl text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        ///'rounded-lg bg-light-dark p-6 text-white shadow-card sm:p-8',
        'rounded-lg  p-2 shadow-card',
        {
          'w-full lg:w-[49%]': layout === LAYOUT_OPTIONS.RETRO,
        }
      )}
    >
      <div className={cn('mt-5 h-80 w-full', chartWrapperClass)}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={volumn}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="GRD" stroke="#666666" />
            <Line type="monotone" dataKey="CARROT" stroke="#ff0000" />
            <Line type="monotone" dataKey="SUGAR" stroke="#82ca9d" />
            <Line type="monotone" dataKey="HORSE" stroke=" #8884d8  " />
          </LineChart>

          {/*
          <LineChart data={data}>
            <Line
              type="natural"
              dataKey="CARROT"
              stroke="#1E40AF"
              strokeWidth={4}
              dot={false}
            />
            <Line
              type="natural"
              dataKey="GRD"
              stroke="#374151"
              strokeWidth={4}
              dot={false}
            />
          </LineChart>
          */}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
