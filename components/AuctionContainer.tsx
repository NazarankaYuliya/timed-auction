"use client";

import { useEffect, useState } from "react";
import BidForm from "./BidForm";
import { IItem } from "@types";
import { calculateTimeRemaining } from "@utils/timeUtils";

interface AuctionContainerProps {
  item: IItem;
  userId?: string;
  status: string;
}

const AuctionContainer = ({ item, userId, status }: AuctionContainerProps) => {
  const [currentBid, setCurrentBid] = useState<number>(item.currentBid);
  const [endDate, setEndDate] = useState<Date>(item.auctionDates.endDate);
  const [startDate, setStartDate] = useState<Date>(item.auctionDates.startDate);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [auctionStatus, setAuctionStatus] = useState<string>("");
  const [isAuctionActive, setIsAuctionActive] = useState<boolean>(false);

  useEffect(() => {
    setCurrentBid(item.currentBid);
    setEndDate(item.auctionDates.endDate);
    setStartDate(item.auctionDates.startDate);

    const updateTime = () => {
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (now < start) {
        setAuctionStatus(
          `Los öffnet am ${start.toLocaleDateString()} в ${start.toLocaleTimeString()}`,
        );
        setIsAuctionActive(false);
      } else if (now < end) {
        setAuctionStatus("");
        setTimeRemaining(calculateTimeRemaining(end));
        setIsAuctionActive(true);
      } else {
        setAuctionStatus("Los geschlossen");
        setTimeRemaining("");
        setIsAuctionActive(false);
      }
    };

    const intervalId = setInterval(updateTime, 1000);
    updateTime();

    return () => clearInterval(intervalId);
  }, [item, endDate, startDate]);

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