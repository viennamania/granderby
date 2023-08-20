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
  tokenId: number;
}

const NFTCard: FC<NFTCardProps> = ({ tokenId }) => {
  const address = useAddress();

  const { contract } = useContract(nftDropContractAddressHorse, 'nft-drop');
  const { data: nft } = useNFT(contract, tokenId);

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
        <div className="mb-5 flex flex-col items-center justify-center gap-3">
          <div className="flex flex-row items-center justify-center gap-2">
            <h5>{nft.metadata.name}</h5>
            {/*
            <AnchorLink
              href={{
                pathname: routes.horseDetails,
                ...(layout !== LAYOUT_OPTIONS.MODERN && {
                  query: {
                    layout,
                  },
                }),
              }}
              className="cursor-pointer rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-brand dark:!bg-gray-700 dark:text-white"
            >
              <ExternalLink className="dark:text-white" />
            </AnchorLink>
            */}
          </div>

          {nft.metadata && (
            <>
              {/*
            <ThirdwebNftMedia
              metadata={nft.metadata}
              //className={styles.nftMedia}
              className="rounded-lg "
            />
*/}

              <Image
                //src={nft.media[0].thumbnail}
                src={nft.metadata.image ? nft.metadata.image : ''}
                alt={'alt'}
                width={500}
                height={500}
                className="rounded-lg"
                onClick={() =>
                  //setTokenid(nft.metadata.id.toString()),
                  //setIsOpen(true)
                  router.push('/horse-details/' + nft?.metadata?.id)
                }
              />
            </>
          )}

          <div className="flex text-xs text-white">
            OWNER: {stakerAddress.substring(0, 10)}...
          </div>

          {address && address === stakerAddress && (
            <div className="text-xl font-bold text-white">My horse</div>
          )}

          {/*
          <Web3Button
            theme="light"
            action={(contract) =>
              contract?.call('withdraw', [[nft.metadata.id]])
            }
            contractAddress={stakingContractAddressHorseAAA}
          >
            Unregister from field
          </Web3Button>
            */}
        </div>
      )}
    </>
  );
};
export default NFTCard;
