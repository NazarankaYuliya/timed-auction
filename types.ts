import { Types } from "mongoose";

export interface IBid {
  _id: string | Types.ObjectId;
  user: string | Types.ObjectId;
  amount: number;
  createdAt?: Date;
  isWinning: boolean;
}

export interface IItem {
  _id: string | Types.ObjectId;
  catalogNumber: number;
  description: string;
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
