import { coinIdData } from '@/data/static/coin-id';
import { CoinExplore } from '@/data/static/coin-list';
import React, { useState, useEffect } from 'react';
import { useCopyToClipboard } from 'react-use';
import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';
import AnchorLink from '@/components/ui/links/anchor-link';
import Explorers from '@/components/cryptocurrency-pricing-table/explorers';

import { format } from 'date-fns';

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
  tokenContractAddressUSDC,
} from '@/config/contractAddresses';

import {
  walletConnect,
  ConnectWallet,
  useDisconnect,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
  useValidDirectListings,
  useNetworkMismatch,
  useNetwork,
} from '@thirdweb-dev/react';

import { ChainId } from '@thirdweb-dev/sdk';

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

  const { data: stakerAddress, isLoading: isLoadingStakerAddress } =
    useContractRead(contractStaking, 'stakerAddress', [
      nftMetadata?.metadata?.id,
    ]);

  const { data: stakeInfo, isLoading: isLoadingStakeInfo } = useContractRead(
    contractStaking,
    'getStakeInfo',
    [stakerAddress]
  );

  ///console.log('stakeInfo', stakeInfo);

  const [stakeInfoCount, setStakeInfoCount] = useState<any>(null);

  useEffect(() => {
    if (!stakeInfo) return;

    setStakeInfoCount(stakeInfo?.[0]?.length);
  }, [stakeInfo]);

  const { contract: marketplace } = useContract(
    marketplaceContractAddress,
    'marketplace-v3'
  );

  const {
    data: directListings,
    isLoading: loadingListings,
    error,
  } = useValidDirectListings(marketplace);

  //console.log('nft-single-price directListings======>', directListings);

  const [directListing, setDirectListing] = useState<any>(null);

  useEffect(() => {
    setDirectListing(null);

    if (directListings) {
      directListings.map((listing: any) => {
        if (listing.tokenId === nftMetadata?.metadata?.id) {
          //setListingId(listing.id);

          setDirectListing(listing);

          ////console.log('nft-single-price listing', listing);

          return;
        }
      });
    }
  }, [directListings, nftMetadata?.metadata?.id]);

  const { contract: tokenContractUSDC } = useContract(
    tokenContractAddressUSDC,
    'token'
  );
  const { data: tokenBalanceUSDC, isLoading: isLoadingTokenBalanceUSDC } =
    useTokenBalance(tokenContractUSDC, address);

  const [saleHistory, setSaleHistory] = useState([] as any);

  const getLastSale20 = async () => {
    console.log(
      'price-history-table nftMetadata.?metadata?.id: ',
      nftMetadata?.metadata?.id
    );

    const response = await fetch('/api/nft/horse/history/price', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'getAllByTokenId',
        tokenId: nftMetadata?.metadata?.id,
      }),
    });
    const data = await response.json();

    ///console.log('data.all: ', data.all);

    setSaleHistory(data.all);
  };

  useEffect(() => {
    getLastSale20();
  }, [nftMetadata?.metadata?.id]);

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

  async function sellNft(id: string) {
    if (!address) return;

    if (!price) {
      alert('Please enter price');
      return;
    }

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

    try {
      const transaction = await marketplace?.directListings.createListing({
        assetContractAddress: nftDropContractAddressHorse, // Contract Address of the NFT
        tokenId: id, // Token ID of the NFT.
        //buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        pricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        ///currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        currencyContractAddress: tokenContractAddressUSDC,

        //listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        //quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        startTimestamp: new Date(), // When the listing will start
        endTimestamp: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Optional - when the listing should end (default is 7 days from now)
      });

      alert(`🌊 Successfully listed`);

      return transaction;
    } catch (error) {
      console.error(error);
    }
  }

  const [price, setPrice] = useState();

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

  // Hooks to detect user is on the right network and switch them if they are not
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  async function buyNft() {
    try {
      // Ensure user is on the correct network

      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Polygon);
        return;
      }

      // Simple one-liner for buying the NFT
      /*
        await marketplace?.buyFromListing(listingId.listingId, 1);
        */

      // The ID of the listing you want to buy from
      //const listingId = 0;
      // Quantity of the asset you want to buy
      const quantityDesired = 1;

      await marketplace?.directListings?.buyFromListing(
        directListing?.id,
        quantityDesired,
        address
      );

      alert('NFT bought successfully!');
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div className="p-3  ">
      {/*{nftMetadata?.owner === address && (*/}

      <div className=" flex flex-col rounded-lg border ">
        <Collapse label="Sale Information" initialOpen={true}>
          {/* sale info */}
          <div className="  flex flex-col items-center justify-center gap-5  ">
            {loadingListings ? (
              <div className="m-5 p-5 text-sm font-bold xl:text-lg">
                <b>Loading sale...</b>
              </div>
            ) : (
              <div className="flex  w-full flex-col gap-5 p-5">
                {!directListing || directListing.quantity === '0' ? (
                  <>
                    {/* Last Price */}
                    <div className="text-sm font-bold xl:text-lg">
                      <b>Last Price</b>
                    </div>
                    <div className="flex flex-col ">
                      <div className="flex flex-row items-center  gap-2 text-sm font-bold xl:text-lg">
                        <button
                          className=" w-12 text-sm font-bold xl:text-xl "
                          onClick={() =>
                            router.push(
                              `https://granderby.market/horse-details/${nftMetadata?.metadata?.id}`
                            )
                          }
                        >
                          <Image
                            src="/images/market.png"
                            alt="live"
                            width={30}
                            height={30}
                          />
                        </button>
                        {/*
                        <button
                          className="flex w-24 flex-row items-center justify-start "
                          onClick={() =>
                            //alert("clicked")

                            (location.href =
                              'https://polygonscan.com/tx/' +
                              saleHistory[0]?.hash)
                          }
                        >
                          <Image
                            src="/images/logo-polygon.png"
                            alt="gd"
                            width={13}
                            height={13}
                          />

                          <div className="ml-1 text-left text-xs -tracking-[1px]">
                            {saleHistory[0]?.hash.substring(0, 6) + '...'}
                          </div>
                        </button>
                        */}

                        <span className="flex text-4xl font-bold text-green-600 xl:text-6xl ">
                          {saleHistory[0]?.paidToken ===
                            '0x0000000000000000000000000000000000001010' &&
                            (
                              saleHistory[0]?.totalPricePaid /
                              1000000000000000000
                            ).toFixed(2)}
                          {saleHistory[0]?.paidToken ===
                            '0xe426D2410f20B0434FE2ce56299a1543d3fDe450' &&
                            (
                              saleHistory[0]?.totalPricePaid /
                              1000000000000000000
                            ).toFixed(2)}
                          {saleHistory[0]?.paidToken ===
                            '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' &&
                            (saleHistory[0]?.totalPricePaid / 1000000).toFixed(
                              2
                            )}
                        </span>
                        <span>
                          {saleHistory[0]?.paidToken ===
                            '0x0000000000000000000000000000000000001010' && (
                            <span className="pt-1">MATIC</span>
                          )}
                          {saleHistory[0]?.paidToken ===
                            '0xe426D2410f20B0434FE2ce56299a1543d3fDe450' && (
                            <span className="pt-1">GRD</span>
                          )}

                          {saleHistory[0]?.paidToken ===
                            '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' && (
                            <span className="pt-1">USDC</span>
                          )}
                        </span>
                      </div>

                      {/*
                      <div className=" flex flex-row items-center justify-start text-xs">
                        {format(
                          Date.parse(saleHistory[0]?.blockTimestamp || 0),
                          'yyy-MM-dd hh:mm:ss'
                        )}
                      </div>
                      */}

                      <div className="mt-3 flex flex-row items-center  gap-2 text-sm font-bold xl:text-lg">
                        <button
                          className=" w-36 text-sm font-bold xl:text-xl "
                          onClick={() =>
                            router.push(
                              `https://opensea.io/assets/matic/0x41fba0bd9f4dc9a968a10aebb792af6a09969f60/${nftMetadata?.metadata?.id}`
                            )
                          }
                        >
                          <Image
                            src="/images/logo-opensea.png"
                            alt="live"
                            width={30}
                            height={30}
                          />
                        </button>
                        <span className="flex ">No record</span>
                      </div>
                    </div>

                    {address === nftMetadata?.owner &&
                      address !== stakerAddress && (
                        <div className="mt-5 flex flex-col gap-2">
                          <div className="text-sm font-bold xl:text-lg">
                            <b>Not for sale</b>
                          </div>

                          {/* Sell NFT */}
                          <div className=" grid grid-cols-1 items-center justify-start gap-3 xl:grid-cols-2">
                            <div className=" flex flex-row items-center justify-start gap-2">
                              <div className=" flex w-20 flex-col gap-1">
                                <span>Listing</span>
                                <span className=" font-bold text-blue-600">
                                  USDC
                                </span>
                              </div>

                              <input
                                className=" w-full text-right text-xl font-bold text-black"
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => {
                                  setPrice(e.target.value as any);
                                }}
                              />
                            </div>

                            <Web3Button
                              theme="light"
                              contractAddress={marketplaceContractAddress}
                              action={() =>
                                sellNft(nftMetadata?.metadata?.id || '')
                              }
                            >
                              Sell
                            </Web3Button>
                          </div>

                          {/* Send NFT */}
                          {nftMetadata?.owner === address && (
                            <div className="mt-3 grid grid-cols-1 items-center justify-center gap-3 xl:grid-cols-2">
                              <div className=" flex flex-row items-center justify-start gap-2">
                                <div className="w-20">Transfer</div>
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

                              {/*{isTransferTokensLoading ? (*/}

                              {isSending ? (
                                <div className="flex flex-row items-center justify-center gap-2">
                                  <div className="animate-spin">
                                    <RaceIcon className="h-35 w-35" />
                                  </div>
                                  <div className="flex flex-col items-center justify-center text-2xl font-bold text-orange-600">
                                    <span>
                                      Sending #{nftMetadata?.metadata?.id} to
                                    </span>
                                    <span>Please wait...</span>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <Web3Button
                                    theme="light"
                                    contractAddress={
                                      nftDropContractAddressHorse
                                    }
                                    action={() => {
                                      //contract?.call('withdraw', [[nft.metadata.id]])
                                      //contract?.call('withdraw', [[nft.metadata.id]])
                                      //contract.erc1155.claim(0, 1);

                                      ///contract.erc20.transfer(toAddress, amount);

                                      transferNft(
                                        nftMetadata?.metadata?.id,
                                        toAddress
                                      );

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

                                      console.log(
                                        `🌊 Successfully transfered!`
                                      );
                                      //alert('Successfully transfered!');

                                      //setSuccessMsgSnackbar('Your request has been sent successfully' );
                                      //handleClickSucc();
                                    }}
                                    onError={(error) => {
                                      console.error(
                                        'Failed to transfer',
                                        error
                                      );
                                      alert('Failed to transfer');
                                      //setErrMsgSnackbar('Failed to transfer');
                                      //handleClickErr();
                                    }}
                                  >
                                    Send
                                  </Web3Button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                    {address !== nftMetadata?.owner && (
                      <>
                        <div className="mt-5 text-sm font-bold xl:text-lg">
                          <b>Not for sale</b>
                        </div>
                        <Button
                          shape="rounded"
                          color="success"
                          onClick={() => {
                            //router.push('/live');
                            //walletConnect
                          }}
                        >
                          <div className="text-2xl">Make Offer</div>
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {/* Last Price */}
                    <div className="text-sm font-bold xl:text-lg">
                      <b>Last Price</b>
                    </div>
                    <div className="flex flex-col ">
                      <div className="flex flex-row items-center  gap-2 text-sm font-bold xl:text-lg">
                        <button
                          className=" w-12 text-sm font-bold xl:text-xl "
                          onClick={() =>
                            router.push(
                              `https://granderby.market/horse-details/${nftMetadata?.metadata?.id}`
                            )
                          }
                        >
                          <Image
                            src="/images/market.png"
                            alt="live"
                            width={30}
                            height={30}
                          />
                        </button>

                        {saleHistory[0] ? (
                          <>
                            <button
                              className="flex w-24 flex-row items-center justify-start "
                              onClick={() =>
                                //alert("clicked")

                                (location.href =
                                  'https://polygonscan.com/tx/' +
                                  saleHistory[0]?.hash)
                              }
                            >
                              <Image
                                src="/images/logo-polygon.png"
                                alt="gd"
                                width={13}
                                height={13}
                              />

                              <div className="ml-1 text-left text-xs -tracking-[1px]">
                                {saleHistory[0]?.hash.substring(0, 6) + '...'}
                              </div>
                            </button>

                            <span className="flex text-4xl font-bold text-green-600 xl:text-6xl ">
                              {saleHistory[0]?.paidToken ===
                              '0x0000000000000000000000000000000000001010'
                                ? (
                                    saleHistory[0]?.totalPricePaid /
                                    1000000000000000000
                                  ).toFixed(2)
                                : (
                                    saleHistory[0]?.totalPricePaid / 1000000
                                  ).toFixed(2)}
                            </span>

                            {saleHistory[0]?.paidToken ===
                            '0x0000000000000000000000000000000000001010' ? (
                              <span className="flex "> MATIC</span>
                            ) : (
                              <span className="flex"> USDC</span>
                            )}
                          </>
                        ) : (
                          <>
                            <div className="w-24"></div>
                            <span className="flex ">No record</span>
                          </>
                        )}
                      </div>

                      {/*
                          <div className=" flex flex-row items-center justify-start text-xs">
                            {format(
                              Date.parse(saleHistory[0]?.blockTimestamp || 0),
                              'yyy-MM-dd hh:mm:ss'
                            )}
                          </div>
                          */}

                      <div className="mt-3 flex flex-row items-center  gap-2 text-sm font-bold xl:text-lg">
                        <button
                          className=" w-36 text-sm font-bold xl:text-xl "
                          onClick={() =>
                            router.push(
                              `https://opensea.io/assets/matic/0x41fba0bd9f4dc9a968a10aebb792af6a09969f60/${nftMetadata?.metadata?.id}`
                            )
                          }
                        >
                          <Image
                            src="/images/logo-opensea.png"
                            alt="live"
                            width={30}
                            height={30}
                          />
                        </button>
                        <span className="flex ">No record</span>
                      </div>
                    </div>

                    {/* sell price */}
                    <div className="mt-5 text-sm font-bold xl:text-lg">
                      <b>Sell Price</b>
                    </div>
                    <div className=" text-xl font-bold xl:text-2xl">
                      <div className="flex flex-row items-center justify-start gap-2">
                        <Image
                          src="/images/sale.png"
                          alt="sale"
                          width={30}
                          height={30}
                        />

                        <Image
                          src="/images/market.png"
                          alt="market"
                          width={30}
                          height={30}
                        />

                        <div className="flex flex-row items-center justify-center gap-3">
                          <span className="text-2xl font-bold text-green-600 xl:text-4xl ">
                            {directListing?.currencyValuePerToken.displayValue}
                          </span>
                          <span className="text-sm xl:text-lg">
                            {' '}
                            {directListing?.currencyValuePerToken.symbol}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-xs">
                      {format(
                        new Date(directListing?.startTimeInSeconds * 1000),
                        'yyy-MM-dd hh:mm:ss'
                      )}
                    </span>

                    {address && address === nftMetadata?.owner && (
                      <Web3Button
                        theme="light"
                        action={(contract) =>
                          //contract?.call('withdraw', [[nft?.metadata?.id]])
                          //contract?.call('cancel', [[directListing?.id]])

                          contract?.directListings.cancelListing(
                            directListing?.id
                          )
                        }
                        onSuccess={() =>
                          alert(`🌊 Successfully canceled listing!`)
                        }
                        contractAddress={marketplaceContractAddress}
                      >
                        <span className="flex items-center gap-2">
                          Cancel Sale
                        </span>
                      </Web3Button>
                    )}

                    {!address && (
                      <div className="flex flex-row items-center justify-center">
                        <ConnectWallet theme="light" btnTitle="Login" />
                        <span className="text-sm font-bold xl:text-xl">
                          &nbsp;&nbsp;for Buy Now
                        </span>
                      </div>
                    )}

                    {address && address !== nftMetadata?.owner && (
                      <>
                        <div className="text-sm font-bold xl:text-xl">
                          <Web3Button
                            theme="light"
                            action={(contract) =>
                              //contract?.call('withdraw', [[nftMetadata?.tokenId]])
                              buyNft()
                            }
                            contractAddress={marketplaceContractAddress}
                          >
                            <span className="flex items-center gap-2">Buy</span>
                          </Web3Button>
                          {!address && (
                            <span className="text-sm font-bold xl:text-xl">
                              &nbsp;&nbsp;for Buy Now
                            </span>
                          )}
                        </div>

                        <div className=" flex flex-row items-center justify-center  gap-2">
                          <span className="text-md  xl:text-xl">
                            My Balance:
                          </span>

                          {isLoadingTokenBalanceUSDC && (
                            <div className=" text-md  xl:text-xl">
                              Loading...
                            </div>
                          )}
                          <div className="text-md  xl:text-xl">
                            {Number(tokenBalanceUSDC?.displayValue).toFixed(2)}{' '}
                            {tokenBalanceUSDC?.symbol}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                <div className="itmes-start mt-5 flex flex-col justify-center">
                  <span className="text-lg font-bold">
                    <b>Price History</b>
                  </span>

                  <PriceHistoryTable nftMetadata={nftMetadata} />
                </div>
              </div>
            )}
          </div>
        </Collapse>
      </div>

      {/*
        <div className="ml-2 mt-2 flex flex-row items-center justify-between gap-2">

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
                width={34}
                height={34}
              />
            </div>
          </Button>

        </div>
          */}

      {/* Race Information */}
      <div className="mt-5 flex flex-col rounded-lg border ">
        <Collapse label="Race Information" initialOpen={true}>
          <div className="itmes-start flex flex-col justify-center p-5">
            {/* Last Ranke */}
            <div className="text-sm font-bold xl:text-lg">
              <b>Last Rank</b>
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-row items-center  gap-2 text-sm font-bold xl:text-lg">
                <button
                  className=" w-24 text-sm font-bold xl:text-xl "
                  //onClick={() =>
                  //  router.push(
                  //</div>    `https://granderby.market/horse-details/${nftMetadata?.metadata?.id}`
                  //  )
                  //}
                >
                  <Image
                    src="/images/inkent.jpeg"
                    alt="live"
                    width={60}
                    height={30}
                  />
                </button>

                <span className="flex text-4xl font-bold text-green-600 xl:text-6xl ">
                  3
                </span>
              </div>

              <div className=" flex flex-row items-center justify-start text-xs">
                {format(
                  Date.parse(saleHistory[0]?.blockTimestamp || 0),
                  'yyy-MM-dd hh:mm:ss'
                )}
              </div>
            </div>

            {address &&
              address === nftMetadata?.owner &&
              address !== stakerAddress && (
                <>
                  <span className="mt-5 text-lg font-bold">
                    <b>Not for race</b>
                  </span>

                  <Web3Button
                    theme="light"
                    contractAddress={stakingContractAddressHorseAAA}
                    action={() => stakeNft(nftMetadata?.metadata?.id || '')}
                  >
                    Register for race
                  </Web3Button>
                </>
              )}

            {stakerAddress && stakeInfo && (
              <div className="itmes-start mt-5 flex flex-col justify-center ">
                {/* Staking Infomation */}
                <div className="text-sm font-bold xl:text-lg">
                  <b>Registered</b>
                </div>
                <div className="flex flex-col ">
                  <div className=" flex flex-row items-center justify-start text-xs">
                    {format(
                      Date.parse(saleHistory[0]?.blockTimestamp || 0),
                      'yyy-MM-dd hh:mm:ss'
                    )}
                  </div>
                </div>
              </div>
            )}

            {address && address === stakerAddress && (
              <>
                {/*
              <Web3Button
                theme="light"
                contractAddress={
                  stakingContractAddressHorseAAA
                }
                action={() => stakeNft(nftMetadata?.metadata?.id || '')}
                >
                Unregister
              </Web3Button>
              */}
              </>
            )}

            <span className="mt-5 text-lg font-bold">
              <b>Race History</b>
            </span>

            <RaceHistoryTable tokenId={nftMetadata?.metadata?.id} />
          </div>
        </Collapse>
      </div>

      {/*
        <div className="ml-2 mt-2 flex flex-row items-center justify-between gap-2">
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
                width={74}
                height={10}
              />
            </div>
          </Button>
        </div>
          */}

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
