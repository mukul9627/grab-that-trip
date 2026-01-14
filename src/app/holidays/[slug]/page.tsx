import FeatureTwo from "@/components/features/feature-two";
import Wrapper from "@/layouts/Wrapper";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const metadata = {
  title: "GTT - Tour & Travel Booking",
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;

  return (
    <Wrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <FeatureTwo slug={slug} />
      </Suspense>
    </Wrapper>
  );
};

export default Page;
