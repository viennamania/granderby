import { useState, useEffect } from 'react';
import { useCopyToClipboard } from 'react-use';
import AuthorInformation from '@/components/author/author-information';
import { authorData } from '@/data/static/author';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import Button from '@/components/ui/button';
import AnchorLink from '@/components/ui/links/anchor-link';
import Avatar from '@/components/ui/avatar';
import ProfileTab from '@/components/profile/profile-tab';

//import CryptocurrencyBalanceTable from '@/components/cryptocurrency-balance-table/cryptocurrency-balance-table';

import FtBalanceTable from '@/components/ft-balance-table/ft-balance-table';

import {
  nftDropContractAddressHorse,
  nftDropContractAddressJockey,
  stakingContractAddressHorseAAA,
  stakingContractAddressJockey,
  tokenContractAddressGRD,
  tokenContractAddressUSDC,
} from '@/config/contractAddresses';

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
  useBalance,
} from '@thirdweb-dev/react';

import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';

import { BigNumber, ethers } from 'ethers';

export default function Wallet() {
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

  const { data: balance, isLoading: isLoadingBalance } =
    useBalance(NATIVE_TOKEN_ADDRESS);

  const { contract: nftDropContractHorse } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );
  const { data: ownedNftsHorse } = useOwnedNFTs(nftDropContractHorse, address);

  const { contract: nftDropContractJockey } = useContract(
    nftDropContractAddressJockey,
    'nft-drop'
  );
  const { data: ownedNftsJockey } = useOwnedNFTs(
    nftDropContractJockey,
    address
  );

  const { contract: tokenContractGRD } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalanceGRD } = useTokenBalance(tokenContractGRD, address);

  const { contract: tokenContractUSDC } = useContract(
    tokenContractAddressUSDC,
    'token'
  );
  const { data: tokenBalanceUSDC } = useTokenBalance(
    tokenContractUSDC,
    address
  );

  const [claimableRewardsHorse, setClaimableRewardsHorse] =
    useState<BigNumber>();

  const [claimableRewardsJockey, setClaimableRewardsJockey] =
    useState<BigNumber>();

  const { contract: stakingContractHorse, isLoading: isLoadingHorse } =
    useContract(stakingContractAddressHorseAAA);

  const { contract: stakingContractJockey, isLoading: isLoadingJockey } =
    useContract(stakingContractAddressJockey);

  useEffect(() => {
    if (!stakingContractHorse || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await stakingContractHorse?.call('getStakeInfo', [
        address,
      ]);
      ////const stakeInfo = await contract?.call("getStakeInfo", );
      setClaimableRewardsHorse(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, stakingContractHorse]);

  useEffect(() => {
    if (!stakingContractJockey || !address) return;

    async function loadClaimableRewardsJockey() {
      const stakeInfo = await stakingContractJockey?.call('getStakeInfo', [
        address,
      ]);
      ////const stakeInfo = await contract?.call("getStakeInfo", );
      setClaimableRewardsJockey(stakeInfo[1]);
    }

    loadClaimableRewardsJockey();
  }, [address, stakingContractJockey]);

  return (
    <div className="flex w-full flex-col pt-4 md:flex-row md:pt-10 lg:flex-row 3xl:pt-12">
      {!address ? (
        <>
          <div className="flex w-full justify-center">
            <ConnectWallet theme="light" />
          </div>
        </>
      ) : (
        <>
          <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 md:w-72 ltr:md:border-r md:ltr:pr-7 rtl:md:border-l md:rtl:pl-7 lg:ltr:pr-10 lg:rtl:pl-10 2xl:w-80 3xl:w-96 3xl:ltr:pr-14 3xl:rtl:pl-14">
            {/*
            <div className="flex w-full justify-center">
              <ConnectWallet theme="dark" />
            </div>
      */}

            <div className="text-center ltr:md:text-right rtl:md:text-right">
              <div className=" mt-3 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
                <span>Current Balance</span>

                {/*
                <h3>
                  <b>
                    {!balance?.value
                      ? 'Loading...'
                      : Number(
                          ethers.utils.formatUnits(balance?.value, 18)
                        ).toFixed(2)}
                  </b>{' '}
                  {balance?.symbol}
                </h3>
                      */}

                <h3>
                  <b>{Number(tokenBalanceGRD?.displayValue).toFixed(2)}</b>{' '}
                  {tokenBalanceGRD?.symbol}
                </h3>
                <h3>
                  <b>{Number(tokenBalanceUSDC?.displayValue).toFixed(2)}</b>{' '}
                  {tokenBalanceUSDC?.symbol}
                </h3>
              </div>

              {/*
              <div className=" mb-10 mt-3 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
                <span>Claimable Rewards for Horse</span>
                <h3>
                  <b>
                    {!claimableRewardsHorse
                      ? 'Loading...'
                      : Number(
                          ethers.utils.formatUnits(claimableRewardsHorse, 18)
                        ).toFixed(2)}
                  </b>{' '}
                  {tokenBalanceGRD?.symbol}
                </h3>

              
                <Web3Button
                  theme="light"
                  //colorMode="dark"
                  //accentColor="#5204BF"
                  contractAddress={stakingContractAddressHorseAAA}
                  action={async (contract) => {
                    try {
                      const tx = await contract?.call('claimRewards');
                      console.log(tx);
                      alert('Rewards Claimed!');

                      const stakeInfo = await stakingContractHorse?.call(
                        'getStakeInfo',
                        [address]
                      );
                      ////const stakeInfo = await contract?.call("getStakeInfo", );
                      setClaimableRewardsHorse(stakeInfo[1]);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  Claim Rewards
                </Web3Button>
              
              </div>

              <div className="mt-3 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
                <span>Claimable Rewards for Jockey</span>
                <h3>
                  <b>
                    {!claimableRewardsJockey
                      ? 'Loading...'
                      : Number(
                          ethers.utils.formatUnits(claimableRewardsJockey, 18)
                        ).toFixed(2)}
                  </b>{' '}
                  {tokenBalanceGRD?.symbol}
                </h3>

                
                <Web3Button
                  theme="light"
                  //colorMode="dark"
                  //accentColor="#5204BF"
                  contractAddress={stakingContractAddressJockey}
                  action={async (contract) => {
                    try {
                      const tx = await contract?.call('claimRewards');
                      console.log(tx);
                      alert('Rewards Claimed!');

                      const stakeInfo = await stakingContractJockey?.call(
                        'getStakeInfo',
                        [address]
                      );
                      ////const stakeInfo = await contract?.call("getStakeInfo", );
                      setClaimableRewardsJockey(stakeInfo[1]);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  Claim Rewards
                </Web3Button>
                
              </div>
                */}
            </div>
          </div>

          <div className="grow pb-9 pt-6 md:-mt-2.5 md:pb-0 md:pt-1.5 md:ltr:pl-7 md:rtl:pr-7 lg:ltr:pl-10 lg:rtl:pr-10 3xl:ltr:pl-14 3xl:rtl:pr-14">
            <FtBalanceTable />
          </div>

          {/*}
      <AuthorInformation data={authorData} />
                */}
        </>
      )}
    </div>
  );
}
