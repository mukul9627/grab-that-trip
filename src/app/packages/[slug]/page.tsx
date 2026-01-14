import FeatureDetailsOne from "@/components/features/feature-details-one";
import Wrapper from "@/layouts/Wrapper";
import { Suspense } from "react";

export const metadata = {
  title: "GTT - Tour & Travel Booking",
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  return (
    <Wrapper>
      <Suspense fallback={<div>Loading tour details...</div>}>
        <FeatureDetailsOne slug={slug} />
      </Suspense>
    </Wrapper>
  );
};

export default Page;
