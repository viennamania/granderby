import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import Image from '@/components/ui/image';
import Avatar from '@/components/ui/avatar';
import AnchorLink from '@/components/ui/links/anchor-link';

import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';

import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
//import { Check } from '@/components/icons/check';
//import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';

import Profile from '@/components/profile/profile';

import RetroProfile from '@/components/profile/retro-profile';
// static data
import { authorData } from '@/data/static/author';

import RootLayout from '@/layouts/_root-layout';

import routes from '@/config/routes';
import { useRouter } from 'next/router';

import React, { useState, useEffect } from 'react';

import { useQRCode } from 'next-qrcode';

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

const qrConfig = { fps: 10, qrbox: { width: 200, height: 200 } };

let html5QrCode: Html5Qrcode;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const WalletPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { layout } = useLayout();

  const { Canvas } = useQRCode();

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

  const showModal2 = () => {
    setModal2(true);
    setMsg('');
    handleClickAdvanced();
  };

  const handleClickAdvanced = () => {
    setResult('');

    const qrCodeSuccessCallback = (decodedText: any, decodedResult: any) => {
      setResult(decodedText);
      //let vproduct = getParameterByName('product', decodedText);
      //let vprice = getParameterByName('price', decodedText);
      handleStop();
      setModal2(false);
      ///updateBalance(vproduct, vprice);

      const arr1 = decodedText.split(':');
      if (arr1.length < 2) {
        setToAddress(decodedText);
      } else {
        setToAddress(arr1[1]);
      }
    };
    html5QrCode.start(
      { facingMode: 'environment' },
      qrConfig,
      qrCodeSuccessCallback
    );
  };

  const handleStop = () => {
    try {
      html5QrCode
        .stop()
        .then((res) => {
          html5QrCode.clear();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const hideModal2 = () => {
    setModal2(false);
    handleStop();
  };

  useEffect(() => {
    html5QrCode = new Html5Qrcode('reader');
  }, []);

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
        <div className="hidden  flex-col items-center justify-center gap-3 rounded-lg bg-green-500 p-10 text-white">
          <div className=" w-full text-left text-lg font-bold lg:text-2xl">
            SWAP
          </div>

          <form>
            <div className=" flex flex-row items-center justify-center text-lime-600">
              <div className={styles.collectionContainer}>
                <div className="flex w-full flex-row items-center justify-center gap-3">
                  <div className=" w-64 text-lg font-bold text-white">
                    Select Coin
                  </div>
                  <select
                    className="w-full text-black"
                    name="coin"
                    id="coin"
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  >
                    <option value="usdt">USDT</option>
                    <option value="usdc">USDC</option>
                  </select>
                </div>

                <div className="mt-5 flex w-full flex-row items-center justify-center gap-3">
                  <div className="text-lg font-bold text-white">Address</div>

                  <input
                    className=" w-full text-black"
                    type="text"
                    name="receiverAddress"
                    placeholder="Wallet address to receive"
                    value={receiverAddress}
                    onChange={(e) => {
                      setReceiverAddress(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-5 grid w-full grid-cols-2 gap-3 rounded-lg border-2 border-red-500 p-5">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="flex w-full flex-col items-center justify-center gap-1">
                      <div className="w-full text-left text-lg text-white">
                        GDP balance
                      </div>
                      <div className="w-full text-left text-lg font-bold text-white">
                        {tokenBalanceGDP === undefined ? (
                          <>Loading...</>
                        ) : (
                          <div className="text-lg font-bold xl:text-3xl">
                            {Number(tokenBalanceGDP?.displayValue).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex w-full flex-col items-center justify-center gap-1">
                      <div className="w-full text-left text-lg text-white">
                        Swap fee
                      </div>
                      <div className="w-full text-left text-lg font-bold text-white">
                        2%
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="flex w-full flex-col items-center justify-center gap-1">
                      <div className="w-full text-left text-lg text-white">
                        Minimum withdraw
                      </div>
                      <div className="w-full text-left text-lg font-bold text-white">
                        1 USDT
                      </div>
                    </div>

                    <div className="flex w-full flex-col items-center justify-center gap-1">
                      <div className="w-full text-left text-lg text-white">
                        Withdraw limit per day
                      </div>
                      <div className="w-full text-left text-lg font-bold text-white">
                        {sumDay} / 10,000 USDT
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex w-full flex-row items-center justify-center gap-3">
                  <div className=" w-72 text-lg font-bold text-white"></div>
                  <div className="w-full text-left text-lg font-bold text-white">
                    1 USDT = 100,000 GDP
                  </div>
                </div>

                <div className="flex w-full flex-row items-center justify-center gap-3">
                  <div className=" w-72 text-lg font-bold text-white">
                    Withdraw Amount
                  </div>

                  <input
                    className=" w-full text-right text-3xl font-bold text-black"
                    type="number"
                    name="amount"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => {
                      console.log('e.target.value', e.target.value);

                      if (e.target.value === null) setAmount(undefined);
                      else if (Number(e.target.value) === 0)
                        setAmount(undefined);
                      else if (Number(e.target.value) < 0) setAmount(undefined);
                      else if (
                        Number(e.target.value) >
                        Number(tokenBalanceGDP?.displayValue)
                      ) {
                        setAmount(Number(tokenBalanceGDP?.displayValue));

                        setFee(
                          (Number(tokenBalanceGDP?.displayValue) / 100) * 2
                        );
                      } else {
                        setAmount(Number(e.target.value));

                        setFee((Number(e.target.value) / 100) * 2);

                        if (Number(e.target.value) === 0) setFee(0);
                        if (e.target.value === null) setFee(0);
                        if (e.target.value === undefined) setFee(0);
                        if (e.target.value === '') setFee(0);
                      }
                    }}
                  />
                </div>

                {address && (
                  <div className="mb-3 mt-2 w-full text-right text-lg font-bold text-white">
                    {(
                      Number(tokenBalanceGDP?.displayValue) -
                      ((amount || 0) + fee)
                    ).toFixed(2)}{' '}
                    left
                  </div>
                )}

                {address && (
                  <div className="flex flex-col gap-2 text-right">
                    {amount && amount > 0 && (
                      <span className=" text-lg font-bold text-white lg:text-xl">
                        Receive Amount: {(amount / 100000).toFixed(2)} USDT
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-5 flex w-full flex-row items-center justify-center gap-3">
                  <div className=" w-24 text-lg font-bold text-white">
                    Swap fee
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div className="w-full text-right text-lg font-bold text-white">
                      {fee} GDP
                    </div>
                    <div className="w-full text-right text-sm font-bold text-white">
                      * 2% of the withdraw amount will be paid as a swap fee.
                      <br />
                      The fee will be deducted from the balance after the swap.
                    </div>
                  </div>
                </div>

                {address ? (
                  <div className="mt-5 flex flex-row justify-center">
                    {/*{isTransferTokensLoading ? (*/}

                    {isSending ? (
                      <div className="flex flex-row items-center justify-center gap-2">
                        <div className="animate-spin">
                          <Image
                            src="/images/icon-gdp.png"
                            alt="loading"
                            width={20}
                            height={20}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center text-2xl font-bold text-orange-600">
                          <span>Swap {amount + fee} GDP to USDT</span>
                          <span className="text-xs">{receiverAddress}</span>
                          <span>Please wait...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Web3Button
                          // if receiver address is empty, disable the button

                          //disabled={receiverAddress === '' ? true : false}

                          isDisabled={receiverAddress === '' ? true : false}
                          className={
                            receiverAddress === ''
                              ? 'cursor-not-allowed bg-gray-300'
                              : ''
                          }
                          theme="light"
                          contractAddress={tokenContractAddressGDP}
                          action={(contract) => {
                            //contract?.call('withdraw', [[nft.metadata.id]])
                            //contract?.call('withdraw', [[nft.metadata.id]])
                            //contract.erc1155.claim(0, 1);

                            ///contract.erc20.transfer(toAddress, amount);

                            transferToken(amount);
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
                          Swap ({amount} GDP)
                        </Web3Button>
                      </>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </form>

          <div className={`${styles2.modal} ${modal2 ? styles2.show : ''}`}>
            <div className={styles2.modalheader}>
              <div onClick={hideModal2} className={styles.closeicon}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </div>
              <div className={styles2.modaltitle}>Scan QR Code</div>

              <div></div>
            </div>

            <div className={styles2.modalinput}>
              <div id="reader" className={styles2.camera} />
              <div className={styles2.result}>{result}</div>
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
