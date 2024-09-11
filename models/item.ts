import mongoose, { Schema, Document, Model } from "mongoose";
import User from "@models/user";
import { calculateStep } from "@utils/calculateStep";

interface Bid {
  user: mongoose.Types.ObjectId;
  amount: number;
  createdAt?: Date;
  isWinning?: boolean;
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
  addBid: (userId: mongoose.Types.ObjectId, limit: number) => Promise<void>;
}

const BidSchema = new Schema<Bid>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  isWinning: { type: Boolean, default: false },
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

ItemSchema.methods.addBid = async function (
  userId: mongoose.Types.ObjectId,
  limit: number,
) {
  const step = this.currentBid
    ? calculateStep(this.currentBid)
    : calculateStep(this.startPrice);
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const now = new Date();

  const timeLeft = this.auctionDates.endDate.getTime() - now.getTime();
  const fiveMinutesInMillis = 5 * 60 * 1000;

  if (timeLeft < fiveMinutesInMillis) {
    this.auctionDates.endDate = new Date(now.getTime() + fiveMinutesInMillis);
  }

  const existingBidIndex = this.bids.findIndex((bid: Bid) =>
    bid.user.equals(userId),
  );

  if (existingBidIndex !== -1) {
    this.bids[existingBidIndex].amount = limit;
    this.bids[existingBidIndex].createdAt = now;
  } else {
    this.bids.push({
      user: userId,
      amount: limit,
      createdAt: now,
    });
  }

  await this.recalculateCurrentBid(step);

  await user.updateBid(this._id, limit);

  await this.save();
};

ItemSchema.methods.recalculateCurrentBid = async function (step: number) {
  if (this.bids.length === 1) {
    this.currentBid = this.startPrice;
  } else if (this.bids.length > 1) {
    const sortedBids = this.bids
      .map((bid: Bid) => bid.amount)
      .sort((a: number, b: number) => b - a);

    const highestBid = sortedBids[0];
    const secondHighestBid = sortedBids[1];

    this.currentBid = secondHighestBid + step;

    if (this.currentBid > highestBid) {
      this.currentBid = highestBid;
    }
  }

  this.bids.forEach((bid: Bid) => {
    bid.isWinning = bid.amount >= this.currentBid;
  });
};

const Item: Model<ItemDocument> =
  mongoose.models.Item || mongoose.model<ItemDocument>("Item", ItemSchema);

export default Item;
