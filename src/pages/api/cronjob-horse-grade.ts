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
  setHorseGradeByTokenId,
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

    try {
      ///const uid = horse?.liveHorseInfo?.HORSE_UID;

      const s3url = 'https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/hrs/';

      let grade = '';

      let imagesrc = '';

      let gameHorseKey = '';

      if (Number(tokenId) === 0) {
        imagesrc = 'Hrs_00000000.png';
        grade = 'S';
        gameHorseKey = '00000000';
      } else if (Number(tokenId) === 1) {
        imagesrc = 'Hrs_00000001.png';
        grade = 'S';
        gameHorseKey = '00000001';
      } else if (Number(tokenId) === 2) {
        imagesrc = 'Hrs_00000002.png';
        grade = 'S';
        gameHorseKey = '00000002';
      } else if (Number(tokenId) === 3) {
        imagesrc = 'Hrs_00000003.png';
        grade = 'S';
        gameHorseKey = '00000003';
      } else if (Number(tokenId) === 4) {
        imagesrc = 'Hrs_00000004.png';
        grade = 'S';
        gameHorseKey = '00000004';
      } else if (Number(tokenId) === 5) {
        imagesrc = 'Hrs_00000005.png';
        grade = 'S';
        gameHorseKey = '00000005';
      } else if (Number(tokenId) === 6) {
        imagesrc = 'Hrs_00000006.png';
        grade = 'S';
        gameHorseKey = '00000006';
      } else if (Number(tokenId) === 7) {
        imagesrc = 'Hrs_00000007.png';
        grade = 'S';
        gameHorseKey = '00000007';
      } else if (Number(tokenId) === 8) {
        imagesrc = 'Hrs_00000008.png';
        grade = 'S';
        gameHorseKey = '00000008';
      } else if (Number(tokenId) === 9) {
        imagesrc = 'Hrs_00000009.png';
        grade = 'S';
        gameHorseKey = '00000009';
      } else if (Number(tokenId) === 10) {
        imagesrc = 'Hrs_00000010.png';
        grade = 'S';
        gameHorseKey = '00000010';
      } else {
        //console.log('req.query.id', req.query.id);

        // A Grade
        if (Number(tokenId) >= 11 && Number(tokenId) <= 58) {
          var formattedNumber = Number(tokenId) - 11 + '';
          while (formattedNumber.length < 3) {
            formattedNumber = '0' + formattedNumber;
          }

          formattedNumber = '00001' + formattedNumber;
          gameHorseKey = formattedNumber;
          imagesrc = 'Hrs_' + formattedNumber + '.png';
          grade = 'A';

          // B Grade
        } else if (Number(tokenId) >= 59 && Number(tokenId) <= 299) {
          var formattedNumber = Number(tokenId) - 59 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }

          formattedNumber = '0002' + formattedNumber;
          gameHorseKey = formattedNumber;

          imagesrc = 'Hrs_' + formattedNumber + '.png';
          grade = 'B';

          // C Grade
        } else if (Number(tokenId) >= 300 && Number(tokenId) <= 599) {
          var formattedNumber = Number(tokenId) - 300 + '';
          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '0010' + formattedNumber;
          gameHorseKey = formattedNumber;
          imagesrc = 'Hrs_' + formattedNumber + '.png';
          grade = 'C';

          // D Grade
        } else if (Number(tokenId) >= 600 && Number(tokenId) < 1000) {
          var formattedNumber = Number(tokenId) - 600 + '';
          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }

          formattedNumber = '0020' + formattedNumber;
          gameHorseKey = formattedNumber;
          imagesrc = 'Hrs_' + formattedNumber + '.png';
          grade = 'D';

          // D Grade
        } else if (Number(tokenId) >= 1000 && Number(tokenId) < 1800) {
          var formattedNumber = Number(tokenId) - 600 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '0020' + formattedNumber;
          gameHorseKey = formattedNumber;

          imagesrc = 'Hrs_' + formattedNumber + '.png';
          grade = 'D';

          // U Grade
        } else if (Number(tokenId) >= 1800 && Number(tokenId) < 1805) {
          // 1800 => 99990000
          // 1801 => 99990001
          // 1802 => 99990002
          // 1803 => 99990003
          // 1804 => 99990004

          var formattedNumber = Number(tokenId) - 1800 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '9999' + formattedNumber;
          gameHorseKey = formattedNumber;

          imagesrc = 'Hrs_' + formattedNumber + '.png';
          grade = 'U';

          // S Grade
        } else if (Number(tokenId) >= 1805 && Number(tokenId) < 1810) {
          // 1805 => 00000011
          // 1806 => 00000012
          // 1807 => 00000013
          // 1808 => 00000014
          // 1809 => 00000015

          var formattedNumber = Number(tokenId) - 1805 + 11 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '0000' + formattedNumber;
          gameHorseKey = formattedNumber;
          imagesrc = 'Hrs_' + formattedNumber + '.png';
          grade = 'S';

          // D Grade
        } else if (Number(tokenId) >= 1810 && Number(tokenId) < 1815) {
          // 1810 => 00201200
          // 1811 => 00201201
          // 1812 => 00201202
          // 1813 => 00201203
          // 1814 => 00201204

          var formattedNumber = Number(tokenId) - 1810 + 1200 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '0020' + formattedNumber;
          gameHorseKey = formattedNumber;
          imagesrc = 'Hrs_' + formattedNumber + '.png';
          grade = 'D';

          // A Grade
        } else if (Number(tokenId) >= 1815 && Number(tokenId) < 1915) {
          // 1815 => 00001115
          // 1816 => 00001116

          var formattedNumber = Number(tokenId) - 1815 + 1115 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '0000' + formattedNumber;
          gameHorseKey = formattedNumber;

          imagesrc = 'Hrs_' + formattedNumber + '.png';
          grade = 'A';

          // B Grade
        } else if (Number(tokenId) >= 1915 && Number(tokenId) < 2115) {
          // 1915 => 00020241
          // 1916 => 00020242
          var formattedNumber = Number(tokenId) - 1915 + 241 + '';
          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }

          formattedNumber = '0002' + formattedNumber;
          gameHorseKey = formattedNumber;
          imagesrc = 'Hrs_' + formattedNumber + '.png';
          grade = 'B';

          // C Grade
        } else if (Number(tokenId) >= 2115 && Number(tokenId) < 2645) {
          // 토큰번호 2115번부터 텍스쳐번호 00100300번 부터 다시 부여하면 됩니다.
          // 2115 => 00100300
          // 2116 => 00100301
          // 2117 => 00100302

          var formattedNumber = Number(tokenId) - 2115 + 300 + '';
          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }

          formattedNumber = '0010' + formattedNumber;
          gameHorseKey = formattedNumber;
          imagesrc = 'Hrs_' + '0010' + formattedNumber + '.png';
          grade = 'C';

          // D Grade
        } else if (Number(tokenId) >= 2645 && Number(tokenId) < 3645) {
          // 2645 => 00201645
          // 2646 => 00201646

          var formattedNumber = Number(tokenId) - 2645 + 1645 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }

          formattedNumber = '0020' + formattedNumber;
          gameHorseKey = formattedNumber;
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
        else if (Number(tokenId) === 3645) {
          gameHorseKey = '99990005';
          imagesrc = 'Hrs_99990005.png';
          grade = 'U';
        } else if (Number(tokenId) === 3646) {
          gameHorseKey = '99990006';
          imagesrc = 'Hrs_99990006.png';
          grade = 'U';
        } else if (Number(tokenId) === 3647) {
          gameHorseKey = '99990007';
          imagesrc = 'Hrs_99990007.png';
          grade = 'U';
        } else if (Number(tokenId) === 3648) {
          gameHorseKey = '99990008';
          imagesrc = 'Hrs_99990008.png';
          grade = 'U';
        } else if (Number(tokenId) === 3649) {
          gameHorseKey = '99990009';
          imagesrc = 'Hrs_99990009.png';
          grade = 'U';
        } else if (Number(tokenId) >= 3650 && Number(tokenId) < 3664) {
          var formattedNumber = Number(tokenId) - 3650 + 16 + '';
          while (formattedNumber.length < 5) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '000' + formattedNumber;

          //console.log('formattedNumber', formattedNumber);

          gameHorseKey = '' + formattedNumber + '';

          imagesrc = 'Hrs_' + formattedNumber + '.png';

          grade = 'S';
        } else if (Number(tokenId) >= 3664 && Number(tokenId) < 3764) {
          var formattedNumber = Number(tokenId) - 3664 + 215 + '';
          while (formattedNumber.length < 3) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '00001' + formattedNumber;
          //formattedNumber = '00000000';

          //console.log('formattedNumber', formattedNumber);

          gameHorseKey = '' + formattedNumber + '';

          imagesrc = 'Hrs_' + formattedNumber + '.png';

          grade = 'A';
        } else if (Number(tokenId) >= 3764 && Number(tokenId) < 4114) {
          var formattedNumber = Number(tokenId) - 3764 + 441 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '0002' + formattedNumber;

          ///console.log('formattedNumber', formattedNumber);

          gameHorseKey = '' + formattedNumber + '';

          imagesrc = 'Hrs_' + formattedNumber + '.png';

          grade = 'B';
        } else if (Number(tokenId) >= 4114 && Number(tokenId) < 5090) {
          var formattedNumber = Number(tokenId) - 4114 + 945 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '0010' + formattedNumber;

          //console.log('formattedNumber', formattedNumber);

          gameHorseKey = '' + formattedNumber + '';

          imagesrc = 'Hrs_' + formattedNumber + '.png';

          grade = 'C';
        } else if (Number(tokenId) >= 5090 && Number(tokenId) < 7079) {
          var formattedNumber = Number(tokenId) - 5090 + 2645 + '';

          while (formattedNumber.length < 4) {
            formattedNumber = '0' + formattedNumber;
          }
          formattedNumber = '0020' + formattedNumber;

          ///console.log('formattedNumber', formattedNumber);

          gameHorseKey = '' + formattedNumber + '';

          imagesrc = 'Hrs_' + formattedNumber + '.png';

          grade = 'D';
        } else {
          ////imagesrc = 'Hrs_00006000.png';
        }
      }

      const imageUrl = s3url + imagesrc;

      //console.log('gameHorseKey', gameHorseKey);

      //let horseUid = '';
      /*
      try {

        const result = await fetch(
          `http://3.38.2.94:3001/api/horse?name=${gameHorseKey}`
        );

        //console.log('result1', result1);

        
        if (result.status === 200) {
          const json = await result.json();
          horseUid = json?.recordset?.[0]?.HORSE_UID;
        }

      } catch (error) {
        console.log('error', error);
      }
      */

      // fetch horseUid from game server and update it

      fetch(`http://3.38.2.94:3001/api/horse?name=${gameHorseKey}`)
        .then((res) => res.json())
        .then((json) => {
          const horseUid = json?.recordset?.[0]?.HORSE_UID;

          if (!horseUid) {
            console.log(
              'tokenId',
              tokenId,
              'gameHorseKey',
              gameHorseKey,
              'horseUid not found'
            );

            return;
          }

          setHorseGradeByTokenId(tokenId, grade, gameHorseKey, horseUid);
        });

      //await setHorseGradeByTokenId(tokenId, grade, gameHorseKey, horseUid);
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
