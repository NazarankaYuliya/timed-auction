"use client";

import React from "react";
import ImageComponent from "./ImageComponent";
import { IItem } from "@types";
import AuctionContainer from "./AuctionContainer";

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
      key={item._id}
      className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4 text-sm border-b border-gold"
    >
      <div className="flex items-center justify-center mb-4 sm:mb-0 col-span-1 ">
        <ImageComponent itemImage={item.image} />
      </div>

      <div className="pl-6 pr-6 pt-4 pb-4 flex flex-col gap-2  col-span-1 sm:col-span-2 md:col-span-2 border-0 border-gold sm:border-l  md:border-r">
        <p className="text-gold">Losnummer: {item.catalogNumber}</p>
        <p className="text-gold text-justify">
          Beschreibung:{" "}
          <span className="text-xs text-grafit">{item.description}</span>{" "}
        </p>
        <p className="text-gold">Aufruf: €{item.startPrice}</p>
      </div>

      <div className="pl-6 pr-6 pt-4 pb-4 col-span-1 sm:col-span-3 md:col-span-2 border-0 border-gold sm:border md:border-0">
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
