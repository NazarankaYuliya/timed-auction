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
  const [winner, setWinner] = useState<string>(item.winner);
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
    setWinner(item.winner);

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
    <div className="w-full flex flex-col gap-6">
      {status === "user" ? (
        <BidForm
          currentBid={currentBid}
          biddingStep={biddingStep}
          userId={userId}
          item={item}
          isAuctionActive={isAuctionActive}
          winner={winner}
        />
      ) : (
        <>
          {isAuctionActive && (
            <div className="flex flex-col gap-2">
              <div className="w-full flex justify-between gap-4  items-baseline">
                <span className="text-grafit">Aktuelles Gebot:</span>
                {currentBid ? (
                  <div className="">
                    <span className=" font-semibold text-gold">
                      € {currentBid.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-500 text-xs">
                    Sei der Erste, der bietet!
                  </span>
                )}
              </div>

              <p className="w-full text-sm text-grafit font-oswald bg-beige flex gap-2 items-center px-2 py-1 mt-4">
                <span role="img" aria-label="info">
                  ⚠️
                </span>{" "}
                Melden Sie sich an, um ein Gebot abzugeben.
              </p>
            </div>
          )}
        </>
      )}
      <div className="w-full mt-4">
        {auctionStatus ? (
          <h2 className="text-sm text-gray-500 tracking-wide">
            {auctionStatus}
          </h2>
        ) : (
          <div className="text-sm text-gray-500 tracking-wide">
            {timeRemaining}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionContainer;
