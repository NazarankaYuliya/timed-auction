import { list } from "@vercel/blob";
import { connectToDB } from "@utils/database";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import Item from "@models/item";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename") || "";

  if (filename && request.body) {
    const blob = await put(filename, request.body, {
      access: "public",
    });

    const catalogNumber = parseInt(filename.split("_")[0]);

    await connectToDB();
    await Item.findOneAndUpdate(
      { catalogNumber },
      { $push: { image: blob.url } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return NextResponse.json(blob, { status: 201 });
  } else {
    return NextResponse.json({ message: "No filename detecded" });
  }
}
