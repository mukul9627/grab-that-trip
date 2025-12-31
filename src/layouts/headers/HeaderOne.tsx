"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import UseSticky from "@/hooks/UseSticky";
import PhoneIcon from "@/svg/PhoneIcon";
import UserIcon from "@/svg/UserIcon";

import logo_1 from "@/assets/img/logo/GrabThatTrip_White.svg";
import logo_2 from "@/assets/img/logo/GrabThatTrip_Colour.svg";

const HeaderOne = () => {
  const { sticky } = UseSticky();

  // mobile search modal toggle
  const [showSearchModal, setShowSearchModal] = useState(false);

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

              {/* LEFT — LOGO */}
              <div className="col-6 col-lg-3">
                <div className="logo">
                  <Link className="logo-1" href="/">
                    <Image src={logo_1} alt="Logo" width={90} height={77} />
                  </Link>
                  <Link className="logo-2 d-none" href="/">
                    <Image src={logo_2} alt="Logo" width={90} height={77} />
                  </Link>
                </div>
              </div>

              {/* SEARCH — DESKTOP ONLY */}
              <div className="col-lg-6 d-none d-lg-block">
                <div className="tgmenu__navbar-wrap">
                  <div className="mood-search-wrapper">
                    <input
                      type="search"
                      className="mood-input"
                      placeholder="enter: Mood.."
                    />

                    <svg
                      className="search-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
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
              </div>

              {/* RIGHT — ICONS */}
              <div className="col-6 col-lg-3">
                <div className="tg-menu-right-action d-flex align-items-center justify-content-end">

                  {/* MOBILE SEARCH ICON */}
                  <div
                    className="mobile-search-icon d-lg-none mr-15"
                    onClick={() => setShowSearchModal(true)}
                  >
                    🔍
                  </div>

                  {/* PHONE ICON */}
                  <span className="tg-header-contact-icon mr-10 d-none d-lg-block">
                    <PhoneIcon />
                  </span>

                  <span className="tg-header-contact-icon d-lg-none mr-15">
                    <PhoneIcon />
                  </span>

                  {/* LOGIN — DESKTOP */}
                  <div className="tg-header-btn ml-20 d-none d-lg-block">
                    <Link className="tg-btn-header mr-20" href="/login">
                      <UserIcon /> Login
                    </Link>
                  </div>

                  {/* LOGIN — MOBILE ICON */}
                  <div className="mobile-login-icon d-lg-none">
                    <UserIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ==========================
          MOBILE SEARCH MODAL
      =========================== */}
      {showSearchModal && (
        <div className="search-modal">
          <div
            className="search-modal-backdrop"
            onClick={() => setShowSearchModal(false)}
          />

          <div className="search-modal-box">
            <input
              type="text"
              className="mood-input"
              placeholder="enter: Mood.."
              autoFocus
            />

            <button
              className="close-modal"
              onClick={() => setShowSearchModal(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* ==========================
          CSS BELOW
      =========================== */}
      <style jsx>{`
        /* Desktop search bar */
        .mood-search-wrapper {
         position: relative;
    width: 407px;
    height: 34px;
    padding: 0 0 0 115px;
        }

        .mood-input {
          width: 100%;
    height: 60%;
    padding: 13px 55px 16px 24px;
    -webkit-border-radius: 999px;
    -moz-border-radius: 999px;
    border-radius: 999px;
    border: 2px solid rgba(255, 255, 255, .6);
    background: rgba(255, 255, 255, .15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    outline: none;
    color: #fff;
    font-size: 16px;
        }

        

        .search-icon {
          position: absolute;
          right: 22px;
          top: 50%;
          transform: translateY(-50%);
        }

        /* Sticky header overrides */
        .header-sticky .mood-input {
          border: 2px solid #0a6a67;
          background: rgba(10, 106, 103, 0.05);
          color: black;
        }

        .header-sticky .mood-input::placeholder {
          color: black;
        }

        /* Mobile icons */
        .mobile-search-icon,
        .mobile-login-icon {
          font-size: 24px;
          cursor: pointer;
        }

        /* ==========================
            MOBILE MODAL
        =========================== */
        @media (max-width: 991px) {
          .mood-search-wrapper {
            display: none;
          }

          .search-modal {
            position: fixed;
            inset: 0;
            z-index: 9999;
          }

          .search-modal-backdrop {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.55);
          }

          .search-modal-box {
            position: absolute;
            left: 50%;
            top: 30%;
            transform: translate(-50%, -50%);
            width: 92%;
            background: white;
            border-radius: 18px;
            padding: 14px 16px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .search-modal-box .mood-input {
            flex: 1;
            padding: 12px 14px;
            border-radius: 999px;
            border: 2px solid #0a6a67;
            color: black;
            background: white;
            font-size: 16px;
          }

          .search-modal-box .mood-input::placeholder {
            color: #666;
          }

          .close-modal {
            background: transparent;
            border: none;
            font-size: 22px;
            cursor: pointer;
          }
        }
      `}</style>
    </>
  );
};

export default HeaderOne;
