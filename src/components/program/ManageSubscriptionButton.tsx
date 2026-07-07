'use client'
import { useState } from "react";

const ManageSubscriptionButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Failed to open billing portal");
      window.location.href = data.url;
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="text-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="text-white/50 hover:text-white text-[13px] font-medium underline transition-colors duration-200 disabled:opacity-60"
      >
        {loading ? "Opening..." : "Manage subscription"}
      </button>
      {error && <p className="mt-2 text-red-400 text-[13px]">Something went wrong. Please try again.</p>}
    </div>
  );
};

export default ManageSubscriptionButton;
