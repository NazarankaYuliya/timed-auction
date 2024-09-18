import { connectToDB } from "@utils/database";
import Item from "@models/item";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const items = await Item.find({}).lean();

    return NextResponse.json(
      { message: "Items fetched", items },
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
