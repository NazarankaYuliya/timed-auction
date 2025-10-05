import User from "@models/user";
import Item from "@models/item";

export const dynamic = "force-dynamic";

const Winners = async () => {
  let winners: any[] = [];
  let items: any[] = [];

  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const headers = { "x-api-key": process.env.PRIVATE_API_KEY || "" };

    const winnersRes = await fetch(`${baseUrl}/api/secured/winners`, {
      headers,
      cache: "no-store",
    });
    if (!winnersRes.ok) throw new Error("Failed to fetch winners");
    winners = await winnersRes.json();

    const itemsRes = await fetch(`${baseUrl}/api/secured/items`, {
      headers,
      cache: "no-store",
    });
    if (!itemsRes.ok) throw new Error("Failed to fetch items");
    items = await itemsRes.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const totalItems = items.length;
  const soldItems = items.filter((item) => item.winnerBidderNumber).length;
  const soldPercentage = totalItems
    ? ((soldItems / totalItems) * 100).toFixed(2)
    : 0;
  const totalSoldValue = items
    .filter((i) => i.currentBid)
    .reduce((sum, i) => sum + i.currentBid, 0);

  const totalBids = items
    .filter((i) => i.bids)
    .reduce((sum, i) => sum + i.bids, 0);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div className="flex flex-col gap-4">
          <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-center items-center w-60">
            <p className="text-3xl font-bold">{totalItems}</p>
            <h2 className="text-base text-gray-500 font-semibold uppercase">
              Total Items
            </h2>
          </div>

          <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-center items-center w-60">
            <p className="text-3xl font-bold">{soldItems}</p>
            <h2 className="text-base text-gray-500 font-semibold uppercase">
              Sold Items
            </h2>
          </div>
        </div>

        <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-center items-center w-60">
          <p className="text-3xl font-bold">{soldPercentage} %</p>
          <h2 className="text-base text-gray-500 font-semibold uppercase">
            Sold Percentage
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-center items-center w-60">
            <p className="text-3xl font-bold">{totalBids}</p>
            <h2 className="text-base text-gray-500 font-semibold uppercase">
              Total Bids
            </h2>
          </div>
          <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-center items-center w-60">
            <p className="text-3xl font-bold">{winners.length}</p>
            <h2 className="text-base text-gray-500 font-semibold uppercase">
              Winners
            </h2>
          </div>
        </div>

        <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-center items-center w-60">
          <p className="text-3xl font-bold">€ {totalSoldValue.toFixed(2)}</p>
          <h2 className="text-base text-gray-500 font-semibold uppercase">
            Sold Price
          </h2>
        </div>
      </div>

      {/* {winners.length > 0 && <DownloadButton winners={winners} />} */}

      <h2 className="text-xl font-bold mb-4">Winners List</h2>
      <div className="space-y-4">
        {winners.map((winner: any) => {
          const totalForWinner = winner.items.reduce(
            (acc: number, item: any) => acc + item.currentBid,
            0,
          );
          const totalWithCoefficients = winner.items.reduce(
            (acc: number, item: any) => acc + item.soldPrice,
            0,
          );

          return (
            <div
              key={winner.winnerData._id}
              className="border rounded-lg p-4 shadow-lg flex flex-col sm:flex-row gap-4 justify-between hover:bg-gray-100 transition duration-300"
            >
              <div className="flex-shrink-0">
                <span className="font-bold text-xl">
                  {winner.winnerData.bidderNumber}
                </span>
              </div>
              <div className="w-full">
                <p className="font-semibold">
                  {winner.winnerData.firstName} {winner.winnerData.lastName}
                </p>
                <p className="text-gray-600">{winner.winnerData.email}</p>
                <p className="text-gray-600">{winner.winnerData.phone}</p>
              </div>
              <div className="w-full text-xs sm:text-base">
                <div className="grid grid-cols-4 text-gray-500 mb-4">
                  <span>#</span>
                  <span>Catalog Nr.</span>
                  <span>Price</span>
                  <span>Price with VAT</span>
                </div>
                {winner.items.map((item: any, index: number) => (
                  <div
                    key={String(item.catalogNumber)}
                    className={`grid grid-cols-4 border-t py-1 ${
                      item.isMarked ? "bg-beige" : ""
                    }`}
                  >
                    <span>{index + 1}.</span>
                    <span>{item.catalogNumber}</span>
                    <span>€ {item.currentBid.toFixed(2)}</span>
                    <span>€ {item.soldPrice.toFixed(2)}</span>
                  </div>
                ))}
                <div className="grid grid-cols-4 border-t pt-4 font-bold">
                  <span></span>
                  <span>Total:</span>
                  <span>€ {totalForWinner.toFixed(2)}</span>
                  <span>€ {totalWithCoefficients.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Winners;
