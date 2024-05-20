import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import Image from '@/components/ui/image';
import Avatar from '@/components/ui/avatar';

import RetroProfile from '@/components/profile/retro-profile';
// static data
import { authorData } from '@/data/static/author';

import RootLayout from '@/layouts/_root-layout';

import routes from '@/config/routes';
import { useRouter } from 'next/router';

import React, { useState, useEffect } from 'react';

import { Alert, Snackbar, Stack } from '@mui/material';

import dynamic from 'next/dynamic';

import SwapTable from '@/components/ft-transaction/swap-table-admin';

import { useCopyToClipboard } from 'react-use';
import { Copy } from '@/components/icons/copy';
import { Check } from '@/components/icons/check';

///import { QrReader } from "react-qr-reader";

import { Html5Qrcode } from 'html5-qrcode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import styles2 from '@/styles/EWallet.module.css';

import { GdpIcon } from '@/components/icons/gdp-icon';

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
  ThirdwebSDK,
  ChainId,
  NATIVE_TOKEN_ADDRESS,
  TransactionResult,
} from '@thirdweb-dev/sdk';

import {
  tokenContractAddressUSDC,
  tokenContractAddressUSDT,
  tokenContractAddressGDP,
  marketplaceContractAddress,
} from '@/config/contractAddresses';

import { BigNumber, ethers } from 'ethers';

import styles from '@/styles/Home.module.css';
import { add, set } from 'lodash';

import CoinInput from '@/components/ui/coin-input';

