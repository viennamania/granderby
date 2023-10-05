/*
export default function handler(req, res) {
  // Run cron job here

  console.log('Cron job ran!');



  



  res.status(200).end('Hello Cron!');
}
*/

////import { updateTopStories } from '@/lib/upstash';
import { NextResponse } from 'next/server';

import type { NextApiRequest, NextApiResponse } from 'next';

import {
  Network,
  Alchemy,
  fromHex,
  AssetTransfersCategory,
  SortingOrder,
} from 'alchemy-sdk';

export const config = {
  runtime: 'edge',
};

/*
const getHackerNews = async () => {
	const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
	const data = await res.json();
	return await Promise.all(data.slice(0, 3).map((item: string) => getHNItem(item)));
};

const getHNItem = async (item: string) => {
	const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json`);
	return await res.json();
};
*/

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key. // creath.park@gmail.com

  //apiKey: '8YyZWFtcbLkYveYaB9sjOC3KPWInNu07', // Replace with your Alchemy API Key.

  network: Network.MATIC_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

type Data = {
  address: string;
  transfers: any;
};

///export default async function handler() {

export default async function handler(
  req: NextApiRequest,
  ///res: NextApiResponse<Data>
  res: NextApiResponse
) {
  try {
    /*
		const hackerNewsData = await getHackerNews();

		const res = await updateTopStories(
			hackerNewsData.map((item) => ({
				id: item.id,
				by: item.by,
				url: item.url,
				time: item.time,
				title: item.title,
				score: item.score,
			}))
		);

		console.log({
			res,
			data: `Updated top stories at ${new Date().toISOString()}. Ids: ${hackerNewsData
				.map((item) => item.id)
				.join(', ')} `,
		});


		return NextResponse.json({
			data: `Updated top stories at ${new Date().toISOString()}. Ids: ${hackerNewsData
				.map((item) => item.id)
				.join(', ')} `,
		});
    */

    const nftDropContractAddressHorse =
      '0x41FBA0bd9f4DC9a968a10aEBb792af6A09969F60';
    const nftDropContractAddressHorseDerbyStars =
      '0x9d3aCa725a289c6E798355592Cd3dd5E43fA14A5';
    const nftDropContractAddressHorseZedRun =
      '0x67F4732266C7300cca593C814d46bee72e40659F';

    let transfers = [] as any;

    // Contract address for granderby NFT
    const address = nftDropContractAddressHorse;

    var pageParam = null;

    //var pageParam = "c9d362ce-45be-4631-b974-5242ed9e50cd";

    ///var fromBlock = "0x0";

    //var fromBlock = "0x2a672b6";

    var fromBlock = '0x2d8b54c';

    //var fromBlock = "0x2a6857f";

    //var fromBlock = "0x2a68678";
    //var fromBlock = "0x2b762f9";

    var response = null;

    while (true) {
      if (pageParam == null) {
        response = await alchemy.core.getAssetTransfers({
          fromBlock: fromBlock,
          toBlock: 'latest',

          contractAddresses: [address],
          //category: ["external","internal","erc721"],
          //category: ["erc721"],
          //category: ["erc721"],
          category: [AssetTransfersCategory.ERC721],
          //category: ["internal"],
          //fromAddress: "0x89Dc7A2E543a24F8c1513Fa67cE5aBE6CA338C18",
          //toAddress: "0xc82BbE41f2cF04e3a8efA18F7032BDD7f6d98a81",
          withMetadata: true,
          ///excludeZeroValue: false,
          excludeZeroValue: true,
          /////////order: SortingOrder.DESCENDING,
          order: SortingOrder.ASCENDING,

          /////pageKey: pageParam,
          //pageSize: 100,
        });
      } else {
        response = await alchemy.core.getAssetTransfers({
          fromBlock: fromBlock,

          contractAddresses: [address],
          //category: ["external","internal","erc721"],
          //category: ["erc721"],
          category: [AssetTransfersCategory.ERC721],
          //category: ["internal"],
          //fromAddress: "0x89Dc7A2E543a24F8c1513Fa67cE5aBE6CA338C18",
          //toAddress: "0xc82BbE41f2cF04e3a8efA18F7032BDD7f6d98a81",
          withMetadata: true,
          ///excludeZeroValue: false,
          excludeZeroValue: true,
          //////order: SortingOrder.DESCENDING,
          order: SortingOrder.ASCENDING,
          pageKey: pageParam,
          //pageSize: 100,
        });
      }

      console.log('response.transfers.length', response?.transfers.length);

      console.log('response.pageKey', response?.pageKey);

      response?.transfers.map((item, index) => {
        ///console.log("index", index);

        ///console.log("item", item);

        const match = transfers.find((element: any) => {
          return element.hash == item.hash;
        });

        if (match) {
          return;
        }

        const transfer = {
          hash: item.hash,
          blockNum: item.blockNum,
          uniqueId: item.uniqueId,
          from: item.from,
          to: item.to,
          value: item.value,
          erc721TokenId: item.erc721TokenId,
          erc1155Metadata: item.erc1155Metadata,
          tokenId: item.tokenId,
          asset: item.asset,
          category: item.category,
          rawContract: item.rawContract,
          blockTimestamp: item.metadata.blockTimestamp,
        };

        transfers.push(transfer);
      });

      if (response.pageKey == undefined) {
        break;
      }

      pageParam = response.pageKey;
    }

    console.log('transfers length', transfers.length);

    return NextResponse.json({
      data: `Updated top stories at ${new Date().toISOString()}. transfers length: ${
        transfers.length
      } `,
    });
  } catch (error: any) {
    console.log({ error });

    return NextResponse.json({
      error: error.message,
    });
  }
}
