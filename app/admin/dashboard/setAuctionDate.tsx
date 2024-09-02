"use client";

import { useState } from "react";

const SetAuctionDateComponent = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/admin/set-auction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
      });

      if (res.ok) {
        setSuccess("Dates updated successfully!");
      } else {
        const data = await res.json();
        setError(data.message || "An error occurred while saving.");
      }
    } catch (e) {
      setError("An unknown error occurred.");
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Auction Dates
      </h2>
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 rounded p-4 mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 border border-green-300 rounded p-4 mb-4">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startDate"
          >
            Start Date
          </label>
          <input
            type="datetime-local"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endDate"
          >
            End Date
          </label>
          <input
            type="datetime-local"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default SetAuctionDateComponent;
