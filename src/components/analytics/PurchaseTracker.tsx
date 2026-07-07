'use client'
import { useEffect } from "react";

interface PurchaseTrackerProps {
  eventId: string;
  value: number;
  currency?: string;
  contentName: string;
}

const PurchaseTracker = ({ eventId, value, currency = "USD", contentName }: PurchaseTrackerProps) => {
  useEffect(() => {
    const dedupeKey = `purchase_tracked_${eventId}`;
    if (sessionStorage.getItem(dedupeKey)) return;
    sessionStorage.setItem(dedupeKey, "1");

    if (typeof window.gtag === "function") {
      window.gtag("event", "purchase", {
        transaction_id: eventId,
        value,
        currency,
        items: [{ item_name: contentName }],
      });
    }
    if (typeof window.fbq === "function") {
      window.fbq("track", "Purchase", { value, currency, content_name: contentName });
    }
  }, [eventId, value, currency, contentName]);

  return null;
};

export default PurchaseTracker;
