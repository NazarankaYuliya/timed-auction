import mongoose from "mongoose";
import Item from "@models/item";
import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@utils/pusher";
import { getValidBidOrSuggestion } from "@utils/verifyLimit";

export async function POST(req: NextRequest) {
  const { itemId, userId, bidAmount } = await req.json();

  if (
    !mongoose.Types.ObjectId.isValid(itemId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return NextResponse.json(
      { message: "Ungültige Artikel- oder Benutzer-ID" },
      { status: 400 },
    );
  }

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return NextResponse.json(
        { message: "Artikel nicht gefunden" },
        { status: 400 },
      );
    }

    if (bidAmount < item.startPrice) {
      return NextResponse.json(
        {
          message: "Das Gebot darf nicht niedriger als der Startpreis sein",
        },
        { status: 400 },
      );
    }

    if (bidAmount < item.currentBid) {
      return NextResponse.json(
        {
          message: "Das Gebot darf nicht niedriger als das aktuelle Gebot sein",
        },
        { status: 400 },
      );
    }

    const validBid = getValidBidOrSuggestion(bidAmount);
    if (typeof validBid === "number" && validBid !== bidAmount) {
      return NextResponse.json(
        { message: `Ungültiges Gebot. Versuchen Sie: €${validBid}` },
        { status: 400 },
      );
    }

    await item.addBid(new mongoose.Types.ObjectId(userId), bidAmount);

    await pusherServer.trigger("auction-channel", `bid-updated`, {
      itemId: itemId,
      currentBid: item.currentBid,
      biddingStep: item.biddingStep,
      endDate: item.auctionDates.endDate,
    });

    return NextResponse.json(
      { message: "Gebot erfolgreich abgegeben" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Fehler beim Platzieren des Gebots" },
      { status: 500 },
    );
  }
}
