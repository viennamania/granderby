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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch('http://3.38.2.94:3001/api/horsedata');

  const data = await response.json();

  if (data?.recordset?.length === 0) {
    res.status(200).json({
      address: '',
      length: 0,
      error: 'no data',
    });

    return;
  }

  // http://3.38.2.94:3001/api/horseinfo?uid=6918

  /*
  {"recordsets":[[{"ATTACHED_STADIUM":1001,"HORSE_UID":"6918","UUID":"NULL","NAME":"#00203098","TEXTURE_KEY":"Hrs_00203098","SPEED":61,"PRECENDING":59,"OVERTAKING":65,"BRAWN":0,"SPRIT":61,"POWER":67,"STAMINA":55,"AGILIGHTY":64,"GATE":50,"HANDICAP":-1.5,"CHARACTER":0,"SEX":0,"BIRTH":"2020-07-28T00:00:00.000Z","AGE":3,"FATHER":"0","MOTHER":"0","Foals":0,"USER_OWNER":"0","WEIGHT":435,"GRADE":5,"RECORD":31,"RECORD_1R":0,"RECORD_2R":3,"RECORD_3R":2,"RECORD_4R":3,"RECORD_5R":7,"FIRSTARRIVE":5,"SECONDARRIVE":5,"THIRDARRIVE":6,"TOTAL_PRIZE":"520000","LAST_PRIZE":"50000","TRANNING":75,"WEATHER":8,"CONDITION":0,"TREND":50,"LASTGAMETIME":"2024-01-31T16:12:00.000Z","EXP":"0","AutoRegist":34,"AutoRegistCnt":2,"Favorites":0,"PurchaseDate":"2020-03-26T00:00:00.000Z"}]],"recordset":[{"ATTACHED_STADIUM":1001,"HORSE_UID":"6918","UUID":"NULL","NAME":"#00203098","TEXTURE_KEY":"Hrs_00203098","SPEED":61,"PRECENDING":59,"OVERTAKING":65,"BRAWN":0,"SPRIT":61,"POWER":67,"STAMINA":55,"AGILIGHTY":64,"GATE":50,"HANDICAP":-1.5,"CHARACTER":0,"SEX":0,"BIRTH":"2020-07-28T00:00:00.000Z","AGE":3,"FATHER":"0","MOTHER":"0","Foals":0,"USER_OWNER":"0","WEIGHT":435,"GRADE":5,"RECORD":31,"RECORD_1R":0,"RECORD_2R":3,"RECORD_3R":2,"RECORD_4R":3,"RECORD_5R":7,"FIRSTARRIVE":5,"SECONDARRIVE":5,"THIRDARRIVE":6,"TOTAL_PRIZE":"520000","LAST_PRIZE":"50000","TRANNING":75,"WEATHER":8,"CONDITION":0,"TREND":50,"LASTGAMETIME":"2024-01-31T16:12:00.000Z","EXP":"0","AutoRegist":34,"AutoRegistCnt":2,"Favorites":0,"PurchaseDate":"2020-03-26T00:00:00.000Z"}],"output":{},"rowsAffected":[1]}
  */

  //const horseUids = data?.recordset?.map((item: any) => item.HORSE_UID);

  /*
  try {
    const ranks = db.collection('game_horses');

    const filter = { horseId: gameId };

    const updateDoc = {
      $set: {
        gameId: gameId,
        ranking: data?.recordset,
      },
    };

    const options = { upsert: true };

    await ranks.updateOne(filter, updateDoc, options);
  } catch (error) {
    console.log('error', error);
  } finally {
    ////await client.close();
  }
  */

  res.status(200).json({
    address: '',
    length: 0,
    error: '',
  });
}
