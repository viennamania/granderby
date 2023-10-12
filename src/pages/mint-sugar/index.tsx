import cn from 'classnames';

import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import type { NextPageWithLayout } from '@/types';

import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';

import { ConnectButton } from '@paperxyz/embedded-wallet-service-rainbowkit';
//import { renderPaperCheckoutLink } from '@paperxyz/js-client-sdk';

//import { useAccount } from 'wagmi';

//import RootLayout from './layout';

import AnchorLink from '@/components/ui/links/anchor-link';

import RootLayout from '@/layouts/_root-layout';

import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

import NFTCard from '@/components/nft/NFTCard';

import { BigNumber, utils } from 'ethers';

import { parseIneligibility } from '@/utils/parseIneligibility';

//import styles from '@/styles/Home.module.css';

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
  useContractMetadata,
  useClaimConditions,
  useActiveClaimConditionForWallet,
  useClaimerProofs,
  useClaimIneligibilityReasons,
  useTokenSupply,
  useClaimToken,
} from '@thirdweb-dev/react';

import {
  tokenContractAddressSUGARDrop,
  tokenContractAddressGRD,
} from '@/config/contractAddresses';

/* ======================================
              Main Component
======================================= */
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: 'Granderby - Mint',
      description: 'powered by MOMOCON',
      image: '/mint-bg.png',
    },
  };
};

const MintPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  //const MintPage: NextPageWithLayout = (props) => {
  //const MintPage: NextPageWithLayout = ({title, image}) => {

  const { title, description, image } = props;

  const { layout } = useLayout();

  const address = useAddress();

  const { contract: tokenContractGRD } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalanceGRD } = useTokenBalance(tokenContractGRD, address);

  const { contract: tokenContractSUGAR } = useContract(
    tokenContractAddressSUGARDrop,
    'token-drop'
  );

  const { data: tokenBalanceSUGAR } = useTokenBalance(
    tokenContractSUGAR,
    address
  );

  /////const { contract } = useContract(tokenAddress, "token-drop");

  const {
    mutateAsync: claimTokenSafe,
    isLoading: isLoadingContract,
    error: errorContract,
  } = useClaimToken(tokenContractSUGAR);

  const [quantity, setQuantity] = useState(1);
  const { data: contractMetadata } = useContractMetadata(tokenContractSUGAR);

  const claimConditions = useClaimConditions(tokenContractSUGAR);
  const activeClaimCondition = useActiveClaimConditionForWallet(
    tokenContractSUGAR,
    address
  );
  const claimerProofs = useClaimerProofs(tokenContractSUGAR, address || '');
  const claimIneligibilityReasons = useClaimIneligibilityReasons(
    tokenContractSUGAR,
    {
      quantity,
      walletAddress: address || '',
    }
  );

  const claimedSupply = useTokenSupply(tokenContractSUGAR);

  const totalAvailableSupply = useMemo(() => {
    try {
      return BigNumber.from(activeClaimCondition.data?.availableSupply || 0);
    } catch {
      return BigNumber.from(1_000_000_000);
    }
  }, [activeClaimCondition.data?.availableSupply]);

  const numberClaimed = useMemo(() => {
    return BigNumber.from(claimedSupply.data?.value || 0).toString();
  }, [claimedSupply]);

  const numberTotal = useMemo(() => {
    const n = totalAvailableSupply.add(
      BigNumber.from(claimedSupply.data?.value || 0)
    );
    if (n.gte(1_000_000_000)) {
      return '';
    }
    return n.toString();
  }, [totalAvailableSupply, claimedSupply]);

  const priceToMint = useMemo(() => {
    if (quantity) {
      const bnPrice = BigNumber.from(
        activeClaimCondition.data?.currencyMetadata.value || 0
      );

      /*
      return `${utils.formatUnits(
        bnPrice.mul(quantity).toString(),
        activeClaimCondition.data?.currencyMetadata.decimals || 18
      )} ${activeClaimCondition.data?.currencyMetadata.symbol}`;
        */

      return `${utils.formatUnits(
        bnPrice.mul(quantity).toString(),
        activeClaimCondition.data?.currencyMetadata.decimals || 18
      )} GRDB`;
    }
  }, [
    activeClaimCondition.data?.currencyMetadata.decimals,
    activeClaimCondition.data?.currencyMetadata.symbol,
    activeClaimCondition.data?.currencyMetadata.value,
    quantity,
  ]);

  const maxClaimable = useMemo(() => {
    let bnMaxClaimable;
    try {
      bnMaxClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimableSupply || 0
      );
    } catch (e) {
      bnMaxClaimable = BigNumber.from(1_000_000_000);
    }

    let perTransactionClaimable;
    try {
      perTransactionClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimablePerWallet || 0
      );
    } catch (e) {
      perTransactionClaimable = BigNumber.from(1_000_000_000);
    }

    if (perTransactionClaimable.lte(bnMaxClaimable)) {
      bnMaxClaimable = perTransactionClaimable;
    }

    const snapshotClaimable = claimerProofs.data?.maxClaimable;

    if (snapshotClaimable) {
      if (snapshotClaimable === '0') {
        // allowed unlimited for the snapshot
        bnMaxClaimable = BigNumber.from(1_000_000_000);
      } else {
        try {
          bnMaxClaimable = BigNumber.from(snapshotClaimable);
        } catch (e) {
          // fall back to default case
        }
      }
    }

    let max;
    if (totalAvailableSupply.lt(bnMaxClaimable)) {
      max = totalAvailableSupply;
    } else {
      max = bnMaxClaimable;
    }

    if (max.gte(1_000_000_000)) {
      return 1_000_000_000;
    }
    return max.toNumber();
  }, [
    claimerProofs.data?.maxClaimable,
    totalAvailableSupply,
    activeClaimCondition.data?.maxClaimableSupply,
    activeClaimCondition.data?.maxClaimablePerWallet,
  ]);

  const isSoldOut = useMemo(() => {
    try {
      return (
        (activeClaimCondition.isSuccess &&
          BigNumber.from(activeClaimCondition.data?.availableSupply || 0).lte(
            0
          )) ||
        numberClaimed === numberTotal
      );
    } catch (e) {
      return false;
    }
  }, [
    activeClaimCondition.data?.availableSupply,
    activeClaimCondition.isSuccess,
    numberClaimed,
    numberTotal,
  ]);

  const canClaim = useMemo(() => {
    return (
      activeClaimCondition.isSuccess &&
      claimIneligibilityReasons.isSuccess &&
      claimIneligibilityReasons.data?.length === 0 &&
      !isSoldOut
    );
  }, [
    activeClaimCondition.isSuccess,
    claimIneligibilityReasons.data?.length,
    claimIneligibilityReasons.isSuccess,
    isSoldOut,
  ]);

  const isLoading = useMemo(() => {
    return activeClaimCondition.isLoading || !tokenContractSUGAR;
  }, [activeClaimCondition.isLoading, tokenContractSUGAR]);

  const buttonLoading = useMemo(
    () => isLoading || claimIneligibilityReasons.isLoading,
    [claimIneligibilityReasons.isLoading, isLoading]
  );

  const buttonText = useMemo(() => {
    if (isSoldOut) {
      return 'Sold Out';
    }

    if (canClaim) {
      const pricePerToken = BigNumber.from(
        activeClaimCondition.data?.currencyMetadata.value || 0
      );

      if (pricePerToken.eq(0)) {
        return 'Pay (Free)';
      }

      return `Pay (${priceToMint})`;
    }

    if (claimIneligibilityReasons.data?.length) {
      return parseIneligibility(claimIneligibilityReasons.data, quantity);
    }

    if (buttonLoading) {
      return 'Checking eligibility...';
    }

    return 'Claiming not available';
  }, [
    isSoldOut,
    canClaim,
    claimIneligibilityReasons.data,
    buttonLoading,
    activeClaimCondition.data?.currencyMetadata.value,
    priceToMint,
    quantity,
  ]);

  /*
const address = "0x6CdA16E0fA6E6b8e957Db2cb5936AfA3A69A29FE"; // address of the wallet you want to claim the NFTs
const quantity = 42.69; // how many tokens you want to claim

const tx = await contract.erc20.claim(address, quantity);
const receipt = tx.receipt; // the transaction receipt
*/

  async function claimToken(toAddress: string, amount: number) {
    if (toAddress === '') {
      alert(`🌊 Please enter a valid address`);
      return;
    }

    if (amount === undefined || amount === 0) {
      alert(`🌊 Please enter a valid amount`);
      return;
    }

    ///setIsSending(true);

    try {
      /*
      const contract = await sdk.getContract(tokenContractAddressROMDrop);
      const transaction = await contract?.erc20.claim(
        toAddress,
        amount,
      );
      */

      /*
      const txResult = await contract.erc20.claim("{{amount}}", {
  checkERC20Allowance: false, // Set to true if you want to check ERC20 allowance
  currencyAddress: "{{currency_contract_address}}",
  pricePerToken: "{{price}}",
});
*/

      const transaction = await tokenContractSUGAR?.erc20.claim(amount, {
        checkERC20Allowance: false, // Set to true if you want to check ERC20 allowance
        currencyAddress: tokenContractAddressGRD,
        ///pricePerToken: "0.02",
      });

      console.log(`🌊 Sent transaction with hash: ${transaction?.receipt}`);

      //alert (`🌊 Sent transaction with hash: ${transaction?.receipt}`);

      alert(`🌊 Successfully transfered!`);

      ///setIsSending(false);

      //setAmount(0);
      ///setToAddress('');

      //router.reload();

      return transaction;
    } catch (error) {
      console.error(error);

      ///alert(`🌊 Failed to send transaction with hash: ${error}`);

      //setIsSending(false);
    }
  }

  return (
    <div className="text-center">
      {/* Header */}

      <div className="flex-cols mt-5 flex items-center justify-center gap-3 rounded-lg bg-black pb-5 pt-5 text-white">
        <div className="text-2xl font-bold">
          Buy {tokenBalanceSUGAR?.symbol}
        </div>
      </div>

      {address ? (
        <>
          <h3 className="mb-2 mt-10 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
            My Balance
          </h3>

          <div className="mb-7 flex flex-row items-center justify-center gap-2 text-center text-3xl font-bold tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
            <Image
              src="/images/icon-sugar.png"
              alt={tokenBalanceSUGAR?.symbol!}
              width={50}
              height={50}
              style={{ objectFit: 'contain' }}
            />
            <b>
              {tokenContractSUGAR === undefined ? (
                <>Loading...</>
              ) : (
                <div className="text-6xl font-bold">
                  {Number(tokenBalanceSUGAR?.displayValue).toFixed(2)}
                </div>
              )}
            </b>{' '}
            <span className="text-lg text-[#2b57a2] ">
              {tokenBalanceSUGAR?.symbol}
            </span>
          </div>
        </>
      ) : (
        <div className="m-10">
          <ConnectWallet theme="light" />
          <h4>to buy {tokenBalanceSUGAR?.symbol}</h4>
        </div>
      )}

      {(claimConditions.data &&
        claimConditions.data.length > 0 &&
        activeClaimCondition.isError) ||
        (activeClaimCondition.data &&
          activeClaimCondition.data.startTime > new Date() && (
            <p>Drop is starting soon. Please check back later.</p>
          ))}

      {claimConditions.data?.length === 0 ||
        (claimConditions.data?.every((cc) => cc.maxClaimableSupply === '0') && (
          <p>
            This drop is not ready to be minted yet. (No claim condition set)
          </p>
        ))}

      {isLoading ? (
        <div className="flex w-full items-center justify-center text-2xl">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {/*
          {contractMetadata?.image && (
            <div className="mb-5 mt-5 flex w-full items-center justify-center">
              <Image
                src={contractMetadata?.image}
                alt={contractMetadata?.name!}
                width={100}
                height={100}
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
          */}

          <h2 className="">Buy {tokenBalanceSUGAR?.symbol}</h2>

          {/*
          <p className={styles.explain}>
            from <span className={styles.pink}>{contractMetadata?.name}</span>
          </p>
          */}
        </>
      )}

      <hr className="" />

      {/*
      <div className={styles.claimGrid}>
        */}
      <div className=" flex w-full flex-col items-center justify-center">
        <input
          type="number"
          placeholder="Enter amount to buy"
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value > maxClaimable) {
              setQuantity(maxClaimable);
            } else if (value < 1) {
              setQuantity(1);
            } else {
              setQuantity(value);
            }
          }}
          value={quantity}
          //className={`${styles.textInput} ${styles.noGapBottom}`}
          className=" w-80 text-center text-3xl font-bold tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]"
        />

        <h3 className="mt-5">Price to mint: {priceToMint}</h3>

        <div className="mb-5 mt-5 flex w-full flex-row items-center justify-center">
          {address && (
            <Web3Button
              theme="light"
              contractAddress={tokenContractAddressSUGARDrop}
              /*
              action={(contract) => {
                claimToken(address, quantity);
              }}
              */

              /*
              action={() =>
                claimTokenSafe({
                  to: address, // Use useAddress hook to get current wallet address
                  amount: quantity, // Amount of token to claim
                })
              }
              */

              action={(contract) => contract.erc20.claimTo(address, quantity)}
              ///action={(contract) => contract.erc20.claim(quantity)}
              /*
              const address = "0x6CdA16E0fA6E6b8e957Db2cb5936AfA3A69A29FE"; // address of the wallet you want to claim the NFTs
              const quantity = 42.69; // how many tokens you want to claim

              const tx = await contract.erc20.claim(address, quantity);
              const receipt = tx.receipt; // the transaction receipt
              */

              //onSuccess={() => console.log(`🌊 Successfully payed!`)}
              onSuccess={() => alert(`🌊 Successfully payed!`)}
              onError={(err) =>
                //alert(err)
                console.log(err)
              }
            >
              {buttonText}
            </Web3Button>
          )}

          {address && (
            <div className="ml-5 text-center text-3xl font-bold tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
              <b>
                {tokenBalanceGRD === undefined ? (
                  <>Loading...</>
                ) : (
                  <>{Number(tokenBalanceGRD?.displayValue).toFixed(2)}</>
                )}
              </b>{' '}
              <span className="text-[#2b57a2]">GRDB</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

MintPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default MintPage;
