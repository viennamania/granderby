import {
  newHorseHistory,
  getHorseHistory,
  getHorseLastHistory,
} from '@/utils/models/npcRace/history';
import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.body;

  if (method === 'createNew') {
    const { winnerHorse, placements } = req.body;
    const createNew = await newHorseHistory(winnerHorse, placements);
    if (!createNew)
      return res.status(400).json({ status: false, message: 'Error' });
    return res.status(200).json({ status: true, createNew });
  }
  if (method === 'getAll') {
    const all = await getHorseHistory();
    if (!all) return res.status(400).json({ status: false, message: 'Error' });
    return res.status(200).json({ status: true, all });
  }
  if (method === 'getLast') {
    const lastGame = await getHorseLastHistory();
    if (!lastGame) {
      return res.status(200).json({
        status: false,
        message: 'No game has been played yet',
      });
    } else {
      return res.status(200).json({ status: true, lastGame });
    }
  }
}
