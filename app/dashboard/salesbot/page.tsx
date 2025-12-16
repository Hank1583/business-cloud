"use client";

import { useState } from "react";

export default function SalesBotPage() {
  const leads = [
    {
      id: 1,
      name: "王小明",
      company: "星河科技",
      stage: "提案後跟進",
      score: 92,
      lastContact: "2 天前",
      note: "對 AI 客服 + CRM 很有興趣，詢問報價中。",
    },
    {
      id: 2,
      name: "林美麗",
      company: "綠能股份",
      stage: "初次洽談",
      score: 78,
      lastContact: "5 天前",
      note: "想先從 GA + 廣告整合開始導入。",
    },
    {
      id: 3,
      name: "張大同",
      company: "大同電商",
      stage: "Demo 已完成",
      score: 85,
      lastContact: "1 天前",
      note: "Demo 反應不錯，但還在內部討論中。",
    },
  ];

  const [activeLead, setActiveLead] = useState(leads[0]);
  const [chatInput, setChatInput] = useState("");

  const aiSummary = `
目前建議優先追蹤：
1. 王小明（星河科技）：分數最高，已了解產品，建議 24 小時內再次跟進。
2. 張大同（大同電商）：Demo 已完成，可詢問導入時程與決策流程。
`;

  const emailTemplate = `
主旨：關於上次商務雲 BusinessCloud Demo 的後續規劃

您好，

感謝您上次撥空參與我們的系統介紹。根據我們的了解，貴公司目前最需要的部分包括：
- GA 與廣告數據整合
- 客服中心與 CRM 的一體化管理
- 未來導入 AI 自動化分析

如果方便的話，我們可以協助您：
1. 規劃一個 3 個月的導入試行方案
2. 針對內部決策流程準備簡報與文件

您看本週是否有合適的時間，我們可以安排下一次線上會議？

祝順心
BusinessCloud 團隊
`;

  const lineTemplate = `
嗨，我是 BusinessCloud 的專案顧問～

上次提到的 GA + 廣告 + CRM 整合方案，
我們可以幫您先做一個「試用版本」，
讓實際數據跑 2–4 週，您也比較好向內部說明 😊

如果方便的話，您看這週哪一天適合再聊一下？
`;

  const callScript = `
開場白（電話）：

「您好，我是 BusinessCloud 的 XXX，
上次我們有聊到 GA 和廣告整合的需求，
想確認一下，您目前內部討論的方向大概到哪個階段？」

接著可以問：
1. 決策會牽涉哪些部門？（行銷 / IT / 財務）
2. 目前預算區間大概在哪裡？
3. 若導入順利，理想上線時間點是？
`;

  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">業務 AI Bot</h1>
        <p className="text-gray-500 mt-2">
          協助業務進行名單優先順序、追蹤建議與話術 / 文案產生。
        </p>
      </div>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">今日需跟進名單</p>
          <p className="text-3xl font-bold">8</p>
        </div>
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">AI 建議優先名單</p>
          <p className="text-3xl font-bold text-blue-600">3</p>
        </div>
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">進行中自動跟進流程</p>
          <p className="text-3xl font-bold text-green-600">5</p>
        </div>
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">本週預估成交</p>
          <p className="text-3xl font-bold text-purple-600">2</p>
        </div>
      </section>

      {/* Main Panel：左 Leads + 右 AI 助理 */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead List */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 text-lg mb-4">名單列表</h2>

          <div className="space-y-3 text-sm">
            {leads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setActiveLead(lead)}
                className={`border rounded-xl p-3 cursor-pointer hover:bg-blue-50 ${
                  activeLead?.id === lead.id ? "bg-blue-50 border-blue-300" : ""
                }`}
              >
                <p className="font-semibold text-gray-800">{lead.name}</p>
                <p className="text-xs text-gray-500">{lead.company}</p>
                <p className="text-xs text-gray-500 mt-1">
                  階段：{lead.stage}・最近聯絡：{lead.lastContact}
                </p>
                <p className="text-xs mt-1 text-blue-600">
                  AI 分數：{lead.score}/100
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Bot Panel */}
        <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 text-lg mb-4">
            業務 AI 助理
          </h2>

          {activeLead && (
            <div className="mb-4 text-sm text-gray-700">
              <p className="font-semibold text-gray-900">
                目前名單：{activeLead.name}（{activeLead.company}）
              </p>
              <p className="text-gray-500 mt-1">{activeLead.note}</p>
            </div>
          )}

          {/* Chat 模擬區 */}
          <div className="border rounded-xl p-4 h-64 flex flex-col mb-4 bg-gray-50">
            <div className="flex-1 overflow-y-auto space-y-3 text-sm">
              <div className="max-w-xs bg-gray-200 rounded-xl px-3 py-2">
                業務：  
                「幫我看一下這個客戶下一步要怎麼跟進比較好？」
              </div>
              <div className="max-w-xs bg-blue-600 text-white rounded-xl px-3 py-2 self-end">
                AI Bot：  
                建議先確認對方內部決策時程，並提供一個「小範圍試行方案」，
                讓他們更容易做決定。
              </div>
              <div className="max-w-xs bg-blue-600 text-white rounded-xl px-3 py-2 self-end">
                AI Bot：  
                你可以詢問：「如果由我們這邊先協助設定一個 1–2 個月的試跑方案，
                是否有助於您內部評估？」
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="輸入想問 AI 助理的問題（目前假 UI）"
                className="flex-1 px-3 py-2 rounded-xl border text-sm bg-white"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-xl">
                發送
              </button>
            </div>
          </div>

          {/* AI 建議摘要 */}
          <div className="bg-gray-50 border rounded-xl p-4 text-sm text-gray-800">
            <p className="font-semibold mb-2">AI 名單優先順序建議</p>
            <pre className="whitespace-pre-wrap">{aiSummary}</pre>
          </div>
        </div>
      </section>

      {/* 下方：文案範本區 */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email 模板 */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 text-lg mb-3">
            Email 跟進範本
          </h2>
          <pre className="whitespace-pre-wrap text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border">
{emailTemplate}
          </pre>
        </div>

        {/* LINE 模板 */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 text-lg mb-3">
            LINE 訊息範本
          </h2>
          <pre className="whitespace-pre-wrap text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border">
{lineTemplate}
          </pre>
        </div>

        {/* 電話話術 */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 text-lg mb-3">
            電話開場話術
          </h2>
          <pre className="whitespace-pre-wrap text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border">
{callScript}
          </pre>
        </div>
      </section>
    </div>
  );
}
