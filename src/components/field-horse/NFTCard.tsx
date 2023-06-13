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
  contractAddressRace,
} from '../../config/contractAddresses';

import styles from '../../styles/Home.module.css';

interface NFTCardProps {
  tokenId: number;
}

const NFTCard: FC<NFTCardProps> = ({ tokenId }) => {
  const { contract } = useContract(nftDropContractAddressHorse, 'nft-drop');
  const { data: nft } = useNFT(contract, tokenId);

  const { contract: editionDrop } = useContract(contractAddressRace);

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

          {/*
          <Web3Button
            theme="light"
            action={(contract) =>
              contract?.call('withdraw', [[nft.metadata.id]])
            }
            contractAddress={stakingContractAddressHorseAAA}
          >
            Withdraw
          </Web3Button>
          */}

          <Web3Button
            theme="light"
            contractAddress={contractAddressRace}
            action={(contract) => {
              //contract?.call('withdraw', [[nft.metadata.id]])
              //contract?.call('withdraw', [[nft.metadata.id]])
              contract.erc1155.claim(0, 1);
            }}
            onSuccess={() => {
              console.log(`🌊 Successfully entered!`);
            }}
            onError={(error) => {
              console.error('Failed to enter', error);
            }}
          >
            Enter (10 GRD)
          </Web3Button>
        </div>
      )}
    </>
  );
};
export default NFTCard;
