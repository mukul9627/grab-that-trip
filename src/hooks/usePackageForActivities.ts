"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export interface Destination {
 feature_id: number;
            feature_type_id: number;
            name: string;
            slug: string;
            description: string;
            display_order: string;
            is_active: number;
            icon_image: string;
            bg_image: string;
            feature_type: string;
            gtt_package_features: string;
            articles: string;

}

interface DestinationResponse {
  status: string;
  message: string;
  data: Destination[];
}

export function usePackageForActivities() {
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
          `${API}Home/4`,
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


export function usePackageForActivitiesList() {
  const [destinationsList, setDestinationsList] = useState<Destination[]>([]);
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
          `${API}Home/4`,
          {
            headers: { "Cache-Control": "no-cache" },
          }
        );

        if (res.data.status === "True") {
          setDestinationsList(res.data.data);
          console.log(res.data.data)
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

  return { destinationsList, loading, error };
}