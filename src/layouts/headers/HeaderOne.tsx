"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import UseSticky from "@/hooks/UseSticky";
import PhoneIcon from "@/svg/PhoneIcon";
import UserIcon from "@/svg/UserIcon";
import Whatsapp from "@/svg/Whatsapp";

import logo_1 from "@/assets/img/logo/GrabThatTrip_White.svg";
import logo_2 from "@/assets/img/logo/GrabThatTrip_Colour.svg";

const HeaderOne = () => {
  const { sticky } = UseSticky();

  // mobile search modal toggle
  const [showSearchModal, setShowSearchModal] = useState(false);

  // search text value
  const [searchText, setSearchText] = useState("");

  // when search icon clicked
  const handleSearch = () => {
    if (!searchText.trim()) return;

    alert("NO Data Found");

    console.log("Searching for:", searchText);

    // Example redirect (optional)
    // router.push(`/search?query=${searchText}`);

    setShowSearchModal(false);
  };

  /* =======================
   TYPES
======================= */
  type KeywordItem = {
    id: number;
    keywords: string;
    is_active: boolean;
  };

  /* =======================
     STATES
  ======================= */
  const [suggestions, setSuggestions] = useState<KeywordItem[]>([]);
  const [loading, setLoading] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  /* =======================
     API CALL
  ======================= */
  const fetchKeywords = async (value: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://gtt.dbbworldwide.com/Home/GetKeyWord?keyword=${value}`
      );
      const json = await res.json();

      if (json.status === "True") {
        setSuggestions(json.data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Keyword fetch error:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     INPUT CHANGE HANDLER
  ======================= */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // ❌ No API call before 3 letters
    if (value.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    // ✅ API call per letter after 3 letters
    debounceRef.current = setTimeout(() => {
      fetchKeywords(value);
    }, 300);
  };

  /* =======================
     SELECT SUGGESTION
  ======================= */
  const handleSelect = (keyword: string) => {
    setSearchText(keyword);
    setSuggestions([]);
    setShowSearchModal(false);

    // Example redirect
    // router.push(`/search?query=${keyword}`);
  };

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
                    <Image
                      className="mobile-view-logo-ms"
                      src={logo_1}
                      alt="Logo"
                      width={90}
                      height={77}
                    />
                  </Link>
                  <Link className="logo-2 d-none" href="/">
                    <Image
                      className="mobile-view-logo-ms"
                      src={logo_2}
                      alt="Logo"
                      width={90}
                      height={77}
                    />
                  </Link>
                </div>
              </div>

              {/* DESKTOP SEARCH */}
              <div className="col-lg-6 d-none d-lg-block">
                <div className="mood-search-wrapper">
                  <input
                    type="search"
                    className="mood-input"
                    placeholder="enter: Mood.."
                    value={searchText}
                    onChange={handleInputChange}
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

                  {/* DROPDOWN */}
                  {suggestions.length > 0 && (
                    <ul className="search-suggestions">
                      {suggestions.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => handleSelect(item.keywords)}
                        >
                          {item.keywords}
                        </li>
                      ))}
                    </ul>
                  )}

                  {loading && (
                    <div className="search-loading">Searching...</div>
                  )}
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
                    <i className="fas fa-search "></i>
                  </div>

                  {/* PHONE ICON */}
                  <Link className="d-flex" href="tel:+918929919292 ">
                    <span className="tg-header-contact-icon mr-10 d-none d-lg-block MS-phone-icon">
                      <PhoneIcon />
                    </span>
                  </Link>

                  <Link className="d-flex" href="tel:+918929919292">
                    <span className="tg-header-contact-icon d-lg-none mr-15 ">
                      <PhoneIcon />
                    </span>
                  </Link>

                  <Link
                    className="d-flex"
                    href="https://wa.me/918929919292"
                    target="_blank"
                    rel="noopener noreferrer"
              
                  >
                    <span className="tg-header-contact-icon mr-10 d-none d-lg-block MS-phone-icon">
                      <Whatsapp />
                    </span>
                  </Link>

                  <Link
                    href="https://wa.me/918929919292"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex"
                  >
                    <span className="tg-header-contact-icon d-lg-none mr-15">
                      <Whatsapp />
                    </span>
                  </Link>

                  {/* LOGIN — DESKTOP */}
                  {/* <div className="tg-header-btn ml-20 d-none d-lg-block">
                    <Link className="tg-btn-header mr-20" href="/#">

                      <UserIcon /> Login
                    </Link>
                  </div> */}

                  {/* LOGIN — MOBILE ICON */}
                  {/* <div className="mobile-login-icon d-lg-none">
                   
                    <UserIcon />
                  </div> */}
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
              value={searchText}
              onChange={handleInputChange}
              autoFocus
            />

            <i
              className="fas fa-search"
              style={{
                position: "absolute",
                top: "32px",
                right: "58px",
                cursor: "pointer",
              }}
              onClick={handleSearch}
            />

            {suggestions.length > 0 && (
              <ul className="search-suggestions">
                {suggestions.map((item) => (
                  <li key={item.id} onClick={() => handleSelect(item.keywords)}>
                    {item.keywords}
                  </li>
                ))}
              </ul>
            )}

            <button
              className="close-modal"
              onClick={() => setShowSearchModal(false)}
            ></button>
          </div>
        </div>
      )}

      {/* ==========================
          CSS BELOW
      =========================== */}
      <style jsx>{`
        .search-suggestions {
          position: absolute;
          top: 48px;
          width: 100%;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          z-index: 999;
        }

        .search-suggestions li {
          padding: 10px 16px;
          cursor: pointer;
          color: #333;
        }

        .search-suggestions li:hover {
          background: #f2f2f2;
        }

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
          border: 2px solid rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.15);
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
          background: rgba(255, 255, 255, 0.19);
          border-radius: 50px;
          color: white;
          padding: 6px 11px;
          font-size: 24px;
          cursor: pointer;
        }
        .MS-phone-icon {
          background: rgba(255, 255, 255, 0.19);
          color: white;
          border: 1px solid white;
        }

        .header-sticky .MS-phone-icon {
          border: 2px solid #0a6a67;
          background: rgba(10, 106, 103, 0.05);
          color: black;
        }
        /* ==========================
            MOBILE MODAL
        =========================== */
        @media (max-width: 991px) {
          .tg-header-tu-menu .tg-header-contact-icon {
            background: rgba(255, 255, 255, 0.19);
            color: white;
          }
          .header-sticky .tg-header-tu-menu {
            color: black;
            border: 1px solid #0a6a67;
          }
          .header-sticky .tg-header-contact-icon {
            color: black;
            border: 1px solid #0a6a67;
          }
          .mobile-search-icon {
            font-size: 17px;
            color: white;
          }
          .header-sticky .mobile-search-icon {
            color: black;
            border: 1px solid #0a6a67;
          }
          .mobile-view-logo-ms {
            width: 50px !important;
            height: auto !important;
          }

          .header-sticky .mobile-login-icon {
            color: black;
            border: 1px solid #0a6a67;
          }
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
            background: rgba(255, 255, 255, 0.19);
            border-radius: 18px;
            padding: 14px 16px;
            display: flex;
            align-items: center;
            gap: 0px;
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
