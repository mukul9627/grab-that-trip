import Choose6 from "@/svg/home-one/Choose6";
import Choose7 from "@/svg/home-one/Choose7";
import Choose8 from "@/svg/home-one/Choose8";
import Image from "next/image";
import { JSX } from "react";

import shape from "@/assets/img/banner/banner-2/shape.png"

interface DataType {
   id: number;
   icon: JSX.Element;
   image: string;
   title: string;
   desc: string;
}

const choose_data: DataType[] = [
   {
      id: 1,
      icon: (<><Choose6 /></>),
      image: "/assets/img/icon/What_we_do-01.svg",
      title: "Travel on your terms",
      desc: "Life changes, plans change, your trip should too. Whether it’s adjusting dates, swapping destinations, or changing activities, we make it simple and stress-free so you can focus on the fun, not the logistics.",
   },
   {
      id: 2,
      icon: (<><Choose7 /></>),
      image: "/assets/img/icon/What_we_do-02.svg",
      title: "Moments that last",
      desc: "We don’t just book hotels or tours, we create experiences that stay with you. From breath-taking sights and hidden gems to the little surprises along the way, every moment is designed to make your trip unforgettable.",
   },
   {
      id: 3,
      icon: (<><Choose8 /></>),
      image: "/assets/img/icon/What_we_do-03.svg",
      title: "Expert Help Anytime",
      desc: "Flights get delayed, plans fall through, or questions pop up in the middle of the night. That’s when we’re there for you, experts offering real solutions in real time, so you can relax and enjoy your journey.",
   },
];

const Choose = () => {
   return (
      <div className="tg-chose-area tg-grey-bg pt-140 pb-70 p-relative z-index-1">
         <Image className="tg-chose-6-shape d-none d-md-block" src={shape} alt="" />
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-7 col-md-9">
                  <div className="tg-chose-section-title text-center mb-35">
                     <h5 className="tg-section-subtitle mb-15 wow fadeInUp" data-wow-delay=".3s" data-wow-duration=".1s">What we do</h5>
                     <h2 className="mb-15 text-capitalize wow fadeInUp" data-wow-delay=".4s" data-wow-duration=".9s">We Craft Unforgettable Journeys<br /> Ever Possible</h2>
                     <p className="text-capitalize wow fadeInUp mb-35" data-wow-delay=".5s" data-wow-duration=".9s"> Travel should be effortless, flexible, and full of stories you’ll love to share. From planning to return, we make every trip seamless and personal.</p>
                  </div>
               </div>
            </div>
            <div className="row">
              {choose_data.map((item) => (
  <div key={item.id} className="col-lg-4 col-md-6">
    <div className="tg-chose-6-wrap mb-30">
      <span className="icon mb-20">
        <Image 
          src={item.image}
          alt={item.title}
          width={60}
          height={60}
        />
      </span>

      <h4 className="tg-chose-6-title mb-15">{item.title}</h4>
      <p>{item.desc}</p>
    </div>
  </div>
))}
            </div>
         </div>
      </div>
   )
}

export default Choose
