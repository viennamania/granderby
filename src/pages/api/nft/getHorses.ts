// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { getAllHorses } from '@/utils/models/horse-model';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  const { method } = req.query;

  const response = await getAllHorses();

  ////console.log('response', response);

  ///return res.status(200).json({ success: true, nfts: response, pageKey: 'aaaaa' });

  return res
    .status(200)
    .json({ success: true, nfts: response, pageKey: 'aaaaa' });
}
