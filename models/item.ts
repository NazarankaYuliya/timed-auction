import mongoose, { Schema, Document, Model } from "mongoose";
import User from "@models/user";

interface Bid {
  user: mongoose.Types.ObjectId;
  amount: number;
  userName?: string;
  createdAt?: Date;
}

interface AuctionDates {
  startDate: Date;
  endDate: Date;
}

interface ItemDocument extends Document {
  catalogNumber: number;
  description: string;
  startPrice: number;
  currentBid: number;
  image: string[];
  bids: Bid[];
  auctionDates: AuctionDates;
  addBid: (userId: mongoose.Types.ObjectId, bidAmount: number) => Promise<void>;
}

const BidSchema = new Schema<Bid>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  userName: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const ItemSchema = new Schema<ItemDocument>(
  {
    catalogNumber: { type: Number, required: true },
    description: { type: String, required: true },
    startPrice: { type: Number, required: true },
    currentBid: { type: Number, default: 0 },
    image: { type: [String], default: [] },
    bids: { type: [BidSchema], default: [] },
    auctionDates: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
  },
  {
    timestamps: true,
  },
);

ItemSchema.methods.calculateBiddingStep = function (limit: number): number {
  if (limit > 0 && limit <= 19) return 2;
  if (limit > 19 && limit <= 59) return 5;
  if (limit > 59 && limit <= 159) return 10;
  if (limit > 159 && limit <= 299) return 20;
  if (limit > 299 && limit <= 449) return 30;
  if (limit > 449 && limit <= 899) return 50;
  if (limit > 899 && limit <= 1799) return 100;
  if (limit > 1799 && limit <= 2999) return 200;
  if (limit > 2999 && limit <= 4499) return 300;
  if (limit > 4499 && limit <= 9999) return 500;
  if (limit > 9999 && limit <= 24999) return 1000;
  if (limit > 24999 && limit <= 49999) return 2500;
  return 5000;
};

ItemSchema.methods.addBid = async function (
  userId: mongoose.Types.ObjectId,
  bidAmount: number,
) {
  const step = this.calculateBiddingStep(bidAmount);

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const existingBidIndex = this.bids.findIndex((bid: Bid) =>
    bid.user.equals(userId),
  );

  if (existingBidIndex !== -1) {
    this.bids[existingBidIndex].amount = bidAmount;
    this.bids[existingBidIndex].userName = user.firstName + " " + user.lastName;
    this.bids[existingBidIndex].createdAt = new Date();
  } else {
    this.bids.push({
      user: userId,
      amount: bidAmount,
      userName: user.firstName + " " + user.lastName,
      createdAt: new Date(),
    });
  }

  const uniqueBids = Array.from(
    new Map(this.bids.map((bid: Bid) => [bid.amount, bid])).values(),
  ) as Bid[];

  const sortedBids: Bid[] = uniqueBids.sort(
    (a: Bid, b: Bid) => b.amount - a.amount,
  );

  if (sortedBids.length === 0) {
    this.currentBid = this.startPrice;
  } else if (sortedBids.length === 1) {
    this.currentBid = this.startPrice;
  } else {
    const secondHighestBid = sortedBids[1].amount;
    this.currentBid = secondHighestBid + step;
  }

  const userBidIndex = user.bids.findIndex((bid) =>
    bid.itemId.equals(this._id),
  );
  if (userBidIndex !== -1) {
    user.bids[userBidIndex].amount = bidAmount;
    user.bids[userBidIndex].catalogNumber = this.catalogNumber;
    user.bids[userBidIndex].currentBid = this.currentBid;
  } else {
    user.bids.push({
      itemId: this._id,
      amount: bidAmount,
      catalogNumber: this.catalogNumber,
      currentBid: this.currentBid,
    });
  }

  const now = new Date();
  const remainingTime = this.auctionDates.endDate.getTime() - now.getTime();

  const fiveMinutes = 5 * 60 * 1000;

  if (remainingTime < fiveMinutes) {
    this.auctionDates.endDate = new Date(now.getTime() + fiveMinutes);
  }

  await user.save();
  await this.save();
};

const Item: Model<ItemDocument> =
  mongoose.models.Item || mongoose.model<ItemDocument>("Item", ItemSchema);

export default Item;
