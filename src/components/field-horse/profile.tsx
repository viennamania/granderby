import cn from 'classnames';
import { useState, useEffect } from 'react';
import { useCopyToClipboard } from 'react-use';
import AuthorInformation from '@/components/author/author-information';
import { authorData } from '@/data/static/author';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import Button from '@/components/ui/button';
import AnchorLink from '@/components/ui/links/anchor-link';
import Avatar from '@/components/ui/avatar';
import ProfileTab from './profile-tab';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
  tokenContractAddressGRD,
} from '../../config/contractAddresses';

import {
  ConnectWallet,
  useDisconnect,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from '@thirdweb-dev/react';

import { BigNumber, ethers } from 'ethers';

import { Network, Alchemy } from 'alchemy-sdk';

import { StaticImageData } from 'next/image';

import AuthorImage from '@/assets/images/author.jpg';

import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';

import NFTGrid from '@/components/ui/nft-card-small';

import Races from '@/components/races/races';

export default function Profile() {
  const { isGridCompact } = useGridSwitcher();

  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();

  function handleCopyToClipboard() {
    copyToClipboard(authorData.wallet_key);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }

  const address = useAddress();

  const { contract: nftDropContract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

  const { contract: stakingContract, isLoading } = useContract(
    stakingContractAddressHorseAAA
  );

  useEffect(() => {
    if (!stakingContract || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await stakingContract?.call('getStakeInfo', [address]);
      ////const stakeInfo = await contract?.call("getStakeInfo", );
      setClaimableRewards(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, stakingContract]);

  const settings = {
    apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key.
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

  const [horses, setHorses] = useState<NFT[]>([]);

  const alchemy = new Alchemy(settings);

  useEffect(() => {
    const main = async () => {
      //Call the method to fetch metadata
      const response = await alchemy.nft.getNftsForContract(
        nftDropContractAddressHorse
      );

      //console.log('response', response);

      const NFTList = response.nfts.map((nft) => {
        const { contract, title, tokenType, tokenId, description, media } = nft;

        return {
          id: tokenId,
          author: contract.address,
          authorImage: AuthorImage,
          image: media[0]?.gateway
            ? media[0]?.gateway
            : 'https://via.placeholder.com/500',
          name: title,
          collection: contract.openSea?.collectionName
            ? contract.openSea?.collectionName
            : '',
          price: '0',
        };
      });

      setHorses(NFTList);
    };

    main();
  }, []);

  return (
    <div className="flex w-full flex-col pt-4 md:flex-row md:pt-10 lg:flex-row 3xl:pt-12">
      {/*
      <div
        className={cn(
          'grid  grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4 ',
          layout === LAYOUT_OPTIONS.RETRO
            ? 'md:grid-cols-2'
            : 'md:grid-cols-1'
        )}
      >
        {stakedTokens &&
          stakedTokens[0]?.map((stakedToken: BigNumber) => (
            <NFTCard
              tokenId={stakedToken.toNumber()}
              key={stakedToken.toString()}
            />
          ))}
      </div>
          */}

      {/*
    <div
      className={cn(
        'grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3',
        isGridCompact
          ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
          : '3xl:!grid-cols-3 4xl:!grid-cols-4',
        //className
      )}
    >
      */}

      <div className="mb-10 shrink-0 border-dashed border-gray-200 dark:border-gray-700 md:w-72 ltr:md:border-r md:ltr:pr-7 rtl:md:border-l md:rtl:pl-7 lg:ltr:pr-10 lg:rtl:pl-10 2xl:w-80 3xl:w-96 3xl:ltr:pr-14 3xl:rtl:pl-14">
        <h4>Race List</h4>

        <Races />
      </div>

      <div className=" shrink-0 border-dashed border-gray-200 dark:border-gray-700 md:w-72 ltr:md:border-r md:ltr:pr-7 rtl:md:border-l md:rtl:pl-7 lg:ltr:pr-10 lg:rtl:pl-10 2xl:w-80 3xl:w-96 3xl:ltr:pr-14 3xl:rtl:pl-14">
        <h4>Rented horses for field</h4>

        <div
          className={cn(
            'mt-5 grid grid-cols-6 gap-1 sm:grid-cols-2 md:grid-cols-3',
            '3xl:!grid-cols-4 4xl:!grid-cols-5'
          )}
        >
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
        </div>

        {!address ? (
          <></>
        ) : (
          <>
            {/*

              <h2 className="text-xl font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl">
                {authorData?.name}
              </h2>
              <div className="mt-1 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
                @{authorData?.user_name}
              </div>

              <div className="md:max-w-auto mx-auto mt-5 flex h-9 max-w-sm items-center rounded-full bg-white shadow-card dark:bg-light-dark md:mx-0 xl:mt-6">
                <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-gray-900 px-4 text-xs text-white sm:text-sm">
                  #{authorData?.id}
                </div>
                <div className="text truncate text-ellipsis bg-center text-xs text-gray-500 ltr:pl-4 rtl:pr-4 dark:text-gray-300 sm:text-sm">
                  {address}
                  
                </div>
                <div
                  title="Copy Address"
                  className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  onClick={() => handleCopyToClipboard()}
                >
                  {copyButtonStatus ? (
                    <Check className="h-auto w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-auto w-3.5" />
                  )}
                </div>
              </div>
                  */}

            {/*
              <div className="mt-3 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
                <span>Claimable Rewards for Horse</span>
                <h3>
                  <b>
                    {!claimableRewards
                      ? 'Loading...'
                      : ethers.utils.formatUnits(claimableRewards, 18)}
                  </b>{' '}
                  {tokenBalance?.symbol}
                </h3>

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
              </div>
                */}
          </>
        )}
      </div>

      <div className="grow pb-9 pt-6 md:-mt-2.5 md:pb-0 md:pt-1.5 md:ltr:pl-7 md:rtl:pr-7 lg:ltr:pl-10 lg:rtl:pr-10 3xl:ltr:pl-14 3xl:rtl:pr-14">
        {address && (
          <div className="text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
            <span>Current Balance</span>
            <h3>
              <b>{Number(tokenBalance?.displayValue).toFixed(2)}</b>{' '}
              {tokenBalance?.symbol}
            </h3>
          </div>
        )}

        <ProfileTab />
      </div>

      {/*
      <AuthorInformation data={authorData} />
                */}
    </div>
  );
}
