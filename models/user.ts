import mongoose, { Schema, Document, Model } from "mongoose";
import crypto from "crypto";

interface Bid {
  itemId: mongoose.Types.ObjectId;
  limit: number;
}

interface UserDocument extends Document {
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
  verificationCode: string | undefined;
  verifyToken: string | undefined;
  verifyTokenExpire: Date | undefined;
  isVerified: Boolean;
  bids: Bid[];
  updateBid: (itemId: mongoose.Types.ObjectId, limit: number) => Promise<void>;
  getVerificationToken: () => string;
}

const UserSchema = new Schema<UserDocument>({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  street: String,
  postalCode: String,
  city: String,
  country: String,
  phone: String,
  agb: String,
  verificationCode: String,
  verifyToken: String,
  verifyTokenExpire: Date,
  isVerified: Boolean,
  bids: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      limit: { type: Number },
    },
  ],
});

UserSchema.methods.updateBid = async function (
  itemId: mongoose.Types.ObjectId,
  limit: number,
) {
  const existingBidIndex = this.bids.findIndex((bid: Bid) =>
    bid.itemId.equals(itemId),
  );

  if (existingBidIndex !== -1) {
    this.bids[existingBidIndex].limit = limit;
  } else {
    this.bids.push({
      itemId,
      limit,
    });
  }

  await this.save();
};

UserSchema.methods.getVerificationToken = function (): string {
  const verificationToken = crypto.randomBytes(20).toString("hex");

  this.verifyToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.verifyTokenExpire = new Date(Date.now() + 30 * 60 * 1000);

  return verificationToken;
};

const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default User;
