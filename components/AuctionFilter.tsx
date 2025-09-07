// components/AuctionFilter.tsx
"use client";

import { useAuction } from "@context/AuctionContext";

export default function AuctionFilter() {
  const { filter, setFilter } = useAuction();

  return (
    <div className="flex flex-col gap-1 mb-4 justify-center">
      <button
        onClick={() => setFilter("all")}
        className={`px-3 py-1 ${
          filter === "all"
            ? "bg-gold text-white"
            : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
        }`}
      >
        Alle Lose
      </button>

      <button
        onClick={() => setFilter("myBids")}
        className={`px-3 py-1 ${
          filter === "myBids"
            ? "bg-gold text-white"
            : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
        }`}
      >
        Meine Gebote
      </button>
    </div>
  );
}
