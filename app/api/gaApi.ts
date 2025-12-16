const API_BASE =
  "https://www.highlight.url.tw/business-cloud/php/ga";

async function postJSON(url: string, body: any) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    // ❌ 先拿掉
    // credentials: "include",
  });

  return res.json();
}


// ✅ GA Connections
export const getGAConnections = () =>
  postJSON(`${API_BASE}/get_connections.php`, {});

// ✅ Summary
export const getGASummary = (params: {
  connection_ids: number[];
  start_date: string;
  end_date: string;
}) =>
  postJSON(`${API_BASE}/get_daily.php`, params);

// ✅ Trend
export const getGATrend = (params: {
  connection_ids: number[];
  start_date: string;
  end_date: string;
  metric: string;
}) =>
  postJSON(`${API_BASE}/get_trend.php`, params);

// ✅ ✅ ✅ Pages（你現在缺的）
export const getGAPages = (params: {
  connection_ids: number[];
  start_date: string;
  end_date: string;
}) =>
  postJSON(`${API_BASE}/get_pages.php`, params);
