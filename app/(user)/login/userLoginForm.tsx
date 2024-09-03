"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isCodeResent, setIsCodeResent] = useState(false);
  const [isVerificationRequired, setIsVerificationRequired] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setError(null);
    setLoading(true);
    setIsVerificationRequired(false);

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setLoading(false);

      if (res.status === 403) {
        setIsVerificationRequired(true);
        setEmail(data.email as string);
        setError(
          "Bitte verifizieren Sie Ihre E-Mail, um den Login abzuschließen.",
        );
        handleResendEmail();
      } else if (!res.ok) {
        setError("Ungültige Zugangsdaten");
      } else {
        router.push("/auction");
      }
    } catch (e) {
      setLoading(false);
      setError("Ein unbekannter Fehler ist aufgetreten");
    }
  };

  const handleResendEmail = async () => {
    setIsCodeResent(false);

    try {
      const res = await fetch("/api/user/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setIsCodeResent(true);
      } else {
        const resp = await res.json();
        setError(
          resp.message ||
            "Fehler beim erneuten Senden der Verifizierungs-E-Mail",
        );
      }
    } catch (e) {
      setError("Ein unbekannter Fehler ist aufgetreten");
    }
  };

  return (
    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
      {error && (
        <div className="flex items-center text-center justify-center mb-4 p-4 text-red-700 bg-red-100 rounded border border-red-300">
          {error}
        </div>
      )}

      {!isVerificationRequired ? (
        <>
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
                onChange={(e) => setEmail(e.target.value)}
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
        </>
      ) : (
        <>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">
              Bitte überprüfen Sie Ihre E-Mails!
            </h2>
            <p className="text-gray-700">
              Ein Bestätigungslink wurde an die E-Mail gesendet:{" "}
              <p className="font-bold">{email}</p>Bitte überprüfen Sie Ihr
              Postfach und klicken Sie auf den Link, um Ihre Anmeldung
              abzuschließen.
            </p>
            <p className="text-gray-700 mt-6">
              Wenn Sie die E-Mail nicht sehen, überprüfen Sie Ihren Spam-Ordner
              oder{" "}
              <button
                onClick={handleResendEmail}
                className="text-blue-500 hover:underline"
              >
                klicken Sie hier
              </button>{" "}
              um den Link erneut zu senden.
            </p>
          </div>
          {isCodeResent && (
            <div className="flex items-center text-center justify-center mt-4 p-4 text-green-700 bg-green-100 rounded border border-green-300">
              Die Bestätigungs-E-Mail wurde erneut gesendet. <br /> Bitte
              überprüfen Sie Ihr Postfach.
            </div>
          )}
        </>
      )}
    </div>
  );
}
