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

import {
  nftDropContractAddressHorse,
  nftDropContractAddressHorseDerbyStars,
  tokenContractAddressUSDC,
  tokenContractAddressGRD,
  nftDropContractAddressCoupon,
  tokenContractAddressGCOW,
  tokenContractAddressCARROTDrop,
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

import { GasIcon } from '@/components/icons/gas-icon';

export default function OwnedFeedsCoin({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();

  const router = useRouter();

  const address = useAddress();

  ///console.log('address======>', address);

  const { contract: tokenContractCARROT } = useContract(
    tokenContractAddressCARROTDrop,
    'token'
  );
  const { data: tokenBalanceCARROT, isLoading: isLoadingBalanceCARROT } =
    useTokenBalance(tokenContractCARROT, address);

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

  const { contract: tokenContractGCOW } = useContract(
    tokenContractAddressGCOW,
    'token'
  );
  const { data: tokenBalanceGCOW, isLoading: isLoadingBalanceGCOW } =
    useTokenBalance(tokenContractGCOW, address);

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
    <div className="mt-5 flex">
      {!address ? (
        <>
          <div className="flex h-40 w-full flex-col items-center justify-center text-lg"></div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-start gap-5">
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
            <div className="flex flex-row items-center justify-start">
              <div className=" flex ">
                <Image
                  src="/images/icon-usdc.png"
                  alt="usdc"
                  width={40}
                  height={40}
                />
              </div>

              <div className=" w-32 text-right text-2xl font-bold underline decoration-sky-500">
                {Number(tokenBalanceUSDC?.displayValue).toFixed(2)}
              </div>
              <div className="ml-2 w-12 text-xl ">
                {tokenBalanceUSDC?.symbol}
              </div>

              <button
                className="ml-10 flex flex-row items-center justify-center gap-3"
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
            <div className="flex flex-row items-center justify-start">
              <div className="times-center  flex  justify-start ">
                <Image
                  src="/images/icon-grd.png"
                  alt="grd"
                  width={80}
                  height={80}
                />
              </div>

              <div className=" w-32  text-right text-2xl font-bold underline decoration-sky-500">
                {Number(tokenBalanceGRD?.displayValue).toFixed(2)}
              </div>

              <div className="ml-2 w-12 text-xl ">GRDB</div>

              <button
                className="ml-10 flex flex-row items-center justify-center gap-3"
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

          {isLoadingBalanceCARROT ? (
            <>
              <div className="flex flex-col items-center justify-center ">
                <div className="text-xl text-gray-400">Loading...</div>

                <span className="items-top mt-10 flex h-screen w-full justify-center">
                  <span className="relative flex h-10 w-10 animate-spin rounded-sm bg-purple-400 opacity-75"></span>
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-row items-center justify-start">
              <div className="times-center  flex  justify-center">
                <Image
                  src="/images/icon-carrot.png"
                  alt="carrot"
                  width={50}
                  height={50}
                />
              </div>

              <div className=" w-32  text-right text-2xl font-bold underline decoration-sky-500">
                {Number(tokenBalanceCARROT?.displayValue).toFixed(2)}
              </div>

              <div className="ml-2 w-12 text-xl ">
                {tokenBalanceCARROT?.symbol}
              </div>

              <button
                className="ml-10 flex flex-row items-center justify-center gap-3"
                ////onClick={(e) => router.push('/coin/grd')}
                onClick={() => {
                  closeInventories();
                  router.push('/mint-carrot');
                  ///router.push('/horse-details/' + nft?.metadata?.id);
                }}
              >
                <ChevronForward className="mr-10 rtl:rotate-180" />
              </button>
            </div>
          )}

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
            <div className="flex flex-row items-center justify-start">
              <div className="times-center  flex justify-center">
                <Image
                  src="/images/icon-sugar.png"
                  alt="sugar"
                  width={50}
                  height={50}
                />
              </div>

              <div className=" w-32  text-right text-2xl font-bold underline decoration-sky-500">
                {Number(tokenBalanceGRD?.displayValue).toFixed(2)}
              </div>

              <div className="ml-2 w-12 text-xl ">SUGAR</div>

              <button
                className="ml-10 flex flex-row items-center justify-center gap-3"
                ////onClick={(e) => router.push('/coin/grd')}
                onClick={() => {
                  closeInventories();
                  router.push('/mint-sugar');
                  ///router.push('/horse-details/' + nft?.metadata?.id);
                }}
              >
                <ChevronForward className="mr-10 rtl:rotate-180" />
              </button>
            </div>
          )}

          {/*
          {isLoadingBalanceGCOW ? (
            <>
              <div className="flex flex-col items-center justify-center ">
                <div className="text-xl text-gray-400">Loading...</div>

                <span className="items-top mt-10 flex h-screen w-full justify-center">
                  <span className="relative flex h-10 w-10 animate-spin rounded-sm bg-purple-400 opacity-75"></span>
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-row items-center justify-start">
              <div className="mt-1 flex flex-row items-center justify-start gap-1">
                <GasIcon className="h-5 w-5" />
                <div className="w-20 text-xl ">
                  {tokenBalanceGCOW?.symbol}:
                </div>
                <div className=" w-40 text-right text-2xl font-bold underline decoration-sky-500">
                  {Number(tokenBalanceGCOW?.displayValue).toFixed(2)}
                </div>
              </div>

              <button
                className="ml-10 flex flex-row items-center justify-center gap-3"
                ////onClick={(e) => router.push('/coin/grd')}
                onClick={() => {
                  closeInventories();
                  router.push('/coin/gcow');
                  ///router.push('/horse-details/' + nft?.metadata?.id);
                }}
              >
                <ChevronForward className="mr-10 rtl:rotate-180" />
              </button>
            </div>
          )}
          */}

          <div className="mt-10 flex w-full flex-row items-center justify-start gap-2">
            {ownedCoupons?.map((nft) => (
              <div
                className="mb-2 flex flex-col items-center justify-center gap-3"
                key={nft.metadata.id.toString()}
              >
                <Image
                  src={nft.metadata.image || ''}
                  width={70}
                  height={50}
                  alt={String(nft.metadata.name) || ''}
                  className="rounded-lg "
                />
                <div className="flex text-2xl font-bold underline decoration-sky-500">
                  {nft.quantityOwned}
                </div>
              </div>
            ))}

            <button
              className="ml-10 flex flex-row items-center gap-3"
              ////onClick={(e) => router.push('/coin/grd')}
              onClick={() => {
                closeInventories();
                router.push('/mint-coupon');
                ///router.push('/horse-details/' + nft?.metadata?.id);
              }}
            >
              <ChevronForward className="mr-10 rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
