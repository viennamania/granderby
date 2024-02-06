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
  console.log('getAllHorses grades', grades);
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

  let gameHorseKey = '';

  if (Number(tokenId) === 0) {
    gameHorseKey = '00000000';
  } else if (Number(tokenId) === 1) {
    gameHorseKey = '00000001';
  } else if (Number(tokenId) === 2) {
    gameHorseKey = '00000002';
  } else if (Number(tokenId) === 3) {
    gameHorseKey = '00000003';
  } else if (Number(tokenId) === 4) {
    gameHorseKey = '00000004';
  } else if (Number(tokenId) === 5) {
    gameHorseKey = '00000005';
  } else if (Number(tokenId) === 6) {
    gameHorseKey = '00000006';
  } else if (Number(tokenId) === 7) {
    gameHorseKey = '00000007';
  } else if (Number(tokenId) === 8) {
    gameHorseKey = '00000008';
  } else if (Number(tokenId) === 9) {
    gameHorseKey = '00000009';
  } else if (Number(tokenId) === 10) {
    gameHorseKey = '00000010';
  } else {
    //console.log('tokenId', tokenId);

    // A Grade
    if (Number(tokenId) >= 11 && Number(tokenId) <= 58) {
      console.log('A Grade tokenId', tokenId);

      var formattedNumber = Number(tokenId) - 11 + '';
      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '00001' + formattedNumber;

      gameHorseKey = '' + formattedNumber + '';

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
    } else {
      gameHorseKey = '00006000';
    }

    // C Grade
    if (Number(tokenId) >= 300 && Number(tokenId) <= 599) {
      var formattedNumber = Number(tokenId) - 300 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00100' + formattedNumber;

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 600 && Number(tokenId) < 1000) {
      var formattedNumber = Number(tokenId) - 600 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00200' + formattedNumber;

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 1000 && Number(tokenId) < 1800) {
      var formattedNumber = Number(tokenId) - 600 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0020' + formattedNumber;

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 1800 && Number(tokenId) < 1805) {
      var formattedNumber = Number(tokenId) - 1700 + '';

      while (formattedNumber.length < 5) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '000' + formattedNumber;
      //formattedNumber = '00000000';

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 1805 && Number(tokenId) < 1810) {
      var formattedNumber = Number(tokenId) - 1700 + '';

      while (formattedNumber.length < 5) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0000' + formattedNumber;
      //formattedNumber = '00000000';

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 1815 && Number(tokenId) < 1915) {
      var formattedNumber = Number(tokenId) - 1700 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00001' + formattedNumber;
      //formattedNumber = '00000000';

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 1915 && Number(tokenId) < 2115) {
      //var formattedNumber = Number(tokenId) - 1800 + 59 + '';

      var formattedNumber = Number(tokenId) - 1915 + 241 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '0002' + formattedNumber;

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 2115 && Number(tokenId) < 2645) {
      //var formattedNumber = Number(tokenId) - 2000 + '';
      var formattedNumber = Number(tokenId) - 1700 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00100' + formattedNumber;

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 2645 && Number(tokenId) < 5000) {
      var formattedNumber = Number(tokenId) - 1000 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0020' + formattedNumber;
      //formattedNumber = '00000000';

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else {
      ////gameHorseKey = '00006000';
    }
  }

  // select horseinfo from game_horsekey collection when name is gameHorseKey

  // game_horsekey collection is not created yet

  const name = '#' + gameHorseKey;

  const data2 = await GameHorseKeyModel.findOne({
    name: name,
  }).catch((err) => {
    ////return err;
  });

  ///console.log('data2', data2);

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

  const gameHorseDescription = [] as any;

  gameHorseDescription.push({
    trait_type: 'name',
    value: json.name,
  });

  gameHorseDescription.push({
    trait_type: 'description',
    value: json.description,
  });

  const gameHorseInfo = [] as any;

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

  /*
        AGE: '',
      OVERALL: '',
      FRONT: '',
      STRETCH: '',
      WEIGHT: '',
      RUNTYPE: ''
      */
  const gameHorseStatus = [] as any;

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

  const horse = {
    ...data?._doc,
    gameHorseDescription: gameHorseDescription,
    gameHorseInfo: gameHorseInfo,
    gameHorseStatus: gameHorseStatus,
  };

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
