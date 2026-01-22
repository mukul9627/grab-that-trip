const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchHolidayMeta(
  slug: string,
  slugType: "feature" | "destination"
) {
  try {
    const res = await fetch(
      `${BASE_URL}Home/GetMetaDetail?slug=${slug}&slug_type=${slugType}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const json = await res.json();

    return json?.status === "True" && json.data?.length
      ? json.data[0]
      : null;
  } catch (error) {
    console.error("Holiday meta fetch error:", error);
    return null;
  }
}
