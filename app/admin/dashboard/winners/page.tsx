import { connectToDB } from "@utils/database";
import Item from "@models/item";
import { IItem } from "@types";

export const dynamic = "force-dynamic";

const Winners = async () => {
  let items: any[] = [];
  try {
    await connectToDB();
    const rowItems = await Item.find({ winner: { $ne: null } })
      .populate("bids.user")
      .lean();

    const groupedItems = rowItems.reduce((acc: any, item: any) => {
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

    items = Object.values(groupedItems);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="container flex flex-col gap-2 border p-4">
      {items.map((winner: any) => (
        <div key={winner.winnerId} className="w-full flex justify-between">
          <div className="w-full">
            <p>
              {winner.winnerData.firstName} {winner.winnerData.lastName}
            </p>
            <p>{winner.winnerData.email}</p>
            <p>{winner.winnerData.phone}</p>
          </div>

          <div className="w-full flex flex-col gap-2 justify-center">
            {winner.items.map((item: IItem) => (
              <div key={item._id} className="w-full flex gap-6">
                <p>{item.catalogNumber}</p>
                <p>€ {item.currentBid.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Winners;
