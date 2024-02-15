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
        "HORSE_INDEX": 0,
        "HORSE_UID": "3036",
        "RANKING": 6,
        "RESULT_MONEY": "0",
        "DURATION": "6044",
        "INTERVAL_DURATION": "13.759,24.407,36.479,48.624,60.441"
      },
      {
        "GAME_UID": "1001031371",
        "HORSE_INDEX": 1,
        "HORSE_UID": "3035",
        "RANKING": 1,
        "RESULT_MONEY": "30000",
        "DURATION": "5994",
        "INTERVAL_DURATION": "13.684,24.405,36.575,47.954,59.943"
      },
      {
        "GAME_UID": "1001031371",
        "HORSE_INDEX": 2,
        "HORSE_UID": "8119",
        "RANKING": 9,
        "RESULT_MONEY": "0",
        "DURATION": "6063",
        "INTERVAL_DURATION": "13.415,23.813,35.667,47.945,60.634"
      },
      {
        "GAME_UID": "1001031371",
        "HORSE_INDEX": 3,
        "HORSE_UID": "3034",
        "RANKING": 0,
        "RESULT_MONEY": "50000",
        "DURATION": "5987",
        "INTERVAL_DURATION": "13.697,24.534,36.836,48.179,59.878"
      },
      {
        "GAME_UID": "1001031371",
        "HORSE_INDEX": 4,
        "HORSE_UID": "3029",
        "RANKING": 4,
        "RESULT_MONEY": "0",
        "DURATION": "6019",
        "INTERVAL_DURATION": "13.501,24.153,36.174,48.035,60.193"
      },
      {
        "GAME_UID": "1001031371",
        "HORSE_INDEX": 5,
        "HORSE_UID": "3033",
        "RANKING": 5,
        "RESULT_MONEY": "0",
        "DURATION": "6030",
        "INTERVAL_DURATION": "13.583,24.326,36.223,48.496,60.305"
      },
      {
        "GAME_UID": "1001031371",
        "HORSE_INDEX": 6,
        "HORSE_UID": "8118",
        "RANKING": 3,
        "RESULT_MONEY": "0",
        "DURATION": "6007",
        "INTERVAL_DURATION": "13.633,24.305,36.354,48.189,60.07"
      },
      {
        "GAME_UID": "1001031371",
        "HORSE_INDEX": 7,
        "HORSE_UID": "3030",
        "RANKING": 8,
        "RESULT_MONEY": "0",
        "DURATION": "6060",
        "INTERVAL_DURATION": "13.824,24.611,36.597,48.881,60.607"
      },
      {
        "GAME_UID": "1001031371",
        "HORSE_INDEX": 8,
        "HORSE_UID": "3031",
        "RANKING": 11,
        "RESULT_MONEY": "0",
        "DURATION": "6170",
        "INTERVAL_DURATION": "14.016,25.159,37.518,49.814,61.705"
      },
      {
        "GAME_UID": "1001031371",
        "HORSE_INDEX": 9,
        "HORSE_UID": "8120",
        "RANKING": 7,
        "RESULT_MONEY": "0",
        "DURATION": "6052",
        "INTERVAL_DURATION": "13.6,24.517,36.933,48.996,60.526"
      }
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

  try {
    const ranks = db.collection('game_ranks');

    const filter = { gameId: gameId };

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

  await kv.set(contractAddress, gameId);

  res.status(200).json({
    address: contractAddress,
    length: 0,
    error: '',
  });
}
