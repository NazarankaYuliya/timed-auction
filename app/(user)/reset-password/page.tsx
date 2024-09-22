"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const [code, setCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code, newPassword }),
      });

      setLoading(false);

      if (res.ok) {
        setMessage("Ihr Passwort wurde erfolgreich zurückgesetzt.");
        router.push("/login");
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
      <h1 className="text-2xl sm:text-3xl text-center text-gold mb-6">
        Neues Passwort setzen
      </h1>
      <div className="text-sm text-center mb-10">
        <p className="text-grafit">
          Ein Bestätigungscode wurde an die E-Mail gesendet:
          <br />
          <span className="font-bold">{email}</span> <br />
          Bitte überprüfen Sie Ihr Postfach und geben Sie den Code sowie ein
          neues Passwort in die untenstehenden Felder ein, um Ihr Passwort
          zurückzusetzen.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="relative">
          <label
            className="block text-grafit text-sm font-bold mb-1"
            htmlFor="code"
          >
            Bestätigungscode*
          </label>
          <input
            required
            className="w-full border-0 border-b border-grafit focus:border-gold outline-none text-grafit p-2"
            name="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="relative">
          <label
            className="block text-grafit text-sm font-bold mb-1"
            htmlFor="newPassword"
          >
            Neues Passwort*
          </label>
          <input
            required
            className="w-full border-0 border-b border-grafit focus:border-gold outline-none text-grafit p-2"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            className="border-b-2 border-grafit text-grafit hover:border-b-2 hover:border-gold transition-border duration-300 ease-in-out hover:text-gold py-2 px-6 focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:cursor-not-allowed"
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
