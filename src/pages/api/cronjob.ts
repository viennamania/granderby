// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import {
  Network,
  Alchemy,
  fromHex,
  SortingOrder,
  AssetTransfersCategory,
} from 'alchemy-sdk';

import {
  tokenContractAddressGRD,
  nftDropContractAddressHorse,
} from '@/config/contractAddresses';

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

type Data = {
  address: string;
  length: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let transfers = [] as any;

  // Contract address for granderby NFT
  const contractAddress = nftDropContractAddressHorse;

  var pageParam = null;

  //var pageParam = "c9d362ce-45be-4631-b974-5242ed9e50cd";

  ///var fromBlock = "0x0";

  //var fromBlock = "0x2a672b6";

  var fromBlock = '0x2d8b54c';

  //var fromBlock = "0x2a6857f";

  //var fromBlock = "0x2a68678";
  //var fromBlock = "0x2b762f9";

  var response = null;

  while (true) {
    if (pageParam == null) {
      response = await alchemy.core.getAssetTransfers({
        fromBlock: fromBlock,
        toBlock: 'latest',

        contractAddresses: [contractAddress],
        //category: ["external","internal","erc721"],
        //category: ["erc721"],
        //category: ["erc721"],
        category: [AssetTransfersCategory.ERC721],
        //category: ["internal"],
        //fromAddress: "0x89Dc7A2E543a24F8c1513Fa67cE5aBE6CA338C18",
        //toAddress: "0xc82BbE41f2cF04e3a8efA18F7032BDD7f6d98a81",
        withMetadata: true,
        ///excludeZeroValue: false,
        excludeZeroValue: true,
        /////////order: SortingOrder.DESCENDING,
        order: SortingOrder.ASCENDING,

        /////pageKey: pageParam,
        //pageSize: 100,
      });
    } else {
      response = await alchemy.core.getAssetTransfers({
        fromBlock: fromBlock,

        contractAddresses: [contractAddress],
        //category: ["external","internal","erc721"],
        //category: ["erc721"],
        category: [AssetTransfersCategory.ERC721],
        //category: ["internal"],
        //fromAddress: "0x89Dc7A2E543a24F8c1513Fa67cE5aBE6CA338C18",
        //toAddress: "0xc82BbE41f2cF04e3a8efA18F7032BDD7f6d98a81",
        withMetadata: true,
        ///excludeZeroValue: false,
        excludeZeroValue: true,
        //////order: SortingOrder.DESCENDING,
        order: SortingOrder.ASCENDING,
        pageKey: pageParam,
        //pageSize: 100,
      });
    }

    //console.log('response.transfers.length', response?.transfers.length);

    //console.log('response.pageKey', response?.pageKey);

    response?.transfers.map((item, index) => {
      ///console.log("index", index);

      ///console.log("item", item);

      const match = transfers.find((element: any) => {
        return element.hash == item.hash;
      });

      if (match) {
        return;
      }

      const transfer = {
        hash: item.hash,
        blockNum: item.blockNum,
        uniqueId: item.uniqueId,
        from: item.from,
        to: item.to,
        value: item.value,
        erc721TokenId: item.erc721TokenId,
        erc1155Metadata: item.erc1155Metadata,
        tokenId: item.tokenId,
        asset: item.asset,
        category: item.category,
        rawContract: item.rawContract,
        blockTimestamp: item.metadata.blockTimestamp,
      };

      transfers.push(transfer);
    });

    if (response.pageKey == undefined) {
      break;
    }

    pageParam = response.pageKey;
  }

  res.status(200).json({
    address: contractAddress,
    length: transfers.length,
  });
}
