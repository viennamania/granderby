import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

import { format } from 'date-fns';

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
      totalPricePaid = Number(
        data2?.all[0].totalPricePaid / 1000000000000000000
      ).toFixed(2);
      paidToken = 'MATIC';
    } else {
      totalPricePaid = Number(data2?.all[0].totalPricePaid / 1000000).toFixed(
        2
      );

      paidToken = 'USDT';
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          color: 'black',
          background: '#ffffff',
          width: '100%',
          height: '100%',
          paddingTop: 30,
          paddingLeft: 80,
          paddingRight: 10,
          paddingBottom: 30,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="avatar"
          width="450"
          src={imageUrl}
          style={{
            borderRadius: 30,
          }}
        />

        <div
          style={{
            fontSize: 30,
            color: 'black',
            paddingLeft: 50,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              fontSize: 60,
              color: 'black',
              display: 'flex',
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 80,
              color: 'black',
              display: 'flex',
            }}
          >
            #{tokenid}
          </div>
          <div
            style={{
              fontSize: 50,
              color: 'green',
              display: 'flex',
            }}
          >
            @GRANDERBY
          </div>

          <div
            style={{
              paddingTop: 50,
              fontSize: 30,
              color: 'black',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 70,
              }}
            >
              {totalPricePaid}&nbsp;{paidToken}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 50,
                color: 'green',
              }}
            >
              {format(Date.parse(blockTimestamp || '0'), 'yyy-MM-dd hh:mm:ss')}
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/*
            <img
              alt="stamp"
              width="80"
              src="https://granderby.io/images/market.png"
              //src="https://granderby.io/images/blockchain-stamp-seal.jpeg"
              ///src="http://localhost:3000/images/blockchain-stamp-seal.jpeg"
              style={
                {
                  //borderRadius: 30,
                }
              }
            />
            */}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
