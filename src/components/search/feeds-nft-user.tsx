import cn from 'classnames';

//import AuthorImage from '@/assets/images/profile.png';
import AuthorImage from '@/assets/images/profile.png';

import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';

import { Network, Alchemy } from 'alchemy-sdk';

import { use, useEffect, useState } from 'react';

import useSWR from 'swr';
import { fetcher } from '../../lib/utils';

import { StaticImageData } from 'next/image';
import { OptionalPropertiesInput } from '@thirdweb-dev/sdk';
import { set } from 'date-fns';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';

//import Image from 'next/image';
import Image from '@/components/ui/image';

import { useRouter } from 'next/router';

import { useDrawer } from '@/components/drawer-views/context';

//import { useLocalStorage } from '@/lib/hooks/use-local-storage';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';

import { useModal } from '@/components/modal-views/context';

import Button from '@/components/ui/button';

import { useAddress } from '@thirdweb-dev/react';

import { ChevronForward } from '@/components/icons/chevron-forward';

import {
  nftDropContractAddressHorse,
  nftDropContractAddressJockey,
  nftDropContractAddressHorseDerbyStars,
  nftDropContractAddressHorseZedRun,
  stakingContractAddressHorseAAA,
} from '@/config/contractAddresses';

export default function UserFeedsNft(
  //{ contractAddress }: { contractAddress?: string },

  { searchData }: { searchData?: any }
) {
  ///////{ className }: { className?: string },

  console.log('UserFeedsNft searchData', searchData);

  const address = useAddress();

  const { isGridCompact } = useGridSwitcher();

  const router = useRouter();

  const [selectedGradesStorage, setSelectedGradesStorage] =
    useLocalStorage('selected-grades');

  if (selectedGradesStorage === undefined) {
    setSelectedGradesStorage([]);
  }

  const [selectedManesStorage, setSelectedManesStorage] =
    useLocalStorage('selected-manes');

  if (selectedManesStorage === undefined) {
    setSelectedManesStorage([]);
  }

  ///console.log('feeds-horse selectedGradesStorage=====', selectedGradesStorage);

  ///const [selectedGSortStorage, setSelectedSortStorage] = useLocalStorage('selected-sort');

  // useLocalStrage change event

  /*
  const [searchData, setSearchData] = useState<any>();

  useEffect(() => {
    async function getHorses() {
      const data = await fetch(`/api/nft/getHorses?pageNumber=1&pageSize=100`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ///grades: selectedGradesStorage,
          grades: selectedGradesStorage ?? [],
          manes: selectedManesStorage ?? [],
          holder: userAddress,
          //sort: selectedGSortStorage,
        }),
      }).then((result) => {
        return result.json();
      });

      ///console.log('feeds-owned horses data', data);

      setSearchData(data);
    }

    async function getJockeys() {
      const data = await fetch(
        `/api/nft/getJockeys?pageNumber=1&pageSize=100`,
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

      console.log('feeds-owned jockeys data', data);

      setSearchData(data);
    }

    if (userAddress !== undefined) {
      if (contractAddress === nftDropContractAddressHorse) {
        getHorses();
      } else if (contractAddress === nftDropContractAddressJockey) {
        getJockeys();
      } else {
        getHorses();
      }
    }
  }, [userAddress, selectedGradesStorage, selectedManesStorage, contractAddress]);
  */

  const limit = 1000;

  return (
    <>
      {searchData?.nfts.length === 0 ? (
        <>
          <div className="m-10 flex flex-col items-center justify-center ">
            <div className=" text-xl">No assets found</div>
          </div>
        </>
      ) : (
        <div
          className={cn(
            ' m-5 grid grid-cols-2 gap-5 sm:grid-cols-5 md:grid-cols-5  xl:grid-cols-5  ',
            isGridCompact
              ? '3xl:!grid-cols-5 4xl:!grid-cols-5'
              : '3xl:!grid-cols-5 4xl:!grid-cols-10'
            ////className
          )}
        >
          {searchData?.nfts?.map((nft: any) => (
            <div
              className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow-lg"
              key={nft?.tokenId}
            >
              <button
                className=""
                onClick={() =>
                  //setTokenid(nft.metadata.id.toString()),
                  //setIsOpen(true)

                  router.push('/horse-details/' + nft?.tokenId)
                }
                onMouseOver={() => {
                  //alert("onMouseOver");
                  //setDrawerHorseInfoTokenId(nft?.tokenId);
                  //openDrawer('DRAWER_HORSE_INFO', nft?.tokenId);
                }}
              >
                <div className="relative">
                  <Image
                    src={nft?.media ? nft?.media : '/default-horse.png'}
                    alt={nft?.title}
                    height={300}
                    width={300}
                    loading="lazy"
                    className="cursor-pointer object-cover transition duration-500 hover:scale-110 "
                  />
                  {nft?.register && (
                    <Image
                      src="/images/horse-auto.png"
                      alt="nft"
                      width={50}
                      height={50}
                      className="absolute left-0 top-0"
                    />
                  )}
                </div>

                {/*
                  <div className="ml-2 mt-2 flex w-full flex-row items-center justify-start gap-2">
                    
                    <Image
                      src="/horseRace/logo-granderby.png"
                      alt="horse"
                      width={18}
                      height={18}
                    />
                    
                    <p className=" text-sm font-bold text-black">
                      #{nft?.tokenId}
                    </p>
                  </div>
                */}

                <div className=" h-18 mb-2  mt-4 flex w-full  flex-col items-center  justify-center  gap-1 xl:h-24   ">
                  <div className="text-sm font-bold ">{nft?.title}</div>

                  <div className="ml-5 flex w-full flex-row items-center justify-start gap-1">
                    <Image
                      src="/images/logo-polygon.png"
                      alt="logo"
                      width={12}
                      height={12}
                    />
                    <div className="text-left text-sm">#{nft?.tokenId}</div>
                  </div>

                  <div className="ml-5 flex w-full flex-row items-center justify-start gap-1 text-xs  xl:text-sm">
                    <span>Last Price:</span>
                    <span>
                      {nft?.paidToken ===
                        '0x0000000000000000000000000000000000001010' &&
                        //(nft?.totalPricePaid / 1000000000000000000).toFixed(2)
                        (
                          (nft?.totalPricePaid / 1000000000000000000) *
                          0.66
                        ).toFixed(2)}

                      {nft?.paidToken ===
                        '0xe426D2410f20B0434FE2ce56299a1543d3fDe450' &&
                        (nft?.totalPricePaid / 1000000000000000000).toFixed(2)}
                      {nft?.paidToken ===
                        '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' &&
                        (nft?.totalPricePaid / 1000000).toFixed(2)}
                    </span>

                    <span>USD</span>

                    {/*
                        <span>
                          
                          {nft?.paidToken ===
                            '0x0000000000000000000000000000000000001010' && (
                            <span>MATIC</span>
                          )}
                          {nft?.paidToken ===
                            '0xe426D2410f20B0434FE2ce56299a1543d3fDe450' && (
                            <span>GRD</span>
                          )}

                          {nft?.paidToken ===
                            '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' && (
                            <span>USDC</span>
                          )}
                        </span>
                            */}
                  </div>

                  {nft?.register ? (
                    <div className="ml-5 flex w-full flex-row items-center justify-start gap-1 text-xs  xl:text-sm">
                      Registered
                    </div>
                  ) : (
                    <div className="ml-5 flex w-full flex-row items-center justify-start gap-1 text-xs  xl:text-sm">
                      Not Registered
                    </div>
                  )}
                </div>

                {/*
              <div className="m-2 flex items-center justify-center ">
                Owner:{' '}
                <div className="text-sm  ">
                  {nft?.holder?.substring(0, 10)}...
                </div>
              </div>
              */}
              </button>
              {/*
            <button
              className="text-white text-md font-bold bg-sky-500  p-3
                opacity-0 hover:opacity-100"
            >
            */}
              {/*
              <button
                className="bg-sky-600 p-2 text-sm font-bold  text-white
                "
              >
                Buy now
              </button>

               */}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
