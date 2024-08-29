import Item from "@models/item";
import { connectToDB } from "@utils/database";
import Link from "next/link";

import IMG from "@public/assets/images/placeholder-image.jpg";
import SwiperComponent from "./Swiper";

export default async function GuestItems() {
  let items: any = [];

  try {
    await connectToDB();

    items = await Item.find({}).lean();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Auction Items</h1>

        <Link href="/login" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {items.map((item: any) => (
          <div
            key={item._id}
            className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row"
          >
            <div className="md:w-1/3 mb-4 md:mb-0">
              <SwiperComponent images={item.image || []} />
            </div>
            <div className="md:w-2/3 md:ml-4">
              <p className="text-red-500 font-semibold mb-4">
                {item.catalogNumber}
              </p>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <p className="text-red-500 font-semibold mb-4">
                Ends in: {new Date(item.endTime).toLocaleString()}
              </p>
              <p className="text-gray-600">Login to place a bid.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
