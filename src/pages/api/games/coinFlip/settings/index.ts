import {
  editCoinFlipSettings,
  getCoinFlipSettings,
} from '@/utils/models/coinFlip/settings';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.query;
  if (method === 'all') {
    const settings = await getCoinFlipSettings();
    return res.status(200).json({ status: true, settings });
  }

  if (method === 'set') {
    const {
      wallet,
      winRate,
      amount1,
      amount2,
      amount3,
      amount4,
      amount5,
      amount6,
    } = req.body;
    const result = await editCoinFlipSettings(
      wallet,
      winRate,
      amount1,
      amount2,
      amount3,
      amount4,
      amount5,
      amount6
    );
    return res.status(200).json({ status: true, result });
  }

  return res.status(405).json({ status: false, message: 'Method not allowed' });
}
