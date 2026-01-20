import { fetchBlogDetails } from "@/lib/blog.server";
import BlogDetails from "@/components/blogs/blog-details";
import Wrapper from "@/layouts/Wrapper";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params; // ✅ IMPORTANT

  const blog = await fetchBlogDetails(slug);

  if (!blog) {
    return {
      title: "Blog Details",
      description: "Blog not found",
    };
  }

  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_description || blog.title,
  };
}

export default function Page() {
  return (
    <Wrapper>
      <BlogDetails />
    </Wrapper>
  );
}
