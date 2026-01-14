import FeatureSix from "@/components/features/feature-six";
import Wrapper from "@/layouts/Wrapper";
import { Suspense } from "react";

export const metadata = {
  title: "GTT - Tour & Travel Booking",
};

const Page = () => {
  return (
    <Wrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <FeatureSix/>
      </Suspense>
    </Wrapper>
  );
};

export default Page;
