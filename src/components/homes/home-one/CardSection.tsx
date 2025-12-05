"use client";

export default function CardSection() {
  const cardData = [
    { title: "Lorem Ipsum", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
    { title: "Lorem Ipsum", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
    { title: "Lorem Ipsum", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  ];

  return (
    <section
      className="relative w-full  flex items-center bg-center bg-cover bg-no-repeat"
      style={{ height: "700px",
        backgroundImage: 'url("/assets/img/bg/cardsectionbg.jpg")',
      }}
    >
      {/* overlay (optional) */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container relative z-20">
        <div className="row">
          
          {/* LEFT COL-6 */}
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center text-white">
            <h1 className="text-4xl font-bold leading-snug mb-4 text-white">
              Book Ticket Easily With <br /> Just A Few Steps
            </h1>
            <p className="text-lg mb-6">
              Are you tired of the typical tourist destinations and looking to
              step out of your comfort zone?
            </p>

            <button className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 cardsection-button-mukul">
              READ MORE
            </button>
          </div>

          {/* RIGHT COL-6 */}
          <div className="col-12 col-md-6 d-flex flex-column gap-4 mt-4 mt-md-0 pt-100">
            {cardData.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-4 d-flex gap-3">
                <div className="rounded-circle bg-teal-700" style={{ width: 75, height: 60, background: "#0A6A67", marginTop: "15px" }}></div>
                <div>
                  <h3 className="h5 fw-bold">{item.title}</h3>
                  <p className="text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
