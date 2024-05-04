import cn from 'classnames';

import { NFTList } from '@/data/static/horse-list';

import NFTGrid from '@/components/ui/nft-card';

//import AuthorImage from '@/assets/images/profile.png';
import AuthorImage from '@/assets/images/profile.png';

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

import {
  nftDropContractAddressHorse,
  nftDropContractAddressHorseDerbyStars,
  tokenContractAddressUSDC,
  tokenContractAddressGRD,
  nftDropContractAddressCoupon,
} from '@/config/contractAddresses';

import Button from '@/components/ui/button/button';

import { ChevronForward } from '@/components/icons/chevron-forward';

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

import { useInventoriesDrawer } from '@/components/inventories/inventories-context';
import { Usdc } from '@/components/icons/usdc';
import { GrdIcon } from '@/components/icons/grd-icon';

export default function OwnedFeedsSerbystars({
  className,
}: {
  className?: string;
}) {
  const { isGridCompact } = useGridSwitcher();

  const router = useRouter();

  const address = useAddress();

  ///console.log('address======>', address);

  const { contract: tokenContractUSDC } = useContract(
    tokenContractAddressUSDC,
    'token'
  );
  const { data: tokenBalanceUSDC, isLoading: isLoadingBalanceUSDC } =
    useTokenBalance(tokenContractUSDC, address);

  const { contract: tokenContractGRD } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalanceGRD, isLoading: isLoadingBalanceGRD } =
    useTokenBalance(tokenContractGRD, address);

  const { contract: nftDropContract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );
  const { data: ownedNfts, isLoading: isLoadingOwnedNfts } = useOwnedNFTs(
    nftDropContract,
    address
  );

  const { contract: nftDropContractDerbyStars } = useContract(
    nftDropContractAddressHorseDerbyStars,
    'nft-drop'
  );
  const { data: ownedNftsDerbyStars, isLoading: isLoadingOwnedNftsDerbyStars } =
    useOwnedNFTs(nftDropContractDerbyStars, address);

  const { contract: contractCoupon } = useContract(
    nftDropContractAddressCoupon
  );

  const { data: ownedCoupons, isLoading: isLoadingCoupons } = useOwnedNFTs(
    contractCoupon,
    address || ''
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

  const { isInventoriesOpen, closeInventories } = useInventoriesDrawer();

  return (
    <div className="">
      {!address ? (
        <>
          <div className="flex h-40 w-full flex-col items-center justify-center text-lg"></div>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            {/*
            {isLoadingBalanceUSDC ? (
              <>
                <div className="flex flex-col items-center justify-center ">
                  <div className="text-xl text-gray-400">Loading...</div>

                  <span className="items-top mt-10 flex h-screen w-full justify-center">
                    <span className="relative flex h-10 w-10 animate-spin rounded-sm bg-purple-400 opacity-75"></span>
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-row items-center justify-between">
                <div className=" flex flex-row items-center justify-start gap-1">
                  <Usdc className="h-5 w-5" />
                  <div className="w-20 text-xl ">
                    {tokenBalanceUSDC?.symbol}:
                  </div>
                  <div className=" w-28 text-right text-2xl font-bold underline decoration-sky-500">
                    {Number(tokenBalanceUSDC?.displayValue).toFixed(2)}
                  </div>
                </div>

                <button
                  className="flex flex-row items-center justify-center gap-3"
                  ///onClick={(e) => router.push('/coin/usdc')}
                  onClick={() => {
                    closeInventories();
                    router.push('/coin/usdc');
                    ///router.push('/horse-details/' + nft?.metadata?.id);
                  }}
                >
                  <ChevronForward className="mr-10 rtl:rotate-180" />
                </button>
              </div>
            )}
            */}

            {/*
            {isLoadingBalanceGRD ? (
              <>
                <div className="flex flex-col items-center justify-center ">
                  <div className="text-xl text-gray-400">Loading...</div>

                  <span className="items-top mt-10 flex h-screen w-full justify-center">
                    <span className="relative flex h-10 w-10 animate-spin rounded-sm bg-purple-400 opacity-75"></span>
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-row items-center justify-between">
                <div className="mt-1 flex flex-row items-center justify-start gap-1">
                  <GrdIcon className="h-5 w-5" />
                  <div className="w-20 text-xl ">
                    {tokenBalanceGRD?.symbol}:
                  </div>
                  <div className="w-28 text-right text-2xl font-bold underline decoration-sky-500">
                    {Number(tokenBalanceGRD?.displayValue).toFixed(2)}
                  </div>
                </div>

                <button
                  className="flex flex-row items-center justify-center gap-3"
                  ////onClick={(e) => router.push('/coin/grd')}
                  onClick={() => {
                    closeInventories();
                    router.push('/coin/grd');
                    ///router.push('/horse-details/' + nft?.metadata?.id);
                  }}
                >
                  <ChevronForward className="mr-10 rtl:rotate-180" />
                </button>
              </div>
            )}
            */}

            <div className="mt-5 flex flex-row items-center justify-start gap-1">
              <Image
                src="/horseRace/logo-granderby.png"
                alt="logo"
                width={28}
                height={28}
              />
              <div className="text-xl ">Granderby Horses</div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div className="flex flex-col justify-center text-4xl font-bold underline decoration-sky-500 xl:text-6xl">
                {ownedNfts?.length}
              </div>
            </div>
            <div className="mt-10 flex">
              {
                // If the listings are loading, show a loading message
                isLoadingOwnedNfts ? (
                  <>
                    <div className="flex flex-col items-center justify-center ">
                      <div className="text-xl text-gray-400">
                        Loading my horses...
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
                          You don&apos;t own any horses yet.
                        </h4>
                        <Button
                          className="w-full"
                          title="Go"
                          color="white"
                          shape="rounded"
                          variant="transparent"
                          size="large"
                          onClick={() => {
                            ///router.push('https://granderby.market/');
                            router.push('/buy-horse');
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
                        {/*
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
                        */}
                      </div>
                    )}

                    <div
                      className={cn(
                        'grid grid-cols-3 gap-2 ',
                        isGridCompact
                          ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
                          : 'xl:grid-cols-5 xl:gap-4  3xl:!grid-cols-3 4xl:!grid-cols-4',
                        className
                      )}
                    >
                      {ownedNfts?.map((nft) => (
                        <button
                          key={nft?.metadata?.id}
                          className=" overflow-hidden rounded-lg bg-white shadow-lg"
                          onClick={() => {
                            closeInventories();
                            router.push('/horse-details/' + nft?.metadata?.id);
                          }}
                        >
                          <Image
                            src={
                              nft?.metadata?.image
                                ? nft?.metadata?.image
                                : '/default-horse.png'
                            }
                            alt="nft"
                            height={300}
                            width={300}
                            loading="lazy"
                          />

                          <div className=" h-10 w-full items-center justify-center xl:h-14 xl:text-2xl">
                            <p className="text-md p-2  text-center  ">
                              {nft?.metadata?.name}
                            </p>
                          </div>
                          <div className="m-1 w-full items-center justify-start">
                            <p className="p-1  text-left text-sm font-bold ">
                              #{nft?.metadata?.id}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )
              }
            </div>
          </div>

          {/*
          <div className="mt-5 flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="text-xl">Derby Stars</div>
            </div>
            {
              // If the listings are loading, show a loading message
              isLoadingOwnedNftsDerbyStars ? (
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
                  {ownedNftsDerbyStars?.length == 0 ? (
                    <>
                      <h4 className="flex flex-col justify-center ">
                        You don&apos;t own any horses yet.
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
                        I have {ownedNftsDerbyStars?.length} horses.
                      </h4>

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
                    {ownedNftsDerbyStars?.map((nft) => (
                      <div
                        key={nft?.metadata?.id}
                        className="relative overflow-hidden rounded-lg bg-white shadow-lg"
                        onClick={() => {
                          //setTokenid(nft.metadata.id.toString()),

                          //////setIsOpen(false);

                          closeInventories();
                          router.push('/horse-details/' + nft?.metadata?.id);
                        }}
                      >
                        <Image
                          src={
                            nft?.metadata?.image
                              ? nft?.metadata?.image
                              : '/default-horse.png'
                          }
                          alt="nft"
                          height={200}
                          width={200}
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
          </div>

          */}
        </div>
      )}
    </div>
  );
}
