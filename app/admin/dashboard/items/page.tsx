import Item from "@models/item";
import User from "@models/user";
import { IItem, IUser } from "@types";
import { connectToDB } from "@utils/database";

export const dynamic = "force-dynamic";

const Items = async () => {
  let items: IItem[] = [];
  let users: IUser[] = [];
  try {
    await connectToDB();
    const usersRow = await User.find({}).lean();
    users = usersRow.map((item: any) => ({
      ...item,
      _id: item._id.toString(),
    }));

    items = await Item.find({}).populate("bids.user").lean<IItem[]>();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 border-b">#</th>
              <th className="text-left py-2 px-4 border-b">Catalog Number</th>
              <th className="text-left py-2 px-4 border-b">Description</th>
              <th className="text-left py-2 px-4 border-b">Start Price</th>
              <th className="text-left py-2 px-4 border-b">Current Bid</th>
              <th className="text-left py-2 px-4 border-b">Bids</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: IItem, index: number) => (
              <tr
                key={String(item._id)}
                className={`${item.isMarked && `bg-beige`}`}
              >
                <td className="py-2 px-4 border-b ">{index + 1}</td>
                <td className="py-2 px-4 border-b ">{item.catalogNumber}</td>
                <td className="py-2 px-4 border-b">
                  {item.description.header}
                </td>
                <td className="py-2 px-4 border-b">€{item.startPrice}</td>
                <td className="py-2 px-4 border-b">€{item.currentBid}</td>
                <td className="py-2 px-4 border-b">{item.bids?.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Items;
