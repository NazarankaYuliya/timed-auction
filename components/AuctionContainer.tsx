"use client";

import { useEffect, useState } from "react";
import AuctionCountdown from "./AuctionCountdown";
import BidForm from "./BidForm";
import { IItem } from "@types";
import { subscribeToAuction } from "@utils/pusherUtils";
import { calculateTimeRemaining } from "@utils/timeUtils";

interface AuctionContainerProps {
  item: IItem;
  userId?: string;
  status: string;
}

const AuctionContainer = ({ item, userId, status }: AuctionContainerProps) => {
  const [currentBid, setCurrentBid] = useState<number>(item.currentBid);
  const [endDate, setEndDate] = useState<Date>(
    new Date(item.auctionDates.endDate),
  );
  const [startDate, setStartDate] = useState<Date>(
    new Date(item.auctionDates.startDate),
  );
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [auctionStatus, setAuctionStatus] = useState<string>("");
  const [isAuctionActive, setIsAuctionActive] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const start = new Date(startDate);

      if (now < start) {
        setAuctionStatus(
          `Los öffnet am ${start.toLocaleDateString(
            "de-DE",
          )} в ${start.toLocaleTimeString("de-DE")}`,
        );
        setIsAuctionActive(false);
      } else if (now < endDate) {
        setAuctionStatus("");
        setTimeRemaining(calculateTimeRemaining(endDate));
        setIsAuctionActive(true);
      } else {
        setAuctionStatus("Los geschlossen");
        setTimeRemaining("");
        setIsAuctionActive(false);
      }
    };

    const intervalId = setInterval(updateTime, 1000);
    updateTime();

    const unsubscribe = subscribeToAuction(
      item._id,
      (newBid) => setCurrentBid(newBid),
      (newEndDate) => setEndDate(new Date(newEndDate)),
    );

    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, [item._id, endDate, startDate]);

  return (
    <div className="flex flex-col gap-4">
      {status === "user" ? (
        <BidForm
          currentBid={currentBid}
          userId={userId}
          item={item}
          isAuctionActive={isAuctionActive}
        />
      ) : (
        <p className="text-sm text-gray-600 bg-gray-100 font-bold p-2 rounded-lg mb-4">
          <span role="img" aria-label="info">
            ⚠️
          </span>{" "}
          Melden Sie sich an, um ein Gebot abzugeben.
        </p>
      )}
      <div>
        {auctionStatus ? (
          <h2>{auctionStatus}</h2>
        ) : (
          <div className="font-mono text-sm">{timeRemaining}</div>
        )}
      </div>
    </div>
  );
};

export default AuctionContainer;
