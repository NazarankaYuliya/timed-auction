"use client";
import React, { useState } from "react";
import { IItem } from "@types";
import { placeBidApi } from "@utils/placeBidApi";
import { getValidBidOrSuggestion } from "@utils/verifyLimit";

interface BidFormProps {
  userId?: string;
  item: IItem;
  currentBid: number;
  biddingStep: number;
  isAuctionActive: boolean;
  winner?: string;
}

const BidForm = ({
  userId,
  item,
  currentBid,
  biddingStep,
  isAuctionActive,
  winner,
}: BidFormProps) => {
  const [loading, setLoading] = useState(false);
  const [bidAmount, setBidAmount] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const itemId = item._id;
  const [userBid, setUserBid] = useState<number | null>(
    () =>
      item.bids?.find((bid) => bid.user.toString() === userId?.toString())
        ?.amount || 0,
  );

  const validateBid = (bid: number) => {
    if (bid < item.startPrice) {
      return "Das Gebot darf nicht niedriger als der Startpreis sein";
    }
    if (bid < currentBid) {
      return "Das Gebot muss höher als das aktuelle Gebot sein.";
    }
    const validBid = getValidBidOrSuggestion(bid);
    if (typeof validBid === "number" && validBid !== bid) {
      return `Ungültiges Gebot. Versuchen Sie: €${validBid}`;
    }
    return null;
  };

  const placeBid = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const parsedBidAmount = parseFloat(bidAmount);
    const validationError = validateBid(parsedBidAmount);

    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const response = await placeBidApi(
        itemId,
        userId as string,
        parsedBidAmount,
      );

      if (response.status === 400) {
        setError(response.message);
      }
      setUserBid(parsedBidAmount);
      setSuccess(true);
      setBidAmount("");
    } catch (error) {
      setError("Fehler beim Platzieren des Gebots");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 2000);
    }
  };

  const getUserBidStyle = () => {
    if (userBid && currentBid) {
      return winner === userId?.toString()
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700";
    }
    return "bg-beige";
  };

  const getBidStatusMessage = () => {
    if (userBid && currentBid) {
      return winner === userId?.toString()
        ? "Sie sind Höchstbietender!"
        : "Sie wurden überboten!";
    }
    return "Sie haben noch kein Gebot abgegeben.";
  };

  return (
    <div className="flex flex-col justify-between gap-2 h-60">
      <div className="w-full flex justify-between gap-4 items-baseline">
        <span className="text-grafit">Aktuelles Gebot:</span>
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

      <div className="w-full flex justify-between gap-6 items-baseline text-xs text-gray-500 mt-5">
        <span>Gesamtpreis inkl. Provision und MwSt.:</span>
        {currentBid ? (
          <div className="flex gap-1">
            <span>€</span>
            <span>
              {(item.isMarked
                ? currentBid * 1.15 * 1.19
                : currentBid * 1.15 * 1.19
              ).toFixed(2)}
            </span>
          </div>
        ) : (
          <div className="flex gap-1">
            <span>€</span>
            <span>
              {(item.isMarked
                ? item.startPrice * 1.15 * 1.19
                : item.startPrice * 1.15 * 1.19
              ).toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-between gap-6 items-baseline text-xs text-gray-500 mb-5">
        <span>Nächster Gebotsschritt:</span>
        {currentBid ? (
          <span> € {(currentBid + biddingStep).toFixed(2)}</span>
        ) : (
          <span> € {item.startPrice.toFixed(2)}</span>
        )}
      </div>

      <div
        className={`flex flex-col gap-2 font-semibold ${getUserBidStyle()} p-2`}
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">Ihr Maximalgebot:</span>
          <span>
            {userBid ? (
              <span>€ {userBid.toFixed(2)}</span>
            ) : (
              <span className="text-xs">Noch keine Gebote</span>
            )}
          </span>
          {success && <div className="text-green-500 text-lg">✔️</div>}
        </div>

        <div className="text-sm text-gray-600">{getBidStatusMessage()}</div>
      </div>

      <form onSubmit={placeBid} className="flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="Ihr Gebot"
            className={`w-full p-2 border text-grafit
    ${
      error
        ? "border-red-700"
        : isAuctionActive
        ? "border-cgreen"
        : "border-gray-300"
    }
    ${isAuctionActive ? "focus:border-gold" : "bg-gray-100 cursor-not-allowed"}
    focus:outline-none`}
            required
            disabled={!isAuctionActive}
          />

          <button
            type="submit"
            className={`py-2 px-4 border ${
              isAuctionActive
                ? "border-cgreen text-cgreen hover:border-gold hover:text-gold"
                : "border-gray-300 text-gray-300 cursor-not-allowed"
            } transition-colors duration-300 ease-in-out focus:outline-none`}
            disabled={!isAuctionActive}
          >
            {loading ? "Laden..." : "Bieten"}
          </button>
        </div>
        <div className="h-5">
          {error && <span className="text-xs text-red-700 mt-1">{error}</span>}
        </div>
      </form>
    </div>
  );
};

export default BidForm;
