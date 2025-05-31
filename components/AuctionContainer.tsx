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
  const [winner, setWinner] = useState<string>(String(item.winner));
  const [endDate, setEndDate] = useState<Date>(item.auctionDates.endDate);
  const [startDate, setStartDate] = useState<Date>(item.auctionDates.startDate);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [auctionStatus, setAuctionStatus] = useState<string>("");

  useEffect(() => {
    setCurrentBid(item.currentBid);
    setBiddingStep(item.biddingStep);
    setEndDate(item.auctionDates.endDate);
    setStartDate(item.auctionDates.startDate);
    setWinner(String(item.winner));

    const updateTime = () => {
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (now < start) {
        const startStatus = formatDateAndTime(start);
        setStatusMessage(`Los öffnet am ${startStatus}`);
        setAuctionStatus("upcoming");
      } else if (now < end) {
        setStatusMessage("");
        setTimeRemaining(calculateTimeRemaining(end));
        setAuctionStatus("active");
      } else {
        setStatusMessage("Los geschlossen");
        setTimeRemaining("");
        setAuctionStatus("finished");
      }
    };

    const intervalId = setInterval(updateTime, 1000);
    updateTime();

    return () => clearInterval(intervalId);
  }, [item, endDate, startDate]);

  return (
    <div className="w-full flex flex-col gap-4">
      {status === "user" ? (
        <BidForm
          currentBid={currentBid}
          biddingStep={biddingStep}
          userId={userId}
          item={item}
          auctionStatus={auctionStatus}
          winner={winner}
        />
      ) : (
        <>
          {auctionStatus === "upcoming" ? (
            <></>
          ) : (
            <div
              className={`flex flex-col gap-2  ${
                auctionStatus === "finished" && !currentBid ? "invisible" : ""
              }`}
            >
              <div className="w-full flex justify-between gap-4  items-baseline">
                <span className="text-grafit">
                  {auctionStatus === "finished"
                    ? "Verkaufspreis:"
                    : "Aktuelles Gebot:"}
                </span>
                {currentBid ? (
                  <span className=" font-semibold text-gold">
                    € {currentBid.toFixed(2)}
                  </span>
                ) : (
                  <span className="text-gray-500 text-xs">
                    Sei der Erste, der bietet!
                  </span>
                )}
              </div>

              <p
                className={`w-full text-sm text-grafit font-oswald bg-beige flex gap-2 items-center px-2 py-1 mt-2 ${
                  auctionStatus === "finished" ? "invisible" : ""
                }`}
              >
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
        {statusMessage ? (
          <h2 className="text-sm text-gray-500 tracking-wide">
            {currentBid ? <>Los verkauft</> : <>{statusMessage}</>}
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
