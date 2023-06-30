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

  let imagesrc = '';

  if (Number(req.query.id) >= 0 && Number(req.query.id) < 299) {
    //const filename = util.format("%08d", Number(req.query.id));

    //const formattedNumber = ("0000600" + Number(req.query.id)).slice(-8);

    //Number(req.query.id).padStart(2, "0");

    //imagesrc = 'https://granderby.io/nft/horse/Hrs_00006000.png';

    var formattedNumber = req.query.id + '';
    while (formattedNumber.length < 3) {
      formattedNumber = '0' + formattedNumber;
    }
    formattedNumber = '00006' + formattedNumber;

    imagesrc = 'https://granderby.io/nft/horse/Hrs_' + formattedNumber + '.png';
  } else {
    imagesrc = 'https://granderby.io/nft/horse/Hrs_00006000.png';
  }

  if (Number(req.query.id) >= 300 && Number(req.query.id) < 500) {
    var formattedNumber = Number(req.query.id) - 300 + '';

    while (formattedNumber.length < 3) {
      formattedNumber = '0' + formattedNumber;
    }

    formattedNumber = '00100' + formattedNumber;

    console.log('formattedNumber', formattedNumber);

    imagesrc = 'https://granderby.io/nft/horse/Hrs_' + formattedNumber + '.png';
  } else if (Number(req.query.id) >= 600 && Number(req.query.id) < 1500) {
    //const filename = util.format("%08d", Number(req.query.id));

    //const formattedNumber = ("0000600" + Number(req.query.id)).slice(-8);

    //Number(req.query.id).padStart(2, "0");

    //imagesrc = 'https://granderby.io/nft/horse/Hrs_00006000.png';

    // 1200 => 002001200

    //var formattedNumber = req.query.id + '';
    //while (formattedNumber.length < 3) {
    //  formattedNumber = '0' + formattedNumber;
    //}

    var formattedNumber = Number(req.query.id) - 600 + '';

    while (formattedNumber.length < 3) {
      formattedNumber = '0' + formattedNumber;
    }

    formattedNumber = '00200' + formattedNumber;

    console.log('formattedNumber', formattedNumber);

    imagesrc = 'https://granderby.io/nft/horse/Hrs_' + formattedNumber + '.png';
  } else {
    imagesrc = 'https://granderby.io/nft/horse/Hrs_00006000.png';
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

  const nftData = {
    id: req.query.id,
    name: 'Granderby Horse #' + req.query.id,
    description: 'Granderby NFT Horses',
    //image: 'https://granderby.io/nft/horse/Hrs_00006000.png',
    image: imagesrc,
    ///attributes: [{ trait_type: 'Grade', value: grade }],
    attributes: [
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
  };

  res.status(200).json(nftData);

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
