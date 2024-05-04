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

import clientPromise from '@/lib/mongodb';

//import { IHorseHistory } from '@/utils/horseRace/interfaces/horseHistory';

import { IHorse } from '../interfaces/horse-interface';

import { Schema, models, model } from 'mongoose';

/////////import { connectMongo } from '@/utils/services/database';
/////////connectMongo();

import dbConnect from '@/lib/db/dbConnect';
import { toInteger } from 'lodash';
import { tokenContractAddressCARROTDrop } from '@/config/contractAddresses';
import { parse } from 'path';
import { el } from 'date-fns/locale';

dbConnect();

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
  balance: {
    type: Number,
    required: false,
    default: 0,
  },
});

/*
export interface IHorse {
  save(): unknown;
  _id: string;
  tokenId: string;
  contract: string;
  nft: object;
  holder: string;
  paidToken: string;
  totalPricePaid: string;
  logsNewSale: object;
}
*/

export const HorseModel =
  models.nfthorse || model<IHorse>('nfthorse', HorseSchema);

const GameHorseKeySchema = new Schema({
  name: {
    type: String,
    required: true,
    default: false,
  },
});

export const GameHorseKeyModel =
  models.game_horsekey || model('game_horsekey', GameHorseKeySchema);

export const getAllHorses = async (
  q: string = '',
  pageNumber: number,
  pagination: number,
  grades: string,
  manes: string,
  holder: string,
  sort: string
) => {
  //console.log('getAllHorses pageNumber', pageNumber);
  //console.log('getAllHorses pagination', pagination);

  console.log('getAllHorses grades', grades);

  //console.log('getAllHorses manes', manes);

  //console.log('getAllHorses sort', sort);

  console.log('getAllHorses holder', holder);

  if (holder) {
    // sort number in ascending order, tokenId is string field, so conver tokenId to number and sort

    const data = await HorseModel.aggregate(
      [
        {
          $match: {
            holder: holder.toLowerCase(),

            /*
            'nft.rawMetadata.attributes': {
              $elemMatch: {
                trait_type: 'Grade',
                //value: grades,
                value: { $in: grades },
              },
            },
            */

            grade: { $in: grades },
          },
        },
        {
          $sort: {
            tokenId: 1,

            ///$parse: { tokenId: 'int' },

            // sort number in ascending order, tokenId is string field, so conver tokenId to number and sort
          },
        },
        {
          $skip: (pageNumber - 1) * pagination,
        },
        {
          $limit: pagination,
        },
      ],
      {
        collation: { locale: 'en_US', numericOrdering: true },
      }
    );

    /*
      const response = await fetch('/api/nft/getBalanceByTokenId', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tokenId: tokenid.tokenid,
      }),
    });
    const data = await response.json();

    console.log('getBalanceByTokenId data=======', data);

    setGameHorseAccumulatedBalance(data?.accumulatedBalance || 0);
    */

    //console.log('data', data);

    ///  total count search by holder and grades
    const totalData = await HorseModel.find({
      holder: holder.toLowerCase(),
      /*
      'nft.rawMetadata.attributes': {
        $elemMatch: {
          trait_type: 'Grade',
          //value: grades,
          value: { $in: grades },
        },
      },
      */
      grade: { $in: grades },
    }).countDocuments();

    if (data?.length === 0) {
      return { nfts: [], pageNumber: null };
    }

    return { nfts: data, pageNumber: pageNumber + 1, total: totalData };
  }

  // nft.media[0].raw
  // https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/hrs/Hrs_00020023.png
  // subtract 00020023 from url

  if (grades.length === 0) {
    const data = await HorseModel.aggregate(
      [
        {
          $match: {
            // search nft.title by q

            $or: [
              { 'nft.title': { $regex: q, $options: 'i' } },
              //{ 'nft.description': { $regex: q, $options: 'i' } },
            ],
          },
        },
        {
          $sort:
            sort === 'Token ID: Ascending'
              ? {
                  // sort number in ascending order, tokenId is string, so conver tokenId to number and sort

                  tokenId: 1,
                }
              : sort === 'Token ID: Descending'
              ? {
                  // sort number in descending order, tokenId is string, so conver tokenId to number and sort

                  tokenId: -1,
                }
              : sort === 'Price: Ascending'
              ? {
                  // sort number in ascending order, tokenId is string, so conver tokenId to number and sort

                  totalPricePaid: 1,
                }
              : sort === 'Price: Descending'
              ? {
                  // sort number in descending order, tokenId is string, so conver tokenId to number and sort

                  totalPricePaid: -1,
                }
              : {
                  // sort number in descending order, tokenId is string, so conver tokenId to number and sort

                  tokenId: -1,
                },
        },
        {
          $skip: (pageNumber - 1) * pagination,
        },
        {
          $limit: pagination,
        },
      ],
      {
        collation: { locale: 'en_US', numericOrdering: true },
      }
    );

    return { nfts: data, pageNumber: pageNumber + 1 };
  }

  /*
  const totalData = await HorseModel.find({
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

  const total = totalData?.length;
  */
  // total is number of Records we want to display

  const total = await HorseModel.find({
    'nft.rawMetadata.attributes': {
      $elemMatch: {
        trait_type: 'Grade',
        //value: grades,
        value: { $in: grades },
      },
    },
  }).countDocuments();

  /*
  const data = await HorseModel
    .find({
      'nft.rawMetadata.attributes': {
        $elemMatch: {

          trait_type: 'Grade',
          //value: grades,
          value: { $in: grades },
        },
      },
    })

    .find({
      $or: [
        { 'nft.title': { $regex: q, $options: 'i' } },
        //{ 'nft.description': { $regex: q, $options: 'i' } },
      ],
    })

    .sort(
      sort === 'Token ID: Ascending'
        ? {
            // sort number in ascending order, tokenId is string, so conver tokenId to number and sort

            tokenId: 1,
          }
        : sort === 'Token ID: Descending'
        ? {
            // sort number in descending order, tokenId is string, so conver tokenId to number and sort

            tokenId: -1,
          }
        : sort === 'Price: Ascending'
        ? {
            // sort number in ascending order, tokenId is string, so conver tokenId to number and sort

            totalPricePaid: 1,
          }
        : sort === 'Price: Descending'
        ? {
            // sort number in descending order, tokenId is string, so conver tokenId to number and sort

            totalPricePaid: -1,
          }
        : {
            // sort number in descending order, tokenId is string, so conver tokenId to number and sort

            tokenId: -1,
          }
    )

    //.collation({ locale: 'en_US', numericOrdering: true })

    // sort number in descending order

    //.sort(function (a, b) {return b.tokenId - a.tokenId;})

    .skip((pageNumber - 1) * pagination)
    //limit is number of Records we want to display
    .limit(pagination)

    .catch((err) => {
      ////return err;
    });
    */

  const data = await HorseModel.aggregate(
    [
      {
        $match: {
          // search nft.title by q

          $or: [
            { 'nft.title': { $regex: q, $options: 'i' } },
            //{ 'nft.description': { $regex: q, $options: 'i' } },
          ],
          'nft.rawMetadata.attributes': {
            $elemMatch: {
              trait_type: 'Grade',
              //value: grades,
              value: { $in: grades },
            },
          },
        },
      },
      {
        $sort:
          sort === 'Token ID: Ascending'
            ? {
                // sort number in ascending order, tokenId is string, so conver tokenId to number and sort

                tokenId: 1,
              }
            : sort === 'Token ID: Descending'
            ? {
                // sort number in descending order, tokenId is string, so conver tokenId to number and sort

                tokenId: -1,
              }
            : sort === 'Price: Ascending'
            ? {
                // sort number in ascending order, tokenId is string, so conver tokenId to number and sort

                totalPricePaid: 1,
              }
            : sort === 'Price: Descending'
            ? {
                // sort number in descending order, tokenId is string, so conver tokenId to number and sort

                totalPricePaid: -1,
              }
            : {
                // sort number in descending order, tokenId is string, so conver tokenId to number and sort

                tokenId: -1,
              },
      },
      {
        $skip: (pageNumber - 1) * pagination,
      },
      {
        $limit: pagination,
      },
    ],
    {
      collation: { locale: 'en_US', numericOrdering: true },
    }
  );

  ///console.log('data', data);
  console.log('data.length', data?.length);
  console.log('pageNumber', pageNumber);

  if (data?.length === 0) {
    return { nfts: [], pageNumber: null };
  }

  return { nfts: data, pageNumber: pageNumber + 1, total: total };
};

