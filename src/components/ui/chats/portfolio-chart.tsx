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

import { Listbox } from '@/components/ui/listbox';
import { ChevronDown } from '@/components/icons/chevron-down';
import { Transition } from '@/components/ui/transition';

import { List } from '@mui/material';

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

export default function PortfolioChart(
  { userAddress }: { userAddress: string },
  { chartWrapperClass }: Props
) {
  const { layout } = useLayout();

  const [volumn, setVolumn] = useState([] as any);

  useEffect(() => {
    async function getVolumn() {
      const response = await fetch('/api/nft/user/history/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'getVolumn',
          address: userAddress.toLowerCase(),
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
          sum:
            item.totalGRD +
            item.totalCARROT +
            item.totalSUGAR +
            item.totalHORSE,
          GRD: item.totalGRD,
          CARROT: item.totalCARROT,
          SUGAR: item.totalSUGAR,
          HORSE: item.totalHORSE,
        });
      });

      ////console.log('volumn', volumn);

      setVolumn(volumn);
    }

    getVolumn();

    const interval = setInterval(() => {
      getVolumn();
    }, 10000);
  }, []);

  const [option, setOption] = useState('daily');

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
      {/*
             <Listbox value={blockchain} onChange={setBlockChain}>
                <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                  <div className="flex items-center">
                    <span className="ltr:mr-2 rtl:ml-2">{blockchain.icon}</span>
                    {blockchain.name}
                  </div>
                  <ChevronDown />
                </Listbox.Button>
                <Transition
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                    {BlockchainOptions.map((option) => (
                      <Listbox.Option key={option.id} value={option}>
                        {({ selected }) => (
                          <div
                            className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                              selected
                                ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                            }`}
                          >
                            <span className="ltr:mr-2 rtl:ml-2">
                              {option.icon}
                            </span>
                            {option.name}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </Listbox>
                          */}

      {/* select option button of daily or weekly or monthly */}
      {/* onclick change data */}
      {/*
      <div className='w-full flex justify-end items-center'>
      <div className='flex justify-center items-end w-28'>
      <Listbox value={option} onChange={setOption}>
        <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
          <div className="flex items-center">
            <span className="ltr:mr-2 rtl:ml-2"></span>
            {option}
          </div>
          <ChevronDown />
        </Listbox.Button>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className=" z-10 mt-1 grid w-28  origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
            {['daily', 'weekly', 'monthly'].map((option) => (
              <Listbox.Option key={option} value={option}>
                {({ selected }) => (
                  <div
                    className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                      selected
                        ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                    }`}
                  >
                    <span className="ltr:mr-2 rtl:ml-2"></span>
                    {option}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
      </div>
      </div>
      */}

      {/* chart */}

      <div className={cn('mt-5 h-80 w-full', chartWrapperClass)}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={volumn}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sum" stroke="#666666" />
            <Line type="monotone" dataKey="GRD" stroke="#666666" />
            <Line type="monotone" dataKey="CARROT" stroke="#ff0000" />
            <Line type="monotone" dataKey="SUGAR" stroke="#8884d8" />
            <Line type="monotone" dataKey="HORSE" stroke=" #82ca9d  " />
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
