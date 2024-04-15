import Button from '@/components/ui/button';

////import Feeds from '@/components/search/feeds-horse';

import Feeds from '@/components/search/feeds-horse-inventory';

import OwnedFeedsNft from './feeds-nft-owned';

import { getColumns, getWidgetColumns } from '@/shared/feed/columns';

import FeedsNftOwnedTable from './feeds-nft-owned-table';

import OwnedFeedsFt from './feeds-ft-owned';

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
  tokenContractAddressHV,
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

import Collapse from '@/components/ui/collapse-asset';

import { use, useEffect, useState } from 'react';

import {
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  useNFTBalance,
  Web3Button,
} from '@thirdweb-dev/react';
import { sub } from 'date-fns';
import { set } from 'lodash';

import { InfoIcon } from '@/components/icons/info-icon';

// react toast
///import { Toast } from '@/components/ui/toast';

import toast from 'react-hot-toast';

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

  const address = useAddress();

  /*
  const [searchDataHorse, setSearchDataHorse] = useState<any>();

  useEffect(() => {
    async function getHorses() {
      //setSearchDataHorse(undefined);

      ///const data = await fetch('/api/nft/getHorses?pageNumber=1&pageSize=100', {
      const data = await fetch('/api/nft/getHorses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: '',
          pageNumber: 1,
          pageSize: 100,
          ///grades: selectedGradesStorage,
          grades: [],
          manes: [],
          holder: address,
          //sort: selectedGSortStorage,
        }),
      }).then((result) => {
        return result.json();
      });

      console.log('search-asset data', data);

      ///console.log('search-asset data', data);

      //searchDataHorse?.nfts.length !== data?.nfts.length &&

      setSearchDataHorse(data);
    }

    if (address !== undefined) {
      getHorses();
    }


  }, [address]);
  */

  /*
  useEffect(() => {

    const getBalanceByHolder = async () => {
      const data = await fetch('/api/nft/getBalanceByHolder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          holder: address,
        }),
      }).then((result) => {
        return result.json();
      });

      ///console.log('getBalanceByHolder data', data);

      setBalanceCollection(data?.recordset);

        // 1. get all nfts
        // 2. for each nft, get the texture key
        // 3. get the balance by texture key
        // 4. display the balance

        // TEXTURE_KEY: "Hrs_99990001"

     
        
        let updatedNft = [] as any;

        searchDataHorse?.nfts.map((nft: any) => {
          const gameHorseName = nft?.gameHorseName;

          //let balance = 0;

          data?.recordset.map((record: any) => {
            const TEXTURE_KEY = record?.TEXTURE_KEY;
            const Horse_balance = record?.Horse_balance;

          

            // TEXTURE_KEY: "Hrs_99990001"
            // gameHorseName: "99990001"
            // substring(4) to remove "Hrs_"

            if (gameHorseName === TEXTURE_KEY?.substring(4)) {

              updatedNft.push({
                ...nft,
                balance: Horse_balance,
              });

              return;

            }

          } );

        } );

 

             

    }

    if (address !== undefined) {
      getBalanceByHolder();
    }

  } , [address , searchDataHorse]);
  
  */

  //////console.log('searchDataHorse', searchDataHorse);

  const [searchDataJockey, setSearchDataJockey] = useState<any>();

  /*
  useEffect(() => {
    async function getJockeys() {
      setSearchDataJockey(undefined);

      const data = await fetch(
        '/api/nft/getJockeys?pageNumber=1&pageSize=100',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ///grades: selectedGradesStorage,
            grades: ['Jockey'],
            manes: [],
            holder: address,
            //sort: selectedGSortStorage,
          }),
        }
      ).then((result) => {
        return result.json();
      });

      ///console.log('feeds-owned jockeys data', data);

      setSearchDataJockey(data);
    }

    if (address !== undefined) {
      getJockeys();
    }
  }, [address]);
  */

  const { contract: tokenContractHV } = useContract(
    tokenContractAddressHV,
    'token'
  );
  const { data: tokenBalanceHV, isLoading: isLoadingBalanceHV } =
    useTokenBalance(tokenContractHV, address);

  const [totalBalanceHorse, setTotalBalanceHorse] = useState(0);

  useEffect(() => {
    const main = async () => {
      // Call api for get balance by many horse uid
      // getBalanceByHolder

      const response = await fetch('/api/nft/getHorsesBalanceByHolder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          holder: address,
        }),
      });

      const data = await response.json();

      console.log('data======>', data);

      setTotalBalanceHorse(data?.accumulatedBalance);
    };

    if (address) {
      main();
    }
  }, [address]);

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
        <span className="mt-3 text-sm">Items 7,079 · Created Jun 2023</span>
      </div>
      */}

      <div className="flex w-full flex-col items-center justify-center   ">
        <div className="mt-5 flex  w-full flex-col rounded-lg border ">
          <Collapse
            label="Horse"
            /*
            description={`${
              !address
                ? ''
                : !searchDataHorse
                ? 'Loading...'
                : searchDataHorse?.nfts.length
            } `}
            */
            description=""
            initialOpen={true}
          >
            <div className=" itmes-start  flex flex-col justify-center p-3 pb-10">
              {/*
              <OwnedFeedsNft contractAddress={nftDropContractAddressHorse} />
              */}
              {/*
              <OwnedFeedsNft searchData={searchDataHorse} />
              */}

              <div className="flex flex-row items-center justify-start gap-5">
                <div className="flex  text-xl font-bold  ">
                  Total Allowance: {totalBalanceHorse.toLocaleString()}
                </div>

                {/* claim button */}
                <div className="flex flex-row items-center justify-start">
                  <Button
                    className="h-8 bg-green-500 font-normal text-gray-600 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white md:h-9 md:px-4 lg:mt-6"
                    onClick={() => {
                      /*
                    openModal('SALE_VIEW', {
                      title: 'Followers',
                      count: '1,845',
                      users: data,
                    })
                    */

                      /*
                      alert('Collection has been completed.
                      Total : 1,234
                      9,999,999 GDP
                      ※ Withdrawals are restricted for 5 minutes
                      after full collection.');
                      */

                      /* toast duration  is 10000 ms */

                      toast.success(
                        <div className=" flex flex-col items-center justify-center gap-5 p-5">
                          <div className="flex flex-row items-center justify-center gap-2">
                            <InfoIcon className="h-5 w-5" />
                            <span className="font-extrabold text-gray-900 dark:text-white">
                              Collection has been completed.
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-center gap-2">
                            <InfoIcon className="h-5 w-5" />
                            <span className="font-extrabold text-gray-900 dark:text-white">
                              Total : 1,234
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-center gap-2">
                            <InfoIcon className="h-5 w-5" />
                            <span className="font-extrabold text-gray-900 dark:text-white">
                              {totalBalanceHorse.toLocaleString()} GDP
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-center gap-2">
                            <InfoIcon className="h-5 w-5" />
                            <span className="font-extrabold text-gray-900 dark:text-white">
                              ※ Withdrawals are restricted for 5 minutes after
                              full collection.
                            </span>
                          </div>
                        </div>,

                        {
                          duration: 5000,
                        }
                      );
                    }}
                  >
                    <span className="flex items-center gap-2 font-extrabold ">
                      Collect All
                    </span>
                  </Button>
                </div>
              </div>

              <FeedsNftOwnedTable
                title=""
                variant="minimal"
                //data={data}
                //data={searchDataHorse?.nfts}

                sticky
                ///scroll={{ x: 1300, y: 760 }}
                scroll={{ x: 600 }}
                // @ts-ignore
                getColumns={getColumns}
                enablePagination={true}
                searchPlaceholder="name"

                ////setPageSize={setPageSize}

                //className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
              />
            </div>
          </Collapse>
        </div>

        {/*
        <div className="mt-5 flex w-full flex-col rounded-lg border ">
          <Collapse
            label="Jockey"
            description={`${
              !address
                ? ''
                : !searchDataJockey
                ? 'Loading...'
                : searchDataJockey?.nfts.length
            } `}
            initialOpen={true}
          >
            <div className="itmes-start flex flex-col justify-center p-3 pb-10">
            
              <OwnedFeedsNft searchData={searchDataJockey} />
            </div>
          </Collapse>
        </div>
        */}

        <div className="mt-5 flex w-full flex-col rounded-lg border ">
          <Collapse
            label="Track"
            description={`${Number(tokenBalanceHV?.displayValue).toFixed(
              0
            )} / 10000 `}
            initialOpen={true}
          >
            <div className="itmes-start flex flex-col justify-center p-3 pb-10">
              <OwnedFeedsFt
              //contractAddress={tokenContractAddressHV}
              />
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
}
