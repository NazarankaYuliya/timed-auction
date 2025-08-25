// components/AuctionFilter.tsx
"use client";
import { useAuctionFilter } from "@context/AuctionFilterContext";

export default function AuctionFilter() {
  const { filter, setFilter } = useAuctionFilter();

  return (
    <div className="flex gap-2 mb-6 justify-center">
      <button
        onClick={() => setFilter("all")}
        className={`px-3 py-1 border rounded ${
          filter === "all" ? "bg-grafit text-white" : ""
        }`}
      >
        Alle Lose
      </button>

      <button
        onClick={() => setFilter("myBids")}
        className={`px-3 py-1 border rounded ${
          filter === "myBids" ? "bg-grafit text-white" : ""
        }`}
      >
        Meine Gebote
      </button>
    </div>
  );
}
