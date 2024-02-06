// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { NextResponse, NextRequest } from 'next/server';

/* check access IP address  and response ip address */

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
  res.status(200).json({ ip: ip });
}

/*

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe jooo' });
}
*/
