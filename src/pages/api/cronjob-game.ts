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
  const contractAddress = 'stadium1001';

  var gameId: any = await kv.get(contractAddress);

  if (gameId) {
    // gameId += 1;

    gameId = parseInt(gameId) + 1;
    gameId = gameId.toString();
  } else {
    gameId = '1001030309';
  }

  // fetch api
  // http://3.38.2.94:3001/api/game/history?gameId=1001030309

  const response = await fetch(
    `http://3.38.2.94:3001/api/game/history?gameId=${gameId}`
  );
  const data = await response.json();

  //console.log(data?.recordset);
  /*
    {
    stadiumId: 1001,
    gameId: '1001030312',
    horseIndex: 0,
    horseUid: '2206',
    horseSpeed: 69,
    horsePrecending: 46,
    horseOvertaking: 87,
    horseBrawn: 25,
    horseSprit: 25,
    horsePower: 99,
    horseStamina: 95,
    horseHandicap: -1,
    horseCharacter: 2,
    horseWeight: 445,
    horseGrade: 4,
    horseRecord: 42,
    horseRecord1R: 7,
    horseRecord2R: 2,
    horseRecord3R: 3,
    horseRecord4R: 7,
    horseRecord5R: 3,
    horseFirstArrive: 2,
    horseSecondArrive: 2,
    horseThirdArrive: 7,
    horseTranning: 62,
    horseCondition: 0,
    horseTrend: 20,
    horseRunRecords: '{"1000":{"EarlyAverage":13.888,"LateAverage":11.645},"1200":{"EarlyAverage":13.841,"LateAverage":11.421}}',
    horseLastRecordByTrack: '{"1000":[14.005,24.99,37.46,49.134,58.986],"1200":[13.927,24.784,36.408,48.542,60.466,69.892]}',
    horseScore: 235.576,
    horsemanUid: '5006',
    horsemanRecord: 70,
    horsemanRecord1R: 6,
    horsemanRecord2R: 7,
    horsemanMultiPro: 15,
    expireTime: '2024-02-23T03:36:04.527Z'
  },
  */

  if (data?.recordset?.length === 0) {
    res.status(200).json({
      address: contractAddress,
      length: 0,
      error: 'no data',
    });

    return;
  }

  try {
    const games = db.collection('games');

    const filter = { gameId: gameId };

    const updateDoc = {
      $set: {
        gameId: gameId,
        line1: data?.recordset?.[0],
        line2: data?.recordset?.[1],
        line3: data?.recordset?.[2],
        line4: data?.recordset?.[3],
        line5: data?.recordset?.[4],
        line6: data?.recordset?.[5],
        line7: data?.recordset?.[6],
        line8: data?.recordset?.[7],
        line9: data?.recordset?.[8],
        line10: data?.recordset?.[9],
        line11: data?.recordset?.[10],
        line12: data?.recordset?.[11],
        line13: data?.recordset?.[12],
        line14: data?.recordset?.[13],
        line15: data?.recordset?.[14],
      },
    };

    const options = { upsert: true };

    await games.updateOne(filter, updateDoc, options);
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
