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

  console.log('getOneByTokenId tokenId', tokenId);

  if (!tokenId) {
    res.status(400).json({ error: 'Missing tokenId' });
    return;
  }

  const data = (await getOneHorse(tokenId as string)) as any;

  ///console.log('getOneByTokenId horse', data);

  if (!data) {
    res.status(404).json({ error: 'Horse not found' });
    return;
  }

  res.status(200).json(data);

  // get balance from api
  // http://3.38.2.94:3001/api/balanceByHorseUid?uid=2262

  /*
  const horseInfo = data?.horse;

 
  const uid = data?.horse?.liveHorseInfo?.HORSE_UID?.slice(1);



  if (!uid) {
    res.status(404).json({ error: 'Horse uid not found' });
    return;
  }

  console.log('uid', uid);


  const result = await fetch(`http://3.38.2.94:3001/api/balanceByHorseUid?uid=${uid}`);

  const balanceData = await result.json();


  const horseBalance = parseInt(balanceData?.recordset[0]?.Horse_balance);

  console.log('balance', horseBalance);


  ///console.log('getOneByTokenId horse', horse);

  res.status(200).json(




    {
      tokenId: data?.tokenId,
      horse: {
        name: horseInfo?.name,
        tokenId: data?.tokenId,
        uid: uid,
        balance: horseBalance,
        liveHorseInfo: horseInfo?.liveHorseInfo,
        birth: horseInfo?.birth,
        breed: horseInfo?.breed,
        color: horseInfo?.color,



 
    
  );

  */
}
