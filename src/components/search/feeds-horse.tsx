import cn from 'classnames';

import { NFTList } from '@/data/static/horse-list';

import NFTGrid from '@/components/ui/nft-card';

//import AuthorImage from '@/assets/images/author.jpg';
import AuthorImage from '@/assets/images/author.jpg';

import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';

import { Network, Alchemy } from 'alchemy-sdk';

import { useEffect, useState } from 'react';

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

export default function Feeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();

  const router = useRouter();

  const { openDrawer } = useDrawer();

  type NFT = {
    id: string;
    author: string;
    authorImage: StaticImageData;
    image: string;
    name: string;
    collection: string;
    price: string;
  };

  //const [employees, setEmployees] = useState<Employee[]>([]);

  const [horses, setHorses] = useState<NFT[]>([]);

  //const [cursor, setCursor] = useState<string | undefined>(undefined);

  const settings = {
    ///apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key. creath.park@gmail.com

    apiKey: '8YyZWFtcbLkYveYaB9sjOC3KPWInNu07', // Replace with your Alchemy API Key. songpalabs@gmail.com
    network: Network.MATIC_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);

  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'infiniteCharacters',
    async ({
      ///pageParam = 1,

      pageParam = '',
    }) =>
      /*
      await fetch(
        `https://rickandmortyapi.com/api/character/?page=${pageParam}`
      ).then((result) => result.json()),
      */

      await alchemy.nft
        .getNftsForContract(nftDropContractAddressHorse, {
          pageKey: pageParam,
          pageSize: 40,
        })
        .then((result) => {
          //result
          console.log('result======>', result);

          return result;
        }),

    /*
        await fetch('/api/nft/getHorses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          //body: JSON.stringify({
          //  method: 'getAll',
          //}),
        }).then((result) => {

          async () => {

            const data = await result.json();

            console.log("result======>", data);

            return data;
          }

        }),
        */

    /*
      .finally((result:any) => {
        pageParam = result.pageKey;
      }),
      */

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

  ///console.log(data);

  //const { data } = useSWR(`/api/getNftsForCollection`, fetcher);

  //console.log(data);

  /*
  const getLast20 = async () => {
    const response = await fetch('/api/nft/getHorses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      //body: JSON.stringify({
      //  method: 'getAll',
      //}),
    });
    const data = await response.json();

    console.log(data);

    ////setLast20Game(data.all);
  };

  useEffect(() => {
    getLast20();
  }, []);
  */

  return (
    <>
      {/*
    <div
      className={cn(
        'grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-4',
        isGridCompact
          ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
          : '3xl:!grid-cols-3 4xl:!grid-cols-4',
        className
      )}
    >
    */}

      {/*
      {horses.map((nft) => (
        <NFTGrid
          key={nft.id}
          name={nft.name}
          image={nft.image}
          author={nft.author}
          authorImage={nft.authorImage}
          price={nft.price}
          collection={nft.collection}
        />
      ))}
      */}

      {status === 'success' && (
        <InfiniteScroll
          dataLength={data?.pages.length * 20}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={<h4>Loading...</h4>}
        >
          {/*
          <div className='grid-container'>
*/}

          <div
            className={cn(
              'grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-4',
              isGridCompact
                ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
                : '3xl:!grid-cols-3 4xl:!grid-cols-4',
              className
            )}
          >
            {data?.pages.map((page) => (
              <>
                {page.nfts?.map((nft) => (
                  <>
                    <div
                      key={nft?.tokenId}
                      className="relative overflow-hidden rounded-lg bg-white shadow-lg"
                      onClick={() =>
                        //setTokenid(nft.metadata.id.toString()),
                        //setIsOpen(true)
                        //router.push('/horse-details/' + nft?.tokenId)

                        openDrawer('DRAWER_PREVIEW_NFT')
                      }
                    >
                      <Image
                        src={
                          nft?.media[0]?.gateway
                            ? nft?.media[0]?.gateway
                            : '/default-nft.png'
                        }
                        alt={nft?.title}
                        height={500}
                        width={500}
                        loading="lazy"
                      />
                      <div className="m-2 w-full">
                        <p className="text-md font-bold">{nft?.title}</p>
                      </div>
                    </div>

                    {/*
                {page.results.map((character) => (
                  */}

                    {/*
                  <article key={nft?.id}>
                    <img
                      src={nft?.image}
                      alt={nft?.name}
                      height={250}
                      loading='lazy'
                      width={"100%"}
                    />
                    <div className='text'>
                      <p>Name: {nft?.name}</p>

                    </div>
                  </article>
                  */}
                  </>
                ))}
              </>
            ))}
          </div>
        </InfiniteScroll>
      )}

      {/*
    </div>
    */}
    </>
  );
}
