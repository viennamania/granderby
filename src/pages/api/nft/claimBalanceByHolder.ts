// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import {
  getOneHorse,
  setHorseBalanceByTokenId,
  getHorsesByHolder,
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

  // getHorsesByHolder
  const horses = await getHorsesByHolder(holderAddress);

  if (!horses) {
    res.status(404).json({ error: 'Horse not found' });
    return;
  }

  let claimedBalance = 0;

  horses.map(async (horse: any) => {
    const tokenId = horse?.tokenId;
    const horseBalance = horse?.balance;

    if (horseBalance > 0) {
      const data = (await getOneHorse(tokenId as string)) as any;

      ////console.log('getOneByTokenId horse', horse);

      if (!data) {
        res.status(404).json({ error: 'Horse not found' });
        return;
      }

      const uid = data?.horse?.liveHorseInfo?.HORSE_UID;

      const textureKey = data?.horse?.liveHorseInfo?.TEXTURE_KEY;

      // claim the balance

      const result = await fetch('http://3.38.2.94:3001/api/horse/claim', {
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

      const json = await result?.json();

      if (json?.resultWithDraw) {
        claimedBalance += horseBalance;
      }
    }
  });

  console.log('claimedBalance', claimedBalance);

  if (claimedBalance === 0) {
    res.status(200).json({
      balance: claimedBalance,
    });
    return;
  }

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
    const transaction = await tokenContract.erc20.claimTo(
      holderAddress,
      claimedBalance
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
    balance: claimedBalance,
  });
}
