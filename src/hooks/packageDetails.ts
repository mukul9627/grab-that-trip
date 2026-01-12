import axios from "axios";

/* =======================
   TYPES
======================= */

type PackageItem = {
  package_id: number;
  package_name: string;
  bg_image: string;
  days: number;
  average_rating: number;
  total_reviews: number;
  base_price: number;
  offer_price: number;
  destination_name: string;
  package_code: string;
};

type PackagesApiResponse = {
  data: PackageItem[];
};

/* =======================
   FEATURE BASED API
   (feature_id + destination_id)
======================= */
async function getPackagesByFeatureId(
  featureId: string | number,
  destinationId: string | number
): Promise<PackageItem[]> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.get<PackagesApiResponse>(
      `${API_URL}Home/GetPackage`,
      {
        params: {
          feature_id: featureId,
          destination_id: destinationId,
          package_id: 0,
          is_active: true,
          priority: 0,
        },
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    return response.data?.data || [];
  } catch (error: any) {
    console.error("❌ GetPackage API ERROR:", error.message);
    return [];
  }
}

/* =======================
   DESTINATION BASED API
======================= */
async function getPackagesByFeatureType(
  destinationId: string | number,
  featureId: string | number
): Promise<PackageItem[]> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.get<PackagesApiResponse>(
      `${API_URL}Home/GetPackageForActivities`,
      {
        params: {
          feature_id: featureId,
          destination_id: destinationId,
          package_id: 0,
          is_active: true,
          priority: 0,
          topRows: 0,
          feature_type: 0,
        },
      }
    );

    return response.data?.data || [];
  } catch (error: any) {
    console.error("❌ GetPackageForActivities API ERROR:", error.message);
    return [];
  }
}

/* =======================
   EXPORTS
======================= */
export {
  getPackagesByFeatureId,
  getPackagesByFeatureType,
};
