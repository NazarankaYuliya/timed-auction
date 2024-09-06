export interface IBid {
  user: string;
  amount: number;
  userName?: string;
  createdAt?: Date;
}

export interface IItem {
  _id: string;
  catalogNumber: number;
  description: string;
  startPrice: number;
  image: string[];
  currentBid: number;
  auctionDates: {
    startDate: Date;
    endDate: Date;
  };
  bids: IBid[];
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  agb: string;
  isVerified: boolean;
}
