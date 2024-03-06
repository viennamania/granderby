// csv-writer module

/*

  if (Number(req.query.id) === 0) {
    imagesrc = 'Hrs_00000000.png';
    grade = 'S';
  } else if (Number(req.query.id) === 1) {
    imagesrc = 'Hrs_00000001.png';
    grade = 'S';
  } else if (Number(req.query.id) === 2) {
    imagesrc = 'Hrs_00000002.png';
    grade = 'S';
  } else if (Number(req.query.id) === 3) {
    imagesrc = 'Hrs_00000003.png';
    grade = 'S';
  } else if (Number(req.query.id) === 4) {
    imagesrc = 'Hrs_00000004.png';
    grade = 'S';
  } else if (Number(req.query.id) === 5) {
    imagesrc = 'Hrs_00000005.png';
    grade = 'S';
  } else if (Number(req.query.id) === 6) {
    imagesrc = 'Hrs_00000006.png';
    grade = 'S';
  } else if (Number(req.query.id) === 7) {
    imagesrc = 'Hrs_00000007.png';
    grade = 'S';
  } else if (Number(req.query.id) === 8) {
    imagesrc = 'Hrs_00000008.png';
    grade = 'S';
  } else if (Number(req.query.id) === 9) {
    imagesrc = 'Hrs_00000009.png';
    grade = 'S';
  } else if (Number(req.query.id) === 10) {
    imagesrc = 'Hrs_00000010.png';
    grade = 'S';
  } else {
    //console.log('req.query.id', req.query.id);

    // A Grade
    if (Number(req.query.id) >= 11 && Number(req.query.id) <= 58) {
      console.log('A Grade req.query.id', req.query.id);

      var formattedNumber = Number(req.query.id) - 11 + '';
      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '00001' + formattedNumber;

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'A';

      // B Grade
    } else if (Number(req.query.id) >= 59 && Number(req.query.id) <= 299) {
      //console.log('B Grade req.query.id', req.query.id);

      //const filename = util.format("%08d", Number(req.query.id));

      //const formattedNumber = ("0000600" + Number(req.query.id)).slice(-8);

      //Number(req.query.id).padStart(2, "0");

      //imagesrc = 'Hrs_00006000.png';

      var formattedNumber = Number(req.query.id) - 59 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '0002' + formattedNumber;

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'B';
    } else {
      imagesrc = 'Hrs_00006000.png';
    }

    // C Grade
    if (Number(req.query.id) >= 300 && Number(req.query.id) <= 599) {
      var formattedNumber = Number(req.query.id) - 300 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00100' + formattedNumber;

      

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'C';
    } else if (Number(req.query.id) >= 600 && Number(req.query.id) < 1000) {
      var formattedNumber = Number(req.query.id) - 600 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00200' + formattedNumber;

      

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'D';
    } else if (Number(req.query.id) >= 1000 && Number(req.query.id) < 1800) {
      var formattedNumber = Number(req.query.id) - 600 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0020' + formattedNumber;

      

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'D';
    } else if (Number(req.query.id) >= 1800 && Number(req.query.id) < 1805) {
      var formattedNumber = Number(req.query.id) - 1700 + '';

      while (formattedNumber.length < 5) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '000' + formattedNumber;
      //formattedNumber = '00000000';

      

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'U';
    } else if (Number(req.query.id) >= 1805 && Number(req.query.id) < 1810) {
      var formattedNumber = Number(req.query.id) - 1700 + '';

      while (formattedNumber.length < 5) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0000' + formattedNumber;
      //formattedNumber = '00000000';

      

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'S';
    } else if (Number(req.query.id) >= 1815 && Number(req.query.id) < 1915) {
      var formattedNumber = Number(req.query.id) - 1700 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00001' + formattedNumber;
      //formattedNumber = '00000000';

      

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'A';
    } else if (Number(req.query.id) >= 1915 && Number(req.query.id) < 2115) {
      //var formattedNumber = Number(req.query.id) - 1800 + 59 + '';

      var formattedNumber = Number(req.query.id) - 1915 + 241 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '0002' + formattedNumber;

      

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'B';
    } else if (Number(req.query.id) >= 2115 && Number(req.query.id) < 2645) {
      //var formattedNumber = Number(req.query.id) - 2000 + '';
      var formattedNumber = Number(req.query.id) - 1700 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00100' + formattedNumber;

      

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'C';
    } else if (Number(req.query.id) >= 2645 && Number(req.query.id) < 5000) {
      var formattedNumber = Number(req.query.id) - 1000 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0020' + formattedNumber;
      //formattedNumber = '00000000';

      

      imagesrc = 'Hrs_' + formattedNumber + '.png';

      grade = 'D';
    } else {
      ////imagesrc = 'Hrs_00006000.png';
    }
  }
  */

