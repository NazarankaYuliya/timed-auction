import Item from "@models/item";
import { connectToDB } from "@utils/database";
import LogoutButton from "./LogoutButton";
import User from "@models/user";
import { IItem, IUser } from "@types";
import ItemsWrapper from "./ItemsWrapper";

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
    <div className="container mx-auto p-4">
      <div className="sticky top-0 left-0 w-full z-10 bg-white pt-2 pb-4">
        <div className="flex justify-between space-x-4 p-3 border border-gold ">
          <div>
            <p className="text-sm font-medium text-gray-700">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
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
        }))}
        userId={user._id.toString()}
        status="user"
      />
    </div>
  );
}
