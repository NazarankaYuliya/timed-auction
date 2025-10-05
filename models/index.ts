import mongoose from "mongoose";
import User from "./user";
import Item from "./item";

export { User, Item };

if (!mongoose.models.User) mongoose.model("User", User.schema);
if (!mongoose.models.Item) mongoose.model("Item", Item.schema);
