import Button from '@/components/ui/button';

import Feeds from './feeds-horse-registered';

import SaleFeeds from './feeds-horse-sale';

//import ListedFeeds from '.feeds-horse-listed';

import RegisteredFeeds from './feeds-horse-registered-hv';

import { useDrawer } from '@/components/drawer-views/context';

//////import { Filters, GridSwitcher, SortList } from '@/components/search/filters';

import Image from '@/components/ui/image';

import CollapseLivePricing from '@/components/ui/collapse-live-pricing';

import {
  Filters,
  GridSwitcher,
  SortList,
} from '@/components/search/filters-horse';

import { OptionIcon } from '@/components/icons/option';

import ParamTab, { TabPanel } from '@/components/ui/param-tab';

import LiveNftPricingSlider from '@/components/ui/live-nft-horse-pricing-slider';

import { useEffect, useState } from 'react';
import { add, set } from 'lodash';
import { randomInt } from 'crypto';

import LastWinnersPage from '@/components/horseRace/watchScreen/lastWinnersGranderby';

import Collapse from '@/components/ui/collapse-last-winners';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';

import { useRouter } from 'next/router';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
} from '@/config/contractAddresses';

export default function Search() {
  const { openDrawer } = useDrawer();

  const router = useRouter();

  ///const [livePricingIsOpen] = useLocalStorage('live-pricing-isopen', true);

  /*
  const [livePricingIsOpen, setLivePricingOpen] = useLocalStorage(
    'live-pricing-isopen'
  );
  setLivePricingOpen(true);
  */

  const [lastWinersIsOpen] = useLocalStorage('last-winners-isopen');

  const [selectedGradesStorage, setSelectedGradesStorage] =
    useLocalStorage('selected-grades');

  if (!selectedGradesStorage) {
    setSelectedGradesStorage([]);
  }

  const [selectedManesStorage, setSelectedManesStorage] =
    useLocalStorage('selected-manes');

  if (!selectedManesStorage) {
    setSelectedManesStorage([]);
  }

  const tabMenu = [
    {
      title: 'Items',
      path: 'items',
    },
    /*
    {
      title: 'Owned',
      path: 'owned',
    },
    */
    /*
    {
      title: 'Registered',
      path: 'registered',
    },
    */

    /*
    {
      title: 'Sales',
      path: 'Sales',
    },
    */

    /*
    {
      title: 'Listed',
      path: 'listed',
    },
    */
    /*
    {
      title: 'Portfolio',
      path: 'portfolio',
    },
    {
      title: 'History',
      path: 'history',
    },
    */
  ];

  /*
  const [npcNames, setNpcNames] = useState<any>([]);

  useEffect(() => {
    async function getNpcNames() {
      const npcNamesResponse = await fetch(
        `/api/games/horseRace/settings/horseNames?method=all`
      );
      const response = await npcNamesResponse.json();

      ///console.log('getNpcNames response', response);

      //const data = useOwnedNFTs(nftDropContractHorse, address);

      setNpcNames(response.npcNames[0]);

      //npcNames.npcNames[0].nft1
    }

    getNpcNames();
  }, []);
  */

  const [horsesCount, setHorsesCount] = useState<any>(0);

  useEffect(() => {
    async function getHorsesCount() {
      const response = await fetch('/api/nft/getHorsesCount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'getAll',
          ///grades: selectedGradesStorage,
          grades: [],
          manes: [],
          holder: stakingContractAddressHorseAAA,
          //sort: selectedGSortStorage,
        }),
      });
      const data = await response.json();

      console.log('getHorsesCount data====', data);

      setHorsesCount(data.total);
    }

    getHorsesCount();
  }, [selectedGradesStorage, selectedManesStorage]);

  return (
    <>
      <div className=" flex flex-col items-start justify-center  text-2xl font-bold text-gray-900 dark:text-white sm:text-2xl">
        {/*
        <div className="justify-left flex flex-row items-center">
          <Image
            src="/horseRace/logo-granderby.png"
            alt="Horse NFT"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="ml-3">Granderby</span>
        </div>
        */}

        <div className="mt-5 flex flex-row items-center justify-start gap-3 ">
          <span className=" text-xl font-bold xl:text-2xl">
            Granderby Horse NFT
          </span>

          <button
            onClick={() =>
              router.push(
                `https://polygonscan.com/token/${nftDropContractAddressHorse}`
              )
            }
          >
            <Image
              src="/images/logo-polygon.png"
              alt="gd"
              width={18}
              height={18}
            />
          </button>
        </div>

        <span className="mt-3 text-xs lg:text-sm xl:text-lg">
          Items 7,079 · Created Jun 2023 · Creator earnings 0% · Chain Polygon ·
          Category Gaming
        </span>

        <button
          className="mt-5 text-sm font-bold text-gray-900 dark:text-white"
          onClick={() => router.push(`/horse/transfers`)}
        >
          Transfers
        </button>
      </div>

      <div
        className="
        mt-5
        grid
        3xl:grid-cols-[280px_minmax(auto,_1fr)]
        4xl:grid-cols-[320px_minmax(auto,_1fr)]
      "
      >
        <div
          className="
          mt-10 hidden border-dashed border-gray-200 ltr:border-r ltr:pr-8 rtl:border-l rtl:pl-8 dark:border-gray-700
          3xl:block
        "
        >
          <Filters />
        </div>

        <div className="m-3 block">
          {/*
          <Collapse label="Last Race Winners" initialOpen={lastWinersIsOpen}>
            <div className="m-0 rounded-lg bg-black">
              <LastWinnersPage npcs={npcNames} />
            </div>
          </Collapse>
        */}

          <div
            className="

          "
          >
            <div className="relative z-10 mb-6 flex items-center justify-between ">
              <div className="flex flex-col gap-2 ">
                <div className="text-lg font-bold xl:text-2xl">
                  {horsesCount} {horsesCount > 1 ? 'Horses' : 'Horse'}
                </div>

                <div className="flex flex-col gap-2 xl:flex-row ">
                  {selectedGradesStorage
                    //.sort(function(a:any, b:any) {return a - b})
                    // sort grades
                    /*
                        .sort(function (a: any, b: any) {
                          if (a < b) {
                            return -1;
                          }
                          if (a > b) {
                            return 1;
                          }
                          return 0;
                        })
                        */
                    .map((grade: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-center gap-2 rounded-md border border-gray-300 px-2 py-1 dark:border-gray-700"
                      >
                        <div className="text-sm font-bold">Grade:</div>
                        <div className="text-sm font-bold">{grade}</div>

                        <button
                          className="text-sm font-bold  "
                          onClick={() => {
                            const temp = selectedGradesStorage?.filter(
                              (item: any) => item !== grade
                            );
                            setSelectedGradesStorage(temp);
                          }}
                        >
                          X
                        </button>
                      </div>
                    ))}
                </div>

                <div className="flex flex-col gap-2 xl:flex-row">
                  {selectedManesStorage?.map((mane: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-center gap-2 rounded-md border border-gray-300 px-2 py-1 dark:border-gray-700"
                    >
                      <div className="text-sm font-bold">Mane:</div>
                      <div className="text-sm font-bold">{mane}</div>

                      <button
                        className="text-sm font-bold  "
                        onClick={() => {
                          const temp = selectedManesStorage?.filter(
                            (item: any) => item !== mane
                          );
                          setSelectedManesStorage(temp);
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/*
              <div className="items-right flex w-full justify-end">
                <div className="flex gap-6 3xl:gap-8 ">

                  <SortList />

                  
                  <div className="hidden 3xl:block">
                    <GridSwitcher />
                  </div>

                  <div
                    className="
                    hidden
                    sm:block
                    3xl:hidden
                  "
                  >
                    <Button
                      shape="rounded"
                      size="small"
                      variant="ghost"
                      color="gray"
                      onClick={() => openDrawer('DRAWER_SEARCH', '')}
                      className="!h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
                    >
                      <OptionIcon className="relative h-auto w-[18px]" />
                    </Button>
                  </div>
                </div>
              </div>
              */}
            </div>

            <Feeds registerAddress={stakingContractAddressHorseAAA} />
          </div>
        </div>

        {/*
        <div className="fixed bottom-6 left-1/2 z-10 w-full -translate-x-1/2 px-9 sm:hidden">
          <Button onClick={() => openDrawer('DRAWER_SEARCH', '')} fullWidth>
            Filters
          </Button>
        </div>
        */}
      </div>
    </>
  );
}
