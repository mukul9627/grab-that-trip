"use client";

import { useState } from "react";

export function useBooking() {
  const [loading, setLoading] = useState(false);

  const sendEnquiry = async (payload: any) => {
    setLoading(true);

    try {
      const res = await fetch("https://gtt.dbbworldwide.com/Home/SendEnquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      return { ok: res.ok, data };
    } catch (err) {
      setLoading(false);
      return { ok: false, error: err };
    }
  };

  return { loading, sendEnquiry };
}
