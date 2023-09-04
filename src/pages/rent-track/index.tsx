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

import { useState } from 'react';

import TransactionTable from '@/components/token-transaction/transaction-table';

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

import { tokenContractAddressHV } from '@/config/contractAddresses';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const RentPage: NextPageWithLayout<
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

  // render retro layout profile
  if (layout === LAYOUT_OPTIONS.RETRO) {
    return (
      <>
        <NextSeo title="Profile" description="Granderby - Web3 NFT Game" />

        <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
          <Image
            src={authorData?.cover_image?.thumbnail}
            placeholder="blur"
            fill
            className="h-full w-full object-fill"
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
  } else {
    // render default profile

    return (
      <>
        <NextSeo title="Profile" description="Granderby - Web3 NFT Game" />

        <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
          <Image
            src={authorData?.cover_image?.thumbnail}
            placeholder="blur"
            fill
            className="object-fill"
            alt="Cover Image"
          />
        </div>

        <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
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
        </div>

        <div>
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
        </div>

        <form>
          <div className=" flex flex-col items-center justify-center text-lime-600">
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
        </form>

        <div className="mx-auto mt-8 flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
          <TransactionTable {...{ contractAddress: tokenContractAddressHV }} />
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
      </>
    );
  }
};

RentPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default RentPage;
