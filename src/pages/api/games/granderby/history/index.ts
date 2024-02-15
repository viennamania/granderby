import { getAll } from '@/utils/models/game-model';

import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  ///const { method } = req.body;

  console.log('/api/games/granderby/history/index.ts');

  const all = await getAll();
  if (!all) return res.status(400).json({ status: false, message: 'Error' });
  return res.status(200).json({ status: true, all });
}
