import { connectToDB } from "@utils/database";
import Item from "@models/item";
import User from "@models/user";
import { IItem, IUser } from "@types";
import DownloadButton from "./DownloadButton";

export const dynamic = "force-dynamic";

const Winners = async () => {
  let items: IItem[] = [];
  let users: IUser[] = [];
  let winners: any[] = [];
  try {
    await connectToDB();

    const usersRow = await User.find({}).lean();
    users = usersRow.map((item: any) => ({
      ...item,
      _id: item._id.toString(),
    }));

    const itemsRow = await Item.find().populate("bids.user").lean();
    items = itemsRow.map((item: any) => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.error(error);
  }

  const groupedItems = items.reduce((acc: any, item: any) => {
    if (item.winner) {
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
    }
    return acc;
  }, {});

  winners = Object.values(groupedItems);

  const { totalBids, soldItemsCount, totalSoldValue } = items.reduce(
    (acc, item) => {
      acc.totalBids +=
        item.bids && Array.isArray(item.bids) ? item.bids.length : 0;
      if (item.winner) {
        acc.soldItemsCount += 1;
        acc.totalSoldValue += item.currentBid;
      }
      return acc;
    },
    { totalBids: 0, soldItemsCount: 0, totalSoldValue: 0 },
  );

  const soldPercentage =
    items.length > 0 ? ((soldItemsCount / items.length) * 100).toFixed(2) : 0;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div className="flex flex-col gap-4">
          <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-center items-center w-60">
            <p className="text-3xl font-bold">{items.length}</p>
            <h2 className="text-base text-gray-500 font-semibold uppercase">
              Total Items
            </h2>
          </div>

          <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-center items-center w-60">
            <p className="text-3xl font-bold">{soldItemsCount}</p>
            <h2 className="text-base text-gray-500 font-semibold uppercase">
              Sold Items
            </h2>
          </div>
        </div>

        <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-center items-center w-60">
          <p className="text-3xl font-bold">{soldPercentage} %</p>
          <h2 className="text-base text-gray-500 font-semibold uppercase">
            Sold Percentage
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {" "}
          <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-center items-center w-60">
            <p className="text-3xl font-bold">{totalBids}</p>
            <h2 className="text-base text-gray-500 font-semibold uppercase">
              Total Bids
            </h2>
          </div>
          <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-center items-center w-60">
            <p className="text-3xl font-bold">{winners.length}</p>
            <h2 className="text-base text-gray-500 font-semibold uppercase">
              Winners
            </h2>
          </div>
        </div>

        <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-center items-center w-60">
          <p className="text-3xl font-bold">€ {totalSoldValue.toFixed(2)}</p>
          <h2 className="text-base text-gray-500 font-semibold uppercase">
            Sold Price
          </h2>
        </div>
      </div>

      {winners.length > 0 && <DownloadButton winners={winners} />}

      <h2 className="text-xl font-bold mb-4">Winners List</h2>
      <div className="space-y-4">
        {winners.map((winner: any, index: number) => {
          const totalForWinner = winner.items.reduce(
            (acc: number, item: IItem) => acc + item.currentBid,
            0,
          );
          const totalWithCoefficients = winner.items.reduce(
            (acc: number, item: IItem) =>
              acc +
              item.currentBid * (item.isMarked ? 1.15 * 1.19 : 1 + 0.15 * 1.19),
            0,
          );

          return (
            <div
              key={winner.winnerId}
              className="border rounded-lg p-4 shadow-lg flex gap-4 justify-between hover:bg-gray-100 transition duration-300"
            >
              <div className="flex-shrink-0">
                <span className="font-bold text-xl">{index + 1}</span>
              </div>
              <div className="w-full">
                <p className="font-semibold">
                  {winner.winnerData.firstName} {winner.winnerData.lastName}
                </p>
                <p className="text-gray-600">{winner.winnerData.email}</p>
                <p className="text-gray-600">{winner.winnerData.phone}</p>
              </div>
              <div className="w-full">
                <div className="grid grid-cols-4 text-gray-500 mb-4">
                  <span>#</span>
                  <span>Catalog Nr.</span>
                  <span>Price</span>
                  <span>Price with VAT</span>
                </div>
                {winner.items.map((item: IItem, index: number) => (
                  <div
                    key={String(item._id)}
                    className={`grid grid-cols-4 border-t py-1 ${
                      item.isMarked ? "bg-beige" : ""
                    }`}
                  >
                    <span>{index + 1}.</span>
                    <span>{item.catalogNumber}</span>
                    <span>€ {item.currentBid.toFixed(2)}</span>
                    <span>
                      €{" "}
                      {(
                        item.currentBid *
                        (item.isMarked ? 1.15 * 1.19 : 1 + 0.15 * 1.19)
                      ).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="grid grid-cols-4 border-t pt-4 font-bold">
                  <span></span>
                  <span>Total:</span>
                  <span>€ {totalForWinner.toFixed(2)}</span>
                  <span>€ {totalWithCoefficients.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Winners;
