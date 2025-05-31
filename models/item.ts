import mongoose, { Schema, Document, Model } from "mongoose";
import { calculateStep } from "@utils/calculateStep";

interface Bid {
  _id: mongoose.Types.ObjectId;
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
  biddingStep: number;
  image: string;
  bids: Bid[];
  auctionDates: AuctionDates;
  isMarked: boolean;
  addBid: (userId: mongoose.Types.ObjectId, limit: number) => Promise<void>;
  removeBid: (bidId: mongoose.Types.ObjectId) => Promise<void>;
  winner: mongoose.Types.ObjectId;
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
    biddingStep: { type: Number },
    image: { type: String, default: "" },
    bids: { type: [BidSchema], default: [] },
    auctionDates: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    isMarked: { type: Boolean, default: false },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
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

  await this.recalculateCurrentBid();
  await this.save();
};

ItemSchema.methods.removeBid = async function (bidId: mongoose.Types.ObjectId) {
  this.bids = this.bids.filter((bid: Bid) => !bid._id.equals(bidId));
  await this.recalculateCurrentBid();
  await this.save();
};

ItemSchema.methods.recalculateCurrentBid = async function () {
  if (this.bids.length === 0) {
    this.currentBid = null;
    this.biddingStep = null;
    this.winner = null;
  } else {
    if (this.bids.length === 1) {
      this.currentBid = this.startPrice;
      this.biddingStep = calculateStep(this.currentBid);
    } else if (this.bids.length > 1) {
      const sortedBids = this.bids
        .map((bid: Bid) => bid.amount)
        .sort((a: number, b: number) => b - a);

      const highestBid = sortedBids[0];
      const secondHighestBid = sortedBids[1];

      this.biddingStep = calculateStep(secondHighestBid);

      this.currentBid = secondHighestBid + this.biddingStep;

      if (this.currentBid > highestBid) {
        this.currentBid = highestBid;
      }
      this.biddingStep = calculateStep(this.currentBid);
    }

    this.bids.forEach((bid: Bid) => {
      bid.isWinning = bid.amount >= this.currentBid;
    });

    const winningBids = this.bids.filter((bid: Bid) => bid.isWinning);
    this.winner = winningBids[0].user;

    if (winningBids.length > 1) {
      winningBids.sort(
        (a: Bid, b: Bid) => a.createdAt!.getTime() - b.createdAt!.getTime(),
      );
      const earliestWinningBid = winningBids[0];
      this.bids.forEach((bid: Bid) => {
        bid.isWinning = bid.isWinning && bid._id.equals(earliestWinningBid._id);
      });

      this.winner = earliestWinningBid.user;
    }
  }
};

const Item: Model<ItemDocument> =
  mongoose.models.Item || mongoose.model<ItemDocument>("Item", ItemSchema);

export default Item;
