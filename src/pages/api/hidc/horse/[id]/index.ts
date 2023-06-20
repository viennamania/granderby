// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { NFTList } from '@/data/static/nft-horse-list-hidc';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  //res.status(200).json( NFTList[ req.query.id ] )

  //const found = NFTList.find((element: any) => element.id === req.query.id);

  //res.status(200).json(found);

  let grade = '';

  /*
  if (req.query.id) {
    if (Number(req.query.id) >= 0 && Number(req.query.id) <= 5) {
      grade = 'S';
    } else if (Number(req.query.id) >= 6 && Number(req.query.id) <= 25) {
      grade = 'A';
    } else if (Number(req.query.id) >= 26 && Number(req.query.id) <= 165) {
      grade = 'B';
    } else if (Number(req.query.id) >= 166 && Number(req.query.id) <= 565) {
      grade = 'C';
    } else if (Number(req.query.id) >= 566 && Number(req.query.id) <= 1265) {
      grade = 'D';
    }
  }
  */
  grade = 'D';

  const nftData = {
    id: req.query.id,
    name: 'Granderby Horse #' + req.query.id,
    description: 'Granderby NFT Horses',
    image: 'https://granderby.io/nft/horse/Hrs_00006000.png',
    attributes: [{ trait_type: 'Grade', value: grade }],
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
