import React from "react";
import ItemInnerCard from "./ItemInnerCard";

interface Bid {
  user: string;
  amount: number;
  userName?: string;
  createdAt?: Date;
}

interface ItemCardProps {
  item: {
    _id: string;
    catalogNumber: number;
    description: string;
    startPrice: number;
    currentBid: number;
    auctionDates: {
      startDate: Date;
      endDate: Date;
    };
    bids: Bid[];
  };
  userId: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, userId }: ItemCardProps) => {
  const userBid = item.bids?.find(
    (bid) => bid.user.toString() === userId.toString(),
  );

  return (
    <div
      key={item._id}
      className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row bg-white"
    >
      <div className="md:w-1/3 mb-4 md:mb-0">
        {/* <SwiperComponent images={item.image || []} /> */}
      </div>
      <div className="md:w-2/3 md:ml-4 flex flex-col justify-between">
        <p className="text-blue-600 font-semibold mb-2">
          Losnummer: {item.catalogNumber}
        </p>
        <p className="text-gray-700 mb-4">{item.description}</p>
        <p className="text-blue-600 font-semibold mb-2">
          Aufruf: €{item.startPrice}
        </p>

        <ItemInnerCard
          initialCurrentBid={item.currentBid}
          startDate={item.auctionDates.startDate}
          initialEndDate={item.auctionDates.endDate}
          initialUserBidAmount={userBid?.amount}
          userId={userId.toString()}
          itemId={item._id.toString()}
        />
      </div>
    </div>
  );
};

export default ItemCard;
