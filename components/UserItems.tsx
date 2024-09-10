import Item from "@models/item";
import { connectToDB } from "@utils/database";
import LogoutButton from "./LogoutButton";
import User from "@models/user";
import ItemCard from "./ItemCard";
import { IItem, IUser } from "@types";

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
      <div className="sticky top-0 left-0 w-full z-10 bg-white">
        <div className="flex flex-col justify-between p-4 md:flex-row">
          <h1 className="text-3xl font-bold mb-6">Auktionsartikel</h1>
          <div className="flex justify-between space-x-4 p-3 bg-gray-100 rounded-lg shadow-sm">
            <div>
              <p className="text-sm font-medium text-gray-700">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 p-4">
        {items.map((item: any) => (
          <ItemCard
            key={item._id}
            item={item}
            userId={user._id.toString()}
            status="user"
          />
        ))}
      </div>
    </div>
  );
}
