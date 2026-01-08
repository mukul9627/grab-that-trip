"use client";

import { useEffect, useState } from "react";

/* =======================
   TYPES
======================= */

export type BlogFaq = {
  tourplan_id: number;
  day_no: number;
  activity: string;
  description: string;
};

export type BlogListItem = {
  blog_id: number;
  title: string;
  slug: string;
  short_description: string;
  featured_image: string;
  published_date: string;
  author_name: string;
  profile_image: string;
};

export type BlogDetailsItem = {
  blog_id: number;
  title: string;
  content: string;
  banner_image: string;
  video_url: string;
  published_date: string;
  meta_title: string;
  meta_description: string;
  author_name: string;
  profile_image: string;
  bio: string;
};

/* =======================
   API FUNCTIONS (EXPORTED)
======================= */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
"https://gtt.dbbworldwide.com/Home";

export async function fetchBlogList(
  pageNo = 1,
  pageSize = 10
): Promise<BlogListItem[]> {
  const res = await fetch(
    `${BASE_URL}Home/GetBlogList?page_no=${pageNo}&page_size=${pageSize}`
  );
  const json = await res.json();
  return json?.status === "True" ? json.data : [];
}

// export async function fetchBlogDetails(
//   slug: string
// ): Promise<BlogDetailsItem | null> {
//   const res = await fetch(
//     `${BASE_URL}/GetBlogDetail?slug=${slug}`
//   );
//   const json = await res.json();
//   return json?.status === "True" ? json.data : null;
// }


export async function fetchBlogDetails(
  slug: string
): Promise<BlogDetailsItem | null> {
  const res = await fetch(
    `${BASE_URL}Home/GetBlogDetail?slug=${slug}`
  );

  const json = await res.json();

  // ✅ API returns ARRAY → pick first item
  if (json?.status === "True" && Array.isArray(json.data) && json.data.length) {
    return json.data[0];
  }

  return null;
}

export async function fetchBlogFaq(blogId: number): Promise<BlogFaq[]> {
  const res = await fetch(`${BASE_URL}Home/GetFAQ?blog_id=${blogId}`);
  const json = await res.json();
  return json?.status === "True" ? json.data : [];
}

/* =======================
   CUSTOM HOOK
======================= */

export function useBlogDetails(slug?: string) {
  const [faqData, setFaqData] = useState<BlogFaq[]>([]);
  const [blogList, setBlogList] = useState<BlogListItem[]>([]);
  const [blogDetails, setBlogDetails] = useState<BlogDetailsItem | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // 1️⃣ Blog List
        const list = await fetchBlogList();
        setBlogList(list);

        if (!slug) return;

        // 2️⃣ Blog Details
        const details = await fetchBlogDetails(slug);
        if (!details) {
          setError("Blog not found");
          return;
        }

        setBlogDetails(details);

        // 3️⃣ FAQ (using real blog_id)
        const faq = await fetchBlogFaq(details.blog_id);
        setFaqData(faq);

      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug]);

  return {
    faqData,
    blogList,
    blogDetails,
    loading,
    error,
  };
}
