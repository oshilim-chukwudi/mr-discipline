'use client'
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "../../lib/supabase/client";

interface MagicLinkFormProps {
  next?: string;
  prefillEmail?: string;
}

const MagicLinkForm = ({ next = "/program/jumpstart", prefillEmail = "" }: MagicLinkFormProps) => {
  const router = useRouter();
  const [email, setEmail] = useState(prefillEmail);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [showCodeEntry, setShowCodeEntry] = useState(false);
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  };

  const handleVerifyCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVerifying(true);
    setVerifyError("");

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });

    if (error) {
      setVerifyError(error.message);
      setVerifying(false);
    } else {
      router.push(next);
      router.refresh();
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {status === "sent" ? (
        <div className="text-center">
          <p className="text-white font-bold">Check your email.</p>
          <p className="mt-2 text-white/60 text-[14px]">
            We sent an access link to {email}. Tap it on this device to open JumpStart.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="the email you purchased with"
            className="bg-black/60 border border-white/15 focus:border-red-500/60 py-3 px-4 rounded-lg text-white placeholder:text-white/40 outline-none transition-colors duration-200"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {status === "sending" ? "Sending..." : "Email me my access link"}
          </button>
          {status === "error" && (
            <p className="text-red-400 text-[13px] text-center">
              {errorMessage || "Something went wrong. Please try again."}
            </p>
          )}
        </form>
      )}

      <div className="mt-4 text-center">
        {showCodeEntry ? (
          <form onSubmit={handleVerifyCode} className="flex flex-col gap-3">
            <p className="text-white/40 text-[12px]">Enter the code from your email:</p>
            <input
              type="text"
              inputMode="numeric"
              required
              value={code}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
              placeholder="123456"
              className="bg-black/60 border border-white/15 focus:border-red-500/60 py-3 px-4 rounded-lg text-white text-center tracking-[0.3em] placeholder:text-white/30 outline-none transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={verifying}
              className="bg-white/10 hover:bg-white/15 disabled:opacity-60 text-white font-bold py-2.5 px-6 rounded-lg transition-colors duration-200"
            >
              {verifying ? "Verifying..." : "Verify code"}
            </button>
            {verifyError && <p className="text-red-400 text-[13px]">{verifyError}</p>}
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setShowCodeEntry(true)}
            className="text-white/30 hover:text-white/60 text-[12px] transition-colors duration-200"
          >
            Have a code instead?
          </button>
        )}
      </div>
    </div>
  );
};

export default MagicLinkForm;
