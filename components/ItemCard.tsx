"use client";

import React, { useState } from "react";
import ImageComponent from "./ImageComponent";
import { IItem } from "@types";
import AuctionContainer from "./AuctionContainer";
import ItemDescription from "./ItemDescription";

interface ItemCardProps {
  item: IItem;
  userId?: string;
  status: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  userId,
  status,
}: ItemCardProps) => {
  return (
    <div
      id={`item-${item.catalogNumber}`}
      key={item._id}
      className="w-80 h-auto flex flex-col shadow-lg font-display p-4 bg-white"
    >
      <div className="flex items-center justify-center w-full h-72 relative cursor-pointer">
        <ImageComponent itemImage={item.image} />
      </div>

      <div className="w-full flex-1 flex flex-col gap-1 mt-2">
        <ItemDescription
          catalogNumber={item.catalogNumber}
          description={item.description}
        />
        <div className="w-full flex justify-between gap-6 mt-auto">
          <span className="text-grafit"> Aufruf:</span>
          <span className=" font-semibold text-grafit">
            € {item.startPrice.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="w-full mt-auto">
        <AuctionContainer
          item={{
            ...item,
            _id: item._id.toString(),
            bids: item.bids?.map((bid) => ({
              ...bid,
              _id: bid._id.toString(),
              user: bid.user.toString(),
            })),
            winner: item.winner?.toString(),
          }}
          userId={userId?.toString()}
          status={status}
        />
      </div>
    </div>
  );
};

export default ItemCard;
