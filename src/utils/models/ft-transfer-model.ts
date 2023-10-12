import { ITransferHistory } from '@/utils/interfaces/transfer-interface';

import { Schema, models, model } from 'mongoose';

////import { connectMongo } from '@/utils/services/database';
////connectMongo();

import dbConnect from '@/lib/db/dbConnect';
import {
  tokenContractAddressGCOW,
  tokenContractAddressGRD,
} from '@/config/contractAddresses';

dbConnect();

/*
            blockNum: item.blockNum,
            uniqueId: item.uniqueId,
            hash: item.hash,
            from: item.from,
            to: item.to,
            value: item.value,
            erc721TokenId: item.erc721TokenId,
            erc1155Metadata: item.erc1155Metadata,
            tokenId: item.tokenId,
            asset: item.asset,
            category: item.category,
            rawContract: item.rawContract,
            blockTimestamp: item.blockTimestamp,
            data: receipt.logs[4]?.data,
            buyer: buyer,
            quantityBought: quantityBought,
            totalPricePaid: totalPricePaid,
*/

const HorseTransferSchema = new Schema({
  blockTimestamp: {
    type: String,
    required: true,
  },
  blockNum: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  erc721TokenId: {
    type: String,
    required: true,
  },
  erc1155Metadata: {
    type: String,
    required: true,
  },
  tokenId: {
    type: String,
    required: true,
  },
  asset: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rawContract: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  tokenFrom: {
    type: String,
    required: true,
  },
  tokenTo: {
    type: String,
    required: true,
  },
  logs4Address: {
    type: String,
    required: true,
  },
});

export const GRDTransferModel =
  models.grdtransfer ||
  model<ITransferHistory>('grdtransfer', HorseTransferSchema);

export const GCOWTransferModel =
  models.gcowtransfer ||
  model<ITransferHistory>('gcowtransfer', HorseTransferSchema);

export const getTransferHistoryByHolder = async (
  contract: String,
  address: String
): Promise<ITransferHistory[]> => {
  console.log('getTransferHistoryByHolder contract', contract);
  console.log('getTransferHistoryByHolder address', address);

  if (!contract || !address) {
    return [];
  }

  /*
  const totalData = await HorseModel
  .find({
    'nft.rawMetadata.attributes': {
      $elemMatch: {
        trait_type: 'Grade',
        //value: grades,
        value: { $in: grades },
      },
    },
  }).catch((err) => {
    ////return err;
  });
  */

  return await GRDTransferModel.find({
    /*
      'rawContract': {
        $elemMatch: {
          address: contract.toLowerCase(),
        },
      },
      */

    $and: [
      {
        //$elemMatch: { 'rawContract.address': contract.toLowerCase() },

        /*
          rawContract: {
            $elemMatch: {
              address: contract.toLowerCase(),
            },
          },
          */

        'rawContract.address': contract.toLowerCase(),
      },
      {
        $or: [{ tokenFrom: address }, { tokenTo: address }],
      },
    ],

    /*
      $elemMatch: { 'rawContract.address': contract.toLowerCase() },
     
      $or: [
        { tokenFrom: address },
        { tokenTo: address },
      ]
      */
  })
    .sort({ blockTimestamp: -1 })
    .limit(100);
};
