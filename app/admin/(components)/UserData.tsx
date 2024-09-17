import User from "@models/user";
import { IUser } from "@types";
import { connectToDB } from "@utils/database";

const UserData = async ({ userId, all }: { userId: string; all: boolean }) => {
  await connectToDB();
  const user: IUser | null = await User.findById(userId).lean();

  return (
    <>
      {all ? (
        <div className="w-full p-1 grid grid-cols-1 lg:grid-cols-3 items-center">
          <h2 className="text-xl font-bold text-grafit">
            {user?.firstName} {user?.lastName}
          </h2>
          <div>
            <p className="text-grafit">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-grafit">
              <strong>Phone:</strong> {user?.phone}
            </p>
          </div>
          <div>
            <p className="text-grafit">
              <strong>Postal Code:</strong> {user?.postalCode}
            </p>
            <p className="text-grafit">
              <strong>City:</strong> {user?.city}
            </p>
            <p className="text-grafit">
              <strong>Country:</strong> {user?.country}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-grafit font-medium">
          {user?.firstName} {user?.lastName}
        </p>
      )}
    </>
  );
};

export default UserData;
