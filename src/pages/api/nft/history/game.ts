import {
  getTransferHistory,
  getTransferHistoryByHolder,
  getTransferHistoryLatestByHolder,
  getNftTransferHistoryByHolder,
  getTransferHistoryLatest,
} from '@/utils/models/game-model';

import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.body;

  console.log('/api/nft/history/game method', method);

  if (method === 'getAll') {
    //console.log('horse history transfer tokenId', tokenId);

    const all = await getTransferHistory();

    //console.log('getAllByTokenId all', all);

    if (!all) return res.status(400).json({ status: false, message: 'Error' });

    const total = all.length;

    return res.status(200).json({ status: true, all, total });
  }

  if (method === 'getLatest') {
    const { limit } = req.body;

    //console.log('horse history transfer tokenId', tokenId);

    const all = await getTransferHistoryLatest(limit);

    ///console.log('getTransferHistoryLatest all', all);

    if (!all) return res.status(400).json({ status: false, message: 'Error' });

    const total = all.length;

    return res.status(200).json({ status: true, all, total });
  }
}
