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
});

export const NpcModel =
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

export const getAllNpcs = async (
  pageNumber: number,
  pagination: number,
  grade: string
) => {
  console.log('getAllNpcs pageNumber', pageNumber);
  console.log('getAllNpcs grade', grade);

  const data = await NpcModel.find({
    'nft.rawMetadata.attributes': {
      $elemMatch: {
        trait_type: 'Grade',
        value: grade,
      },
    },
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
};

/*

horseextends
*/

const HorseextendSchema = new Schema({
  /*
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  pass: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  deposit: {
    type: Number,
    required: false,
    default: 0,
  },
  img: {
    type: String,
    required: true,
    default: `${process.env.API_URL}/images/users/default.gif`,
  },
  admin: {
    type: Boolean,
    required: false,
    default: false,
  },
  newPassToken: {
    type: String,
    required: false,
    default: '',
  },
  maticBalance: {
    type: Number,
    required: false,
    default: 0,
  },
  walletAddress: {
    type: String,
    required: true,
    default: '',
  },
  status: {
    type: Boolean,
    default: true,
  },
  */

  TEXTURE_KEY: {
    type: String,
    required: true,
    default: '',
  },
  HORSEBODY: {
    type: String,
    required: true,
    default: '',
  },
  HORSEMANE: {
    type: String,
    required: true,
    default: '',
  },
  HORSETAIL: {
    type: String,
    required: true,
    default: '',
  },
  HORSEBODYMASK: {
    type: String,
    required: true,
    default: '',
  },
  HORSEHEADMASK: {
    type: String,
    required: true,
    default: '',
  },
  HORSELEGMASK: {
    type: String,
    required: true,
    default: '',
  },
  HORSEMANEMASK: {
    type: String,
    required: true,
    default: '',
  },
  HORSETAILMASK: {
    type: String,
    required: true,
    default: '',
  },
  HORSEBODYACC: {
    type: String,
    required: true,
    default: '',
  },
  HORSEHEADACC: {
    type: String,
    required: true,
    default: '',
  },
  HORSELEGACC: {
    type: String,
    required: true,
    default: '',
  },
  HORSESIZE: {
    type: String,
    required: true,
    default: '',
  },
  HORSEBODYCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSEMANECOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSETAILCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSEBODYMASKCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSEHEADMASKCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSELEGMASKCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSEMANEMASKCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSETAILMASKCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSEBODYACCCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSEHEADACCCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  HORSELEGACCCOLOR: {
    type: String,
    required: true,
    default: '',
  },
  COMMENT: {
    type: String,
    required: true,
    default: '',
  },
  GRADE: {
    type: String,
    required: true,
    default: '',
  },
  WORLD: {
    type: String,
    required: true,
    default: '',
  },
});

export const HorseextendModel =
  models.Horseextend || model('Horseextend', HorseextendSchema);

export const getNpcFromTextureKey = async (textureKye: string) => {
  ////console.log('getNpcFromTextureKey', textureKye);

  const user = await HorseextendModel.findOne({
    TEXTURE_KEY: textureKye,
  }).catch((err) => {
    ////return err;
  });

  //console.log("textureKye", textureKye);
  //console.log("user", user);

  // 특단의 조치를 취하기로
  /////const res = client.close();
  //////console.log('res', res);

  if (user) {
    return { success: true, user };
  } else {
    return { success: false, message: 'User not found' };
  }
};
