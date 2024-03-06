import { coinIdData } from '@/data/static/coin-id';
import { CoinExplore } from '@/data/static/coin-list';
import React, { useState, useEffect, use } from 'react';
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

///import RaceHistoryTable from '@/components/nft-transaction/race-history-table';

import RaceHistoryTable from '@/components/nft-transaction/horse-race-history-table';

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
import { set } from 'lodash';

import { StaticImageData } from 'next/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import FeaturedCard from '@/components/nft/featured-card';
import ListCard from '@/components/ui/list-card';

import Avatar from '@/components/ui/avatar';

import { nftData } from '@/data/static/single-nft';

import { useModal } from '@/components/modal-views/context';

// dummy data
import User1 from '@/assets/images/game/icon_rank_1.jpg';
import User2 from '@/assets/images/game/icon_rank_2.jpg';
import User3 from '@/assets/images/game/icon_rank_3.jpg';
import User4 from '@/assets/images/avatar/11.jpg';
import User5 from '@/assets/images/collection/collection-1.jpg';
import User6 from '@/assets/images/collection/collection-2.jpg';
import User7 from '@/assets/images/collection/collection-3.jpg';
import User8 from '@/assets/images/collection/collection-4.jpg';
import User9 from '@/assets/images/collection/collection-5.jpg';
import User10 from '@/assets/images/collection/collection-6.jpg';

const data = [
  { name: 'Amanda Jones', thumbnail: User1 },
  { name: 'Marcos Llanos', thumbnail: User2 },
  { name: 'Garry Heffernan', thumbnail: User3 },
  { name: 'Teresa J. Brown', thumbnail: User4 },
  { name: 'Williams Sarah', thumbnail: User5 },
  { name: 'Teresa W. Luter', thumbnail: User6 },
  { name: 'Dorothy Pacheco', thumbnail: User7 },
  { name: 'Christopher', thumbnail: User8 },
  { name: 'Ted Luster', thumbnail: User4 },
  { name: 'R. Foster', thumbnail: User9 },
  { name: 'Domingo', thumbnail: User3 },
  { name: 'Conway', thumbnail: User10 },
];

