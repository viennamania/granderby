import { useState, useEffect } from 'react';
import { useCopyToClipboard } from 'react-use';
import AuthorInformation from '@/components/author/author-information';
import { authorData } from '@/data/static/author';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import Button from '@/components/ui/button';
import AnchorLink from '@/components/ui/links/anchor-link';
import Avatar from '@/components/ui/avatar';
import ProfileTab from '@/components/rent-horse/profile-tab';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
  tokenContractAddressGRD,
} from '../../config/contractAddresses';

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
} from '@thirdweb-dev/react';

import { BigNumber, ethers } from 'ethers';

export default function Profile() {
  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();

  function handleCopyToClipboard() {
    copyToClipboard(authorData.wallet_key);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }

  const address = useAddress();

  const { contract: nftDropContract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

  const { contract: stakingContract, isLoading } = useContract(
    stakingContractAddressHorseAAA
  );

  useEffect(() => {
    if (!stakingContract || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await stakingContract?.call('getStakeInfo', [address]);
      ////const stakeInfo = await contract?.call("getStakeInfo", );
      setClaimableRewards(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, stakingContract]);

  return (
    <div className="flex w-full flex-col pt-4 md:flex-row md:pt-10 lg:flex-row 3xl:pt-12">
      <>
        <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 md:w-72 ltr:md:border-r md:ltr:pr-7 rtl:md:border-l md:rtl:pl-7 lg:ltr:pr-10 lg:rtl:pl-10 2xl:w-80 3xl:w-96 3xl:ltr:pr-14 3xl:rtl:pl-14">
          {/*
          <div className="flex justify-center">
            <ConnectWallet theme="dark" />
          </div>
  */}

          {!address ? (
            <></>
          ) : (
            <div className="text-center ltr:md:text-left rtl:md:text-right">
              {/*

              <h2 className="text-xl font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl">
                {authorData?.name}
              </h2>
              <div className="mt-1 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
                @{authorData?.user_name}
              </div>

              <div className="md:max-w-auto mx-auto mt-5 flex h-9 max-w-sm items-center rounded-full bg-white shadow-card dark:bg-light-dark md:mx-0 xl:mt-6">
                <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-gray-900 px-4 text-xs text-white sm:text-sm">
                  #{authorData?.id}
                </div>
                <div className="text truncate text-ellipsis bg-center text-xs text-gray-500 ltr:pl-4 rtl:pr-4 dark:text-gray-300 sm:text-sm">
                  {address}
                  
                </div>
                <div
                  title="Copy Address"
                  className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  onClick={() => handleCopyToClipboard()}
                >
                  {copyButtonStatus ? (
                    <Check className="h-auto w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-auto w-3.5" />
                  )}
                </div>
              </div>
                  */}

              <div className="mt-3 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
                <span>Current Balance</span>
                <h3>
                  <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
                </h3>
              </div>

              <div className="mt-3 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
                <span>Claimable Rewards for Horse</span>
                <h3>
                  <b>
                    {!claimableRewards
                      ? 'Loading...'
                      : ethers.utils.formatUnits(claimableRewards, 18)}
                  </b>{' '}
                  {tokenBalance?.symbol}
                </h3>

                <Web3Button
                  theme="light"
                  //colorMode="dark"
                  //accentColor="#5204BF"
                  contractAddress={stakingContractAddressHorseAAA}
                  action={async (contract) => {
                    try {
                      const tx = await contract.call('claimRewards');
                      //console.log(tx);
                      alert('Rewards Claimed!');

                      const stakeInfo = await stakingContract?.call(
                        'getStakeInfo',
                        [address]
                      );
                      ////const stakeInfo = await contract?.call("getStakeInfo", );
                      setClaimableRewards(stakeInfo[1]);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  Claim Rewards
                </Web3Button>
              </div>
            </div>
          )}
        </div>
      </>

      <div className="grow pb-9 pt-6 md:-mt-2.5 md:pb-0 md:pt-1.5 md:ltr:pl-7 md:rtl:pr-7 lg:ltr:pl-10 lg:rtl:pr-10 3xl:ltr:pl-14 3xl:rtl:pr-14">
        <ProfileTab />
      </div>

      {/*
      <AuthorInformation data={authorData} />
                */}
    </div>
  );
}
