// app/layout.tsx
import "./globals.css";
import Script from "next/script";
import GAPageView from "./components/ga-pageview";

export const dynamic = "force-static";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H2NX6QY2EX"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H2NX6QY2EX');
          `}
        </Script>
      </head>
      <body>
        {/* SPA 換頁追蹤 */}
        <GAPageView />
        {children}
      </body>
    </html>
  );
}
