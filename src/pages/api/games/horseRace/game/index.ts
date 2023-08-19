import {
  newGameHorse,
  getHorseGames,
  deleteAllHorseGames,
  deleteOneHorseGame,
  getHorseGameByUserId,
} from '@/utils/models/horseRace/game';
import { authFromServer } from '@/utils/services/useAuth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.body;

  if (method === 'newGame') {
    const { userToken, username, img, betAmount, selectedSide } = req.body;

    /*
    if (!userToken || !username || !img || !betAmount || !selectedSide) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }
    const { _id: userId } = await authFromServer(userToken);
    */

    const userId = userToken;

    const addedGame = await newGameHorse(
      userId,
      username,
      img,
      betAmount,
      selectedSide
    );
    if (addedGame.success) {
      return res.status(200).json({ message: 'Success', addedGame });
    }
    return res.status(400).json({ message: addedGame.message });
  }

  if (method === 'getGames') {
    /*
    const games = await getHorseGames();

    if (games) {
      return res.status(200).json({ message: 'Success', games });
    }
    return res.status(400).json({ message: 'Action Failed' });
    */

    // for bug fix

    const games = {};

    return res.status(200).json({ message: 'Success', games });
  }

  if (method === 'deleteGames') {
    const games = await deleteAllHorseGames();
    if (games) {
      return res.status(200).json({ message: 'Success' });
    }
    return res.status(400).json({ message: 'Action Failed' });
  }

  if (method === 'deleteOne') {
    const { userId, selectedSide } = req.body;
    if (!userId || !selectedSide) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }
    const game = await deleteOneHorseGame(userId, selectedSide);
    if (game) {
      return res.status(200).json({ message: 'Success' });
    }
    return res.status(400).json({ message: 'Action Failed' });
  }
  if (method === 'getGameByToken') {
    const { userId } = req.body;
    if (!userId) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }
    const game = await getHorseGameByUserId(userId);
    if (game) {
      return res.status(200).json({ message: 'Success', game });
    }
    return res.status(400).json({ message: 'Action Failed' });
  }
}
