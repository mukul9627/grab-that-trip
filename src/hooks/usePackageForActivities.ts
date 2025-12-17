"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export interface Destination {
  package_id: number;
package_name: string;
destination_name: string;
days: number;
base_price: number;
offer_price: number;
average_rating: number;
total_reviews: number;
bg_image: string;
feature_name: string;
feature_id: number;
short_description: string;
long_description: string;


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
          `${API}Home/GetPackageForActivities?feature_id=0&destination_id=0&package_id=0&is_active=true&priority=0&topRows=0&feature_type=4`,
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
