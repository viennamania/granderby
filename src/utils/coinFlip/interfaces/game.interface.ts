interface ICoinFlip {
  _id: string;
  userId: string;
  username: string;
  img: string;
  pickedSide: string;
  betAmount: number;
  betResult: string;
}

export default ICoinFlip;
