import AnchorLink from '@/components/ui/links/anchor-link';
import routes from '@/config/routes';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import { ExternalLink } from '@/components/icons/external-link';

import {
  ThirdwebNftMedia,
  useContract,
  useNFT,
  Web3Button,
  useContractRead,
  useAddress,
} from '@thirdweb-dev/react';

import type { FC } from 'react';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
} from '@/config/contractAddresses';

import styles from '../../styles/Home.module.css';

import Image from 'next/image';
import { useRouter } from 'next/router';

interface NFTCardProps {
  contractAddress: string;
  tokenId: number;
}

const NFTCard: FC<NFTCardProps> = ({ contractAddress, tokenId }) => {
  const address = useAddress();

  //////const { contract } = useContract(nftDropContractAddressHorse, 'nft-drop');
  const { contract } = useContract(contractAddress, 'nft-drop');

  const { data: nft } = useNFT(contract, tokenId);

  ///console.log("NFTCard nft", nft);

  const { layout } = useLayout();

  const router = useRouter();

  const { contract: contractStaking, isLoading: isLoadingContractStaking } =
    useContract(stakingContractAddressHorseAAA);

  const { data: stakerAddress, isLoading } = useContractRead(
    contractStaking,
    'stakerAddress',
    [tokenId]
  );

  return (
    <>
      {nft && (
        <div className=" overflow-hidden rounded-lg bg-white shadow-lg">
          {nft?.metadata && (
            <div className=" flex flex-col">
              <div className="flex w-full flex-row items-center justify-start bg-gray-100 p-1">
                <Image
                  src="/horseRace/logo-granderby.png"
                  alt="logo"
                  width={18}
                  height={18}
                />

                <p className="p-1  text-left text-sm font-bold ">
                  #{nft?.metadata?.id}
                </p>
              </div>

              <Image
                //src={nft.media[0].thumbnail}
                src={nft?.metadata?.image ? nft?.metadata?.image : ''}
                alt={'alt'}
                width={150}
                height={150}
                // onClick={() =>
                //setTokenid(nft.metadata.id.toString()),
                //setIsOpen(true)
                //router.push('/horse-details/' + nft?.metadata?.id)
                //}
              />

              <div className=" h-16 w-full items-center justify-center xl:h-16 ">
                <p className="text-md p-1  text-center ">
                  {nft?.metadata?.name}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default NFTCard;
