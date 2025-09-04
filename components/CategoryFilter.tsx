"use client";
import { useAuction } from "@/context/AuctionContext";
import { categories } from "@/data/categories";

export default function CategoryFilter() {
  const { category, setCategory } = useAuction();

  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-grafit">Kategorie</p>
      <button
        onClick={() => setCategory("all")}
        className={`px-3 py-1 ${
          category === "all"
            ? "bg-gold text-white"
            : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
        }`}
      >
        Alle
      </button>
      {Object.entries(categories).map(([code, name]) => (
        <button
          key={code}
          onClick={() => setCategory(code as any)}
          className={`px-3 py-1 ${
            category === code
              ? "bg-gold text-white"
              : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
          }`}
        >
          {name} ({code})
        </button>
      ))}
    </div>
  );
}
