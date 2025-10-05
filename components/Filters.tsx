"use client";
import { useState } from "react";
import AuctionFilter from "./AuctionFilter";
import CategoryFilter from "./CategoryFilter";
import PageSizeSelect from "./PageSizeSelect";
import LotSearch from "./LotSearch";
import AuctionStatusFilter from "./AuctionStatusFilter";

interface FiltersProps {
  userId?: string;
}

const Filters = ({ userId }: FiltersProps) => {
  const [open, setOpen] = useState(false);

  return (
    <aside className="lg:w-1/4 lg:max-w-[250px] mt-4 flex flex-col gap-1 lg:sticky lg:top-28 lg:self-start">
      <button
        className="flex items-center justify-between font-bold text-grafit lg:cursor-default"
        onClick={() => setOpen((prev) => !prev)}
      >
        Filter
        <span className="lg:hidden">{open ? "▲" : "▼"}</span>
      </button>

      <div className={`${open ? "block" : "hidden"} lg:block`}>
        <LotSearch />
        {userId && <AuctionFilter />}
        {/* <AuctionStatusFilter /> */}
        <PageSizeSelect />
        <CategoryFilter />
      </div>
    </aside>
  );
};

export default Filters;
