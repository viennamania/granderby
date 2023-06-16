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

  const minimumBalance = 1;

  const erc1155TokenId0 = 0;
  const erc1155TokenId1 = 1;
  const erc1155TokenId2 = 2;
  const erc1155TokenId3 = 3;
  const erc1155TokenId4 = 4;
  const erc1155TokenId5 = 5;

  const [hasNFT199, setHasNFT199] = useState(false);
  const [hasNFT200, setHasNFT200] = useState(false);
  const [hasNFT201, setHasNFT201] = useState(false);
  const [hasNFT202, setHasNFT202] = useState(false);
  const [hasNFT203, setHasNFT203] = useState(false);
  const [hasNFT204, setHasNFT204] = useState(false);

  useEffect(() => {
    const checkNFT0 = async () => {
      //const contract = await sdk.getContract(contractAddress);

      if (address) {
        const balance = await editionDrop?.erc1155.balanceOf(
          address,
          erc1155TokenId0
        );

        const isValid = balance?.gte(minimumBalance);

        if (isValid) {
          /*
          const res = await fetch('/api/blogPosts');
          ///const res = await fetch('/apiBlogPosts');
          const posts = await res.json();
          setPosts(posts.data);
          */
          setHasNFT199(true);
        } else {
          //setPosts([]);
          setHasNFT199(false);
        }
      }
    };

    const checkNFT1 = async () => {
      //const contract = await sdk.getContract(contractAddress);

      if (address) {
        const balance = await editionDrop?.erc1155.balanceOf(
          address,
          erc1155TokenId1
        );

        const isValid = balance?.gte(minimumBalance);

        if (isValid) {
          /*
          const res = await fetch('/api/blogPosts');
          ///const res = await fetch('/apiBlogPosts');
          const posts = await res.json();
          setPosts(posts.data);
          */
          setHasNFT200(true);
        } else {
          //setPosts([]);
          setHasNFT200(false);
        }
      }
    };

    const checkNFT2 = async () => {
      //const contract = await sdk.getContract(contractAddress);

      if (address) {
        const balance = await editionDrop?.erc1155.balanceOf(
          address,
          erc1155TokenId2
        );

        const isValid = balance?.gte(minimumBalance);

        if (isValid) {
          /*
          const res = await fetch('/api/blogPosts');
          ///const res = await fetch('/apiBlogPosts');
          const posts = await res.json();
          setPosts(posts.data);
          */
          setHasNFT201(true);
        } else {
          //setPosts([]);
          setHasNFT201(false);
        }
      }
    };

    const checkNFT3 = async () => {
      //const contract = await sdk.getContract(contractAddress);

      if (address) {
        const balance = await editionDrop?.erc1155.balanceOf(
          address,
          erc1155TokenId3
        );

        const isValid = balance?.gte(minimumBalance);

        if (isValid) {
          /*
          const res = await fetch('/api/blogPosts');
          ///const res = await fetch('/apiBlogPosts');
          const posts = await res.json();
          setPosts(posts.data);
          */
          setHasNFT202(true);
        } else {
          //setPosts([]);
          setHasNFT202(false);
        }
      }
    };

    const checkNFT4 = async () => {
      //const contract = await sdk.getContract(contractAddress);

      if (address) {
        const balance = await editionDrop?.erc1155.balanceOf(
          address,
          erc1155TokenId4
        );

        const isValid = balance?.gte(minimumBalance);

        if (isValid) {
          /*
          const res = await fetch('/api/blogPosts');
          ///const res = await fetch('/apiBlogPosts');
          const posts = await res.json();
          setPosts(posts.data);
          */
          setHasNFT203(true);
        } else {
          //setPosts([]);
          setHasNFT203(false);
        }
      }
    };

    const checkNFT5 = async () => {
      //const contract = await sdk.getContract(contractAddress);

      if (address) {
        const balance = await editionDrop?.erc1155.balanceOf(
          address,
          erc1155TokenId5
        );

        const isValid = balance?.gte(minimumBalance);

        if (isValid) {
          /*
          const res = await fetch('/api/blogPosts');
          ///const res = await fetch('/apiBlogPosts');
          const posts = await res.json();
          setPosts(posts.data);
          */
          setHasNFT204(true);
        } else {
          //setPosts([]);
          setHasNFT204(false);
        }
      }
    };

    checkNFT0();
    checkNFT1();
    checkNFT2();
    checkNFT3();
    checkNFT4();
    checkNFT5();
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

          <div className="mb-3">
            {hasNFT199 ? (
              <h5>Entered to KR01-199</h5>
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

          <div className="mb-3">
            {hasNFT200 ? (
              <h5>Entered to KR01-200</h5>
            ) : (
              <Web3Button
                theme="light"
                contractAddress={contractAddressRace}
                action={async (contract) => {
                  try {
                    const tx = await contract.erc1155.claim(1, 1);
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
                Enter KR01-200 (25 GRD)
              </Web3Button>
            )}
          </div>

          <div className="mb-3">
            {hasNFT201 ? (
              <h5>Entered to KR01-201</h5>
            ) : (
              <Web3Button
                theme="light"
                contractAddress={contractAddressRace}
                action={async (contract) => {
                  try {
                    const tx = await contract.erc1155.claim(2, 1);
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
                Enter KR01-201 (34 GRD)
              </Web3Button>
            )}
          </div>

          <div className="mb-3">
            {hasNFT202 ? (
              <h5>Entered to KR01-202</h5>
            ) : (
              <Web3Button
                theme="light"
                contractAddress={contractAddressRace}
                action={async (contract) => {
                  try {
                    const tx = await contract.erc1155.claim(3, 1);
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
                Enter KR01-202 (625 GRD)
              </Web3Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NFTCard;
