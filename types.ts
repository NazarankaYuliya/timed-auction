import { Types } from "mongoose";

export interface IBid {
  _id: string | Types.ObjectId;
  user: string | Types.ObjectId;
  amount: number;
  createdAt?: Date;
  isWinning: boolean;
}

export interface IDescription {
  header: string;
  producer: string;
  type: string;
  year: string;
  sn: string;
  condition: string;
  details: string;
  category: string;
  categoryType: string;
}

export interface IItem {
  _id: string | Types.ObjectId;
  catalogNumber: number;
  description: IDescription;
  startPrice: number;
  image: string;
  currentBid: number;
  biddingStep: number;
  auctionDates: {
    startDate: Date;
    endDate: Date;
  };
  isMarked: boolean;
  winner: string | Types.ObjectId;
  bids: IBid[];
}

export interface IUser {
  _id: string | Types.ObjectId;
  firstName: string;
  lastName: string;
  company: string;
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
