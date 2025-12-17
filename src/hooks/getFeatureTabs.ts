import axios from "axios";

type FeatureTabsApiResponse = {
  data: {
    feature_id: number;
    name: string;
    slug: string;
    display_order: number;
  }[];
};

export async function getFeatureTabs() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.get<FeatureTabsApiResponse>(`${API_URL}home/2`, {
      headers: { "Cache-Control": "no-cache" },
    });

    const json = response.data; // ✅ json now typed (no unknown)

    return (json.data || []).map((item) => ({
      id: item.feature_id,
      title: item.name,
      slug: item.slug,
      order: item.display_order,
    }));
  } catch (error: any) {
    console.error("❌ Error loading feature tabs:", error?.message);
    return [];
  }
}
