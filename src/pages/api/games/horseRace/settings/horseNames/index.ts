import { editHorseNames, getHorseNames } from '@/utils/models/npcRace/horses';
import { NextApiRequest, NextApiResponse } from 'next';
import { Network, Alchemy } from 'alchemy-sdk';
///import { nftDropContractAddressHorse } from '@/config/contractAddresses';
import { exit } from 'process';

//import {
//  useContract,
//} from '@thirdweb-dev/react';

const settings = {
  //apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key.

  apiKey: '8YyZWFtcbLkYveYaB9sjOC3KPWInNu07', // Replace with your Alchemy API Key.

  network: Network.MATIC_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.query;

  if (method === 'all') {
    //const horseContract = useContract(nftDropContractAddressHorse, nftDropContractABI);

    //const nft = await horseContract.erc721.get(tokenId);

    /*
    // Get all NFTs
    ////const response = await alchemy.nft.getNftsForOwner(String(arr20Address[j]), {
    const response = await alchemy.nft.getNftsForContract(nftDropContractAddressHorse, {
      omitMetadata: false, // // Flag to omit metadata
    });

    //console.log('npcNames alchemy.nft.getNftsFor response', response);

    const picknumber = <any>[];
 
    const min = 0;
    const max = response.nfts.length - 1;

    let count = 0;

    while (count < 5) {

      let random = Math.floor(Math.random() * (max - min + 1)) + min;

      let found = false;
      picknumber.forEach((element:any) => {
        if (element === random) {
          found = true;
        }
      });

      if (!found) {
        picknumber.push(random);
        count++;
      }

    }
    */

    ///console.log('npcNames picknumber', picknumber);

    /*
    for (var k = 0; k < response.nfts.length; k++) {

      if (response.nfts[k].tokenUri?.gateway) {
        const res = await fetch(response.nfts[k].tokenUri?.gateway!);
        const responseJson = await res.json();


        console.log('npcNames responseJson', responseJson);

 
      }
    }
    */

    /*
    {"status":true,"npcNames":[{"_id":"64b26a08c216b2b1e2b3f41f","horse1":"송팽이","horse2":"GangNam","horse3":"ZERO-X","horse4":"007","horse5":"날쌘돌이","inputs":{"input1":1,"input2":2,"input3":3,"input4":4,"input5":5,"input6":6},"horse6":"FFF"}]}
    */

    ///const npcNames = ['aaa', 'bbb', 'ccc', 'ddd', 'eee'];

    /////const npcNames = await getHorseNames();

    /*
   
    const names = <any>[];
    const images = <any>[];

    for (var i = 0; i < 5; i++) {

      const k = picknumber[i];
      const res = await fetch(response.nfts[k].tokenUri?.gateway!);
      const responseJson = await res.json();
      names.push(responseJson.name);
      images.push(responseJson.image);

    }

    */

    /*
    const npcNames = {
      "status":true,
      "npcNames":[
        {
          "_id":"64b26a08c216b2b1e2b3f41f",
          "npc1":"송팽이",
          "npc2":"GangNam",
          "npc3":"ZERO-X",
          "npc4":"007",
          "npc5":"날쌘돌이",
          "npc6":"Victory",
          "inputs":{
            "input1":1,
            "input2":2,
            "input3":3,
            "input4":4,
            "input5":5,
            "input6":6
          },
        },
      ]
    };
    */

    const npcNames = await getHorseNames();

    ///console.log('npcNames', npcNames);

    //console.log('nft1', npcNames[0].nft1);
    //console.log('nft2', npcNames[0].nft2);
    //console.log('nft3', npcNames[0].nft3);
    //console.log('nft4', npcNames[0].nft4);
    //console.log('nft5', npcNames[0].nft5);

    var resNpcNames = JSON.parse(JSON.stringify(npcNames));

    //Object.assign(target, source);

    //Object.assign(resNpcNames, npcNames);

    await alchemy.nft
      .getNftMetadata(npcNames[0].nft1.contract, npcNames[0].nft1.tokenId)
      .then((response) => {
        resNpcNames[0].media1 = response.media[0];
      });

    await alchemy.nft
      .getNftMetadata(npcNames[0].nft2.contract, npcNames[0].nft2.tokenId)
      .then((response) => {
        resNpcNames[0].media2 = response.media[0];
      });

    await alchemy.nft
      .getNftMetadata(npcNames[0].nft3.contract, npcNames[0].nft3.tokenId)
      .then((response) => {
        resNpcNames[0].media3 = response.media[0];
      });

    await alchemy.nft
      .getNftMetadata(npcNames[0].nft4.contract, npcNames[0].nft4.tokenId)
      .then((response) => {
        resNpcNames[0].media4 = response.media[0];
      });

    await alchemy.nft
      .getNftMetadata(npcNames[0].nft5.contract, npcNames[0].nft5.tokenId)
      .then((response) => {
        resNpcNames[0].media5 = response.media[0];
      });

    ///console.log('resNpcNames', resNpcNames);

    /*
    alchemy.nft.getNftsForOwner('0x0a3e0f0b7b8a7a8d6a9e7f0e194a7d4d0b5b0b0b', {
      omitMetadata: false, // // Flag to omit metadata
      contractAddresses: ['0x7c40c393dc0f283f318791d746d894ddd3693572'],
    }).then((response) => {
      console.log('response', response);
    });
    */

    //alchemy.nft.get

    /*
    const settings = {
      //apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key.

      apiKey: '8YyZWFtcbLkYveYaB9sjOC3KPWInNu07', // Replace with your Alchemy API Key.

      network: Network.MATIC_MAINNET, // Replace with your network.
    };

    const alchemy = new Alchemy(settings);
    */
    // Get all NFTs
    ////const response = await alchemy.nft.getNftsForOwner(String(arr20Address[j]), {
    //const response = await alchemy.nft.getNftsForOwner(String(address), {
    //  omitMetadata: false, // // Flag to omit metadata
    //  contractAddresses: [nftDropContractAddressHorse],
    //});

    //console.log('resNpcNames', resNpcNames);

    return res.status(200).json({ status: true, npcNames: resNpcNames });
  }

  if (method === 'set') {
    const { horse1, horse2, horse3, horse4, horse5 } = req.body;
    const result = await editHorseNames(horse1, horse2, horse3, horse4, horse5);
    return res.status(200).json({ status: true, result });
  }

  return res.status(405).json({ status: false, message: 'Method not allowed' });
}
