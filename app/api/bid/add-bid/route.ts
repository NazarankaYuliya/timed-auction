import mongoose from "mongoose";
import Item from "@models/item";
import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@utils/pusher";

export async function POST(req: NextRequest) {
  const { itemId, userId, bidAmount } = await req.json();

  if (
    !mongoose.Types.ObjectId.isValid(itemId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return NextResponse.json(
      { message: "Invalid item or user ID" },
      { status: 400 },
    );
  }

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 400 });
    }

    await item.addBid(new mongoose.Types.ObjectId(userId), bidAmount);

    await pusherServer.trigger("auction-channel", `bid-updated-${itemId}`, {
      currentBid: item.currentBid,
      bids: item.bids,
      endDate: item.auctionDates.endDate,
    });

    return NextResponse.json(
      { message: "Bid placed successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Error placing bid" }, { status: 500 });
  }
}
