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

import { nftDropContractAddressHorse } from '@/config/contractAddresses';

import { useDrawer } from '@/components/drawer-views/context';

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

import Button from '@/components/ui/button';

export default function OwnedFeeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();

  const router = useRouter();

  const address = useAddress();

  const { openDrawer } = useDrawer();

  ////console.log('Feeds address======>', address);

  const { contract: nftDropContract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );
  const { data: ownedNfts, isLoading: isLoadingOwnedNfts } = useOwnedNFTs(
    nftDropContract,
    address
  );

  /////console.log('Feeds ownedNfts======>', ownedNfts);

  return (
    <>
      {!address ? (
        <>
          {/*}
          <div className="flex h-60 flex-col justify-center ">
            <ConnectWallet theme="light" />
          </div>
        */}
        </>
      ) : (
        <div className=" w-full ">
          {/*
        {status === "success" && (

          <InfiniteScroll
            dataLength={data?.pages.length * 20}
            next={fetchNextPage}
            hasMore={hasNextPage ?? false}
            loader={<h4>Loading...</h4>}
          >
        */}

          {isLoadingOwnedNfts && (
            <span className="items-top mt-2 flex w-full flex-row justify-center gap-2">
              <h4 className="text-gray-400">Loading my own horses...</h4>
              <span className="relative flex h-5 w-5 animate-spin rounded-sm bg-purple-400 opacity-75"></span>
            </span>
          )}

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
            <div className="flex w-full flex-col items-center justify-center">
              <h4 className="flex flex-col justify-center ">
                I have {ownedNfts?.length} horses.
              </h4>

              <div className="flex flex-col items-center justify-center">
                <Button
                  className="flex"
                  title="Go"
                  color="white"
                  shape="rounded"
                  variant="transparent"
                  size="small"
                  onClick={() => {
                    router.push('/mint-carrot');
                  }}
                >
                  <div className="flex flex-row items-center">
                    <Image
                      src="/horseRace/3338carrots.png"
                      alt="market"
                      width={28}
                      height={28}
                    />
                    &nbsp;Try to register them.
                  </div>
                </Button>

                <Button
                  className="flex"
                  title="Go"
                  color="white"
                  shape="rounded"
                  variant="transparent"
                  size="small"
                  onClick={() => {
                    router.push('/mint-carrot');
                  }}
                >
                  <div className="flex flex-row items-center">
                    <Image
                      src="/horseRace/3338carrots.png"
                      alt="market"
                      width={28}
                      height={28}
                    />
                    &nbsp;Try to breed them.
                  </div>
                </Button>
              </div>
            </div>
          )}

          {/*
          <div
            className={cn(
              '2xl:grid-cols-15 grid grid-cols-5 gap-2 sm:grid-cols-5 md:grid-cols-10',
              isGridCompact
                ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
                : '3xl:!grid-cols-3 4xl:!grid-cols-4',
              className
            )}
            //className="flex flex-wrap justify-center"
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
                    ///router.push('/horse-details/' + nft?.metadata?.id)

                    openDrawer('DRAWER_PREVIEW_NFT')
                  }
                >
        
                  <div className="flex justify-center">
                    <Image
                      src={
                        nft?.metadata?.image
                          ? nft?.metadata?.image
                          : '/default-horse.png'
                      }
                      alt="nft"
                      height={20}
                      width={20}
                      loading="lazy"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="m-2 flex text-xs font-semibold text-white">
                    #{nft?.metadata?.id}
                  </div>
                </div>
              </>
            ))}
          </div>
          */}

          {/*
          </InfiniteScroll>

        )}

*/}
        </div>
      )}
    </>
  );
}
