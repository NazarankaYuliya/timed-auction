"use client";
const RemoveBidButton = ({
  itemId,
  bidId,
}: {
  itemId: string;
  bidId: string;
}) => {
  const handleDeleteBid = async (itemId: string, bidId: string) => {
    try {
      await fetch("/api/bid/remove-bid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, bidId }),
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting bid:", error);
    }
  };

  return (
    <button
      className="bg-red-500 text-white px-2 py-1 rounded"
      onClick={() => handleDeleteBid(itemId, bidId)}
    >
      Delete
    </button>
  );
};

export default RemoveBidButton;
