import cn from 'classnames';

///import { NFTList } from '@/data/static/horse-list';

import NFTGrid from '@/components/ui/nft-card';

//import AuthorImage from '@/assets/images/profile.png';
import AuthorImage from '@/assets/images/profile.png';

import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';

import { Network, Alchemy } from 'alchemy-sdk';

import { useEffect, useState } from 'react';

import { nftDropContractAddressCar } from '../../config/contractAddresses';

import useSWR from 'swr';
import { fetcher } from '../../lib/utils';

import { StaticImageData } from 'next/image';

export default function Feeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();

  const settings = {
    apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key.
    network: Network.MATIC_MAINNET, // Replace with your network.
  };

  type NFT = {
    id: string;
    author: string;
    authorImage: StaticImageData;
    image: string;
    name: string;
    collection: string;
    price: string;
  };

  //const [employees, setEmployees] = useState<Employee[]>([]);

  const [horses, setHorses] = useState<NFT[]>([]);

  const alchemy = new Alchemy(settings);

  useEffect(() => {
    const main = async () => {
      //Call the method to fetch metadata
      const response = await alchemy.nft.getNftsForContract(
        nftDropContractAddressCar
      );

      const NFTList = response.nfts.map((nft) => {
        const { contract, title, tokenType, tokenId, description, media } = nft;

        return {
          id: tokenId,
          author: contract.address,
          authorImage: AuthorImage,
          image: media[0]?.gateway
            ? media[0]?.gateway
            : 'https://via.placeholder.com/500',
          name: title,
          collection: contract.openSea?.collectionName
            ? contract.openSea?.collectionName
            : '',
          price: '0',
        };
      });

      setHorses(NFTList);
    };

    main();
  }, [alchemy.nft]);

  //const { data } = useSWR(`/api/getNftsForCollection`, fetcher);

  //console.log(data);

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3',
        isGridCompact
          ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
          : '3xl:!grid-cols-3 4xl:!grid-cols-4',
        className
      )}
    >
      {horses.map((nft) => (
        <NFTGrid
          key={nft.id}
          name={nft.name}
          image={nft.image}
          author={nft.author}
          authorImage={nft.authorImage}
          price={nft.price}
          collection={nft.collection}
        />
      ))}
    </div>
  );
}
