"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export interface Destination {
  testimonial_id: number;
  title: string;
  heading: string;
  description: string;
  added_by: string;
  city: string;
  thumbnail: string;

  images?: string[]; // store testimonial images
}

interface DestinationResponse {
  status: string;
  message: string;
  data: Destination[];
}

interface TestimonialImage {
  id: number;
  testimonial_id: number;
  image_name: string;
  added_on: string;
  is_active: boolean;
}

interface TestimonialImageResponse {
  status: string;
  message: string;
  data: TestimonialImage[];
}

export function useTestimonial() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL;
      const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL;

    const fetchData = async () => {
      try {
        if (!API) {
          setError("Missing API URL");
          return;
        }

        // Step 1: Fetch testimonials
        const res = await axios.get<DestinationResponse>(
          `${API}Home/GetTestimonial/0`
        );

        let list = res.data.data;

        // Step 2: Fetch images for each testimonial
        const withImages = await Promise.all(
          list.map(async (item) => {
            const imgRes = await axios.get<TestimonialImageResponse>(
              `${API}Home/GetTestimonialImage?id=0&testimonial_id=${item.testimonial_id}&topRows=3`
            );

            const imgs = imgRes.data.data.map(
              (x: any) => `${imageBase}/testimonial/${x.image_name}`
            );

            return { ...item, images: imgs };
          })
        );

        setDestinations(withImages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { destinations, loading, error };
}
