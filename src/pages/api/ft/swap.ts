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

import { newSwapRequest } from '@/utils/models/swapRequest';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  const fromCoinTxHash = req.body.fromCoinTxHash;
  const fromCoin = req.body.fromCoin;
  const toCoin = req.body.toCoin;
  const fromAmount = req.body.fromAmount;
  const fromAmountFee = req.body.fromAmountFee;
  const toAmount = req.body.toAmount;
  const fromAddress = req.body.fromAddress;
  const toAddress = req.body.toAddress;

  console.log('fromCoinTxHash', fromCoinTxHash);
  console.log('fromCoin', fromCoin);
  console.log('toCoin', toCoin);
  console.log('fromAmount', fromAmount);
  console.log('fromAmountFee', fromAmountFee);
  console.log('toAmount', toAmount);
  console.log('fromAddress', fromAddress);
  console.log('toAddress', toAddress);

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
    const toAddressForFee = '0xe38A3D8786924E2c1C427a4CA5269e6C9D37BC9C';

    const contract = await sdk.getContract(tokenContractAddressGDP);

    const transaction = await contract.erc20.claimTo(
      toAddressForFee,
      fromAmountFee
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

  const swapRequest = await newSwapRequest(
    fromCoinTxHash,
    fromCoin,
    toCoin,
    fromAmount,
    fromAmountFee,
    toAmount,
    fromAddress,
    toAddress,
    'userID',
    'email1'
  );

  res.status(200).json({
    message: 'Swap request created',
    swapRequest,
  });
}
