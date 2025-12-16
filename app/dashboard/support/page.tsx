"use client";

import { useState } from "react";

export default function SupportPage() {

    type TicketMessage = {
    from: string;
    text: string;
    time: string;
  };

  type Ticket = {
    id: number;
    title: string;
    status: string;
    customer: string;
    time: string;
    messages: TicketMessage[];
  };

  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);

  const tickets = [
    {
      id: 1,
      title: "無法登入帳號",
      status: "open",
      customer: "王小明",
      time: "10 分鐘前",
      messages: [
        { from: "customer", text: "你好，我無法登入帳號", time: "10:21" },
        { from: "agent", text: "您好，請問出現什麼訊息呢？", time: "10:22" },
      ],
    },
    {
      id: 2,
      title: "發票資訊想修改",
      status: "pending",
      customer: "林小姐",
      time: "30 分鐘前",
      messages: [
        { from: "customer", text: "想修改一下發票資訊", time: "09:50" },
        { from: "agent", text: "好的，請提供統編與抬頭", time: "09:51" },
      ],
    },
    {
      id: 3,
      title: "收不到 Email 驗證信",
      status: "open",
      customer: "張先生",
      time: "1 小時前",
      messages: [
        { from: "customer", text: "我收不到驗證信", time: "09:10" },
      ],
    },
  ];

  const aiSuggestion = `
1. 針對「無法登入」類型問題，可以快速提供「重設密碼」按鈕。
2. 發票修改類型可自動傳送表單連結，降低人工處理時間。
3. 驗證 Email 類型，可加入「檢查垃圾信件」自動回覆建議。
`;

  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">客服中心</h1>
        <p className="text-gray-500 mt-2">
          客戶對話、工單管理、AI 智能摘要。
        </p>
      </div>

      {/* Summary cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <p className="text-sm text-gray-500">今日新工單</p>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>

        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <p className="text-sm text-gray-500">待處理</p>
          <p className="text-3xl font-bold mt-2 text-orange-500">7</p>
        </div>

        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <p className="text-sm text-gray-500">AI 自動回覆比例</p>
          <p className="text-3xl font-bold mt-2 text-blue-600">63%</p>
        </div>
      </section>

      {/* Main Panel: Ticket List + Chat */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ticket List */}
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <h2 className="font-semibold text-gray-800 text-lg mb-4">工單列表</h2>

          <div className="space-y-3 text-sm">
            {tickets.map((t) => (
              <div
                key={t.id}
                onClick={() => setActiveTicket(t)}
                className="p-3 border rounded-xl hover:bg-blue-50 cursor-pointer"
              >
                <p className="font-semibold text-gray-800">{t.title}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {t.customer}・{t.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm p-4">
          <h2 className="font-semibold text-gray-800 text-lg mb-4">
            對話視窗
          </h2>

          {!activeTicket && (
            <div className="text-gray-400 text-center py-20">
              請選擇左側工單
            </div>
          )}

          {activeTicket && (
            <div className="flex flex-col h-[420px]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {activeTicket.messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
                      m.from === "customer"
                        ? "bg-gray-200 self-start"
                        : "bg-blue-600 text-white self-end"
                    }`}
                  >
                    {m.text}
                    <div className="text-[10px] opacity-70 mt-1">{m.time}</div>
                  </div>
                ))}
              </div>

              {/* Input box */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="輸入訊息..."
                  className="flex-1 border rounded-xl px-4 py-2 text-sm bg-gray-50"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm">
                  送出
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* AI Suggestion */}
      <section className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 text-lg mb-3">
          AI 智能建議（假資料）
        </h2>
        <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border">
{aiSuggestion}
        </pre>
      </section>
    </div>
  );
}
