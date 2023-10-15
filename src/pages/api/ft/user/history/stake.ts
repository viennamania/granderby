import {
  getStakeHistory,
  getStakeHistoryByTokenId,
} from '@/utils/models/stake-model';

import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.body;

  //console.log('method', method);

  if (method === 'getAll') {
    //const { tokenId } = req.body;

    //console.log('horse history transfer tokenId', tokenId);

    const all = await getStakeHistory();

    //console.log('getStakeHistory', all);

    if (!all) return res.status(400).json({ status: false, message: 'Error' });

    const total = all.length;

    return res.status(200).json({ status: true, all, total });
  }

  if (method === 'getAllByTokenId') {
    const { tokenId } = req.body;

    //console.log('horse history transfer tokenId', tokenId);

    const all = await getStakeHistoryByTokenId(tokenId);

    //console.log('getAllByTokenId all', all);

    if (!all) return res.status(400).json({ status: false, message: 'Error' });

    const total = all.length;

    return res.status(200).json({ status: true, all, total });
  }
}
