// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

//import { NFTList } from '@/data/static/nft-horse-list';

/*
type Data = {
  name: string;
};
*/

export default async function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  /*
  const found = NFTList.find((element: any) => element.id === req.query.id);

  res.status(200).json(found);
*/

  const walletAddress = req.query.address;

  /*

curl --request POST \
     --url https://withpaper.com/api/2022-08-12/checkout-sdk-intent \
     --header 'Authorization: Bearer c306527a-68c9-4e47-8d2b-ecad15f697a8' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "contractId": "39616f9c-1017-44f5-80dd-e3819708e570",
  "walletAddress": "0x54C19eD3D131307e5D6B50d28Ea1E7A12ac52Af0",
  "title": "Mumbai Example",
  "quantity": 1,
  "expiresInMinutes": 15,
  "metadata": {},
  "mintMethod": {
    "name": "claimTo",
    "args": {
      "_to": "$WALLET",
      "_quantity": "$QUANTITY",
      "_tokenId": 0
    },
    "payment": {
      "currency": "MATIC",
      "value": "0.001 * $QUANTITY"
    }
  },
  "feeBearer": "BUYER",
  "sendEmailOnTransferSucceeded": true,
  "capturePaymentLater": false
}
'
  */
  /*
 <?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://withpaper.com/api/2022-08-12/checkout-sdk-intent', [
  'body' => '{"contractId":"39616f9c-1017-44f5-80dd-e3819708e570","walletAddress":"0x54C19eD3D131307e5D6B50d28Ea1E7A12ac52Af0","title":"Mumbai Example","quantity":1,"expiresInMinutes":15,"metadata":{},"mintMethod":{"name":"claimTo","args":{"_to":"$WALLET","_quantity":"$QUANTITY","_tokenId":0},"payment":{"currency":"MATIC","value":"0.001 * $QUANTITY"}},"feeBearer":"BUYER","sendEmailOnTransferSucceeded":true,"capturePaymentLater":false}',
  'headers' => [
    'Authorization' => 'Bearer c306527a-68c9-4e47-8d2b-ecad15f697a8',
    'accept' => 'application/json',
    'content-type' => 'application/json',
  ],
]);

echo $response->getBody();
*/

  console.log('checkout API walletAddress', walletAddress);

  const resp = await fetch(
    'https://withpaper.com/api/2022-08-12/checkout-sdk-intent',
    {
      method: 'POST',
      headers: {
        Authorization: 'Bearer c306527a-68c9-4e47-8d2b-ecad15f697a8',
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        contractId: '39616f9c-1017-44f5-80dd-e3819708e570', //from the Contract Registration endpoint
        walletAddress: walletAddress,
      }),
    }
  );

  if (resp.ok) {
    const { sdkClientSecret } = await resp.json();
    // Pass this sdkClientSecret to your frontend 👇

    //console.log("sdkClientSecret", sdkClientSecret);

    res.status(200).json({ sdkClientSecret: sdkClientSecret });

    ////res.status(200).json({ success: true });
  } else {
    res.status(500).send({
      message: 'something went wrong, check the log in your terminal',
    });
  }

  //res.status(200).json( NFTList[ req.query.id ] )

  //const found = NFTList.find((element: any) => element.id === req.query.id);

  //res.status(200).json(found);

  //res.status(200).json({ name: req.query.id })

  /*
    const json = '{
        "id": "19",
        "name":"Granderby Horse #19",
        "description":"Granderby NFT Horses",
        "image":"https://granderby-delta.vercel.app/Hrs_00006000.png",
        "attributes":
        [
          {"trait_type":"Size","value":"large"},
  
          {"trait_type":"Age","value":42},
          {"trait_type":"Grade","value":6},
          {"trait_type":"Training","value":45},
          {"trait_type":"Trend","value":9},
          
          {"trait_type":"Speed","value":77,"max_value":100},
          {"trait_type":"Overtaking","value":45,"max_value":100},
          {"trait_type":"S-Karrots","value":5,"display_type":"boost_number"}
        ]
      }

    ';
      */

  ////res.status(200).json({ name: 'hello' });
}