export const getAllHorsesCount = async (
  grades: string,
  manes: string,
  holder: string
) => {
  console.log('getAllHorsesCount holder', holder);

  if (holder) {
    const data = await HorseModel.find({
      holder: holder.toLowerCase(),
    })
      .countDocuments()
      .catch((err) => {
        ////return err;
      });

    //return { total: data?.length };

    /*
    // sum of totalPricePaid
    const data2 = await HorseModel.aggregate([
      {
        $match: {
          holder: holder.toLowerCase(),
        },
      },
      {
        $group: {
          
          //_id: null,

          _id: null,

          total: { $sum: 'totalPricePaid' },
        },
      },
    ]);

    console.log('data2', data2);

    return { total: data, totalPricePaid: data2[0].total };
    */

    const data2 = await HorseModel.find({
      holder: holder.toLowerCase(),
    }).catch((err) => {
      ////return err;
    });

    let totalPricePaid = 0;
    data2?.forEach((element) => {
      //totalPricePaid += parseInt(element.totalPricePaid);

      if (element.paidToken === '0x0000000000000000000000000000000000001010') {
        // MATIC

        totalPricePaid =
          totalPricePaid + (element.totalPricePaid / 1000000000000000000) * 0.5;
      } else if (
        element.paidToken === '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
      ) {
        // USDC

        totalPricePaid = totalPricePaid + element.totalPricePaid / 1000000;
      }
    });

    console.log('totalPricePaid', totalPricePaid);

    return { total: data, totalPricePaid: totalPricePaid };
  }

  if (grades.length === 0) {
    const data = await HorseModel.find({})
      .countDocuments()
      .catch((err) => {
        ////return err;
      });

    return { total: data };
  }

  const data = await HorseModel.find({
    'nft.rawMetadata.attributes': {
      $elemMatch: {
        /*
                    "closed": false,
            "$or": [
                {
                    "openingEvening": { "$lte": currentTime  },
                    "closingEvening": { "$gte": currentTime  }
                },
                {
                    "openingMorning": { "$lte": currentTime },
                    "closingMorning": { "$gte": currentTime  }
                }

            ]
            */

        /*
        $and: [
          {
            trait_type: 'Grade',
            //value: grades,
            value: { $in: grades },
          },
          
          {
            trait_type: 'Mane',
            value: { $in: manes },
          }
          
        ]
        */

        trait_type: 'Grade',
        //value: grades,
        value: { $in: grades },
      },
    },
  })
    .countDocuments()
    .catch((err) => {
      ////return err;
    });

  return { total: data };
};

