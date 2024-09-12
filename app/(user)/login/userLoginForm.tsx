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
    <div className="mt-6 mx-auto w-full max-w-md p-4  font-display">
      {error && (
        <div className="flex items-center text-center justify-center mb-4 p-4 text-red-700 border-b border-red-700">
          {error}
        </div>
      )}

      {!isVerificationRequired ? (
        <>
          {/* <Link href="/" className="text-grafit hover:text-gold mb-4">
            Startseite
          </Link> */}
          <h1 className="text-3xl text-center text-gold mb-6">Anmelden</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
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

            <div className="text-center">
              <button
                className="border-b-2 border-grafit text-grafit
                hover:border-b-2 hover:border-gold
                transition-border duration-300 ease-in-out
                hover:text-gold  py-2 px-6 focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? "Laden..." : "Senden"}
              </button>
            </div>
            <div className="text-center">
              <p className="text-grafit text-sm mt-10">
                Sie haben noch kein Benutzerkonto eingerichtet?
              </p>
              <Link
                href="/register"
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
              Postfach und klicken Sie auf den Link, um Ihre Anmeldung
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
