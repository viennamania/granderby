import cn from 'classnames';

import { NFTList } from '@/data/static/horse-list';

import NFTGrid from '@/components/ui/nft-card';

//import AuthorImage from '@/assets/images/profile.png';
import AuthorImage from '@/assets/images/profile.png';

import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';

import { Network, Alchemy } from 'alchemy-sdk';

import { use, useEffect, useState } from 'react';

import {
  nftDropContractAddressHorse,
  nftDropContractAddressNpc,
} from '@/config/contractAddresses';

import useSWR from 'swr';
import { fetcher } from '../../lib/utils';

import { StaticImageData } from 'next/image';
import { OptionalPropertiesInput } from '@thirdweb-dev/sdk';
import { set } from 'date-fns';

import InfiniteScroll from 'react-infinite-scroll-component';

import { useInfiniteQuery } from 'react-query';

import Image from 'next/image';

import { useRouter } from 'next/router';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';

export default function Feeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();

  const router = useRouter();

  const [selectedGradesStorage, setSelectedGradesStorage] =
    useLocalStorage('selected-grades');
  if (selectedGradesStorage === undefined) {
    setSelectedGradesStorage([]);
  }

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
          '/api/nft/getNpcs?pageNumber=' + pageParam + '&pageSize=20',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ///grades: selectedGradesStorage,
              grades: selectedGradesStorage ?? [],
            }),
          }
        ).then((result) => {
          return result.json();
        }),

      {
        getNextPageParam: (lastPage, pages) => {
          //console.log("lastPage======>", lastPage);
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
    refetch();
  }, [selectedGradesStorage, refetch]);

  return (
    <>
      {status === 'loading' && (
        <>
          <div className="flex flex-col items-center justify-center ">
            <div className="text-xl">Loading horses...</div>

            <span className="items-top mt-10 flex h-screen w-full justify-center">
              <span className="relative flex h-10 w-10 animate-spin rounded-sm bg-purple-400 opacity-75"></span>
            </span>
          </div>
        </>
      )}

      {status === 'success' && (
        <InfiniteScroll
          dataLength={data?.pages.length * 20}
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
                <div
                  key={nft?.tokenId}
                  className="relative overflow-hidden rounded-lg bg-white shadow-lg"
                  onClick={() =>
                    //setTokenid(nft.metadata.id.toString()),
                    //setIsOpen(true)
                    router.push('/horse-details/' + nft?.tokenId)
                  }
                >
                  <Image
                    src={nft?.media ? nft?.media : '/default-horse.png'}
                    alt={nft?.title}
                    height={500}
                    width={500}
                    loading="lazy"
                  />
                  <div className="m-2 w-full">
                    <p className="text-md font-bold">{nft?.title}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}
