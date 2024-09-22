"use client";

import { useState } from "react";

const RemoveBidButton = ({
  itemId,
  bidId,
}: {
  itemId: string;
  bidId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleDeleteBid = async (itemId: string, bidId: string) => {
    setLoading(true);
    try {
      await fetch("/api/bid/remove-bid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, bidId }),
      });
      setLoading(false);
    } catch (error) {
      console.error("Error deleting bid:", error);
    }
  };

  return (
    <button
      className="bg-red-500 text-white px-2 py-1 rounded"
      onClick={() => handleDeleteBid(itemId, bidId)}
    >
      {loading ? "Loading" : "Delete"}
    </button>
  );
};

export default RemoveBidButton;
