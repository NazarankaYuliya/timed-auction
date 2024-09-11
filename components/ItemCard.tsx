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
      className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row bg-white"
    >
      <div className="md:w-1/3 mb-4 md:mb-0">
        <ImageComponent itemImage={item.image} />
      </div>

      <div className="md:w-2/3 md:ml-4 flex flex-col justify-between">
        <p className="text-blue-600 font-semibold mb-2">
          Losnummer: {item.catalogNumber}
        </p>
        <p className="text-gray-700 mb-4">{item.description}</p>
        <p className="text-blue-600 font-semibold mb-2">
          Aufruf: €{item.startPrice}
        </p>

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
  );
};

export default ItemCard;
