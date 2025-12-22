import FeatureTwo from "@/components/features/feature-two";
import Wrapper from "@/layouts/Wrapper";
import { Suspense } from "react";

export const metadata = {
  title: "GTT - Tour & Travel Booking",
};

const Page = () => {
  return (
    <Wrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <FeatureTwo />
      </Suspense>
    </Wrapper>
  );
};

export default Page;
