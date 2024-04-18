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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  /*
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
  */

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

  /*
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
  */

  //const horses = await db.collection('nfthorses').find({}).toArray();

  // order by tokenId
  // collation: { locale: 'en_US', numericOrdering: true },

  /*
  const horses = db
    .collection('nfthorses').aggregate([

      {
        $sort: { tokenId: 1 },
      },

      {
        collation: { locale: 'en_US', numericOrdering: true },
      }


    ]) as any;
  */

  const horses = await HorseModel.aggregate(
    [
      {
        $sort: { tokenId: 1 },
      },
    ],
    { collation: { locale: 'en_US', numericOrdering: true } }
  );

  horses.forEach(async (horse: any) => {
    try {
      ///const uid = horse?.liveHorseInfo?.HORSE_UID;

      const s3url = 'https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/hrs/';

      let grade = '';

      let imagesrc = '';

      let gameHorseName = '';

      if (Number(horse.tokenId) === 0) {
        imagesrc = 'Hrs_00000000.png';
        grade = 'S';
        gameHorseName = '00000000';
      } else if (Number(horse.tokenId) === 1) {
        imagesrc = 'Hrs_00000001.png';
        grade = 'S';
        gameHorseName = '00000001';
      } else if (Number(horse.tokenId) === 2) {
        imagesrc = 'Hrs_00000002.png';
        grade = 'S';
        gameHorseName = '00000002';
      } else if (Number(horse.tokenId) === 3) {
        imagesrc = 'Hrs_00000003.png';
        grade = 'S';
        gameHorseName = '00000003';
      } else if (Number(horse.tokenId) === 4) {
        imagesrc = 'Hrs_00000004.png';
        grade = 'S';
        gameHorseName = '00000004';
      } else if (Number(horse.tokenId) === 5) {
        imagesrc = 'Hrs_00000005.png';
        grade = 'S';
        gameHorseName = '00000005';
      } else if (Number(horse.tokenId) === 6) {
        imagesrc = 'Hrs_00000006.png';
        grade = 'S';
        gameHorseName = '00000006';
      } else if (Number(horse.tokenId) === 7) {
        imagesrc = 'Hrs_00000007.png';
        grade = 'S';
        gameHorseName = '00000007';
      } else if (Number(horse.tokenId) === 8) {
        imagesrc = 'Hrs_00000008.png';
        grade = 'S';
        gameHorseName = '00000008';
      } else if (Number(horse.tokenId) === 9) {
        imagesrc = 'Hrs_00000009.png';
        grade = 'S';
        gameHorseName = '00000009';
      } else if (Number(horse.tokenId) === 10) {
        imagesrc = 'Hrs_00000010.png';
        grade = 'S';
        gameHorseName = '00000010';
      } else {
        //console.log('req.query.id', req.query.id);

        // A Grade
        if (Number(horse.tokenId) >= 11 && Number(horse.tokenId) <= 58) {
          var formattedNumber = Number(horse.tokenId) - 11 + '';
          while (formattedNumber.length < 3) {
            formattedNumber = '0' + formattedNumber;
          }

          imagesrc = 'Hrs_' + '00001' + formattedNumber + '.png';
          grade = 'A';

          gameHorseName = '00001' + formattedNumber;

          // B Grade
        } else if (
          Number(horse.tokenId) >= 59 &&
          Number(horse.tokenId) <= 299
        ) {
          var formattedNumber = Number(horse.tokenId) - 59 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }

          imagesrc = 'Hrs_' + '0002' + formattedNumber + '.png';
          grade = 'B';

          gameHorseName = '0002' + formattedNumber;

          // C Grade
        } else if (
          Number(horse.tokenId) >= 300 &&
          Number(horse.tokenId) <= 599
        ) {
          var formattedNumber = Number(horse.tokenId) - 300 + '';
          while (formattedNumber.length < 3) {
            formattedNumber = '0' + formattedNumber;
          }

          imagesrc = 'Hrs_' + '00100' + formattedNumber + '.png';
          grade = 'C';

          gameHorseName = '00100' + formattedNumber;
        } else if (
          Number(horse.tokenId) >= 600 &&
          Number(horse.tokenId) < 1000
        ) {
          var formattedNumber = Number(horse.tokenId) - 600 + '';
          while (formattedNumber.length < 3) {
            formattedNumber = '0' + formattedNumber;
          }

          imagesrc = 'Hrs_' + '00200' + formattedNumber + '.png';
          grade = 'D';

          gameHorseName = '00200' + formattedNumber;
        } else if (
          Number(horse.tokenId) >= 1000 &&
          Number(horse.tokenId) < 1800
        ) {
          var formattedNumber = Number(horse.tokenId) - 600 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }

          imagesrc = 'Hrs_' + '0020' + formattedNumber + '.png';
          grade = 'D';

          gameHorseName = '0020' + formattedNumber;
        } else if (
          Number(horse.tokenId) >= 1800 &&
          Number(horse.tokenId) < 1805
        ) {
          var formattedNumber = Number(horse.tokenId) - 1700 + '';

          while (formattedNumber.length < 5) {
            formattedNumber = '0' + formattedNumber;
          }

          imagesrc = 'Hrs_' + '000' + formattedNumber + '.png';
          grade = 'D';

          gameHorseName = '000' + formattedNumber;
        } else if (
          Number(horse.tokenId) >= 1805 &&
          Number(horse.tokenId) < 1810
        ) {
          var formattedNumber = Number(horse.tokenId) - 1700 + '';

          while (formattedNumber.length < 5) {
            formattedNumber = '0' + formattedNumber;
          }

          imagesrc = 'Hrs_' + '0000' + formattedNumber + '.png';
          grade = 'D';

          gameHorseName = '0000' + formattedNumber;
        } else if (
          Number(horse.tokenId) >= 1815 &&
          Number(horse.tokenId) < 1915
        ) {
          var formattedNumber = Number(horse.tokenId) - 1700 + '';

          while (formattedNumber.length < 3) {
            formattedNumber = '0' + formattedNumber;
          }

          imagesrc = 'Hrs_' + '00001' + formattedNumber + '.png';
          grade = 'D';

          gameHorseName = '00001' + formattedNumber;
        } else if (
          Number(horse.tokenId) >= 1915 &&
          Number(horse.tokenId) < 2115
        ) {
          var formattedNumber = Number(horse.tokenId) - 1915 + 241 + '';
          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }

          imagesrc = 'Hrs_' + '0002' + formattedNumber + '.png';
          grade = 'D';

          gameHorseName = '0002' + formattedNumber;
        } else if (
          Number(horse.tokenId) >= 2115 &&
          Number(horse.tokenId) < 2645
        ) {
          var formattedNumber = Number(horse.tokenId) - 1700 + '';
          while (formattedNumber.length < 3) {
            formattedNumber = '0' + formattedNumber;
          }

          imagesrc = 'Hrs_' + '00100' + formattedNumber + '.png';
          grade = 'D';

          gameHorseName = '00100' + formattedNumber;
        } else if (
          Number(horse.tokenId) >= 2645 &&
          Number(horse.tokenId) < 5000
        ) {
          var formattedNumber = Number(horse.tokenId) - 1000 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }

          imagesrc = 'Hrs_' + '0020' + formattedNumber + '.png';
          grade = 'D';

          gameHorseName = '0020' + formattedNumber;
        } else if (
          Number(horse.tokenId) >= 5000 &&
          Number(horse.tokenId) < 10000
        ) {
          var formattedNumber = Number(horse.tokenId) - 1000 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }

          imagesrc = 'Hrs_' + '0020' + formattedNumber + '.png';
          grade = 'D';

          gameHorseName = '0020' + formattedNumber;
        } else {
          ////gameHorseName = 'Hrs_00006000.png';
        }
      }

      const imageUrl = s3url + imagesrc;

      //console.log('gameHorseName', gameHorseName);

      const result1 = await fetch(
        `http://3.38.2.94:3001/api/horse?name=${gameHorseName}`
      );

      if (result1.status !== 200) {
        return;
      }

      const json1 = await result1.json();

      if (json1?.recordset?.length === 0) {
        return;
      }

      //console.log('data3.recordset[0]', data3?.recordset?.[0]);

      const liveHorseInfo = json1?.recordset?.[0] || {};

      const uid = liveHorseInfo?.HORSE_UID;

      //console.log('uid', uid);

      const result = await fetch(
        `http://3.38.2.94:3001/api/balanceByHorseUid?uid=${uid}`
      );

      if (result.status !== 200) {
        return;
      }

      const balanceData = await result.json();

      if (balanceData?.recordset?.length === 0) {
        return;
      }

      ///console.log('balanceData', JSON.stringify(balanceData, null, 2));

      const horseBalance = parseInt(balanceData?.recordset[0]?.Horse_balance);

      //console.log('tokenId=', horse.tokenId, 'gameHorseName=', gameHorseName, 'uid=', uid, 'balance=', horseBalance);

      //console.log('tokenId', horse.tokenId);
      //console.log('uid', uid);
      //console.log('balance', horseBalance);

      // update balance

      //if (horseBalance > 0) {

      // update balance of horse
      /*
      const result = await HorseModel.updateOne(
        { tokenId: horse.tokenId },
        {
          $set: {
            balance: horseBalance,
          },
        }
      );

      console.log('tokenId=', horse.tokenId, 'gameHorseName=', gameHorseName, 'uid=', uid, 'balance=', horseBalance, 'result=', result);

      /// { acknowledged: false }
      */

      const filter = { tokenId: horse.tokenId };

      const updateDoc = {
        $set: {
          balance: horseBalance,
        },
      };

      const options = { upsert: true };

      await HorseModel.updateOne(filter, updateDoc, options);

      /*
      const filter = { tokenId: horse.tokenId };

      const updateDoc = {
        $set: {
          balance: horseBalance,
        },
      };

      const options = { upsert: false };

      const data = await db
        .collection('nfthorses')
        .updateOne(filter, updateDoc, options);
      */

      /*
      const data = await db.collection('nfthorses').findOneAndUpdate(
        { tokenId: horse.tokenId },
        { $set: { balance: horseBalance } },
        { upsert: false }
      );
      */

      //console.log('data', data);

      //}

      /*
    let accumulatedBalance = 0;

    const result2 = await fetch(
      ////`http://3.38.2.94:3001/api/balanceByHorseUid?uid=${uid}`

      `http://3.38.2.94:3001/api/horse/allowance?uid=${uid}`
    );

    const json2 = await result2.json();

    
    json2?.recordset.forEach((element: any) => {
      if (element?.Payment_Status === 1) {
        //console.log('element?.Amount', element?.Amount);

        accumulatedBalance = accumulatedBalance + parseInt(element?.Amount);
      }
    });

    //console.log('tokenid', horse.tokenId);
    //console.log('uid', uid);
    //console.log('accumulatedBalance', accumulatedBalance);

    // update balance

    if (accumulatedBalance > 0) {
      const filter = { tokenId: horse.tokenId };

      const updateDoc = {
        $set: {
          accumulatedBalance: accumulatedBalance,
        },
      };

      const options = { upsert: true };

      await db.collection('nfthorses').updateOne(filter, updateDoc, options);
    }
    */
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
