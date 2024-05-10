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
  tokenContractAddressCARROTDrop,
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
  tokenContractAddressSUGARDrop,
} from '@/config/contractAddresses';

import db from '@/db/conn.mjs';

import { kv } from '@vercel/kv';

import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm';
import {
  LocalWallet,
  SmartWallet,
  PrivateKeyWallet,
} from '@thirdweb-dev/wallets';
import { Goerli, Polygon } from '@thirdweb-dev/chains';

import { tokenContractAddressUSDT } from '@/config/contractAddresses';

import {
  getAllSwapRequestsByStatusWaiting,
  setSwapRequestsStatusById,
} from '@/utils/models/swapRequest';

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

type Data = {
  txid: string;
  message: string;
  address: string;
  contract: string;
  amount: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const privateKey = process.env.GDP_MINT_PRIVATE_KEY || '';

  //const sdk = await ThirdwebSDK.fromWallet(smartWallet, Polygon);
  // You can then use this wallet to perform transactions via the SDK using private key of signer

  const sdk = ThirdwebSDK.fromPrivateKey(privateKey, 'polygon', {
    ////clientId: process.env.THIRDWEB_CLIENT_ID, // Use client id if using on the client side, get it from dashboard settings
    secretKey: process.env.THIRDWEB_SECRET_KEY, // Use secret key if using on the server, get it from dashboard settings
  });

  // get all swap requests
  const swapRequests = (await getAllSwapRequestsByStatusWaiting()) || [];

  // if swap requests status is 'waiting' then process withdrawal and if success then update status to 'completed'

  swapRequests.forEach(async (swapRequest) => {
    ///console.log('swapRequest', swapRequest);

    if (
      swapRequest.status === 'Waiting' &&
      swapRequest.toWallet &&
      swapRequest.toAmount
    ) {
      try {
        const toWallet = swapRequest.toWallet;
        const toAmount = swapRequest.toAmount;

        console.log('toWallet', toWallet);
        console.log('toAmount', toAmount);

        //return null;

        const contract = await sdk.getContract(tokenContractAddressUSDT);

        const transaction = await contract.erc20.transfer(toWallet, toAmount);

        console.log(
          'transaction.receipt.transactonHash',
          transaction?.receipt?.transactionHash
        );

        if (transaction) {
          const txHash = transaction?.receipt?.transactionHash;

          //console.log('txHash', txHash);

          if (txHash) {
            await setSwapRequestsStatusById(swapRequest._id, txHash);
          }
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('swapRequest status is not waiting');
    }
  });

  res.status(200).json({
    txid: 'txid',
    message: 'message',
    address: 'address',
    contract: 'contract',
    amount: 0,
  });
}
