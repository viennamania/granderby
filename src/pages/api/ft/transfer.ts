import { NextApiRequest, NextApiResponse } from 'next';

import { ThirdwebSDK, ChainId } from '@thirdweb-dev/sdk';

import { tokenContractAddressUSDC } from '@/config/contractAddresses';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.body;

  if (method === 'transferToken') {
    const { signer, toAddress, amount } = req.body;

    /*
    if (!userToken || !username || !img || !betAmount || !selectedSide) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }
    const { _id: userId } = await authFromServer(userToken);
    */

    const sdk = ThirdwebSDK.fromSigner(signer, {
      chainId: ChainId.Polygon,
      clientId: process.env.THIRDWEB_CLIENT_ID,
      gasless: {
        relayer: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL,
      },
    });

    const tokenContractUSDC = await sdk.getContract(
      tokenContractAddressUSDC,
      'token'
    );

    try {
      const transaction = await tokenContractUSDC?.erc20.transfer(
        toAddress,
        amount
      );

      console.log(`🌊 Sent transaction with hash: ${transaction?.receipt}`);

      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error(error);

      return res.status(400).json({ message: 'Bad Request' });
    }
  }
}
