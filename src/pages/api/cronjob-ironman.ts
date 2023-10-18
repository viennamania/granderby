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
  var toAddress = '';
  var amount = 0;

  const horsehistories = db.collection('horsehistories');
  const results = await horsehistories
    .aggregate([
      //{"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},

      //{ $match: { nftOwner: { $exists: false } } },

      ///{"$match": {"nft": {"$exists": false}}},

      {
        $match: {
          $or: [{ nftOwner: { $exists: false } }, { nftOwner: null }],
        },
      },

      { $sort: { date: -1 } },
      { $limit: 1 },
    ])
    .toArray();

  //console.log(results);

  /*
  console.log('_id', results[0]._id);
  console.log('winnerHorse', results[0].winnerHorse);

  console.log('winnerNft', results[0].winnerNft);

  console.log('totalBet', results[0].totalBet);
  console.log('winPrize', results[0].winPrize);
  console.log('nftOwner', results[0].nftOwner);

  console.log('tokenId', results[0].winnerNft.tokenId);
  */

  const tokenId = results[0].winnerNft.tokenId;

  try {
    const result = await db
      .collection('nfthorses')
      .findOne({ tokenId: tokenId });

    //console.log("result", result);

    console.log('holder', result?.holder);

    const filter = { _id: results[0]._id };
    const updateNft = {
      $set: {
        nftOwner: result?.holder,
        nft: result?.nft,
      },
    };
    const options = { upsert: false };

    await horsehistories.updateOne(filter, updateNft, options);

    toAddress = result?.holder;

    amount = results[0].winPrize;
  } catch (error) {
    console.error(error);
  }

  if (true) {
    console.log('toAddress', toAddress);
    console.log('amount', amount);

    const privateKey = process.env.IRONMAN_PRIVATE_KEY;

    // can be any ethers.js signer
    ///const privateKey = process.env.PRIVATE_KEY;
    const personalWallet = new PrivateKeyWallet(privateKey);

    const config = {
      chain: Polygon, // the chain where your smart wallet will be or is deployed
      factoryAddress: '0x20c70BD6588511F1824fbe116928c3D6c4B989aB', // your own deployed account factory address
      ///clientId: "3af7ae04bda0e7a51c444c3a9464458d", // Use client id if using on the client side, get it from dashboard settings
      secretKey: process.env.THIRDWEB_SECRET_KEY, // Use secret key if using on the server, get it from dashboard settings
      gasless: true, // enable or disable gasless transactions
    };

    // Then, connect the Smart wallet
    const smartWallet = new SmartWallet(config);

    const smartWalletAddress = await smartWallet.connect({
      personalWallet: personalWallet,
    });

    console.log('smartWallet address', smartWalletAddress);

    // You can then use this wallet to perform transactions via the SDK
    const sdk = await ThirdwebSDK.fromWallet(smartWallet, Polygon);

    const random = Math.floor(Math.random() * 3);

    console.log('random', random);

    if (random == 0) {
      /* transfer to address CARROT */
      const toAddress = '0xC767953AEbf77A22c8D2Bc22E880C0FA36CCBfF3'; // LAWNMOWERMAN smart wallet

      const amount = Math.floor(Math.random() * 100) + 1;

      /* CARROT Token Contract */
      const tokenContract = await sdk.getContract(
        tokenContractAddressCARROTDrop
      );

      try {
        const transaction = await tokenContract.erc20.transfer(
          toAddress,
          amount
        );

        console.log(
          'transaction.receipt.transactonHash',
          transaction?.receipt?.transactionHash
        );

        if (transaction) {
          res.status(200).json({
            txid: transaction?.receipt?.transactionHash,
            message: 'transaction successful',
            contract: tokenContractAddressCARROTDrop,
            address: toAddress,
            amount: amount,
          });
        } else {
          res.status(400).json({
            txid: '',
            message: 'transaction failed',
            contract: tokenContractAddressCARROTDrop,
            address: toAddress,
            amount: amount,
          });
        }
      } catch (error) {
        console.error(error);
      }

      return res.status(200).json({
        txid: '',
        message: 'transaction successful',
        contract: tokenContractAddressSUGARDrop,
        address: toAddress,
        amount: amount,
      });
    }

    /* CARROT Token Contract */
    const tokenContract = await sdk.getContract(tokenContractAddressCARROTDrop);

    // random amount from 1 to 50
    const amountCarrot = Math.floor(Math.random() * 50) + 1;

    // if amountCarrot is even, then stop
    if (amountCarrot % 2 == 0) {
      res.status(400).json({
        txid: '',
        message: 'not work',
        contract: tokenContractAddressCARROTDrop,
        address: toAddress,
        amount: amount,
      });

      return;
    }

    /* drop to address */
    try {
      /*
            const transaction = await tokenContractCARROT?.erc20.claim(amount, {
        checkERC20Allowance: false, // Set to true if you want to check ERC20 allowance
        currencyAddress: tokenContractAddressGRD,
        ///pricePerToken: "0.02",
      });
      */

      const transaction = await tokenContract.erc20.claim(amountCarrot, {
        checkERC20Allowance: true, // Set to true if you want to check ERC20 allowance
        currencyAddress: tokenContractAddressCARROTDrop,
      });

      if (transaction) {
        res.status(200).json({
          txid: transaction?.receipt?.transactionHash,
          message: 'transaction successful',
          contract: tokenContractAddressCARROTDrop,
          address: toAddress,
          amount: amount,
        });
      } else {
        res.status(400).json({
          txid: '',
          message: 'transaction failed',
          contract: tokenContractAddressCARROTDrop,
          address: toAddress,
          amount: amount,
        });
      }
    } catch (error) {
      console.error(error);

      res.status(400).json({
        txid: '',
        message: error.message,
        contract: tokenContractAddressCARROTDrop,
        address: toAddress,
        amount: amount,
      });
    }

    /*
    // Sugar Token Contract
    const tokenContract = await sdk.getContract(tokenContractAddressSUGARDrop);

    try {
      const transaction = await tokenContract.erc20.transfer(toAddress, amount);

      console.log(
        'transaction.receipt.transactonHash',
        transaction?.receipt?.transactionHash
      );

  

      if (transaction) {
        res.status(200).json({
          txid: transaction?.receipt?.transactionHash,
          message: 'transaction successful',
          contract: tokenContractAddressSUGARDrop,
          address: toAddress,
          amount: amount,
        });
      } else {
        res.status(400).json({
          txid: '',
          message: 'transaction failed',
          contract: tokenContractAddressSUGARDrop,
          address: toAddress,
          amount: amount,
        });
      }

    } catch (error) {
      console.error(error);
    }
    */
  } else {
    res.status(400).json({
      txid: '',
      message: 'private key not found',
      contract: '',
      address: '',
      amount: 0,
    });
  }
}
