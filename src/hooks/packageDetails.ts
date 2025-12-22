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

async function getPackagesByFeatureId(featureId: string | number) {
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


async function getPackagesByFeatureType(destinationId: string | number) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const res = await axios.get<PackagesApiResponse>(
      `${API_URL}Home/GetPackageForActivities`,
      {
        params: {
          feature_id: 0,
          destination_id: destinationId, // ✅ key change
          package_id: 0,
          is_active: true,
          priority: 0,
          topRows: 0,
          feature_type: 0,
        },
      }
    );

    return res.data?.data || [];
  } catch {
    return [];
  }
}




export {
getPackagesByFeatureId,
getPackagesByFeatureType

}


