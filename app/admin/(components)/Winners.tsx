"use client";

import { IItem } from "@types";
import { useEffect, useState } from "react";

const AllWinners = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/admin/get-winners");
      const data = await response.json();
      setItems(data.groupedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <p>Loading...</p>;

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

export default AllWinners;
