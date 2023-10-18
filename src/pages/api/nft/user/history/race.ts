import { getDailyWinPrize } from '@/utils/models/horseRace/history';

import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.body;

  console.log('/api/nft/user/history/race ====method', method);

  if (method === 'getWinPrize') {
    const all = await getDailyWinPrize();

    ///console.log('getWinPrize all', all);

    if (!all) return res.status(400).json({ status: false, message: 'Error' });

    const total = all.length;

    return res.status(200).json({ status: true, all, total });
  }
}
