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

import { BigNumber } from 'ethers';

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

      {
        $match: {
          $or: [{ nftOwner: { $exists: false } }, { nftOwner: null }],
        },
      },

      ///{"$match": {"nft": {"$exists": false}}},

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

  //if (toAddress && amount) {
  if (true) {
    console.log('toAddress', toAddress);
    console.log('amount', amount);

    const privateKey = process.env.COFFEEMAN_PRIVATE_KEY;

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

    /*
    // You can then use this wallet to perform transactions via the SDK
    const sdk = await ThirdwebSDK.fromWallet(smartWallet, Polygon);

  
    const tokenContract = await sdk.getContract(tokenContractAddressCARROTDrop);

    // random amount from 1 to 50
    const amountCarrot = Math.floor(Math.random() * 50) + 1;

    // if amountCarrot is odds, then stop
    if (amountCarrot % 2 == 1) {
      return res.status(400).json({
        txid: '',
        message: 'not work',
        contract: tokenContractAddressCARROTDrop,
        address: toAddress,
        amount: amount,
      });

  
    }

   
    try {

      const transaction = await tokenContract.erc20.claim(amountCarrot, {
        checkERC20Allowance: true, // Set to true if you want to check ERC20 allowance
        currencyAddress: tokenContractAddressCARROTDrop,
      });

      if (transaction) {
        return res.status(200).json({
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
    */

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

    const sdk = await ThirdwebSDK.fromWallet(smartWallet, Polygon);

    /*
    const tokenContract = await sdk.getContract(nftDropContractAddressHorse);

    //stakingContractAddressHorseAAA
    // staking nft

    const tokenContractStaking = await sdk.getContract(
      stakingContractAddressHorseAAA
    );

      //getStakeInfo
      const getStakeInfo = await tokenContractStaking.call('getStakeInfo', [
        smartWalletAddress,
      ]);

      console.log('getStakeInfo', getStakeInfo);

      if (getStakeInfo[0]?.length == 0) {
        return res.status(400).json({
          txid: '',
          message: 'no staked nfts',
          contract: tokenContractAddressCARROTDrop,
          address: toAddress,
          amount: amount,
        });
      }

      ///console.log('getStakeInfo', getStakeInfo);

      var stakedTokenIds = [] as string[];

      getStakeInfo[0]?.map(
        (stakedToken: BigNumber) => (
          console.log('stakedToken', stakedToken.toString()),
          stakedTokenIds.push(stakedToken.toString())
        )
      );

      if (stakedTokenIds.length == 0) {
        return res.status(400).json({
          txid: '',
          message: 'no staked nfts',
          contract: tokenContractAddressCARROTDrop,
          address: toAddress,
          amount: amount,
        });
      }

      const random = Math.floor(Math.random() * stakedTokenIds.length);
      const stakedTokenId = stakedTokenIds[random];

      const tokenIds = [stakedTokenId];
      // withdraw staked token
      const transaction = await tokenContractStaking.call('withdraw', [
        tokenIds,
      ]);

      console.log("transaction", transaction);

      if (transaction) {
        return res.status(200).json({
          txid: transaction?.receipt?.transactionHash,
          message: 'transaction successful',
          contract: tokenContractAddressCARROTDrop,
          address: toAddress,
          amount: amount,
        });
      } else {
        return res.status(400).json({
          txid: '',
          message: 'transaction failed',
          contract: tokenContractAddressCARROTDrop,
          address: toAddress,
          amount: amount,
        });
      }
      */

    try {
      const tokenContract = await sdk.getContract(nftDropContractAddressHorse);

      // get owned nfts
      const nfts = await tokenContract.erc721.getOwned(smartWalletAddress);

      // transfer all nfts to some address (0xbF9dfe7D364B827111424d3b03F5f6f5f1B05df3)

      console.log('nfts', nfts);

      const toAddress = '0xbF9dfe7D364B827111424d3b03F5f6f5f1B05df3';

      if (nfts.length > 0) {
        const tokenId = nfts[0].metadata.id;

        console.log('tokenId', tokenId);

        const transaction = await tokenContract.erc721.transfer(
          toAddress,
          tokenId
        );

        console.log(
          'transaction.receipt.transactonHash',
          transaction?.receipt?.transactionHash
        );

        if (transaction) {
          return res.status(200).json({
            txid: transaction?.receipt?.transactionHash,
            message: 'transaction successful',
            contract: nftDropContractAddressHorse,
            address: toAddress,
            amount: amount,
          });
        } else {
          return res.status(400).json({
            txid: '',
            message: 'transaction failed',
            contract: nftDropContractAddressHorse,
            address: toAddress,
            amount: amount,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(400).json({
      txid: '',
      message: 'private key not found',
      contract: '',
      address: '',
      amount: 0,
    });
  }
}
