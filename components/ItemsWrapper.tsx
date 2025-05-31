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
    const updateItem = (
      itemId: string,
      currentBid: number,
      biddingStep: number,
      endDate: Date,
      winner: string,
    ) => {
      setAuctionItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId
            ? {
                ...item,
                currentBid,
                auctionDates: {
                  ...item.auctionDates,
                  endDate,
                },
                biddingStep,
                winner,
              }
            : item,
        ),
      );
    };

    const unsubscribe = subscribeToAuction(updateItem);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="container flex flex-wrap justify-center gap-8 mx-auto mt-10 p-6  relative">
      {auctionItems.map((item: IItem) => (
        <ItemCard
          key={String(item._id)}
          item={item}
          userId={userId}
          status={status}
        />
      ))}
    </div>
  );
};

export default ItemsWrapper;
