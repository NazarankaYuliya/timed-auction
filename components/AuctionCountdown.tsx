"use client";

import { useEffect, useState } from "react";
import BidForm from "./BidForm";

const formatTimeUnit = (unit: number, singular: string) =>
  unit > 0 ? `${unit}${singular} ` : "";

const AuctionCountdown = ({
  startDate,
  endDate,
  userId,
  itemId,
}: {
  startDate: Date;
  endDate: Date;
  userId: string;
  itemId: string;
}) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (now < start) {
        // Auction has not started yet
        setTimeRemaining("");
        setStatus(
          `Los öffnet am ${start.toLocaleDateString(
            "de-DE",
          )} um ${start.toLocaleTimeString("de-DE")}`,
        );
      } else if (now < end) {
        // Auction is ongoing
        const timeToEnd = end.getTime() - now.getTime();
        const weeks = Math.floor(timeToEnd / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor(
          (timeToEnd % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24),
        );
        const hours = Math.floor(
          (timeToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (timeToEnd % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((timeToEnd % (1000 * 60)) / 1000);

        setTimeRemaining(
          `${formatTimeUnit(weeks, "w")}${formatTimeUnit(
            days,
            "d",
          )}${formatTimeUnit(hours, "h")}${formatTimeUnit(
            minutes,
            "m",
          )}${formatTimeUnit(seconds, "s")}verbleibend`,
        );
        setStatus("");
      } else {
        // Auction has ended
        setTimeRemaining("");
        setStatus("Los geschlossen");
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [startDate, endDate]);

  return (
    <div className="">
      {status ? (
        <h2 className="text-sm  mb-4">{status}</h2>
      ) : (
        <>
          <BidForm userId={userId} itemId={itemId} />
          <div className="text-sm mb-4 font-mono">{timeRemaining}</div>
        </>
      )}
    </div>
  );
};

export default AuctionCountdown;
