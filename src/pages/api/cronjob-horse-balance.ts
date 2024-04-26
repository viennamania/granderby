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
  const client = await clientPromise;
  const collection = client.db('granderby').collection('nfthorses');

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

  //console.log('horses', horses);

  //return;

  horses.forEach(async (horse: any) => {
    //if (horse.tokenId !== '242') return;

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
          Number(horse.tokenId) < 3645
        ) {
          var formattedNumber = Number(horse.tokenId) - 2645 + 1645 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }

          formattedNumber = '0020' + formattedNumber;
          //formattedNumber = '00000000';

          ///console.log('horse-model formattedNumber', formattedNumber);

          gameHorseName = formattedNumber;

          imagesrc = 'Hrs_' + formattedNumber + '.png';

          grade = 'D';
        }

        // 3645 부터 3차 판매

        /*
        Grade U (5EA): tokenId: 3645, 3646, 3647, 3648, 3649  /  Hrs_99990005 - Hrs_99990010

        Grade S (14EA): tokenId: 3650 - 3663 / Hrs_00000016 - Hrs_00000029

        Grade A (100EA): tokenId: 3664 - 3763  / Hrs_00001215 - Hrs_00001314

        Grade B (350EA): tokenId: 3764 - 4113 / Hrs_00020441 - Hrs_00020790

        Grade C (976EA): tokenId: 4114 - 5089 / Hrs_00100945 - Hrs_00101920

        Grade D (1989EA): tokenId: 5090 - 7078 / Hrs_00202645 - Hrs_00204633

        */
        else if (Number(horse.tokenId) === 3645) {
          gameHorseName = '99990005';
          imagesrc = 'Hrs_99990005.png';
          grade = 'U';
        } else if (Number(horse.tokenId) === 3646) {
          gameHorseName = '99990006';
          imagesrc = 'Hrs_99990006.png';
          grade = 'U';
        } else if (Number(horse.tokenId) === 3647) {
          gameHorseName = '99990007';
          imagesrc = 'Hrs_99990007.png';
          grade = 'U';
        } else if (Number(horse.tokenId) === 3648) {
          gameHorseName = '99990008';
          imagesrc = 'Hrs_99990008.png';
          grade = 'U';
        } else if (Number(horse.tokenId) === 3649) {
          gameHorseName = '99990009';
          imagesrc = 'Hrs_99990009.png';
          grade = 'U';
        } else if (
          Number(horse.tokenId) >= 3650 &&
          Number(horse.tokenId) < 3664
        ) {
          var formattedNumber = Number(horse.tokenId) - 3650 + 16 + '';
          while (formattedNumber.length < 5) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '000' + formattedNumber;

          //console.log('formattedNumber', formattedNumber);

          gameHorseName = '' + formattedNumber + '';

          imagesrc = 'Hrs_' + formattedNumber + '.png';

          grade = 'S';
        } else if (
          Number(horse.tokenId) >= 3664 &&
          Number(horse.tokenId) < 3764
        ) {
          var formattedNumber = Number(horse.tokenId) - 3664 + 215 + '';
          while (formattedNumber.length < 3) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '00001' + formattedNumber;
          //formattedNumber = '00000000';

          //console.log('formattedNumber', formattedNumber);

          gameHorseName = '' + formattedNumber + '';

          imagesrc = 'Hrs_' + formattedNumber + '.png';

          grade = 'A';
        } else if (
          Number(horse.tokenId) >= 3764 &&
          Number(horse.tokenId) < 4114
        ) {
          var formattedNumber = Number(horse.tokenId) - 3764 + 441 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '0002' + formattedNumber;

          ///console.log('formattedNumber', formattedNumber);

          gameHorseName = '' + formattedNumber + '';

          imagesrc = 'Hrs_' + formattedNumber + '.png';

          grade = 'B';
        } else if (
          Number(horse.tokenId) >= 4114 &&
          Number(horse.tokenId) < 5090
        ) {
          var formattedNumber = Number(horse.tokenId) - 4114 + 945 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '0010' + formattedNumber;

          //console.log('formattedNumber', formattedNumber);

          gameHorseName = '' + formattedNumber + '';

          imagesrc = 'Hrs_' + formattedNumber + '.png';

          grade = 'C';
        } else if (
          Number(horse.tokenId) >= 5090 &&
          Number(horse.tokenId) < 7079
        ) {
          var formattedNumber = Number(horse.tokenId) - 5090 + 2645 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '0020' + formattedNumber;

          ///console.log('formattedNumber', formattedNumber);

          gameHorseName = '' + formattedNumber + '';

          imagesrc = 'Hrs_' + formattedNumber + '.png';

          grade = 'D';
        } else {
          ////imagesrc = 'Hrs_00006000.png';
        }
      }

      const imageUrl = s3url + imagesrc;

      //console.log('gameHorseName', gameHorseName);

      const result1 = await fetch(
        `http://3.38.2.94:3001/api/horse?name=${gameHorseName}`
      );

      //console.log('result1', result1);

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

      if (!uid) {
        return;
      }

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

      const horseBalance =
        parseInt(balanceData?.recordset[0]?.Horse_balance) || 0;

      //console.log('horseBalance', horseBalance);

      /*
      const data = await collection.updateOne(
        {
          tokenId: horse.tokenId,
        },
        {
          $set: {
            balance: horseBalance,
          },
        }
      );
      */

      await setHorseBalanceByTokenId(horse.tokenId, horseBalance);
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
