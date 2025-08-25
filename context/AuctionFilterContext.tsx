// @context/AuctionFilterContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type FilterType = "all" | "myBids";

interface AuctionFilterContextType {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
}

const AuctionFilterContext = createContext<
  AuctionFilterContextType | undefined
>(undefined);

export const AuctionFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [filter, setFilter] = useState<FilterType>("all");
  return (
    <AuctionFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </AuctionFilterContext.Provider>
  );
};

export const useAuctionFilter = () => {
  const ctx = useContext(AuctionFilterContext);
  if (!ctx)
    throw new Error(
      "useAuctionFilter must be used inside AuctionFilterProvider",
    );
  return ctx;
};
