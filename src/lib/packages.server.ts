const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPackageDetail(slug: string) {
  try {
    const res = await fetch(
      `${BASE_URL}Home/GetPackageDetailBySlug?slug=${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const json = await res.json();

    return json?.status === "True" && json.data?.length
      ? json.data[0]
      : null;
  } catch (error) {
    console.error("Package fetch error:", error);
    return null;
  }
}
