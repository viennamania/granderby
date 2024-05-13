// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { getAllHorses, getAllHorsesCount } from '@/utils/models/horse-model';
import image from '@/components/ui/image';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  ///const { pageNumber, pageSize, q } = req.query;

  const { q, pageNumber, pageSize, grades, manes, holder, sort } = req.body;

  console.log('getHorses q', q);
  console.log('getHorses pageNumber', pageNumber);
  console.log('getHorses pageSize', pageSize);
  console.log('getHorses grades', grades);
  console.log('getHorses sort', sort);
  console.log('getHorses holder', holder);

  //console.log('getHorses grades', grades);
  //console.log('getHorses manes', manes);
  //console.log('getHorses holder', holder);

  const data = await getAllHorses(
    q,
    Number(pageNumber),
    Number(pageSize),
    grades,
    manes,
    holder,
    sort
  );

  ///console.log('getHorses nfts====', data.nfts);

  const pageKey = data?.pageNumber;

  const formattedNfts = data?.nfts?.map((nft: any) => {
    const {
      contract,
      title,
      tokenType,
      tokenId,
      description,
      media,
      rawMetadata,
    } = nft?.nft;

    //console.log("getHorses nft", nft);
    /*

  
    console.log("getHorses nft tokenId", nft.tokenId);
    console.log("getHorses nft _id", nft._id);
    console.log("getHorses nft nft", nft.nft);

    */

    //console.log("getHorses nft holder", nft.holder);

    //console.log("getHorses nft totalPricePaid", nft.totalPricePaid);

    const holder = nft.holder;

    const totalPricePaid = nft.totalPricePaid;
    const paidToken = nft.paidToken;

    const logsNewSale = nft.logsNewSale;

    const register = nft.register;

    const balance = nft.balance;

    const s3url = 'https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/hrs/';

    let grade = '';

    let imagesrc = '';

    let gameHorseName = '';

    if (Number(tokenId) === 0) {
      imagesrc = 'Hrs_00000000.png';
      grade = 'S';
      gameHorseName = '00000000';
    } else if (Number(tokenId) === 1) {
      imagesrc = 'Hrs_00000001.png';
      grade = 'S';
      gameHorseName = '00000001';
    } else if (Number(tokenId) === 2) {
      imagesrc = 'Hrs_00000002.png';
      grade = 'S';
      gameHorseName = '00000002';
    } else if (Number(tokenId) === 3) {
      imagesrc = 'Hrs_00000003.png';
      grade = 'S';
      gameHorseName = '00000003';
    } else if (Number(tokenId) === 4) {
      imagesrc = 'Hrs_00000004.png';
      grade = 'S';
      gameHorseName = '00000004';
    } else if (Number(tokenId) === 5) {
      imagesrc = 'Hrs_00000005.png';
      grade = 'S';
      gameHorseName = '00000005';
    } else if (Number(tokenId) === 6) {
      imagesrc = 'Hrs_00000006.png';
      grade = 'S';
      gameHorseName = '00000006';
    } else if (Number(tokenId) === 7) {
      imagesrc = 'Hrs_00000007.png';
      grade = 'S';
      gameHorseName = '00000007';
    } else if (Number(tokenId) === 8) {
      imagesrc = 'Hrs_00000008.png';
      grade = 'S';
      gameHorseName = '00000008';
    } else if (Number(tokenId) === 9) {
      imagesrc = 'Hrs_00000009.png';
      grade = 'S';
      gameHorseName = '00000009';
    } else if (Number(tokenId) === 10) {
      imagesrc = 'Hrs_00000010.png';
      grade = 'S';
      gameHorseName = '00000010';
    } else {
      //console.log('req.query.id', req.query.id);

      // A Grade
      if (Number(tokenId) >= 11 && Number(tokenId) <= 58) {
        var formattedNumber = Number(tokenId) - 11 + '';
        while (formattedNumber.length < 3) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '00001' + formattedNumber + '.png';
        grade = 'A';

        gameHorseName = '00001' + formattedNumber;

        // B Grade
      } else if (Number(tokenId) >= 59 && Number(tokenId) <= 299) {
        var formattedNumber = Number(tokenId) - 59 + '';

        while (formattedNumber.length < 4) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '0002' + formattedNumber + '.png';
        grade = 'B';

        gameHorseName = '0002' + formattedNumber;

        // C Grade
      } else if (Number(tokenId) >= 300 && Number(tokenId) <= 599) {
        var formattedNumber = Number(tokenId) - 300 + '';
        while (formattedNumber.length < 3) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '00100' + formattedNumber + '.png';
        grade = 'C';

        gameHorseName = '00100' + formattedNumber;
      } else if (Number(tokenId) >= 600 && Number(tokenId) < 1000) {
        var formattedNumber = Number(tokenId) - 600 + '';
        while (formattedNumber.length < 3) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '00200' + formattedNumber + '.png';
        grade = 'D';

        gameHorseName = '00200' + formattedNumber;
      } else if (Number(tokenId) >= 1000 && Number(tokenId) < 1800) {
        var formattedNumber = Number(tokenId) - 600 + '';

        while (formattedNumber.length < 4) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '0020' + formattedNumber + '.png';
        grade = 'D';

        gameHorseName = '0020' + formattedNumber;
      } else if (Number(tokenId) >= 1800 && Number(tokenId) < 1805) {
        // 1800 => 99990000
        // 1801 => 99990001
        // 1802 => 99990002
        // 1803 => 99990003
        // 1804 => 99990004

        var formattedNumber = Number(tokenId) - 1800 + '';

        while (formattedNumber.length < 4) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '9999' + formattedNumber + '.png';
        grade = 'U';

        gameHorseName = '9999' + formattedNumber;
      } else if (Number(tokenId) >= 1805 && Number(tokenId) < 1810) {
        // 1805 => 00000011
        // 1806 => 00000012
        // 1807 => 00000013
        // 1808 => 00000014
        // 1809 => 00000015

        var formattedNumber = Number(tokenId) - 1805 + 11 + '';

        while (formattedNumber.length < 4) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '0000' + formattedNumber + '.png';
        grade = 'S';
        gameHorseName = '0000' + formattedNumber;
      } else if (Number(tokenId) >= 1810 && Number(tokenId) < 1815) {
        // 1810 => 00201200
        // 1811 => 00201201
        // 1812 => 00201202
        // 1813 => 00201203
        // 1814 => 00201204

        var formattedNumber = Number(tokenId) - 1810 + 1200 + '';

        while (formattedNumber.length < 4) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + formattedNumber + '.png';
        grade = 'D';
        gameHorseName = '0020' + formattedNumber;
      } else if (Number(tokenId) >= 1815 && Number(tokenId) < 1915) {
        // 1815 => 00001115
        // 1816 => 00001116

        var formattedNumber = Number(tokenId) - 1815 + 1115 + '';

        while (formattedNumber.length < 4) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '0000' + formattedNumber + '.png';
        grade = 'A';
        gameHorseName = '0000' + formattedNumber;
      } else if (Number(tokenId) >= 1915 && Number(tokenId) < 2115) {
        var formattedNumber = Number(tokenId) - 1915 + 241 + '';
        while (formattedNumber.length < 4) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '0002' + formattedNumber + '.png';
        grade = 'B';

        gameHorseName = '0002' + formattedNumber;
      } else if (Number(tokenId) >= 2115 && Number(tokenId) < 2645) {
        // 토큰번호 2115번부터 텍스쳐번호 00100300번 부터 다시 부여하면 됩니다.
        // 2115 => 00100300
        // 2116 => 00100301
        // 2117 => 00100302

        var formattedNumber = Number(tokenId) - 2115 + 300 + '';
        while (formattedNumber.length < 4) {
          formattedNumber = '0' + formattedNumber;
        }
        formattedNumber = '0010' + formattedNumber;
        gameHorseName = formattedNumber;

        imagesrc = 'Hrs_' + formattedNumber + '.png';
        grade = 'C';
      } else if (Number(tokenId) >= 2645 && Number(tokenId) < 3645) {
        var formattedNumber = Number(tokenId) - 2645 + 1645 + '';

        while (formattedNumber.length < 4) {
          formattedNumber = '0' + formattedNumber;
        }

        formattedNumber = '0020' + formattedNumber;
        //formattedNumber = '00000000';

        gameHorseName = '' + formattedNumber + '';

        imagesrc = 'Hrs_' + formattedNumber + '.png';

        grade = 'D';
      }

      // 3645 부터 3차 판매

      /*
        Grade U (5EA): tokenId: 3645, 3646, 3647, 3648, 3649  /  Hrs_99990005 - Hrs_99990010

        Grade S (14EA): tokenId: 3650 - 3663 / Hrs_00000016 - Hrs_00000029

        Grade A (100EA): tokenId: 3664 - 3763  / Hrs_00001215 - Hrs_00001314

        Grade B (350EA): tokenId: 3764 - 4113 / Hrs_00020441 - Hrs_00020790

        Grade C (976EA): tokenId: 4114 - 5089 / Hrs_00100945 - Hrs_00101920

        Grade D (1989EA): tokenId: 5090 - 7078 / Hrs_00202645 - Hrs_00204633

        */
      else if (Number(tokenId) === 3645) {
        gameHorseName = '99990005';
        imagesrc = 'Hrs_99990005.png';
        grade = 'U';
      } else if (Number(tokenId) === 3646) {
        gameHorseName = '99990006';
        imagesrc = 'Hrs_99990006.png';
        grade = 'U';
      } else if (Number(tokenId) === 3647) {
        gameHorseName = '99990007';
        imagesrc = 'Hrs_99990007.png';
        grade = 'U';
      } else if (Number(tokenId) === 3648) {
        gameHorseName = '99990008';
        imagesrc = 'Hrs_99990008.png';
        grade = 'U';
      } else if (Number(tokenId) === 3649) {
        gameHorseName = '99990009';
        imagesrc = 'Hrs_99990009.png';
        grade = 'U';
      } else if (Number(tokenId) >= 3650 && Number(tokenId) < 3664) {
        var formattedNumber = Number(tokenId) - 3650 + 16 + '';
        while (formattedNumber.length < 5) {
          formattedNumber = '0' + formattedNumber;
        }
        formattedNumber = '000' + formattedNumber;

        gameHorseName = '' + formattedNumber + '';

        imagesrc = 'Hrs_' + formattedNumber + '.png';
        grade = 'S';
      } else if (Number(tokenId) >= 3664 && Number(tokenId) < 3764) {
        var formattedNumber = Number(tokenId) - 3664 + 215 + '';
        while (formattedNumber.length < 3) {
          formattedNumber = '0' + formattedNumber;
        }
        formattedNumber = '00001' + formattedNumber;
        //formattedNumber = '00000000';

        gameHorseName = '' + formattedNumber + '';

        imagesrc = 'Hrs_' + formattedNumber + '.png';
        grade = 'A';
      } else if (Number(tokenId) >= 3764 && Number(tokenId) < 4114) {
        var formattedNumber = Number(tokenId) - 3764 + 441 + '';

        while (formattedNumber.length < 4) {
          formattedNumber = '0' + formattedNumber;
        }
        formattedNumber = '0002' + formattedNumber;

        gameHorseName = '' + formattedNumber + '';

        imagesrc = 'Hrs_' + formattedNumber + '.png';
        grade = 'B';
      } else if (Number(tokenId) >= 4114 && Number(tokenId) < 5090) {
        var formattedNumber = Number(tokenId) - 4114 + 945 + '';

        while (formattedNumber.length < 4) {
          formattedNumber = '0' + formattedNumber;
        }
        formattedNumber = '0010' + formattedNumber;

        gameHorseName = '' + formattedNumber + '';

        imagesrc = 'Hrs_' + formattedNumber + '.png';
        grade = 'C';
      } else if (Number(tokenId) >= 5090 && Number(tokenId) < 7079) {
        var formattedNumber = Number(tokenId) - 5090 + 2645 + '';

        while (formattedNumber.length < 4) {
          formattedNumber = '0' + formattedNumber;
        }
        formattedNumber = '0020' + formattedNumber;

        gameHorseName = '' + formattedNumber + '';

        imagesrc = 'Hrs_' + formattedNumber + '.png';
        grade = 'D';
      } else {
        ////imagesrc = 'Hrs_00006000.png';
      }
    }

    const imageUrl = s3url + imagesrc;

    /*
    return {
      gameHorseName: gameHorseName,
      register: register,
      logsNewSale: logsNewSale,
      totalPricePaid: totalPricePaid,
      paidToken: paidToken,
      holder: holder,
      contract: contract?.address,
      symbol: contract?.symbol,

      media:
        media && media[0]?.gateway
          ? media[0]?.gateway
          : 'https://via.placeholder.com/500',

      imageUrl: imageUrl,

      collectionName: contract?.openSea?.collectionName,
      verified: contract?.openSea?.safelistRequestStatus,
      tokenType,
      tokenId,
      title: rawMetadata?.name ? rawMetadata.name : title,
      gameTitle: gameHorseName,
      description,
      format: media && media[0]?.format ? media[0]?.format : 'png',

      //attributes: rawMetadata?.attributes,


      grade: grade,

      accumulatedBalance: nft.accumulatedBalance,
    };
    */

    return {
      gameHorseName: gameHorseName,
      totalPricePaid: nft?.totalPricePaid,
      paidToken: nft?.paidToken,
      holder: nft?.holder,
      contract: nft?.contract?.address,
      symbol: nft?.contract?.symbol,

      tokenId: nft?.tokenId,

      imageUrl: imageUrl,

      /*
      grade: nft?.rawMetadata?.attributes?.find (
        (attr: any) => attr?.trait_type === 'Grade'
      )?.value,
      */
      grade: grade,

      balance: balance,
    };
  });

  //const total = data.total;

  ////// const horsesCount = await getAllHorsesCount(grades, manes, holder);

  //console.log('getHorses formattedNfts', formattedNfts);

  res.status(200).json({
    nfts: formattedNfts ? formattedNfts : [],

    ///nfts: data.nfts,

    //pageKey: nfts.pageKey,
    ///pageKey: null,
    pageKey: pageKey,

    total: data.total,
  });

  ///return res.status(200).json({ success: true, nfts: response, pageKey: 'aaaaa' });

  /*
  return res
    .status(200)
    .json({ success: true, nfts: response, pageKey: 'aaaaa' });

  */
}
