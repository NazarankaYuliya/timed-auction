"use client";
import { useEffect, useMemo, useState } from "react";
import { IItem } from "@types";
import { subscribeToAuction } from "@utils/pusherUtils";
import ItemCard from "./ItemCard";
import Pagination from "./Pagination";
import { usePagination } from "@context/PaginationContext";
import { useAuctionFilter } from "@context/AuctionFilterContext";
import AuctionFilter from "./AuctionFilter";

interface ItemsWrapperProps {
  items: IItem[];
  userId?: string;
  status: string;
}

const ItemsWrapper = ({ items, userId, status }: ItemsWrapperProps) => {
  const [auctionItems, setAuctionItems] = useState<IItem[]>(items);
  const { page, pageSize } = usePagination();
  const { filter } = useAuctionFilter();

  // live updates
  useEffect(() => {
    const updateItem = (
      itemId: string,
      currentBid: number,
      biddingStep: number,
      endDate: Date,
      winner: string,
    ) => {
      setAuctionItems((prev) =>
        prev.map((item) =>
          item._id === itemId
            ? {
                ...item,
                currentBid,
                auctionDates: { ...item.auctionDates, endDate },
                biddingStep,
                winner,
              }
            : item,
        ),
      );
    };
    const unsubscribe = subscribeToAuction(updateItem);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setAuctionItems(items);
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!userId) return auctionItems;

    if (filter === "myBids") {
      return auctionItems.filter((item) => item.winner === userId.toString());
    }

    return auctionItems;
  }, [auctionItems, filter, userId]);

  const pagedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, page, pageSize]);

  return (
    <div className="container mx-auto mt-10 p-6">
      {/* фильтр только для залогиненых */}
      {userId && <AuctionFilter />}

      <div className="flex flex-wrap justify-center gap-8 relative">
        {pagedItems.map((item) => (
          <ItemCard
            key={String(item._id)}
            item={item}
            userId={userId}
            status={status}
          />
        ))}
      </div>

      <Pagination totalItems={filteredItems.length} />
    </div>
  );
};

export default ItemsWrapper;
