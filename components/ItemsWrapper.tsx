"use client";

import { useEffect, useState } from "react";
import { IItem } from "@types";
import { subscribeToAuction } from "@utils/pusherUtils";
import ItemCard from "./ItemCard";

interface ItemsWrapperProps {
  items: IItem[];
  userId?: string;
  status: string;
}

const ItemsWrapper = ({ items, userId, status }: ItemsWrapperProps) => {
  const [auctionItems, setAuctionItems] = useState<IItem[]>(items);

  useEffect(() => {
    const updateItem = (itemId: string, currentBid: number, endDate: Date) => {
      setAuctionItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId ? { ...item, currentBid, endDate } : item,
        ),
      );
    };

    const unsubscribe = subscribeToAuction(updateItem);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {auctionItems.map((item: IItem) => (
        <ItemCard key={item._id} item={item} userId={userId} status={status} />
      ))}
    </div>
  );
};

export default ItemsWrapper;
