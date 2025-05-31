import React from "react";
import RemoveBidButton from "@app/admin/(components)/RemoveBidButton";
import { IItem, IUser } from "@types";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import Item from "@models/item";

export const dynamic = "force-dynamic";

const Bids = async () => {
  let items: IItem[] = [];
  let users: IUser[] = [];

  try {
    await connectToDB();

    const usersRow = await User.find({}).lean();
    users = usersRow.map((item: any) => ({
      ...item,
      _id: item._id.toString(),
    }));

    const rawItems = await Item.find({}).populate("bids.user").lean<IItem[]>();
    items = rawItems.map((item) => ({
      ...item,
      _id: item._id.toString(),
      bids:
        item.bids?.map((bid) => ({
          ...bid,
          _id: bid._id.toString(),
          user: bid.user.toString(),
        })) ?? [],
      winner: item.winner?.toString() ?? "",
      auctionDates: {
        startDate: new Date(item.auctionDates.startDate),
        endDate: new Date(item.auctionDates.endDate),
      },
    }));
  } catch (error) {
    console.error(error);
  }
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 border-b">Catalog Number</th>
              <th className="text-left py-2 px-4 border-b">Catalog Price</th>
              <th className="text-left py-2 px-4 border-b">Current Bid</th>
              <th className="text-left py-2 px-4 border-b">Limit</th>
              <th className="text-left py-2 px-4 border-b">Bid Date</th>
              <th className="text-left py-2 px-4 border-b">Bidder ID</th>
              <th className="text-left py-2 px-4 border-b">Bidder Data</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: IItem, index: number) => (
              <React.Fragment key={String(item._id)}>
                {item.bids?.map((bid: any, bidIndex: number) => (
                  <tr key={`${item._id}-${bidIndex}`}>
                    <td className="py-2 px-4 border-b">{item.catalogNumber}</td>
                    <td className="py-2 px-4 border-b">€{item.startPrice}</td>
                    <td className="py-2 px-4 border-b">€{item.currentBid}</td>
                    <td className="py-2 px-4 border-b">€{bid.amount}</td>
                    <td className="py-2 px-4 border-b">
                      {bid.createdAt
                        ? new Date(bid.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">{bid.user._id}</td>
                    <td className="py-2 px-4 border-b">
                      {bid.user.firstName} {bid.user.lastName}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <RemoveBidButton
                        itemId={item._id.toString()}
                        bidId={bid._id.toString()}
                      />
                    </td>
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

export default Bids;
