'use client'
import { useEffect, useState } from "react";
import { getCalApi } from "@calcom/embed-react";

interface CalBookButtonProps {
  calLink: string;
  namespace: string;
  label: string;
  className?: string;
}

const CalBookButton = ({ calLink, namespace, label, className }: CalBookButtonProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace });
      cal("ui", {
        theme: "dark",
        styles: {
          branding: { brandColor: "#dc2626" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [namespace]);

  const handleClick = async () => {
    setLoading(true);
    try {
      const cal = await getCalApi({ namespace });
      cal("modal", {
        calLink,
        config: { layout: "month_view", theme: "dark" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`${className ?? ""} inline-flex items-center justify-center gap-2 disabled:opacity-60`}
    >
      {loading && (
        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
      )}
      {loading ? "Loading..." : label}
    </button>
  );
};

export default CalBookButton;
