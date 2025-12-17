export async function getFeatureTabTow() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}home/3`, {
    cache: "no-store",
  });

  const json = await res.json();
  return json;
}