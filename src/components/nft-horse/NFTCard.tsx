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
        <div className=" flex flex-col items-center  justify-center gap-3">
          {nft?.metadata && (
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
                src={nft?.metadata?.image ? nft?.metadata?.image : ''}
                alt={'alt'}
                width={200}
                height={200}
                className="rounded-lg"
                // onClick={() =>
                //setTokenid(nft.metadata.id.toString()),
                //setIsOpen(true)
                //router.push('/horse-details/' + nft?.metadata?.id)
                //}
              />
            </>
          )}

          <h5>#{nft?.metadata?.id}</h5>
        </div>
      )}
    </>
  );
};
export default NFTCard;
