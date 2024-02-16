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
  const contractAddress = 'stadium1001-ranking';

  var gameId: any = await kv.get(contractAddress);

  if (gameId) {
    // gameId += 1;

    gameId = parseInt(gameId) + 1;
    gameId = gameId.toString();
  } else {
    gameId = '1001031377';
  }

  const response = await fetch(
    /////`http://3.38.2.94:3001/api/game/history?gameId=${gameId}`

    `http://3.38.2.94:3001/api/game/ranking?gameId=${gameId}`
  );
  const data = await response.json();

  //console.log(data?.recordset);
  /*
    [
      {
        "GAME_UID": "1001031371",
        "LASTGAMETIME":"2024-02-17T13:36:00.000Z",
        "HORSE_INDEX": 0,
        "HORSE_UID": "3036",
        "NAME":"#00001592",
        "RANKING": 6,
        "RESULT_MONEY": "0",
        "DURATION": "6044",
        "INTERVAL_DURATION": "13.759,24.407,36.479,48.624,60.441"
      },

    ]
  */

  if (data?.recordset?.length === 0) {
    res.status(200).json({
      address: contractAddress,
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

  //http://3.38.2.94:3001/api/gameinfo?uid=1001030305

  const gameInfoResponse = await fetch(
    `http://3.38.2.94:3001/api/gameinfo?uid=${gameId}`
  );
  const gameInfoData = await gameInfoResponse.json();

  try {
    const ranks = db.collection('game_ranks');

    const filter = { gameId: gameId };

    const updateDoc = {
      $set: {
        gameId: gameId,
        gameInfo: gameInfoData?.recordset[0],
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

  await kv.set(contractAddress, gameId);

  res.status(200).json({
    address: contractAddress,
    length: 0,
    error: '',
  });
}
