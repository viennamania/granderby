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

export default function Feeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();

  const router = useRouter();

  const [filtersGrade] = useLocalStorage<string>('filters-grade');

  console.log('feeds-horse filters-grade', filtersGrade);

  const [selectedGradesStorage, setSelectedGradesStorage] =
    useLocalStorage('selected-grades');

  console.log('feeds-horse selectedGradesStorage', selectedGradesStorage);

  if (selectedGradesStorage === undefined) {
    setSelectedGradesStorage([]);
  }

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

  /*
      const res = await fetch('/api/games/horseRace/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'getGames',
      }),
    });
    const data = await res.json();
    */

  const { data, status, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery(
      'infiniteCharacters',

      async ({
        pageParam = 1,

        //pageParam = '',
      }) =>
        /*
        await fetcher(
          '/api/nft/getHorses?grade=' +
            filtersGrade +
            '&pageNumber=' +
            pageParam +
            '&pageSize=20'

          */

        await fetch(
          '/api/nft/getHorses?pageNumber=' + pageParam + '&pageSize=20',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              grades: selectedGradesStorage,
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
    ///console.log('userEfftct filtersGrade====', filtersGrade);

    refetch();
  }, [filtersGrade, refetch]);

  /*
  useEffect(() => {

    const main = async () => {

      await fetcher('/api/nft/getHorses').then((result) => {
        console.log("result======>", result);
      
      });

    };

    main();

  }, []);
  */

  /////console.log("status======>", status);

  /*
  useEffect(() => {
    const main = async () => {
      //Call the method to fetch metadata
      const response = await alchemy.nft.getNftsForContract(
        nftDropContractAddressHorse,
        {
          //pageKey: 'cursor',
          pageSize: 10,
        }
      );

      //console.log(response.pageKey);

      setCursor(response.pageKey);

      //Logging the response to the console

      ///setHorses(response.nfts)

      const NFTList = response.nfts.map((nft) => {
        const { contract, title, tokenType, tokenId, description, media } = nft;

        //console.log("mdia", media[0]);


        return {
          id: tokenId,
          author: contract.address,
          authorImage: AuthorImage,
          image: media[0]?.thumbnail
            ? media[0]?.thumbnail
            : 'https://via.placeholder.com/500',
          name: title,
          collection: contract.openSea?.collectionName
            ? contract.openSea?.collectionName
            : '',
          price: '0',


        };
      });

      setHorses(NFTList);

      ///setHorses([...horses, ...NFTList]);

      ///setHorses([...horses, ...response.nfts]);

      ///setHorses((horses) => [...horses, response.nfts]);

      ///setHorses((horses) => [...horses, NFTList]);

      //setHorses(horses.concat(response.nfts))

      ///console.log(NFTList);
    };

    main();
  }, [alchemy.nft]);

  */

  //const { data } = useSWR(`/api/getNftsForCollection`, fetcher);

  //console.log(data);

  /*
  const { openDrawer } = useDrawer();

  const [drawerHorseInfoTokenId, setDrawerHorseInfoTokenId] = useLocalStorage(
    'drawer-horse-info-tokenid'
  );

  const { openModal } = useModal();
  */

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
                  <Image
                    src={nft?.media ? nft?.media : '/default-nft.png'}
                    alt={nft?.title}
                    height={200}
                    width={200}
                    loading="lazy"
                  />
                  <div className="m-2 w-full items-center justify-center">
                    <p className="text-xs font-bold">{nft?.title}</p>
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
