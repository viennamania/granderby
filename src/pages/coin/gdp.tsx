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

import TransferTable from '@/components/ft-transaction/transfer-table';

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

import { createThirdwebClient, getContract } from 'thirdweb';
import { defineChain } from 'thirdweb/chains';

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
import { add } from 'lodash';

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
  const [amount, setAmount] = useState();

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
      /*
      const tx = await tokenContractGDP?.erc20.transfer.prepare(toAddress, amount);

      const gaslessOptions = tx?.getGaslessOptions();

      console.log("gallessOptions", gaslessOptions);


      return;
      */

      const transaction = await tokenContractGDP?.erc20.transfer(
        toAddress,
        amount
      );

      ///const transaction = transferTokens({ to: toAddress, amount: amount });

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

      <div className="flex-cols mt-5 flex items-center justify-center gap-3 rounded-lg bg-sky-600 pb-5 pt-5 text-white">
        <div className="text-2xl font-bold">GDP</div>
      </div>

      <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        {!address ? (
          <></>
        ) : (
          <>
            {/*
          <Avatar
            size="xl"
            image={authorData?.avatar?.thumbnail}
            alt="Author"
            className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
          />
          */}

            <div className="mt-5 flex flex-col items-center justify-center">
              <div className="mb-5 mt-5 flex flex-row items-center justify-center gap-3">
                <span className=" text-sm">{address}</span>

                <div
                  title="Copy Address"
                  onClick={() => handleCopyToClipboard()}
                >
                  {copyButtonStatus ? (
                    <Check className="h-auto w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-auto w-3.5" />
                  )}
                </div>
              </div>

              <Canvas
                text={address}
                options={{
                  level: 'M',
                  margin: 3,
                  scale: 4,
                  width: 150,
                  color: {
                    dark: '#010599FF',
                    light: '#FFBF60FF',
                  },
                }}
              />
            </div>
          </>
        )}

        {/*
        <Profile />
        */}

        <h3 className="mb-2 mt-10 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
          My Balance
        </h3>

        {address ? (
          <div className="mb-7 flex flex-row items-center justify-center gap-2 text-center text-3xl font-bold tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
            <GdpIcon className="h-auto w-8 lg:w-auto" />
            <b>
              {tokenBalanceGDP === undefined ? (
                <>Loading...</>
              ) : (
                <div className="m-5 text-5xl font-bold xl:text-7xl">
                  {Number(tokenBalanceGDP?.displayValue).toFixed(2)}
                </div>
              )}
            </b>{' '}
            <span className="text-lg text-[#2b57a2] ">GDP</span>
            {/* reload button */}
            {/*
            <div className="flex items-center justify-center gap-2">
              <Button
                onClick={() => {
                  ///getTransactions();


                  //router.reload();                  
                  
                }}
                title="Reload"
                shape="circle"
                variant="transparent"
                size="small"
                className="text-gray-700 dark:text-white"
              >
                <Refresh className="h-auto w-4 rtl:rotate-180" />
              </Button>
            </div>
            */}
          </div>
        ) : (
          <div className="mb-7 text-center text-2xl font-bold tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
            <ConnectWallet theme="light" />
          </div>
        )}
      </div>

      <form>
        <div className=" flex flex-row items-center justify-center text-lime-600">
          {/* Form Section */}
          <div className={styles.collectionContainer}>
            <div className="mb-2 text-lg">Send my GDP to another address:</div>

            {/* Toggle between direct listing and auction listing */}
            {/*
            <div className={styles.listingTypeContainer}>
              <input
                type="radio"
                name="listingType"
                id="directListing"
                value="directListing"
                defaultChecked
                className={styles.listingType}
              />
              <label
                htmlFor="directListing"
                className={styles.listingTypeLabel}
              >
                Direct Listing
              </label>
              <input
                type="radio"
                name="listingType"
                id="auctionListing"
                value="auctionListing"
                className={styles.listingType}
              />
              <label
                htmlFor="auctionListing"
                className={styles.listingTypeLabel}
              >
                Auction Listing
              </label>
            </div>
            */}

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

            <button
              onClick={showModal2}
              className="m-5 text-xl font-bold text-blue-600"
            >
              Scan
            </button>

            <div className="mb-3 text-lg"></div>

            {/*
            <div className="flex flex-col items-center justify-center">
              <CoinInput
                label={'From'}
                exchangeRate={0.0}
                defaultCoinIndex={0}
                getCoinValue={(data) => console.log('From coin value:', data)}
              />
            </div>
            */}

            {/* Amount Field */}

            <input
              className="mt-10 w-full text-right text-5xl font-bold text-lime-600"
              type="number"
              name="amount"
              placeholder="0"
              value={amount}
              onChange={(e) => {
                if (e.target.value === null) setAmount(undefined);
                else if (Number(e.target.value) === 0) setAmount(undefined);
                else if (Number(e.target.value) < 0) setAmount(undefined);
                else if (
                  Number(e.target.value) > Number(tokenBalanceGDP?.displayValue)
                ) {
                  setAmount(Number(tokenBalanceGDP?.displayValue));
                } else {
                  setAmount(Number(e.target.value));
                }
              }}
            />

            {address && (
              <div className="mb-3 text-lg">
                {(
                  Number(tokenBalanceGDP?.displayValue) - (amount || 0)
                ).toFixed(2)}{' '}
                GDP left
              </div>
            )}

            {/*}
            <button
              type="submit"
              className={styles.mainButton}
              style={{ marginTop: 32, borderStyle: 'none' }}
            >
              Send
            </button>
            */}

            {address ? (
              <div className="mt-5 flex flex-row justify-center">
                {/*{isTransferTokensLoading ? (*/}

                {isSending ? (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <div className="animate-spin">
                      <GdpIcon className="h-35 w-35" />
                    </div>
                    <div className="flex flex-col items-center justify-center text-2xl font-bold text-orange-600">
                      <span>Sending {amount} GDP to</span>
                      <span className="text-xs">{toAddress}</span>
                      <span>Please wait...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <Web3Button
                      theme="light"
                      contractAddress={tokenContractAddressGDP}
                      action={() => {
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
                      Transfer ({amount} GDP)
                    </Web3Button>
                  </>
                )}

                {/*
                <div className="ml-5 flex items-center justify-center">
                  {isTransferTokensLoading && (
                    <div className="animate-spin">
                      <GDPIcon className="h-10 w-10" />
                    </div>
                  )}
                </div>
                <div className="ml-2">
                
                  {transferTokensError && (
                    <div className="text-red-500">{transferTokensError}</div>
                  )}
               
                  
                </div>
                   */}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </form>

      <div className="mx-auto mt-8 flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        <TransferTable {...{ contractAddress: tokenContractAddressGDP }} />
      </div>

      {/*
      {address && (
        <iframe
          className="mt-10 h-[500px] w-full border"
          src="https://withpaper.com/sdk/2022-08-12/embedded-wallet/export?clientId=efa05253-e8b1-4adb-b978-996f8f2f409c"
        />
      )}
      */}

      {/*
      <Web3Button
        contractAddress={tokenContractAddressGDP}
        action={() =>
          transferTokens({
            to: "0xb6012B608DB2ad15e4Fb53d8AD2A2A8B6805F1a2", // Address to transfer to
            amount: 3, // Amount to transfer
          })
        }
      >
        Transfer
      </Web3Button>
        */}

      {/** MODAL **/}

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

      {/*
      
      <Stack spacing={2} sx={{ width: "100%" }}>

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
        <Snackbar open={err} autoHideDuration={6000} onClose={handleCloseErr}>
            <Alert
                onClose={handleCloseErr}
                severity="error"
                sx={{ width: "100%" }}
            >
              {errMsgSnackbar}

            </Alert>
        </Snackbar>
      </Stack>
            */}

      {/*
      <Stack spacing={2} sx={{ width: "100%" }}>

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

      </Stack>
            */}
    </>
  );
};

WalletPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default WalletPage;
