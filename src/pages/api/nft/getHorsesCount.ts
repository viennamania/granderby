// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { getAllHorsesCount } from '@/utils/models/horse-model';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  const { grades, manes, holder } = req.body;

  //console.log('getHorses grades', grades);
  //console.log('getHorses manes', manes);
  //console.log('getHorses holder', holder);

  const data = await getAllHorsesCount(grades, manes, holder);

  const total = data.total;

  res.status(200).json({
    total: total,
  });
}
