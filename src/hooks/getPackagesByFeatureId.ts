export async function getPackagesByFeatureId(featureId: string | number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}Home/GetPackage?feature_id=${featureId}&destination_id=0&package_id=0&is_active=true&priority=0&topRows=3`,

    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data || [];
}
