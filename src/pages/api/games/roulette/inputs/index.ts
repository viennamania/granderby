import {
  getRouletteInputs,
  updateRouletteInputs,
} from '@/utils/models/roulette/inputs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.query;

  if (method === 'set') {
    const { input1, input2, input3, input4, input5, input6 } = req.body;
    if (!input1 || !input2 || !input3 || !input4 || !input5 || !input6)
      return res.status(400).json({ message: 'Missing input(s)' });

    const newRouletteInputs = await updateRouletteInputs(
      input1,
      input2,
      input3,
      input4,
      input5,
      input6
    );
    res.status(200).json({ status: true, message: 'Roulette inputs updated' });
  }

  if (method === 'get') {
    const rouletteInputs = await getRouletteInputs();
    res.status(200).json(rouletteInputs);
  }
}