export default function NftInfo({ nftMetadata }: any) {
  ///console.log('nftMetadata=========================', nftMetadata.id);

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
    useContractRead(contractStaking, 'stakerAddress', [nftMetadata?.id]);

  ////console.log('stakerAddress', stakerAddress);

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
        if (listing.tokenId === nftMetadata?.id) {
          //setListingId(listing.id);

          setDirectListing(listing);

          ////console.log('nft-single-price listing', listing);

          return;
        }
      });
    }
  }, [directListings, nftMetadata?.id]);

  const { contract: tokenContractUSDC } = useContract(
    tokenContractAddressUSDC,
    'token'
  );
  const { data: tokenBalanceUSDC, isLoading: isLoadingTokenBalanceUSDC } =
    useTokenBalance(tokenContractUSDC, address);

  ///console.log("nftmetadata",nftMetadata);

  const [lastPrice, setLastPrice] = useState(0);

  /* /api/nft/getOneByTokenId */
  const [nft, setNft] = useState<any>(null);

  const [gameHorseInfo, setGameHorseInfo] = useState<any>(null);

  const [liveHorseInfo, setLiveHorseInfo] = useState<any>(null);

  const [owner, setOwner] = useState('');
  ////const [nftMetadata, setNftMetadata] = useState<any>(null);
  /* /api/nft/getOneByTokenId */

  const [gameHorseName, setGameHorseName] = useState<any>(null);

  const [gameHorseId, setGameHorseId] = useState<any>(null);

  const [gameHorseDescription, setGameHorseDescription] = useState<any>(null);

  const [gameHorseStatus, setGameHorseStatus] = useState<any>(null);

  const [gameHorseBalance, setGameHorseBalance] = useState<number>(0);

  useEffect(() => {
    async function getNft() {
      if (!nftMetadata?.id) return;

      const response = await fetch('/api/nft/getOneByTokenId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenId: nftMetadata?.id,
        }),
      });
      const data = await response.json();

      console.log('data', data);

      //console.log('nftMetadata?.id', nftMetadata?.id);

      //console.log('data=====', data);

      ///console.log('data.horse', data?.horse);

      setNft(data?.horse);

      //console.log('data?.horse?.liveHorseInfo', data?.horse?.liveHorseInfo);

      setLiveHorseInfo(data?.horse?.liveHorseInfo);

      setOwner(data?.horse?.holder);

      ///setNftMetadata(data?.horse?.nft);

      ///console.log('data?.horse?.nft', data?.horse?.nft);

      // gameHorseDescription => {trait_type: "name"}
      setGameHorseName(
        data?.horse?.gameHorseDescription?.find(
          (item: any) => item?.trait_type === 'name'
        )?.value
      );

      // gameHorseId is remove '#'

      console.log('gameHorseName', gameHorseName);

      // gameHorseDescription => {trait_type: "desription"}
      setGameHorseDescription(
        data?.horse?.gameHorseDescription?.find(
          (item: any) => item?.trait_type === 'description'
        )?.value
      );

      //data?.horse?.totalPricePaid;

      if (
        data?.horse?.paidToken === '0x0000000000000000000000000000000000001010'
      ) {
        const price =
          (data?.horse?.totalPricePaid / 1000000000000000000) * 0.66;
        setLastPrice(price);
      } else if (
        data?.horse?.paidToken === '0xe426D2410f20B0434FE2ce56299a1543d3fDe450'
      ) {
        const price = data?.horse?.totalPricePaid / 1000000000000000000;
        setLastPrice(price);
      } else if (
        data?.horse?.paidToken === '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
      ) {
        const price = data?.horse?.totalPricePaid / 1000000;
        setLastPrice(price);
      }

      ////setGameHorseBalance(data?.horseBalance || 0);
    }

    async function getNftBalance() {
      if (!nftMetadata?.id) return;

      const response = await fetch('/api/nft/getBalanceByTokenId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenId: nftMetadata?.id,
        }),
      });
      const data = await response.json();

      console.log('data', data);

      setGameHorseBalance(data?.balance || 0);
    }

    getNft();

    getNftBalance();
  }, [nftMetadata?.id]);

  const [raceHistory, setRaceHistory] = useState([] as any);

  const [saleHistory, setSaleHistory] = useState([] as any);

  useEffect(() => {
    const getLastSale20 = async () => {
      if (!nftMetadata?.id) return;

      console.log('price-history-table nftMetadata?.id: ', nftMetadata?.id);

      const response = await fetch('/api/nft/horse/history/price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'getAllByTokenId',
          tokenId: nftMetadata?.id,
        }),
      });
      const data = await response.json();

      ///console.log('data.all: ', data.all);

      setSaleHistory(data.all);
    };

    getLastSale20();
  }, [nftMetadata?.id]);

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

    try {
      const data = await contractStaking?.call('stake', [[id]]);

      //console.log('staking data', data);

      if (data) {
        //alert('Your request has been sent successfully');

        alert('staking success');

        /*
        setSuccessMsgSnackbar('Your request has been sent successfully');
        handleClickSucc();
        */
      } else {
        console.log('error');

        /*
        setErrMsgSnackbar(data);
        handleClickErr();
        */
      }
    } catch (error) {
      console.log('stake error', error);
    }
  }

  async function withdrawNft(id: string) {
    if (!address) return;

    const data = await contractStaking?.call('withdraw', [[id]]);

    console.log('withdraw data', data);

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

  const [block_chains, setBlock_chains] = useState<any>(null);

  const { openModal } = useModal();

  return (
    <div className="flex">
      <div className="flex h-full w-full flex-col gap-3 rounded-lg border ">
        {/* nft title */}
        <div className="mt-5 flex flex-col items-center justify-center gap-2  ">
          <div className=" flex flex-row items-center justify-center gap-5">
            {/*
            <Image
              src="/images/horse-male.png"
              alt="live"
              width={25}
              height={25}
            />
            */}
            <span className="text-2xl font-extrabold xl:text-3xl">
              {gameHorseName}
            </span>
          </div>
          <span className="flex flex-row items-center justify-center gap-2">
            affiliated to City One Field
          </span>
          <span className="flex flex-col items-center justify-center gap-2 ">
            <span className="text-xl font-extrabold xl:text-2xl">
              {lastPrice} USDC
            </span>
            <span className="  text-lg font-bold text-green-600">
              (+2,422.25)
            </span>
          </span>
        </div>

        <div className="  ml-5 mr-5 flex flex-col  xl:ml-20 xl:mr-20">
          <ParamTab
            tabMenu={[
              {
                title: 'Profits',
                path: 'profit',
              },
              {
                title: 'Profile',
                path: 'profile',
              },
              {
                title: 'Career',
                path: 'career',
              },
              {
                title: 'Misc.',
                path: 'misc',
              },
            ]}
          >
            <TabPanel className="focus:outline-none">
              <div className="flex w-full flex-col items-center justify-center gap-5 p-10">
                <div className="flex w-full flex-row items-center justify-center gap-20">
                  <div className="flex flex-col items-center justify-center gap-5">
                    <span className="text-xl font-bold">ALLOWANCE</span>
                    <Image
                      src="/images/icon-gdp.png"
                      alt="sugar"
                      width={30}
                      height={30}
                    />
                  </div>

                  <div className=" flex w-64 flex-row items-center justify-between gap-2  rounded-lg bg-slate-100 p-3 pl-5 pr-5">
                    <div className="flex flex-col items-end justify-center gap-2">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <div className="  text-xl font-bold">Accumulate:</div>
                        <div className=" flex w-20 flex-row items-center justify-end gap-2">
                          <span className="  text-xl font-bold">
                            {
                              // dollar format

                              gameHorseBalance
                            }
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-row items-center justify-center gap-2">
                        <div className="  text-xl font-bold">Keep:</div>
                        <div className=" flex w-20 flex-row items-center justify-end gap-2">
                          <span className="  text-xl font-bold">
                            {gameHorseBalance}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-row items-center justify-center gap-2">
                        <div className="  text-xl font-bold">Last:</div>

                        <div className="flex w-20 flex-row items-center justify-end gap-2">
                          <span className="  text-lg font-bold text-green-600">
                            +{gameHorseBalance}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*
                <div className="flex w-full flex-row items-center justify-center gap-5">
                  <span className="text-xl font-bold">WIN POINTS</span>
                  <div className=" flex  w-52 flex-row items-center justify-between gap-2  rounded-lg bg-slate-100 p-3 pl-5 pr-5">
                    <Image
                      src="/images/shop/icon-carrot.png"
                      alt="sugar"
                      width={30}
                      height={30}
                    />
                    <div className="flex flex-col items-end justify-center gap-2">
                      <span className="  text-xl font-bold">332,562</span>
                      <span className="  text-lg font-bold text-green-600">
                        +45.42
                      </span>
                    </div>
                  </div>
                </div>
                */}
              </div>
            </TabPanel>

            <TabPanel className="focus:outline-none">
              <div className="flex w-full flex-col items-center justify-center gap-5 p-5">
                <div className="flex w-full  flex-row items-center justify-between gap-5 ">
                  <span className="  text-xl font-extrabold xl:text-2xl">
                    Running Ability
                  </span>

                  <div className=" flex flex-col items-center justify-between gap-5 p-3 xl:grid xl:grid-cols-3">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="  text-xl font-extrabold xl:text-2xl">
                        {liveHorseInfo?.SPEED}
                      </span>
                      <span className="  text-lg">SPEED</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="  text-xl font-extrabold xl:text-2xl">
                        {liveHorseInfo?.PRECENDING}
                      </span>
                      <span className="  text-lg">PRECEDE</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="  text-xl font-extrabold xl:text-2xl">
                        {liveHorseInfo?.OVERTAKING}
                      </span>
                      <span className="  text-lg">OVERTAKING</span>
                    </div>
                  </div>
                </div>

                <div className="  flex w-full  flex-row items-center justify-between gap-5">
                  <span className="  text-xl font-extrabold xl:text-2xl">
                    Physical Ability
                  </span>

                  <div className=" flex flex-col items-center justify-between gap-5 p-3 xl:grid xl:grid-cols-4">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="  text-xl font-extrabold xl:text-2xl">
                        {liveHorseInfo?.STAMINA}
                      </span>
                      <span className="  text-lg">STAMINA</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="  text-xl font-extrabold xl:text-2xl">
                        {liveHorseInfo?.SPRIT}
                      </span>
                      <span className="  text-lg">SPIRIT</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="  text-xl font-extrabold xl:text-2xl">
                        {liveHorseInfo?.POWER}
                      </span>
                      <span className="  text-lg">POWER</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="  text-xl font-extrabold xl:text-2xl">
                        {liveHorseInfo?.AGILIGHTY}
                      </span>
                      <span className="  text-lg">AGILITY</span>
                    </div>
                  </div>
                </div>

                <div className="flex w-full  flex-col items-center justify-start gap-5">
                  <div className="flex w-full flex-col items-start  justify-start gap-10 xl:grid xl:grid-cols-2">
                    <div className="flex w-full flex-row items-center justify-start gap-2 text-lg">
                      <span className=" w-full text-left  font-extrabold ">
                        Age
                      </span>
                      <span className="w-full text-right  text-lg">
                        {liveHorseInfo?.AGE}y
                      </span>
                    </div>
                    <div className="flex w-full flex-row items-center justify-start gap-2 text-lg">
                      <span className=" w-full  text-left font-extrabold ">
                        Condition
                      </span>
                      <span className=" w-full text-right text-lg">
                        {liveHorseInfo?.CONDITION}
                      </span>
                    </div>
                  </div>

                  <div className=" flex w-full flex-col items-start justify-start gap-10 xl:grid xl:grid-cols-2">
                    <div className="flex w-full flex-row items-center justify-start gap-2 text-lg">
                      <span className="w-28 text-left font-extrabold ">
                        Weight
                      </span>
                      <span className=" w-full text-right text-lg">
                        {liveHorseInfo?.WEIGHT}kg
                      </span>
                    </div>
                    <div className="flex w-full  flex-row items-center justify-start gap-2 text-lg">
                      <span className="w-full text-left font-extrabold">
                        Training
                      </span>
                      <span className="w-full text-right  text-lg">
                        {liveHorseInfo?.TRANNING}
                      </span>
                    </div>
                  </div>

                  <div className="flex w-full flex-col items-start  justify-start gap-10 xl:grid xl:grid-cols-2">
                    <div className="flex w-full flex-row items-center justify-start gap-2 text-lg">
                      <span className="w-full text-left  font-extrabold ">
                        Impost
                      </span>
                      <span className=" w-full text-right text-lg">+0.5</span>
                    </div>
                    <div className="flex w-full flex-row items-center justify-start gap-2 text-lg">
                      <span className=" w-full font-extrabold ">
                        Running Style
                      </span>
                      <span className="w-full text-right ">Front Runner</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel className="focus:outline-none">
              <div className="flex w-full flex-col items-center justify-center gap-5 p-10">
                <div className="grid w-full grid-cols-7 gap-2">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-xl font-extrabold">
                      {liveHorseInfo?.RECORD}
                    </span>
                    <span className="text-lg">Total</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-xl font-extrabold">
                      {liveHorseInfo?.RECORD_1R}
                    </span>
                    <span className="text-lg">1st</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-xl font-extrabold">
                      {liveHorseInfo?.RECORD_2R}
                    </span>
                    <span className="text-lg">2nd</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-xl font-extrabold">
                      {liveHorseInfo?.RECORD_3R}
                    </span>
                    <span className="text-lg">3rd</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-xl font-extrabold">28.3%</span>
                    <span className="text-lg">Win</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-xl font-extrabold">34.6%</span>
                    <span className="text-lg">Place</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-xl font-extrabold">76.5%</span>
                    <span className="text-lg">Quinella</span>
                  </div>
                </div>

                <div className="mt-10 flex w-full flex-row items-center justify-center gap-10">
                  <span className="text-2xl font-extrabold">Last 5 Runs</span>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Image
                      src="/images/game/icon_lastrun_1.png"
                      alt="live"
                      width={35}
                      height={35}
                    />
                    <Image
                      src="/images/game/icon_lastrun_2.png"
                      alt="live"
                      width={35}
                      height={35}
                    />
                    <Image
                      src="/images/game/icon_lastrun_3.png"
                      alt="live"
                      width={35}
                      height={35}
                    />
                    <Image
                      src="/images/game/icon_lastrun_4.png"
                      alt="live"
                      width={35}
                      height={35}
                    />
                    <Image
                      src="/images/game/icon_lastrun_4.png"
                      alt="live"
                      width={35}
                      height={35}
                    />
                  </div>
                </div>

                <div className="mt-10 flex flex-row items-center justify-center gap-2">
                  <button
                    type="button"
                    className="
                      w-28
                      rounded-full
                      bg-slate-200
                      p-3
                      pl-5
                      pr-5
                      text-sm
                      font-bold
                      xl:text-xl
                    "
                    //onClick={() =>
                    //  router.push(
                    //</div>    `https://granderby.market/horse-details/${nftMetadata?.id}`
                    //  )
                    //}

                    /*
                    onClick={() => openModal(
                      
                      //'SHARE_VIEW'

                      //'SALE_VIEW'

                      //'FOLLOWERS_VIEW'

                      //'FOLLOWING_VIEW'

                      //'SEARCH_VIEW'

                      //'NFT_PREVIEW'

                      //'PROFILE_INFO_VIEW'

                      'WALLET_CONNECT_VIEW'



                      )}
                      */

                    /*
                      onClick={() =>
                        openModal('FOLLOWERS_VIEW', {
                          title: 'Followers',
                          count: '1,845',
                          users: data,
                        })
                      }
                      */

                    /*
                      onClick={() =>
                        openModal('FOLLOWING_VIEW', {
                          title: 'Following',
                          count: '1,504',
                          users: data,
                        })
                      }
                      */

                    /*
                    onClick={() =>
                      openModal('RACE_HISTORY_VIEW', {
                        title: 'Following',
                        count: '1,504',
                        users: data,
                      })
                    }
                    */
                  >
                    History
                  </button>
                </div>

                <RaceHistoryTable
                  tokenId={
                    ////nftMetadata?.id

                    /// remove first character from liveHorseInfo?.HORSE_UID
                    liveHorseInfo?.HORSE_UID?.slice(1)
                  }
                />

                {/*
                {nftData?.history?.map((item) => (
                  <FeaturedCard
                    item={item}
                    key={item?.id}
                    className="mb-3 first:mb-0"
                  />
                ))}
                */}
              </div>
            </TabPanel>

            <TabPanel className="focus:outline-none">
              <div className="flex w-full flex-col items-center justify-center gap-5 p-5">
                <div className="flex w-full  flex-col items-center justify-start gap-5">
                  <div className="grid w-full grid-cols-2 items-start justify-start gap-10">
                    <div className="flex w-full flex-row items-center justify-start gap-2">
                      <span className=" w-full text-left text-lg font-extrabold xl:text-xl">
                        Birthday
                      </span>
                      <span className="w-full text-right  text-lg">
                        2022.11.8
                      </span>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-2">
                      <span className="w-full text-lg font-extrabold xl:text-xl">
                        Recent Price
                      </span>
                      <span className=" w-full text-right text-lg">
                        {lastPrice === 0 ? 'Not for sale' : lastPrice + ' USDC'}
                      </span>
                    </div>
                  </div>

                  <div className="grid w-full grid-cols-2 items-start justify-start gap-10">
                    <div className="flex w-full flex-row items-center justify-start gap-2">
                      <span className="w-full text-left text-lg font-extrabold xl:text-xl">
                        TokenID
                      </span>
                      <span className=" w-full text-right text-lg">
                        #{nftMetadata?.id}
                      </span>
                    </div>
                    <div className="flex w-full flex-row items-center justify-start gap-2">
                      <span className="w-full text-left text-lg font-extrabold xl:text-xl">
                        UID (test)
                      </span>
                      <span className=" w-full text-right text-lg">
                        #{liveHorseInfo?.HORSE_UID}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </ParamTab>
        </div>

        {/* Race Information */}
        {/*

        <div className=" flex flex-col items-center justify-center gap-5  ">
          <Collapse label="Race Information" initialOpen={true}>
            <div className="itmes-start flex flex-col justify-center p-5">
              
              <div className="text-sm font-bold xl:text-lg">
                <b>Last Rank</b>
              </div>
              <div className="flex flex-col ">
                <div className="flex flex-row items-center  gap-2 text-sm font-bold xl:text-lg">
                  <button
                    className=" w-24 text-sm font-bold xl:text-xl "
                    //onClick={() =>
                    //  router.push(
                    //</div>    `https://granderby.market/horse-details/${nftMetadata?.id}`
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
                      action={() => stakeNft(nftMetadata?.id || '')}
                    >
                      Register for race
                    </Web3Button>
                  </>
                )}

              {stakerAddress && stakeInfo && (
                <div className="itmes-start mt-5 flex flex-col justify-center ">
                  
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
                <div className="mt-5">
                  <Web3Button
                    theme="light"
                    contractAddress={stakingContractAddressHorseAAA}
                    action={() => withdrawNft(nftMetadata?.id || '')}
                  >
                    Unregister
                  </Web3Button>
                </div>
              )}

              <span className="mt-5 text-lg font-bold">
                <b>Race History</b>
              </span>

              <RaceHistoryTable tokenId={nftMetadata?.id} />
            </div>
          </Collapse>
        </div>

        */}
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
