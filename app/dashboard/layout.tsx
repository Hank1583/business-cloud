import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const menu = [
  { label: "總覽 Overview", path: "/dashboard" },
  { label: "GA 數據系統", path: "/dashboard/ga" },
  { label: "SEO AI", path: "/dashboard/seo" },
  { label: "客服中心", path: "/dashboard/support" },
  { label: "CRM", path: "/dashboard/crm" },
  { label: "廣告投放", path: "/dashboard/ads" },
  { label: "業務 AI 助理", path: "/dashboard/salesbot" },
  { label: "系統設定", path: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar（固定） */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 px-4 py-6 overflow-y-auto">

        {/* LOGO 區塊 */}
        <Link href="/dashboard" className="flex items-center gap-3 mb-6">
          <Image
            src="/logo-hl.png"
            alt="BusinessCloud Logo"
            width={50}
            height={50}
            className="bg-transparent"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-gray-900">BusinessCloud</span>
            <span className="text-xs text-gray-500">後台管理系統</span>
          </div>
        </Link>

        {/* Menu */}
        <nav className="flex flex-col gap-2 text-sm">
          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content（讓出 Sidebar 寬度） */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
