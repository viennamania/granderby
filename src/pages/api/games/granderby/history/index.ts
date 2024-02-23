import { getAll, getRank, getRankByHorseId } from '@/utils/models/game-model';

import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.body;

  if (method === 'getHistoryByHorseId') {
    const { horseId } = req.body;

    const all = await getRankByHorseId(horseId);

    if (!all) return res.status(400).json({ status: false, message: 'Error' });
    return res.status(200).json({ status: true, all });
  } else {
    //const all = await getAll();
    const all = await getRank();

    if (!all) return res.status(400).json({ status: false, message: 'Error' });
    return res.status(200).json({ status: true, all });
  }

  //console.log(all);
}
