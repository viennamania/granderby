import cn from 'classnames';
import ListCard from '@/components/ui/list-card';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import TransactionSearchForm from '@/components/author/transaction-search-form';
import TransactionHistory from '@/components/author/transaction-history';
import CollectionCard from '@/components/ui/collection-card';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

import AnchorLink from '@/components/ui/links/anchor-link';
import routes from '@/config/routes';
import { ExternalLink } from '@/components/icons/external-link';

// static data
import { collections } from '@/data/static/collections';
import {
  authorWallets,
  authorNetworks,
  authorProtocols,
} from '@/data/static/author-profile';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
  tokenContractAddressGRD,
  marketplaceContractAddress,
  marketplaceContractAddressChaoscube,
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
  useCreateDirectListing,
} from '@thirdweb-dev/react';

import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';

import { BigNumber, ethers } from 'ethers';

import NFTCard from '../nft-horse/NFTCard';

import { Stack, Snackbar, Alert } from '@mui/material';

import dynamic from 'next/dynamic';

import Image from 'next/image';

import Button from '@/components/ui/button';
import { Close } from '@/components/icons/close';
import { Router } from 'next/router';

import { useRouter } from 'next/router';

const tabMenu = [
  {
    title: 'collection',
    path: 'collection',
  },

  /*
  {
    title: 'Unregistered',
    path: 'unregistered',
  },
  */
  /*
  {
    title: 'History',
    path: 'history',
  },
  */
];

const MessageSnackbar = dynamic(
  () => import('@/components/ui/message-snackbar'),
  { ssr: false }
);

export default function ProfileTab() {
  const router = useRouter();

  const [errMsgSnackbar, setErrMsgSnackbar] = useState<String>('');
  const [successMsgSnackbar, setSuccessMsgSnackbar] = useState<String>('');
  const [succ, setSucc] = useState(false);
  const [err, setErr] = useState(false);

  const handleClickSucc = () => {
    setSucc(true);
  };

  const handleClickErr = () => {
    setErr(true);
  };

  const handleCloseSucc = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSucc(false);
  };

  const handleCloseErr = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setErr(false);
  };

  const { layout } = useLayout();

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

  const { contract: stakingContract, isLoading } = useContract(
    stakingContractAddressHorseAAA
  );

  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  // Connect to our marketplace contract via the useContract hook

  const { contract: contractMarketplace } = useContract(
    marketplaceContractAddress,
    'marketplace-v3'
  );

  const {
    mutateAsync: createDirectListing,
    isLoading: isLoadingSell,
    error,
  } = useCreateDirectListing(contractMarketplace);

  const { contract: contractMarketplaceChaoscube } = useContract(
    marketplaceContractAddressChaoscube,
    'marketplace-v3'
  );

  const {
    mutateAsync: createDirectListingChaoscube,
    isLoading: isLoadingSellChaoscube,
    error: errorChaoscube,
  } = useCreateDirectListing(contractMarketplaceChaoscube);

  async function stakeNft(id: string) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddressHorseAAA
    );

    //onsole.log('isApproved', isApproved);

    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(
        stakingContractAddressHorseAAA,
        true
      );
    }

    const data = await stakingContract?.call('stake', [[id]]);

    //console.log('staking data', data);

    if (data) {
      setSuccessMsgSnackbar('Your request has been sent successfully');
      handleClickSucc();
    } else {
      setErrMsgSnackbar(data);
      handleClickErr();
    }
  }

  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

  const { data: stakedTokens } = useContractRead(
    stakingContract,
    'getStakeInfo',
    [address]
  );

  //console.log('stakedTokens', stakedTokens);

  async function sellNft(id: string) {
    if (!address) return;

    /*
    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddressHorseAAA
    );

    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddressHorseAAA, true);
    }

    const data = await stakingContract?.call('stake', [id]);
    */

    //console.log("data",data);

    const price = '0.2';

    try {
      const transaction =
        await contractMarketplace?.directListings.createListing({
          assetContractAddress: nftDropContractAddressHorse, // Contract Address of the NFT
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
    <>
      <ParamTab tabMenu={tabMenu}>
        <TabPanel className="focus:outline-none  ">
          <h3 className="mt-10 flex justify-center">Owned Item</h3>

          <div className="justify-right mb-5 flex h-16 items-center gap-6 border border-b border-dashed border-gray-200 px-6 dark:border-gray-700">
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
          </div>

          {address && !ownedNfts ? (
            <>
              <div className="w-full text-center text-xl">{'Loading...'}</div>
            </>
          ) : (
            <div
              className={cn(
                'grid grid-cols-3 gap-4 xs:grid-cols-3  lg:grid-cols-4 lg:gap-5 xl:gap-6 3xl:grid-cols-5 4xl:grid-cols-5 ',
                layout === LAYOUT_OPTIONS.RETRO
                  ? 'md:grid-cols-2'
                  : 'md:grid-cols-4'
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
              contractAddress={stakingContractAddressHorseAAA}
              action={() => stakeNft(nft.metadata.id)}
            >
              Unregister from Racetrack
            </Web3Button>

          </div>

        ))}
        */}

              {ownedNfts?.map((nft) => (
                <div
                  className="mb-5 flex flex-col  items-center justify-center gap-3"
                  key={nft.metadata.id.toString()}
                ></div>
              ))}
            </div>
          )}
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

      {/*

    <MessageSnackbar open={true} autoHideDuration={5000} onClose={handleCloseSucc} severity ={"success"}/>
              */}
      {/*
    <MessageSnackbar
        open={succ}
        autoHideDuration={6000}
        onClose={handleCloseSucc}
        severity ={"success"}
    >
      <Alert
        onClose={handleCloseSucc}
        severity="success"
        sx={{ width: "100%" }}
      >
        {successMsgSnackbar}
      </Alert>
    </MessageSnackbar>
              */}

      {/*
    
    <Stack spacing={2} sx={{ width: "100%" }}>
              */}

      {/*
      <Snackbar
        open={succ}
        autoHideDuration={6000}
        onClose={handleCloseSucc}
      >
        <Alert
          onClose={handleCloseSucc}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMsgSnackbar}
        </Alert>
      </Snackbar>

      <Snackbar
          open={err}
          autoHideDuration={6000}
          onClose={handleCloseErr}>
        <Alert
          onClose={handleCloseErr}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errMsgSnackbar}
        </Alert>
      </Snackbar>
            */}

      {/*
    </Stack>
  */}
    </>
  );
}
