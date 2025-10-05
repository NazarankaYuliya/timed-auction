import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import Item from "@models/item";

export const dynamic = "force-dynamic";

const generateBidderNumber = (index: number) => {
  return "B" + String(index + 1).padStart(4, "0");
};

export async function GET(req: Request) {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.PRIVATE_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDB();

    const items = await Item.find().populate("winner").lean();

    const grouped = items.reduce((acc: any, item: any) => {
      if (item.winner) {
        const winnerId = item.winner._id.toString();

        const {
          _id,
          firstName,
          lastName,
          company,
          email,
          phone,
          street,
          postalCode,
          city,
          country,
        } = item.winner;

        if (!acc[winnerId]) {
          acc[winnerId] = {
            winnerData: {
              _id,
              bidderNumber: "",
              firstName,
              lastName,
              company,
              email,
              phone,
              street,
              postalCode,
              city,
              country,
            },
            items: [],
          };
        }

        acc[winnerId].items.push({
          catalogNumber: item.catalogNumber,
          currentBid: item.currentBid,
          isMarked: item.isMarked,
          soldPrice:
            item.currentBid * (item.isMarked ? 1.15 * 1.19 : 1 + 0.15 * 1.19),
        });
      }
      return acc;
    }, {});

    const winners = Object.values(grouped).map(
      (winner: any, index: number) => ({
        ...winner,
        winnerData: {
          ...winner.winnerData,
          bidderNumber: generateBidderNumber(index),
        },
      }),
    );

    // === 3. Возвращаем итог ===
    return NextResponse.json(winners, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
