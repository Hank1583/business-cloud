export default function SeoPage() {
  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SEO AI</h1>
        <p className="text-gray-500 mt-2">
          網站健康度、關鍵字排名、結構化資料，以及 AI 自動內容建議。
        </p>
      </div>

      {/* SEO Health Score */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-800 text-lg mb-4">
          網站健康度（Website Health Score）
        </h2>

        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-full border-8 border-green-500 flex items-center justify-center">
            <span className="text-3xl font-bold text-green-600">82</span>
          </div>

          <div className="text-gray-600 text-sm">
            <p>● 良好：網站整體結構與速度表現正常。</p>
            <p>● 建議修復 4 個技術問題，內容部分可再優化。</p>
          </div>
        </div>
      </section>

      {/* Keyword Ranking */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-800 text-lg mb-4">
          主要關鍵字排名（Top Keywords）
        </h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">關鍵字</th>
              <th className="py-2">目前排名</th>
              <th className="py-2">上週</th>
              <th className="py-2">流量貢獻</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {[
              { kw: "AI 系統整合", rank: 4, last: 6, flow: "38%" },
              { kw: "企業雲平台", rank: 12, last: 10, flow: "21%" },
              { kw: "SEO 優化工具", rank: 22, last: 24, flow: "11%" },
              { kw: "自動化行銷", rank: 9, last: 12, flow: "18%" },
            ].map((k, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-2">{k.kw}</td>
                <td className="py-2 font-semibold">{k.rank}</td>
                <td className="py-2 text-gray-500">{k.last}</td>
                <td className="py-2">{k.flow}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Traffic Trend */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800 text-lg">
            搜尋流量趨勢（7 天）
          </h2>
          <span className="text-xs text-gray-400">假資料 | 折線圖 Placeholder</span>
        </div>

        <div className="h-48 bg-gradient-to-r from-green-50 to-green-100 rounded-lg relative overflow-hidden">
          <svg className="w-full h-full stroke-green-600 stroke-2 fill-none">
            <polyline
              points="0,120 80,110 160,125 240,90 320,80 400,60 480,95 560,70 640,90"
            />
          </svg>
        </div>
      </section>

      {/* AI Content Suggestions */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-800 text-lg mb-4">
          AI 內容建議（Content Optimization）
        </h2>

        <div className="space-y-4 text-sm">
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">建議 1：提升主題權威性</p>
            <p className="text-gray-600">
              建議發布 2–3 篇內容包含「AI 系統整合」的專題文章，可提升主題集群排名。
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">
              建議 2：優化 Meta Description
            </p>
            <p className="text-gray-600">
              描述中缺少核心關鍵字，可以加入「企業雲平台」以提升點擊率（CTR）。
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">建議 3：改善頁面速度</p>
            <p className="text-gray-600">
              有 2 個頁面載入超過 3 秒，建議壓縮圖片或延遲加載（lazyload）。
            </p>
          </div>
        </div>
      </section>

      {/* Technical Issues */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-800 text-lg mb-4">技術問題（Technical Issues）</h2>

        <ul className="text-sm space-y-3 text-gray-700">
          <li>⚠ 2 個頁面缺少 H1 標題</li>
          <li>⚠ 發現 3 個重複的 Meta Title</li>
          <li>⚠ 1 個頁面缺少 canonical URL</li>
          <li>⚠ 產品頁 sitemap 未更新至最新版本</li>
        </ul>
      </section>
    </div>
  );
}
