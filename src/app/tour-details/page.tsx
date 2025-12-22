import FeatureDetailsOne from "@/components/features/feature-details-one";
import Wrapper from "@/layouts/Wrapper";
import { Suspense } from "react";

export const metadata = {
  title: "GTT - Tour & Travel Booking",
};
const page = () => {
  return (
    <Wrapper>
      <Suspense fallback={<div>Loading tour details...</div>}>
       <FeatureDetailsOne />
      </Suspense>
     
    </Wrapper>
  )
}

export default page