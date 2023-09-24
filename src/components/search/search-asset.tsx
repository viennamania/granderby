import Button from '@/components/ui/button';

////import Feeds from '@/components/search/feeds-horse';

import Feeds from '@/components/search/feeds-horse-inventory';

import OwnedFeeds from './feeds-horse-owned-asset';

import OwnedFeedsDerbystars from './feeds-horse-owned-asset-derbystars';

///import ListedFeeds from '@/components/search/feeds-horse-listed';

import RegisteredFeeds from './feeds-horse-registered-inventory';

//import RegisteredFeedsDS from './feeds-horse-registered-ds';

import {
  stakingContractAddressHorseAAA,
  stakingContractAddressHorseDerbyStars,
  nftDropContractAddressHorse,
  nftDropContractAddressJockey,
  nftDropContractAddressHorseDerbyStars,
  nftDropContractAddressHorseZedRun,
} from '@/config/contractAddresses';

//////import { Filters, GridSwitcher, SortList } from '@/components/search/filters';

import Image from '@/components/ui/image';

import {
  //Filters,
  //GridSwitcher,
  SortList,
} from './filters-horse-inventory';

import { OptionIcon } from '@/components/icons/option';

import ParamTab, { TabPanel } from '@/components/ui/param-tab';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';

import Collapse from '@/components/ui/collapse';

export default function Search() {
  const tabMenu = [
    /*
    {
      title: 'Items',
      path: 'items',
    },
    */
    {
      title: 'Owned',
      path: 'owned-inventory',
    },
    {
      title: 'Registered',
      path: 'registered-inventory',
    },
    /*
    {
      title: 'DS',
      path: 'stable-b',
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

  return (
    <>
      {/*
      <div className="m-3 flex flex-col text-xl font-bold text-gray-900 dark:text-white ">
        <div className="justify-left flex flex-row items-center">
          <Image
            src="/horseRace/Hrs_00006009.png"
            alt="Granderby Horse NFT"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="ml-3">Granderby Horse NFT</span>
        </div>
        <span className="mt-3 text-sm">Items 3,645 · Created Jun 2023</span>
      </div>
      */}

      <div className="grid ">
        <div className=" block">
          <div className="relative z-10 mb-6 flex items-center justify-between ">
            <div className="items-right flex w-full justify-end">
              <div className="flex gap-6  ">
                {/*
                  <SortList />
                  */}

                {/*
                    <div className="hidden ">
                      <GridSwitcher />
                    </div>

                    
                    <div className="hidden ">
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
                    */}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col rounded-lg border ">
            <Collapse label="Horse" initialOpen={true}>
              <div className="itmes-start  flex flex-col justify-center p-3">
                <OwnedFeeds contractAddress={nftDropContractAddressHorse} />
              </div>
            </Collapse>
          </div>

          <div className=" flex flex-col rounded-lg border ">
            <Collapse label="Jockey" initialOpen={true}>
              <div className="itmes-start mt-5 flex flex-col justify-center p-3">
                <OwnedFeeds contractAddress={nftDropContractAddressJockey} />
              </div>
            </Collapse>
          </div>

          {/*
            <div className="mt-5 flex flex-col rounded-lg border ">
              <Collapse label="Derbystars Horse" initialOpen={true}>
                <div className="itmes-start mt-5 flex flex-col justify-center p-3">
                  <span className="text-lg font-bold">Asset</span>
                  <OwnedFeeds contractAddress={nftDropContractAddressHorseDerbyStars} />
                </div>
              </Collapse>
            </div>
            */}
        </div>

        {/*
        <div className="fixed bottom-6 left-1/2 z-10 w-full -translate-x-1/2 px-9 ">
          <Button onClick={() => openDrawer('DRAWER_SEARCH')} fullWidth>
            Filters
          </Button>
        </div>
        */}
      </div>
    </>
  );
}
