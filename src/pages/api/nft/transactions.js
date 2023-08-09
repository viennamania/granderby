import { Network, Alchemy, AssetTransfersCategory } from 'alchemy-sdk';

export default async function handler(req, res) {
  const { method } = req.query;

  ///const { pageKey, pageSize, contract, address } = req.body;
  const { pageKey, pageSize, contract } = req.body;

  console.log(req.body);

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.MATIC_MAINNET,
  };
  const alchemy = new Alchemy(settings);

  /*
  try {
    const nfts = await alchemy.nft.getNftsForContract(
      nftDropContractAddressHorse,
      {
        pageKey: pageKey ? pageKey : null,
        pageSize: pageSize ? pageSize : null,
      }
    );
    const formattedNfts = nfts.nfts.map((nft) => {
      const { contract, title, tokenType, tokenId, description, media } = nft;

      return {
        contract: contract.address,
        symbol: contract.symbol,
        media: media[0]?.gateway
          ? media[0]?.gateway
          : 'https://via.placeholder.com/500',
        collectionName: contract.openSea?.collectionName,
        verified: contract.openSea?.safelistRequestStatus,
        tokenType,
        tokenId,
        title,
        description,
        format: media[0]?.format ? media[0]?.format : 'png',
      };
    });

    const filteredNfts = formattedNfts.filter(
      (nft) => nft.title.length && nft.description.length && nft.media
    );

    res.status(200).json({
      nfts: filteredNfts.length ? filteredNfts : null,
      pageKey: nfts.pageKey,
    });
    // the rest of your code
  } catch (e) {
    console.warn(e);
    res.status(500).send({
      message: 'something went wrong, check the log in your terminal',
    });
  }
  */

  try {
    /*
    const transactions = await alchemy.tokens.getTransactions(
      contract,
      address,
      {
        pageKey: pageKey ? pageKey : null,
        pageSize: pageSize ? pageSize : null,
      }
    );
    */

    const getTransfers = await alchemy.core.getAssetTransfers({
      fromBlock: '0x0',
      toBlock: 'latest',

      //toAddress: address,
      ///fromAddress: address,
      contractAddresses: [contract],
      excludeZeroValue: true,
      category: [AssetTransfersCategory.ERC721],
      sort: 'desc',
    });

    //console.log(getTransfers);

    const getSends = await alchemy.core.getAssetTransfers({
      fromBlock: '0x0',
      toBlock: 'latest',
      //fromAddress: address,
      contractAddresses: [contract],
      excludeZeroValue: true,
      category: [AssetTransfersCategory.ERC721],
    });

    //console.log(getSends);

    const transactions = [...getTransfers.transfers, ...getSends.transfers];

    /*
    const formattedTransactions = transactions.transactions.map((transaction) => {
      const { from, to, value, timestamp, hash } = transaction;

      return {
        from,
        to,
        value,
        timestamp,
        hash,
      };
    });


    const filteredTransactions = formattedTransactions.filter(
      (transaction) => transaction.from.length && transaction.to.length && transaction.value
    );

    res.status(200).json({
      transactions: filteredTransactions.length ? filteredTransactions : null,
      pageKey: transactions.pageKey,
    });
    */

    res.status(200).json({
      transactions: transactions.length ? transactions : null,
    });
  } catch (e) {
    console.warn(e);
    res.status(500).send({
      message: 'something went wrong, check the log in your terminal',
    });
  }
}
