interface CurrentBidInfoProps {
  currentBid: number;
  startPrice: number;
  biddingStep: number;
  isMarked: boolean;
  auctionStatus: string;
}

const CurrentBidInfo = ({
  currentBid,
  startPrice,
  biddingStep,
  isMarked,
  auctionStatus,
}: CurrentBidInfoProps) => {
  return (
    <>
      <div className="w-full flex justify-between gap-2 items-baseline">
        <span className="text-grafit">
          {auctionStatus === "finished" && currentBid
            ? "Verkaufspreis:"
            : "Aktuelles Gebot:"}
        </span>
        <span
          className={
            currentBid ? "font-semibold text-gold" : "text-gray-500 text-xs"
          }
        >
          {currentBid
            ? `€ ${currentBid.toFixed(2)}`
            : auctionStatus === "active"
            ? "Sei der Erste, der bietet!"
            : "Kein Gebot abgegeben"}
        </span>
      </div>

      <div className="flex flex-col gap-1 my-3">
        <div className="w-full flex justify-between gap-6 items-baseline text-xs text-gray-500">
          <span>Gesamtpreis inkl. Provision und MwSt.:</span>
          <div className="flex gap-1">
            <span>€</span>
            <span>
              {(
                (currentBid || startPrice) *
                (isMarked ? 1.15 * 1.19 : 1 + 0.15 * 1.19)
              ).toFixed(2)}
            </span>
          </div>
        </div>
        <div
          className={`flex justify-between gap-6 items-baseline text-xs text-gray-500 ${
            auctionStatus === "finished" ? "invisible" : ""
          }`}
        >
          <span>Nächster Gebotsschritt:</span>
          <span>
            € {(currentBid ? currentBid + biddingStep : startPrice).toFixed(2)}
          </span>
        </div>
      </div>
    </>
  );
};

export default CurrentBidInfo;
