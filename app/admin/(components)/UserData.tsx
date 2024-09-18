"use client";

import { IUser } from "@types";
import { useEffect, useState } from "react";

const UserData = ({ userId, all }: { userId: string; all: boolean }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/admin/get-users", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const user = data.users.find((user: IUser) => user._id === userId);
      setUser(user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

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
