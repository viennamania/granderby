import {
  getHorseInputs,
  updateHorseInputs,
} from '@/utils/models/horseRace/horses';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.query;

  if (method === 'set') {
    const { input1, input2, input3, input4, input5, input6 } = req.body;
    if (!input1 || !input2 || !input3 || !input4 || !input5 || !input6)
      return res
        .status(400)
        .json({ status: false, message: 'Missing input(s)' });
    const result = await updateHorseInputs(
      input1,
      input2,
      input3,
      input4,
      input5,
      input6
    );
    return res.status(200).json({ status: true, result });
  }

  if (method === 'get') {
    const inputs = await getHorseInputs();
    return res.status(200).json({ status: true, inputs });
  }
}
