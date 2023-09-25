import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

import { format } from 'date-fns';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get('id');
  if (!id) {
    return new ImageResponse(<>{'Visit with "?username=vercel"'}</>, {
      width: 1200,
      height: 630,
    });
  }

  const imageUrl = 'https://granderby.io/images/profile-cover-horse.jpg';

  const imageUrl1 = 'https://granderby.io/images/NFT/nft_04.jpg';
  const imageUrl2 = 'https://granderby.io/images/NFT/nft_07.jpg';
  const imageUrl3 = 'https://granderby.io/images/NFT/nft_10.jpg';
  const imageUrl4 = 'https://granderby.io/images/NFT/nft_14.jpg';
  const imageUrl5 = 'https://granderby.io/images/NFT/nft_16.jpg';

  {
    /*
  const res = await fetch('https://granderby.io/api/nft/horse/' + id, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    //body: JSON.stringify(formInputs),
  });

  const data = await res.json();

  const imageUrl = data?.image;

  const name = data?.name;

  const res2 = await fetch('https://granderby.io/api/nft/horse/history/price', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      method: 'getAllByTokenId',
      tokenId: tokenid,
    }),
  });

  const data2 = await res2.json();

  var blockTimestamp = '';
  var totalPricePaid = '0';
  var paidToken = '';

  if (data2?.all[0]) {
    blockTimestamp = data2?.all[0].blockTimestamp;

    if (paidToken === '0x0000000000000000000000000000000000001010') {
      totalPricePaid = (
        Number(data2?.all[0].totalPricePaid) / 1000000000000000000
      ).toFixed(2);
      paidToken = 'MATIC';
    } else {
      totalPricePaid = (Number(data2?.all[0].totalPricePaid) / 1000000).toFixed(
        2
      );

      paidToken = 'USDT';
    }
  }
  */
  }

  return new ImageResponse(
    (
      <div
        style={{
          color: 'black',
          background: '#ffffff',
          width: '100%',
          height: '100%',
          padding: 0,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="avatar"
          width="1100"
          src={imageUrl}
          style={{
            borderRadius: 0,
          }}
        />

        <div
          style={{
            color: 'black',
            background: '#ffffff',
            width: '100%',
            padding: 0,
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="avatar"
            width="50"
            src={imageUrl1}
            style={{
              borderRadius: 10,
              padding: 2,
            }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="avatar"
            width="50"
            src={imageUrl2}
            style={{
              borderRadius: 10,
              padding: 2,
            }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="avatar"
            width="50"
            src={imageUrl3}
            style={{
              borderRadius: 10,
              padding: 2,
            }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="avatar"
            width="50"
            src={imageUrl4}
            style={{
              borderRadius: 10,
              padding: 2,
            }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="avatar"
            width="50"
            src={imageUrl5}
            style={{
              borderRadius: 10,
              padding: 2,
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
