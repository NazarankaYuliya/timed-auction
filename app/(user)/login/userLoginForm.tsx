"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setError(null);

    try {
      ("use server");
      const res = await fetch("/api/user/login", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Invalid credentials");
      }

      const resp = await res.json();
      if (resp) router.push("/auction");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      {error && (
        <div className="flex items-center justify-center mb-4 p-4 text-red-700 bg-red-100 rounded border border-red-300">
          {error}
        </div>
      )}
      <form
        className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Name
          </label>
          <input
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="username"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            type="email"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
