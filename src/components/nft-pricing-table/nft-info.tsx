import { coinIdData } from '@/data/static/coin-id';
import { CoinExplore } from '@/data/static/coin-list';
import React, { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';
import AnchorLink from '@/components/ui/links/anchor-link';
import Explorers from '@/components/cryptocurrency-pricing-table/explorers';

import Link from 'next/link';

import PriceHistoryTable from '@/components/nft-transaction/price-history-table';
import RaceHistoryTable from '@/components/nft-transaction/race-history-table';

import Image from 'next/image';
import Button from '@/components/ui/button/button';
import { useRouter } from 'next/router';

import Collapse from '@/components/ui/collapse';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
  marketplaceContractAddress,
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
  Web3Button,
} from '@thirdweb-dev/react';

import { RaceIcon } from '@/components/icons/race-icon';

function NftInfo({ nftMetadata }: any) {
  ///console.log('nftMetadata', nftMetadata);

  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();
  function handleCopyToClipboard() {
    copyToClipboard(coinIdData.api_id);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }

  const router = useRouter();

  const address = useAddress();

  const { contract: nftDropContract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );

  const { contract: contractStaking, isLoading: isLoadingContractStaking } =
    useContract(stakingContractAddressHorseAAA);

  const { data: stakerAddress, isLoading } = useContractRead(
    contractStaking,
    'stakerAddress',
    [nftMetadata?.metadata?.id]
  );

  ///console.log("stakerAddress", stakerAddress);

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
      stakingContractAddressHorseAAA
    );

    //onsole.log('isApproved', isApproved);

    if (!isApproved) {
      const data = await nftDropContract?.setApprovalForAll(
        stakingContractAddressHorseAAA,
        true
      );

      alert(data);
    }

    const data = await contractStaking?.call('stake', [[id]]);

    //console.log('staking data', data);

    if (data) {
      alert('Your request has been sent successfully');
      /*
      setSuccessMsgSnackbar('Your request has been sent successfully');
      handleClickSucc();
      */
    } else {
      alert(data);
      /*
      setErrMsgSnackbar(data);
      handleClickErr();
      */
    }
  }

  const [toAddress, setToAddress] = useState('');
  const [isSending, setIsSending] = useState(false);

  async function transferNft(id: string, toAddress: string) {
    if (id === undefined) {
      alert(`🌊 Please enter a valid tokenId`);
      return;
    }

    if (toAddress === '') {
      alert(`🌊 Please enter a valid address`);
      return;
    }

    setIsSending(true);

    try {
      const transaction = await nftDropContract?.erc721.transfer(toAddress, id);

      console.log(`🌊 Sent transaction with hash: ${transaction?.receipt}`);

      //alert (`🌊 Sent transaction with hash: ${transaction?.receipt}`);

      alert(`🌊 Successfully transfered!`);

      setIsSending(false);

      setToAddress('');

      return transaction;
    } catch (error) {
      console.error(error);

      alert(`🌊 Failed to send transaction with hash: ${error}`);

      setIsSending(false);
    }
  }

  return (
    <div className="px-5 pb-0 lg:mt-0">
      {/*{nftMetadata?.owner === address && (*/}
      <div>
        {nftMetadata?.owner === address && (
          <div className="mt-2 flex flex-row items-center justify-center gap-2">
            <div className=" flex flex-row justify-center">
              {/*{isTransferTokensLoading ? (*/}

              {isSending ? (
                <div className="flex flex-row items-center justify-center gap-2">
                  <div className="animate-spin">
                    <RaceIcon className="h-35 w-35" />
                  </div>
                  <div className="flex flex-col items-center justify-center text-2xl font-bold text-orange-600">
                    <span>Sending #{nftMetadata?.metadata?.id} to</span>
                    <span>Please wait...</span>
                  </div>
                </div>
              ) : (
                <>
                  <Web3Button
                    theme="light"
                    contractAddress={nftDropContractAddressHorse}
                    action={() => {
                      //contract?.call('withdraw', [[nft.metadata.id]])
                      //contract?.call('withdraw', [[nft.metadata.id]])
                      //contract.erc1155.claim(0, 1);

                      ///contract.erc20.transfer(toAddress, amount);

                      transferNft(nftMetadata?.metadata?.id, toAddress);

                      /*
                          transferTokens({
                            to: toAddress, // Address to transfer to
                            amount: amount, // Amount to transfer
                          })
                          */
                    }}
                    onSuccess={() => {
                      //setAmount(0);
                      //setToAddress('');

                      console.log(`🌊 Successfully transfered!`);
                      //alert('Successfully transfered!');

                      //setSuccessMsgSnackbar('Your request has been sent successfully' );
                      //handleClickSucc();
                    }}
                    onError={(error) => {
                      console.error('Failed to transfer', error);
                      alert('Failed to transfer');
                      //setErrMsgSnackbar('Failed to transfer');
                      //handleClickErr();
                    }}
                  >
                    Transfer
                  </Web3Button>
                </>
              )}
            </div>

            <input
              className=" w-full text-black"
              type="text"
              name="toAddress"
              placeholder="To Address"
              value={toAddress}
              onChange={(e) => {
                setToAddress(e.target.value);
              }}
            />
          </div>
        )}

        <div className="ml-2 mt-2 flex flex-row items-center justify-start gap-2">
          <div className=" flex flex-row justify-center">Data Source:</div>
          <Button
            className=" flex"
            title="Go"
            color="white"
            shape="rounded"
            variant="transparent"
            size="small"
            onClick={() => {
              router.push('https://granderby.market/');
            }}
          >
            <div className="flex flex-row gap-2">
              <Image
                src="/images/market.png"
                alt="market"
                width={24}
                height={24}
              />
              <span className="text-lg font-bold">Marketplace</span>
            </div>
          </Button>
        </div>

        <Collapse label="Price History" initialOpen={true}>
          <PriceHistoryTable nftMetadata={nftMetadata} />
        </Collapse>

        <div className="ml-2 mt-2 flex flex-row items-center justify-start gap-2">
          <div className=" flex flex-row justify-center">Data Source:</div>
          <Button
            className=" flex"
            title="Go"
            color="white"
            shape="rounded"
            variant="transparent"
            size="small"
            onClick={() => {
              router.push('http://www.inkent.co.kr/');
            }}
          >
            <div className="flex flex-row gap-2">
              <Image
                src="/images/inkent.jpeg"
                alt="market"
                width={84}
                height={10}
              />
              <span className="text-lg font-bold">Inkent</span>
            </div>
          </Button>
        </div>

        <Collapse label="Race History" initialOpen={true}>
          <RaceHistoryTable />
        </Collapse>
      </div>

      {/*
      <div className="mt-[10px] flex items-center gap-4">
        <div className="w-[100px] text-sm tracking-wider text-[#6B7280]">
          Explorers
        </div>
        <Explorers menu={CoinExplore} />
      </div>
      */}

      {/*
      <div className="mt-[10px] flex items-start gap-4">
        <div className="w-[100px] shrink-0 grow-0 basis-auto text-sm tracking-wider text-[#6B7280]">
          Wallets
        </div>
        <div className="flex flex-wrap items-center gap-[5px]">
          <span className="rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
            Ledger
          </span>
          <span className="rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
            Trezor
          </span>
          <span className="rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
            Xdefi
          </span>
          <span className="rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
            Coin98
          </span>
        </div>
      </div>
      <div className="mt-[10px] flex items-start gap-4">
        <div className="w-[100px] shrink-0 grow-0 basis-auto text-sm tracking-wider text-[#6B7280]">
          Community
        </div>
        <div className="flex flex-wrap items-center gap-[5px]">
          <AnchorLink
            href="https://reddit.com/r/bitcoin"
            target="_blank"
            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </AnchorLink>
          <AnchorLink
            href="https://twitter.com/bitcoin"
            target="_blank"
            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
          >
            <Twitter className="h-4 w-4" /> Twitter
          </AnchorLink>
        </div>
      </div>
      <div className="mt-[10px] flex items-center gap-4">
        <div className="w-[100px] text-sm tracking-wider text-[#6B7280]">
          Search on
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
          <SearchIcon /> Twitter
        </div>
      </div>
      <div className="mt-[10px] flex items-center gap-4">
        <div className="w-[100px] text-sm tracking-wider text-[#6B7280]">
          Source Code
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
          <Github /> Github
        </div>
      </div>
      <div className="mt-[10px] flex items-center gap-4">
        <div className="w-[100px] text-sm tracking-wider text-[#6B7280]">
          Api Id
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
          bitcoin
          <div title="Copy Address" onClick={() => handleCopyToClipboard()}>
            {copyButtonStatus ? (
              <Check className="h-auto w-3.5 text-green-500" />
            ) : (
              <Copy className="h-auto w-3.5" />
            )}
          </div>
        </div>
      </div>
      <div className="mt-[10px] flex items-center gap-4">
        <div className="w-[100px] text-sm tracking-wider text-[#6B7280]">
          Tags
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
          Cryptocurrency
        </div>
      </div>
      */}
    </div>
  );
}

export default NftInfo;
