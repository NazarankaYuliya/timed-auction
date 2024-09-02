import Item from "@models/item";
import { connectToDB } from "@utils/database";
import Link from "next/link";
import SwiperComponent from "./Swiper";
import AuctionCountdown from "./AuctionCountdown";
import Dates from "@models/auctionDate";

export default async function GuestItems() {
  let items: any = [];
  let auctionDates: any;

  try {
    await connectToDB();

    items = await Item.find({}).lean();
    auctionDates = await Dates.findOne({}).lean();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="sticky top-0 left-0 w-full z-10 bg-white">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold mb-6">Auktionsartikel</h1>
          <div className="flex gap-2">
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-800 text-white text-sm font-medium py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Anmelden
            </Link>
            <Link
              href="/register"
              className="bg-gray-100 hover:bg-gray-200 text-blue-600 text-sm font-medium py-2 px-3 rounded-lg border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Neuregistrierung
            </Link>
          </div>
        </div>
        <AuctionCountdown
          startDate={auctionDates.startDate}
          endDate={auctionDates.endDate}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 p-4">
        {items.map((item: any) => (
          <div
            key={item._id}
            className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row bg-white"
          >
            <div className="md:w-1/3 mb-4 md:mb-0">
              <SwiperComponent images={item.image || []} />
            </div>
            <div className="md:w-2/3 md:ml-4 flex flex-col justify-between">
              <p className="text-blue-600 font-semibold mb-2">
                Losnummer: {item.catalogNumber}
              </p>
              <p className="text-blue-600 font-semibold mb-2">
                Aufruf: €{item.startPrice}
              </p>
              <p className="text-gray-700 mb-2">{item.description}</p>
              <p className="text-red-500 font-semibold mb-2">
                Endet am: {new Date(item.endTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 bg-gray-100 font-bold p-2 rounded-lg mt-2">
                <span role="img" aria-label="info">
                  ⚠️
                </span>{" "}
                Melden Sie sich an, um ein Gebot abzugeben.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
