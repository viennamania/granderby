import { getTransferHistoryByTokenId } from '@/utils/models/transfer-model';

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

    const all = await getTransferHistoryByTokenId(tokenId);

    //console.log('getAllByTokenId all', all);

    if (!all) return res.status(400).json({ status: false, message: 'Error' });

    const total = all.length;

    return res.status(200).json({ status: true, all, total });
  }
}
