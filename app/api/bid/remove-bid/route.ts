import mongoose from "mongoose";
import Item from "@models/item";
import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@utils/pusher";

export async function POST(req: NextRequest) {
  const { itemId, bidId } = await req.json();

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return NextResponse.json(
        { message: "Artikel nicht gefunden" },
        { status: 400 },
      );
    }

    await item.removeBid(new mongoose.Types.ObjectId(bidId));

    await pusherServer.trigger("auction-channel", `bid-updated`, {
      itemId: itemId,
      currentBid: item.currentBid,
      biddingStep: item.biddingStep,
      endDate: item.auctionDates.endDate,
      winner: item.winner,
    });

    return NextResponse.json({ message: "Bid deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
