import mongoose, { Schema } from "mongoose";
import crypto from "crypto";

const UserSchema = new Schema({
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

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
