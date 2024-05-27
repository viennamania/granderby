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

/*
import {
  tokenContractAddressHV,
  tokenContractAddressGRD,
  stakingContractAddressHorseAAA,
} from '@/config/contractAddresses';
*/

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

  /*
  const { contract: tokenContractHV } = useContract(
    tokenContractAddressHV,
    'token'
  );

  const { data: tokenBalanceHV } = useTokenBalance(tokenContractHV, address);
  */

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

  /*
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
    */

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

  return (
    <>
      <NextSeo title="Profile" description="Granderby - Web3 NFT Game" />

      <div className="">
        <video
          autoPlay
          loop
          muted
          playsInline
          //className="h-full w-full object-cover"
          className="h-full w-full object-cover"
        >
          <source
            src="https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/JoyValley.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className=" mx-auto flex w-full shrink-0 flex-col items-center justify-center md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        {/* 5000 NFTs */}

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="mt-10 text-center text-4xl font-bold text-gray-800 dark:text-gray-100">
            5000 NFTs
          </div>
        </div>
      </div>
    </>
  );
};

TrackPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default TrackPage;
