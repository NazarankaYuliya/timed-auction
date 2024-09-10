import Item from "@models/item";
import { connectToDB } from "@utils/database";
import Link from "next/link";
import ItemCard from "./ItemCard";
import { IItem } from "@types";

export default async function GuestItems() {
  let items: IItem[] = [];

  try {
    await connectToDB();

    items = await Item.find({}).lean();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="sticky top-0 left-0 w-full z-10 bg-white">
        <div className="flex flex-col justify-between  p-4 md:flex-row">
          <h1 className="text-3xl font-bold mb-6">Auktionsartikel</h1>
          <div className="flex items-center gap-2">
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
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 p-4">
        {items.map((item: IItem) => (
          <ItemCard key={item._id} item={item} status="guest" />
        ))}
      </div>
    </div>
  );
}