const { el } = require('date-fns/locale');

// id is the number of the nft
// id = 0 is the first nft
// id = 1 is the second nft

// imagesrc is the name of the image
// grade is the grade of the nft

// loop through the nft and find the image and grade

// Path: script/table.js

let imagesrcArray = [{ tokenId: 0, imagesrc: 'Hrs_00000000.png', grade: 'S' }];

for (let i = 0; i < 5000; i++) {
  if (i === 0) {
    imagesrcArray.push({
      tokenId: i,
      imagesrc: 'Hrs_00000000.png',
      grade: 'S',
    });
  } else if (i === 1) {
    imagesrcArray.push({
      tokenId: i,
      imagesrc: 'Hrs_00000001.png',
      grade: 'S',
    });
  } else if (i === 2) {
    imagesrcArray.push({
      tokenId: i,
      imagesrc: 'Hrs_00000002.png',
      grade: 'S',
    });
  } else if (i === 3) {
    imagesrcArray.push({
      tokenId: i,
      imagesrc: 'Hrs_00000003.png',
      grade: 'S',
    });
  } else if (i === 4) {
    imagesrcArray.push({
      tokenId: i,
      imagesrc: 'Hrs_00000004.png',
      grade: 'S',
    });
  } else if (i === 5) {
    imagesrcArray.push({
      tokenId: i,
      imagesrc: 'Hrs_00000005.png',
      grade: 'S',
    });
  } else if (i === 6) {
    imagesrcArray.push({
      tokenId: i,
      imagesrc: 'Hrs_00000006.png',
      grade: 'S',
    });
  } else if (i === 7) {
    imagesrcArray.push({
      tokenId: i,
      imagesrc: 'Hrs_00000007.png',
      grade: 'S',
    });
  } else if (i === 8) {
    imagesrcArray.push({
      tokenId: i,
      imagesrc: 'Hrs_00000008.png',
      grade: 'S',
    });
  } else if (i === 9) {
    imagesrcArray.push({
      tokenId: i,
      imagesrc: 'Hrs_00000009.png',
      grade: 'S',
    });
  } else if (i === 10) {
    imagesrcArray.push({
      tokenId: i,
      imagesrc: 'Hrs_00000010.png',
      grade: 'S',
    });
  } else {
    //console.log('req.query.id', req.query.id);

    // A Grade
    if (i >= 11 && i <= 58) {
      var formattedNumber = i - 11 + '';
      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '00001' + formattedNumber;

      imagesrcArray.push({
        tokenId: i,
        imagesrc: 'Hrs_' + formattedNumber + '.png',
        grade: 'A',
      });
    }

    // B Grade
    else if (i >= 59 && i <= 299) {
      var formattedNumber = i - 59 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '0002' + formattedNumber;

      imagesrcArray.push({
        tokenId: i,
        imagesrc: 'Hrs_' + formattedNumber + '.png',
        grade: 'B',
      });
    }

    // C Grade
    // if (Number(req.query.id) >= 300 && Number(req.query.id) <= 599) {
    else if (i >= 300 && i <= 599) {
      var formattedNumber = i - 300 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00100' + formattedNumber;

      imagesrcArray.push({
        tokenId: i,
        imagesrc: 'Hrs_' + formattedNumber + '.png',
        grade: 'C',
      });
    }

    // D Grade
    // } else if (Number(req.query.id) >= 600 && Number(req.query.id) < 1000) {
    else if (i >= 600 && i < 1000) {
      var formattedNumber = i - 600 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00200' + formattedNumber;

      imagesrcArray.push({
        tokenId: i,
        imagesrc: 'Hrs_' + formattedNumber + '.png',
        grade: 'D',
      });
    }

    // D Grade
    else if (i >= 1000 && i < 1800) {
      var formattedNumber = i - 600 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0020' + formattedNumber;

      imagesrcArray.push({
        tokenId: i,
        imagesrc: 'Hrs_' + formattedNumber + '.png',
        grade: 'D',
      });
    }
    // U Grade
    // } else if (Number(req.query.id) >= 1800 && Number(req.query.id) < 1805) {
    else if (i >= 1800 && i < 1805) {
      var formattedNumber = i - 1700 + '';

      while (formattedNumber.length < 5) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '000' + formattedNumber;
      //formattedNumber = '00000000';

      imagesrcArray.push({
        tokenId: i,
        imagesrc: 'Hrs_' + formattedNumber + '.png',
        grade: 'U',
      });
    }
    // S Grade
    // } else if (Number(req.query.id) >= 1805 && Number(req.query.id) < 1810) {
    else if (i >= 1805 && i < 1810) {
      var formattedNumber = i - 1700 + '';

      while (formattedNumber.length < 5) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0000' + formattedNumber;
      //formattedNumber = '00000000';

      imagesrcArray.push({
        tokenId: i,
        imagesrc: 'Hrs_' + formattedNumber + '.png',
        grade: 'S',
      });
    }

    // i don't know
    // so grade maybe D
    else if (i >= 1810 && i < 1815) {
      var formattedNumber = i - 600 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0020' + formattedNumber;

      imagesrcArray.push({
        tokenId: i,
        imagesrc: 'Hrs_' + formattedNumber + '.png',
        grade: 'D',
      });
    }

    // A Grade
    else if (i >= 1815 && i < 1915) {
      var formattedNumber = i - 1700 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00001' + formattedNumber;
      //formattedNumber = '00000000';

      imagesrcArray.push({
        tokenId: i,
        imagesrc: 'Hrs_' + formattedNumber + '.png',
        grade: 'A',
      });
    }
    // B Grade
    else if (i >= 1915 && i < 2115) {
      //var formattedNumber = Number(req.query.id) - 1800 + 59 + '';

      var formattedNumber = i - 1915 + 241 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }
      formattedNumber = '0002' + formattedNumber;

      imagesrcArray.push({
        tokenId: i,
        imagesrc: 'Hrs_' + formattedNumber + '.png',
        grade: 'B',
      });
    }

    // C Grade
    else if (i >= 2115 && i < 2645) {
      //var formattedNumber = Number(req.query.id) - 2000 + '';
      var formattedNumber = i - 1700 + '';

      while (formattedNumber.length < 3) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '00100' + formattedNumber;

      imagesrcArray.push({
        tokenId: i,
        imagesrc: 'Hrs_' + formattedNumber + '.png',
        grade: 'C',
      });
    }

    // D Grade
    else if (i >= 2645 && i < 5000) {
      var formattedNumber = i - 1000 + '';

      while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
      }

      formattedNumber = '0020' + formattedNumber;
      //formattedNumber = '00000000';

      imagesrcArray.push({
        tokenId: i,
        imagesrc: 'Hrs_' + formattedNumber + '.png',
        grade: 'D',
      });
    } else {
      ////imagesrc = 'Hrs_00006000.png';
    }
  }
}

