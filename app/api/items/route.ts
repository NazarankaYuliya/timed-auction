import { connectToDB } from "@utils/database";
import Item from "@models/item";
import { NextResponse } from "next/server";
import axios from "axios";
import { getValidBidOrSuggestion } from "@utils/verifyLimit";

const URL = process.env.NINOX_LINK as string;

async function getItems() {
  try {
    const filters = {
      N1: "130",
    };
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      params: {
        filters: JSON.stringify(filters),
        perPage: 2000,
      },
    });

    const data = response.data;
    const filteredData = data.map((item: any) => ({
      catalogNumber: item.C,
      description: {
        header: item.G5,
        producer: item.H5,
        type: item.I5,
        year: item.J5,
        sn: item.K5,
        condition: item.L5,
        details: item.M5,
      },
      startPrice: getValidBidOrSuggestion(+item.M2 ? +item.M2 : 0),
      isMarked: item.N2 && item.N2 === true,
      image: item.O4,
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
      const { catalogNumber, description, startPrice, isMarked, image } = item;

      await Item.findOneAndUpdate(
        { catalogNumber },
        { description, startPrice, isMarked, image },
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
