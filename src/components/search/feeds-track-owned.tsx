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
  tokenContractAddressGCOW,
  ///tokenContractAddressHV,
  nftContractAddressHV,
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

export default function OwnedFeedsFt({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();

  const router = useRouter();

  const address = useAddress();

  ///console.log('address======>', address);

  /*
  const { contract: tokenContractHV } = useContract(
    tokenContractAddressHV,
    'token'
  );
  const { data: tokenBalanceHV, isLoading: isLoadingBalanceHV } =
    useTokenBalance(tokenContractHV, address);
  */

  const { contract: nftContractHV } = useContract(
    nftContractAddressHV,
    'edition-drop'
  );

  const [nftBalanceHV, setNftBalanceHV] = useState<any>(0);
  useEffect(() => {
    async function getNftBalanceHV() {
      if (!address) return;
      const balance = await nftContractHV?.erc1155.balanceOf(address, 0);

      console.log('getNftBalanceHV balance', balance);

      // balance is BigNumber

      setNftBalanceHV(balance?.toNumber());
    }

    getNftBalanceHV();
  }, [address, nftContractHV]);

  /*
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
  */

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
          <div className="m-10 flex flex-col items-center justify-center">
            {false ? (
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
                <button
                  className="ml-10 flex flex-row items-center justify-center gap-3"
                  ///onClick={(e) => router.push('/coin/usdc')}
                  onClick={() => {
                    closeInventories();
                    router.push('/my-track');
                    ///router.push('/horse-details/' + nft?.metadata?.id);
                  }}
                >
                  <div className=" flex flex-row items-center justify-start gap-1">
                    <div className=" w-80 text-right text-4xl font-bold underline decoration-sky-500 xl:text-6xl">
                      {Number(
                        (parseFloat(nftBalanceHV ?? '0') / 5000.0) * 100.0
                      ).toFixed(2)}
                      &nbsp;%
                    </div>
                  </div>

                  <ChevronForward className="ml-10 rtl:rotate-180" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
