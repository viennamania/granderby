// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { NFTList } from '@/data/static/nft-horse-list';

//const util = require('util');

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
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
    } else {
      ////imagesrc = 'Hrs_00006000.png';
    }
  }

  //https://granderby.io/nft/horse/Hrs_00200000.png

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

  const imagesrcUrl = s3url + imagesrc;

  //const asset = imagesrc.substring(-3);

  if (req.query.id === '0') {
    const nftData = {
      id: req.query.id,
      name: 'Granderby Horse #' + req.query.id,
      description: 'Granderby NFT Horses',
      //image: 'https://granderby.io/nft/horse/Hrs_00006000.png',
      image: imagesrcUrl,
      ///attributes: [{ trait_type: 'Grade', value: grade }],

      attributes: [
        { trait_type: 'Asset', value: imagesrc },
        { trait_type: 'Grade', value: grade },
        /*
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
        */
      ],

      animation_url: 'https://animation.granderby.io',
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

      attributes: [
        { trait_type: 'Asset', value: imagesrc },
        { trait_type: 'Grade', value: grade },
        /*
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
        */
      ],

      animation_url: 'https://animation.granderby.io',
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
