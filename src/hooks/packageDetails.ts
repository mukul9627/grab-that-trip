import axios from "axios";

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
};

type PackagesApiResponse = {
  data: PackageItem[];
};

export async function getPackagesByFeatureId(featureId: string | number) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.get<PackagesApiResponse>(
      `${API_URL}Home/GetPackage`,
      {
        params: {
          feature_id: featureId,
          destination_id: 0,
          package_id: 0,
          is_active: true,
          priority: 0,
        },
        headers: { "Cache-Control": "no-cache" },
      }
    );

    return response.data?.data || [];
  } catch (error: any) {
    console.error("❌ API ERROR:", error.message);
    return [];
  }
}
