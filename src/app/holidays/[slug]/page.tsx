import FeatureTwo from "@/components/features/feature-two";
import Wrapper from "@/layouts/Wrapper";
import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchHolidayMeta } from "@/lib/holiday.server";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* =========================
   SERVER SEO (NO DUPLICATES)
========================= */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;

  // 1️⃣ Try FEATURE
  let meta = await fetchHolidayMeta(slug, "feature");

  // 2️⃣ Fallback to DESTINATION
  if (!meta) {
    meta = await fetchHolidayMeta(slug, "destination");
  }

  if (!meta) {
    return {
      title: "Holiday Packages | Grab That Trip",
      description: "Explore the best holiday packages with Grab That Trip",
    };
  }

  return {
    title: meta.tag,                 // ✅ UNIQUE TITLE
    description: meta.description,   // ✅ UNIQUE DESCRIPTION
    keywords: meta.keywords,

    alternates: {
      canonical: `https://www.grabthattrip.com/holidays/${slug}`,
    },

    openGraph: {
      title: meta.tag,
      description: meta.description,
      url: `/holidays/${slug}`,
      type: "website",
    },

    twitter: {
      card: "summary",
      title: meta.tag,
      description: meta.description,
    },
  };
}

/* =========================
   PAGE
========================= */
export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // Fetch again ONLY for FAQ schema
  let meta = await fetchHolidayMeta(slug, "feature");
  if (!meta) {
    meta = await fetchHolidayMeta(slug, "destination");
  }

  return (
    <Wrapper>
      {/* ✅ FAQ SCHEMA (SERVER RENDERED) */}
      {meta?.faq_schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: meta.faq_schema,
          }}
        />
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <FeatureTwo slug={slug} />
      </Suspense>
    </Wrapper>
  );
}
