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

import { IHorse } from '../interfaces/horse-interface';

import { Schema, models, model } from 'mongoose';

/////////import { connectMongo } from '@/utils/services/database';
/////////connectMongo();

import dbConnect from '@/lib/db/dbConnect';

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

export const getAllHorses = async (
  pageNumber: number,
  pagination: number,
  grades: string,
  manes: string,
  holder: string,
  sort: string,
  q: string = ''
) => {
  //console.log('getAllHorses pageNumber', pageNumber);
  //console.log('getAllHorses pagination', pagination);
  //console.log('getAllHorses grades', grades);
  //console.log('getAllHorses manes', manes);

  //console.log('getAllHorses sort', sort);

  console.log('getAllHorses holder', holder);

  if (holder) {
    const data = await HorseModel.find({
      holder: holder.toLowerCase(),
    })

      // search nft.title by q

      .find({
        $or: [
          { 'nft.title': { $regex: q, $options: 'i' } },
          //{ 'nft.description': { $regex: q, $options: 'i' } },
        ],
      })

      // tokenId is string, so conver tokenId to number and sort

      .sort(
        sort === 'asc'
          ? {
              // sort number in ascending order, tokenId is string, so conver tokenId to number and sort

              tokenId: 1,
            }
          : {
              // sort number in descending order, tokenId is string, so conver tokenId to number and sort

              tokenId: -1,
            }
      )

      //.sort({ tokenId: 1 })

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
  }

  if (grades.length === 0) {
    const data = await HorseModel.find({})

      ///.sort({ tokenId: 1 })

      // search nft.title by q

      // if q is not '', then search nft.title by q

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
          : {
              // sort number in descending order, tokenId is string, so conver tokenId to number and sort

              tokenId: -1,
            }
      )

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

    /* if q is not '', then search nft.title by q */

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

            //tokenId: 1,
            // covert tokenId to number and sort

            tokenId: 1,
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
    /*
    .then(data => {

      return {'nfts' : data, 'pageNumber' : (pageNumber + 1) };

    })
    */
    .catch((err) => {
      ////return err;
    });

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
  ///console.log('getOneHorse tokenId', tokenId);

  const data = await HorseModel.findOne({
    tokenId: tokenId,
  }).catch((err) => {
    ////return err;
  });

  ///console.log('getOneHorse data', data);

  if (data) {
    return { success: true, horse: data };
  } else {
    return { success: false, message: 'horse not found' };
  }
};
