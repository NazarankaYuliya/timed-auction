"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

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
          router.push("/login");
        }, 1500);
      } else {
        throw new Error("Verification failed");
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  if (loading)
    return (
      <h1 className="flex justify-center items-center h-screen">
        Verifying your Email address. Please wait...
      </h1>
    );

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        {verified && (
          <>
            <div>Email Verified!</div>
            <div>Your email has been verified successfully.</div>
          </>
        )}

        {error && (
          <>
            <div>Email Verification Failed!</div>
            <div>Your verification token is invalid or expired.</div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
