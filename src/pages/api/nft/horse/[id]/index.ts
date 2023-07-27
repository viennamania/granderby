// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { NFTList } from '@/data/static/nft-horse-list';

import { Network, Alchemy } from 'alchemy-sdk';

import { nftDropContractAddressHorse } from '@/config/contractAddresses';
import { at } from 'lodash';

import {
  newGameHorse,
  getHorseGames,
  deleteAllHorseGames,
  deleteOneHorseGame,
  getHorseGameByUserId,
} from '@/utils/models/horseRace/game';

import { getNpcFromTextureKey } from '@/utils/models/npc-model';

//const util = require('util');

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  if (req.query.id && String(req.query.id).substring(0, 2) === '0x') {
    const address = req.query.id;

    const settings = {
      //apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key.

      apiKey: '8YyZWFtcbLkYveYaB9sjOC3KPWInNu07', // Replace with your Alchemy API Key.

      network: Network.MATIC_MAINNET, // Replace with your network.
    };

    const alchemy = new Alchemy(settings);

    // Get all NFTs
    ////const response = await alchemy.nft.getNftsForOwner(String(arr20Address[j]), {
    const response = await alchemy.nft.getNftsForOwner(String(address), {
      omitMetadata: false, // // Flag to omit metadata
      contractAddresses: [nftDropContractAddressHorse],
    });

    const nfts = [];

    for (var k = 0; k < response.ownedNfts.length; k++) {
      if (response.ownedNfts[k].tokenUri?.gateway) {
        const res = await fetch(response.ownedNfts[k].tokenUri?.gateway!);
        const responseJson = await res.json();

        //console.log("responseJson", responseJson.attributes[0].value);
        //console.log("responseJson", responseJson.attributes[1].value);

        const asset = responseJson.attributes[0].value;
        const grade = responseJson.attributes[1].value;
        const image = responseJson.image;

        const tokenid = response.ownedNfts[k].tokenId;

        const speed = '23';
        const preceding = '42';
        const overtaking = '66';
        const stamina = '2';
        const spirit = '64';
        const power = '29';
        const agiligty = '92';
        const weight = '20';
        const drivinghabits = '62';
        const record = '77';

        nfts.push({
          asset: asset,
          tokenid: tokenid,
          image: image,
          attributes: [
            { trait_type: 'Grade', value: grade },
            { trait_type: 'Speed', value: speed },
            { trait_type: 'Preceding', value: preceding },
            { trait_type: 'Overtaking', value: overtaking },
            { trait_type: 'Stamina', value: stamina },
            { trait_type: 'Spirit', value: spirit },
            { trait_type: 'Power', value: power },
            { trait_type: 'Agiligty', value: agiligty },
            { trait_type: 'Weight', value: weight },
            { trait_type: 'DrivingHabits', value: drivinghabits },
            { trait_type: 'Record', value: record },
          ],
        });
      }
    }

    const nftData = {
      address: address,

      nfts: nfts,
    };

    res.status(200).json(nftData);

    return;
  }

  //res.status(200).json( NFTList[ req.query.id ] )

  /*
  const found = NFTList.find((element: any) => element.id === req.query.id);

  res.status(200).json(found);
  */

  /*
  https://granderby-hosted-content.s3.ap-southeast-1.amazonaws.com/Hrs_00200000.png
  */

  //const s3url =
  //    'https://granderby-hosted-content.s3.ap-southeast-1.amazonaws.com/';

  const s3url = 'https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/hrs/';

  let grade = '';

  let imagesrc = '';

  const userId = 'creath.park@gmail.com';
  const game = await getHorseGameByUserId(userId);

  console.log('game', game);

  if (Number(req.query.id) === 0) {
    imagesrc = 'Hrs_00000000.png';
    grade = 'S';
  } else if (Number(req.query.id) === 1) {
    imagesrc = 'Hrs_00000001.png';
    grade = 'S';
  } else if (Number(req.query.id) === 2) {
    imagesrc = 'Hrs_00000002.png';
    grade = 'S';
  } else if (Number(req.query.id) === 3) {
    imagesrc = 'Hrs_00000003.png';
    grade = 'S';
  } else if (Number(req.query.id) === 4) {
    imagesrc = 'Hrs_00000004.png';
    grade = 'S';
  } else if (Number(req.query.id) === 5) {
    imagesrc = 'Hrs_00000005.png';
    grade = 'S';
  } else if (Number(req.query.id) === 6) {
    imagesrc = 'Hrs_00000006.png';
    grade = 'S';
  } else if (Number(req.query.id) === 7) {
    imagesrc = 'Hrs_00000007.png';
    grade = 'S';
  } else if (Number(req.query.id) === 8) {
    imagesrc = 'Hrs_00000008.png';
    grade = 'S';
  } else if (Number(req.query.id) === 9) {
    imagesrc = 'Hrs_00000009.png';
    grade = 'S';
  } else if (Number(req.query.id) === 10) {
    imagesrc = 'Hrs_00000010.png';
    grade = 'S';
  } else {
    //console.log('req.query.id', req.query.id);

    // A Grade
    if (Number(req.query.id) >= 11 && Number(req.query.id) <= 58) {
      console.log('A Grade req.query.id', req.query.id);

      var formattedNumber = Number(req.query.id) - 11 + '';
      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '00001' + formattedNumber;

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'A';

      // B Grade
    } else if (Number(req.query.id) >= 59 && Number(req.query.id) <= 299) {
      //console.log('B Grade req.query.id', req.query.id);

      //const filename = util.format("%08d", Number(req.query.id));

      //const formattedNumber = ("0000600" + Number(req.query.id)).slice(-8);

      //Number(req.query.id).padStart(2, "0");

      //imagesrc = 'Hrs_00006000.png';

      var formattedNumber = Number(req.query.id) - 59 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '0002' + formattedNumber;

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'B';
    } else {
      imagesrc = 'Hrs_00006000.png';
    }

    // C Grade
    if (Number(req.query.id) >= 300 && Number(req.query.id) <= 599) {
      var formattedNumber = Number(req.query.id) - 300 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00100' + formattedNumber;

      console.log('formattedNumber', formattedNumber);

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'C';
    } else if (Number(req.query.id) >= 600 && Number(req.query.id) < 1000) {
      var formattedNumber = Number(req.query.id) - 600 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00200' + formattedNumber;

      console.log('formattedNumber', formattedNumber);

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'D';
    } else if (Number(req.query.id) >= 1000 && Number(req.query.id) < 1800) {
      var formattedNumber = Number(req.query.id) - 600 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0020' + formattedNumber;

      console.log('formattedNumber', formattedNumber);

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'D';
    } else {
      ////imagesrc = 'Hrs_00006000.png';
    }
  }

  //https://granderby.io/nft/horse/Hrs_00200000.png

  const speed = '0';
  const preceding = '0';
  const overtaking = '0';
  const stamina = '0';
  const spirit = '0';
  const power = '0';
  const agility = '0';
  const weight = '0';
  const drivinghabits = '0';
  const record = '0';

  const imagesrcUrl = s3url + imagesrc;

  //const asset = imagesrc.substring(-3);

  const attributes = [];

  attributes.push({ trait_type: 'Speed', value: speed });
  attributes.push({ trait_type: 'Preceding', value: preceding });
  attributes.push({ trait_type: 'Overtaking', value: overtaking });
  attributes.push({ trait_type: 'Stamina', value: stamina });
  attributes.push({ trait_type: 'Spirit', value: spirit });
  attributes.push({ trait_type: 'Power', value: power });
  attributes.push({ trait_type: 'Agility', value: agility });
  attributes.push({ trait_type: 'Weight', value: weight });
  attributes.push({ trait_type: 'Drivinghabits', value: drivinghabits });
  attributes.push({ trait_type: 'Record', value: record });

  ////const textureKye = 'Hrs_00000001';
  const textureKey = imagesrc.slice(0, -4);
  const npc = await getNpcFromTextureKey(textureKey);

  if (npc.success) {
    attributes.push({ trait_type: 'TextureKey', value: npc.user.TEXTUREKEY });

    attributes.push({ trait_type: 'HorseManeName', value: npc.user.HORSEMANE });
    attributes.push({ trait_type: 'HorseTailName', value: npc.user.HORSETAIL });
    attributes.push({
      trait_type: 'HorseBodyMask',
      value: npc.user.HORSEBODYMASK,
    });
    attributes.push({
      trait_type: 'BodyMaskName',
      value: npc.user.HORSEBODYMASK,
    });
    attributes.push({
      trait_type: 'HorseHeadMask',
      value: npc.user.HORSEHEADMASK,
    });
    attributes.push({
      trait_type: 'HeadMaskName',
      value: npc.user.HORSEHEADMASK,
    });
    attributes.push({
      trait_type: 'HorseLegMask',
      value: npc.user.HORSELEGMASK,
    });
    attributes.push({
      trait_type: 'LegMaskName',
      value: npc.user.HORSELEGMASK,
    });
    attributes.push({
      trait_type: 'HorseManeMask',
      value: npc.user.HORSEMANEMASK,
    });
    attributes.push({
      trait_type: 'ManeMaskName',
      value: npc.user.HORSEMANEMASK,
    });
    attributes.push({
      trait_type: 'HorseTailMask',
      value: npc.user.HORSETAILMASK,
    });
    attributes.push({
      trait_type: 'TailMaskName',
      value: npc.user.HORSETAILMASK,
    });
    attributes.push({
      trait_type: 'HorseBodyAcc',
      value: npc.user.HORSEBODYACC,
    });
    attributes.push({
      trait_type: 'HorseBodyAccName',
      value: npc.user.HORSEBODYACC,
    });
    attributes.push({
      trait_type: 'HorseHeadAcc',
      value: npc.user.HORSEHEADACC,
    });
    attributes.push({
      trait_type: 'HorseHeadAccName',
      value: npc.user.HORSEHEADACC,
    });
    attributes.push({ trait_type: 'HorseLegAcc', value: npc.user.HORSELEGACC });
    attributes.push({ trait_type: 'HorseSize', value: npc.user.HORSESIZE });
    attributes.push({
      trait_type: 'HorseBodyColor',
      value: npc.user.HORSEBODYCOLOR,
    });
    attributes.push({
      trait_type: 'HorseManeColor',
      value: npc.user.HORSEMANECOLOR,
    });
    attributes.push({
      trait_type: 'HorseTailColor',
      value: npc.user.HORSETAILCOLOR,
    });
    attributes.push({
      trait_type: 'HorseBodyMaskColor',
      value: npc.user.HORSEBODYMASKCOLOR,
    });
    attributes.push({
      trait_type: 'HorseHeadMaskColor',
      value: npc.user.HORSEHEADMASKCOLOR,
    });
    attributes.push({
      trait_type: 'HorseLegMaskColor',
      value: npc.user.HORSELEGMASKCOLOR,
    });
    attributes.push({
      trait_type: 'HorseManeMaskColor',
      value: npc.user.HORSEMANEMASKCOLOR,
    });
    attributes.push({
      trait_type: 'HorseTailMaskColor',
      value: npc.user.HORSETAILMASKCOLOR,
    });
    attributes.push({
      trait_type: 'HorseBodyAccColor',
      value: npc.user.HORSEBODYACCCOLOR,
    });
    attributes.push({
      trait_type: 'HorseHeadAccColor',
      value: npc.user.HORSEHEADACCCOLOR,
    });
    attributes.push({
      trait_type: 'HorseLegAccColor',
      value: npc.user.HORSELEGACCCOLOR,
    });
    attributes.push({ trait_type: 'Comment', value: npc.user.COMMENT });
    attributes.push({ trait_type: 'Grade', value: npc.user.GRADE });
    attributes.push({ trait_type: 'World', value: npc.user.WORLD });
  }

  if (req.query.id === '0') {
    const nftData = {
      id: req.query.id,
      name: 'Granderby Horse #' + req.query.id,
      description: 'Granderby NFT Horses',
      //image: 'https://granderby.io/nft/horse/Hrs_00006000.png',
      image: imagesrcUrl,
      ///attributes: [{ trait_type: 'Grade', value: grade }],

      attributes: attributes,

      /*
      attributes: [
        { trait_type: 'Asset', value: imagesrc },
        { trait_type: 'Grade', value: grade },
     
        { trait_type: 'Speed', value: speed },
        { trait_type: 'Preceding', value: preceding },
        { trait_type: 'Overtaking', value: overtaking },
        { trait_type: 'Stamina', value: stamina },
        { trait_type: 'Spirit', value: spirit },
        { trait_type: 'Power', value: power },
        { trait_type: 'Agility', value: agility },
        { trait_type: 'Weight', value: weight },
        { trait_type: 'DrivingHabits', value: drivinghabits },
        { trait_type: 'Record', value: record },
        
      ],
      */

      //animation_url: 'https://animation.granderby.io',
    };

    res.status(200).json(nftData);
  } else {
    const nftData = {
      id: req.query.id,
      name: 'Granderby Horse #' + req.query.id,
      description: 'Granderby NFT Horses',
      //image: 'https://granderby.io/nft/horse/Hrs_00006000.png',
      image: imagesrcUrl,
      ///attributes: [{ trait_type: 'Grade', value: grade }],

      attributes: attributes,

      //animation_url: 'https://animation.granderby.io',
    };

    res.status(200).json(nftData);
  }

  //res.status(200).json({ name: req.query.id })

  /*
    const json = '{
        "id": "19",
        "name":"Granderby Horse #19",
        "description":"Granderby NFT Horses",
        "image":"https://granderby-delta.vercel.app/Hrs_00006000.png",
        "attributes":
        [
          {"trait_type":"Size","value":"large"},
  
          {"trait_type":"Age","value":42},
          {"trait_type":"Grade","value":6},
          {"trait_type":"Training","value":45},
          {"trait_type":"Trend","value":9},
          
          {"trait_type":"Speed","value":77,"max_value":100},
          {"trait_type":"Overtaking","value":45,"max_value":100},
          {"trait_type":"S-Karrots","value":5,"display_type":"boost_number"}
        ]
      }

    ';
      */

  ////res.status(200).json({ name: 'hello' });
}