/*
const readOnlySdk = new ThirdwebSDK("goerli", {
  clientId: "YOUR_CLIENT_ID", // Use client id if using on the client side, get it from dashboard settings
  secretKey: "YOUR_SECRET_KEY", // Use secret key if using on the server, get it from dashboard settings
});
*/

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const WalletPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { layout } = useLayout();

  const router = useRouter();

  const [isSending, setIsSending] = useState(false);

  const address = useAddress();

  const { contract: tokenContractGDP } = useContract(
    tokenContractAddressGDP,
    'token'
  );

  const { data: tokenBalanceGDP } = useTokenBalance(tokenContractGDP, address);

  const {
    mutate: transferTokens,
    isLoading,
    error,
  } = useTransferToken(tokenContractGDP);

  const { contract: tokenContractUSDT } = useContract(
    tokenContractAddressUSDT,
    'token'
  );
  const { data: tokenBalanceUSDT } = useTokenBalance(
    tokenContractUSDT,
    address
  );

  const { contract: tokenContractUSDC } = useContract(
    tokenContractAddressUSDC,
    'token'
  );
  const { data: tokenBalanceUSDC } = useTokenBalance(
    tokenContractUSDC,
    address
  );

  const [toAddress, setToAddress] = useState('');

  const [receiverAddress, setReceiverAddress] = useState('');

  const [amount, setAmount] = useState(0);

  const [fee, setFee] = useState(0);

  const [sumDay, setSumDay] = useState(0);

  useEffect(() => {
    const getSumDay = async () => {
      const response = await fetch('/api/ft/swapSumDay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromWallet: address,
        }),
      });

      const data = await response.json();

      console.log('🌊 getSumDay', data);

      setSumDay(data.sumDay);
    };

    if (address) {
      getSumDay();
    }
  }, [address]);

  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();
  function handleCopyToClipboard() {
    copyToClipboard(address);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }

  const [modal2, setModal2] = useState(false);

  const [result, setResult] = useState('');

  const [msg, setMsg] = useState('');

  const [errMsgSnackbar, setErrMsgSnackbar] = useState<String>('');
  const [successMsgSnackbar, setSuccessMsgSnackbar] = useState<String>('');
  const [succ, setSucc] = useState(false);
  const [err, setErr] = useState(false);

  const [sumOfWithDraw, setSumOfWithDraw] = useState<any>(0);
  useEffect(() => {
    const getSumOfWithDraw = async () => {
      const res = await fetch('/api/nft/getSumOfWithDraw');
      const data = await res.json();

      console.log('data', data);

      setSumOfWithDraw(data?.recordsets[0][0]?.SumOfWithDraw);
    };

    getSumOfWithDraw();

    // time interval
    const interval = setInterval(() => {
      getSumOfWithDraw();
    }, 10000);
  }, []);

  const [sumOfBalance, setSumOfBalance] = useState<any>(0);
  useEffect(() => {
    const getSumOfBalance = async () => {
      const res = await fetch('/api/nft/getSumOfBalance');
      const data = await res.json();

      console.log('data', data);

      setSumOfBalance(data?.recordsets[0][0]?.SumOfBalance);
    };

    getSumOfBalance();

    // time interval
    const interval = setInterval(() => {
      getSumOfBalance();
    }, 10000);
  }, []);

  // get sum of swap
  const [sumSwapFrom, setSumSwapFrom] = useState<any>(0);
  const [sumSwapTo, setSumSwapTo] = useState<any>(0);

  useEffect(() => {
    const getSumSwap = async () => {
      const res = await fetch('/api/ft/getSumOfSwap');
      const data = await res.json();

      console.log('data', data);

      setSumSwapFrom(data?.sumSwap?.fromAmount);
      setSumSwapTo(data?.sumSwap?.toAmount);
    };

    getSumSwap();

    // time interval
    //const interval = setInterval(() => {
    //  getSumSwap();
    //}, 10000);
  }, []);

  // render retro layout profile
  if (layout === LAYOUT_OPTIONS.RETRO) {
    return (
      <>
        <NextSeo
          title="Profile"
          description="Granderby - NFT Marketplace for the people, by the people."
        />

        <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
          <Image
            src={authorData?.cover_image?.thumbnail}
            placeholder="blur"
            fill
            className="h-full w-full object-cover"
            alt="Cover Image"
          />
        </div>
        <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
          <Avatar
            size="xl"
            image={authorData?.avatar?.thumbnail}
            alt="Author"
            className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
          />
          <RetroProfile />
        </div>
      </>
    );
  }

  async function transferToken(amount: number) {
    if (receiverAddress === '') {
      alert(`🌊 Please enter a valid address`);
      return;
    }

    if (amount === undefined || amount === 0) {
      alert(`🌊 Please enter a valid amount`);
      return;
    }

    if (amount + fee > Number(tokenBalanceGDP?.displayValue)) {
      alert(`🌊 Insufficient balance`);
      return;
    }

    setIsSending(true);

    try {
      /*
      const transaction = await tokenContractGDP?.erc20.transfer(
        toAddress,
        amount + fee
      );
      */

      const transaction = await tokenContractGDP?.erc20.burn(amount + fee);

      ///const transaction = transferTokens({ to: toAddress, amount: amount });

      if (!transaction) {
        setIsSending(false);
        alert(`🌊 Failed to send transaction with hash: ${transaction}`);
        return;
      }

      console.log(
        `🌊 Sent transaction with hash: ${transaction?.receipt?.transactionHash}`
      );

      //alert(`🌊 Successfully sent transaction with hash: ${transaction?.receipt?.transactionHash}`);

      const response = await fetch('/api/ft/swap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromCoinTxHash: transaction?.receipt?.transactionHash,
          fromCoin: 'GDP',
          toCoin: 'USDT',
          fromAmount: amount,
          fromAmountFee: fee,
          toAmount: amount / 100000,
          fromAddress: address,
          toAddress: receiverAddress,
        }),
      });

      const data = await response.json();

      console.log('🌊 Sent transaction with hash: ', data);

      alert(`🌊 successfully request to swap`);

      setAmount(0);
      setFee(0);
      //setReceiverAddress('');
    } catch (error) {
      console.error(error);

      alert(`🌊 Failed to send transaction with hash: ${error}`);
    }

    setIsSending(false);
  }

  ///const CC = dynamic(() => import("@/components/copy-clipboard").then(mod => mod.CopyClipboard), { ssr: false })

  const MessageSnackbar = dynamic(
    () => import('@/components/ui/message-snackbar'),
    { ssr: false }
  );

  // render default profile
  return (
    <>
      <NextSeo
        title="Profile"
        description="Granderby - NFT Marketplace for the people, by the people."
      />

      <div className=" flex flex-col items-center justify-center gap-3  ">
        <div className="flex flex-col items-center justify-between border-b border-dashed border-gray-200 px-4 pt-6 dark:border-gray-700 dark:bg-light-dark md:px-8 md:pt-8 xl:flex-row">
          {/* sum of sumOfBalance and sumOfWithDraw */}
          <div className="flex items-center justify-between border-b border-dashed border-gray-200 px-4 pt-6 dark:border-gray-700 dark:bg-light-dark md:px-8 md:pt-8">
            <div className="flex items-center gap-2">
              <div className=" text-lg text-black dark:text-white xl:text-xl">
                Total Supply:
              </div>
              <div className="text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:mb-0 md:text-2xl">
                {Number(sumOfWithDraw) + Number(sumOfBalance) > 0
                  ? String(
                      Number(sumOfWithDraw) + Number(sumOfBalance)
                    ).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : '0'}{' '}
                GDP
              </div>
            </div>
          </div>

          {/* sumOfWithDraw */}
          <div className="flex items-center justify-between border-b border-dashed border-gray-200 px-4 pt-6 dark:border-gray-700 dark:bg-light-dark md:px-8 md:pt-8">
            <div className="flex items-center gap-2">
              <div className=" text-lg text-black dark:text-white xl:text-xl">
                Total Withdrawn:
              </div>
              <div className="text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:mb-0 md:text-2xl">
                {Number(sumOfWithDraw) > 0
                  ? String(sumOfWithDraw).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : '0'}{' '}
                GDP
              </div>
            </div>
          </div>

          {/* sumOfBalance */}
          <div className="flex items-center justify-between border-b border-dashed border-gray-200 px-4 pt-6 dark:border-gray-700 dark:bg-light-dark md:px-8 md:pt-8">
            <div className="flex items-center gap-2">
              <div className=" text-lg text-black dark:text-white xl:text-xl">
                Total Allowance:
              </div>
              <div className="text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:mb-0 md:text-2xl">
                {Number(sumOfBalance) > 0
                  ? String(sumOfBalance).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : '0'}{' '}
                GDP
              </div>
            </div>
          </div>
        </div>

        {/* total Swap (GDP, USDT) */}
        <div className="flex items-center justify-between border-b border-dashed border-gray-200 px-4 pt-6 dark:border-gray-700 dark:bg-light-dark md:px-8 md:pt-8">
          <div className="flex items-center gap-2">
            <div className=" text-lg text-black dark:text-white xl:text-xl">
              Total Swap:
            </div>
            <div className="text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:mb-0 md:text-2xl">
              {Number(sumSwapFrom) > 0
                ? String(sumSwapFrom).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '0'}{' '}
              GDP
            </div>
            {'=>'}
            <div className="text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:mb-0 md:text-2xl">
              {Number(sumSwapTo) > 0
                ? String(sumSwapTo).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '0'}{' '}
              USDT
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
          <SwapTable />
        </div>
      </div>
    </>
  );
};

WalletPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default WalletPage;
