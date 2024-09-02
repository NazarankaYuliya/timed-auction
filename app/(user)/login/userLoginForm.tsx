"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function UserLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setError(null);
    setLoading(true);

    try {
      ("use server");
      const res = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      setLoading(false);

      if (!res.ok) {
        const data = await res.json();
        setError("Invalid credentials");
      }

      const resp = await res.json();
      if (resp) router.push("/auction");
    } catch (e) {
      if (e instanceof Error) {
        setError("Invalid credentials");
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
      {error && (
        <div className="flex items-center justify-center mb-4 p-4 text-red-700 bg-red-100 rounded border border-red-300">
          {error}
        </div>
      )}
      <h1 className="font-bold text-3xl text-center text-gray-800 mb-6">
        Anmelden
      </h1>

      <form
        className="bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            E-Mail
          </label>
          <input
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            type="email"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Passwort
          </label>
          <input
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            type="password"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">
              Sie haben noch kein Benutzerkonto eingerichtet?
            </p>
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-700"
            >
              Klicken Sie hier
            </Link>
          </div>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-red-400 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Laden..." : "Anmelden"}
          </button>
        </div>
      </form>
    </div>
  );
}
