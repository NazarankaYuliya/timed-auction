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
    <div className="container mx-auto p-4 font-display">
      <div className="sticky top-0 left-0 w-full z-10 bg-white pt-2 pb-4 flex flex-row justify-center gap-6">
        <Link
          href="/login"
          className="text-grafit border-b-2 border-grafit hover:text-gold hover:border-gold transition-border duration-300 ease-in-out text-sm
          lg:text-xl py-2 px-3"
        >
          Anmelden
        </Link>
        <Link
          href="/register"
          className="text-grafit border-b-2 border-grafit hover:text-gold hover:border-gold transition-border duration-300 ease-in-out text-sm
          lg:text-xl py-2 px-3"
        >
          Neuregistrierung
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((item: IItem) => (
          <ItemCard key={item._id} item={item} status="guest" />
        ))}
      </div>
    </div>
  );
}
