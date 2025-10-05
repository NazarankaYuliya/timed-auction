"use client";
import { useAuction } from "@/context/AuctionContext";

const AuctionStatusFilter = () => {
  const { statusFilter, setStatusFilter } = useAuction();

  return (
    <select
      className="border px-3 py-1 rounded w-full mt-2"
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(
          e.target.value as "all" | "upcoming" | "active" | "finished",
        )
      }
    >
      <option value="all">Alle Status</option>
      <option value="upcoming">Bald</option>
      <option value="active">Aktiv</option>
      <option value="finished">Beendet</option>
    </select>
  );
};

export default AuctionStatusFilter;
