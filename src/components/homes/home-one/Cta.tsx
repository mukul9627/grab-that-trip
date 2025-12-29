"use client";

import Link from "next/link";

const Cta = () => {
  return (
    <>
      <section className="cta-wrapper">
        <div
          className="cta-bg"
          style={{
            backgroundImage: "url(/assets/img/banner/banner-2/thumb.jpg)",
          }}
        />

        <div className="cta-overlay">
          <div className="cta-content">
            <h4>Enjoy Summer Deals</h4>
            <h2>Up to 40% Discounts!</h2>

            <Link href="/holidays">
              <button className="cta-btn">See Details →</button>
            </Link>
          </div>
        </div>

        <span className="cta-divider" />

        <style jsx>{`
          .cta-wrapper {
            position: relative;
            width: 100%;
            height: 320px;
            overflow: hidden;
            border-radius: 4px;
          }

          .cta-bg {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
            z-index: 1;
          }

          .cta-overlay {
            position: relative;
            z-index: 2;
            width: 32%;
            height: 100%;
            background: rgba(40, 120, 115, 0.85);
            display: flex;
            align-items: center;
            padding-left: 60px;
          }

          .cta-content h4 {
            color: #e7f7f6;
            font-size: 16px;
            margin-bottom: 10px;
          }

          .cta-content h2 {
            color: #ffffff;
            font-size: 34px;
            font-weight: 700;
            margin-bottom: 25px;
            line-height: 1.2;
          }

          .cta-btn {
            background: #ff4d4f;
            color: #fff;
            border: none;
            padding: 12px 26px;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s ease;
          }

          .cta-btn:hover {
            background: #e63b3d;
          }

          .cta-divider {
            position: absolute;
            top: 0;
            left: 32%;
            width: 4px;
            height: 100%;
            background: #ff6b6b;
            z-index: 3;
          }

          @media (max-width: 991px) {
            .cta-overlay {
              width: 100%;
              padding: 40px;
            }

            .cta-divider {
              display: none;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default Cta;
