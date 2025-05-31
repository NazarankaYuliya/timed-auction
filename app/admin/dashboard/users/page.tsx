import { IUser } from "@types";
import { connectToDB } from "@utils/database";
import User from "@models/user";

export const dynamic = "force-dynamic";

const AllUsers = async () => {
  let users: IUser[] = [];

  try {
    await connectToDB();

    const usersRow = await User.find({}).lean();
    users = usersRow.map((item: any) => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 border-b">#</th>
              <th className="text-left py-2 px-4 border-b">First Name</th>
              <th className="text-left py-2 px-4 border-b">Last Name</th>
              <th className="text-left py-2 px-4 border-b">Email</th>
              <th className="text-left py-2 px-4 border-b">Phone</th>
              <th className="text-left py-2 px-4 border-b">City</th>
              <th className="text-left py-2 px-4 border-b">Country</th>
              <th className="text-left py-2 px-4 border-b">PLZ</th>
              <th className="text-left py-2 px-4 border-b">Verified</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: IUser, index: number) => (
              <tr key={String(user._id)}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{user.firstName}</td>
                <td className="py-2 px-4 border-b">{user.lastName}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phone}</td>
                <td className="py-2 px-4 border-b">{user.city}</td>
                <td className="py-2 px-4 border-b">{user.country}</td>
                <td className="py-2 px-4 border-b">{user.postalCode}</td>
                <td className="py-2 px-4 border-b">
                  {user.isVerified ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
