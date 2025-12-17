export async function getPackageDetail(packageId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}Home/GetPackageDetail?package_id=${packageId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch package detail");
  }

  const json = await res.json();
  return json.data?.[0]; // API returns array
}
