'use client'
import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

interface CalEmbedProps {
  calLink: string;
  namespace: string;
  className?: string;
}

const CalEmbed = ({ calLink, namespace, className }: CalEmbedProps) => {
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

  return (
    <Cal
      calLink={calLink}
      namespace={namespace}
      config={{ layout: "month_view", theme: "dark" }}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      className={className}
    />
  );
};

export default CalEmbed;
