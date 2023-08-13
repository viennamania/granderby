import Avatar from '@/components/ui/avatar';
import { StaticImageData } from 'next/image';

type AuthorCardProps = {
  image: StaticImageData;
  name?: string;
  role?: string;
};

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

export default function AuthorCard({ image, name, role }: AuthorCardProps) {
  const address = useAddress();

  /*
  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
    */

  return (
    <div
      className={`flex items-center rounded-lg  ${
        name
          ? 'bg-gray-100  p-5  dark:bg-light-dark'
          : 'ml-3 justify-center bg-none p-5 dark:mr-3 dark:bg-none'
      }`}
    >
      {!address ? (
        <></>
      ) : (
        <>
          {/*
          <div className="pr-3">
            <Avatar
              image={image}
              alt={name ? name : ''}
              className="dark:border-gray-400"
            />
          </div>
      */}

          {/*
          <div className="ltr:pl-3 rtl:pr-3">
            <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
              {name}
            </h3>
            <span className="mt-1 block text-xs text-gray-600 dark:text-gray-400">
              {role}
            </span>
          </div>
      */}
        </>
      )}

      {/*
      <div className="flex w-full justify-center ">
        <ConnectWallet
          theme="dark"
          //theme="light"
  

          //btnTitle="Connect Wallet"
        />
      </div>
    */}
    </div>
  );
}
