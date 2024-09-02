"use client";

import { useState } from "react";
import Link from "next/link";

export default function UserRegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeResent, setIsCodeResent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setError(null);
    setLoading(true);

    try {
      ("use server");
      const res = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(data),
      });

      setLoading(false);

      if (res.ok) {
        setIsCodeSent(true);
      } else {
        const resp = await res.json();
        setError(resp.message || "Registration failed");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred");
    }
  };

  const handleResendEmail = async () => {
    setError(null);

    try {
      const res = await fetch("/api/user/resend-verification", {
        method: "POST",
        body: JSON.stringify({ email: email }),
      });

      if (res.ok) {
        setIsCodeResent(true);
      } else {
        const resp = await res.json();
        setError(resp.message || "Failed to resend verification email");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred");
    }
  };

  return (
    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      {error && (
        <div className="flex items-center justify-center mb-4 p-4 text-red-700 bg-red-100 rounded border border-red-300">
          {error}
        </div>
      )}
      {!isCodeSent ? (
        <>
          <h1 className="font-bold text-3xl text-center text-gray-800 mb-6">
            Neuregistrierung
          </h1>
          <form
            className="bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="firstName"
              >
                Vorname
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="firstName"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="lastName"
              >
                Nachname
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="lastName"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="email"
              >
                E-Mail
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="password"
              >
                Passwort
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                type="password"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="street"
              >
                Straße und Hausnummer
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="street"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="postalCode"
              >
                PLZ
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="postalCode"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="city"
              >
                Stadt
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="city"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="country"
              >
                Land
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="country"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="phone"
              >
                Telefonnummer
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="phone"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-1">
                <input
                  required
                  type="checkbox"
                  name="agb"
                  className="mr-2 leading-tight"
                />
                Ich habe die Allgemeinen Geschäftsbedingungen (AGB) gelesen und
                stimme zu
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Haben Sie bereits ein Konto?</p>
                <Link
                  href="/login"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Klicken Sie hier
                </Link>
              </div>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                {loading ? "Laden..." : "Registrieren"}
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
              Postfach und klicken Sie auf den Link, um Ihre Registrierung
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
