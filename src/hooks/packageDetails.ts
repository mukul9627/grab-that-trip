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
  package_code: string;
};

type PackagesApiResponse = {
  data: PackageItem[];
};

async function getPackagesBySlug(
  slug: string,
  slugType: "destination" | "feature"
): Promise<PackageItem[]> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.get<PackagesApiResponse>(
      `${API_URL}Home/GetPackageBySlug`,
      {
        params: {
          slug,
          slug_type: slugType,
        },
      }
    );

    return response.data?.data || [];
  } catch (error: any) {
    console.error("❌ GetPackageBySlug ERROR:", error.message);
    return [];
  }
}

export { getPackagesBySlug };
