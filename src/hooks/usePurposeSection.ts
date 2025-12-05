"use client";

import { useEffect, useState } from "react";

export type ApiPackage = {
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
};

export function usePurposeSection(featureId: number) {
  const [listingData, setListingData] = useState<ApiPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://gtt.dbbworldwide.com/Home/GetPackage?feature_id=${featureId}&destination_id=0&package_id=0&is_active=true&priority=0`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.data)) {
          setListingData(data.data);
        } else {
          setListingData([]);
        }
      })
      .catch(() => setListingData([]))
      .finally(() => setLoading(false));
  }, [featureId]);

  return { listingData, loading };
}
