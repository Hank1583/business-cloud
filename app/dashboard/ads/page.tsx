"use client";

export default function AdsPage() {
  const platforms = [
    { name: "Facebook Ads", roas: 3.2, spend: "$12,400", ctr: "2.8%" },
    { name: "Google 搜尋廣告", roas: 4.8, spend: "$18,900", ctr: "3.1%" },
    { name: "Google 展示廣告", roas: 1.7, spend: "$6,200", ctr: "0.9%" },
    { name: "LINE 官方帳號", roas: 2.3, spend: "$3,500", ctr: "4.2%" },
  ];

  const aiSuggestion = `
1. 建議提高「Google 搜尋」預算，該渠道 ROAS 高達 4.8，屬於高效能關鍵字。
2. Facebook 廣告 CTR 偏低，可嘗試更換圖片素材或標題風格。
3. 展示廣告 ROAS 1.7 偏弱，建議加入受眾排除規則以減少浪費。
4. LINE CTR 達 4.2%，建議搭配 CRM 進行再行銷訊息推播。
`;

  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">廣告投放中心</h1>
        <p className="text-gray-500 mt-2">
          整合 Facebook、Google、LINE 的跨平台廣告績效資料。
        </p>
      </div>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">本月花費</p>
          <p className="text-3xl font-bold">$41,000</p>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">平均 ROAS</p>
          <p className="text-3xl font-bold text-blue-600">3.1</p>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">總轉換次數</p>
          <p className="text-3xl font-bold text-green-600">846</p>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">最佳平台</p>
          <p className="text-3xl font-bold text-purple-600">Google 搜尋</p>
        </div>
      </section>

      {/* Platform Comparison */}
      <section className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-800 text-lg mb-4">平台比較</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">平台</th>
              <th className="py-2">ROAS</th>
              <th className="py-2">花費</th>
              <th className="py-2">CTR</th>
            </tr>
          </thead>

          <tbody>
            {platforms.map((p, i) => (
              <tr key={i} className="border-b">
                <td className="py-2 font-semibold">{p.name}</td>
                <td
                  className={`py-2 font-bold ${
                    p.roas >= 3 ? "text-green-600" : "text-orange-600"
                  }`}
                >
                  {p.roas}
                </td>
                <td className="py-2">{p.spend}</td>
                <td className="py-2">{p.ctr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Ad Trend Chart */}
      <section className="bg-white border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800 text-lg">投放趨勢（30 天）</h2>
          <span className="text-xs text-gray-400">假資料 | 折線圖 Placeholder</span>
        </div>

        <div className="h-48 bg-gradient-to-r from-purple-50 to-blue-100 rounded-lg relative overflow-hidden">
          <svg className="w-full h-full stroke-purple-600 stroke-2 fill-none">
            <polyline
              points="0,125 80,110 160,140 240,85 320,95 400,70 480,100 560,60 640,80"
            />
          </svg>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          未來可接 Meta / Google Ads API 取得實際趨勢。
        </p>
      </section>

      {/* Best Performing Ads */}
      <section className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-800 text-lg mb-4">廣告素材（假資料）</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["素材 A（圖片）", "素材 B（影片）", "素材 C（輪播）"].map((item, i) => (
            <div key={i} className="border rounded-xl p-4 bg-gray-50">
              <p className="font-semibold text-gray-800">{item}</p>
              <p className="text-sm text-gray-500 mt-1">CTR：{(Math.random() * 4 + 1).toFixed(1)}%</p>
              <p className="text-sm text-gray-500">ROAS：{(Math.random() * 3 + 1).toFixed(1)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Audience Insights */}
      <section className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-800 text-lg mb-4">受眾洞察（假資料）</h2>

        <ul className="space-y-2 text-sm text-gray-700">
          <li>✔ 25–34 歲轉換率最高（Google 搜尋）</li>
          <li>✔ 女性 60% 點擊率較高（Facebook Ads）</li>
          <li>✔ LINE 粉絲較偏向既有客戶（再行銷效果好）</li>
        </ul>
      </section>

      {/* AI Suggestion */}
      <section className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-800 text-lg mb-3">AI 優化建議</h2>
        <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border">
{aiSuggestion}
        </pre>
      </section>
    </div>
  );
}
