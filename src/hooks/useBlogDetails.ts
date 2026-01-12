"use client";

import { useEffect, useState } from "react";
import type { FAQ } from "@/components/homes/home-one/faq";

/* =======================
   API TYPES
======================= */
type BlogFaqApi = {
  faq_id: number;
  question: string;
  answer: string;
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

export type BlogTag = {
  tag_id: number;
  tag_name: string;
  slug: string;
  blog_count: number;
};

export type BlogCategory = {
  category_id: number;
  name: string;
  slug: string;
  blog_count: number;
};

export type BlogRecentPost = {
  blog_id: number;
  title: string;
  slug: string;
  short_description: string;
  content: string;
  featured_image: string;
  banner_image: string;
  video_url: string | null;
  author_id: number;
  published_date: string; // ISO string
  is_published: boolean;
  view_count: number;
  created_at: string; // ISO string
  updated_at: string | null;
  meta_title: string;
  meta_description: string;
  meta_keywords: string | null;

};


/* =======================
   API BASE
======================= */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/* =======================
   API CALLS
======================= */
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

export async function fetchBlogDetails(
  slug: string
): Promise<BlogDetailsItem | null> {
  const res = await fetch(`${BASE_URL}Home/GetBlogDetail?slug=${slug}`);
  const json = await res.json();
  return json?.status === "True" && json.data?.length ? json.data[0] : null;
}

export async function fetchBlogFaq(blogId: number): Promise<BlogFaqApi[]> {
  const res = await fetch(`${BASE_URL}Home/GetFAQ?blog_id=${blogId}`);
  const json = await res.json();
  return json?.status === "True" ? json.data : [];
}

export async function fetchBlogTag(): Promise<BlogTag[]> {
  const res = await fetch(`${BASE_URL}Home/GetTag`);
  const json = await res.json();
  return json?.status === "True" ? json.data : [];
}

export async function fetchBlogCategory(): Promise<BlogCategory[]> {
  const res = await fetch(`${BASE_URL}Home/GetBlogCategories`);
  const json = await res.json();
  return json?.status === "True" ? json.data : [];
}

export async function fetchBlogRecentPost(): Promise<BlogRecentPost[]> {
  const res = await fetch(`${BASE_URL}Home/GetRecentBlog?top=4`);
  const json = await res.json();
  return json?.status === "True" ? json.data : [];
}
export async function fetchBlogRecentPostThree(): Promise<BlogRecentPost[]> {
  const res = await fetch(`${BASE_URL}Home/GetRecentBlog?top=3`);
  const json = await res.json();
  return json?.status === "True" ? json.data : [];
}

/* =======================
   CUSTOM HOOK
======================= */
export function useBlogDetails(slug?: string) {
  const [faqData, setFaqData] = useState<FAQ[]>([]);
  const [blogList, setBlogList] = useState<BlogListItem[]>([]);
  const [blogDetails, setBlogDetails] = useState<BlogDetailsItem | null>(null);
  const [blogTag, setBlogTag] = useState<BlogTag[]>([]);
  const [blogCategory, setBlogCategory] = useState<BlogCategory[]>([]);
  const [blogRecentPost, setBlogRecentPost] = useState<BlogRecentPost[]>([]);
  const [blogRecentPostThree, setBlogRecentPostThree] = useState<BlogRecentPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const list = await fetchBlogList();
        setBlogList(list);

        // ✅ Blog tags (FIX ADDED)
        const tags = await fetchBlogTag();
        setBlogTag(tags);

        const category = await fetchBlogCategory();
        setBlogCategory(category);

        const recent = await fetchBlogRecentPost();
        setBlogRecentPost(recent);

        const recentthree = await fetchBlogRecentPostThree();
        setBlogRecentPostThree(recentthree);

        if (!slug) return;

        const details = await fetchBlogDetails(slug);
        if (!details) {
          setError("Blog not found");
          return;
        }

        setBlogDetails(details);

        // ✅ FAQ ADAPTER (ONLY FIX)
        const faqApi = await fetchBlogFaq(details.blog_id);

        const mappedFaq: FAQ[] = faqApi.map((item, index) => ({
          tourplan_id: item.faq_id,
          day_no: index + 1,
          activity: item.question,
          description: item.answer,
        }));

        setFaqData(mappedFaq);
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
    blogTag,
    blogCategory,
    blogRecentPost,
    blogRecentPostThree,
    loading,
    error,
  };
}
