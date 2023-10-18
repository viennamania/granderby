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

  var toAddress2 = '';
  var amount2 = 0;

  var toAddress3 = '';
  var amount3 = 0;

  /*
  const horsehistories = db.collection('horsehistories');
  const results = await horsehistories
    .aggregate([
      //{"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},

      { $match: { nftOwner: { $exists: false } } },

      ///{"$match": {"nft": {"$exists": false}}},

      { $sort: { date: -1 } },
      { $limit: 1 },
    ])
    .toArray();

  //console.log(results);

  console.log('_id', results[0]._id);
  console.log('winnerHorse', results[0].winnerHorse);

  console.log('winnerNft', results[0].winnerNft);

  console.log('totalBet', results[0].totalBet);
  console.log('winPrize', results[0].winPrize);
  console.log('nftOwner', results[0].nftOwner);

  console.log('tokenId', results[0].winnerNft.tokenId);

  const tokenId = results[0].winnerNft.tokenId;

  */

  try {
    /*
    const register = '0xF8b219c425B7Ef110917Bd61AD65D68a6db6A407';

    const result = await db
      .collection('nfthorses')
      .find({ register: register });
    */

    const register = '0xF8b219c425B7Ef110917Bd61AD65D68a6db6A407';

    // find payidToken is not null
    const result = db
      .collection('nfthorses')
      .find({ paidToken: { $ne: null } });

    const results = await result.toArray();

    ///console.log('results', results);

    if (results.length === 0) {
      res.status(400).json({
        txid: '',
        message: 'debug',
        contract: '',
        address: '',
        amount: 0,
      });

      // exit
      return;
    }

    const random = Math.floor(Math.random() * 3);

    if (random > 0) {
      // exit
      return;
    }

    while (true) {
      // choose a random results
      const random = Math.floor(Math.random() * results.length);
      //console.log('random', random);

      //results[random].holder
      const tokenId = results[random].tokenId;

      //console.log('tokenId', tokenId);

      const result2 = db
        .collection('horsetransfers')
        .find({ tokenId: tokenId?.toString() });

      const results2 = await result2.toArray();

      //console.log('results2.length', results2.length);

      if (results2.length > 2) {
        ///console.log('results2', results2);

        toAddress = results[random].holder;
        //amount = 1 * results2.length;

        // random amount
        amount = Math.floor(Math.random() * 10) + 1;

        break;
      }
    }

    while (true) {
      // choose a random results
      const random = Math.floor(Math.random() * results.length);
      ///console.log('random', random);

      //results[random].holder
      const tokenId = results[random].tokenId;

      const result2 = db
        .collection('horsetransfers')
        .find({ tokenId: tokenId });

      const results2 = await result2.toArray();

      //console.log('results2.length', results2.length);

      if (results2.length > 2) {
        ///console.log('results2', results2);

        toAddress2 = results[random].holder;
        ///amount2 = 1 * results2.length;
        // random amount
        amount2 = Math.floor(Math.random() * 10) + 1;

        break;
      }
    }

    while (true) {
      // choose a random results
      const random = Math.floor(Math.random() * results.length);
      ///console.log('random', random);

      //results[random].holder
      const tokenId = results[random].tokenId;

      const result2 = db
        .collection('horsetransfers')
        .find({ tokenId: tokenId });

      const results2 = await result2.toArray();

      //console.log('results2.length', results2.length);

      if (results2.length > 2) {
        ///console.log('results2', results2);

        toAddress3 = results[random].holder;
        //amount3 = 1 * results2.length;
        // random amount
        amount3 = Math.floor(Math.random() * 10) + 1;

        break;
      }
    }

    /*
    const filter = { _id: results[0]._id };

    const updateNft = {
      $set: {
        nftOwner: result?.holder,
        nft: result?.nft,
      },
    };
    const options = { upsert: false };

    await horsehistories.updateOne(filter, updateNft, options);
    */

    //toAddress = result?.holder;
    //amount = results[0].winPrize;
  } catch (error) {
    console.error(error);
  }

  if (toAddress && amount && toAddress2 && amount2 && toAddress3 && amount3) {
    console.log('toAddress', toAddress);
    console.log('amount', amount);
    console.log('toAddress2', toAddress2);
    console.log('amount2', amount2);
    console.log('toAddress3', toAddress3);
    console.log('amount3', amount3);

    const privateKey = process.env.AIRDROP_PRIVATE_KEY;

    /*
    // can be any ethers.js signer
    ///const privateKey = process.env.PRIVATE_KEY;
    const personalWallet = new PrivateKeyWallet(privateKey);

    const config = {
      chain: Polygon, // the chain where your smart wallet will be or is deployed
      factoryAddress: '0xaC1fb0e77770ee3BE8e0Fa1E2eC8e313C8526660', // your own deployed account factory address
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

    const contract = tokenContractAddressSUGARDrop;
    const address = '0x1d54e58e4519d576be8D61DD86c3054Dc4A9642c';
    const amount = 2;

    try {
      // You can then use this wallet to perform transactions via the SDK
      const sdk = await ThirdwebSDK.fromWallet(smartWallet, Polygon);

      // Token (ERC20)
      const tokenContract = await sdk.getContract(contract);

      // Address of the wallet you want to send the tokens to
      const toAddress = address;
      // The amount of tokens you want to send
      const transferAmount = amount;
      const transaction = await tokenContract.erc20.transfer(
        toAddress,
        transferAmount
      );

      console.log(
        'transaction.receipt.transactonHash',
        transaction?.receipt?.transactionHash
      );

      if (transaction) {
        res.status(200).json({
          txid: transaction?.receipt?.transactionHash,
          message: 'transaction successful',
          contract: contract,
          address: address,
          amount: amount,
        });
      } else {
        res.status(400).json({
          txid: '',
          message: 'transaction failed',
          contract: contract,
          address: address,
          amount: amount,
        });
      }
    } catch (error: any) {
      console.error(error);

      res.status(400).json({
        txid: '',
        message: error.message,
        contract: contract,
        address: address,
        amount: amount,
      });
    }
    */

    //const privatekey = process.env.PRIVATE_KEY;

    /*
    const sdk = ThirdwebSDK.fromPrivateKey(
      privatekey,
      "polygon",
      {
        clientId: "79125a56ef0c1629d4863b6df0a43cce", // Use client id if using on the client side, get it from dashboard settings
        ///secretKey: "YOUR_SECRET_KEY", // Use secret key if using on the server, get it from dashboard settings
      },
    )
    */

    /*
    const sdk = ThirdwebSDK.fromPrivateKey(privateKey, 'polygon', {
      ////clientId: process.env.THIRDWEB_CLIENT_ID, // Use client id if using on the client side, get it from dashboard settings
      secretKey: process.env.THIRDWEB_SECRET_KEY, // Use secret key if using on the server, get it from dashboard settings

      gasless: {
        // By specifying a gasless configuration - all transactions will get forwarded to enable gasless transactions
        openzeppelin: {
          relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL, // your OZ Defender relayer URL
          //////relayerForwarderAddress: "<open-zeppelin-forwarder-address>", // the OZ defender relayer address (defaults to the standard one)
        },
      },
    });
    */

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

    // Sugar Token Contract
    const tokenContract = await sdk.getContract(tokenContractAddressSUGARDrop);

    try {
      const transaction = await tokenContract.erc20.transfer(toAddress, amount);

      //const transaction2 = await tokenContract.erc20.transfer(toAddress2, amount2);

      //const transaction3 = await tokenContract.erc20.transfer(toAddress3, amount3);

      /*
      tokenContract.erc20.multiTransfer([
        { to: toAddress, amount: amount },
        { to: toAddress2, amount: amount2 },
        { to: toAddress3, amount: amount3 },
      ]);
      */

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
