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
} from '@/config/contractAddresses';

import db from '@/db/conn.mjs';

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

type Data = {
  address: string;
  length: number;
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let transfers = [] as any;

  // Contract address for granderby NFT
  const contractAddress = nftDropContractAddressHorse;

  var pageParam = null;

  //var pageParam = "c9d362ce-45be-4631-b974-5242ed9e50cd";

  ///var fromBlock = "0x0";

  //var fromBlock = "0x2a672b6";

  var fromBlock = '0x2d8b54c';

  //var fromBlock = "0x2a6857f";

  //var fromBlock = "0x2a68678";
  //var fromBlock = "0x2b762f9";

  var response = null;

  while (true) {
    if (pageParam == null) {
      response = await alchemy.core.getAssetTransfers({
        fromBlock: fromBlock,
        toBlock: 'latest',

        contractAddresses: [contractAddress],
        //category: ["external","internal","erc721"],
        //category: ["erc721"],
        //category: ["erc721"],
        category: [AssetTransfersCategory.ERC721],
        //category: ["internal"],
        //fromAddress: "0x89Dc7A2E543a24F8c1513Fa67cE5aBE6CA338C18",
        //toAddress: "0xc82BbE41f2cF04e3a8efA18F7032BDD7f6d98a81",
        withMetadata: true,
        ///excludeZeroValue: false,
        excludeZeroValue: true,
        /////////order: SortingOrder.DESCENDING,
        order: SortingOrder.ASCENDING,

        /////pageKey: pageParam,
        //pageSize: 100,
      });
    } else {
      response = await alchemy.core.getAssetTransfers({
        fromBlock: fromBlock,

        contractAddresses: [contractAddress],
        //category: ["external","internal","erc721"],
        //category: ["erc721"],
        category: [AssetTransfersCategory.ERC721],
        //category: ["internal"],
        //fromAddress: "0x89Dc7A2E543a24F8c1513Fa67cE5aBE6CA338C18",
        //toAddress: "0xc82BbE41f2cF04e3a8efA18F7032BDD7f6d98a81",
        withMetadata: true,
        ///excludeZeroValue: false,
        excludeZeroValue: true,
        //////order: SortingOrder.DESCENDING,
        order: SortingOrder.ASCENDING,
        pageKey: pageParam,
        //pageSize: 100,
      });
    }

    //console.log('response.transfers.length', response?.transfers.length);

    //console.log('response.pageKey', response?.pageKey);

    response?.transfers.map((item, index) => {
      ///console.log("index", index);

      ///console.log("item", item);

      const match = transfers.find((element: any) => {
        return element.hash == item.hash;
      });

      if (match) {
        return;
      }

      const transfer = {
        hash: item.hash,
        blockNum: item.blockNum,
        uniqueId: item.uniqueId,
        from: item.from,
        to: item.to,
        value: item.value,
        erc721TokenId: item.erc721TokenId,
        erc1155Metadata: item.erc1155Metadata,
        tokenId: item.tokenId,
        asset: item.asset,
        category: item.category,
        rawContract: item.rawContract,
        blockTimestamp: item.metadata.blockTimestamp,
      };

      transfers.push(transfer);
    });

    if (response.pageKey == undefined) {
      break;
    }

    pageParam = response.pageKey;
  }

  for (let i = 0; i < transfers.length; i++) {
    ///for (let i = 0; i < 10; i++) {

    console.log('i', i);

    ////getReceipt(transfers[i]);

    const item = transfers[i];

    //console.log("item.hash", item.hash);
    console.log('item.blockNum', item.blockNum);

    const receipt = await alchemy.core.getTransactionReceipt(item.hash);

    if (!receipt) {
      res.status(200).json({
        address: contractAddress,
        length: transfers.length,
        error: 'receipt is null',
      });
      return;
    }

    //console.log("receipt", receipt);

    //console.log("receipt?.logs[1].topics", receipt?.logs[1].topics);
    //console.log("receipt?.logs[0].topics[0]", receipt?.logs[0].topics[0]);

    console.log('receipt.logs.length', receipt?.logs.length);

    for (let j = 0; j < receipt?.logs.length; j++) {
      console.log('address', receipt?.logs[j].address);

      if (receipt?.logs[j].address != nftDropContractAddressHorse) continue;

      // NewSale
      if (
        receipt?.logs[j].topics[0] ==
        '0xf6e03f1c408cfd2d118397c912a4b576683c43b41b015e3d7c212bac0cd0e7c7'
      ) {
        const logsNewSale = receipt?.logs[j];

        const tokenIdInHex = receipt.logs[j].data.substring(0, 66); // 66
        const buyerIndHex = receipt.logs[j].data.substring(66, 130); // 64
        const quantityBoughtInHex = receipt.logs[j].data.substring(130, 194); // 64
        const totalPricePaidInHex = receipt.logs[j].data.substring(194, 258); // 64

        const tokenId = String(parseInt(tokenIdInHex, 16));
        const buyer = '0x' + buyerIndHex.substring(24, 64);
        const quantityBought = parseInt(quantityBoughtInHex, 16);
        const totalPricePaid = String(parseInt(totalPricePaidInHex, 16));

        const paidToken = receipt?.logs[0]?.address;
        const maticPrice = 0.66;

        console.log('NewSale item.hash', item.hash);
        console.log('NewSale tokenId', tokenId);
        console.log('NewSale buyer', buyer);

        try {
          const horsesales = db.collection('horsesales');

          // create a filter for a movie to update
          var filter = { uniqueId: item.uniqueId };
          // this option instructs the method to create a document if no documents match the filter
          var options = { upsert: true };
          // create a document that sets the plot of the movie
          var updateDoc = {
            $set: {
              blockNum: item.blockNum,
              uniqueId: item.uniqueId,
              hash: item.hash,
              from: item.from,
              to: item.to,
              value: item.value,
              erc721TokenId: item.erc721TokenId,
              erc1155Metadata: item.erc1155Metadata,
              tokenId: tokenId,
              asset: item.asset,
              category: item.category,
              rawContract: item.rawContract,
              blockTimestamp: item.blockTimestamp,
              data: receipt.logs[4]?.data,
              buyer: buyer,
              quantityBought: quantityBought,
              totalPricePaid: totalPricePaid,
              paidToken: paidToken,
              maticPrice: maticPrice,
            },
          };

          await horsesales.updateOne(filter, updateDoc, options);

          const nfthorses = db.collection('nfthorses');

          filter = { tokenId: tokenId };

          updateDoc = {
            $set: {
              totalPricePaid,
              paidToken,
              logsNewSale,
            },
          };

          options = { upsert: true };

          nfthorses.updateOne(filter, updateDoc, options, (err, collection) => {
            //if(err) throw err;
            //console.log("Record updated successfully");
            //console.log(collection);
          });
        } catch (error) {
          console.log('error', error);
        } finally {
          ////await client.close();
        }
      } // end of NewSale

      // LogFeeTransfer
      if (
        receipt?.logs[j].topics[0] ==
        '0x4dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63'
      ) {
        //console.log("LogFeeTransfer");
      }

      // TokensClaimned
      if (
        receipt?.logs[j].topics[0] ==
        '0xfa76a4010d9533e3e964f2930a65fb6042a12fa6ff5b08281837a10b0be7321e'
      ) {
        //console.log("TokensClaimned");
      }

      // Approval
      if (
        receipt?.logs[j].topics[0] ==
        '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
      ) {
        //console.log("Approval");
      }

      // Transfer
      if (
        receipt?.logs[j].topics[0] ==
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
      ) {
        ///console.log("receipt?.logs[j].topics", receipt?.logs[j].topics);

        const fromIndHex = receipt.logs[j].topics[1];
        const toInHex = receipt.logs[j].topics[2];
        const tokenIdInHex = receipt.logs[j].topics[3];

        const from = '0x' + fromIndHex.substring(26, 66);
        const to = '0x' + toInHex.substring(26, 66);
        const tokenId = String(parseInt(tokenIdInHex, 16));

        console.log('Transfer item.hash', item.hash);
        console.log('Transfer tokenId', tokenId);
        console.log('Transfer from', from);
        console.log('Transfer to', to);

        try {
          const horsetransfers = db.collection('horsetransfers');

          // create a filter for a movie to update
          const filterHorsetransfers = { uniqueId: item.uniqueId };
          // this option instructs the method to create a document if no documents match the filter
          const optionsHorsetransfers = { upsert: true };
          // create a document that sets the plot of the movie
          const updateHorsetransfers = {
            $set: {
              blockNum: item.blockNum,
              uniqueId: item.uniqueId,
              hash: item.hash,
              from: item.from,
              to: item.to,
              value: item.value,
              erc721TokenId: item.erc721TokenId,
              erc1155Metadata: item.erc1155Metadata,
              asset: item.asset,
              category: item.category,
              rawContract: item.rawContract,
              blockTimestamp: item.blockTimestamp,
              data: receipt.logs[j]?.data,
              tokenId: tokenId,
              tokenFrom: from,
              tokenTo: to,
            },
          };

          await horsetransfers.updateOne(
            filterHorsetransfers,
            updateHorsetransfers,
            optionsHorsetransfers
          );

          const holder = to;

          const nfthorses = db.collection('nfthorses');

          const filterNfthorses = { tokenId: tokenId };

          const updateNfthorses = {
            $set: {
              holder,
            },
          };

          const optionsNfthorses = { upsert: true };

          nfthorses.updateOne(
            filterNfthorses,
            updateNfthorses,
            optionsNfthorses,
            (err, collection) => {
              //if(err) throw err;
              //console.log("Record updated successfully");
              //console.log(collection);
            }
          );

          /*
            const UserSchema = new Schema({
            username: {
              type: String,
              required: true,
              unique: true,
              trim: true,
              minlength: 3,
            },
            email: {
              type: String,
              required: true,
              unique: true,
              trim: true,
              minlength: 3,
            },
            pass: {
              type: String,
              required: true,
              trim: true,
              minlength: 3,
            },
            deposit: {
              type: Number,
              required: false,
              default: 0,
            },
            img: {
              type: String,
              required: true,
              default: `${process.env.API_URL}/images/users/default.png`,
            },
            admin: {
              type: Boolean,
              required: false,
              default: false,
            },
            newPassToken: {
              type: String,
              required: false,
              default: '',
            },
            maticBalance: {
              type: Number,
              required: false,
              default: 0,
            },
            walletAddress: {
              type: String,
              required: true,
              default: '',
            },
            status: {
              type: Boolean,
              default: true,
            },
          });
          */

          //console.log("to", to);

          const users = db.collection('users');

          const username = to + '@granderby.io';
          const email = to + '@granderby.io';
          const pass = '1234';
          const deposit = 0;
          const img = '';
          const admin = false;

          const filterUsers = { walletAddress: to };

          const updateUsers = {
            $set: {
              walletAddress: to,
              username: username,
              email: email,
              pass: pass,
              deposit: deposit,
              img: img,
              admin: admin,
            },
          };

          const optionsUsers = { upsert: true };

          users.updateOne(
            filterUsers,
            updateUsers,
            optionsUsers,
            (err, collection) => {
              //if(err) throw err;
              if (err) {
                console.log('err', err);
              } else {
                //console.log("Record updated successfully");
                //console.log(collection);
              }
            }
          );
        } catch (error) {
          console.log('error', error);
        } finally {
          ////await client.close();
        }
      }

      // ToknesStaked
      if (
        receipt?.logs[j].topics[0] ==
        '0x540cd34f06460fd67aeca9d19e0a56cd3a7c1cde8dc2263f265b68b2ef3495d2'
      ) {
        //console.log("ToknesStaked");
      }
    }

    /*
      if (receipt?.logs[4]?.data && receipt?.logs[4]?.data.length > 10) {
    
        //console.log("receipt?.logs[4].topics", receipt?.logs[4].topics);
    
        console.log("receipt?.logs[4].data", receipt?.logs[4]?.data);
    
    
        const tokenIdInHex = receipt.logs[4].data.substring(0, 66);           // 66
        const buyerIndHex = receipt.logs[4].data.substring(66, 130);          // 64
        const quantityBoughtInHex = receipt.logs[4].data.substring(130, 194); // 64
        const totalPricePaidInHex = receipt.logs[4].data.substring(194, 258); // 64
    
    
        const tokenId = String(parseInt(tokenIdInHex, 16));
        const buyer = "0x" + buyerIndHex.substring(24, 64);
        const quantityBought = parseInt(quantityBoughtInHex, 16);
        const totalPricePaid = parseInt(totalPricePaidInHex, 16);
    
        const paidToken = receipt?.logs[0]?.address;
        const maticPrice = 0.66;
    
    
    
        try {
    
          const collection = db.collection("horsesales");
          // create a filter for a movie to update
          const filter = { uniqueId: item.uniqueId };
          // this option instructs the method to create a document if no documents match the filter
          const options = { upsert: true };
          // create a document that sets the plot of the movie
          const updateDoc = {
            $set: {
              blockNum: item.blockNum,
              uniqueId: item.uniqueId,
              hash: item.hash,
              from: item.from,
              to: item.to,
              value: item.value,
              erc721TokenId: item.erc721TokenId,
              erc1155Metadata: item.erc1155Metadata,
              tokenId: tokenId,
              asset: item.asset,
              category: item.category,
              rawContract: item.rawContract,
              blockTimestamp: item.blockTimestamp,
              data: receipt.logs[4]?.data,
              buyer: buyer,
              quantityBought: quantityBought,
              totalPricePaid: totalPricePaid,
              paidToken: paidToken,
              maticPrice: maticPrice,
              
    
            },
          };
    
          const result = await collection.updateOne(filter, updateDoc, options);
        
    
        } catch (error) {
          console.log("error", error);
    
        } finally {
          ////await client.close();
    
        }
    
      }
      */

    //sleep(100);
  }

  res.status(200).json({
    address: contractAddress,
    length: transfers.length,
    error: '',
  });
}
