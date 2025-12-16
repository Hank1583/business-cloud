import "./globals.css";
import { ReactNode } from "react";

export const dynamic = 'force-static';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
