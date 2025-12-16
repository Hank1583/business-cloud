"use client";

import { useState } from "react";

export default function CrmPage() {
  type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  tags: string[];
  stage: string;
  lastContact: string;
  notes: string[];
};
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const customers = [
    {
      id: 1,
      name: "王小明",
      email: "ming@example.com",
      phone: "0912-345-678",
      tags: ["VIP", "高潛力"],
      stage: "談判中",
      lastContact: "2 天前",
      notes: [
        "對 AI 系統整合感興趣",
        "上次詢問報價方案",
        "可能預算 20–30k/月",
      ],
    },
    {
      id: 2,
      name: "林美麗",
      email: "meili@example.com",
      phone: "0922-888-111",
      tags: ["追蹤中"],
      stage: "初次接觸",
      lastContact: "5 天前",
      notes: ["詢問 GA 分析服務", "需求較模糊，需再次釐清"],
    },
    {
      id: 3,
      name: "張大同",
      email: "dtd@example.com",
      phone: "0955-555-222",
      tags: ["已成交"],
      stage: "成交",
      lastContact: "1 週前",
      notes: ["完成 6 個月方案", "滿意度高"],
    },
  ];

  const aiInsight = `
1. VIP 客戶「王小明」有高度成交機率，建議在 48 小時內再次接觸。
2. 「林美麗」需求未明確，建議安排行銷內容引導。
3. 已成交客戶可推送「升級方案」，提高 LTV（終身價值）。
`;

  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">CRM 客戶管理</h1>
        <p className="text-gray-500 mt-2">
          客戶資料、標籤、漏斗、互動紀錄與 AI 洞察。
        </p>
      </div>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">總客戶數</p>
          <p className="text-3xl font-bold">312</p>
        </div>
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">本週新增</p>
          <p className="text-3xl font-bold text-blue-600">27</p>
        </div>
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">活躍客戶</p>
          <p className="text-3xl font-bold text-green-600">112</p>
        </div>
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">高潛力客戶</p>
          <p className="text-3xl font-bold text-orange-500">19</p>
        </div>
      </section>

      {/* CRM Main Panel */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Customer List */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 text-lg mb-4">客戶列表</h2>

          <div className="space-y-3">
            {customers.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCustomer(c)}
                className="border p-3 rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                <p className="font-semibold text-gray-800">{c.name}</p>
                <p className="text-xs text-gray-500 mt-1">{c.email}</p>

                <div className="flex gap-2 mt-2">
                  {c.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Detail */}
        <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 text-lg mb-4">客戶詳情</h2>

          {!selectedCustomer && (
            <div className="text-gray-400 text-center py-20">
              選擇左側客戶查看詳細資訊
            </div>
          )}

          {selectedCustomer && (
            <div className="space-y-6">
              <div>
                <p className="text-2xl font-bold">{selectedCustomer.name}</p>
                <p className="text-gray-500">{selectedCustomer.email}</p>
                <p className="text-gray-500">{selectedCustomer.phone}</p>

                <div className="flex gap-2 mt-2">
                  {selectedCustomer.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-green-100 text-green-700 px-2 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stage */}
              <div>
                <p className="text-sm text-gray-500">銷售階段</p>
                <p className="text-xl font-semibold text-blue-600">
                  {selectedCustomer.stage}
                </p>
              </div>

              {/* Notes */}
              <div>
                <p className="text-sm text-gray-500 mb-2">備註紀錄</p>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  {selectedCustomer.notes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* AI Insight */}
      <section className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 text-lg mb-3">AI 客戶洞察</h2>
        <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border">
{aiInsight}
        </pre>
      </section>

      {/* Funnel Visualization */}
      <section className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 text-lg mb-4">銷售漏斗（假資料）</h2>

        <div className="grid grid-cols-4 gap-4 text-center text-sm">
          <div>
            <p className="font-bold text-gray-800">初次接觸</p>
            <p className="text-blue-600 text-2xl">128</p>
          </div>
          <div>
            <p className="font-bold text-gray-800">進一步了解</p>
            <p className="text-blue-600 text-2xl">68</p>
          </div>
          <div>
            <p className="font-bold text-gray-800">談判中</p>
            <p className="text-blue-600 text-2xl">27</p>
          </div>
          <div>
            <p className="font-bold text-gray-800">成交</p>
            <p className="text-green-600 text-2xl">9</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-3">
          之後可改成 Recharts / Chart.js 實際漏斗圖。
        </p>
      </section>
    </div>
  );
}
