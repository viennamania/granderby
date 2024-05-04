import cn from 'classnames';

import { NFTList } from '@/data/static/horse-list';

import NFTGrid from '@/components/ui/nft-card';

//import AuthorImage from '@/assets/images/profile.png';
import AuthorImage from '@/assets/images/profile.png';

import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';

import { Network, Alchemy } from 'alchemy-sdk';

import { use, useEffect, useState } from 'react';

import { nftDropContractAddressJockey } from '@/config/contractAddresses';

import useSWR from 'swr';
import { fetcher } from '../../lib/utils';

import { StaticImageData } from 'next/image';
import { OptionalPropertiesInput } from '@thirdweb-dev/sdk';
import { set } from 'date-fns';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';
import Image from 'next/image';

import { useRouter } from 'next/router';

import { useDrawer } from '@/components/drawer-views/context';

//import { useLocalStorage } from '@/lib/hooks/use-local-storage';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';

import { useModal } from '@/components/modal-views/context';

import Button from '@/components/ui/button';

import { useAddress } from '@thirdweb-dev/react';

/*
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faCircleStop,
} from '@fortawesome/free-solid-svg-icons';

import {
  motion,
  useAnimationControls,
  Variants,
  useScroll,
} from 'framer-motion';

const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const ScrollToTopContainerVariants: Variants = {
  hide: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};

function ScrollToTopButton() {
  const { scrollYProgress } = useScroll();
  const controls = useAnimationControls();

  useEffect(() => {
    return scrollYProgress.on('change', (latestValue) => {
      if (latestValue > 0.5) {
        controls.start('show');
      } else {
        controls.start('hide');
      }
    });
  });

  return (
    <motion.button
      className="fixed bottom-0 right-0 p-10"
      variants={ScrollToTopContainerVariants}
      initial="hide"
      animate={controls}
      onClick={scrollToTop}
    >
      <FontAwesomeIcon icon={faCircleStop} />
    </motion.button>
  );
}
*/

export default function Feeds(
  { holderAddress }: { holderAddress?: string },
  { className }: { className?: string }
) {
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
  type NFT = {
    id: string;
    author: string;
    authorImage: StaticImageData;
    image: string;
    name: string;
    collection: string;
    price: string;
  };
  */

  const {
    data: searchData,
    status,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    'infiniteCharacters',

    async ({
      pageParam = 1,

      //pageParam = '',
    }) =>
      await fetch(
        '/api/nft/getJockeys?pageNumber=' + pageParam + '&pageSize=20',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ///grades: selectedGradesStorage,
            grades: selectedGradesStorage ?? [],
            manes: selectedManesStorage ?? [],
            holder: holderAddress,
            //sort: selectedGSortStorage,
          }),
        }
      ).then((result) => {
        return result.json();
      }),
    {
      getNextPageParam: (lastPage, pages) => {
        ////console.log(" feeds-horse  lastPage======>", lastPage);

        ///console.log("pages======>", pages);

        if (lastPage.pageKey) {
          return lastPage.pageKey;
        } else {
          return undefined;
        }
      },
    }
  );

  console.log('feeds-horse-granderby searchData======>', searchData);

  useEffect(() => {
    /*
    console.log(
      'feeds-horse useEffect selectedGradesStorage=====',
      selectedGradesStorage
    );
    */
    refetch();
  }, [selectedGradesStorage, selectedManesStorage, refetch]);

  return (
    <>
      {/*
      <ScrollToTopButton />
      */}

      {status === 'loading' && (
        <>
          <div className="flex flex-col items-center justify-center ">
            <div className="text-xl">Loading...</div>

            <span className="items-top mt-10 flex h-screen w-full justify-center">
              <span className="relative flex h-10 w-10 animate-spin rounded-sm bg-purple-400 opacity-75"></span>
            </span>
          </div>
        </>
      )}

      {status === 'success' && (
        <InfiniteScroll
          dataLength={searchData?.pages?.length * 20}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={
            <div className="mt-10 flex flex-col items-center justify-center ">
              <div className="text-xl">Loading...</div>

              <span className="items-top mt-10 flex h-screen w-full justify-center">
                <span className="relative flex h-10 w-10 animate-spin rounded-sm bg-purple-400 opacity-75"></span>
              </span>
            </div>
          }
        >
          {/*
            switch (view) {
    case 'SEARCH_VIEW':
      return <SearchView />;
    case 'SHARE_VIEW':
      return <ShareView />;
    case 'WALLET_CONNECT_VIEW':
      return <SelectWallet />;
    case 'PROFILE_INFO_VIEW':
      return <ProfileInfo />;
    case 'FOLLOWING_VIEW':
      return <Followers />;
    case 'FOLLOWERS_VIEW':
      return <Followers />;
    case 'NFT_PREVIEW':
      return <PreviewContent />;
    default:
      return null;
  }
        */}

          {/*
        <Button
          onClick={() => openModal('NFT_PREVIEW')}
          className={cn('shadow-main hover:shadow-large', className)}
        >
          CONNECT
        </Button>
        */}

          {searchData?.pages.map((page) => (
            <div
              key={page.pageKey}
              className={cn(
                'mb-5 grid grid-cols-2 gap-5 sm:grid-cols-4 md:grid-cols-4  xl:grid-cols-5',
                isGridCompact
                  ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
                  : '3xl:!grid-cols-5 4xl:!grid-cols-8',
                className
              )}
            >
              {page.nfts?.map((nft: any) => (
                <div
                  className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow-lg"
                  key={nft?.tokenId}
                >
                  <button
                    className="flex h-full w-full flex-col"
                    /*
                    onClick={() =>
                      //setTokenid(nft.metadata.id.toString()),
                      //setIsOpen(true)

                      router.push('/jockey-details/' + nft?.tokenId)
                    }
                    */
                    onMouseOver={() => {
                      //alert("onMouseOver");
                      //setDrawerHorseInfoTokenId(nft?.tokenId);
                      //openDrawer('DRAWER_HORSE_INFO', nft?.tokenId);
                    }}
                  >
                    <Image
                      src={nft?.media ? nft?.media : '/default-horse.png'}
                      alt={nft?.title}
                      height={300}
                      width={300}
                      loading="lazy"
                      className="cursor-pointer object-cover transition duration-500 hover:scale-110"
                    />
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
                            (nft?.totalPricePaid / 1000000000000000000).toFixed(
                              2
                            )}
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
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}
