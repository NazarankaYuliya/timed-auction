import Item from "@models/item";
import { connectToDB } from "@utils/database";
import Link from "next/link";
import { IItem } from "@types";
import Image from "next/image";
import LogiIcon from "@public/assets/images/login-icon.png";
import RegisterIcon from "@public/assets/images/register-icon.png";
import HeaderTitle from "./HeaderTitle";
import ItemsWrapper from "./ItemsWrapper";
import ScrollToItem from "./ScrollToItem";

export default async function GuestItems() {
  let items: IItem[] = [];

  try {
    await connectToDB();
    const rawItems = await Item.find({})
      .sort({ catalogNumber: 1 })
      .lean<IItem[]>();
    items = rawItems.map((item) => ({
      ...item,
      _id: item._id.toString(),
      bids:
        item.bids?.map((bid) => ({
          ...bid,
          _id: bid._id.toString(),
          user: bid.user.toString(),
        })) ?? [],
      winner: item.winner?.toString() ?? "",
      auctionDates: {
        startDate: new Date(item.auctionDates.startDate),
        endDate: new Date(item.auctionDates.endDate),
      },
    }));
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="bg-white">
      <ScrollToItem />
      <div className="sticky top-0 left-0 w-full z-10 bg-beige flex flex-row items-center justify-between px-2 py-6 sm:px-10 sm:pt-5 gap-6 font-oswald text-grafit">
        <HeaderTitle />
        <nav className="flex flex-row flex-wrap gap-6 items-center">
          <Link
            href="/login"
            className="hidden sm:block border-b border-grafit pb-2 hover:text-gold hover:border-gold transition-border duration-300 ease-in-out text-sm uppercase tracking-widest"
          >
            Anmelden
          </Link>
          <Link
            href="/register"
            className="hidden sm:block border-b border-grafit pb-2 hover:text-gold hover:border-gold transition-border duration-300 ease-in-out text-sm uppercase tracking-widest"
          >
            Neuregistrierung
          </Link>
          <Link href="/login" className="block sm:hidden">
            <Image
              src={LogiIcon}
              width={50}
              height={50}
              alt="Login"
              className="w-6 h-6 text-grafit hover:text-gold"
            />
          </Link>
          <Link href="/register" className="block sm:hidden">
            <Image
              src={RegisterIcon}
              width={50}
              height={50}
              alt="Register"
              className="w-6 h-6 text-grafit hover:text-gold"
            />
          </Link>
        </nav>
      </div>

      <ItemsWrapper items={items} status="guest" />
    </div>
  );
}
