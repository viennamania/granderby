import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const tokenid = searchParams.get('tokenid');
  if (!tokenid) {
    return new ImageResponse(<>{'Visit with "?username=vercel"'}</>, {
      width: 1200,
      height: 630,
    });
  }

  const res = await fetch('https://granderby.io/api/nft/horse/' + tokenid, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    //body: JSON.stringify(formInputs),
  });

  const data = await res.json();

  const imageUrl = data?.image;

  const name = data?.name;

  return new ImageResponse(
    (
      <div
        style={{
          color: 'black',
          background: '#ffffff',
          width: '1200',
          height: '100%',
          paddingTop: 10,
          paddingLeft: 15,
          paddingRight: 10,
          paddingBottom: 10,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="avatar"
          width="600"
          src={imageUrl}
          style={{
            borderRadius: 10,
          }}
        />

        <div
          style={{
            fontSize: 30,
            color: 'black',
            paddingLeft: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 30,
              color: 'black',
              paddingLeft: 20,
              display: 'flex',
            }}
          >
            {name}
          </div>
          <p>© momocon</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
