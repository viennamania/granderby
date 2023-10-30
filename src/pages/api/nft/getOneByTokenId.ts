// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { getOneHorse } from '@/utils/models/horse-model';

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
  const tokenId = req.body.tokenId;

  if (!tokenId) {
    res.status(400).json({ error: 'Missing tokenId' });
    return;
  }

  ///console.log('getOneByTokenId tokenId', tokenId);

  const horse = await getOneHorse(tokenId as string);

  res.status(200).json(horse);
}
