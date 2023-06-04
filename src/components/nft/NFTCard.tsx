import {
  ThirdwebNftMedia,
  useContract,
  useNFT,
  Web3Button,
} from '@thirdweb-dev/react';
import type { FC } from 'react';
import {
  nftDropContractAddressHorse,
  stakingContractAddressHorse,
} from '../../config/contractAddresses';

import styles from '../../styles/Home.module.css';

interface NFTCardProps {
  tokenId: number;
}

const NFTCard: FC<NFTCardProps> = ({ tokenId }) => {
  const { contract } = useContract(nftDropContractAddressHorse, 'nft-drop');
  const { data: nft } = useNFT(contract, tokenId);

  return (
    <>
      {nft && (
        <div className="mb-5 flex flex-col items-center justify-center">
          {nft.metadata && (
            <ThirdwebNftMedia
              metadata={nft.metadata}
              //className={styles.nftMedia}
              className="rounded-lg "
            />
          )}
          <h3>{nft.metadata.name}</h3>
          <Web3Button
            action={(contract) =>
              contract?.call('withdraw', [[nft.metadata.id]])
            }
            contractAddress={stakingContractAddressHorse}
          >
            Withdraw
          </Web3Button>
        </div>
      )}
    </>
  );
};
export default NFTCard;
