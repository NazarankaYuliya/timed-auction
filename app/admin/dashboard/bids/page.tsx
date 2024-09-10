import { connectToDB } from "@utils/database";
import Item from "@models/item";
import User from "@models/user";
import { IBid, IItem } from "@types";
import React from "react";

const AllBids = async () => {
  await connectToDB();

  const items: IItem[] = await Item.find({}).lean();

  const userIds = Array.from(
    new Set(
      items.flatMap(
        (item) => item.bids?.map((bid) => bid.user.toString()) || [],
      ),
    ),
  );

  const users = await User.find({ _id: { $in: userIds } }).lean();

  const getUserFullName = (userId: string) => {
    const user = users.find((user) => user._id.toString() === userId);
    return user ? `${user.firstName} ${user.lastName}` : "N/A";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Bids</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 border-b">#</th>
              <th className="text-left py-2 px-4 border-b">Catalog Number</th>
              <th className="text-left py-2 px-4 border-b">Catalog Price</th>
              <th className="text-left py-2 px-4 border-b">Current Bid</th>
              <th className="text-left py-2 px-4 border-b">Bid Date</th>
              <th className="text-left py-2 px-4 border-b">Limit</th>
              <th className="text-left py-2 px-4 border-b">User ID</th>
              <th className="text-left py-2 px-4 border-b">Full Name</th>{" "}
            </tr>
          </thead>
          <tbody>
            {items.map((item: IItem, index: number) => (
              <React.Fragment key={item._id}>
                {" "}
                {/* Добавляем ключ на уровне фрагмента */}
                {item.bids?.map((bid: IBid, bidIndex: number) => (
                  <tr key={`${item._id}-${bidIndex}`}>
                    {" "}
                    {/* Ключ для каждой строки */}
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{item.catalogNumber}</td>
                    <td className="py-2 px-4 border-b">€{item.startPrice}</td>
                    <td className="py-2 px-4 border-b">€{item.currentBid}</td>
                    <td className="py-2 px-4 border-b">
                      {bid.createdAt
                        ? new Date(bid.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">€{bid.amount}</td>
                    <td className="py-2 px-4 border-b">
                      {bid.user.toString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {getUserFullName(bid.user.toString())}
                    </td>{" "}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBids;
