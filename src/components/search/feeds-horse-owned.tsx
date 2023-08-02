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

  console.log('Feeds address======>', address);

  const { contract: nftDropContract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  console.log('Feeds ownedNfts======>', ownedNfts);

  return (
    <>
      {!address ? (
        <></>
      ) : (
        <>
          {/*
        {status === "success" && (

          <InfiniteScroll
            dataLength={data?.pages.length * 20}
            next={fetchNextPage}
            hasMore={hasNextPage ?? false}
            loader={<h4>Loading...</h4>}
          >
        */}

          <div
            //</>className={cn(
            //  'grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-4',
            //  isGridCompact
            //   ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
            //   : '3xl:!grid-cols-3 4xl:!grid-cols-4',
            // className
            //)}
            className="flex flex-wrap justify-center"
          >
            {ownedNfts?.map((nft) => (
              <>
                <div
                  key={nft?.metadata?.id}
                  //className='relative overflow-hidden bg-white rounded-lg shadow-lg'
                  className="m-1 flex rounded-lg bg-gray-500 p-1 shadow-lg"
                  onClick={() =>
                    //setTokenid(nft.metadata.id.toString()),
                    //setIsOpen(true)
                    router.push('/horse-details/' + nft?.metadata?.id)
                  }
                >
                  <div className="flex text-xs font-semibold text-white">
                    {nft?.metadata?.id}
                  </div>

                  {/*
                    <Image
                      src={nft?.metadata?.image ? nft?.metadata?.image : '/default-nft.png' }
                      alt='nft'
                      height={25}
                      width={25}
                      loading='lazy'
                      
                    />
                    */}
                </div>
              </>
            ))}
          </div>

          {/*
          </InfiniteScroll>

        )}

*/}
        </>
      )}
    </>
  );
}
