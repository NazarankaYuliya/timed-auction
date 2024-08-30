"use client";

import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      ("use server");
      const res = await fetch("/api/user/logout", {
        method: "POST",
      });

      const resp = await res.json();
      if (resp) router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <button onClick={logout} className="text-green-500 hover:text-green-900">
      Ausloggen
    </button>
  );
};

export default LogoutButton;
