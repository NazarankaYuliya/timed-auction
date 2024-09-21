import { connectToDB } from "@utils/database";
import Item from "@models/item";
import { NextResponse } from "next/server";
import { IItem } from "@types";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const items = await Item.find({ winner: { $ne: null } })
      .populate("bids.user")
      .lean();

    const groupedItems = items.reduce((acc: any, item: any) => {
      const winnerId = item.winner.toString();
      if (!acc[winnerId]) {
        acc[winnerId] = {
          winnerId,
          items: [],
          winnerData: item.bids.find(
            (bid: any) => bid.user._id.toString() === winnerId,
          )?.user,
        };
      }
      acc[winnerId].items.push(item);
      return acc;
    }, {});

    const result = Object.values(groupedItems);

    return NextResponse.json(
      { message: "Items fetched", groupedItems: result },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching items" },
      { status: 500 },
    );
  }
}
