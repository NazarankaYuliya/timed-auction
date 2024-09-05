"use client";

import React, { useEffect, useState } from "react";
import AuctionCountdown from "./AuctionCountdown";
import BidForm from "./BidForm";
import { pusherClient } from "@utils/pusher";

interface ItemInnerCardProps {
  initialCurrentBid: number;
  startDate: Date;
  initialEndDate: Date;
  initialUserBidAmount?: number;
  userId: string;
  itemId: string;
}

const ItemInnerCard: React.FC<ItemInnerCardProps> = ({
  initialCurrentBid,
  startDate,
  initialEndDate,
  initialUserBidAmount,
  userId,
  itemId,
}) => {
  const [currentBid, setCurrentBid] = useState(initialCurrentBid);
  const [userBidAmount, setUserBidAmount] = useState(initialUserBidAmount);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [isAuctionActive, setIsAuctionActive] = useState<boolean>(false);

  useEffect(() => {
    const now = new Date();
    const auctionStarted = now >= startDate;
    const auctionEnded = now > endDate;

    setIsAuctionActive(auctionStarted && !auctionEnded);

    if (auctionStarted && !auctionEnded) {
      const channel = pusherClient.subscribe("auction-channel");
      const event = `bid-updated-${itemId}`;

      channel.bind(
        event,
        (data: { currentBid: number; bids: any[]; endDate: Date }) => {
          setCurrentBid(data.currentBid);
          setUserBidAmount(
            data.bids.find((bid) => bid.user.toString() === userId)?.amount,
          );
          if (data.endDate) {
            setEndDate(new Date(data.endDate));
          }
        },
      );

      return () => {
        channel.unbind(event);
        pusherClient.unsubscribe("auction-channel");
      };
    }
  }, [startDate, endDate, itemId, userId]);

  return (
    <div className="">
      <p className="text-blue-600 font-semibold mb-2">
        Aktuelles Gebot:{" "}
        {currentBid > 0 ? (
          <span className="text-blue-600 font-semibold mb-2">
            €{currentBid}
          </span>
        ) : (
          <span className="text-gray-500 mb-2">Noch keine Gebote</span>
        )}
      </p>

      <p className="text-blue-600 font-semibold mb-2">
        Ihr Limit:{" "}
        {userBidAmount ? (
          <span className="text-blue-600 font-semibold mb-2">
            €{userBidAmount}
          </span>
        ) : (
          <span className="text-gray-500 mb-2">
            Sie haben noch kein Gebot abgegeben
          </span>
        )}
      </p>

      <AuctionCountdown
        startDate={startDate}
        endDate={endDate}
        userId={userId}
        itemId={itemId}
      />
    </div>
  );
};

export default ItemInnerCard;