export const getRegisteredHorses = async (
  pageNumber: number,
  pagination: number,
  grades: string,
  manes: string,
  sort: string,
  register: string
) => {
  if (grades.length === 0) {
    const data = await HorseModel.find({
      register: register,
    })

      .sort({ tokenId: 1 })

      .skip((pageNumber - 1) * pagination)
      //limit is number of Records we want to display
      .limit(pagination)
      /*
      .then(data => {
  
        return {'nfts' : data, 'pageNumber' : (pageNumber + 1) };
  
      })
      */
      .catch((err) => {
        ////return err;
      });

    return { nfts: data, pageNumber: pageNumber + 1 };
  }

  const data = await HorseModel.find({
    'nft.rawMetadata.attributes': {
      $elemMatch: {
        /*
                    "closed": false,
            "$or": [
                {
                    "openingEvening": { "$lte": currentTime  },
                    "closingEvening": { "$gte": currentTime  }
                },
                {
                    "openingMorning": { "$lte": currentTime },
                    "closingMorning": { "$gte": currentTime  }
                }

            ]
            */

        /*
        $and: [
          {
            trait_type: 'Grade',
            //value: grades,
            value: { $in: grades },
          },
          
          {
            trait_type: 'Mane',
            value: { $in: manes },
          }
          
        ]
        */

        trait_type: 'Grade',
        //value: grades,
        value: { $in: grades },
      },
    },
  })
    .sort({ tokenId: 1 })
    .collation({ locale: 'en_US', numericOrdering: true })

    // sort number in descending order

    //.sort(function (a, b) {return b.tokenId - a.tokenId;})

    .skip((pageNumber - 1) * pagination)
    //limit is number of Records we want to display
    .limit(pagination)
    /*
    .then(data => {

      return {'nfts' : data, 'pageNumber' : (pageNumber + 1) };

    })
    */
    .catch((err) => {
      ////return err;
    });

  if (data?.length === 0) {
    return { nfts: [], pageNumber: null };
  }

  return { nfts: data, pageNumber: pageNumber + 1 };
};

