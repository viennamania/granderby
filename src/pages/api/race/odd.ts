// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { NFTList } from '@/data/static/nft-horse-list';

//const util = require('util');

type Data = {
  name: string;
};

// racing_time
// round
// odd_even
// over_under
// win
// place
// qunalla

/*
{
  "racing_time": "2020-12-21 06:13:05",
  "round": 100,
  "odd_even": [
   "1:1.95",
   "2:1.87"
  ],
  "over_under": [
  "1:2.15",
  "2:1.70"
  ],
   "win": [
    "1:1,3",
    "2:10.4",
    "3:1.7",
    "11:23.0"
   ],
  "place": [
  "1:120.0",
  "2:12.4",
  "3:3.1",
  "4:1.1",
  "11:10.2"
  ],
  "qunalla": [
  "1-2:20.1",
  "1-3:32.4",
  "1-4:18.0",
  "11-12:14.2"
  ]
}
*/

export default function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  // racing_time
  // round
  // odd_even
  // over_under
  // win
  // place
  // qunalla

  /*
  const racing_time = '2020-12-21 06:13:05';
  const round = 100;
  const odd_even = [1.95, 1.87];
  const over_under = [2.15, 1.70];
  const win = [1, 3, 10.4, 1.7, 23.0];
  const place = [120.0, 12.4, 3.1, 1.1, 10.2];
  const qunalla = [20.1, 32.4, 18.0, 14.2];
  */

  ///const reqData = JSON.parse(req.body);

  //console.log(reqData);

  /*
  console.log(reqData.racing_time);
  console.log(reqData.round);
  console.log(reqData.odd_even);
  console.log(reqData.over_under);
  console.log(reqData.win);
  console.log(reqData.place);
  console.log(reqData.qunalla);
  */

  ///console.log(req.query);

  /*
  const racing_time = req.query.racing_time;
  const round = req.query.round;
  const odd_even = req.query.odd_even;
  const over_under = req.query.over_under;
  const win = req.query.win;
  const place = req.query.place;
  const qunalla = req.query.qunalla;

  

  if (
    racing_time === undefined ||
    round === undefined ||
    odd_even === undefined ||
    over_under === undefined ||
    win === undefined ||
    place === undefined ||
    qunalla === undefined
  ) {
    res
      .status(200)
      .json({
        status: 0,
        error: 'INVALID_PARAM',
        message: 'invalid parameter',
      });
    return;
  }
  */

  //res.status(200).json(nftData);

  res.status(200).json({ status: 1 });
}
