"use client";

import { useEffect, useState } from "react";

const formatTimeUnit = (unit: number) => unit.toString().padStart(2, "0");

const AuctionCountdown = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  const [weeks, setWeeks] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (now < start) {
        // Auction has not started yet
        const timeToStart = start.getTime() - now.getTime();
        setWeeks(Math.floor(timeToStart / (1000 * 60 * 60 * 24 * 7)));
        setDays(
          Math.floor(
            (timeToStart % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24),
          ),
        );
        setHours(
          Math.floor((timeToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        );
        setMinutes(Math.floor((timeToStart % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((timeToStart % (1000 * 60)) / 1000));
        setStatus(
          `Auktion beginnt am ${start.toLocaleDateString()} um ${start.toLocaleTimeString()} und endet am ${end.toLocaleDateString()} um ${end.toLocaleTimeString()}`,
        );
      } else if (now < end) {
        // Auction is ongoing
        const timeToEnd = end.getTime() - now.getTime();
        setWeeks(Math.floor(timeToEnd / (1000 * 60 * 60 * 24 * 7)));
        setDays(
          Math.floor(
            (timeToEnd % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24),
          ),
        );
        setHours(
          Math.floor((timeToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        );
        setMinutes(Math.floor((timeToEnd % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((timeToEnd % (1000 * 60)) / 1000));
        setStatus("Auktion endet in:");
      } else {
        // Auction has ended
        setWeeks(0);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setStatus("Auktion ist abgeschlossen");
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [startDate, endDate]);

  return (
    <div className="text-center bg-gray-100 p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-bold mb-4">{status}</h2>
      {status === "Auktion endet in:" && (
        <div className="grid grid-cols-5 gap-2">
          <TimeSquare label="Wochen" value={formatTimeUnit(weeks)} />
          <TimeSquare label="Tage" value={formatTimeUnit(days)} />
          <TimeSquare label="Stunden" value={formatTimeUnit(hours)} />
          <TimeSquare label="Minuten" value={formatTimeUnit(minutes)} />
          <TimeSquare label="Sekunden" value={formatTimeUnit(seconds)} />
        </div>
      )}
    </div>
  );
};

const TimeSquare = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center">
    <span className="text-xl font-bold text-gray-800">{value}</span>
    <span className="text-xs text-gray-500 mt-1">{label}</span>
  </div>
);

export default AuctionCountdown;