/* get one horse */
export const getOneHorse = async (tokenId: string) => {
  console.log('getOneHorse tokenId===', tokenId);

  const data = await HorseModel.findOne({
    tokenId: tokenId,
  }).catch((err) => {
    ////return err;
  });

  ///console.log('getOneHorse data', data);

  const s3url = 'https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/hrs/';

  let grade = '';

  let imagesrc = '';

  let gameHorseKey = '';

  // S Grade
  if (Number(tokenId) === 0) {
    gameHorseKey = '00000000';
    imagesrc = 'Hrs_00000000.png';
  } else if (Number(tokenId) === 1) {
    gameHorseKey = '00000001';
    imagesrc = 'Hrs_00000001.png';
  } else if (Number(tokenId) === 2) {
    gameHorseKey = '00000002';
    imagesrc = 'Hrs_00000002.png';
  } else if (Number(tokenId) === 3) {
    gameHorseKey = '00000003';
    imagesrc = 'Hrs_00000003.png';
  } else if (Number(tokenId) === 4) {
    gameHorseKey = '00000004';
    imagesrc = 'Hrs_00000004.png';
  } else if (Number(tokenId) === 5) {
    gameHorseKey = '00000005';
    imagesrc = 'Hrs_00000005.png';
  } else if (Number(tokenId) === 6) {
    gameHorseKey = '00000006';
    imagesrc = 'Hrs_00000006.png';
  } else if (Number(tokenId) === 7) {
    gameHorseKey = '00000007';
    imagesrc = 'Hrs_00000007.png';
  } else if (Number(tokenId) === 8) {
    gameHorseKey = '00000008';
    imagesrc = 'Hrs_00000008.png';
  } else if (Number(tokenId) === 9) {
    gameHorseKey = '00000009';
    imagesrc = 'Hrs_00000009.png';
  } else if (Number(tokenId) === 10) {
    gameHorseKey = '00000010';
    imagesrc = 'Hrs_00000010.png';

    // A Grade
  } else if (Number(tokenId) >= 11 && Number(tokenId) <= 58) {
    console.log('A Grade tokenId', tokenId);

    var formattedNumber = Number(tokenId) - 11 + '';
    while (formattedNumber.length < 3) {
      formattedNumber = '0' + formattedNumber;
    }
    formattedNumber = '00001' + formattedNumber;

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';

    // B Grade
  } else if (Number(tokenId) >= 59 && Number(tokenId) <= 299) {
    //console.log('B Grade tokenId', tokenId);

    //const filename = util.format("%08d", Number(tokenId));

    //const formattedNumber = ("0000600" + Number(tokenId)).slice(-8);

    //Number(tokenId).padStart(2, "0");

    //gameHorseKey = '00006000';

    var formattedNumber = Number(tokenId) - 59 + '';

    while (formattedNumber.length < 4) {
      formattedNumber = '0' + formattedNumber;
    }
    formattedNumber = '0002' + formattedNumber;

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';
  }

  // C Grade
  else if (Number(tokenId) >= 300 && Number(tokenId) <= 599) {
    var formattedNumber = Number(tokenId) - 300 + '';

    while (formattedNumber.length < 3) {
      formattedNumber = '0' + formattedNumber;
    }

    formattedNumber = '00100' + formattedNumber;

    console.log('formattedNumber', formattedNumber);

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';
  } else if (Number(tokenId) >= 600 && Number(tokenId) < 1000) {
    var formattedNumber = Number(tokenId) - 600 + '';

    while (formattedNumber.length < 3) {
      formattedNumber = '0' + formattedNumber;
    }

    formattedNumber = '00200' + formattedNumber;

    console.log('formattedNumber', formattedNumber);

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';
  } else if (Number(tokenId) >= 1000 && Number(tokenId) < 1800) {
    var formattedNumber = Number(tokenId) - 600 + '';

    while (formattedNumber.length < 4) {
      formattedNumber = '0' + formattedNumber;
    }

    formattedNumber = '0020' + formattedNumber;

    console.log('formattedNumber', formattedNumber);

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';
  } else if (Number(tokenId) >= 1800 && Number(tokenId) < 1805) {
    var formattedNumber = Number(tokenId) - 1700 + '';

    while (formattedNumber.length < 5) {
      formattedNumber = '0' + formattedNumber;
    }

    formattedNumber = '000' + formattedNumber;
    //formattedNumber = '00000000';

    console.log('formattedNumber', formattedNumber);

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';
  } else if (Number(tokenId) >= 1805 && Number(tokenId) < 1810) {
    var formattedNumber = Number(tokenId) - 1700 + '';

    while (formattedNumber.length < 5) {
      formattedNumber = '0' + formattedNumber;
    }

    formattedNumber = '0000' + formattedNumber;
    //formattedNumber = '00000000';

    console.log('formattedNumber', formattedNumber);

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';
  } else if (Number(tokenId) >= 1815 && Number(tokenId) < 1915) {
    var formattedNumber = Number(tokenId) - 1700 + '';

    while (formattedNumber.length < 3) {
      formattedNumber = '0' + formattedNumber;
    }

    formattedNumber = '00001' + formattedNumber;
    //formattedNumber = '00000000';

    console.log('formattedNumber', formattedNumber);

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';
  } else if (Number(tokenId) >= 1915 && Number(tokenId) < 2115) {
    //var formattedNumber = Number(tokenId) - 1800 + 59 + '';

    var formattedNumber = Number(tokenId) - 1915 + 241 + '';

    while (formattedNumber.length < 4) {
      formattedNumber = '0' + formattedNumber;
    }
    formattedNumber = '0002' + formattedNumber;

    console.log('formattedNumber', formattedNumber);

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';
  } else if (Number(tokenId) >= 2115 && Number(tokenId) < 2645) {
    //var formattedNumber = Number(tokenId) - 2000 + '';
    var formattedNumber = Number(tokenId) - 1700 + '';

    while (formattedNumber.length < 3) {
      formattedNumber = '0' + formattedNumber;
    }

    formattedNumber = '00100' + formattedNumber;

    console.log('formattedNumber', formattedNumber);

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';
  } else if (Number(tokenId) >= 2645 && Number(tokenId) < 3645) {
    var formattedNumber = Number(tokenId) - 2645 + 1645 + '';

    while (formattedNumber.length < 4) {
      formattedNumber = '0' + formattedNumber;
    }

    formattedNumber = '0020' + formattedNumber;
    //formattedNumber = '00000000';

    console.log('horse-model formattedNumber', formattedNumber);

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';
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
  } else if (Number(tokenId) === 3646) {
    gameHorseKey = '99990006';
    imagesrc = 'Hrs_99990006.png';
  } else if (Number(tokenId) === 3647) {
    gameHorseKey = '99990007';
    imagesrc = 'Hrs_99990007.png';
  } else if (Number(tokenId) === 3648) {
    gameHorseKey = '99990008';
    imagesrc = 'Hrs_99990008.png';
  } else if (Number(tokenId) === 3649) {
    gameHorseKey = '99990009';
    imagesrc = 'Hrs_99990009.png';
  } else if (Number(tokenId) >= 3650 && Number(tokenId) < 3664) {
    var formattedNumber = Number(tokenId) - 3650 + 16 + '';
    while (formattedNumber.length < 5) {
      formattedNumber = '0' + formattedNumber;
    }
    formattedNumber = '000' + formattedNumber;

    console.log('formattedNumber', formattedNumber);

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';
  } else if (Number(tokenId) >= 3664 && Number(tokenId) < 3764) {
    var formattedNumber = Number(tokenId) - 3664 + 215 + '';
    while (formattedNumber.length < 3) {
      formattedNumber = '0' + formattedNumber;
    }
    formattedNumber = '00001' + formattedNumber;
    //formattedNumber = '00000000';

    console.log('formattedNumber', formattedNumber);

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';
  } else if (Number(tokenId) >= 3764 && Number(tokenId) < 4114) {
    var formattedNumber = Number(tokenId) - 3764 + 441 + '';

    while (formattedNumber.length < 4) {
      formattedNumber = '0' + formattedNumber;
    }
    formattedNumber = '0002' + formattedNumber;

    console.log('formattedNumber', formattedNumber);

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';
  } else if (Number(tokenId) >= 4114 && Number(tokenId) < 5090) {
    var formattedNumber = Number(tokenId) - 4114 + 945 + '';

    while (formattedNumber.length < 4) {
      formattedNumber = '0' + formattedNumber;
    }
    formattedNumber = '0010' + formattedNumber;

    console.log('formattedNumber', formattedNumber);

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';
  } else if (Number(tokenId) >= 5090 && Number(tokenId) < 7079) {
    var formattedNumber = Number(tokenId) - 5090 + 2645 + '';

    while (formattedNumber.length < 4) {
      formattedNumber = '0' + formattedNumber;
    }
    formattedNumber = '0020' + formattedNumber;

    console.log('formattedNumber', formattedNumber);

    gameHorseKey = '' + formattedNumber + '';

    imagesrc = 'Hrs_' + formattedNumber + '.png';
  } else {
    ////imagesrc = 'Hrs_00006000.png';
  }

  const imagesrcUrl = s3url + imagesrc;

  // select horseinfo from game_horsekey collection when name is gameHorseKey

  // game_horsekey collection is not created yet

  //console.log('gameHorseKey', gameHorseKey);

  const name = '#' + gameHorseKey;

  const data2 = await GameHorseKeyModel.findOne({
    name: name,
  }).catch((err) => {
    ////return err;
  });

  //console.log('data2', data2);

  const json = await data2?.toJSON();

  /*
    gameHorse {
      _id: new ObjectId("65c059da41577a794571d2af"),
      name: '#00200402',
      description: 'Granderby NFT Horses\n' +
        'Enjoy amazing horse racing game.\n' +
        'STADIUM - Jockey Club',
      image: 'https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/hrs/Hrs_00200402.png',
      animation_url: '',
      external_url: 'https://thirdweb.com',
      background_color: '',
      youtube_url: '',
      BODY_PATTERN: 'Nebula',
      HEAD_PATTERN: 'Nebula',
      LEG_PATTERN: 'Long Boots',
      MANE: 'Sporty',
      MANE_PATTERN: 'None',
      TAIL: 'Brush',
      TAIL_PATTERN: 'Gradation',
      LEG_HAIR: 'None',
      LEG_HAIR_PATTERN: 'Long Boots',
      WING: 'None',
      HORN: 'None',
      COLOR_SET_NO: 484,
      AGE: '',
      OVERALL: '',
      FRONT: '',
      STRETCH: '',
      WEIGHT: '',
      RUNTYPE: ''
    }
  */

  let gameHorseDescription = [] as any;

  let gameHorseInfo = [] as any;

  /*
        AGE: '',
      OVERALL: '',
      FRONT: '',
      STRETCH: '',
      WEIGHT: '',
      RUNTYPE: ''
      */
  let gameHorseStatus = [] as any;

  if (json) {
    //return { success: false, message: 'horse not found' };

    gameHorseDescription.push({
      trait_type: 'name',
      value: json.name,
    });

    gameHorseDescription.push({
      trait_type: 'description',
      value: json.description,
    });

    gameHorseInfo.push({
      trait_type: 'BODY PATTERN',
      value: json.BODY_PATTERN,
    });

    gameHorseInfo.push({
      trait_type: 'HEAD PATTERN',
      value: json.HEAD_PATTERN,
    });

    gameHorseInfo.push({
      trait_type: 'LEG PATTERN',
      value: json.LEG_PATTERN,
    });

    gameHorseInfo.push({
      trait_type: 'MANE',
      value: json.MANE,
    });

    gameHorseInfo.push({
      trait_type: 'MANE PATTERN',
      value: json.MANE_PATTERN,
    });

    gameHorseInfo.push({
      trait_type: 'TAIL',
      value: json.TAIL,
    });

    gameHorseInfo.push({
      trait_type: 'TAIL PATTERN',
      value: json.TAIL_PATTERN,
    });

    gameHorseInfo.push({
      trait_type: 'LEG HAIR',
      value: json.LEG_HAIR,
    });

    gameHorseInfo.push({
      trait_type: 'LEG HAIR PATTERN',
      value: json.LEG_HAIR_PATTERN,
    });

    gameHorseInfo.push({
      trait_type: 'WING',
      value: json.WING,
    });

    gameHorseInfo.push({
      trait_type: 'HORN',
      value: json.HORN,
    });

    gameHorseInfo.push({
      trait_type: 'COLOR SET NO.',
      value: json.COLOR_SET_NO,
    });

    gameHorseStatus.push({
      trait_type: 'AGE',
      value: json.AGE,
    });

    gameHorseStatus.push({
      trait_type: 'OVERALL',
      value: json.OVERALL,
    });

    gameHorseStatus.push({
      trait_type: 'FRONT',
      value: json.FRONT,
    });

    gameHorseStatus.push({
      trait_type: 'STRETCH',
      value: json.STRETCH,
    });

    gameHorseStatus.push({
      trait_type: 'WEIGHT',
      value: json.WEIGHT,
    });

    gameHorseStatus.push({
      trait_type: 'RUNTYPE',
      value: json.RUNTYPE,
    });

    // http://3.38.2.94:3001/api/horse?name=00100242
  }

  console.log('gameHorseKey', gameHorseKey);

  const response = await fetch(
    `http://3.38.2.94:3001/api/horse?name=${gameHorseKey}`
  );

  const data3 = await response.json();

  //console.log('data3.recordset[0]', data3?.recordset?.[0]);

  const liveHorseInfo = data3?.recordset?.[0] || {};

  const horse = {
    ...data?._doc,
    gameHorseDescription: gameHorseDescription,
    gameHorseInfo: gameHorseInfo,
    gameHorseStatus: gameHorseStatus,
    liveHorseInfo: liveHorseInfo,
    image: imagesrcUrl,
  };

  ///console.log('horse', horse);

  if (data) {
    return { success: true, horse: horse };
  } else {
    return { success: false, message: 'horse not found' };
  }
};

