"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { IItem } from "@types";
import { subscribeToAuction } from "@utils/pusherUtils";
import ItemCard from "./ItemCard";
import Pagination from "./Pagination";
import { useAuction } from "@context/AuctionContext";
import Filters from "./Filters";
import { useRouter } from "next/navigation";

interface ItemsWrapperProps {
  items: IItem[];
  userId?: string;
  status: string;
}

const ItemsWrapper = ({ items, userId, status }: ItemsWrapperProps) => {
  const [auctionItems, setAuctionItems] = useState<IItem[]>(items);
  const { filter, category, page, pageSize, lotNumber } = useAuction();
  const router = useRouter();

  const unsubscribeRef = useRef<(() => void) | null>(null);

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

  useEffect(() => {
    const unsubscribe = subscribeToAuction(updateItem);
    unsubscribeRef.current = unsubscribe;
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setAuctionItems(items);
  }, [items]);

  useEffect(() => {
    const handleFocus = () => {
      router.refresh();

      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
      const newUnsub = subscribeToAuction(updateItem);
      unsubscribeRef.current = newUnsub;
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [router]);

  const filteredItems = useMemo(() => {
    let result = auctionItems;

    if (filter === "myBids" && userId) {
      result = result.filter((item) => item.winner === userId.toString());
    }

    if (category !== "all") {
      result = result.filter(
        (item) => item.description.categoryType === category,
      );
    }

    if (lotNumber) {
      const search = lotNumber.trim().toLowerCase();

      result = result.filter(
        (item) =>
          item.catalogNumber?.toString().toLowerCase().includes(search) ||
          item.description?.header?.toLowerCase().includes(search),
      );
    }

    return result;
  }, [auctionItems, filter, category, lotNumber, userId]);

  const pagedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, page, pageSize]);

  return (
    <div className="container mx-auto mt-10 p-6 flex flex-col lg:flex-row gap-8">
      <Filters userId={userId} />

      <div className="lg:w-3/4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 relative">
          {pagedItems.length > 0 ? (
            pagedItems.map((item) => (
              <ItemCard
                key={String(item._id)}
                item={item}
                userId={userId}
                status={status}
              />
            ))
          ) : (
            <p className="text-gray-500">Keine Artikel gefunden.</p>
          )}
        </div>

        <Pagination totalItems={filteredItems.length} />
      </div>
    </div>
  );
};

export default ItemsWrapper;
