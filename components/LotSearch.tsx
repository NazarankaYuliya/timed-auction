"use client";
import { useAuction } from "@/context/AuctionContext";

export default function LotSearch() {
  const { lotNumber, setLotNumber } = useAuction();

  return (
    <div className="mb-8 w-full relative">
      <input
        type="text"
        value={lotNumber}
        onChange={(e) => setLotNumber(e.target.value)}
        placeholder="Losnummer suchen…"
        className="w-full bg-gray-200 px-3 py-1 pr-8 rounded"
      />

      {lotNumber && (
        <button
          type="button"
          onClick={() => setLotNumber("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      )}
    </div>
  );
}
