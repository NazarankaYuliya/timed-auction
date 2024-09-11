import Item from "@models/item";
import { IItem } from "@types";
import { connectToDB } from "@utils/database";

const AllItems = async () => {
  let items: IItem[] = [];

  try {
    await connectToDB();

    items = await Item.find({}).lean();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Items</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 border-b">#</th>
              <th className="text-left py-2 px-4 border-b">Catalog Number</th>
              <th className="text-left py-2 px-4 border-b">Description</th>
              <th className="text-left py-2 px-4 border-b">Images</th>
              <th className="text-left py-2 px-4 border-b">Start Price</th>
              <th className="text-left py-2 px-4 border-b">Current Bid</th>
              <th className="text-left py-2 px-4 border-b">Bids</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: IItem, index: number) => (
              <tr key={item._id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{item.catalogNumber}</td>
                <td className="py-2 px-4 border-b">{item.description}</td>
                <td className="py-2 px-4 border-b">{item.image?.length}</td>
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

export default AllItems;