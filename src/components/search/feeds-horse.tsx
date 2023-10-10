import cn from 'classnames';

import { NFTList } from '@/data/static/horse-list';

import NFTGrid from '@/components/ui/nft-card';

//import AuthorImage from '@/assets/images/author.jpg';
import AuthorImage from '@/assets/images/author.jpg';

import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';

import { Network, Alchemy } from 'alchemy-sdk';

import { use, useEffect, useState } from 'react';

import { nftDropContractAddressHorse } from '@/config/contractAddresses';

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

export default function Feeds({ className }: { className?: string }) {
  const address = useAddress();

  const { isGridCompact } = useGridSwitcher();

  const router = useRouter();

  const [selectedGradesStorage, setSelectedGradesStorage] =
    useLocalStorage('selected-grades');

  ///console.log('feeds-horse selectedGradesStorage=====', selectedGradesStorage);

  if (selectedGradesStorage === undefined) {
    setSelectedGradesStorage([]);
  }

  ///const [selectedGSortStorage, setSelectedSortStorage] = useLocalStorage('selected-sort');

  // useLocalStrage change event

  type NFT = {
    id: string;
    author: string;
    authorImage: StaticImageData;
    image: string;
    name: string;
    collection: string;
    price: string;
  };

  const { data, status, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery(
      'infiniteCharacters',

      async ({
        pageParam = 1,

        //pageParam = '',
      }) =>
        await fetch(
          '/api/nft/getHorses?pageNumber=' + pageParam + '&pageSize=20',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ///grades: selectedGradesStorage,
              grades: selectedGradesStorage ?? [],
              //sort: selectedGSortStorage,
            }),
          }
        ).then((result) => {
          return result.json();
        }),
      {
        getNextPageParam: (lastPage, pages) => {
          ////console.log(" feeds-horse  lastPage======>", lastPage);

          //console.log("pages======>", pages);

          if (lastPage.pageKey) {
            return lastPage.pageKey;
          } else {
            return undefined;
          }
        },
      }
    );

  useEffect(() => {
    console.log(
      'feeds-horse useEffect selectedGradesStorage=====',
      selectedGradesStorage
    );
    refetch();
  }, [selectedGradesStorage, refetch]);

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
          dataLength={data?.pages?.length * 20}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={
            <div className="mt-10 flex flex-col items-center justify-center ">
              <div className="text-xl">Loading horses...</div>

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

          {data?.pages.map((page) => (
            <div
              key={page.pageKey}
              className={cn(
                'mt-5 grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-4',
                isGridCompact
                  ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
                  : '3xl:!grid-cols-3 4xl:!grid-cols-4',
                className
              )}
            >
              {page.nfts?.map((nft: any) => (
                <button
                  key={nft?.tokenId}
                  className="relative overflow-hidden rounded-lg bg-white shadow-lg"
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
                  <div className="flex w-full items-center justify-start bg-gray-800">
                    <p className="m-2 text-sm font-bold text-white">
                      #{nft?.tokenId}
                    </p>
                  </div>

                  <Image
                    src={nft?.media ? nft?.media : '/default-nft.png'}
                    alt={nft?.title}
                    height={300}
                    width={300}
                    loading="lazy"
                  />
                  <div className="m-2 flex w-full flex-col items-center justify-center ">
                    <div className="text-sm font-bold capitalize ">
                      {nft?.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}
