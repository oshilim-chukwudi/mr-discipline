'use client'
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

interface CalBookButtonProps {
  calLink: string;
  namespace: string;
  label: string;
  className?: string;
}

const CalBookButton = ({ calLink, namespace, label, className }: CalBookButtonProps) => {
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
    const cal = await getCalApi({ namespace });
    cal("modal", {
      calLink,
      config: { layout: "month_view", theme: "dark" },
    });
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {label}
    </button>
  );
};

export default CalBookButton;
