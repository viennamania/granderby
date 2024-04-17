// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { getBalanceByHolder } from '@/utils/models/horse-model';

import { da } from 'date-fns/locale';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  //const tokenId = req.query.tokenId;

  // POST tokenId
  const holder = req.body.holder;

  console.log('getHorsesBalanceByHolder holder', holder);

  if (!holder) {
    res.status(400).json({ error: 'Missing holder' });
    return;
  }

  const data = await getBalanceByHolder(holder);

  console.log('data', data);

  ///console.log('getBalanceByHolder data', data);

  res.status(200).json(data);
}
