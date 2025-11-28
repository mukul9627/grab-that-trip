"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export interface MoodType {
  feature_id: number;
  name: string;
  slug: string;
  description: string;
  icon_image: string;
}

interface MoodApiResponse {
  status: string;
  data: MoodType[];
}

export function useMoods() {
  const [moods, setMoods] = useState<MoodType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL;

    const fetchMoods = async () => {
      try {
        if (!API) {
          setError("Missing API URL");
          return;
        }

        const res = await axios.get<MoodApiResponse>(`${API}home/1`);

        if (res.data.status === "True") {
          setMoods(res.data.data);
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

    fetchMoods();
  }, []);

  return { moods, loading, error };
}
