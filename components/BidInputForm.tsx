interface BidInputFormProps {
  auctionStatus: string;
  bidAmount: string;
  setBidAmount: (value: string) => void;
  placeBid: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error: string;
}

const BidInputForm = ({
  auctionStatus,
  bidAmount,
  setBidAmount,
  placeBid,
  loading,
  error,
}: BidInputFormProps) => {
  return (
    <form onSubmit={placeBid} className="flex flex-col gap-2">
      <div className="flex gap-2 w-full">
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Ihr Gebot"
          className={`w-full p-2 border text-grafit ${
            error
              ? "border-red-700"
              : auctionStatus === "active"
              ? "border-cgreen"
              : "border-gray-300"
          } ${
            auctionStatus === "active"
              ? "focus:border-gold"
              : "bg-gray-100 cursor-not-allowed"
          } focus:outline-none`}
          required
          disabled={auctionStatus !== "active"}
        />

        <button
          type="submit"
          className={`py-2 px-4 border ${
            auctionStatus === "active"
              ? "border-cgreen text-cgreen hover:border-gold hover:text-gold"
              : "border-gray-300 text-gray-300 cursor-not-allowed"
          } transition-colors duration-300 ease-in-out focus:outline-none`}
          disabled={auctionStatus !== "active"}
        >
          {loading ? "Laden..." : "Bieten"}
        </button>
      </div>
      <div className="h-5">
        {error && <span className="text-xs text-red-700 mt-1">{error}</span>}
      </div>
    </form>
  );
};

export default BidInputForm;
