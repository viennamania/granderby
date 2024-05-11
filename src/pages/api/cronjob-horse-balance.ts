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
  stakingContractAddressHorseAAA,
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
  error: string;
};

import dbConnect from '@/lib/db/dbConnect';

dbConnect();

import { IHorse } from '@/utils/interfaces/horse-interface';

import { Schema, models, model } from 'mongoose';
import { exit } from 'process';

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
  holder: {
    type: String,
    required: true,
    default: false,
  },
  paidToken: {
    type: String,
    required: false,
    default: false,
  },
  totalPricePaid: {
    type: String,
    required: false,
    default: false,
  },
  logsNewSale: {
    type: Object,
    required: false,
    default: false,
  },
  register: {
    type: String,
    required: false,
    default: false,
  },
});

export const HorseModel =
  models.nfthorse || model<IHorse>('nfthorse', HorseSchema);

import clientPromise from '@/lib/mongodb';

import {
  getHorsesAll,
  setHorseBalanceByTokenId,
} from '@/utils/models/horse-model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //const client = await clientPromise;
  //const collection = client.db('granderby').collection('nfthorses');

  /*
  const horses = await HorseModel.aggregate(
    [
      {
        $sort: { tokenId: 1 },
      },
    ],
    { collation: { locale: 'en_US', numericOrdering: true } }
  );
  */

  /*
  const horses = collection.aggregate(
    [
      {
        $sort: { tokenId: 1 },
      },
    ],
    { collation: { locale: 'en_US', numericOrdering: true } }
  ) as any;
  */

  // call api to get horses data

  const horses = (await getHorsesAll()) as any;

  console.log('cronjob-horse-balance horses length', horses.length);

  //return;

  horses.forEach(async (horse: any) => {
    //if (tokenId !== '242') return;

    const tokenId = horse.tokenId;
    const uid = horse.horseUid; // horseUid

    try {
      fetch(`http://3.38.2.94:3001/api/balanceByHorseUid?uid=${uid}`)
        .then((res) => res.json())
        .then((json) => {
          //console.log('json', json);

          if (json?.recordset?.length === 0) {
            console.log('no recordset', json);
            return;
          }

          const horseBalance = parseInt(json?.recordset[0]?.Horse_balance);

          if (horseBalance > 0) {
            console.log('tokenId', tokenId, 'horseBalance', horseBalance);

            setHorseBalanceByTokenId(tokenId, horseBalance);
          }
        })
        .catch((error) => {
          //console.log('tokenId', tokenId, 'error', error);
        });
    } catch (error) {
      console.log('error', error);
    }
  });

  res.status(200).json({
    address: '',
    length: 0,
    error: '',
  });
}
