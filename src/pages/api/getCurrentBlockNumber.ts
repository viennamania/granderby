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
  stakingContractAddressHorseAAA,
} from '@/config/contractAddresses';

import db from '@/db/conn.mjs';

import { kv } from '@vercel/kv';

type Data = {
  address: string;
  blockNumber: string;
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const contractAddress = nftDropContractAddressHorse.toLowerCase();

  var blockNumber: any = await kv.get(contractAddress);

  //console.log('fromBlock', fromBlock);

  res.status(200).json({
    address: contractAddress,
    blockNumber: blockNumber,
    error: '',
  });
}
