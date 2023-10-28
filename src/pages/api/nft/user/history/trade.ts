import { NextApiRequest, NextApiResponse } from 'next';

import {
  getSaleHistory,
  getSaleHistoryByTokenId,
  getUserDailyTradePrice,
} from '@/utils/models/sale-model';
import { add } from 'lodash';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.body;

  //console.log('method', method);

  if (method === 'getAll') {
    const { tokenId } = req.body;

    //console.log('history handler tokenId', tokenId);

    const all = await getSaleHistory();

    //console.log('getAllByTokenId all', all);

    if (!all) return res.status(400).json({ status: false, message: 'Error' });

    const total = all.length;

    return res.status(200).json({ status: true, all, total });
  }

  if (method === 'getAllByTokenId') {
    const { tokenId } = req.body;

    //console.log('history handler tokenId', tokenId);

    const all = await getSaleHistoryByTokenId(tokenId);

    //console.log('getAllByTokenId all', all);

    if (!all) return res.status(400).json({ status: false, message: 'Error' });

    const total = all.length;

    return res.status(200).json({ status: true, all, total });
  }

  if (method === 'getUserDailyTradePrice') {
    const { address } = req.body;

    //console.log('getUserDailyTradePrice address', address);

    const all = await getUserDailyTradePrice(address);

    //console.log('getUserDailyTradePrice all', all);

    if (!all) return res.status(400).json({ status: false, message: 'Error' });

    const total = all.length;

    return res.status(200).json({ status: true, all, total });
  }
}
