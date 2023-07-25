import { editHorseNames, getHorseNames } from '@/utils/models/npcRace/horses';
import { NextApiRequest, NextApiResponse } from 'next';
import { Network, Alchemy } from 'alchemy-sdk';
import { nftDropContractAddressHorse } from '@/config/contractAddresses';
import { exit } from 'process';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.query;

  if (method === 'all') {
    /*
    const settings = {
      //apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key.

      apiKey: '8YyZWFtcbLkYveYaB9sjOC3KPWInNu07', // Replace with your Alchemy API Key.

      network: Network.MATIC_MAINNET, // Replace with your network.
    };


    const alchemy = new Alchemy(settings);
    */

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

    return res.status(200).json({ status: true, npcNames });
  }

  if (method === 'set') {
    const { horse1, horse2, horse3, horse4, horse5 } = req.body;
    const result = await editHorseNames(horse1, horse2, horse3, horse4, horse5);
    return res.status(200).json({ status: true, result });
  }

  return res.status(405).json({ status: false, message: 'Method not allowed' });
}
