"use client";

import React, { useState } from "react";

interface BidFormProps {
  userId: string;
  itemId: string;
}

const BidForm = ({ userId, itemId }: BidFormProps) => {
  const [bidAmount, setBidAmount] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const placeBid = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/bid/add-bid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, userId, bidAmount }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Fehler beim Platzieren des Gebots.");
      }

      setBidAmount("");
      setMessage("Gebot erfolgreich platziert!");

      setTimeout(() => setMessage(null), 2000);

      return await response.json();
    } catch (error) {
      console.error(error);
      setMessage("Fehler beim Platzieren des Gebots.");
      throw error;
    }
  };

  return (
    <form
      className="flex flex-wrap items-center space-x-4 p-3 bg-gray-100 rounded-lg shadow-sm mb-4"
      onSubmit={placeBid}
    >
      <input
        type="number"
        name="bidAmount"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter your max bid"
        className="border border-gray-300 p-2 rounded"
        required
      />
      <button className="bg-blue-500 text-white p-2 rounded" type="submit">
        Ort Gebot
      </button>
      {message && (
        <p
          className={`ml-4 text-sm ${
            message.includes("erfolgreich") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default BidForm;
