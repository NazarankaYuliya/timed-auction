import Item from "@models/item";
import { connectToDB } from "@utils/database";
import LogoutButton from "./LogoutButton";
import User from "@models/user";
import { IItem, IUser } from "@types";
import ItemsWrapper from "./ItemsWrapper";
import HeaderTitle from "./HeaderTitle";
import Link from "next/link";
import ScrollToItem from "./ScrollToItem";

export default async function UserItems({ session }: { session: any }) {
  let items: IItem[] = [];
  let user!: IUser;

  try {
    await connectToDB();
    const rawItems = await Item.find({}).lean<IItem[]>();
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

    const rawUser = await User.findById(session.id).lean<IUser>();
    if (rawUser) {
      user = {
        ...rawUser,
        _id: rawUser._id.toString(),
      };
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="">
      <ScrollToItem />
      <div className="sticky top-0 left-0 w-full z-10 bg-beige pt-2 pb-4 flex flex-row flex-wrap items-center justify-between px-2 pt-1 sm:px-10 sm:pt-5 gap-6 font-oswald text-grafit">
        <HeaderTitle />

        <div className="flex gap-6 items-center">
          <div className="text-left">
            <p className="text-sm font-medium text-grafit">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <Link
            href="https://supabase.87.106.90.112.sslip.io/storage/v1/object/public/GR/25006/Versteigerungsbedingungen_KJF25.pdf"
            className="border-2 rounded-lg border-grafit px-2 py-1 hover:text-gold hover:border-gold transition duration-300 text-xs uppercase tracking-wide"
            target="_blank"
            rel="noopener noreferrer"
          >
            AGB
          </Link>
          <LogoutButton />
        </div>
      </div>

      <ItemsWrapper items={items} userId={user._id.toString()} status="user" />
    </div>
  );
}
