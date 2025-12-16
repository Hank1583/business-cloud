// app/dashboard/ga/fakeData.ts

export const gaConnections = [
  { id: 1, account_name: "Homepage" },
  { id: 2, account_name: "Blog" },
  { id: 3, account_name: "Shop" },
];

/** ga_daily_summary（用於 KPI + Trend） */
export const gaDailySummary = [
  // Homepage
  { connection_id: 1, date: "2025-12-01", sessions: 120, users: 80, new_users: 30, pageviews: 200, events: 90, avg_session_duration: 180, bounce_rate: 0.45 },
  { connection_id: 1, date: "2025-12-02", sessions: 140, users: 95, new_users: 40, pageviews: 230, events: 110, avg_session_duration: 195, bounce_rate: 0.42 },
  { connection_id: 1, date: "2025-12-03", sessions: 160, users: 110, new_users: 50, pageviews: 260, events: 130, avg_session_duration: 210, bounce_rate: 0.40 },
  { connection_id: 1, date: "2025-12-04", sessions: 190, users: 135, new_users: 65, pageviews: 310, events: 160, avg_session_duration: 225, bounce_rate: 0.38 },
  { connection_id: 1, date: "2025-12-05", sessions: 240, users: 160, new_users: 80, pageviews: 390, events: 220, avg_session_duration: 240, bounce_rate: 0.35 },
  { connection_id: 1, date: "2025-12-06", sessions: 200, users: 145, new_users: 60, pageviews: 340, events: 180, avg_session_duration: 230, bounce_rate: 0.36 },
  { connection_id: 1, date: "2025-12-07", sessions: 180, users: 130, new_users: 55, pageviews: 300, events: 150, avg_session_duration: 220, bounce_rate: 0.37 },

  // Blog（停留時間較長、跳出較低）
  { connection_id: 2, date: "2025-12-01", sessions: 90, users: 70, new_users: 45, pageviews: 150, events: 60, avg_session_duration: 260, bounce_rate: 0.34 },
  { connection_id: 2, date: "2025-12-02", sessions: 110, users: 85, new_users: 55, pageviews: 190, events: 80, avg_session_duration: 275, bounce_rate: 0.33 },
  { connection_id: 2, date: "2025-12-03", sessions: 130, users: 95, new_users: 60, pageviews: 220, events: 95, avg_session_duration: 290, bounce_rate: 0.32 },
  { connection_id: 2, date: "2025-12-04", sessions: 150, users: 105, new_users: 65, pageviews: 260, events: 110, avg_session_duration: 300, bounce_rate: 0.31 },
  { connection_id: 2, date: "2025-12-05", sessions: 140, users: 100, new_users: 60, pageviews: 240, events: 105, avg_session_duration: 295, bounce_rate: 0.31 },
  { connection_id: 2, date: "2025-12-06", sessions: 125, users: 92, new_users: 55, pageviews: 210, events: 90, avg_session_duration: 285, bounce_rate: 0.32 },
  { connection_id: 2, date: "2025-12-07", sessions: 115, users: 88, new_users: 52, pageviews: 205, events: 85, avg_session_duration: 280, bounce_rate: 0.33 },

  // Shop（轉換高、跳出略高）
  { connection_id: 3, date: "2025-12-01", sessions: 60, users: 40, new_users: 20, pageviews: 120, events: 70, avg_session_duration: 160, bounce_rate: 0.55 },
  { connection_id: 3, date: "2025-12-02", sessions: 70, users: 45, new_users: 22, pageviews: 140, events: 85, avg_session_duration: 165, bounce_rate: 0.53 },
  { connection_id: 3, date: "2025-12-03", sessions: 75, users: 48, new_users: 24, pageviews: 150, events: 92, avg_session_duration: 170, bounce_rate: 0.52 },
  { connection_id: 3, date: "2025-12-04", sessions: 85, users: 55, new_users: 28, pageviews: 170, events: 110, avg_session_duration: 175, bounce_rate: 0.50 },
  { connection_id: 3, date: "2025-12-05", sessions: 95, users: 62, new_users: 30, pageviews: 200, events: 135, avg_session_duration: 185, bounce_rate: 0.48 },
  { connection_id: 3, date: "2025-12-06", sessions: 90, users: 58, new_users: 28, pageviews: 185, events: 120, avg_session_duration: 180, bounce_rate: 0.49 },
  { connection_id: 3, date: "2025-12-07", sessions: 88, users: 56, new_users: 27, pageviews: 178, events: 115, avg_session_duration: 178, bounce_rate: 0.50 },
];

