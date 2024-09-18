"use client";

import { IBid, IItem } from "@types";
import React, { useEffect, useState } from "react";
import UserData from "../../(components)/UserData";
import RemoveBidButton from "../../(components)/RemoveBidButton";

const AllBids = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/admin/get-items", { method: "GET" });
      const data = await response.json();
      setItems(data.items);
    } catch (error) {
      console.error("Error fetching bids:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
  if (loading) return <p>Loading...</p>;
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
              <React.Fragment key={item._id}>
                {item.bids?.map((bid: IBid, bidIndex: number) => (
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
                    <td className="py-2 px-4 border-b">
                      {bid.user.toString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <UserData userId={bid.user} all={false} />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <RemoveBidButton itemId={item._id} bidId={bid._id} />
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

export default AllBids;
