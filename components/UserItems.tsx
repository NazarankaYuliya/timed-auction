import Item from "@models/item";
import { connectToDB } from "@utils/database";
import LogoutButton from "./LogoutButton";
import User from "@models/user";
import { IItem, IUser } from "@types";
import ItemsWrapper from "./ItemsWrapper";
import HeaderTitle from "./HeaderTitle";
import Link from "next/link";

export default async function UserItems({ session }: { session: any }) {
  let items: IItem[] = [];
  let user!: IUser;

  try {
    await connectToDB();
    items = await Item.find({}).lean();
    user = (await User.findById(session.id).lean()) as IUser;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="">
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
            href="https://www.petzold-auktionen.de/fileadmin/user_upload/termine/KJF2024/Versteigerungsbedingungen_KJF24.pdf"
            className="border-2 rounded-lg border-grafit px-2 py-1 hover:text-gold hover:border-gold transition duration-300 text-xs uppercase tracking-wide"
            target="_blank"
            rel="noopener noreferrer"
          >
            AGB
          </Link>
          <LogoutButton />
        </div>
      </div>

      <ItemsWrapper
        items={items.map((item) => ({
          ...item,
          _id: item._id.toString(),
          bids: item.bids?.map((bid) => ({
            ...bid,
            _id: bid._id.toString(),
            user: bid.user.toString(),
          })),
          winner: item.winner?.toString(),
        }))}
        userId={user._id.toString()}
        status="user"
      />
    </div>
  );
}
