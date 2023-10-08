export interface IHorse {
  save(): unknown;
  _id: string;
  tokenId: string;
  contract: string;
  nft: object;
  holder: string;
  paidToken: string;
  totalPricePaid: string;
  logsNewSale: object;
  register: string;
}
