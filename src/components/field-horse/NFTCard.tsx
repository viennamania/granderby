import {
  useAddress,
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

import { useState, useEffect } from 'react';

interface NFTCardProps {
  tokenId: number;
}

const NFTCard: FC<NFTCardProps> = ({ tokenId }) => {
  const address = useAddress();

  const { contract } = useContract(nftDropContractAddressHorse, 'nft-drop');
  const { data: nft } = useNFT(contract, tokenId);

  const { contract: editionDrop } = useContract(contractAddressRace);

  const erc1155TokenId = 0;
  const minimumBalance = 1;

  const [hasNFT, setHasNFT] = useState(false);

  useEffect(() => {
    const checkNFT = async () => {
      //const contract = await sdk.getContract(contractAddress);

      if (address) {
        const balance = await editionDrop?.erc1155.balanceOf(
          address,
          erc1155TokenId
        );
        console.log('balance', balance);

        const isValid = balance?.gte(minimumBalance);

        if (isValid) {
          /*
          const res = await fetch('/api/blogPosts');
          ///const res = await fetch('/apiBlogPosts');
          const posts = await res.json();
          setPosts(posts.data);
          */
          setHasNFT(true);
        } else {
          //setPosts([]);
          setHasNFT(false);
        }
      }
    };

    checkNFT();
  }, [address, editionDrop]);

  return (
    <>
      {nft && (
        <div className="mb-5 flex flex-col items-center justify-center">
          <h5>{nft.metadata.name}</h5>
          {nft.metadata && (
            <ThirdwebNftMedia
              metadata={nft.metadata}
              className={styles.nftMedia}
              //className="rounded-lg "
            />
          )}

          {hasNFT ? (
            <h4>Entered to KR01-199</h4>
          ) : (
            <Web3Button
              theme="light"
              contractAddress={contractAddressRace}
              action={async (contract) => {
                try {
                  const tx = await contract.erc1155.claim(0, 1);
                  //console.log(tx);
                  alert('🌊 Successfully entered');

                  /*
                  const stakeInfo = await stakingContract?.call(
                    'getStakeInfo',
                    [address]
                  );
                  ////const stakeInfo = await contract?.call("getStakeInfo", );
                  setClaimableRewards(stakeInfo[1]);
                  */
                } catch (e) {
                  console.log(e);
                }
              }}
              onSuccess={() => {
                //alert(`🌊 Successfully entered!`);
                console.log(`🌊 Successfully entered!`);
              }}
              onError={(error) => {
                console.error('Failed to enter', error);
              }}
            >
              Enter (10 GRD)
            </Web3Button>
          )}
        </div>
      )}
    </>
  );
};

export default NFTCard;