/** ga_pages（用於 Pages Compare） */
export const gaPages = [
  // Homepage
  { connection_id: 1, date: "2025-12-07", page_path: "/", page_title: "首頁", pageviews: 280, users: 150, avg_time: 120 },
  { connection_id: 1, date: "2025-12-07", page_path: "/pricing", page_title: "方案頁", pageviews: 95, users: 55, avg_time: 90 },
  { connection_id: 1, date: "2025-12-07", page_path: "/contact", page_title: "聯絡我們", pageviews: 60, users: 40, avg_time: 70 },
  { connection_id: 1, date: "2025-12-07", page_path: "/portfolio", page_title: "作品集", pageviews: 80, users: 50, avg_time: 110 },

  // Blog
  { connection_id: 2, date: "2025-12-07", page_path: "/", page_title: "首頁", pageviews: 110, users: 75, avg_time: 140 },
  { connection_id: 2, date: "2025-12-07", page_path: "/blog", page_title: "部落格列表", pageviews: 200, users: 130, avg_time: 260 },
  { connection_id: 2, date: "2025-12-07", page_path: "/blog/ga", page_title: "GA 分析教學", pageviews: 160, users: 105, avg_time: 320 },
  { connection_id: 2, date: "2025-12-07", page_path: "/pricing", page_title: "方案頁", pageviews: 40, users: 25, avg_time: 95 },

  // Shop
  { connection_id: 3, date: "2025-12-07", page_path: "/", page_title: "首頁", pageviews: 90, users: 55, avg_time: 85 },
  { connection_id: 3, date: "2025-12-07", page_path: "/pricing", page_title: "方案頁", pageviews: 140, users: 78, avg_time: 105 },
  { connection_id: 3, date: "2025-12-07", page_path: "/product/1", page_title: "商品頁 - A", pageviews: 170, users: 90, avg_time: 130 },
  { connection_id: 3, date: "2025-12-07", page_path: "/checkout", page_title: "結帳", pageviews: 65, users: 45, avg_time: 75 },
];

/** ga_traffic_sources（用於 Traffic 區塊） */
export const gaTrafficSources = [
  // Homepage
  { connection_id: 1, date: "2025-12-07", channel_group: "Organic Search", source: "google", medium: "organic", device: "Desktop", sessions: 120, users: 85, w_users: 30, conversions: 6 },
  { connection_id: 1, date: "2025-12-07", channel_group: "Direct", source: "(direct)", medium: "(none)", device: "Mobile", sessions: 80, users: 60, w_users: 18, conversions: 4 },
  { connection_id: 1, date: "2025-12-07", channel_group: "Paid Search", source: "google", medium: "cpc", device: "Mobile", sessions: 60, users: 45, w_users: 10, conversions: 5 },

  // Blog
  { connection_id: 2, date: "2025-12-07", channel_group: "Organic Search", source: "google", medium: "organic", device: "Desktop", sessions: 140, users: 105, w_users: 40, conversions: 2 },
  { connection_id: 2, date: "2025-12-07", channel_group: "Referral", source: "facebook.com", medium: "referral", device: "Mobile", sessions: 70, users: 52, w_users: 20, conversions: 1 },
  { connection_id: 2, date: "2025-12-07", channel_group: "Direct", source: "(direct)", medium: "(none)", device: "Desktop", sessions: 50, users: 40, w_users: 15, conversions: 1 },

  // Shop（Paid 轉換更高）
  { connection_id: 3, date: "2025-12-07", channel_group: "Paid Search", source: "google", medium: "cpc", device: "Mobile", sessions: 110, users: 75, w_users: 25, conversions: 14 },
  { connection_id: 3, date: "2025-12-07", channel_group: "Direct", source: "(direct)", medium: "(none)", device: "Desktop", sessions: 60, users: 45, w_users: 12, conversions: 6 },
  { connection_id: 3, date: "2025-12-07", channel_group: "Organic Search", source: "google", medium: "organic", device: "Desktop", sessions: 55, users: 38, w_users: 10, conversions: 4 },
];

/** ga_events（用於 Events 區塊） */
export const gaEvents = [
  { connection_id: 1, date: "2025-12-07", event_name: "page_view", event_count: 320 },
  { connection_id: 1, date: "2025-12-07", event_name: "click_contact", event_count: 45 },
  { connection_id: 1, date: "2025-12-07", event_name: "scroll", event_count: 180 },

  { connection_id: 2, date: "2025-12-07", event_name: "page_view", event_count: 410 },
  { connection_id: 2, date: "2025-12-07", event_name: "click_read_more", event_count: 120 },
  { connection_id: 2, date: "2025-12-07", event_name: "scroll", event_count: 260 },

  { connection_id: 3, date: "2025-12-07", event_name: "page_view", event_count: 360 },
  { connection_id: 3, date: "2025-12-07", event_name: "add_to_cart", event_count: 95 },
  { connection_id: 3, date: "2025-12-07", event_name: "begin_checkout", event_count: 52 },
];

/** ga_conversions（用於 Conversions 區塊） */
export const gaConversions = [
  { connection_id: 1, date: "2025-12-07", conversion_name: "contact_form_submit", count: 8, value: 0 },
  { connection_id: 2, date: "2025-12-07", conversion_name: "newsletter_signup", count: 12, value: 0 },
  { connection_id: 3, date: "2025-12-07", conversion_name: "purchase", count: 22, value: 6600 },
  { connection_id: 3, date: "2025-12-07", conversion_name: "add_payment_info", count: 30, value: 0 },
];
