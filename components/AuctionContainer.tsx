"use client";

import { useEffect, useState } from "react";
import BidForm from "./BidForm";
import { IItem } from "@types";
import { calculateTimeRemaining, formatDateAndTime } from "@utils/timeUtils";

interface AuctionContainerProps {
  item: IItem;
  userId?: string;
  status: string;
}

const AuctionContainer = ({ item, userId, status }: AuctionContainerProps) => {
  const [currentBid, setCurrentBid] = useState<number>(item.currentBid);
  const [biddingStep, setBiddingStep] = useState<number>(item.biddingStep);
  const [endDate, setEndDate] = useState<Date>(item.auctionDates.endDate);
  const [startDate, setStartDate] = useState<Date>(item.auctionDates.startDate);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [auctionStatus, setAuctionStatus] = useState<string>("");
  const [isAuctionActive, setIsAuctionActive] = useState<boolean>(false);

  useEffect(() => {
    setCurrentBid(item.currentBid);
    setBiddingStep(item.biddingStep);
    setEndDate(item.auctionDates.endDate);
    setStartDate(item.auctionDates.startDate);

    const updateTime = () => {
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (now < start) {
        const startStatus = formatDateAndTime(start);
        setAuctionStatus(`Los öffnet am ${startStatus}`);
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
    <div className="w-full flex flex-col gap-4 text-sm">
      {status === "user" ? (
        <BidForm
          currentBid={currentBid}
          biddingStep={biddingStep}
          userId={userId}
          item={item}
          isAuctionActive={isAuctionActive}
        />
      ) : (
        <>
          {isAuctionActive && (
            <p className="text-sm text-grafit font-bold">
              <span role="img" aria-label="info">
                ⚠️
              </span>{" "}
              Melden Sie sich an, um ein Gebot abzugeben.
            </p>
          )}
        </>
      )}
      <div>
        {auctionStatus ? (
          <h2 className="text-sm text-grafit">{auctionStatus}</h2>
        ) : (
          <div className="text-sm text-garit">{timeRemaining}</div>
        )}
      </div>
    </div>
  );
};

export default AuctionContainer;
