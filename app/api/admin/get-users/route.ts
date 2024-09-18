import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import User from "@models/user";

export async function GET() {
  try {
    await connectToDB();

    const users = await User.find({}).lean();

    return NextResponse.json(
      { message: "Items fetched", users },
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
