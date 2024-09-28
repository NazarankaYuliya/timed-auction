"use client";

import { useState } from "react";

const SetAuctionDateComponent = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const startUTC = new Date(startDate).toISOString();
      const endUTC = new Date(endDate).toISOString();

      console.log(startUTC, endUTC);

      const res = await fetch("/api/admin/set-auction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate: startUTC, endDate: endUTC }),
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
    setIsLoading(false);
  };

  return (
    <div className="border-2 border-beige text-grafit rounded-sm shadow-md p-6  flex flex-col justify-between font-display">
      <h2 className="text-2xl font-semibold mb-4 ">Auction Dates</h2>
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 rounded p-4 mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 border border-green-300 p-4 mb-4">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="startDate">
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
          <label className="block text-sm font-bold mb-2" htmlFor="endDate">
            End Date
          </label>
          <input
            type="datetime-local"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-grafit text-white rounded-sm hover:bg-green-600 transition-colors duration-300"
        >
          {" "}
          {isLoading ? "Loading..." : "Save"}
        </button>
      </form>
      {success && (
        <p className="text-lg font-medium text-center text-green-600">
          {success}
        </p>
      )}
    </div>
  );
};

export default SetAuctionDateComponent;
