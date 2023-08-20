// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { NFTList } from '@/data/static/nft-horse-list';

import { Network, Alchemy } from 'alchemy-sdk';

import { nftDropContractAddressHorse } from '@/config/contractAddresses';
import { at } from 'lodash';

import { getNpcFromTextureKey } from '@/utils/models/npc-model';

import { el } from 'date-fns/locale';

//const util = require('util');

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  ///const { method } = req.query;

  console.log('req.query.id', req.query.id);

  if (req.query.id && String(req.query.id).substring(0, 2) === '0x') {
    const address = req.query.id;

    const settings = {
      //apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key.

      ///apiKey: '8YyZWFtcbLkYveYaB9sjOC3KPWInNu07', // Replace with your Alchemy API Key.

      apiKey: process.env.ALCHEMY_API_KEY,

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

        const speed = 23;
        const preceding = 42;
        const overtaking = 66;
        const stamina = 2;
        const spirit = 64;
        const power = 29;
        const agiligty = 92;
        const weight = 20;
        const drivinghabits = 62;
        const record = 77;

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
    } else if (Number(req.query.id) >= 1800 && Number(req.query.id) < 1805) {
      var formattedNumber = Number(req.query.id) - 1700 + '';

      while (formattedNumber.length < 5) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '000' + formattedNumber;
      //formattedNumber = '00000000';

      console.log('formattedNumber', formattedNumber);

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'U';
    } else if (Number(req.query.id) >= 1805 && Number(req.query.id) < 1810) {
      var formattedNumber = Number(req.query.id) - 1700 + '';

      while (formattedNumber.length < 5) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0000' + formattedNumber;
      //formattedNumber = '00000000';

      console.log('formattedNumber', formattedNumber);

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'S';
    } else if (Number(req.query.id) >= 1815 && Number(req.query.id) < 1915) {
      var formattedNumber = Number(req.query.id) - 1700 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00001' + formattedNumber;
      //formattedNumber = '00000000';

      console.log('formattedNumber', formattedNumber);

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'A';
    } else if (Number(req.query.id) >= 1915 && Number(req.query.id) < 2115) {
      var formattedNumber = Number(req.query.id) - 1800 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '0002' + formattedNumber;

      console.log('formattedNumber', formattedNumber);

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'B';
    } else if (Number(req.query.id) >= 2115 && Number(req.query.id) < 2645) {
      var formattedNumber = Number(req.query.id) - 2000 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00100' + formattedNumber;

      console.log('formattedNumber', formattedNumber);

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'C';
    } else if (Number(req.query.id) >= 2645 && Number(req.query.id) < 5000) {
      var formattedNumber = Number(req.query.id) - 2000 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0020' + formattedNumber;
      //formattedNumber = '00000000';

      console.log('formattedNumber', formattedNumber);

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'D';
    } else {
      ////imagesrc = 'Hrs_00006000.png';
    }
  }

  /*

그랑더비 판매 지갑주소6 : 0x847269a07bdcb674c54b6d2253c076f59199f208 - U 5개
1800 - 1804번까지

그랑더비 판매 지갑주소7 : 0xec29beab84e6182ce79e5b4ee115d043e3e65953 - S 10개
1805 - 1814번까지

그랑더비 판매 지갑주소8 : 0x7f8cd4941edba4ec4a7b265eeaf0f80ed6b29f56 - A 100개
1815 - 1914번까지

그랑더비 판매 지갑주소9 : 0x83993049280d4dA5BA69128acd868AFc83c77883 - B 200개
1915 - 2114번까지

그랑더비 판매 지갑주소10 : 0x516822659bD88976b5a26Dfb05fdE6cF8FA979f7 - C 530개
2115 - 2644번까지

그랑더비 판매 지갑주소11 : 0x43F06C41a01826a230B8168e9357f9e954A02CBf - D 500개
2645 - 3144번까지

그랑더비 판매 지갑주소12 : 0xE9F0Ec0c5A1875ae0A0F1007C664C0648D998C76 - D 500개
3145 - 3644번까지
*/

  //https://granderby.io/nft/horse/Hrs_00200000.png

  const speed = 0;
  const preceding = 0;
  const overtaking = 0;
  const stamina = 0;
  const spirit = 0;
  const power = 0;
  const agility = 0;
  const weight = 0;
  const drivinghabits = 0;
  const record = 0;

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
    let horseMane = '';
    if (npc.user?.HORSEMANE === 'Ho_Mo_04_01_Mane') {
      horseMane = 'Long Mane';
    } else if (npc.user?.HORSEMANE === 'Ho_Mo_04_02_Mane') {
      horseMane = 'Sporty Mane';
    } else if (npc.user?.HORSEMANE === 'Ho_Mo_04_03_Mane') {
      horseMane = 'Short Mane';
    }

    let horseTail = '';
    if (npc.user?.HORSETAIL === 'Ho_Mo_05_01_Tail') {
      horseTail = 'Normal Tail';
    } else if (npc.user?.HORSETAIL === 'Ho_Mo_05_02_Tail') {
      horseTail = 'Richness Tail';
    } else if (npc.user?.HORSETAIL === 'Ho_Mo_05_03_Tail') {
      horseTail = 'Brush Tail';
    }

    let horseManeMask = '';
    if (npc.user?.HORSEMANEMASK === 'Ho_Pa_Xx') {
      horseManeMask = 'None';
    } else if (npc.user?.HORSEMANEMASK === 'Ho_Pa_04_01_01_ManePa') {
      horseManeMask = 'Normal';
    } else if (npc.user?.HORSEMANEMASK === 'Ho_Pa_04_02_01_ManePa') {
      horseManeMask = 'Zebra';
    } else if (npc.user?.HORSEMANEMASK === 'Ho_Pa_04_02_02_ManePa') {
      horseManeMask = 'Stripe';
    } else if (npc.user?.HORSEMANEMASK === 'Ho_Pa_04_03_01_ManePa') {
      horseManeMask = 'Gradation';
    }

    let horseTailMask = '';
    if (npc.user?.HORSETAILMASK === 'Ho_Pa_Xx') {
      horseTailMask = 'None';
    } else if (npc.user?.HORSETAILMASK === 'Ho_Pa_05_01_01_TailPa') {
      horseTailMask = 'Normal';
    } else if (npc.user?.HORSETAILMASK === 'Ho_Pa_05_02_01_TailPa') {
      horseTailMask = 'Stripe';
    } else if (npc.user?.HORSETAILMASK === 'Ho_Pa_05_03_01_TailPa') {
      horseTailMask = 'Zebra';
    } else if (npc.user?.HORSETAILMASK === 'Ho_Pa_05_03_02_TailPa') {
      horseTailMask = 'Gradation';
    }

    let horseBodyAcc = '';
    if (npc.user?.HORSEBODYACC === 'Ho_Pa_Xx') {
      horseBodyAcc = 'None';
    } else if (npc.user?.HORSEBODYACC === 'Ho_Mo_06_01_AccBody') {
      horseBodyAcc = 'Devil Wing';
    } else if (npc.user?.HORSEBODYACC === 'Ho_Mo_06_02_AccBody') {
      horseBodyAcc = 'Angel Wing';
    }

    let horseHeadAcc = '';
    if (npc.user?.HORSEHEADACC === 'Ho_Pa_Xx') {
      horseHeadAcc = 'None';
    } else if (npc.user?.HORSEHEADACC === 'Ho_Mo_07_01_AccHead') {
      horseHeadAcc = 'Angel Ring';
    } else if (npc.user?.HORSEHEADACC === 'Ho_Mo_07_02_AccHead') {
      horseHeadAcc = 'Devil Horns';
    } else if (npc.user?.HORSEHEADACC === 'Ho_Mo_07_03_AccHead') {
      horseHeadAcc = 'Deer Antlers';
    } else if (npc.user?.HORSEHEADACC === 'Ho_Mo_07_04_AccHead') {
      horseHeadAcc = 'Unicorn Horn';
    }

    let horseLegAcc = '';
    if (npc.user?.HORSELEGACC === 'Ho_Pa_Xx') {
      horseLegAcc = 'None';
    } else if (npc.user?.HORSELEGACC === 'Ho_Mo_08_01_AccLegpa') {
      horseLegAcc = 'Richness';
    } else if (npc.user?.HORSELEGACC === 'Ho_Mo_08_02_AccLegpa') {
      horseLegAcc = 'Normal';
    }

    let world = '';
    if (npc.user?.WORLD === 'GH') {
      world = 'Gwacheon';
    } else if (npc.user?.WORLD === 'HV') {
      world = 'Happy Valley';
    } else if (npc.user?.WORLD === 'SP') {
      world = 'Singapore';
    } else if (npc.user?.WORLD === 'ST') {
      world = 'Shatin';
    }

    attributes.push({
      trait_type: 'Texture Key',
      value: npc.user?.TEXTUREKEY,
    });

    attributes.push({
      trait_type: 'Mane',
      value: horseMane,
    });
    attributes.push({
      trait_type: 'Tail',
      value: horseTail,
    });
    attributes.push({
      trait_type: 'BodyMask',
      value: npc.user?.HORSEBODYMASK,
    });
    attributes.push({
      trait_type: 'HeadMask',
      value: npc.user?.HORSEHEADMASK,
    });
    attributes.push({
      trait_type: 'LegMask',
      value: npc.user?.HORSELEGMASK,
    });
    attributes.push({
      trait_type: 'ManeMask',
      value: horseManeMask,
    });
    attributes.push({
      trait_type: 'TailMask',
      value: horseTailMask,
    });
    attributes.push({
      trait_type: 'BodyAcc',
      value: horseBodyAcc,
    });
    attributes.push({
      trait_type: 'HeadAcc',
      value: horseHeadAcc,
    });
    attributes.push({
      trait_type: 'LegAcc',
      value: horseLegAcc,
    });
    attributes.push({
      trait_type: 'Size',
      value: npc.user?.HORSESIZE,
    });
    attributes.push({
      trait_type: 'BodyColor',
      value: npc.user?.HORSEBODYCOLOR,
    });
    attributes.push({
      trait_type: 'ManeColor',
      value: npc.user?.HORSEMANECOLOR,
    });
    attributes.push({
      trait_type: 'TailColor',
      value: npc.user?.HORSETAILCOLOR,
    });
    attributes.push({
      trait_type: 'BodyMaskColor',
      value: npc.user?.HORSEBODYMASKCOLOR,
    });
    attributes.push({
      trait_type: 'HeadMaskColor',
      value: npc.user?.HORSEHEADMASKCOLOR,
    });
    attributes.push({
      trait_type: 'LegMaskColor',
      value: npc.user?.HORSELEGMASKCOLOR,
    });
    attributes.push({
      trait_type: 'ManeMaskColor',
      value: npc.user?.HORSEMANEMASKCOLOR,
    });
    attributes.push({
      trait_type: 'TailMaskColor',
      value: npc.user?.HORSETAILMASKCOLOR,
    });
    attributes.push({
      trait_type: 'BodyAccColor',
      value: npc.user?.HORSEBODYACCCOLOR,
    });
    attributes.push({
      trait_type: 'HeadAccColor',
      value: npc.user?.HORSEHEADACCCOLOR,
    });
    attributes.push({
      trait_type: 'LegAccColor',
      value: npc.user?.HORSELEGACCCOLOR,
    });
    attributes.push({
      trait_type: 'Comment',
      value: npc.user?.COMMENT,
    });
    attributes.push({
      trait_type: 'Grade',
      value: npc.user?.GRADE,
    });
    attributes.push({
      trait_type: 'World',
      value: world,
    });
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

      animation_url: '',
      external_url: 'https://granderby.io/horse-details/' + req.query.id,
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

      animation_url: '',
      external_url: 'https://granderby.io/horse-details/' + req.query.id,
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
