// components/ga-pageview.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GAPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("config", "G-H2NX6QY2EX", {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
