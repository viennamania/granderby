import {
  getTransferHistoryByHolder,
  getTransferHistoryLatestByHolder,
  getNftTransferHistoryByHolder,
  getDailyVolumnByHolder,
  getDailyVolumn,
  getDailyVolumnForContract,
} from '@/utils/models/game-model';

import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.body;

  //console.log('method', method);

  if (method === 'getAll') {
    const { address } = req.body;

    //console.log('horse history transfer tokenId', tokenId);

    const all = await getTransferHistoryByHolder(address);

    //console.log('getAllByTokenId all', all);

    if (!all) return res.status(400).json({ status: false, message: 'Error' });

    const total = all.length;

    return res.status(200).json({ status: true, all, total });
  }

  if (method === 'getLatest') {
    const { limit, address } = req.body;

    //console.log('horse history transfer tokenId', tokenId);

    const all = await getTransferHistoryLatestByHolder(limit, address);

    //console.log('getAllByTokenId all', all);

    if (!all) return res.status(400).json({ status: false, message: 'Error' });

    const total = all.length;

    return res.status(200).json({ status: true, all, total });
  }

  if (method === 'getVolumn') {
    const { address } = req.body;

    console.log('getVolumn address', address);

    if (address) {
      const all = await getDailyVolumnByHolder(address.toLowerCase());

      if (!all)
        return res.status(400).json({ status: false, message: 'Error' });

      const total = all.length;

      return res.status(200).json({ status: true, all, total });
    }

    //const test = await getDailyVolumnForContract();

    //console.log('getVolumn test', test);

    const all = await getDailyVolumn();

    console.log('getVolumn all', all);

    if (!all) return res.status(400).json({ status: false, message: 'Error' });

    const total = all.length;

    return res.status(200).json({ status: true, all, total });
  }
}