//console.log('imagesrcArray', imagesrcArray);

// convert to csv
// only 0 - 3644 list
// 3645 - 5000 is not included

imagesrcArray.map((item) => {
  if (item.tokenId <= 3644) {
    console.log(
      item.tokenId +
        ',' +
        item.imagesrc +
        ',' +
        item.grade +
        ',' +
        'https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/hrs/' +
        item.imagesrc +
        //https://opensea.io/assets/matic/0x41FBA0bd9f4DC9a968a10aEBb792af6A09969F60/3644
        ',' +
        'https://opensea.io/assets/matic/0x41FBA0bd9f4DC9a968a10aEBb792af6A09969F60/' +
        item.tokenId
    );
  }
});

//console.log('count=', imagesrcArray.length);

/*
imagesrcArray.map((item) => {



    console.log(
        item.tokenId + ','
        + item.imagesrc+ ','
        + item.grade + ',' + 'https://dshujxhbbpmz18304035.gcdn.ntruss.com/nft/HV/hrs/' + item.imagesrc
        //https://opensea.io/assets/matic/0x41FBA0bd9f4DC9a968a10aEBb792af6A09969F60/3644
        + ',' + 'https://opensea.io/assets/matic/0x41FBA0bd9f4DC9a968a10aEBb792af6A09969F60/' + item.tokenId
    );
} )
*/
