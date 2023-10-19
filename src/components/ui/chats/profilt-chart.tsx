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

export default function ProfitChart({ chartWrapperClass }: Props) {
  const { layout } = useLayout();

  const [volumn, setVolumn] = useState([] as any);

  useEffect(() => {
    async function getVolumn() {
      const response = await fetch('/api/nft/user/history/race', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'getWinPrize',
          //address: userAddress.toLowerCase(),
        }),
      });

      const data = await response.json();

      ///console.log('data===========', data);

      /*
  { _id: '2023-10-17', totalWinPrize: 636.984 },
  { _id: '2023-10-18', totalWinPrize: 2194.931 }
  */

      const volumn = [] as any;

      data?.all?.map((item: any) => {
        ///console.log('item', item);

        volumn.push({
          name: item._id,
          total: item.totalWinPrize,
          sum: item.totalHorse1 + item.totalHorse2 + item.totalHorse3,
          horse1: item.totalHorse1,
          horse2: item.totalHorse2,
          horse3: item.totalHorse3,
        });
      });

      ////console.log('volumn', volumn);

      setVolumn(volumn);
    }

    getVolumn();
  }, []);

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
            {/*}
            <Line type="monotone" dataKey="total" stroke="#666666" />
            */}

            {/*
            <Line type="monotone" dataKey="sum" stroke="#666666" />
            */}
            <Line type="monotone" dataKey="horse1" stroke="#ff0000" />
            <Line type="monotone" dataKey="horse2" stroke="#8884d8" />
            <Line type="monotone" dataKey="horse3" stroke=" #82ca9d  " />
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
