import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

import Item from "@models/item";
import User from "@models/user";

if (!mongoose.models.User) mongoose.model("User", User.schema);
if (!mongoose.models.Item) mongoose.model("Item", Item.schema);

export const dynamic = "force-dynamic";

const generateBidderNumber = (index: number) => {
  return String(index + 1);
};

export async function GET(req: Request) {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.PRIVATE_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDB();

    const items = await Item.find().populate("winner").lean();

    const uniqueWinners: any[] = [];
    const winnerMap: Record<string, string> = {};

    items.forEach((item: any) => {
      if (item.winner && !winnerMap[item.winner._id]) {
        const index = uniqueWinners.length;
        const bidderNumber = generateBidderNumber(index);
        winnerMap[item.winner._id] = bidderNumber;
        uniqueWinners.push(item.winner);
      }
    });

    const result = items.map((item: any) => ({
      catalogNumber: item.catalogNumber,
      description: item.description.header,
      startPrice: item.startPrice,
      currentBid: item.currentBid,
      bids: item.bids.length,
      isMarked: item.isMarked,
      soldPrice:
        item.currentBid * (item.isMarked ? 1.15 * 1.19 : 1 + 0.15 * 1.19),
      winnerBidderNumber: item.winner ? winnerMap[item.winner._id] : null,
    }));

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
