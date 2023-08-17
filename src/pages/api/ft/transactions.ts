import { getAllTransactions } from '@/utils/models/transaction-model';

import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //const { method } = req.body;

  /*
          const formInputs = {
          pageKey: pageKey,
          pageSize: pageSize,
          contract: tokenContractAddressROM,
          address: address,
        };
  */

  const { pageKey, pageSize, contract, address } = req.body;

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  ///if (method === 'getAll') {

  const transactions = await getAllTransactions(
    pageKey,
    pageSize,
    contract,
    address
  );

  ////console.log('transactions', transactions);

  if (!transactions)
    return res.status(400).json({ status: false, message: 'Error' });

  return res.status(200).json({ status: true, data: transactions });

  ///}
}