export const getOneGameHorseData = async (gameHorseKey: string) => {
  console.log('gameHorseKey', gameHorseKey);

  const name = '#' + gameHorseKey;

  const data = await GameHorseKeyModel.findOne({
    name: name,
  }).catch((err) => {
    ////return err;
  });

  //console.log('data', data);

  if (data) {
    return { success: true, horse: data };
  } else {
    return { success: false, message: 'horse not found' };
  }
};

export const getHorsesAll = async () => {
  // select all horses

  const data = await HorseModel.find({}).catch((err) => {
    ////return err;
  });

  return data;
};

export const getHorsesByHolder = async (holder: string) => {
  // select all horses by holder

  console.log('holder', holder);

  const data = await HorseModel.find({
    holder: holder.toLowerCase(),
  }).catch((err) => {
    ////return err;
  });

  return data;
};

export const getBalanceByHolder = async (holder: string) => {
  // sum of balance of all horses by holder

  console.log('holder.toLowerCase', holder.toLowerCase());

  const data = await HorseModel.aggregate([
    {
      $match: {
        holder: holder.toLowerCase(),
      },
    },
    // if accumulatedBalance is empty, then set 0
    {
      $set: {
        balance: { $ifNull: ['$balance', 0] },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$balance' },
      },
    },
    /*
    {
      $group: {
        _id: null,
        total: { $sum: 'accumulatedBalance' },
      },
    },
    */
  ]);

  // total items
  const total = await HorseModel.find({
    holder: holder.toLowerCase(),
  }).countDocuments();

  console.log('holder', holder);
  console.log('getBalanceByHolder data', data);

  return {
    balance: data[0].total || 0,
    totalItems: total,
  };
};

