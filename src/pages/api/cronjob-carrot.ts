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
  tokenContractAddressGCOW,
  tokenContractAddressSTEC,
  tokenContractAddressHV,
} from '@/config/contractAddresses';

import db from '@/db/conn.mjs';

import { kv } from '@vercel/kv';

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

type Data = {
  address: string;
  length: number;
  fromBlock: string;
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  /*
  const contractAddress = tokenContractAddressCARROTDrop;


  // Carrot
  {

    var fromBlock: any = await kv.get(contractAddress);

    if (fromBlock) {
    } else {
      fromBlock = '0x0';
    }

    let transfers = [] as any;

    var pageParam = null;

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
          category: [AssetTransfersCategory.ERC20],
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
          toBlock: 'latest',

          contractAddresses: [contractAddress],
          //category: ["external","internal","erc721"],
          //category: ["erc721"],
          category: [AssetTransfersCategory.ERC20],
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

      console.log('response.transfers.length', response.transfers.length);

      console.log('response.pageKey', response.pageKey);

      response.transfers.map((item, index) => {
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

    console.log('transfers length', transfers.length);

    //////process.exit(0);

    for (let i = 0; i < transfers.length; i++) {
      ///for (let i = 0; i < 10; i++) {

      ////getReceipt(transfers[i]);

      const item = transfers[i];

      const tokenId = String(parseInt(item.tokenId, 16));

      //console.log("item.hash", item.hash);
      console.log('item.blockNum', item.blockNum);

      fromBlock = item.blockNum;

      const receipt = await alchemy.core.getTransactionReceipt(item.hash);

      for (let j = 0; j < receipt?.logs?.length; j++) {
    

        const uniqueId = item.hash + ':log:' + receipt?.logs[j].logIndex;

        console.log('uniqueId', uniqueId);

        //console.log("address", receipt?.logs[j].address);

        //if (receipt?.logs[j].address != nftDropContractAddressHorse) continue;

        const address = receipt?.logs[j].address;

        // Approval
        if (
          receipt?.logs[j].topics[0] ==
          '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
        ) {
          console.log('Approval item.hash', item.hash);
          console.log('Approval tokenId', tokenId);

          // NewSale
        } else if (
          receipt?.logs[j].topics[0] ==
          '0xf6e03f1c408cfd2d118397c912a4b576683c43b41b015e3d7c212bac0cd0e7c7'
        ) {
          console.log('NewSale item.hash', item.hash);
          console.log('NewSale tokenId', tokenId);

          const logsNewSale = receipt?.logs[j];

          const listingCreatorInHex = receipt.logs[j].topics[1];
          const listingCreator = '0x' + listingCreatorInHex.substring(26, 66);

          //const tokenIdInHex = receipt.logs[j].data.substring(0, 66);           // 66

          const buyerIndHex = receipt.logs[j].data.substring(66, 130); // 64
          const quantityBoughtInHex = receipt.logs[j].data.substring(130, 194); // 64
          const totalPricePaidInHex = receipt.logs[j].data.substring(194, 258); // 64

          ///const tokenId = String(parseInt(tokenIdInHex, 16));
          const buyer = '0x' + buyerIndHex.substring(24, 64);
          const quantityBought = parseInt(quantityBoughtInHex, 16);
          const totalPricePaid = String(parseInt(totalPricePaidInHex, 16));

          const paidToken = receipt?.logs[0]?.address;
          const maticPrice = 0.66;

          console.log('NewSale listingCreator', listingCreator);
          console.log('NewSale buyer', buyer);

          // LogFeeTransfer
        } else if (
          receipt?.logs[j].topics[0] ==
          '0x4dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63'
        ) {
          console.log('LogFeeTransfer');

          // TokensClaimned
        } else if (
          receipt?.logs[j].topics[0] ==
          '0xfa76a4010d9533e3e964f2930a65fb6042a12fa6ff5b08281837a10b0be7321e'
        ) {
          console.log('TokensClaimned');

          // Transfer
        } else if (
          receipt?.logs[j].topics[0] ==
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
        ) {
          ///console.log("receipt?.logs[j].topics", receipt?.logs[j].topics);

          console.log('Transfer');
          console.log('Transfer item.hash', item.hash);

          const fromInHex = receipt.logs[j].topics[1];
          const toInHex = receipt.logs[j].topics[2];
          const tokenIdInHex = receipt.logs[j].topics[3];

          const from = '0x' + fromInHex.substring(26, 66);
          const to = '0x' + toInHex.substring(26, 66);

          const tokenId = String(parseInt(tokenIdInHex, 16));

          console.log('Transfer tokenId', tokenId);

          //console.log ("Transfer from", from);
          //console.log ("Transfer to", to);

          const logs4Address = receipt?.logs[4]?.address;

          try {
            const horsetransfers = db.collection('horsetransfers');

            // create a filter for a movie to update
            const filterHorsetransfers = { uniqueId: uniqueId };
            // this option instructs the method to create a document if no documents match the filter
            const optionsHorsetransfers = { upsert: true };
            // create a document that sets the plot of the movie
            const updateHorsetransfers = {
              $set: {
                uniqueId: uniqueId,
                blockNum: item.blockNum,
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
                logs4Address: logs4Address,
              },
            };

            await horsetransfers.updateOne(
              filterHorsetransfers,
              updateHorsetransfers,
              optionsHorsetransfers
            );
          } catch (error) {
            console.log('error', error);
          } finally {
            ////await client.close();
          }

          // ToknesStaked
        } else if (
          receipt?.logs[j].topics[0] ==
          '0x540cd34f06460fd67aeca9d19e0a56cd3a7c1cde8dc2263f265b68b2ef3495d2'
        ) {
          console.log('ToknesStaked');
          console.log('ToknesStaked item.hash', item.hash);
          console.log('ToknesStaked tokenId', tokenId);

          const stakerInHex = receipt?.logs[j].topics[1];

          const staker = '0x' + stakerInHex.substring(26, 66);

          try {
            const stecstakes = db.collection('stecstakes');

            // create a filter for a movie to update
            const filterHorsestakes = { uniqueId: uniqueId };

            // create a document that sets the plot of the movie
            const updateHorsestakes = {
              $set: {
                uniqueId: uniqueId,
                blockNum: item.blockNum,
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
                tokenId: tokenId,
                register: address,
                staker: staker,
              },
            };

            // this option instructs the method to create a document if no documents match the filter
            const optionsHorsestakes = { upsert: true };

            await stecstakes.updateOne(
              filterHorsestakes,
              updateHorsestakes,
              optionsHorsestakes
            );
          } catch (error) {
            console.log('error', error);
          } finally {
            ////await client.close();
          }
        }

        // TokensWithdrawn
        if (
          receipt?.logs[j].topics[0] ==
          '0x09ba0ae49142860d7eec1f3ce54722d70b60910facbe018cccb1099e4e84755c'
        ) {
          console.log('TokensWithdrawn');
          console.log('TokensWithdrawn item.hash', item.hash);
          console.log('TokensWithdrawn tokenId', tokenId);

          const stakerInHex = receipt?.logs[j].topics[1];

          const staker = '0x' + stakerInHex.substring(26, 66);

          try {
            const stecstakes = db.collection('stecstakes');

            // create a filter for a movie to update
            const filterHorsestakes = { uniqueId: uniqueId };

            // create a document that sets the plot of the movie
            const updateHorsestakes = {
              $set: {
                uniqueId: uniqueId,
                blockNum: item.blockNum,
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
                tokenId: tokenId,
                register: null,
                staker: staker,
              },
            };

            // this option instructs the method to create a document if no documents match the filter
            const optionsHorsestakes = { upsert: true };

            await stecstakes.updateOne(
              filterHorsestakes,
              updateHorsestakes,
              optionsHorsestakes
            );
          } catch (error) {
            console.log('error', error);
          } finally {
            ////await client.close();
          }
        }
      }

      //sleep(100);
    }

    await kv.set(contractAddress, fromBlock);


    res.status(200).json({
      address: contractAddress,
      length: transfers.length,
      fromBlock: fromBlock,
      error: '',
    });

  }

  */

  const function1 = async function (contractAddress: string) {
    var fromBlock: any = await kv.get(contractAddress);

    if (fromBlock) {
    } else {
      fromBlock = '0x0';
    }

    let transfers = [] as any;

    var pageParam = null;

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
          category: [AssetTransfersCategory.ERC20],
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
          toBlock: 'latest',

          contractAddresses: [contractAddress],
          //category: ["external","internal","erc721"],
          //category: ["erc721"],
          category: [AssetTransfersCategory.ERC20],
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

      console.log('response.transfers.length', response.transfers.length);

      console.log('response.pageKey', response.pageKey);

      response.transfers.map((item, index) => {
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

    console.log('transfers length', transfers.length);

    //////process.exit(0);

    for (let i = 0; i < transfers.length; i++) {
      ///for (let i = 0; i < 10; i++) {

      ////getReceipt(transfers[i]);

      const item = transfers[i];

      const tokenId = String(parseInt(item.tokenId, 16));

      //console.log("item.hash", item.hash);
      console.log('item.blockNum', item.blockNum);

      fromBlock = item.blockNum;

      const receipt = await alchemy.core.getTransactionReceipt(item.hash);

      for (let j = 0; j < receipt?.logs?.length; j++) {
        /*
        0x6e435ff2733ec2b2373cdb0dcb157d27a816103930b29a572f45fe3b3dbb9267:log:232
        */

        const uniqueId = item.hash + ':log:' + receipt?.logs[j].logIndex;

        console.log('uniqueId', uniqueId);

        //console.log("address", receipt?.logs[j].address);

        //if (receipt?.logs[j].address != nftDropContractAddressHorse) continue;

        const address = receipt?.logs[j].address;

        // Approval
        if (
          receipt?.logs[j].topics[0] ==
          '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
        ) {
          console.log('Approval item.hash', item.hash);
          console.log('Approval tokenId', tokenId);

          // NewSale
        } else if (
          receipt?.logs[j].topics[0] ==
          '0xf6e03f1c408cfd2d118397c912a4b576683c43b41b015e3d7c212bac0cd0e7c7'
        ) {
          console.log('NewSale item.hash', item.hash);
          console.log('NewSale tokenId', tokenId);

          const logsNewSale = receipt?.logs[j];

          const listingCreatorInHex = receipt.logs[j].topics[1];
          const listingCreator = '0x' + listingCreatorInHex.substring(26, 66);

          //const tokenIdInHex = receipt.logs[j].data.substring(0, 66);           // 66

          const buyerIndHex = receipt.logs[j].data.substring(66, 130); // 64
          const quantityBoughtInHex = receipt.logs[j].data.substring(130, 194); // 64
          const totalPricePaidInHex = receipt.logs[j].data.substring(194, 258); // 64

          ///const tokenId = String(parseInt(tokenIdInHex, 16));
          const buyer = '0x' + buyerIndHex.substring(24, 64);
          const quantityBought = parseInt(quantityBoughtInHex, 16);
          const totalPricePaid = String(parseInt(totalPricePaidInHex, 16));

          const paidToken = receipt?.logs[0]?.address;
          const maticPrice = 0.66;

          console.log('NewSale listingCreator', listingCreator);
          console.log('NewSale buyer', buyer);

          // LogFeeTransfer
        } else if (
          receipt?.logs[j].topics[0] ==
          '0x4dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63'
        ) {
          console.log('LogFeeTransfer');

          // TokensClaimned
        } else if (
          receipt?.logs[j].topics[0] ==
          '0xfa76a4010d9533e3e964f2930a65fb6042a12fa6ff5b08281837a10b0be7321e'
        ) {
          console.log('TokensClaimned');

          // Transfer
        } else if (
          receipt?.logs[j].topics[0] ==
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
        ) {
          ///console.log("receipt?.logs[j].topics", receipt?.logs[j].topics);

          console.log('Transfer');
          console.log('Transfer item.hash', item.hash);

          const fromInHex = receipt.logs[j].topics[1];
          const toInHex = receipt.logs[j].topics[2];
          const tokenIdInHex = receipt.logs[j].topics[3];

          const from = '0x' + fromInHex.substring(26, 66);
          const to = '0x' + toInHex.substring(26, 66);

          const tokenId = String(parseInt(tokenIdInHex, 16));

          console.log('Transfer tokenId', tokenId);

          //console.log ("Transfer from", from);
          //console.log ("Transfer to", to);

          const logs4Address = receipt?.logs[4]?.address;

          try {
            const horsetransfers = db.collection('horsetransfers');

            // create a filter for a movie to update
            const filterHorsetransfers = { uniqueId: uniqueId };
            // this option instructs the method to create a document if no documents match the filter
            const optionsHorsetransfers = { upsert: true };
            // create a document that sets the plot of the movie
            const updateHorsetransfers = {
              $set: {
                uniqueId: uniqueId,
                blockNum: item.blockNum,
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
                logs4Address: logs4Address,
              },
            };

            await horsetransfers.updateOne(
              filterHorsetransfers,
              updateHorsetransfers,
              optionsHorsetransfers
            );
          } catch (error) {
            console.log('error', error);
          } finally {
            ////await client.close();
          }

          // ToknesStaked
        } else if (
          receipt?.logs[j].topics[0] ==
          '0x540cd34f06460fd67aeca9d19e0a56cd3a7c1cde8dc2263f265b68b2ef3495d2'
        ) {
          console.log('ToknesStaked');
          console.log('ToknesStaked item.hash', item.hash);
          console.log('ToknesStaked tokenId', tokenId);

          const stakerInHex = receipt?.logs[j].topics[1];

          const staker = '0x' + stakerInHex.substring(26, 66);

          try {
            const stecstakes = db.collection('stecstakes');

            // create a filter for a movie to update
            const filterHorsestakes = { uniqueId: uniqueId };

            // create a document that sets the plot of the movie
            const updateHorsestakes = {
              $set: {
                uniqueId: uniqueId,
                blockNum: item.blockNum,
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
                tokenId: tokenId,
                register: address,
                staker: staker,
              },
            };

            // this option instructs the method to create a document if no documents match the filter
            const optionsHorsestakes = { upsert: true };

            await stecstakes.updateOne(
              filterHorsestakes,
              updateHorsestakes,
              optionsHorsestakes
            );
          } catch (error) {
            console.log('error', error);
          } finally {
            ////await client.close();
          }
        }

        // TokensWithdrawn
        if (
          receipt?.logs[j].topics[0] ==
          '0x09ba0ae49142860d7eec1f3ce54722d70b60910facbe018cccb1099e4e84755c'
        ) {
          console.log('TokensWithdrawn');
          console.log('TokensWithdrawn item.hash', item.hash);
          console.log('TokensWithdrawn tokenId', tokenId);

          const stakerInHex = receipt?.logs[j].topics[1];

          const staker = '0x' + stakerInHex.substring(26, 66);

          try {
            const stecstakes = db.collection('stecstakes');

            // create a filter for a movie to update
            const filterHorsestakes = { uniqueId: uniqueId };

            // create a document that sets the plot of the movie
            const updateHorsestakes = {
              $set: {
                uniqueId: uniqueId,
                blockNum: item.blockNum,
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
                tokenId: tokenId,
                register: null,
                staker: staker,
              },
            };

            // this option instructs the method to create a document if no documents match the filter
            const optionsHorsestakes = { upsert: true };

            await stecstakes.updateOne(
              filterHorsestakes,
              updateHorsestakes,
              optionsHorsestakes
            );
          } catch (error) {
            console.log('error', error);
          } finally {
            ////await client.close();
          }
        }
      }

      //sleep(100);
    }

    await kv.set(contractAddress, fromBlock);

    res.status(200).json({
      address: contractAddress,
      length: transfers.length,
      fromBlock: fromBlock,
      error: '',
    });
  };

  function1(tokenContractAddressCARROTDrop);
  function1(tokenContractAddressSUGARDrop);
  function1(tokenContractAddressGCOW);
  function1(tokenContractAddressSTEC);
  function1(tokenContractAddressHV);
}
