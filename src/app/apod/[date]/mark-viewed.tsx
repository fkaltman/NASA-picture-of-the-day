"use client";

import { useEffect } from "react";

export default function MarkViewed({ date }: { date: string }) {
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("viewedApods") || "[]");
    if (!stored.includes(date)) {
      const updated = [...stored, date];
      localStorage.setItem("viewedApods", JSON.stringify(updated));
      // Dispatch custom event to update the grid in real-time
      window.dispatchEvent(new Event("viewedUpdate"));
    }
  }, [date]);

  return null;
}
