import AuthorImage from '@/assets/images/profile.png';

/*
import NFT1 from '@/assets/images/nft/nft-1.jpg';
import NFT2 from '@/assets/images/nft/nft-2.jpg';
import NFT3 from '@/assets/images/nft/nft-3.jpg';
import NFT4 from '@/assets/images/nft/nft-4.jpg';
*/

import NFT1 from '@/assets/images/nft/Hrs_00006000.png';
///import NFT1 from '@/assets/images/nft/roan.glb';
import NFT2 from '@/assets/images/nft/Hrs_00006000.png';
import NFT3 from '@/assets/images/nft/Hrs_00006000.png';
import NFT4 from '@/assets/images/nft/Hrs_00006000.png';

import { nftDropContractAddressHorse } from '../../config/contractAddresses';

import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key.
  network: Network.MATIC_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const main = async () => {
  const response = await alchemy.nft.getNftsForContract(
    nftDropContractAddressHorse
  );

  //Logging the response to the console

  ///setHorses(response.nfts)

  const NFTList = response.nfts.map((nft) => {
    const { contract, title, tokenType, tokenId, description, media } = nft;

    return {
      id: tokenId,
      author: 'rubywalsh',
      authorImage: AuthorImage,
      image: media[0]?.gateway
        ? media[0]?.gateway
        : 'https://via.placeholder.com/500',
      name: title,
      collection: contract.openSea?.collectionName,

      contract: contract.address,
      symbol: contract.symbol,
      media: media[0]?.gateway
        ? media[0]?.gateway
        : 'https://via.placeholder.com/500',
      collectionName: contract.openSea?.collectionName,
      verified: contract.openSea?.safelistRequestStatus,
      tokenType,
      tokenId,
      title,
      description,
      format: media[0]?.format ? media[0]?.format : 'png',
    };
  });
};

export const NFTList = [
  {
    id: 1,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT1,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 2,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT2,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 3,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT3,
    name: 'Imagination of Pulses',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 4,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT4,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 5,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT2,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 6,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT4,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 7,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT3,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 8,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT1,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 9,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT1,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 10,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT1,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 11,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT1,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 12,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT2,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 13,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT3,
    name: 'Imagination of Pulses',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 14,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT4,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 15,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT2,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 16,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT4,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 17,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT3,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 18,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT1,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 19,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT1,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 20,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT1,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 21,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT1,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 22,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT2,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 23,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT3,
    name: 'Imagination of Pulses',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 24,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT4,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 25,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT2,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 26,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT4,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 27,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT3,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 28,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT1,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 29,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT1,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
  {
    id: 30,
    author: 'rubywalsh',
    authorImage: AuthorImage,
    image: NFT1,
    name: 'Pulses Of Imagination #214',
    collection: 'Chromory',
    price: '0.40 ETH',
  },
];
