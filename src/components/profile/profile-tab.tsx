import cn from 'classnames';
import ListCard from '@/components/ui/list-card';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import TransactionSearchForm from '@/components/author/transaction-search-form';
import TransactionHistory from '@/components/author/transaction-history';
import CollectionCard from '@/components/ui/collection-card';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
// static data
import { collections } from '@/data/static/collections';
import {
  authorWallets,
  authorNetworks,
  authorProtocols,
} from '@/data/static/author-profile';

import {
  nftDropContractAddress,
  stakingContractAddress,
  tokenContractAddress,
  marketplaceContractAddress,
} from '../../config/contractAddresses';

import { useEffect, useState } from 'react';

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

import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';

import { BigNumber, ethers } from 'ethers';

const tabMenu = [
  {
    title: 'Collection',
    path: 'collection',
  },
  /*
  {
    title: 'Portfolio',
    path: 'portfolio',
  },
  {
    title: 'History',
    path: 'history',
  },
  */
];

export default function ProfileTab() {
  const { layout } = useLayout();

  const address = useAddress();

  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    'nft-drop'
  );
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    'token'
  );

  const { contract: stakingContract, isLoading } = useContract(
    stakingContractAddress
  );

  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  // Connect to our marketplace contract via the useContract hook
  const { contract: contractMarketplace } = useContract(
    marketplaceContractAddress,
    //'marketplace',
    'marketplace-v3'
  );

  async function stakeNft(id: string) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );

    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }

    const data = await stakingContract?.call('stake', [id]);

    //console.log("data",data);
  }

  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

  const { data: stakedTokens } = useContractRead(
    stakingContract,
    'getStakeInfo',
    [address]
  );

  async function sellNft(id: string) {
    if (!address) return;

    /*
    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );

    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }

    const data = await stakingContract?.call('stake', [id]);
    */

    //console.log("data",data);

    const price = '0.2';

    try {
      const transaction =
        await contractMarketplace?.directListings.createListing({
          assetContractAddress: nftDropContractAddress, // Contract Address of the NFT
          tokenId: id, // Token ID of the NFT.
          //buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
          pricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
          currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
          //listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
          //quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
          startTimestamp: new Date(), // When the listing will start
          endTimestamp: new Date(
            new Date().getTime() + 7 * 24 * 60 * 60 * 1000
          ), // Optional - when the listing should end (default is 7 days from now)
        });

      return transaction;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ParamTab tabMenu={tabMenu}>
      <TabPanel className="focus:outline-none">
        <div
          className={cn(
            'grid gap-4 xs:grid-cols-2 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4',
            layout === LAYOUT_OPTIONS.RETRO
              ? 'md:grid-cols-2'
              : 'md:grid-cols-1'
          )}
        >
          {/*collections?.map((collection) => (

            <CollectionCard
              item={collection}
              key={`collection-key-${collection?.id}`}
            />

          ))*/}

          {/*
          {stakedTokens[0]?.map((nft) => (
            <div className="" key={nft.metadata.id.toString()}>
            <ThirdwebNftMedia
              metadata={nft.metadata}
              className="rounded-lg"
            />
            <h4>
              {nft.metadata.name} #{nft.metadata.id.toString()}
            </h4>

            <Web3Button
                contractAddress={stakingContractAddress}
                action={() => stakeNft(nft.metadata.id)}
              >
                Rent to Gwacheon Racetrack
              </Web3Button>

          </div>
          ))}
          */}

          {ownedNfts?.map((nft) => (
            <div className="" key={nft.metadata.id.toString()}>
              <ThirdwebNftMedia
                metadata={nft.metadata}
                className="rounded-lg"
              />
              <h4>{nft.metadata.name}</h4>

              <div className="flex flex-row gap-2">
                <Web3Button
                  contractAddress={stakingContractAddress}
                  action={() => stakeNft(nft.metadata.id)}
                >
                  Rent to Arena
                </Web3Button>

                <Web3Button
                  contractAddress={marketplaceContractAddress}
                  action={() => sellNft(nft.metadata.id)}
                >
                  Sell
                </Web3Button>
              </div>
            </div>
          ))}
        </div>
      </TabPanel>

      <TabPanel className="focus:outline-none">
        <div className="space-y-8 md:space-y-10 xl:space-y-12">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
            {authorWallets?.map((wallet) => (
              <ListCard
                item={wallet}
                key={`wallet-key-${wallet?.id}`}
                variant="medium"
              />
            ))}
          </div>
          <div className="block">
            <h3 className="text-heading-style mb-3 uppercase text-gray-900 dark:text-white">
              Protocols
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {authorProtocols?.map((protocol) => (
                <ListCard
                  item={protocol}
                  key={`protocol-key-${protocol?.id}`}
                  variant="large"
                />
              ))}
            </div>
          </div>
          <div className="block">
            <h3 className="text-heading-style mb-3 uppercase text-gray-900 dark:text-white">
              Networks
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
              {authorNetworks?.map((network) => (
                <ListCard
                  item={network}
                  key={`network-key-${network?.id}`}
                  variant="medium"
                />
              ))}
            </div>
          </div>
        </div>
      </TabPanel>

      <TabPanel className="focus:outline-none">
        <div className="space-y-8 xl:space-y-9">
          <TransactionSearchForm />
          <TransactionHistory />
        </div>
      </TabPanel>
    </ParamTab>
  );
}
