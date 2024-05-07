// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { NFTList } from '@/data/static/nft-horse-list';

import { Network, Alchemy } from 'alchemy-sdk';

import { nftDropContractAddressHorse } from '@/config/contractAddresses';
import { at } from 'lodash';

import { getNpcFromTextureKey } from '@/utils/models/npc-model';

import { getOneGameHorseData } from '@/utils/models/horse-model';

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

    //console.log('response', response);

    const nfts = [];

    for (var k = 0; k < response.ownedNfts.length; k++) {
      ///console.log("response.ownedNfts[k]", response.ownedNfts[k]);

      /*
      response.ownedNfts[k].contract
      response.ownedNfts[k].tokenId
      response.ownedNfts[k].title
      response.ownedNfts[k].description
      response.ownedNfts[k].media[0].gateway
      response.ownedNfts[k].media[0].thumbnail
      response.ownedNfts[k].rawMetadata?.attributes
      */

      //console.log("response.ownedNfts[k].rawMetadata?.image", response.ownedNfts[k].rawMetadata?.image?.substring(50,-3));

      //"image":"https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/hrs/Hrs_00020186.png"

      const image = response.ownedNfts[k].rawMetadata?.image;
      var textureKeyValue = image?.substring(
        image.length - 16,
        image.length - 4
      );

      ///console.log("textureKeyValue", textureKeyValue);

      /*
      response.ownedNfts[k].rawMetadata?.attributes?.forEach((element) => {
        if (element.trait_type === 'textureKey') {
          textureKeyValue = element.value;
        }
      });
      */

      nfts.push({
        name: response.ownedNfts[k].title,
        tokenid: response.ownedNfts[k].tokenId,
        //image: response.ownedNfts[k].media[0].thumbnail,
        ///attributes: response.ownedNfts[k].rawMetadata?.attributes,
        texturekey: textureKeyValue,
      });

      /*
      if (response.ownedNfts[k].tokenUri?.gateway) {

        console.log ("response.ownedNfts[k].tokenUri?.gateway", response.ownedNfts[k].tokenUri?.gateway);



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
      */
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

  const tokenId = Number(req.query.id);

  let gameHorseKey = '';

  if (tokenId === 0) {
    gameHorseKey = '00000000';
    imagesrc = 'Hrs_' + gameHorseKey + '.png';
    grade = 'S';
  } else if (tokenId === 1) {
    gameHorseKey = '00000001';
    imagesrc = 'Hrs_' + gameHorseKey + '.png';
    grade = 'S';
  } else if (tokenId === 2) {
    gameHorseKey = '00000002';
    imagesrc = 'Hrs_' + gameHorseKey + '.png';
    grade = 'S';
  } else if (tokenId === 3) {
    gameHorseKey = '00000003';
    imagesrc = 'Hrs_' + gameHorseKey + '.png';
    grade = 'S';
  } else if (tokenId === 4) {
    gameHorseKey = '00000004';
    imagesrc = 'Hrs_' + gameHorseKey + '.png';
    grade = 'S';
  } else if (tokenId === 5) {
    gameHorseKey = '00000005';
    imagesrc = 'Hrs_' + gameHorseKey + '.png';
    grade = 'S';
  } else if (tokenId === 6) {
    gameHorseKey = '00000006';
    imagesrc = 'Hrs_' + gameHorseKey + '.png';
    grade = 'S';
  } else if (tokenId === 7) {
    gameHorseKey = '00000007';
    imagesrc = 'Hrs_' + gameHorseKey + '.png';
    grade = 'S';
  } else if (tokenId === 8) {
    gameHorseKey = '00000008';
    imagesrc = 'Hrs_' + gameHorseKey + '.png';
    grade = 'S';
  } else if (tokenId === 9) {
    gameHorseKey = '00000009';
    imagesrc = 'Hrs_' + gameHorseKey + '.png';
    grade = 'S';
  } else if (tokenId === 10) {
    gameHorseKey = '00000010';
    imagesrc = 'Hrs_' + gameHorseKey + '.png';
    grade = 'S';
  } else {
    //console.log('req.query.id', req.query.id);

    // A Grade
    if (tokenId >= 11 && tokenId <= 58) {
      var formattedNumber = tokenId - 11 + '';
      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '00001' + formattedNumber;
      gameHorseKey = formattedNumber;

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'A';

      // B Grade
    } else if (tokenId >= 59 && tokenId <= 299) {
      var formattedNumber = tokenId - 59 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '0002' + formattedNumber;
      gameHorseKey = formattedNumber;

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'B';
    } else {
      imagesrc = 'Hrs_00006000.png';
    }

    // C Grade
    if (tokenId >= 300 && tokenId <= 599) {
      var formattedNumber = tokenId - 300 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00100' + formattedNumber;
      gameHorseKey = formattedNumber;

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'C';
    } else if (tokenId >= 600 && tokenId < 1000) {
      var formattedNumber = tokenId - 600 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00200' + formattedNumber;
      gameHorseKey = formattedNumber;

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'D';
    } else if (tokenId >= 1000 && tokenId < 1800) {
      var formattedNumber = tokenId - 600 + '';

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
      imagesrc = 'Hrs_' + formattedNumber + '.png';
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
    else if (tokenId === 3645) {
      gameHorseKey = '99990005';
      imagesrc = 'Hrs_' + gameHorseKey + '.png';
      grade = 'U';
    } else if (tokenId === 3646) {
      gameHorseKey = '99990006';
      imagesrc = 'Hrs_' + gameHorseKey + '.png';
      grade = 'U';
    } else if (tokenId === 3647) {
      gameHorseKey = '99990007';
      imagesrc = 'Hrs_' + gameHorseKey + '.png';
      grade = 'U';
    } else if (tokenId === 3648) {
      gameHorseKey = '99990008';
      imagesrc = 'Hrs_' + gameHorseKey + '.png';
      grade = 'U';
    } else if (tokenId === 3649) {
      gameHorseKey = '99990009';
      imagesrc = 'Hrs_' + gameHorseKey + '.png';
      grade = 'U';
    } else if (tokenId >= 3650 && tokenId < 3664) {
      var formattedNumber = tokenId - 3650 + 16 + '';
      while (formattedNumber.length < 5) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '000' + formattedNumber;
      gameHorseKey = formattedNumber;

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'S';
    } else if (tokenId >= 3664 && tokenId < 3764) {
      var formattedNumber = tokenId - 3664 + 215 + '';
      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '00001' + formattedNumber;
      gameHorseKey = formattedNumber;

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'A';
    } else if (tokenId >= 3764 && tokenId < 4114) {
      var formattedNumber = tokenId - 3764 + 441 + '';
      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '0002' + formattedNumber;
      gameHorseKey = formattedNumber;

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'B';
    } else if (tokenId >= 4114 && tokenId < 5090) {
      var formattedNumber = tokenId - 4114 + 945 + '';
      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '0010' + formattedNumber;
      gameHorseKey = formattedNumber;

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'C';
    } else if (tokenId >= 5090 && tokenId < 7079) {
      var formattedNumber = tokenId - 5090 + 2645 + '';
      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '0020' + formattedNumber;
      gameHorseKey = formattedNumber;

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

  const speed = parseInt(((tokenId / 100) * 2 + 11).toString());
  const stamina = parseInt(((tokenId / 40) * 2 + 11).toString());
  const power = parseInt(((tokenId / 80) * 2 + 11).toString());

  const preceding = 0;
  const overtaking = 0;

  const spirit = 0;

  const agility = 0;
  const weight = 0;
  const drivinghabits = 0;
  const record = 0;

  let imagesrcUrl = s3url + imagesrc;

  if (grade === 'U') {
    imagesrcUrl = 'https://granderby.io/images/default-horse.png';
  }

  //const asset = imagesrc.substring(-3);

  var name = '';

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

  attributes.push({ trait_type: 'textureKey', value: textureKey });

  const npc = await getNpcFromTextureKey(textureKey);

  ///console.log('npc', npc);

  if (npc.success) {
    if (npc.user?.COMMENT !== '') {
      name = npc.user?.COMMENT;
    } else {
      name = 'Granderby Horse #' + req.query.id;
    }

    ///console.log('name', name);

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

  console.log('imagesrc', imagesrc);

  /////const gameHorseKey = imagesrc.slice(4, -4);

  const gameHorse = await getOneGameHorseData(gameHorseKey);

  if (gameHorse.success) {
    //console.log("gameHorse.horse", gameHorse.horse);

    /*
    BODY_PATTERN: 'Smoke',
    HEAD_PATTERN: 'Smoke',
    LEG_PATTERN: 'Long Boots',
    MANE: 'Sporty',
    MANE_PATTERN: 'None',
    TAIL: 'Brush',
    TAIL_PATTERN: 'None',
    LEG_HAIR: 'None',
    LEG_HAIR_PATTERN: 'Long Boots',
    WING: 'None',
    HORN: 'None',
    COLOR_SET_NO: 482,
    */

    attributes.push({
      trait_type: 'BODY_PATTERN',
      value: gameHorse.horse.BODY_PATTERN,
    });

    attributes.push({
      trait_type: 'HEAD_PATTERN',
      value: gameHorse.horse.HEAD_PATTERN,
    });

    attributes.push({
      trait_type: 'LEG_PATTERN',
      value: gameHorse.horse.LEG_PATTERN,
    });

    attributes.push({
      trait_type: 'MANE',
      value: gameHorse.horse.MANE,
    });

    attributes.push({
      trait_type: 'MANE_PATTERN',
      value: gameHorse.horse.MANE_PATTERN,
    });

    attributes.push({
      trait_type: 'TAIL',
      value: gameHorse.horse.TAIL,
    });

    attributes.push({
      trait_type: 'TAIL_PATTERN',
      value: gameHorse.horse.TAIL_PATTERN,
    });

    attributes.push({
      trait_type: 'LEG_HAIR',
      value: gameHorse.horse.LEG_HAIR,
    });

    attributes.push({
      trait_type: 'LEG_HAIR_PATTERN',
      value: gameHorse.horse.LEG_HAIR_PATTERN,
    });

    attributes.push({
      trait_type: 'WING',
      value: gameHorse.horse.WING,
    });

    attributes.push({
      trait_type: 'HORN',
      value: gameHorse.horse.HORN,
    });

    attributes.push({
      trait_type: 'COLOR_SET_NO',
      value: gameHorse.horse.COLOR_SET_NO,
    });
  }

  if (req.query.id === '0') {
    const nftData = {
      id: req.query.id,
      name: name,
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
      name: name,
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
