import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema(
  {
    catalogNumber: Number,
    description: String,
    image: [String],
  },
  {
    timestamps: true,
  },
);

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);
export default Item;
