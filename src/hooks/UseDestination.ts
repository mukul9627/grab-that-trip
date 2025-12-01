"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export interface Destination {
  destination_id: number;
  name: string;
  country: string;
  state_region: string;
  city: string;
  short_description: string;
  long_description: string;
  hero_image_url: string;
  is_top_destination: boolean;
}

interface DestinationResponse {
  status: string;
  message: string;
  data: Destination[];
}

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL;

    const fetchData = async () => {
      try {
        if (!API) {
          setError("Missing API URL");
          return;
        }

        const res = await axios.get<DestinationResponse>(
          `${API}home/GetDestination/0/true`,
          {
            headers: { "Cache-Control": "no-cache" },
          }
        );

        if (res.data.status === "True") {
          setDestinations(res.data.data);
        } else {
          setError("Invalid API response");
        }
      } catch (err: unknown) {
        const e = err as Error;
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { destinations, loading, error };
}
