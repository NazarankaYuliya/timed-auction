import { IUser } from "@types";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const AllUsers = async () => {
  let users: IUser[] = [];

  try {
    await connectToDB();

    users = await User.find({}).lean();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 border-b">#</th>
              <th className="text-left py-2 px-4 border-b">First Name</th>
              <th className="text-left py-2 px-4 border-b">Last Name</th>
              <th className="text-left py-2 px-4 border-b">Email</th>
              <th className="text-left py-2 px-4 border-b">City</th>
              <th className="text-left py-2 px-4 border-b">Phone</th>
              <th className="text-left py-2 px-4 border-b">Verified</th>
              <th className="text-left py-2 px-4 border-b">Bids</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: IUser, index: number) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{user.firstName}</td>
                <td className="py-2 px-4 border-b">{user.lastName}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.city}</td>
                <td className="py-2 px-4 border-b">{user.phone}</td>
                <td className="py-2 px-4 border-b">
                  {user.isVerified ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-b">{user.bids?.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
