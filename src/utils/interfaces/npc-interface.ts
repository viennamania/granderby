export interface INpc {
  save(): unknown;
  _id: string;
  username: string;
  email: string;
  pass1: string | boolean;
  pass2: string;
  deposit: number;
  img: string;
  admin: boolean;
  newPassToken: string;
  userToken: string;
  maticBalance: number;
  walletAddress: string;
  status: boolean;
}
