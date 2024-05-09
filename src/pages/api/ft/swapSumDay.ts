// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import {
  getOneHorse,
  setHorseBalanceByTokenId,
} from '@/utils/models/horse-model';

import {
  LocalWallet,
  SmartWallet,
  PrivateKeyWallet,
} from '@thirdweb-dev/wallets';

import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm';
import { Goerli, Polygon } from '@thirdweb-dev/chains';

import { tokenContractAddressGDP } from '@/config/contractAddresses';

import { getSumDayFromAmountByWallet } from '@/utils/models/swapRequest';

type Data = {
  name: string;
};

/*
const privateKey = process.env.GDP_MINT_PRIVATE_KEY || '';

//const sdk = await ThirdwebSDK.fromWallet(smartWallet, Polygon);
// You can then use this wallet to perform transactions via the SDK using private key of signer

const sdk = ThirdwebSDK.fromPrivateKey(privateKey, 'polygon', {
  ////clientId: process.env.THIRDWEB_CLIENT_ID, // Use client id if using on the client side, get it from dashboard settings
  secretKey: process.env.THIRDWEB_SECRET_KEY, // Use secret key if using on the server, get it from dashboard settings
});

*/

export default async function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  const fromWallet = req.body.fromWallet;

  console.log('fromWallet', fromWallet);

  const sumDay = await getSumDayFromAmountByWallet(fromWallet);

  res.status(200).json({ sumDay });
}
