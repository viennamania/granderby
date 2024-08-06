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

import { useState, useEffect, use } from 'react';

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

import toast from 'react-hot-toast';

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
  useNFT,
} from '@thirdweb-dev/react';

import {
  //tokenContractAddressHV,

  nftContractAddressHV,
} from '@/config/contractAddresses';

import ClaimHistoryTable from '@/components/nft-transaction/claim-history-table-track';

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

  const { contract: nftContractHV } = useContract(
    nftContractAddressHV,
    'edition-drop'
  );

  ///const { data: nftBalanceHV } = useTokenBalance(nftContractHV, address);

  // balance of erc1155
  //const ( data: nftBalanceHV } = useTokenBalance(nftContractHV, address);

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

  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState();

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
      const transaction = await nftContractHV?.erc1155.transfer(
        toAddress,
        0,
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

  const [claiming, setClaiming] = useState(false);

  const [sumOfBalance, setSumOfBalance] = useState<any>(0);
  useEffect(() => {
    const getSumOfBalance = async () => {
      const res = await fetch('/api/nft/getSumOfStadiumBalance');
      const data = await res.json();

      ///console.log('getSumOfBalance data', data);

      if (data?.recordsets[0][0]?.SumOfBalance === null) {
        return;
      }

      const totalBalance = Number(data?.recordsets[0][0]?.SumOfBalance);

      ///setSumOfBalance(data?.recordsets[0][0]?.SumOfBalance);

      setSumOfBalance(totalBalance * (nftBalanceHV / 5000));
    };

    getSumOfBalance();

    // time interval
    const interval = setInterval(() => {
      getSumOfBalance();
    }, 10000);

    return () => clearInterval(interval);
  }, [nftBalanceHV]);

  console.log('address=====', address);

  return (
    <div className="flex-cols flex w-full items-start justify-center gap-5 xl:grid xl:grid-cols-2 ">
      <NextSeo title="Profile" description="Granderby - Web3 NFT Game" />

      {/*
      <div
        className="
          relative h-36 w-full overflow-hidden rounded-lg
          sm:h-44
          md:h-64
          xl:h-80
          2xl:h-96
          3xl:h-[448px]"
      >
      */}

      <div className="flex w-full items-center justify-center ">
        {/*
        <Image
          //src={authorData?.cover_image?.thumbnail}
          src="https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/NFT_HappyValley.png"
          //placeholder="blur"
          //fill

          width={1920}
          height={1080}
          //lassName="object-fill"
          className="h-full w-full object-cover"
          alt="Cover Image"
        />
        */}
        {/* mp4 video */}

        <video
          autoPlay
          loop
          muted
          playsInline
          //className="h-full w-full object-cover"
          className=" h-full w-full rounded-lg object-cover"
        >
          <source
            src="https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/JoyValley.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div
        className=" mx-auto flex w-full shrink-0 flex-col items-center justify-center rounded-lg border-2
        border-gray-200 dark:border-gray-800 md:px-4 xl:px-6
       "
      >
        <div className="mt-10 flex w-full flex-row items-center justify-center gap-20 p-3">
          <div className="flex flex-col items-center justify-center gap-5">
            <span className="text-xl font-bold">ALLOWANCE</span>
            <Image
              src="/images/icon-gdp.png"
              alt="sugar"
              width={30}
              height={30}
            />
          </div>

          <div className="flex flex-row items-center justify-between gap-5 rounded-lg  bg-slate-100 p-5 ">
            <span className="text-xl font-bold xl:text-2xl">
              {
                //sumOfBalance?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

                sumOfBalance?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }{' '}
              GDP
            </span>

            <Button
              disabled={claiming}
              isLoading={claiming}
              className="h-8 bg-green-500 font-normal text-gray-600 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white "
              onClick={() => {
                async function claim() {
                  setClaiming(true);
                  const response = await fetch(
                    '/api/nft/claimTrackBalanceByHolder',
                    {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        holderAddress: address,
                      }),
                    }
                  );

                  const data = await response.json();

                  const claimedBalance = data?.claimedBalance || 0;

                  if (claimedBalance === 0) {
                    toast.error(
                      <div className=" flex flex-col items-center justify-center gap-5 p-5">
                        <span className="text-xl font-extrabold">
                          No balance to collect
                        </span>
                      </div>,

                      {
                        duration: 5000,
                      }
                    );

                    //setClaiming(false);

                    return;
                  }

                  //setGameHorseBalance(data?.balance || 0);

                  //setGameHorseLatestAmount(data?.latestAmount || 0);

                  //setGameHorseAccumulatedBalance(data?.accumulatedBalance || 0);

                  //setGameHorseBalance(0);

                  setClaiming(false);

                  //setTotalBalanceHorse(0);

                  toast.success(
                    <div className=" flex flex-col items-center justify-center gap-5 p-5">
                      <span className="text-xl font-extrabold">
                        Claim Success
                      </span>
                      <span className="text-xl font-extrabold">
                        {claimedBalance.toLocaleString()} GDP
                      </span>
                    </div>,

                    {
                      duration: 5000,
                    }
                  );
                }

                claim();
              }}
            >
              <span className="flex items-center gap-2 font-extrabold ">
                Collect All
              </span>
            </Button>
          </div>
        </div>

        <h3 className="mb-2 mt-10 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
          My NFTs
        </h3>

        {address ? (
          <div className="mb-7 flex flex-col items-center justify-center gap-2 text-center text-3xl font-bold tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
            {/*
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
            */}

            <div className="mb-2 text-lg">{nftBalanceHV}</div>

            {/* claim history table  format */}
            <div className="flex w-96 flex-col items-center justify-center gap-2">
              <ClaimHistoryTable holderAddress={address} />
            </div>
          </div>
        ) : (
          <div className="mb-7 text-center text-2xl font-bold tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
            <ConnectWallet theme="light" />
          </div>
        )}

        <div className=" flex w-96 flex-col items-center justify-center text-lime-600">
          {/* Form Section */}

          <div className="mb-2 text-lg">Send my NFT to another address:</div>

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
              else if (Number(e.target.value) > Number(nftBalanceHV)) {
                setAmount(nftBalanceHV);
              } else {
                setAmount(Number(e.target.value));
              }
            }}
          />

          {address && (
            <div className="mb-3 text-lg">
              {/*
              {(Number(tokenBalanceHV?.displayValue) - (amount || 0)).toFixed(
                2
              )}{' '}
              {tokenBalanceHV?.symbol} left
              */}
              {nftBalanceHV} left
            </div>
          )}

          {address ? (
            <div className="mb-10 mt-5 flex flex-row justify-center">
              {/*{isTransferTokensLoading ? (*/}

              {isSending ? (
                <div className="flex flex-row items-center justify-center gap-2">
                  <div className="animate-spin">
                    <GrdIcon className="h-35 w-35" />
                  </div>
                  <div className="flex flex-col items-center justify-center text-2xl font-bold text-orange-600">
                    <span>Sending {amount} to</span>
                    <span className="text-xs">{toAddress}</span>
                    <span>Please wait...</span>
                  </div>
                </div>
              ) : (
                <>
                  <Web3Button
                    theme="light"
                    contractAddress={nftContractAddressHV}
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
                    Transfer ({amount} NFT)
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
    </div>
  );
};

TrackPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default TrackPage;
