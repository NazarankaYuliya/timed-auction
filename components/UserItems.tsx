import Item from "@models/item";
import { connectToDB } from "@utils/database";
import { transformItem } from "@utils/transform";
import LogoutButton from "./LogoutButton";
import Image from "next/image";
import IMG from "@public/assets/images/placeholder-image.jpg";

export default async function UserItems({ session }: { session: any }) {
  let items: any = [];

  try {
    await connectToDB();

    const rawItems = await Item.find({}).lean();
    items = rawItems.map((item: any) => transformItem(item));
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Auction Items</h1>

        <p className="text-lg">{session.id}</p>
        <LogoutButton />
      </div>
      <div className="grid grid-cols-1 gap-6">
        {items.map((item: any) => (
          <div
            key={item._id}
            className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={IMG}
              alt="Auktionhaus GR Logo"
              className="w-20 h-auto md:w-28 md:h-auto"
              priority
            />
            <p className="text-gray-700 mb-4">{item.description}</p>
            <p className="text-gray-800 font-bold">
              Current Bid: €{item.currentBid}
            </p>
            <p className="text-red-500 font-semibold mb-4">
              Ends in: {new Date(item.endTime).toLocaleString()}
            </p>

            <>
              <input
                type="number"
                placeholder="Enter your max bid"
                className="w-full p-2 border rounded mb-4"
              />
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 w-full">
                Place Bid
              </button>
            </>
          </div>
        ))}
      </div>
    </div>
  );
}
