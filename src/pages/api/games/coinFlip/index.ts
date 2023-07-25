import CoinSides from '@/utils/coinFlip/enums/coinSides';
import { getCoinFlipSettings } from '@/utils/models/coinFlip/settings';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @param req NextApiRequest
 * @param res NextApiResponse
 * @returns void
 * @description Flip a coin
 * @example
 * GET /api/flip
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const i: number = Math.random() as number;

  const settings = await getCoinFlipSettings();
  const winRate = settings[0].winRate / 100 ?? 0.5;

  if (req.query.side == CoinSides.HEADS) {
    if (i < winRate) {
      res.status(200).json({ result: CoinSides.HEADS });
    } else {
      res.status(200).json({ result: CoinSides.TAILS });
    }
  } else {
    if (i < winRate) {
      res.status(200).json({ result: CoinSides.TAILS });
    } else {
      res.status(200).json({ result: CoinSides.HEADS });
    }
  }
}
