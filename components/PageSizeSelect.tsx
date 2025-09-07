"use client";
import { useAuction } from "@context/AuctionContext";

const PageSizeButtons = () => {
  const { pageSize, setPageSize, setPage } = useAuction();

  const options = [24, 48, 96];

  return (
    <div className="flex flex-col gap-1 w-full mb-4">
      <span className="font-bold text-grafit">Pro Seite</span>
      <div className="flex gap-2">
        {options.map((size) => (
          <button
            key={size}
            onClick={() => {
              setPageSize(size);
              setPage(1);
            }}
            className={`w-full px-3 py-1 text-sm font-medium transition ${
              pageSize === size
                ? "bg-gold text-white"
                : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PageSizeButtons;
