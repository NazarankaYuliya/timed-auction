import { connectToDB } from "@utils/database";
import Dates from "@models/auctionDate";
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

    await Dates.deleteMany({});

    await Dates.create({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    return NextResponse.json({ message: "Dates updated!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
