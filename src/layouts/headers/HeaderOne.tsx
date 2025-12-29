"use client";

import NavMenu from "./Menu/NavMenu";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import UseSticky from "@/hooks/UseSticky";
import Offcanvas from "./Menu/Offcanvas";
import Sidebar from "./Menu/Sidebar";
import PhoneIcon from "@/svg/PhoneIcon";
import UserIcon from "@/svg/UserIcon";

import logo_1 from "@/assets/img/logo/GrabThatTrip_White.svg";
import logo_2 from "@/assets/img/logo/GrabThatTrip_Colour.svg";

const HeaderOne = () => {
  const { sticky } = UseSticky();
  const [offCanvas, setOffCanvas] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <header className="tg-header-height">
        <div
          className={`tg-header__area tg-header-tu-menu tg-header-lg-space z-index-999 homeone-header-p tg-transparent ${
            sticky ? "header-sticky" : ""
          }`}
          style={{ padding: "26px" }}
          id="header-sticky"
        >
          <div className="container">
            <div className="row align-items-center">
              {/* LEFT */}
              <div className="col-xxl-9 col-xl-8 col-lg-8 col-3">
                <div className="tgmenu__wrap d-flex align-items-center">
                  {/* LOGO */}
                  <div className="logo mr-25">
                    <Link className="logo-1" href="/">
                      <Image src={logo_1} alt="Logo" width={90} height={77} />
                    </Link>
                    <Link className="logo-2 d-none" href="/">
                      <Image src={logo_2} alt="Logo" width={90} height={77} />
                    </Link>
                  </div>

                  {/* SEARCH */}
                  <nav className="tgmenu__nav ml-190">
                    <div className="tgmenu__navbar-wrap d-none d-xl-flex">
                      <div className="mood-search-wrapper">
                        <input
                          type="search"
                          className="mood-input"
                          placeholder="enter: Mood.."
                        />

                        {/* SEARCH ICON */}
                        <svg
                          className="search-icon"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="11"
                            cy="11"
                            r="7"
                            stroke="white"
                            strokeWidth="2"
                          />
                          <line
                            x1="20"
                            y1="20"
                            x2="16.65"
                            y2="16.65"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>

              {/* RIGHT */}
              <div className="col-xxl-3 col-xl-4 col-lg-4 col-9">
                <div className="tg-menu-right-action d-flex align-items-center justify-content-end">
                  <div className="tg-header-contact-info d-flex align-items-center">
                    <span className="tg-header-contact-icon mr-10 d-none d-xl-block phoneicon-ms"
>
                      <PhoneIcon />
                    </span>
                  </div>

                  <div className="tg-header-btn ml-20 d-none d-sm-block">
                    <Link className="tg-btn-header mr-20" href="/login">
                      <span>
                        <UserIcon />
                      </span>
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* STYLES */}
      <style jsx>{`
   /* Input text + background */
.header-sticky .mood-input {
  border: 2px solid #0A6A67;
  background: rgba(10, 106, 103, 0.05); /* 5% opacity */
  color: #000; /* input text */
}

/* Placeholder text */
.header-sticky .mood-input::placeholder {
  color: #000;
  opacity: 1; /* ensure full black */
}

/* Search icon color */
.header-sticky .search-icon circle,
.header-sticky .search-icon line {
  stroke: #000;
}
  .header-sticky .phoneicon-ms{
   background: #FFFFFF80;
    opacity: 0.85;
    color: black;
    border: 2px solid #0A6A67;
  }
        .mood-search-wrapper {
          position: relative;
          width: 445px;
          padding: 0 0 0 112px
        }
          .phoneicon-ms{
          background: #FFFFFF80;
    opacity: 0.85;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.6);
          }

        .mood-input {
          width: 100%;
          height: 60%;
          padding: 16px 55px 16px 24px;
          border-radius: 999px;
          border: 2px solid rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          outline: none;
          color: #fff;
          font-size: 18px;
        }

        .mood-input::placeholder {
          color: rgba(255, 255, 255, 0.85);
          font-style: italic;
        }

        .search-icon {
          position: absolute;
          right: 22px;
          top: 32%;
          transform: translateY(-50%);
          pointer-events: none;
        }
      `}</style>
    </>
  );
};

export default HeaderOne;
