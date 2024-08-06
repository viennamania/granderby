// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { getClaimHistoryByHolderAddress } from '@/utils/models/track-model';

import {
  LocalWallet,
  SmartWallet,
  PrivateKeyWallet,
} from '@thirdweb-dev/wallets';

import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm';
import { Goerli, Polygon } from '@thirdweb-dev/chains';

import { tokenContractAddressGDP } from '@/config/contractAddresses';
import toast from 'react-hot-toast';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  // Get POST holderAddress from the request body
  const { holderAddress } = req.query as { holderAddress: string };

  console.log('getClaimTrackHistoryByHolder holderAddress', holderAddress);

  if (!holderAddress) {
    res.status(400).json({ error: 'Missing holderAddress' });
    return;
  }

  const trackClaims = await getClaimHistoryByHolderAddress(holderAddress);

  if (!trackClaims) {
    res.status(404).json({ error: 'trackClaims not found' });
    return;
  }

  res.status(200).json({ trackClaims });
}
