import mongoose, { Schema, Document, Model } from "mongoose";
import crypto from "crypto";

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
  verificationCode: string;
  verifyToken: string;
  verifyTokenExpire: Date;
  isVerified: Boolean;
  bids: {
    itemId: mongoose.Types.ObjectId;
    amount: number;
    catalogNumber: number;
    currentBid: number;
  }[];
}

const UserSchema = new Schema<UserDocument>({
  firstName: String,
  lastName: String,
  email: String,
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
      amount: { type: Number },
      catalogNumber: { type: Number },
      currentBid: { type: Number },
    },
  ],
});

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
