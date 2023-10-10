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
    type: Number,
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

//export const getAllHorses = async (): Promise<IHorse[]> => {

/*
3
const result  = await findOne({color: "gray", "object.name":"apple" })
*/
/*
{ 
    "names": {
        "$in": [
            { "firstname": "Tom", "lastname": "Smith" }, 
            { "firstname": "Bob", "lastname": "Smith" }  
        ]
    }
}
*/

export const getAllHorses = async (
  pageNumber: number,
  pagination: number,
  grades: string,
  manes: string,
  holder: string,
  sort: string
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

    if (data?.length === 0) {
      return { nfts: [], pageNumber: null };
    }

    return { nfts: data, pageNumber: pageNumber + 1 };
  }

  if (grades.length === 0) {
    const data = await HorseModel.find({})

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

    return { total: data };
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
