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
  marketplaceContractAddress,
  stakingContractAddressHorseAAA,
  tokenContractAddressGRD,
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

import { LAYOUT_OPTIONS } from '@/lib/constants';

import NFTCard from '@/components/nft-horse/NFTCard';

import { BigNumber, ethers } from 'ethers';
import { useLayout } from '@/lib/hooks/use-layout';

import { useInventoriesDrawer } from '@/components/inventories/inventories-context';

export default function RegisteredFeeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();

  const router = useRouter();

  const address = useAddress();

  const { layout } = useLayout();

  const { contract: nftDropContract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );

  //////const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  /*
  const { contract: marketplace } = useContract(
    marketplaceContractAddress,
    'marketplace-v3'
  );

  const {
    data: directListings,
    isLoading: loadingListings,
    error,
  } = useValidDirectListings(marketplace);

  ///console.log('directListings======>', directListings);
  */

  const { contract: stakingContract, isLoading: isLoadingStakingContract } =
    useContract(stakingContractAddressHorseAAA);

  const { data: stakedTokens, isLoading: isLoadingStakedTokens } =
    useContractRead(stakingContract, 'getStakeInfo', [address]);

  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  const [stakedNftBalanceAAA, setStakedNftBalanceAAA] = useState<BigNumber>();
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

  useEffect(() => {
    if (!stakingContract || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await stakingContract?.call('getStakeInfo', [address]);

      ////console.log("staeInfo", stakeInfo[0].length);

      setStakedNftBalanceAAA(stakeInfo[0].length);

      setClaimableRewards(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, stakingContract]);

  ////console.log("stakedTokens",stakedTokens );

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
    <div className=" h-screen ">
      {!address ? (
        <>
          <div className="flex h-40 w-full flex-col items-center justify-center text-lg">
            <ConnectWallet theme="light" />
            to see my registered horses
          </div>
        </>
      ) : (
        <div className="felx flex-col">
          {address && (
            <div className="mt-2 flex flex-col items-center justify-center gap-0 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 ">
              <span>Claimable Rewards</span>
              <div className="text-lg font-bold">
                <b>
                  {!claimableRewards
                    ? 'Loading...'
                    : Number(
                        ethers.utils.formatUnits(claimableRewards, 18)
                      ).toFixed(2)}
                </b>{' '}
                {tokenBalance?.symbol}
              </div>

              {Number(ethers.utils.formatUnits(claimableRewards || 0, 18)) >
                0 && (
                <Web3Button
                  theme="light"
                  //colorMode="dark"
                  //accentColor="#5204BF"
                  contractAddress={stakingContractAddressHorseAAA}
                  action={async (contract) => {
                    try {
                      const tx = await contract.call('claimRewards');
                      //console.log(tx);
                      alert('Rewards Claimed!');

                      const stakeInfo = await stakingContract?.call(
                        'getStakeInfo',
                        [address]
                      );
                      ////const stakeInfo = await contract?.call("getStakeInfo", );
                      setClaimableRewards(stakeInfo[1]);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  Claim Rewards
                </Web3Button>
              )}
            </div>
          )}

          {
            // If the listings are loading, show a loading message
            isLoadingStakedTokens ? (
              <div className="mb-10 mt-5 w-full items-center justify-center">
                <div className="text-2xl">Loading my registered horses...</div>
              </div>
            ) : (
              <div
                className={cn(
                  'mt-5 grid grid-cols-2 gap-2  ',
                  layout === LAYOUT_OPTIONS.RETRO
                    ? 'md:grid-cols-2'
                    : 'md:grid-cols-2'
                )}
              >
                {stakedTokens &&
                  stakedTokens[0]?.map((stakedToken: BigNumber) => (
                    <div
                      key={stakedToken.toString()}
                      className="block"
                      onClick={() => {
                        closeInventories();
                        router.push('/horse-details/' + stakedToken);
                      }}
                    >
                      <NFTCard
                        tokenId={stakedToken.toNumber()}
                        key={stakedToken.toString()}
                      />
                    </div>
                  ))}
              </div>
            )
          }
        </div>
      )}
    </div>
  );
}
