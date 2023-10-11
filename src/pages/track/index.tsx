import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import Image from '@/components/ui/image';
import Avatar from '@/components/ui/avatar';

import Profile from '@/components/rent-track/profile';

import RetroProfile from '@/components/rent-track/retro-profile';
// static data
import { authorData } from '@/data/static/authorTrack';
import RootLayout from '@/layouts/_root-layout';

import AnchorLink from '@/components/ui/links/anchor-link';

import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';

import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
//import { Check } from '@/components/icons/check';
//import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';

import { GrdIcon } from '@/components/icons/grd-icon';

import { useState, useEffect } from 'react';

import TransactionTable from '@/components/ft-transaction/transfer-table';

import RegisteredFeeds from '@/components/search/feeds-horse-registered-hv';
import {
  Filters,
  GridSwitcher,
  SortList,
} from '@/components/search/filters-horse';

import { OptionIcon } from '@/components/icons/option';
import Button from '@/components/ui/button';

import CollapseLastWinners from '@/components/ui/collapse-last-winners';
import LastWinners from '@/components/horseRace/watchScreen/lastWinnersGranderby';

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
  useTransferToken,
} from '@thirdweb-dev/react';

import {
  tokenContractAddressHV,
  tokenContractAddressGRD,
  stakingContractAddressHorseAAA,
} from '@/config/contractAddresses';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const TrackPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { layout } = useLayout();

  const address = useAddress();

  const [isSending, setIsSending] = useState(false);

  const { contract: tokenContractHV } = useContract(
    tokenContractAddressHV,
    'token'
  );

  const { data: tokenBalanceHV } = useTokenBalance(tokenContractHV, address);

  const [status, setStatus] = useState<any>(false);
  const [npcNames, setNpcNames] = useState<any>([]);

  useEffect(() => {
    if (status === false) {
      ////deleteCookie('horse');
      //toast.success('status false')
    }

    async function getNpcNames() {
      const npcNamesResponse = await fetch(
        `/api/games/horseRace/settings/horseNames?method=all`
      );
      const response = await npcNamesResponse.json();

      ///console.log('getNpcNames response', response);

      //const data = useOwnedNFTs(nftDropContractHorse, address);

      setNpcNames(response.npcNames[0]);
    }

    getNpcNames();
  }, [status]);

  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState();

  const { contract: tokenContractGRD } = useContract(
    tokenContractAddressGRD,
    'token'
  );

  const { data: tokenBalanceGRD } = useTokenBalance(
    tokenContractGRD,
    stakingContractAddressHorseAAA
  );

  console.log('tokenBalanceGRD', tokenBalanceGRD);

  const { contract: contractStaking, isLoading: isLoadingContractStaking } =
    useContract(stakingContractAddressHorseAAA);

  /*
  const { data: stakerAddress, isLoading } = useContractRead(
    contractStaking,
    'stakerAddress',
    [tokenId]
  );
  */

  /*
  const { data: rewardTokenBalance, isLoading } = useContractRead(
    contractStaking,
    "getRewardTokenBalance",
    []
  );
  
  console.log('rewardTokenBalance', rewardTokenBalance);
    */

  async function transferToken(toAddress: string, amount: number) {
    if (toAddress === '') {
      alert(`🌊 Please enter a valid address`);
      return;
    }

    if (amount === undefined || amount === 0) {
      alert(`🌊 Please enter a valid amount`);
      return;
    }

    setIsSending(true);

    try {
      const transaction = await tokenContractHV?.erc20.transfer(
        toAddress,
        amount
      );

      console.log(`🌊 Sent transaction with hash: ${transaction?.receipt}`);

      //alert (`🌊 Sent transaction with hash: ${transaction?.receipt}`);

      alert(`🌊 Successfully transfered!`);

      setIsSending(false);

      setAmount(0);
      setToAddress('');

      //router.reload();

      return transaction;
    } catch (error) {
      console.error(error);

      alert(`🌊 Failed to send transaction with hash: ${error}`);

      setIsSending(false);
    }
  }

  return (
    <>
      <NextSeo title="Profile" description="Granderby - Web3 NFT Game" />

      <div
        className="relative h-36 w-full overflow-hidden rounded-lg
          sm:h-44
          md:h-64
          xl:h-80
          2xl:h-96
          3xl:h-[448px]"
      >
        <Image
          src={authorData?.cover_image?.thumbnail}
          placeholder="blur"
          fill
          //className="object-fill"
          className="h-full w-full object-cover"
          alt="Cover Image"
        />
      </div>

      <div className=" mx-auto flex w-full shrink-0 flex-col items-center justify-center md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        {/*
        {!address ? (
          <></>
        ) : (
          
          <Avatar
            size="xl"
            image={authorData?.avatar?.thumbnail}
            alt="Author"
            className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
          />
        )}
        */}

        {/*
        <Profile />
        */}

        {/*
        <div className="flex flex-row items-center justify-center gap-2 text-center text-3xl font-bold tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
          <span className="text-lg text-[#2b57a2] ">Total Profit:</span>
          <b>
            {tokenBalanceGRD === undefined ? (
              <>Loading...</>
            ) : (
              <div className="m-2 text-5xl font-bold xl:text-7xl">
                {Number(tokenBalanceGRD?.displayValue).toFixed(2)}
              </div>
            )}
          </b>{' '}
          <span className="text-lg text-[#2b57a2] ">
            {tokenBalanceGRD?.symbol}
          </span>
        </div>
          */}

        <h3 className="mb-2 mt-10 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
          My Balance
        </h3>

        {address ? (
          <div className="mb-7 flex flex-row items-center justify-center gap-2 text-center text-3xl font-bold tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
            <GrdIcon className="h-auto w-8 lg:w-auto" />
            <b>
              {tokenBalanceHV === undefined ? (
                <>Loading...</>
              ) : (
                <div className="m-5 text-5xl font-bold xl:text-7xl">
                  {Number(tokenBalanceHV?.displayValue).toFixed(2)}
                </div>
              )}
            </b>{' '}
            <span className="text-lg text-[#2b57a2] ">
              {tokenBalanceHV?.symbol}
            </span>
          </div>
        ) : (
          <div className="mb-7 text-center text-2xl font-bold tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
            <ConnectWallet theme="light" />
          </div>
        )}

        <div className=" flex w-96 flex-col items-center justify-center text-lime-600">
          {/* Form Section */}

          <div className="mb-2 text-lg">Send my HV to another address:</div>

          {/* NFT Contract Address Field */}
          <input
            className="mb-2 w-full text-black"
            type="text"
            name="toAddress"
            placeholder="To Address"
            value={toAddress}
            onChange={(e) => {
              setToAddress(e.target.value);
            }}
          />

          <div className="mb-3 text-lg"></div>

          <input
            className=" w-full text-right text-5xl font-bold text-lime-600"
            type="number"
            name="amount"
            placeholder="0"
            value={amount}
            onChange={(e) => {
              if (e.target.value === null) setAmount(undefined);
              else if (Number(e.target.value) === 0) setAmount(undefined);
              else if (Number(e.target.value) < 0) setAmount(undefined);
              else if (
                Number(e.target.value) > Number(tokenBalanceHV?.displayValue)
              ) {
                setAmount(Number(tokenBalanceHV?.displayValue));
              } else {
                setAmount(Number(e.target.value));
              }
            }}
          />

          {address && (
            <div className="mb-3 text-lg">
              {(Number(tokenBalanceHV?.displayValue) - (amount || 0)).toFixed(
                2
              )}{' '}
              {tokenBalanceHV?.symbol} left
            </div>
          )}

          {address ? (
            <div className="mt-5 flex flex-row justify-center">
              {/*{isTransferTokensLoading ? (*/}

              {isSending ? (
                <div className="flex flex-row items-center justify-center gap-2">
                  <div className="animate-spin">
                    <GrdIcon className="h-35 w-35" />
                  </div>
                  <div className="flex flex-col items-center justify-center text-2xl font-bold text-orange-600">
                    <span>
                      Sending {amount} {tokenBalanceHV?.symbol} to
                    </span>
                    <span className="text-xs">{toAddress}</span>
                    <span>Please wait...</span>
                  </div>
                </div>
              ) : (
                <>
                  <Web3Button
                    theme="light"
                    contractAddress={tokenContractAddressHV}
                    action={(contract) => {
                      //contract?.call('withdraw', [[nft.metadata.id]])
                      //contract?.call('withdraw', [[nft.metadata.id]])
                      //contract.erc1155.claim(0, 1);

                      ///contract.erc20.transfer(toAddress, amount);

                      transferToken(toAddress, amount);

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
                    Transfer ({amount} HV)
                  </Web3Button>
                </>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>

        {/*}

        <div className="mt-5 flex items-center justify-center">
          <CollapseLastWinners label="Last Race Winners">
            <div className=" rounded-md  bg-black">
              <LastWinners npcs={npcNames} status={status} />
            </div>
            <div></div>
          </CollapseLastWinners>
        </div>

        <div className="mt-10 2xl:ltr:pl-8 2xl:rtl:pr-8 4xl:ltr:pl-10 4xl:rtl:pr-10">
          <span className=" text-lg font-bold text-gray-500 dark:text-gray-400">
            Registered Horses
          </span>

          <RegisteredFeeds />
        </div>
          */}

        {/*
        <div className="mx-auto mt-8 flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
          <TransactionTable {...{ contractAddress: tokenContractAddressHV }} />
        </div>
        */}
      </div>
    </>
  );
};

TrackPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default TrackPage;
