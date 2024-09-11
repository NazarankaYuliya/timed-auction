import React, { useState } from "react";
import { IItem } from "@types";
import { placeBidApi } from "@utils/placeBidApi";

interface BidFormProps {
  userId?: string;
  item: IItem;
  currentBid: number;
  isAuctionActive: boolean;
}

const BidForm = ({
  userId,
  item,
  currentBid,
  isAuctionActive,
}: BidFormProps) => {
  const [loading, setLoading] = useState(false);
  const [bidAmount, setBidAmount] = useState<string>("");
  const [message, setMessage] = useState<"success" | "error" | null>(null);
  const itemId = item._id;
  const [userBid, setUserBid] = useState<number | null>(
    () =>
      item.bids?.find((bid) => bid.user.toString() === userId?.toString())
        ?.amount || 0,
  );

  const placeBid = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await placeBidApi(itemId, userId as string, parseFloat(bidAmount));
      setUserBid(parseFloat(bidAmount));
      setMessage("success"); // Сообщение об успешной ставке
      setBidAmount("");
      setLoading(false);
      setTimeout(() => setMessage(null), 2000); // Убрать сообщение через 2 секунды
    } catch (error) {
      console.error(error);
      setMessage("error"); // Сообщение об ошибке
      setLoading(false);
    }
  };

  const getUserBidStyle = () => {
    if (userBid && currentBid) {
      return userBid >= currentBid
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700";
    }
    return "bg-gray-100";
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="font-semibold text-blue-600">
        Aktuelles Gebot: {currentBid ? `€${currentBid}` : "Noch keine Gebote"}
      </div>

      <div
        className={`flex gap-2 p-2 rounded-sm font-semibold ${getUserBidStyle()}`}
      >
        Ihr Gebot: {userBid ? `€${userBid}` : "Noch keine Gebote"}
        {message === "success" && <div className="text-green-700">✔️</div>}
        {message === "error" && <div className="text-red-700">❌</div>}
      </div>

      {isAuctionActive ? (
        <form onSubmit={placeBid} className="flex flex-col gap-2 relative">
          <div className="flex gap-2 w-full relative">
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Geben Sie Ihr Gebot ein"
              className={`w-full font-semibold p-1 border rounded-sm focus:outline-none ${
                message === "success"
                  ? "border-green-700"
                  : message === "error"
                  ? "border-red-700"
                  : "border-green-700"
              }`}
              required
            />
            <button
              type="submit"
              className="bg-green-100 font-semibold p-1 text-green-700 border border-green-700 rounded-sm"
            >
              {loading ? "Laden..." : "Bieten"}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-sm text-gray-500">
          Das Auktionsgebot ist derzeit nicht aktiv.
        </div>
      )}
    </div>
  );
};

export default BidForm;
