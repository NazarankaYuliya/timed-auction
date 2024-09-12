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
      className="border-b-2 border-grafit p-4 flex flex-col sm:flex-row hover:border-gold"
    >
      <div className="flex-shrink-0 flex items-center mb-4 sm:mb-0">
        <ImageComponent itemImage={item.image} />
      </div>

      <div className="flex flex-col md:flex-row flex-1 gap-6">
        <div className="flex-1 min-w-0 flex flex-col gap-2 ">
          <p className="text-gold ">Losnummer: {item.catalogNumber}</p>
          <p className="text-gold">Aufruf: €{item.startPrice}</p>
          <p className="text-gold text-justify">
            Beschreibung:{" "}
            <span className="text-sm text-grafit ">{item.description}</span>{" "}
          </p>
        </div>

        <div className="flex-1 min-w-0">
          <AuctionContainer
            item={{
              ...item,
              _id: item._id.toString(),
              bids: item.bids?.map((bid) => ({
                ...bid,
                _id: bid._id.toString(),
                user: bid.user.toString(),
              })),
            }}
            userId={userId?.toString()}
            status={status}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
