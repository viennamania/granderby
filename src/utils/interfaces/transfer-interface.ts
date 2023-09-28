import mongoose from 'mongoose';

export interface ITransferHistory {
  _id: mongoose.Types.ObjectId;
  blockTimestamp: string;
  blockNum: string;
  uniqueId: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  erc721TokenId: string;
  erc1155Metadata: string;
  tokenId: string;
  asset: string;
  category: string;
  rawContract: string;
  data: string;
  buyer: string;
  quantityBought: string;
  totalPricePaid: string;
}
