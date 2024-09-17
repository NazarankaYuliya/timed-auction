import Item from "@models/item";
import { IItem } from "@types";
import { connectToDB } from "@utils/database";
import UserData from "../(components)/UserData";

const AllItems = async () => {
  let items: IItem[] = [];

  try {
    await connectToDB();

    items = await Item.find({ winner: { $ne: null } }).lean();
  } catch (error) {
    console.log(error);
  }

  const itemsByWinners = items.reduce(
    (acc: Record<string, IItem[]>, item: IItem) => {
      const winnerId = item.winner.toString();
      if (!acc[winnerId]) {
        acc[winnerId] = [];
      }
      acc[winnerId].push(item);
      return acc;
    },
    {},
  );

  return (
    <div className="container mx-auto p-2">
      <div className="">
        {Object.keys(itemsByWinners).map((winnerId, winnerIndex) => (
          <div key={winnerId} className="mb-8">
            <div className="bg-gray-100 py-2 px-4 flex gap-10">
              <div className="flex justify-center items-center ">
                <span className="text-xl text-grafit font-bold">
                  {winnerIndex + 1}
                </span>{" "}
              </div>
              <UserData userId={winnerId} all={true} />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white mt-4">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4 border-b">#</th>
                    <th className="text-left py-2 px-4 border-b">
                      Catalog Number
                    </th>
                    <th className="text-left py-2 px-4 border-b">Price</th>
                    <th className="text-left py-2 px-4 border-b">
                      Price with VAT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {itemsByWinners[winnerId].map(
                    (item: IItem, index: number) => (
                      <tr
                        key={item._id}
                        className={`${item.isMarked && `bg-beige`}`}
                      >
                        <td className="py-2 px-4 border-b ">{index + 1}</td>
                        <td className="py-2 px-4 border-b">
                          {item.catalogNumber}
                        </td>
                        <td className="py-2 px-4 border-b">
                          €{item.currentBid}
                        </td>
                        <td className="py-2 px-4 border-b">
                          €
                          {item.isMarked
                            ? item.currentBid * 1.15 * 1.19
                            : item.currentBid + item.currentBid * 0.15 * 1.19}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllItems;
