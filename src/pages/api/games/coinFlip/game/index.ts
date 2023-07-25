import {
  getAllCoinFlips,
  getCoinStreak,
  insertCoinFlipGame,
} from '@/utils/models/coinFlip';
import {
  getUser,
  makeWinDepositCoin,
  makeWithdrawCoin,
} from '@/utils/models/user-model';
import { authFromServer } from '@/utils/services/useAuth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.query;

  if (method === 'set') {
    const { token, pickedSide, betAmount, betResult } = req.body;
    if (!token || !pickedSide || !betAmount || !betResult)
      return res
        .status(400)
        .json({ status: false, message: 'Missing parameters.' });
    const { _id: userId } = await authFromServer(token);
    const user = await getUser(userId);
    if (!user.success)
      return res.status(400).json({ status: false, message: user.message });
    if (Number(user.user.deposit) < betAmount)
      return res
        .status(400)
        .json({ status: false, message: 'Insufficient funds.' });

    const insertedGame = await insertCoinFlipGame(
      userId,
      pickedSide,
      user.user.username,
      user.user.img,
      betAmount,
      betResult
    );
    if (!insertedGame.success)
      return res
        .status(400)
        .json({ status: false, message: insertedGame.message });

    if (betResult === 'win') {
      const deposit = await makeWinDepositCoin(user.user._id, betAmount);
      if (!deposit.success)
        return res
          .status(400)
          .json({ status: false, message: deposit.message });
    } else {
      const deposit = await makeWithdrawCoin(user.user._id, betAmount);
      if (!deposit.success)
        return res
          .status(400)
          .json({ status: false, message: deposit.message });
    }

    return res.status(200).json({ status: true, game: insertedGame.game });
  }

  if (method === 'streak') {
    const streak = await getCoinStreak();
    return res.status(200).json({ status: true, streak });
  }

  if (method === 'list') {
    let lastGames;
    if (req.query.limit !== undefined) {
      lastGames = await getAllCoinFlips(Number(req.query.limit));
    } else {
      lastGames = await getAllCoinFlips();
    }
    res.status(200).json(lastGames);
  }
}
