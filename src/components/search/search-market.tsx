import Button from '@/components/ui/button';

import Feeds from './feeds-horse';
import SaleFeeds from './feeds-horse-sale';

import SaleFeedsOpensea from './feeds-horse-sale-opensea';

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

import { useLocalStorage } from '@/lib/hooks/use-local-storage';

import { useEffect } from 'react';
import { set } from 'lodash';

export default function Search() {
  const { openDrawer } = useDrawer();

  ///const [livePricingIsOpen] = useLocalStorage('live-pricing-isopen', true);

  /*
  const [livePricingIsOpen, setLivePricingOpen] = useLocalStorage(
    'live-pricing-isopen'
  );
  setLivePricingOpen(true);
  */

  const [selectedGradesStorage, setSelectedGradesStorage] =
    useLocalStorage('selected-grades');

  if (!selectedGradesStorage) {
    setSelectedGradesStorage([]);
  }

  const tabMenu = [
    /*
    {
      title: 'Items',
      path: 'items',
    },
    */
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

    {
      title: 'Granderby Market',
      path: 'GranderbyMarket',
    },

    {
      title: 'Opensea Market',
      path: 'OpenseaMarket',
    },

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

  return (
    <>
      <div className=" flex flex-col text-2xl font-bold text-gray-900 dark:text-white sm:text-2xl">
        <div className="justify-left flex flex-row items-center">
          <Image
            src="/horseRace/logo.png"
            alt="nft"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="ml-3">Granderby Horses</span>
        </div>
      </div>

      <div className="mb-5 mt-5 flex">
        <CollapseLivePricing label="Live Pricing">
          <div className="m-5 p-5">
            <LiveNftPricingSlider limits={3} />
          </div>
        </CollapseLivePricing>
      </div>

      <div className="grid 2xl:grid-cols-[280px_minmax(auto,_1fr)] 4xl:grid-cols-[320px_minmax(auto,_1fr)]">
        <div className="mt-10 hidden border-dashed border-gray-200 ltr:border-r ltr:pr-8 rtl:border-l rtl:pl-8 dark:border-gray-700 2xl:block">
          <Filters />
        </div>

        <div className="m-3 block">
          <ParamTab tabMenu={tabMenu}>
            <TabPanel className="focus:outline-none  ">
              <div className="2xl:ltr:pl-8 2xl:rtl:pr-8 4xl:ltr:pl-10 4xl:rtl:pr-10">
                <div className="relative z-10 mb-6 flex items-center justify-between ">
                  <div className="items-right flex w-full justify-end">
                    <div className="flex gap-6 3xl:gap-8 ">
                      <SortList />

                      <div className="hidden sm:block 2xl:hidden">
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
                </div>

                <SaleFeeds />
              </div>
            </TabPanel>

            <TabPanel className="focus:outline-none  ">
              <div className="2xl:ltr:pl-8 2xl:rtl:pr-8 4xl:ltr:pl-10 4xl:rtl:pr-10">
                <div className="relative z-10 mb-6 flex items-center justify-between ">
                  <div className="items-right flex w-full justify-end">
                    <div className="flex gap-6 3xl:gap-8 ">
                      <SortList />

                      <div className="hidden sm:block 2xl:hidden">
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
                </div>

                <SaleFeedsOpensea />
              </div>
            </TabPanel>

            {/* Owned items */}
            {/*
            <TabPanel className="focus:outline-none  ">
              <div className="2xl:ltr:pl-8 2xl:rtl:pr-8 4xl:ltr:pl-10 4xl:rtl:pr-10">
                <div className="relative z-10 mb-6 flex items-center justify-between ">
                  <div className="items-right flex w-full justify-end">
                    <div className="flex gap-6 3xl:gap-8 ">
                      <SortList />

                      <div className="hidden 3xl:block">
                        <GridSwitcher />
                      </div>

                      <div className="hidden sm:block 2xl:hidden">
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
                </div>

                <OwnedFeeds />
              </div>
            </TabPanel>
            */}

            {/* Registered items */}
            {/*
            <TabPanel className="focus:outline-none  ">
              <div className="2xl:ltr:pl-8 2xl:rtl:pr-8 4xl:ltr:pl-10 4xl:rtl:pr-10">
                <div className="relative z-10 mb-6 flex items-center justify-between ">
                  <div className="items-right flex w-full justify-end">
                    <div className="flex gap-6 3xl:gap-8 ">
                      <SortList />

                      <div className="hidden sm:block 2xl:hidden">
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
                </div>

                <RegisteredFeeds />
              </div>
            </TabPanel>
            */}
          </ParamTab>
        </div>

        <div className="fixed bottom-6 left-1/2 z-10 w-full -translate-x-1/2 px-9 sm:hidden">
          <Button onClick={() => openDrawer('DRAWER_SEARCH', '')} fullWidth>
            Filters
          </Button>
        </div>
      </div>
    </>
  );
}
