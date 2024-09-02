import mongoose, { Schema } from "mongoose";

const auctionSchema = new Schema({
  startDate: Date,
  endDate: Date,
});

const Dates = mongoose.models.Dates || mongoose.model("Dates", auctionSchema);

export default Dates;
