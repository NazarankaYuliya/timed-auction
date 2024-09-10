"use client";

import { useEffect, useState } from "react";
import { calculateTimeRemaining } from "@utils/timeUtils";

const AuctionCountdown = ({
  endDate,
  startDate,
}: {
  endDate: Date;
  startDate: Date;
}) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [auctionStatus, setAuctionStatus] = useState<string>("");

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
      } else if (now < endDate) {
        setAuctionStatus("");
        setTimeRemaining(calculateTimeRemaining(endDate));
      } else {
        setAuctionStatus("Los geschlossen");
        setTimeRemaining("");
      }
    };

    const intervalId = setInterval(updateTime, 1000);
    updateTime();

    return () => clearInterval(intervalId);
  }, [endDate, startDate]);

  return (
    <div>
      {auctionStatus ? (
        <h2>{auctionStatus}</h2>
      ) : (
        <div className="font-mono text-sm">{timeRemaining}</div>
      )}
    </div>
  );
};

export default AuctionCountdown;
