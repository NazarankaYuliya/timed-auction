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
        setError(resp.message || "Registrierung fehlgeschlagen");
      }
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Ein unbekannter Fehler ist aufgetreten",
      );
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
    <div className="mt-6 mx-auto w-full max-w-md p-4  font-display">
      {error && (
        <div className="flex items-center justify-center mb-4 p-4 text-red-700 border-b border-red-700">
          {error}
        </div>
      )}
      {!isCodeSent ? (
        <>
          <h1 className="text-3xl text-center text-gold mb-6">
            Neuregistrierung
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-grafit text-sm font-bold mb-1"
                htmlFor="firstName"
              >
                Vorname*
              </label>
              <input
                required
                className="w-full border-0 border-b border-grafit focus:border-gold outline-none text-grafit p-2"
                name="firstName"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-grafit text-sm font-bold mb-1"
                htmlFor="lastName"
              >
                Nachname*
              </label>
              <input
                required
                className="w-full border-0 border-b border-grafit focus:border-gold outline-none text-grafit p-2"
                name="lastName"
                type="text"
              />
            </div>

            <div className="mb-4">
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
            <div className="mb-4">
              <label
                className="block text-grafit text-sm font-bold mb-1"
                htmlFor="password"
              >
                Passwort*
              </label>
              <input
                required
                className="w-full border-0 border-b border-grafit focus:border-gold outline-none text-grafit p-2"
                name="password"
                type="password"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-grafit text-sm font-bold mb-1"
                htmlFor="street"
              >
                Straße und Hausnummer*
              </label>
              <input
                required
                className="w-full border-0 border-b border-grafit focus:border-gold outline-none text-grafit p-2"
                name="street"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-grafit text-sm font-bold mb-1"
                htmlFor="postalCode"
              >
                PLZ*
              </label>
              <input
                required
                className="w-full border-0 border-b border-grafit focus:border-gold outline-none text-grafit p-2"
                name="postalCode"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-grafit text-sm font-bold mb-1"
                htmlFor="city"
              >
                Stadt*
              </label>
              <input
                required
                className="w-full border-0 border-b border-grafit focus:border-gold outline-none text-grafit p-2"
                name="city"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-grafit text-sm font-bold mb-1"
                htmlFor="country"
              >
                Land*
              </label>
              <input
                required
                className="w-full border-0 border-b border-grafit focus:border-gold outline-none text-grafit p-2"
                name="country"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-grafit text-sm font-bold mb-1"
                htmlFor="phone"
              >
                Telefonnummer*
              </label>
              <input
                required
                className="w-full border-0 border-b border-grafit focus:border-gold outline-none text-grafit p-2"
                name="phone"
                type="text"
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                required
                type="checkbox"
                name="agb"
                id="agb"
                className="w-6 h-6 text-gold border-grafit focus:ring-gold dark:focus:ring-gold dark:ring-offset-grafit dark:bg-gold dark:border-gold"
              />
              <label
                htmlFor="agb"
                className="ml-3 text-grafit dark:text-grafit text-sm "
              >
                Ich habe die Allgemeinen Geschäftsbedingungen (AGB) gelesen und
                stimme zu
              </label>
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
                {loading ? "Laden..." : "Registrieren"}
              </button>
            </div>
            <div className="text-center">
              <p className="text-grafit text-sm mt-10">
                Haben Sie bereits ein Konto?
              </p>
              <Link
                href="/login"
                className="text-gold text-sm border-b border-transparent hover:border-gold transition-border duration-300 ease-in-out"
              >
                Klicken Sie hier
              </Link>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-6 text-gold">
              Bitte überprüfen Sie Ihre E-Mails!
            </h2>
            <p className="text-grafit">
              Ein Bestätigungslink wurde an die E-Mail gesendet:{" "}
              <p className="font-bold">{email}</p>Bitte überprüfen Sie Ihr
              Postfach und klicken Sie auf den Link, um Ihre Registrierung
              abzuschließen.
            </p>
            <p className="text-grafit mt-6">
              Wenn Sie die E-Mail nicht sehen, überprüfen Sie Ihren Spam-Ordner
              oder{" "}
              <button
                onClick={handleResendEmail}
                className="text-gold text-sm border-b border-transparent hover:border-gold transition-border duration-300 ease-in-out"
              >
                klicken Sie hier
              </button>{" "}
              um den Link erneut zu senden.
            </p>
          </div>
          {isCodeResent && (
            <div className="flex items-center text-center justify-center mt-4 p-4 text-green-700 ">
              Die Bestätigungs-E-Mail wurde erneut gesendet. <br /> Bitte
              überprüfen Sie Ihr Postfach.
            </div>
          )}
        </>
      )}
    </div>
  );
}
