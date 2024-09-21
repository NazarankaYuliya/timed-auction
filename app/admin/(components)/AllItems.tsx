"use client";

import { IItem } from "@types";
import { useEffect, useState } from "react";

const AllItems = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [pageLoading, setPageLoading] = useState(false);

  const fetchItems = async () => {
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

  useEffect(() => {
    fetchItems();
  }, []);

  if (pageLoading) return <p>Loading...</p>;
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 border-b">#</th>
              <th className="text-left py-2 px-4 border-b">Catalog Number</th>
              <th className="text-left py-2 px-4 border-b">Description</th>
              <th className="text-left py-2 px-4 border-b">Images</th>
              <th className="text-left py-2 px-4 border-b">Start Price</th>
              <th className="text-left py-2 px-4 border-b">Current Bid</th>
              <th className="text-left py-2 px-4 border-b">Bids</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: IItem, index: number) => (
              <tr key={item._id} className={`${item.isMarked && `bg-beige`}`}>
                <td className="py-2 px-4 border-b ">{index + 1}</td>
                <td className="py-2 px-4 border-b ">{item.catalogNumber}</td>
                <td className="py-2 px-4 border-b">{item.description}</td>
                <td className="py-2 px-4 border-b">{item.image?.length}</td>
                <td className="py-2 px-4 border-b">€{item.startPrice}</td>
                <td className="py-2 px-4 border-b">€{item.currentBid}</td>
                <td className="py-2 px-4 border-b">{item.bids?.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllItems;
