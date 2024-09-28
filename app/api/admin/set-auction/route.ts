import { connectToDB } from "@utils/database";
import Item from "@models/item";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { startDate, endDate } = await req.json();

  try {
    await connectToDB();

    if (!startDate || !endDate) {
      return NextResponse.json(
        { message: "Start and End Dates are required!" },
        { status: 400 },
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    await Item.updateMany(
      {},
      {
        $set: { "auctionDates.startDate": start, "auctionDates.endDate": end },
      },
    );

    return NextResponse.json(
      { message: "Dates updated for all items!" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating auction dates" },
      { status: 500 },
    );
  }
}
