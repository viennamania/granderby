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

import { useRouter } from 'next/router';

import { nftDropContractAddressHorse } from '@/config/contractAddresses';

import Button from '../ui/button/button';

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
} from '@thirdweb-dev/react';

export default function Feeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();

  const router = useRouter();

  const address = useAddress();

  console.log('address======>', address);

  const { contract: nftDropContract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );
  const { data: ownedNfts, isLoading: isLoadingOwnedNfts } = useOwnedNFTs(
    nftDropContract,
    address
  );

  ////console.log("ownedNfts======>", ownedNfts);

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
    <div className="h-screen">
      {!address ? (
        <>
          <div className="flex h-40 w-full flex-col items-center justify-center text-lg">
            <ConnectWallet theme="light" />
            to see my owned horses
          </div>
        </>
      ) : (
        <>
          {
            // If the listings are loading, show a loading message
            isLoadingOwnedNfts ? (
              <>
                <div className="flex flex-col items-center justify-center ">
                  <div className="text-xl text-gray-400">
                    Loading my own horses...
                  </div>

                  <span className="items-top mt-10 flex h-screen w-full justify-center">
                    <span className="relative flex h-10 w-10 animate-spin rounded-sm bg-purple-400 opacity-75"></span>
                  </span>
                </div>
              </>
            ) : (
              <>
                {ownedNfts?.length == 0 ? (
                  <>
                    <h4 className="flex flex-col justify-center ">
                      You don't own any horses yet.
                    </h4>
                    <Button
                      className="w-full"
                      title="Go"
                      color="white"
                      shape="rounded"
                      variant="transparent"
                      size="large"
                      onClick={() => {
                        router.push('https://granderby.market/');
                      }}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/images/market.png"
                          alt="market"
                          width={34}
                          height={34}
                        />
                        Granderby Market
                      </div>
                    </Button>
                  </>
                ) : (
                  <div className="mb-2">
                    <h4 className="flex flex-col justify-center ">
                      I have {ownedNfts?.length} horses.
                    </h4>
                    <Button
                      className="w-full"
                      title="Go"
                      color="white"
                      shape="rounded"
                      variant="transparent"
                      size="large"
                      onClick={() => {
                        router.push('/mint-carrot');
                      }}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/horseRace/3338carrots.png"
                          alt="breed"
                          width={48}
                          height={48}
                        />
                        Try to breed them.
                      </div>
                    </Button>
                  </div>
                )}

                <div
                  className={cn(
                    'grid grid-cols-4 gap-2 sm:grid-cols-4 md:grid-cols-4',
                    isGridCompact
                      ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
                      : '3xl:!grid-cols-3 4xl:!grid-cols-4',
                    className
                  )}
                >
                  {ownedNfts?.map((nft) => (
                    <div
                      key={nft?.metadata?.id}
                      className="relative overflow-hidden rounded-lg bg-white shadow-lg"
                      onClick={() => {
                        //setTokenid(nft.metadata.id.toString()),
                        //setIsOpen(false);
                        router.push('/horse-details/' + nft?.metadata?.id);
                      }}
                    >
                      <Image
                        src={
                          nft?.metadata?.image
                            ? nft?.metadata?.image
                            : '/default-nft.png'
                        }
                        alt="nft"
                        height={100}
                        width={100}
                        loading="lazy"
                      />
                      <div className="m-0 w-full items-center justify-center bg-gray-100">
                        <p className="mr-2  text-right  text-sm text-sky-500 ">
                          #{nft?.metadata?.id}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )
          }
        </>
      )}
    </div>
  );
}
