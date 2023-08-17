export interface ITransaction {
  save(): unknown;
  _id: string;
  block_signed_at: string;
  tx_hash: string;
  from: string;
  to: string;
  contract: string;
  amount: number;
}

/*
block_signed_at 2023-08-13T10:04:32Z
tx_hash 0x7835286d64e8e271a03d225707f087bb401d19fa4886ffc80d7dcb1151061e13
from 0x6271117e328c1720bae5d4cca95eda7554bcfa70
to 0x8c7ed96f25d817480a1137c477e462c8eb0100de
value 6000000000000000000
*/
