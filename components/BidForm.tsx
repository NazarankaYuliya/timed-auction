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

  return (
    <div className="flex flex-col gap-2">
      <div className="font-semibold text-gold">
        Aktuelles Gebot:{" "}
        {currentBid ? <>€{currentBid}</> : <span>Noch keine Gebote</span>}
      </div>

      {currentBid && (
        <>
          {item.isMarked ? (
            <span className="text-sm text-gray-500">
              {" "}
              Gesamtpreis inkl. Provision und MwSt. : €
              {(currentBid * 1.15 * 1.19).toFixed(2)}
            </span>
          ) : (
            <span className="text-sm text-gray-500">
              {" "}
              Gesamtpreis inkl. Provision und MwSt. : €
              {(currentBid + currentBid * 0.15 * 1.19).toFixed(2)}
            </span>
          )}
          <div className="text-sm text-gray-500">
            Nächster Gebotsschritt: €{currentBid + biddingStep}
          </div>
        </>
      )}

      <div className={`flex gap-2 p-1 font-semibold ${getUserBidStyle()}`}>
        Ihr Maximalgebot: {userBid ? `€${userBid}` : "Noch keine Gebote"}
        {success && <div>✔️</div>}
      </div>

      {isAuctionActive ? (
        <form onSubmit={placeBid} className="flex flex-col gap-2 relative">
          <div className="flex gap-2 w-full relative">
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Ihr Gebot"
              className={`w-full p-1 border-b border-grafit focus:border-gold outline-none text-grafit  ${
                error ? "border-red-700" : "border-green-700"
              }`}
              required
            />
            <button
              type="submit"
              className="py-1 px-2 border-b border-grafit text-grafit
              hover:border-b-2 hover:border-gold
              transition-border duration-300 ease-in-out
              hover:text-gold  focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? "Laden..." : "Bieten"}
            </button>
          </div>
          {error && <p className="text-xs text-red-700 flex gap-1">{error}</p>}
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
