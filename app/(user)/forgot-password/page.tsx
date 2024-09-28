"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setLoading(false);

      if (res.ok) {
        setMessage(
          "Eine E-Mail mit Anweisungen zum Zurücksetzen des Passworts wurde gesendet.",
        );
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        setError("Fehler beim Zurücksetzen des Passworts.");
      }
    } catch (e) {
      setLoading(false);
      setError("Ein unbekannter Fehler ist aufgetreten.");
    }
  };

  return (
    <div className="mt-6 mx-auto w-full max-w-md p-4 font-display">
      <h1 className="text-3xl text-center text-gold mb-10">
        Passwort vergessen
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="relative">
          <label
            className="block text-grafit text-sm font-bold mb-1"
            htmlFor="email"
          >
            E-Mail*
          </label>
          <input
            required
            className="w-full border-0 border-b border-grafit focus:border-gold outline-none text-grafit p-2"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            className="border-b-2 border-grafit text-grafit
          hover:border-b-2 hover:border-gold
          transition-border duration-300 ease-in-out
          hover:text-gold  py-2 px-6 focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Laden..." : "Passwort zurücksetzen"}
          </button>
        </div>
      </form>

      {message && <div className="text-green-700 mt-4">{message}</div>}
      {error && <div className="text-red-700 mt-4">{error}</div>}
    </div>
  );
}