// setHorseBalanceByTokenId

export const setHorseBalanceByTokenId = async (
  tokenId: string,
  balance: number
) => {
  const client = await clientPromise;
  const collection = client.db('granderby').collection('nfthorses');

  const data = await collection.findOneAndUpdate(
    {
      tokenId: tokenId,
    },
    {
      $set: {
        balance: balance,
      },
    },
    {
      upsert: false,
    }
  );

  return data;
};

// set horse nft object by tokenId
export const setHorseNftByTokenId = async (tokenId: string, nft: any) => {
  let grade = '';

  // S Grade  0 ~ 10
  if (Number(tokenId) >= 0 && Number(tokenId) <= 10) {
    grade = 'S';
  } else if (Number(tokenId) >= 11 && Number(tokenId) <= 58) {
    grade = 'A';
  } else if (Number(tokenId) >= 59 && Number(tokenId) <= 299) {
    grade = 'B';
  } else if (Number(tokenId) >= 300 && Number(tokenId) <= 599) {
    grade = 'C';
  } else if (Number(tokenId) >= 600 && Number(tokenId) < 1800) {
    grade = 'D';
  } else if (Number(tokenId) >= 1800 && Number(tokenId) < 1805) {
    grade = 'U';
  } else if (Number(tokenId) >= 1805 && Number(tokenId) < 1810) {
    grade = 'S';
  } else if (Number(tokenId) >= 1815 && Number(tokenId) < 1915) {
    grade = 'A';
  } else if (Number(tokenId) >= 1915 && Number(tokenId) < 2115) {
    grade = 'B';
  } else if (Number(tokenId) >= 2115 && Number(tokenId) < 2645) {
    grade = 'C';
  } else if (Number(tokenId) >= 2645 && Number(tokenId) < 3645) {
    grade = 'D';
  }
  // grade U (5EA)
  else if (Number(tokenId) >= 3645 && Number(tokenId) < 3650) {
    grade = 'U';
  } else if (Number(tokenId) >= 3650 && Number(tokenId) < 3664) {
    grade = 'S';
  } else if (Number(tokenId) >= 3664 && Number(tokenId) < 3764) {
    grade = 'A';
  } else if (Number(tokenId) >= 3764 && Number(tokenId) < 4114) {
    grade = 'B';
  } else if (Number(tokenId) >= 4114 && Number(tokenId) < 5090) {
    grade = 'C';
  } else if (Number(tokenId) >= 5090 && Number(tokenId) < 7079) {
    grade = 'D';
  }

  // update nft and grade by tokenId
  /*
  const data = await HorseModel.updateOne(
    {
      tokenId: tokenId,
    },
    {
      $set: {
        nft: nft,
        grade: grade,
      },
    },
    {
      upsert: true,
    }

  );
  */
  // updateOne didn't work

  const client = await clientPromise;
  const collection = client.db('granderby').collection('nfthorses');
  const data = await collection.findOneAndUpdate(
    {
      tokenId: tokenId,
    },
    {
      $set: {
        nft: nft,
        grade: grade,
      },
    },
    {
      upsert: true,
    }
  );

  return data;
};

export const getAllHorseUidsByHolder = async (holder: string) => {
  // select liveHorseInfo?.HORSE_UID from nfthorse collection where holder is holder

  const data = await HorseModel.aggregate([
    {
      $match: {
        holder: holder.toLowerCase(),
      },
    },

    {
      $project: {
        horseUid: '$liveHorseInfo.HORSE_UID',
      },
    },
  ]);

  console.log('holder', holder);
  console.log('getAllHorseUidsByHolder data', data);

  return data;
};
