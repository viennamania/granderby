// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

import {
  Network,
  Alchemy,
  fromHex,
  SortingOrder,
  AssetTransfersCategory,
} from 'alchemy-sdk';

import { tokenContractAddressGRD } from '@/config/contractAddresses';

/*
export const config = {
  runtime: 'edge',
};
*/

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const contractAddress = tokenContractAddressGRD;

  try {
    const response = await alchemy.core.getAssetTransfers({
      fromBlock: '0x0',
      toBlock: 'latest',
      contractAddresses: [contractAddress],
      category: [AssetTransfersCategory.ERC20],
      withMetadata: true,
      excludeZeroValue: false,
      //order: "desc",
      order: SortingOrder.DESCENDING,

      ///pageKey: pageParam,
      //pageSize: 100,
    });

    ///console.log(response);

    var transfers: any = [];

    response.transfers.forEach((transfer: any) => {
      transfers.push({
        uniqueId: transfer.uniqueId,
        hash: transfer.hash,
        from: transfer.from,
        to: transfer.to,
        value: transfer.value,
        blockTimestamp: transfer.metadata.blockTimestamp,
      });
    });

    return NextResponse.json({
      data: `Updated top stories at ${new Date().toISOString()}. transfers length: ${
        transfers.length
      } `,
    });
  } catch (error: any) {
    console.log('error', error);

    return NextResponse.json({
      error: error.message,
    });
  }
}
