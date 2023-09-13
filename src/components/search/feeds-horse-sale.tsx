import cn from 'classnames';

import { NFTList } from '@/data/static/horse-list';

import NFTGrid from '@/components/ui/nft-card';

//import AuthorImage from '@/assets/images/author.jpg';
import AuthorImage from '@/assets/images/author.jpg';

import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';

import { Network, Alchemy } from 'alchemy-sdk';

import { useEffect, useState } from 'react';

import useSWR from 'swr';
import { fetcher } from '../../lib/utils';

import { StaticImageData } from 'next/image';
import { OptionalPropertiesInput } from '@thirdweb-dev/sdk';
import { set } from 'date-fns';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';
import Image from 'next/image';

import Button from '@/components/ui/button/button';

import { useRouter } from 'next/router';

import { format } from 'date-fns';

import {
  nftDropContractAddressHorse,
  marketplaceContractAddress,
} from '@/config/contractAddresses';

import {
  ConnectWallet,
  useDisconnect,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  useNFTBalance,
  Web3Button,
  useValidDirectListings,
} from '@thirdweb-dev/react';

export default function SaleFeeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();

  const router = useRouter();

  const address = useAddress();

  console.log('address======>', address);

  const { contract: nftDropContract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  const { contract: marketplace } = useContract(
    marketplaceContractAddress,
    'marketplace-v3'
  );

  const {
    data: directListings,
    isLoading: loadingListings,
    error,
  } = useValidDirectListings(marketplace);

  /*
  const settings = {
    ///apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key. creath.park@gmail.com

    apiKey: '8YyZWFtcbLkYveYaB9sjOC3KPWInNu07', // Replace with your Alchemy API Key. songpalabs@gmail.com
    network: Network.MATIC_MAINNET, // Replace with your network.
  };

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


  const alchemy = new Alchemy(settings);



  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery (
    "infiniteCharacters",

    
    async ( { pageParam = '', } ) => 
      
      await alchemy.nft.getNftsForOwner(
        String(address),
        {
          omitMetadata: false, // // Flag to omit metadata
          contractAddresses: [nftDropContractAddressHorse],
          pageKey: pageParam,
          pageSize: 40,
        }
      ).then((result) => { //result
          console.log("result======>", result)
          return result
        }),

    

    {
      getNextPageParam: (lastPage, pages   ) => {

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
  */

  ///console.log(data);

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

  return (
    <>
      {
        // If the listings are loading, show a loading message
        loadingListings ? (
          <>
            <div className="flex flex-col items-center justify-center ">
              <div className="text-xl">Loading listings...</div>
              <span className="items-top mt-10 flex h-screen w-full justify-center">
                <span className="relative flex h-10 w-10 animate-spin rounded-sm bg-purple-400 opacity-75"></span>
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col">
            {/*
        {status === "success" && (

          <InfiniteScroll
            dataLength={data?.pages.length * 20}
            next={fetchNextPage}
            hasMore={hasNextPage ?? false}
            loader={<h4>Loading...</h4>}
          >
        */}

            <div className="m-2 flex flex-row items-center justify-start ">
              <Button
                className="m-2 flex flex-row items-center justify-center"
                title="Go"
                color="white"
                shape="rounded"
                variant="transparent"
                size="small"
                onClick={() => {
                  router.push('https://granderby.market/?view=listed');
                }}
              >
                <Image
                  src="/images/market.png"
                  alt="market"
                  width={24}
                  height={24}
                />
                <span className="">source from: Granderby Market</span>
              </Button>
            </div>

            <div
              className={cn(
                'grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-4',
                isGridCompact
                  ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
                  : '3xl:!grid-cols-3 4xl:!grid-cols-4',
                className
              )}
            >
              {directListings?.map((listing) => (
                <button
                  key={listing.id}
                  className="relative overflow-hidden rounded-lg bg-white shadow-lg"
                  onClick={() =>
                    //setTokenid(nft.metadata.id.toString()),
                    //setIsOpen(true)
                    router.push(
                      //`/listing/${listing.id}`
                      `/horse-details/${listing.asset?.id}`
                    )
                  }
                >
                  <div className="flex w-full items-center justify-start bg-gray-800">
                    <p className="m-2 text-sm font-bold text-white">
                      #{listing.asset?.id}
                    </p>
                  </div>

                  <Image
                    src={
                      listing.asset?.image
                        ? listing.asset?.image
                        : '/default-nft.png'
                    }
                    alt="nft"
                    height={300}
                    width={300}
                    loading="lazy"
                  />
                  <div className="mt-2 w-full  ">
                    <p className="text-sm font-bold">{listing.asset?.name}</p>
                  </div>

                  <div className="m-2 flex w-full items-center justify-end pr-5 text-2xl font-bold">
                    {Number(listing.currencyValuePerToken.displayValue).toFixed(
                      2
                    )}
                    &nbsp;
                    <span className="text-xs text-blue-600">
                      {listing.currencyValuePerToken.symbol}
                    </span>
                  </div>

                  <div className="m-2 flex items-center  justify-end text-xs">
                    {format(
                      new Date(listing?.startTimeInSeconds * 1000),
                      'yyy-MM-dd hh:mm:ss'
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/*
          </InfiniteScroll>

        )}

*/}
          </div>
        )
      }
    </>
  );
}
