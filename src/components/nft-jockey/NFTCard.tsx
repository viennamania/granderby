import {
  ThirdwebNftMedia,
  useContract,
  useNFT,
  Web3Button,
} from '@thirdweb-dev/react';

import type { FC } from 'react';

import {
  nftDropContractAddressJockey,
  stakingContractAddressJockey,
} from '../../config/contractAddresses';

import styles from '../../styles/Home.module.css';

import Image from 'next/image';

interface NFTCardProps {
  tokenId: number;
}

const NFTCard: FC<NFTCardProps> = ({ tokenId }) => {
  const { contract } = useContract(nftDropContractAddressJockey, 'nft-drop');
  const { data: nft } = useNFT(contract, tokenId);

  return (
    <>
      {nft && (
        <div className="mb-5 flex flex-col items-center justify-center gap-3">
          <h5>{nft.metadata.name}</h5>
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
              />
            </>
          )}

          <Web3Button
            theme="light"
            action={(contract) =>
              contract?.call('withdraw', [[nft.metadata.id]])
            }
            contractAddress={stakingContractAddressJockey}
          >
            Unregister
          </Web3Button>
        </div>
      )}
    </>
  );
};
export default NFTCard;
