// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

//import { getOneHorse } from '@/utils/models/horse-model';
import { getAllHorses, getOneHorse } from '@/utils/models/horse-model';
import { da } from 'date-fns/locale';

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
  const holder = req.body.holder;

  console.log('getBalanceByHolder holder', holder);

  if (!holder) {
    res.status(400).json({ error: 'Missing holder' });
    return;
  }

  //const data = (await getOneHorse(tokenId as string)) as any;

  const q = '';
  const pageNumber = 1;
  const pageSize = 100;
  const grades = '';
  const manes = '';
  const sort = 'asc';

  const data = await getAllHorses(
    q,
    Number(pageNumber),
    Number(pageSize),
    grades,
    manes,
    holder,
    sort
  );

  ///console.log('getBalanceByHolder data', data);

  ////console.log('getOneByTokenId horse', horse);

  if (!data) {
    res.status(404).json({ error: 'Horse not found' });
    return;
  }

  //let manyUid = '';

  /*
  data?.nfts?.map(async (nft: any) => {
    const tokenId = nft?.nft?.tokenId;

    console.log('tokenId', tokenId);


    const data = (await getOneHorse(tokenId as string)) as any;

    console.log('data?.horse?.liveHorseInfo', data?.horse?.liveHorseInfo);

    const uid = data?.horse?.liveHorseInfo?.HORSE_UID?.slice(1);

    console.log('uid', uid);

    
    if (uid) {
      manyUid += uid + ',';
    }

  })
  */

  // data?.nfts is an array of nfts
  // for each nft, get the tokenId
  // get the horse by tokenId
  // and then get the uid list

  let manyUid = '';
  const nfts = data?.nfts as any;
  for (let i = 0; i < nfts.length; i++) {
    const tokenId = nfts[i]?.nft?.tokenId;

    console.log('tokenId', tokenId);

    const data = (await getOneHorse(tokenId as string)) as any;

    ///console.log('data?.horse?.liveHorseInfo', data?.horse?.liveHorseInfo);

    const uid = data?.horse?.liveHorseInfo?.HORSE_UID?.slice(1);

    ///console.log('uid', uid);

    if (uid) {
      // last uid has no comma
      ///manyUid += uid + ',';

      if (i === nfts.length - 1) {
        manyUid += uid;
      } else {
        manyUid += uid + ',';
      }
    }
  }

  console.log('manyUid', manyUid);

  const response = await fetch(
    `http://3.38.2.94:3001/api/balanceByManyHorseUid?manyUid=${manyUid}`
  );

  const data2 = await response?.json();

  res.status(200).json(data2);

  // get balance from api
  // http://3.38.2.94:3001/api/balanceByHorseUid?uid=2262
  /*
  const uid = data?.horse?.liveHorseInfo?.HORSE_UID?.slice(1);

  if (!uid) {
    res.status(404).json({ error: 'Horse uid not found' });
    return;
  }

  console.log('uid', uid);

  const result = await fetch(
    `http://3.38.2.94:3001/api/balanceByHorseUid?uid=${uid}`
  );

  const balanceData = await result.json();

  const horseBalance = parseInt(balanceData?.recordset[0]?.Horse_balance);

  console.log('balance', horseBalance);

  ///console.log('getOneByTokenId horse', horse);

  res.status(200).json({
    balance: horseBalance,
  });
  */
}
