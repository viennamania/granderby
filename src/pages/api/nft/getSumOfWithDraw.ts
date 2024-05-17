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
  const response = await fetch(`http://3.38.2.94:3001/api/horse/sumOfWithDraw`);

  /*
  {"recordsets":[[{"SumOfWithDraw":20728153}]],"recordset":[{"SumOfWithDraw":20728153}],"output":{},"rowsAffected":[1]}
  */
  const data = await response?.json();

  //console.log('data', data);

  res.status(200).json(data);
}
