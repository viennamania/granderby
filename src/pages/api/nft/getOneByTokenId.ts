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

  if (!tokenId) {
    res.status(400).json({ error: 'Missing tokenId' });
    return;
  }

  ///console.log('getOneByTokenId tokenId', tokenId);

  const horse = await getOneHorse(tokenId as string);

  let gameHorseKey = '';

  if (Number(tokenId) === 0) {
    gameHorseKey = '00000000';
  } else if (Number(tokenId) === 1) {
    gameHorseKey = '00000001';
  } else if (Number(tokenId) === 2) {
    gameHorseKey = '00000002';
  } else if (Number(tokenId) === 3) {
    gameHorseKey = '00000003';
  } else if (Number(tokenId) === 4) {
    gameHorseKey = '00000004';
  } else if (Number(tokenId) === 5) {
    gameHorseKey = '00000005';
  } else if (Number(tokenId) === 6) {
    gameHorseKey = '00000006';
  } else if (Number(tokenId) === 7) {
    gameHorseKey = '00000007';
  } else if (Number(tokenId) === 8) {
    gameHorseKey = '00000008';
  } else if (Number(tokenId) === 9) {
    gameHorseKey = '00000009';
  } else if (Number(tokenId) === 10) {
    gameHorseKey = '00000010';
  } else {
    //console.log('tokenId', tokenId);

    // A Grade
    if (Number(tokenId) >= 11 && Number(tokenId) <= 58) {
      console.log('A Grade tokenId', tokenId);

      var formattedNumber = Number(tokenId) - 11 + '';
      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '00001' + formattedNumber;

      gameHorseKey = '' + formattedNumber + '';

      // B Grade
    } else if (Number(tokenId) >= 59 && Number(tokenId) <= 299) {
      //console.log('B Grade tokenId', tokenId);

      //const filename = util.format("%08d", Number(tokenId));

      //const formattedNumber = ("0000600" + Number(tokenId)).slice(-8);

      //Number(tokenId).padStart(2, "0");

      //gameHorseKey = '00006000';

      var formattedNumber = Number(tokenId) - 59 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '0002' + formattedNumber;

      gameHorseKey = '' + formattedNumber + '';
    } else {
      gameHorseKey = '00006000';
    }

    // C Grade
    if (Number(tokenId) >= 300 && Number(tokenId) <= 599) {
      var formattedNumber = Number(tokenId) - 300 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00100' + formattedNumber;

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 600 && Number(tokenId) < 1000) {
      var formattedNumber = Number(tokenId) - 600 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00200' + formattedNumber;

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 1000 && Number(tokenId) < 1800) {
      var formattedNumber = Number(tokenId) - 600 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0020' + formattedNumber;

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 1800 && Number(tokenId) < 1805) {
      var formattedNumber = Number(tokenId) - 1700 + '';

      while (formattedNumber.length < 5) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '000' + formattedNumber;
      //formattedNumber = '00000000';

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 1805 && Number(tokenId) < 1810) {
      var formattedNumber = Number(tokenId) - 1700 + '';

      while (formattedNumber.length < 5) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0000' + formattedNumber;
      //formattedNumber = '00000000';

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 1815 && Number(tokenId) < 1915) {
      var formattedNumber = Number(tokenId) - 1700 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00001' + formattedNumber;
      //formattedNumber = '00000000';

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 1915 && Number(tokenId) < 2115) {
      //var formattedNumber = Number(tokenId) - 1800 + 59 + '';

      var formattedNumber = Number(tokenId) - 1915 + 241 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '0002' + formattedNumber;

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 2115 && Number(tokenId) < 2645) {
      //var formattedNumber = Number(tokenId) - 2000 + '';
      var formattedNumber = Number(tokenId) - 1700 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00100' + formattedNumber;

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else if (Number(tokenId) >= 2645 && Number(tokenId) < 5000) {
      var formattedNumber = Number(tokenId) - 1000 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0020' + formattedNumber;
      //formattedNumber = '00000000';

      console.log('formattedNumber', formattedNumber);

      gameHorseKey = '' + formattedNumber + '';
    } else {
      ////gameHorseKey = '00006000';
    }
  }

  res.status(200).json(horse);

  ///res.status(200).json(horse);
}
