// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { getOneHorse } from '@/utils/models/horse-model';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  //const tokenId = req.query.tokenId;

  // POST tokenId
  const tokenId = req.body.tokenId;

  console.log('getBalanceByTokenId tokenId', tokenId);

  if (!tokenId) {
    res.status(400).json({ error: 'Missing tokenId' });
    return;
  }

  const data = (await getOneHorse(tokenId as string)) as any;

  ////console.log('getOneByTokenId horse', horse);

  if (!data) {
    res.status(404).json({ error: 'Horse not found' });
    return;
  }

  // get balance from api
  // http://3.38.2.94:3001/api/balanceByHorseUid?uid=2262

  const uid = data?.horse?.liveHorseInfo?.HORSE_UID;

  console.log('uid', uid);

  if (!uid) {
    res.status(404).json({ error: 'Horse uid not found' });
    return;
  }

  console.log('uid========', uid);

  const result = await fetch(
    `http://3.38.2.94:3001/api/balanceByHorseUid?uid=${uid}`
  );

  const balanceData = await result.json();

  ///console.log('balanceData', JSON.stringify(balanceData, null, 2));

  const horseBalance = parseInt(balanceData?.recordset[0]?.Horse_balance);

  console.log('balance', horseBalance);

  ///console.log('getOneByTokenId horse', horse);

  const result2 = await fetch(
    ////`http://3.38.2.94:3001/api/balanceByHorseUid?uid=${uid}`

    `http://3.38.2.94:3001/api/horse/allowance?uid=${uid}`
  );

  const json = await result2.json();

  ///console.log('getOneByTokenId horse', horse);

  //res.status(200).json({
  //  balanceHistory: json?.recordset,
  //});
  //console.log('json?.recordset[0]', json?.recordset[0]);

  ///const latestAmount = json?.recordset[0]?.Amount;

  let latestAmount = 0;
  // find yesterday's amount
  // yesterday's amount is the latest amount which is completed
  // Payment_Date is the date of the transaction
  // from now to yesterday
  // check daydiff = 1 and Payment_Status = 1

  ///console.log('json?.recordset', json?.recordset);

  json?.recordset.forEach((element: any) => {
    if (
      element?.Payment_Status === 1 &&
      new Date(element?.Payment_Date).toDateString() ===
        new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()
    ) {
      latestAmount = element?.Amount;
    }
  });

  //   completed balance
  // sum of all the completed transactions

  let accumulatedBalance = 0;

  json?.recordset.forEach((element: any) => {
    if (element?.Payment_Status === 1) {
      //console.log('element?.Amount', element?.Amount);

      accumulatedBalance = accumulatedBalance + parseInt(element?.Amount);
    }
  });

  console.log('accumulatedBalance', accumulatedBalance);
  console.log('latestAmount', latestAmount);

  res.status(200).json({
    accumulatedBalance: accumulatedBalance,
    balance: horseBalance,
    latestAmount: latestAmount,
  });
}
