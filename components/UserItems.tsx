import Item from "@models/item";
import { connectToDB } from "@utils/database";
import LogoutButton from "./LogoutButton";

import SwiperComponent from "./Swiper";
import User from "@models/user";
import Dates from "@models/auctionDate";
import AuctionCountdown from "./AuctionCountdown";

export default async function UserItems({ session }: { session: any }) {
  let items: any = [];
  let user: any;
  let auctionDates: any;

  try {
    await connectToDB();
    items = await Item.find({}).lean();
    user = await User.findById(session.id).lean();
    auctionDates = await Dates.findOne({}).lean();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="sticky top-0 left-0 w-full z-10 bg-white">
        <div className="flex justify-between p-4 ">
          <h1 className="text-3xl font-bold mb-6">Auktionsartikel</h1>
          <div className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg shadow-sm">
            <div>
              <p className="text-sm font-medium text-gray-700">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
        <AuctionCountdown
          startDate={auctionDates.startDate}
          endDate={auctionDates.endDate}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 p-4">
        {items.map((item: any) => (
          <div
            key={item._id}
            className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row bg-white"
          >
            <div className="md:w-1/3 mb-4 md:mb-0">
              <SwiperComponent images={item.image || []} />
            </div>
            <div className="md:w-2/3 md:ml-4 flex flex-col justify-between">
              <p className="text-blue-600 font-semibold mb-2">
                Losnummer: {item.catalogNumber}
              </p>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <p className="text-gray-800 font-bold">
                Current Bid: €{item.currentBid}
              </p>
              <p className="text-red-500 font-semibold mb-4">
                Endet am:{new Date(item.endTime).toLocaleString()}
              </p>
              <div className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg shadow-sm">
                <input
                  type="number"
                  placeholder="Enter your max bid"
                  className=""
                />
                <button className="">Ort Gebot</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
