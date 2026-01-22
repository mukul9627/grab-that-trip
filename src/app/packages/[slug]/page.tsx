import FeatureDetailsOne from "@/components/features/feature-details-one";
import Wrapper from "@/layouts/Wrapper";
import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchPackageDetail } from "@/lib/packages.server";


/* =========================
   SEO METADATA
========================= */
export async function generateMetadata(

  
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {
  const { slug } = await props.params;
  const data = await fetchPackageDetail(slug);

  return {
    title: data?.meta_title ?? "Tour Package | GTT",
    description: data?.description ?? "Best tour packages by GTT",
    keywords: data?.keywords ?? "tour packages, travel deals",

    // openGraph: {
    //   title: data?.meta_title ?? "Tour Package | GTT",
    //   description: data?.description ?? "Best tour packages by GTT",
    //   url: `/packages/${slug}`,
    //   type: "website",
    // },

    alternates: {
      canonical: `https://www.grabthattrip.com/packages/${slug}`,
    },
  };
}

/* =========================
   PAGE COMPONENT
========================= */
export default async function Page(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const { slug } = await props.params;
  const data = await fetchPackageDetail(slug);

  if (!data) return null;

  return (
    <Wrapper>
      {/* FAQ SCHEMA FOR SEO */}
      {data?.faq_schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: data.faq_schema,
          }}
        />
      )}

      <Suspense fallback={<div>Loading tour details...</div>}>
        <FeatureDetailsOne slug={slug} />
      </Suspense>
    </Wrapper>
  );
}
