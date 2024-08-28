import { connectToDB } from "@utils/database";
import Item from "@models/item";
import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

const URL = process.env.NINOX_LINK as string;

async function getItems() {
  try {
    const filters = {
      N1: "112",
    };
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      params: {
        filters: JSON.stringify(filters),
      },
    });
    const data = response.data;
    const filteredData = data.map((item: any) => ({
      catalogNumber: item.C,
      description: item.D,
      image: "",
    }));

    return NextResponse.json(filteredData);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      {
        status: 500,
      },
    );
  }
}

export async function POST() {
  try {
    await connectToDB();

    const rawItems = await getItems();
    const items = await rawItems.json();

    for (const item of items) {
      const { catalogNumber, description, image } = item;

      await Item.findOneAndUpdate(
        { catalogNumber },
        { description, image },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    }

    return NextResponse.json(
      { message: "Items uploaded or updated" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
