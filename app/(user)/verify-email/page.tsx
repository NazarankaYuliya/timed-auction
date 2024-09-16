"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [isCodeResent, setIsCodeResent] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const verifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/user/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: verificationCode,
          email,
        }),
      });

      if (res.ok) {
        setVerified(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const data = await res.json();
        setError(data.message || "Verifizierung fehlgeschlagen");
      }
    } catch (error) {
      setError("Ein unbekannter Fehler ist aufgetreten");
    } finally {
      setLoading(false);
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
    <div className="flex justify-center mt-20 h-screen font-display">
      <div className="w-full max-w-md text-center">
        {verified && (
          <>
            <div className="text-green-600 text-lg font-bold">
              E-Mail verifiziert!
            </div>
            <div>Ihre E-Mail-Adresse wurde erfolgreich verifiziert.</div>
          </>
        )}

        {error && (
          <div className="flex items-center justify-center mb-4 p-4 text-red-700 border-b border-red-700">
            {error}
          </div>
        )}

        <div className="text-center">
          <h2 className="text-xl font-bold mb-6 text-gold">
            Bitte überprüfen Sie Ihre E-Mails!
          </h2>
          <p className="text-grafit">
            Ein Bestätigungscode wurde an die E-Mail gesendet:
            <br />
            <span className="font-bold">{email}</span> <br />
            Bitte überprüfen Sie Ihr Postfach und geben Sie den Code in das
            untenstehende Formular ein, um Ihre Registrierung abzuschließen.
          </p>
          <form onSubmit={verifyEmail} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="verificationCode"
                className="text-grafit font-semibold"
              >
                Bestätigungscode eingeben:
              </label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-2 border-b border-grafit focus:outline-none focus:border-gold text-center text-gold"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-grafit hover:text-gold border-b hover:border-b`}
            >
              {loading ? "Laden..." : "Senden"}
            </button>
          </form>
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
      </div>
    </div>
  );
};

export default VerifyEmail;
