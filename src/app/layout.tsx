import "../styles/index.css";
import "../../public/assets/scss/main.scss";
import Script from "next/script";
import Providers from "./providers";

export const metadata = {
  title: "Grab That Trip - Tour & Travel Booking",
  description: "Grab That Trip is a Modern Tour & Travel Booking Platform",
  keywords: ["travel booking", "tour packages", "Grab That Trip"],
  verification: {
    google: "nyhlmGhnEPLi551_V46J-0PTtEey2XTL6fs9QXH6W14",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta property="og:type" content="website"></meta>

        {/* <!-- Google tag (gtag.js) --> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2PVSFQMRLR"
        ></script>
        <script>
          {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-2PVSFQMRLR');`}
        </script>
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

        <meta
          name="google-site-verification"
          content="nyhlmGhnEPLi551_V46J-0PTtEey2XTL6fs9QXH6W14"
        />

        <link rel="icon" href="/GrabThatTrip_Colour.jpg" sizes="any" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100..900&family=Outfit:wght@100..900&display=swap"
        />
      </head>

      <body>
        {/* 🔹 GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NGC3CW2J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* ✅ Client Providers */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
