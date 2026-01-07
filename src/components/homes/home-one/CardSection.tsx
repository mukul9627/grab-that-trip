"use client";
import Link from "next/link";
import Image from "next/image";

export default function CardSection() {
  const cardData = [
    {
      image: "/assets/img/icon/Why Choose Us-01.svg",
      title: "We match destinations to your mood, not just your budget. ",
      desc: "Most travel sites show you what's cheap. We show you what's right.",
    },
    {
      image: "/assets/img/icon/Why Choose Us-02.svg",
      title: "Every itinerary is built around your purpose, not a template.",
      desc: "Cookie-cutter trips waste your time and money. Custom planning saves both.",
    },
    {
      image: "/assets/img/icon/Why Choose Us-03.svg",
      title: "Real travellers, real expertise, real recommendations. ",
      desc: "We've been there. We know what works. And we'll tell you what doesn't.",
    },
  ];

  return (
    <section
      className="relative w-full flex items-center bg-center bg-cover bg-no-repeat"
      style={{
        height: "760px",
        backgroundImage: 'url("/assets/img/bg/Why_choose_us.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="container relative z-20">
        <div className="row">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center text-white mt-4 mt-md-0">
            <h2 className="text-3xl font-bold leading-snug mb-4 text-white">
              Why Travellers Trust Us ?
            </h2>

            <Link href="/about">
              <button className="bg-white rounded-md font-semibold hover:bg-gray-100 cardsection-button-mukul">
                READ MORE
              </button>
            </Link>
          </div>

          <div className="col-12 col-md-6 d-flex flex-column gap-4 mt-4 mt-md-0 pt-100">
            {cardData.map((item, index) => (
              <div
                key={index}
                className="bg-opacity rounded-cardsection shadow-lg p-2 p-md-4  d-flex gap-3"
              >
                <div>
                  <Image
                    src={item.image}
                    alt="icon"
                    width={75}
                    height={75}
                  />
                </div>

                <div>
                  <h3 className="h5 fw-bold">{item.title}</h3>
                  <p className="text-muted mb-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
