interface UserBidInfoProps {
  userBid: number | null;
  currentBid: number;
  winner?: string;
  userId?: string;
  success: boolean;
}

const UserBidInfo = ({
  userBid,
  currentBid,
  winner,
  userId,
  success,
}: UserBidInfoProps) => {
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
    <div
      className={`flex flex-col gap-2 font-semibold ${getUserBidStyle()} p-2`}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">Ihr Maximalgebot:</span>
        {success && <div className="text-green-500 text-lg">✔️</div>}
        {userBid ? (
          <span> € {userBid.toFixed(2)}</span>
        ) : (
          <span className="text-xs">Noch keine Gebote</span>
        )}
      </div>
      <div className="text-sm text-gray-600">{getBidStatusMessage()}</div>
    </div>
  );
};

export default UserBidInfo;
