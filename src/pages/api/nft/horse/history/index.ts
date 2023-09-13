import { getSaleHistoryByTokenId } from '@/utils/models/sale-model';

import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.body;

  //console.log('method', method);

  if (method === 'getAllByTokenId') {
    const { tokenId } = req.body;

    //console.log('history handler tokenId', tokenId);

    const all = await getSaleHistoryByTokenId(tokenId);

    //console.log('getAllByTokenId all', all);

    if (!all) return res.status(400).json({ status: false, message: 'Error' });
    return res.status(200).json({ status: true, all });
  }
}
