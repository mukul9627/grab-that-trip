import type { BlogDetailsItem } from "@/hooks/useBlogDetails";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchBlogDetails(
  slug: string
): Promise<BlogDetailsItem | null> {
  const res = await fetch(`${BASE_URL}Home/GetBlogDetail?slug=${slug}`, {
    cache: "no-store",
  });

  const json = await res.json();
  return json?.status === "True" && json.data?.length ? json.data[0] : null;
}
