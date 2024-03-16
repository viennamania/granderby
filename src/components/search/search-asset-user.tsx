import Button from '@/components/ui/button';

////import Feeds from '@/components/search/feeds-horse';

import Feeds from '@/components/search/feeds-horse-inventory';

import UserFeedsNft from './feeds-nft-user';

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

import { useEffect, useState } from 'react';

import {
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  useNFTBalance,
  Web3Button,
} from '@thirdweb-dev/react';

export default function Search({ userAddress }: { userAddress?: string }) {
  ///console.log('userAddress', userAddress);

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

  const [searchDataHorse, setSearchDataHorse] = useState<any>();

  useEffect(() => {
    async function getHorses() {
      //setSearchDataHorse(undefined);

      const data = await fetch('/api/nft/getHorses?pageNumber=1&pageSize=100', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ///grades: selectedGradesStorage,
          grades: [],
          manes: [],
          holder: userAddress,
          //sort: selectedGSortStorage,
        }),
      }).then((result) => {
        return result.json();
      });

      ///console.log('getHorses data', data);

      //searchDataHorse?.nfts.length !== data?.nfts.length &&

      setSearchDataHorse(data);
    }

    ///console.log('userAddress====', userAddress)

    if (userAddress) {
      getHorses();
    }

    /*
    setInterval(() => {
      getHorses();
    } , 10000);
    */
  }, [userAddress]);

  const [searchDataJockey, setSearchDataJockey] = useState<any>();

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
            holder: userAddress,
            //sort: selectedGSortStorage,
          }),
        }
      ).then((result) => {
        return result.json();
      });

      ///console.log('feeds-owned jockeys data', data);

      setSearchDataJockey(data);
    }

    if (userAddress) {
      getJockeys();
    }
  }, [userAddress]);

  const { contract: tokenContractHV } = useContract(
    tokenContractAddressHV,
    'token'
  );
  const { data: tokenBalanceHV, isLoading: isLoadingBalanceHV } =
    useTokenBalance(tokenContractHV, userAddress);

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
            description={`${
              !userAddress
                ? ''
                : !searchDataHorse
                ? 'Loading...'
                : searchDataHorse?.nfts.length
            } / 3645 `}
            initialOpen={true}
          >
            <div className=" itmes-start  flex flex-col justify-center p-0 pb-10">
              {/*
              <OwnedFeedsNft contractAddress={nftDropContractAddressHorse} />
              */}

              <UserFeedsNft searchData={searchDataHorse} />
            </div>
          </Collapse>
        </div>

        <div className="mt-5 flex w-full flex-col rounded-lg border ">
          <Collapse
            label="Jockey"
            description={`${
              !userAddress
                ? ''
                : !searchDataJockey
                ? 'Loading...'
                : searchDataJockey?.nfts.length
            } / 0 `}
            initialOpen={true}
          >
            <div className="itmes-start flex flex-col justify-center p-3 pb-10">
              {/*
              <OwnedFeedsNft contractAddress={nftDropContractAddressJockey} />
              */}
              <UserFeedsNft searchData={searchDataJockey} />
            </div>
          </Collapse>
        </div>

        <div className="mt-5 flex w-full flex-col rounded-lg border ">
          <Collapse
            label="Track"
            description={`${Number(tokenBalanceHV?.displayValue).toFixed(
              0
            )} / 1000 `}
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
