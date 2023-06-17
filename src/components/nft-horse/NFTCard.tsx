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
} from '@thirdweb-dev/react';

import type { FC } from 'react';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
} from '../../config/contractAddresses';

import styles from '../../styles/Home.module.css';

interface NFTCardProps {
  tokenId: number;
}

const NFTCard: FC<NFTCardProps> = ({ tokenId }) => {
  const { contract } = useContract(nftDropContractAddressHorse, 'nft-drop');
  const { data: nft } = useNFT(contract, tokenId);

  const { layout } = useLayout();

  return (
    <>
      {nft && (
        <div className="mb-5 flex flex-col items-center justify-center gap-3">
          <div className="flex flex-row items-center justify-center gap-2">
            <h5>{nft.metadata.name}</h5>
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
          </div>

          {nft.metadata && (
            <ThirdwebNftMedia
              metadata={nft.metadata}
              //className={styles.nftMedia}
              className="rounded-lg "
            />
          )}

          <Web3Button
            theme="light"
            action={(contract) =>
              contract?.call('withdraw', [[nft.metadata.id]])
            }
            contractAddress={stakingContractAddressHorseAAA}
          >
            Unregister from field
          </Web3Button>
        </div>
      )}
    </>
  );
};
export default NFTCard;
