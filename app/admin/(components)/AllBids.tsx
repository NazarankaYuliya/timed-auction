"use client";

import { IItem } from "@types";
import React, { useEffect, useState } from "react";

const AllBids = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchItems = async () => {
    setItems([]);
    setPageLoading(true);
    try {
      const response = await fetch("/api/admin/get-items", { method: "GET" });
      const data = await response.json();
      setItems(data.items);
    } catch (error) {
      console.error("Error fetching bids:", error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleDeleteBid = async (itemId: string, bidId: string) => {
    setDeleteLoading(true);
    try {
      await fetch("/api/bid/remove-bid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, bidId }),
      });
    } catch (error) {
      console.error("Error deleting bid:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    return () => {
      setItems([]);
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <button onClick={fetchItems} className="border p-2">
        {pageLoading ? "Loading" : "Refresh bids"}
      </button>
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
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDeleteBid(item._id, bid._id)}
                      >
                        {deleteLoading ? "Loading" : "Delete"}
                      </button>
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
