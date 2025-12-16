

export default async function DashboardHome() {
  // console.log("DashboardHome:");
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;
  // console.log("token:"+token);
  // if (!token) {
  //   redirect("/auth/login");
  // }

  // const user = verifyToken(token);

  // if (!user) {
  //   redirect("/auth/login");
  // }
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">總覽 Dashboard</h1>
        <p className="text-gray-500 mt-2">
          商務雲各模組的整體狀態總覽與關鍵指標。
        </p>
      </div>

      {/* Top Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <p className="text-sm text-gray-500">本週造訪數</p>
          <p className="text-2xl font-bold mt-2">12,430</p>
          <p className="text-xs text-green-600 mt-1">▲ 比上週 +18%</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <p className="text-sm text-gray-500">CRM 新增潛在客戶</p>
          <p className="text-2xl font-bold mt-2">87</p>
          <p className="text-xs text-green-600 mt-1">▲ 本月 +32</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <p className="text-sm text-gray-500">AI 自動回覆比例</p>
          <p className="text-2xl font-bold mt-2">73%</p>
          <p className="text-xs text-blue-600 mt-1">AI 協助降低客服負擔</p>
        </div>
      </section>

      {/* Middle Section: GA & Ads */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GA 假圖表區 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 text-lg">
              GA 流量趨勢（假資料）
            </h2>
            <span className="text-xs text-gray-400">最近 7 天</span>
          </div>

          {/* 假圖表 placeholder */}
          <div className="h-40 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-end gap-2 px-3 pb-3">
            {["20%", "40%", "60%", "30%", "80%", "50%", "70%"].map((h, idx) => (
              <div
                key={idx}
                className="flex-1 bg-blue-400/70 rounded-t-md"
                style={{ height: h }}
              />
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-3">
            模擬圖表：之後可以接 GA4 / 自建分析 API。
          </p>
        </div>

        {/* 廣告表現 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 text-lg">
              廣告投放表現（假資料）
            </h2>
            <span className="text-xs text-gray-400">本月累積</span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Facebook Ads</span>
              <span className="font-semibold text-gray-800">ROAS 3.2</span>
            </div>
            <div className="flex justify-between">
              <span>Google 搜尋廣告</span>
              <span className="font-semibold text-gray-800">ROAS 4.8</span>
            </div>
            <div className="flex justify-between">
              <span>LINE 官方帳號推播</span>
              <span className="font-semibold text-gray-800">CTR 5.4%</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            之後可整合實際廣告平台 API（Meta / Google / LINE）。
          </p>
        </div>
      </section>

      {/* Bottom: 任務 & 系統狀態 */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 系統任務列表 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-800 text-lg mb-3">
            今日任務摘要（假資料）
          </h2>
          <ul className="space-y-2 text-sm">
            <li>• 審核 5 筆新建立的 CRM 潛在客戶</li>
            <li>• 檢查 SEO AI 給出的 3 項內容優化建議</li>
            <li>• 確認廣告投放預算是否達到上限</li>
            <li>• 回覆 2 則重要客訴（客服中心）</li>
          </ul>
        </div>

        {/* 系統狀態 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-800 text-lg mb-3">
            系統狀態 Status
          </h2>
          <ul className="space-y-2 text-sm">
            <li>✅ GA 事件收集正常</li>
            <li>✅ SEO AI 模組執行正常</li>
            <li>✅ 客服中心連線正常</li>
            <li>✅ CRM 資料庫連線正常</li>
            <li>✅ 廣告 API 更新正常</li>
            <li>🕒 業務 AI Bot 排程中（00:30 每日彙總）</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
