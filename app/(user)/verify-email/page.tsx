"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [isCodeResent, setIsCodeResent] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const verifyToken = searchParams.get("verifyToken");
  const id = searchParams.get("id");

  const initialized = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      verifyEmail();
    }
  }, []);

  const verifyEmail = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/user/verify-email?verifyToken=${verifyToken}&id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.ok) {
        setLoading(false);
        setVerified(true);

        setTimeout(() => {
          router.push(
            "https://www.petzold-auktionen.de/termine/detailansicht-termin?tx_sfeventmgt_pievent%5Baction%5D=detail&tx_sfeventmgt_pievent%5Bcontroller%5D=Event&tx_sfeventmgt_pievent%5Bevent%5D=73&cHash=059bc449f42d3096ae513489837cdd7b",
          );
        }, 1500);
      } else {
        throw new Error("Verifizierung fehlgeschlagen");
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const handleResendEmail = async () => {
    setIsCodeResent(false);
    setResendError(null);

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
        setResendError(
          resp.message ||
            "Fehler beim erneuten Senden der Verifizierungs-E-Mail",
        );
      }
    } catch (e) {
      setResendError("Ein unbekannter Fehler ist aufgetreten");
    }
  };

  if (loading) {
    return (
      <h1 className="flex justify-center items-center h-screen">
        Ihre E-Mail-Adresse wird verifiziert. Bitte warten...
      </h1>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
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
          <>
            <div className="text-red-600 text-lg font-bold">
              E-Mail-Verifizierung fehlgeschlagen!
            </div>
            <div>Ihr Verifizierungstoken ist ungültig oder abgelaufen.</div>
            <div className="mt-4">
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
            <button
              onClick={handleResendEmail}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Verifizierungs-E-Mail erneut senden
            </button>

            {isCodeResent && (
              <div className="text-green-600 mt-4">
                Verifizierungs-E-Mail wurde erfolgreich erneut gesendet. Bitte
                überprüfen Sie Ihr Postfach.
              </div>
            )}

            {resendError && (
              <div className="text-red-600 mt-4">{resendError}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
