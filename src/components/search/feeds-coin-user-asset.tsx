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

import { InfoIcon } from '@/components/icons/info-icon';

import { useRouter } from 'next/router';

import {
  nftDropContractAddressHorse,
  nftDropContractAddressHorseDerbyStars,
  tokenContractAddressUSDC,
  tokenContractAddressGRD,
  nftDropContractAddressCoupon,
  tokenContractAddressGCOW,
  tokenContractAddressCARROTDrop,
  tokenContractAddressSUGARDrop,
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

import { useModal } from '@/components/modal-views/context';

import { Twitter } from '@/components/icons/brands/twitter';

// dummy data
import User1 from '@/assets/images/avatar/8.jpg';
import User2 from '@/assets/images/avatar/9.jpg';
import User3 from '@/assets/images/avatar/10.jpg';
import User4 from '@/assets/images/avatar/11.jpg';
import User5 from '@/assets/images/collection/collection-1.jpg';
import User6 from '@/assets/images/collection/collection-2.jpg';
import User7 from '@/assets/images/collection/collection-3.jpg';
import User8 from '@/assets/images/collection/collection-4.jpg';
import User9 from '@/assets/images/collection/collection-5.jpg';
import User10 from '@/assets/images/collection/collection-6.jpg';
const data = [
  { name: 'Amanda Jones', thumbnail: User1 },
  { name: 'Marcos Llanos', thumbnail: User2 },
  { name: 'Garry Heffernan', thumbnail: User3 },
  { name: 'Teresa J. Brown', thumbnail: User4 },
  { name: 'Williams Sarah', thumbnail: User5 },
  { name: 'Teresa W. Luter', thumbnail: User6 },
  { name: 'Dorothy Pacheco', thumbnail: User7 },
  { name: 'Christopher', thumbnail: User8 },
  { name: 'Ted Luster', thumbnail: User4 },
  { name: 'R. Foster', thumbnail: User9 },
  { name: 'Domingo', thumbnail: User3 },
  { name: 'Conway', thumbnail: User10 },
];

export default function FeedsCoinUser(
  { userAddress }: { userAddress?: string },
  { className }: { className?: string }
) {
  const { isGridCompact } = useGridSwitcher();

  const router = useRouter();

  //const address = useAddress();

  ///console.log('address======>', address);

  const { contract: tokenContractSUGAR } = useContract(
    tokenContractAddressSUGARDrop,
    'token'
  );
  const { data: tokenBalanceSUGAR, isLoading: isLoadingBalanceSUGAR } =
    useTokenBalance(tokenContractSUGAR, userAddress);

  const { contract: tokenContractCARROT } = useContract(
    tokenContractAddressCARROTDrop,
    'token'
  );
  const { data: tokenBalanceCARROT, isLoading: isLoadingBalanceCARROT } =
    useTokenBalance(tokenContractCARROT, userAddress);

  const { contract: tokenContractUSDC } = useContract(
    tokenContractAddressUSDC,
    'token'
  );
  const { data: tokenBalanceUSDC, isLoading: isLoadingBalanceUSDC } =
    useTokenBalance(tokenContractUSDC, userAddress);

  const { contract: tokenContractGRD } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalanceGRD, isLoading: isLoadingBalanceGRD } =
    useTokenBalance(tokenContractGRD, userAddress);

  const { contract: tokenContractGCOW } = useContract(
    tokenContractAddressGCOW,
    'token'
  );
  const { data: tokenBalanceGCOW, isLoading: isLoadingBalanceGCOW } =
    useTokenBalance(tokenContractGCOW, userAddress);

  const { contract: contractCoupon } = useContract(
    nftDropContractAddressCoupon
  );

  const { data: ownedCoupons, isLoading: isLoadingCoupons } = useOwnedNFTs(
    contractCoupon,
    userAddress || ''
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

  const { openModal } = useModal();

  return (
    <div className="mt-5 flex">
      {!userAddress ? (
        <>
          <div className="flex h-40 w-full flex-col items-center justify-center text-lg"></div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-start gap-5">
          {/*
          <div className="ml-10 flex flex-row items-center justify-start">

            <div className=" w-10  flex ">
              <Image
                src="/images/icon-usdc.png"
                alt="usdc"
                width={30}
                height={30}
              />
            </div>

            <div className=" w-32 text-right text-2xl font-bold ">

              {isLoadingBalanceUSDC ? (
                <span className='text-xs'>
                  Loading...
                </span>) : Number(tokenBalanceUSDC?.displayValue).toFixed(2)}

            </div>
            <div className="ml-2 w-14 text-xl ">
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
          */}

          <div className="ml-10 flex flex-row items-center justify-start">
            <div className=" flex  w-10 ">
              <Image
                src="/images/icon-grd.png"
                alt="grd"
                width={30}
                height={30}
              />
            </div>

            <div className=" w-32 text-right text-2xl font-bold ">
              {isLoadingBalanceGRD ? (
                <span className="text-xs">Loading...</span>
              ) : (
                Number(tokenBalanceGRD?.displayValue).toFixed(2)
              )}
            </div>
            <div className="ml-2 w-14 text-right text-xs font-bold text-green-600 xl:w-48 xl:text-lg ">
              +5,543 (10.0%)
            </div>

            <button
              className="ml-10 flex flex-row items-center justify-center gap-3"
              ///onClick={(e) => router.push('/coin/usdc')}
              onClick={() => {
                closeInventories();
                router.push('/coin/grd');
                ///router.push('/horse-details/' + nft?.metadata?.id);
              }}
            >
              <ChevronForward className="mr-10 rtl:rotate-180" />
            </button>
          </div>

          <div className="ml-10 flex flex-row items-center justify-start">
            <div className=" flex  w-10 ">
              <Image
                src="/images/icon-carrot.png"
                alt="carrot"
                width={30}
                height={30}
              />
            </div>

            <div className=" w-32 text-right text-2xl font-bold ">
              {isLoadingBalanceCARROT ? (
                <span className="text-xs">Loading...</span>
              ) : (
                Number(tokenBalanceCARROT?.displayValue).toFixed(2)
              )}
            </div>
            <div className="ml-2 w-14 text-right text-xs font-bold text-red-600 xl:w-48 xl:text-lg ">
              -634(5.0%)
            </div>

            <button
              className="ml-10 flex flex-row items-center justify-center gap-3"
              ///onClick={(e) => router.push('/coin/usdc')}
              onClick={() => {
                closeInventories();
                router.push('/coin/carrot');
                ///router.push('/horse-details/' + nft?.metadata?.id);
              }}
            >
              <ChevronForward className="mr-10 rtl:rotate-180" />
            </button>
          </div>

          <div className="ml-10 flex flex-row items-center justify-start">
            <div className=" flex  w-10 ">
              <Image
                src="/images/icon-sugar.png"
                alt="sugar"
                width={30}
                height={30}
              />
            </div>

            <div className=" w-32 text-right text-2xl font-bold ">
              {isLoadingBalanceSUGAR ? (
                <span className="text-xs">Loading...</span>
              ) : (
                Number(tokenBalanceSUGAR?.displayValue).toFixed(2)
              )}
            </div>
            <div className="ml-2 w-14 text-right text-xs font-bold text-black xl:w-48 xl:text-lg ">
              0(0.0%)
            </div>

            <button
              className="ml-10 flex flex-row items-center justify-center gap-3"
              ///onClick={(e) => router.push('/coin/usdc')}
              onClick={() => {
                closeInventories();
                router.push('/coin/sugar');
                ///router.push('/horse-details/' + nft?.metadata?.id);
              }}
            >
              <ChevronForward className="mr-10 rtl:rotate-180" />
            </button>
          </div>

          <div className="mt-2 flex flex-row gap-5">
            <Button
              className="h-8 bg-green-500 font-normal text-gray-600 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white md:h-9 md:px-4 lg:mt-6"
              onClick={() =>
                openModal('SALE_VIEW', {
                  title: 'Followers',
                  count: '1,845',
                  users: data,
                })
              }
            >
              <span className="flex items-center gap-2">
                <InfoIcon className="h-3 w-3" /> Deposit
              </span>
            </Button>

            <Button
              className="h-8 bg-green-500 font-normal text-gray-600 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white md:h-9 md:px-4 lg:mt-6"
              onClick={() => {
                router.push('/coin/grd');
              }}
            >
              <span className="flex items-center gap-2">
                <InfoIcon className="h-3 w-3" /> Withraw
              </span>
            </Button>
          </div>

          {/*
          <button
            className="ltr:pl-6 rtl:pr-6"
            onClick={() =>
              openModal('SALE_VIEW', {
                title: 'Followers',
                count: '1,845',
                users: data,
              })
            }
          >

            <Twitter className="h-5 w-5" />

            <span className=" text-left text-lg font-bold text-black dark:text-white xl:text-xl">
              followers
            </span>
          </button>
          */}

          {/*
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
          */}
        </div>
      )}
    </div>
  );
}
