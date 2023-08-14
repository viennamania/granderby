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

import TransactionTable from '@/components/token-transaction/transaction-table';

import { useCopyToClipboard } from 'react-use';
import { Copy } from '@/components/icons/copy';
import { Check } from '@/components/icons/check';

///import { QrReader } from "react-qr-reader";

import { Html5Qrcode } from 'html5-qrcode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import styles2 from '@/styles/EWallet.module.css';

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
  thirdwebClientId,
  tokenContractAddressUSDC,
  tokenContractAddressUSDT,
  tokenContractAddressGRD,
  marketplaceContractAddress,
} from '@/config/contractAddresses';

import { BigNumber, ethers } from 'ethers';

import styles from '@/styles/Home.module.css';
import { add } from 'lodash';

const sdk = new ThirdwebSDK('polygon', {
  clientId: thirdwebClientId,
});

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

  const address = useAddress();

  const { contract: tokenContractGRD } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalanceGRD } = useTokenBalance(tokenContractGRD, address);

  const {
    mutate: transferTokens,
    isLoading,
    error,
  } = useTransferToken(tokenContractGRD);

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

  async function handleTransferToken(e: any) {
    try {
      // Prevent page from refreshing
      e.preventDefault();

      let transactionResult: undefined | TransactionResult = undefined;

      ///transactionResult = await transferToken(toAddress, amount);

      const txResult = await sdk.wallet.transfer(toAddress, amount);

      console.log('txResult', txResult);
    } catch (error) {
      console.error(error);
    }
  }

  async function transferToken(toAddress: string, amount: number) {
    try {
      const transaction = await tokenContract?.erc20.transfer(
        toAddress,
        amount
      );

      return transaction;
    } catch (error) {
      console.error(error);
    }
  }

  // This function gets called when the form is submitted.
  async function handleCreateListing(e: any) {
    try {
      // Prevent page from refreshing
      e.preventDefault();

      // Store the result of either the direct listing creation or the auction listing creation
      let transactionResult: undefined | TransactionResult = undefined;

      // De-construct data from form submission
      const { listingType, contractAddress, tokenId, price } =
        e.target.elements;

      /*
      // Depending on the type of listing selected, call the appropriate function
      // For Direct Listings:
      if (listingType.value === 'directListing') {
        transactionResult = await createDirectListing(
          contractAddress.value,
          tokenId.value,
          price.value
        );
      }

      // For Auction Listings:
      if (listingType.value === 'auctionListing') {
        transactionResult = await createAuctionListing(
          contractAddress.value,
          tokenId.value,
          price.value
        );
      }
      */

      console.log('transactionResult', transactionResult);

      // If the transaction succeeds, take the user back to the homepage to view their listing!
      if (transactionResult) {
        router.push(routes.marketplace);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function createDirectListing(
    contractAddress: string,
    tokenId: string,
    price: string
  ) {
    try {
      const transaction =
        await contractMarketplace?.directListings.createListing({
          assetContractAddress: contractAddress, // Contract Address of the NFT
          tokenId: tokenId, // Token ID of the NFT.
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

      <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
        <Image
          src={authorData?.cover_image?.thumbnail}
          placeholder="blur"
          fill
          className="object-cover"
          alt="Cover Image"
        />
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
              <ConnectWallet theme="dark" />

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
          <>
            <div className="mb-7 text-center text-3xl font-bold tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
              <b>
                {tokenBalanceGRD === undefined ? (
                  <>Loading...</>
                ) : (
                  <>{Number(tokenBalanceGRD?.displayValue).toFixed(2)}</>
                )}
              </b>{' '}
              <span className="text-lg text-[#2b57a2]">
                {tokenBalanceGRD?.symbol}
              </span>
            </div>
            <div className="mb-7 text-center text-3xl font-bold tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
              <b>
                {tokenBalanceUSDC === undefined ? (
                  <>Loading...</>
                ) : (
                  <>{Number(tokenBalanceUSDC?.displayValue).toFixed(2)}</>
                )}
              </b>{' '}
              <span className="text-lg text-[#2b57a2]">
                {tokenBalanceUSDC?.symbol}
              </span>
            </div>
          </>
        ) : (
          <div className="mb-7 text-center text-2xl font-bold tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
            <ConnectWallet theme="light" />
          </div>
        )}
      </div>

      {/*
      <form onSubmit={(e) => handleTransferToken(e)}>
        */}

      <form>
        <div className=" flex flex-row items-center justify-center text-lime-600">
          {/* Form Section */}
          <div className={styles.collectionContainer}>
            <div className="mb-2 text-lg">Send my GRD to another address:</div>

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
              className="mb-2 w-full text-lime-600"
              type="text"
              name="toAddress"
              placeholder="To Address"
              value={toAddress}
              onChange={(e) => {
                setToAddress(e.target.value);
              }}
            />

            <button onClick={showModal2} className={styles.button}>
              Scan
            </button>

            <div className="mb-3 text-lg"></div>

            {/* Sale Price For Listing Field */}
            <input
              className=" w-full text-right text-3xl font-bold text-lime-600"
              type="number"
              name="amount"
              placeholder="0"
              value={amount}
              onChange={(e) => {
                if (e.target.value === null) setAmount(undefined);
                else if (Number(e.target.value) === 0) setAmount(undefined);
                else if (Number(e.target.value) < 0) setAmount(undefined);
                else if (
                  Number(e.target.value) > Number(tokenBalance?.displayValue)
                )
                  setAmount(Number(tokenBalance?.displayValue));
                else setAmount(Number(e.target.value));
              }}
            />

            {/*}
            <button
              type="submit"
              className={styles.mainButton}
              style={{ marginTop: 32, borderStyle: 'none' }}
            >
              Send
            </button>
            */}

            {address && (
              <div className="mt-5 flex flex-row justify-center">
                {/*}
                <button
                  type="submit"
                  className={styles.mainButton}
                  style={{ marginTop: 32, borderStyle: 'none' }}
                  onClick={(e) => handleTransferToken(e)}
                >
                  Transfer ({amount} GRD)
                </button>
                  */}

                {/*
                <Web3Button
                  theme="light"
                  contractAddress={tokenContractAddressUSDT}
                  action={(contract) => {
                    //contract?.call('withdraw', [[nft.metadata.id]])
                    //contract?.call('withdraw', [[nft.metadata.id]])
                    //contract.erc1155.claim(0, 1);
                    contract.erc20.transfer(toAddress, amount);
                  }}
                  onSuccess={() => {
                    console.log(`🌊 Successfully transfered!`);
                    alert('Successfully transfered!');

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
                  Transfer ({amount} USDT)
                </Web3Button>
                  */}
              </div>
            )}
          </div>
        </div>
      </form>

      <div className="mx-auto mt-8 flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        <TransactionTable />
      </div>

      {address && (
        <iframe
          className="mt-10 h-[500px] w-full border"
          src="https://withpaper.com/sdk/2022-08-12/embedded-wallet/export?clientId=efa05253-e8b1-4adb-b978-996f8f2f409c"
        />
      )}

      {/*
      <Web3Button
        contractAddress={tokenContractAddressROM}
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

      <footer>
        <div className=" flex-cols flex items-center justify-center gap-3 bg-gray-800 pb-5 pt-10 text-white ">
          <div>Copyright ©MOMOCON</div>

          <AnchorLink href="/terms">Terms of Service</AnchorLink>

          <div>Privacy Policy</div>
        </div>

        <div className=" flex-cols flex items-center justify-center gap-3 bg-gray-800 pb-20 pt-3 text-white ">
          <div>
            <Image src={LogoMomocon} alt="MOMOCON" width={48} height={48} />
          </div>

          <AnchorLink
            href="https://www.instagram.com/nftgranderby"
            target="_blank"
            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </AnchorLink>

          <AnchorLink
            href="https://twitter.com/nftgranderby"
            target="_blank"
            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
          >
            <Twitter className="h-4 w-4" /> Twitter
          </AnchorLink>
        </div>
      </footer>

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
