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
        var formattedNumber = Number(tokenId) - 1700 + '';

        while (formattedNumber.length < 5) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '000' + formattedNumber + '.png';
        grade = 'D';

        gameHorseName = '000' + formattedNumber;
      } else if (Number(tokenId) >= 1805 && Number(tokenId) < 1810) {
        var formattedNumber = Number(tokenId) - 1700 + '';

        while (formattedNumber.length < 5) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '0000' + formattedNumber + '.png';
        grade = 'D';

        gameHorseName = '0000' + formattedNumber;
      } else if (Number(tokenId) >= 1815 && Number(tokenId) < 1915) {
        var formattedNumber = Number(tokenId) - 1700 + '';

        while (formattedNumber.length < 3) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '00001' + formattedNumber + '.png';
        grade = 'D';

        gameHorseName = '00001' + formattedNumber;
      } else if (Number(tokenId) >= 1915 && Number(tokenId) < 2115) {
        var formattedNumber = Number(tokenId) - 1915 + 241 + '';
        while (formattedNumber.length < 4) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '0002' + formattedNumber + '.png';
        grade = 'D';

        gameHorseName = '0002' + formattedNumber;
      } else if (Number(tokenId) >= 2115 && Number(tokenId) < 2645) {
        var formattedNumber = Number(tokenId) - 1700 + '';
        while (formattedNumber.length < 3) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '00100' + formattedNumber + '.png';
        grade = 'D';

        gameHorseName = '00100' + formattedNumber;
      } else if (Number(tokenId) >= 2645 && Number(tokenId) < 5000) {
        var formattedNumber = Number(tokenId) - 1000 + '';

        while (formattedNumber.length < 4) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '0020' + formattedNumber + '.png';
        grade = 'D';

        gameHorseName = '0020' + formattedNumber;
      } else if (Number(tokenId) >= 5000 && Number(tokenId) < 10000) {
        var formattedNumber = Number(tokenId) - 1000 + '';

        while (formattedNumber.length < 4) {
          formattedNumber = '0' + formattedNumber;
        }

        imagesrc = 'Hrs_' + '0020' + formattedNumber + '.png';
        grade = 'D';

        gameHorseName = '0020' + formattedNumber;
      } else {
        ////gameHorseName = 'Hrs_00006000.png';
      }
    }

    const imageUrl = s3url + imagesrc;

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

      /*
      grade: rawMetadata
        ? rawMetadata.attributes?.find(
            (attribute: any) => attribute.trait_type === 'Grade'
          )?.value
        : 'D',
      */

      grade: grade,

      accumulatedBalance: nft.accumulatedBalance,
    };
  });

  //const total = data.total;

  const horsesCount = await getAllHorsesCount(grades, manes, holder);

  res.status(200).json({
    nfts: formattedNfts ? formattedNfts : [],
    //pageKey: nfts.pageKey,
    ///pageKey: null,
    pageKey: pageKey,
    total: horsesCount?.total,
  });

  ///return res.status(200).json({ success: true, nfts: response, pageKey: 'aaaaa' });

  /*
  return res
    .status(200)
    .json({ success: true, nfts: response, pageKey: 'aaaaa' });

  */
}
