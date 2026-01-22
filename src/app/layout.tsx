import "../styles/index.css";
import "../../public/assets/scss/main.scss";
import Script from "next/script";
import Providers from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Grab That Trip - Tour & Travel Booking",
    template: "%s",
  },
  description: "Grab That Trip is a Modern Tour & Travel Booking Platform",
  keywords: ["travel booking", "tour packages", "Grab That Trip"],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  verification: {
    google: "nyhlmGhnEPLi551_V46J-0PTtEey2XTL6fs9QXH6W14",
  },

  openGraph: {
    type: "website",
    siteName: "Grab That Trip",
  },

  icons: {
    icon: "/GrabThatTrip_Colour.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 🔹 Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2PVSFQMRLR"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2PVSFQMRLR');
          `}
        </Script>

        {/* 🔹 Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NGC3CW2J');
          `}
        </Script>

        {/* 🔹 GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NGC3CW2J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
