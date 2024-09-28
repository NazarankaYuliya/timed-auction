"use client";

import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      ("use server");
      const res = await fetch("/api/user/logout", {
        method: "POST",
      });

      const resp = await res.json();
      if (resp) router.push("/guest");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <button onClick={handleLogout} className="text-grafit hover:text-gold">
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1"
        />
      </svg>
    </button>
  );
};

export default LogoutButton;
