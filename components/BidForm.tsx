"use client";
import React, { useState } from "react";
import { IItem } from "@types";
import { placeBidApi } from "@utils/placeBidApi";
import { getValidBidOrSuggestion, validateBid } from "@utils/verifyLimit";
import CurrentBidInfo from "./CurrentBidInfo";
import UserBidInfo from "./UserBidInfo";
import BidInputForm from "./BidInputForm";

interface BidFormProps {
  userId?: string;
  item: IItem;
  currentBid: number;
  biddingStep: number;
  auctionStatus: string;
  winner?: string;
}

const BidForm = ({
  userId,
  item,
  currentBid,
  biddingStep,
  auctionStatus,
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

  const placeBid = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const parsedBidAmount = parseFloat(bidAmount);
    const validationError = validateBid(
      parsedBidAmount,
      item.startPrice,
      currentBid,
    );

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

  return (
    <div className="flex flex-col justify-between gap-2 h-56">
      <CurrentBidInfo
        currentBid={currentBid}
        startPrice={item.startPrice}
        biddingStep={biddingStep}
        isMarked={item.isMarked}
        auctionStatus={auctionStatus}
      />

      <UserBidInfo
        userBid={userBid}
        currentBid={currentBid}
        winner={winner}
        userId={userId}
        success={success}
      />
      <BidInputForm
        auctionStatus={auctionStatus}
        bidAmount={bidAmount}
        setBidAmount={setBidAmount}
        placeBid={placeBid}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default BidForm;
