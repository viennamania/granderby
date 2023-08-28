/*
import { Schema, models, model } from 'mongoose';

import { IHorse } from '../interfaces/horse-interface';


//import { connectMongo } from '../services/database';
import clientPromise from '@/lib/mongodb';

////import { getCoinConvert } from './settings-model';

//connectMongo();

const HorseSchema = new Schema({
  tokenId: {
    type: String,
    required: true,
    default: false,
  },
  contract: {
    type: String,
    required: true,
    default: false,
  },
  nft: {
    type: Object,
    required: true,
    default: false,
  },
});


export const Nft_horse = models.Nft_horse || model('nft_horse', HorseSchema);

//console.log('Nft_horse', Nft_horse);



export const getAllHorses = async () => {

  const horses: IHorse[] = (await Nft_horse.find({})) as IHorse[];

  console.log('horses', horses);

  if (horses) {
    return { success: true, horses: horses };
  } else {
    return { success: false, message: 'horses not found' };
  }
};



export const horseCount = async () => {
  const count = await Nft_horse.countDocuments({ status: true });
  return count;
};

*/

//import { IHorseHistory } from '@/utils/horseRace/interfaces/horseHistory';

import { ITransaction } from '../interfaces/transaction-interface';

import { Schema, models, model } from 'mongoose';

////////import { connectMongo } from '@/utils/services/database';
///////////connectMongo();

import dbConnect from '@/lib/db/dbConnect';

dbConnect();

/*
/*
block_signed_at 2023-08-13T10:04:32Z
tx_hash 0x7835286d64e8e271a03d225707f087bb401d19fa4886ffc80d7dcb1151061e13
from 0x6271117e328c1720bae5d4cca95eda7554bcfa70
to 0x8c7ed96f25d817480a1137c477e462c8eb0100de
value 6000000000000000000
*/

const TransactionSchema = new Schema({
  block_signed_at: {
    type: String,
    required: true,
    default: false,
  },
  tx_hash: {
    type: String,
    required: true,
    default: false,
  },
  from: {
    type: String,
    required: true,
    default: false,
  },
  to: {
    type: String,
    required: true,
    default: false,
  },
  amount: {
    type: Number,
    required: true,
    default: false,
  },
  contract: {
    type: String,
    required: true,
    default: false,
  },
});

export const TransactionModel =
  models.transaction || model<ITransaction>('transaction', TransactionSchema);

//export const getAllHorses = async (): Promise<IHorse[]> => {

/*
3
const result  = await findOne({color: "gray", "object.name":"apple" })
*/
/*
{ 
    "names": {
        "$in": [
            { "firstname": "Tom", "lastname": "Smith" }, 
            { "firstname": "Bob", "lastname": "Smith" }  
        ]
    }
}
*/

export const getAllTransactions = async (
  pageNumber: number,
  pagination: number,
  contract: object,
  address: string
) => {
  /*
  console.log('getAllTransactions pageNumber', pageNumber);
  console.log('getAllTransactions pagination', pagination);
  console.log('getAllTransactions contract', contract);
  console.log('getAllTransactions address', address);

  console.log(
    'getAllTransactions contractAddress',
    contract?.contractAddress.toLowerCase()
  );
  */

  /*
  const data = await TransactionModel.find({

    
    'nft.rawMetadata.attributes': {
      $elemMatch: {
        trait_type: 'Grade',
        value: 'D',
      },
    },
  
  })
    .sort({ tokenId: 1 })
    .skip((pageNumber - 1) * pagination)
    //limit is number of Records we want to display
    .limit(pagination)
    
    .then(data => {

      return {'nfts' : data, 'pageNumber' : (pageNumber + 1) };

    })
    
    .catch((err) => {
      ////return err;
    });

  return { nfts: data, pageNumber: pageNumber + 1 };
    */

  const data = await TransactionModel.find({
    /*
    'nft.rawMetadata.attributes': {
      $elemMatch: {
        trait_type: 'Grade',
        value: 'D',
      },
    },
    */

    contract: contract?.contractAddress.toLowerCase(),

    /* from or to is the address */
    $or: [{ from: address.toLowerCase() }, { to: address.toLowerCase() }],
  })
    .sort({ block_signed_at: -1 })
    .skip((pageNumber - 1) * pagination)
    //limit is number of Records we want to display
    .limit(pagination)

    /*
    .then(data => {

      return {'transactions' : data, 'pageNumber' : (pageNumber + 1) };

    })
    */

    .catch((err) => {
      ////return err;
      console.log('transaction-model err', err);
    });

  ///console.log('transaction-model data', data);

  return { transactions: data, pageNumber: pageNumber + 1 };
};
