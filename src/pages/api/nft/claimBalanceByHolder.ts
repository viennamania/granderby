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

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  //const tokenId = req.query.tokenId;

  // POST tokenId
  const holderAddress = req.body.holderAddress;

  console.log('claimBalanceByHolder holderAddress', holderAddress);

  if (!holderAddress) {
    res.status(400).json({ error: 'Missing holderAddress' });
    return;
  }

  // claim the balance
  /*
  const result3 = await fetch('http://3.38.2.94:3001/api/horse/claim', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      uid: uid,
      textureKey: textureKey,
      beforeWithDraw: horseBalance,
      withDraw: horseBalance,
      resultWithDraw: 0,
    }),
  });

  const json3 = await result3?.json();

  console.log('json3', json3);
  */

  /*
  const result4 = await setHorseBalanceByTokenId(tokenId as string, 0);

  if (!result4) {
    res.status(404).json({ error: 'Horse not found' });
    return;
  }
  */

  const horseBalance = 1;

  const privateKey = process.env.GDP_MINT_PRIVATE_KEY || '';

  //const sdk = await ThirdwebSDK.fromWallet(smartWallet, Polygon);
  // You can then use this wallet to perform transactions via the SDK using private key of signer

  const sdk = ThirdwebSDK.fromPrivateKey(privateKey, 'polygon', {
    ////clientId: process.env.THIRDWEB_CLIENT_ID, // Use client id if using on the client side, get it from dashboard settings
    secretKey: process.env.THIRDWEB_SECRET_KEY, // Use secret key if using on the server, get it from dashboard settings
  });

  // GDP Token Contract
  const tokenContract = await sdk.getContract(tokenContractAddressGDP);

  try {
    console.log('claimBalanceByHolder holderAddress', holderAddress);

    console.log('claimBalanceByTokenId horseBalance', horseBalance);

    const transaction = await tokenContract.erc20.claimTo(
      holderAddress,
      horseBalance
    );

    console.log(
      'transaction.receipt.transactonHash',
      transaction?.receipt?.transactionHash
    );

    if (transaction) {
    } else {
    }
  } catch (error) {
    console.error(error);
  }

  res.status(200).json({
    balance: horseBalance,
  });
}
