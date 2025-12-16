"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  gaConnections,
  gaDailySummary,
  gaPages,
  gaTrafficSources,
  gaEvents,
  gaConversions,
} from "./fakeData";

/* =========================
   Plan / Feature Gates
========================= */

type Plan = "FREE" | "PRO" | "ENTERPRISE";
const CURRENT_PLAN: Plan = "PRO";

type FeatureFlags = {
  dateRange: boolean;
  multiGa: boolean;
  multiTrend: boolean;
  insights: boolean;
  eventsAndConversions: boolean;
  pagesCompare: boolean;
  trafficSources: boolean;
};
const PLAN_FEATURES: Record<Plan, FeatureFlags> = {
  FREE: {
    dateRange: false,
    multiGa: false,
    multiTrend: false,
    insights: false,
    eventsAndConversions: false,
    pagesCompare: false,
    trafficSources: false,
  },
  PRO: {
    dateRange: true,
    multiGa: true,
    multiTrend: true,
    insights: true,
    eventsAndConversions: true,
    pagesCompare: true,
    trafficSources: true,
  },
  ENTERPRISE: {
    dateRange: true,
    multiGa: true,
    multiTrend: true,
    insights: true,
    eventsAndConversions: true,
    pagesCompare: true,
    trafficSources: true,
  },
};
const FEATURES = PLAN_FEATURES[CURRENT_PLAN];

/* =========================
   Types / Constants
========================= */

type MetricKey = "sessions" | "users" | "pageviews" | "events";

const TREND_METRICS: MetricKey[] = ["sessions", "users", "pageviews", "events"];

const GA_COLORS = [
  "#2563eb", // blue
  "#16a34a", // green
  "#9333ea", // purple
  "#ea580c", // orange
  "#dc2626", // red
  "#0891b2", // cyan
];

type Insight = {
  id: string;
  level: "positive" | "warning" | "neutral";
  title: string;
  message: string;
  metric?: string;
};

/* =========================
   Utils
========================= */

function inRange(date: string, start: string, end: string) {
  // date is expected as "YYYY-MM-DD"
  if (!start || !end) return true;
  return date >= start && date <= end;
}

function formatPct(v: number) {
  const n = Number(v);
  if (!Number.isFinite(n)) return "0%";
  return `${Math.round(n * 100)}%`;
}

function safeNum(v: any) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function calcGrowth(curr: number, prev: number) {
  const c = safeNum(curr);
  const p = safeNum(prev);
  if (!p) return null;
  return ((c - p) / p) * 100;
}

function avg(sum: number, count: number) {
  return sum / Math.max(1, count);
}

/* =========================
   Insight Engine (Rules)
   - 保底：沒有 AI 也能產出穩定結論
========================= */

function generateRuleInsights(input: {
  sessionsGrowth: number | null;
  usersGrowth: number | null;
  pageviewsGrowth: number | null;
  eventsGrowth: number | null;
  bounceGrowth: number | null;
  newUserRatio: number; // 0..1
  topChannel?: string | null;
  topDevice?: string | null;
}): Insight[] {
  const out: Insight[] = [];

  const g = (x: number | null) => (x === null ? null : Math.round(x));

  if (input.sessionsGrowth !== null) {
    if (input.sessionsGrowth >= 10) {
      out.push({
        id: "sessions_up",
        level: "positive",
        title: "流量成長",
        message: `Sessions 成長 ${g(input.sessionsGrowth)}%，流量表現不錯。`,
        metric: "sessions",
      });
    } else if (input.sessionsGrowth <= -10) {
      out.push({
        id: "sessions_down",
        level: "warning",
        title: "流量下降",
        message: `Sessions 下滑 ${Math.abs(g(input.sessionsGrowth) || 0)}%，建議檢查流量來源或近期投放/SEO變動。`,
        metric: "sessions",
      });
    }
  }

  if (input.bounceGrowth !== null) {
    // bounce rate 越低越好：成長(變大)通常是壞事
    if (input.bounceGrowth <= -5) {
      out.push({
        id: "bounce_improve",
        level: "positive",
        title: "跳出率改善",
        message: `Bounce Rate 下降 ${Math.abs(g(input.bounceGrowth) || 0)}%，使用者體驗/內容品質有改善。`,
        metric: "bounce_rate",
      });
    } else if (input.bounceGrowth >= 5) {
      out.push({
        id: "bounce_worse",
        level: "warning",
        title: "跳出率上升",
        message: `Bounce Rate 上升 ${g(input.bounceGrowth)}%，建議檢查入口頁載入速度、版面、CTA 與內容相關性。`,
        metric: "bounce_rate",
      });
    }
  }

  if (input.newUserRatio < 0.3) {
    out.push({
      id: "low_new_users",
      level: "warning",
      title: "新用戶比例偏低",
      message: "新用戶比例偏低，建議加強 SEO/廣告曝光或拓展新渠道。",
      metric: "new_users",
    });
  } else if (input.newUserRatio > 0.6) {
    out.push({
      id: "high_new_users",
      level: "positive",
      title: "新用戶拓展良好",
      message: "新用戶占比高，拓新效果不錯；下一步可優化留存與轉換。",
      metric: "new_users",
    });
  }

  // 小加分：來源 / 裝置
  if (input.topChannel) {
    out.push({
      id: "top_channel",
      level: "neutral",
      title: "主要流量來源",
      message: `目前 Sessions 主要來自「${input.topChannel}」。`,
      metric: "channel",
    });
  }
  if (input.topDevice) {
    out.push({
      id: "top_device",
      level: "neutral",
      title: "主要裝置",
      message: `目前 Sessions 主要裝置為「${input.topDevice}」。`,
      metric: "device",
    });
  }

  if (!out.length) {
    out.push({
      id: "stable",
      level: "neutral",
      title: "數據穩定",
      message: "目前區間未出現明顯異常，建議持續觀察與累積資料量。",
    });
  }

  return out;
}

/* =========================
   Optional: AI Enhance (可插拔)
   - 你可以做 /api/ga-insights 讓它回 Insight[]
========================= */

async function fetchAIInsights(payload: any): Promise<Insight[] | null> {
  try {
    const res = await fetch("/api/ga-insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    const data = await res.json();
    // 期望格式：{ insights: Insight[] }
    if (data?.insights && Array.isArray(data.insights)) return data.insights as Insight[];
    return null;
  } catch {
    return null;
  }
}

/* =========================
   Main Page
========================= */

export default function AnalyticsPage() {
  const [visibleMetrics, setVisibleMetrics] = useState<MetricKey[]>([
  "sessions",
  "users",
]);
  const allIds = useMemo(() => gaConnections.map((x) => x.id), []);
  const [selectedIds, setSelectedIds] = useState<number[]>(
    FEATURES.multiGa ? allIds : [allIds[0]]
  );

  // date range（FREE: 可固定最近 7 天；這裡先用可視化的固定值）
  const [dateRange, setDateRange] = useState({
    start: "2025-12-01",
    end: "2025-12-31",
  });

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  // name map
  const nameById = useMemo(() => {
    const m = new Map<number, string>();
    gaConnections.forEach((c) => m.set(c.id, c.account_name));
    return m;
  }, []);

  /* =========================
     Filtered daily rows
  ========================= */

  const dailyRows = useMemo(() => {
    return gaDailySummary.filter((r) => {
      if (!selectedSet.has(r.connection_id)) return false;
      if (FEATURES.dateRange && !inRange(r.date, dateRange.start, dateRange.end)) return false;
      return true;
    });
  }, [selectedSet, dateRange]);

  /* =========================
     Overview (per GA)
  ========================= */

  const perGaOverview = useMemo(() => {
    const map: Record<number, any> = {};

    dailyRows.forEach((r) => {
      const id = r.connection_id;
      if (!map[id]) {
        map[id] = {
          users: 0,
          sessions: 0,
          pageviews: 0,
          events: 0,
          new_users: 0,
          avg_session_duration_sum: 0,
          bounce_rate_sum: 0,
          days: 0,
        };
      }
      map[id].users += safeNum(r.users);
      map[id].sessions += safeNum(r.sessions);
      map[id].pageviews += safeNum(r.pageviews);
      map[id].events += safeNum(r.events);
      map[id].new_users += safeNum(r.new_users);
      map[id].avg_session_duration_sum += safeNum(r.avg_session_duration);
      map[id].bounce_rate_sum += safeNum(r.bounce_rate);
      map[id].days += 1;
    });

    Object.keys(map).forEach((k) => {
      const v = map[Number(k)];
      v.avg_session_duration = avg(v.avg_session_duration_sum, v.days);
      v.bounce_rate = avg(v.bounce_rate_sum, v.days);
    });

    return map;
  }, [dailyRows]);

  const totalOverview = useMemo(() => {
    const ids = Object.keys(perGaOverview).map(Number);
    const acc = {
      users: 0,
      sessions: 0,
      pageviews: 0,
      events: 0,
      new_users: 0,
      avg_session_duration: 0,
      bounce_rate: 0,
      _n: 0,
    };

    ids.forEach((id) => {
      const s = perGaOverview[id];
      acc.users += safeNum(s.users);
      acc.sessions += safeNum(s.sessions);
      acc.pageviews += safeNum(s.pageviews);
      acc.events += safeNum(s.events);
      acc.new_users += safeNum(s.new_users);
      acc.avg_session_duration += safeNum(s.avg_session_duration);
      acc.bounce_rate += safeNum(s.bounce_rate);
      acc._n += 1;
    });

    const n = Math.max(1, acc._n);
    acc.avg_session_duration = acc.avg_session_duration / n;
    acc.bounce_rate = acc.bounce_rate / n;

    return acc;
  }, [perGaOverview]);

  /* =========================
     Trend Data (multi KPI)
  ========================= */

  const trendData = useMemo(() => {
    const byDate: Record<string, any> = {};

    dailyRows.forEach((r) => {
      const date = r.date;
      if (!byDate[date]) byDate[date] = { date };

      TREND_METRICS.forEach((m) => {
        byDate[date][`ga_${r.connection_id}_${m}`] = safeNum(r[m]);
      });
    });

    return Object.values(byDate).sort((a: any, b: any) =>
      String(a.date).localeCompare(String(b.date))
    );
  }, [dailyRows]);

  /* =========================
     Pages Compare
  ========================= */

  const pagesCompare = useMemo(() => {
    if (!FEATURES.pagesCompare) return [];

    const map: Record<string, any> = {};
    gaPages.forEach((p) => {
      if (!selectedSet.has(p.connection_id)) return;
      // 如果你的 gaPages 有 date，這裡也可以加 range filter
      const key = p.page_path;
      if (!map[key]) {
        map[key] = {
          page_path: p.page_path,
          page_title: p.page_title,
          data: {},
        };
      }
      map[key].data[p.connection_id] = p;
      if (!map[key].page_title && p.page_title) map[key].page_title = p.page_title;
    });

    const list = Object.values(map).map((row: any) => {
      const total = selectedIds.reduce(
        (acc, id) => acc + safeNum(row.data[id]?.pageviews),
        0
      );
      return { ...row, total_pageviews: total };
    });

    list.sort((a: any, b: any) => b.total_pageviews - a.total_pageviews);
    return list;
  }, [selectedSet, selectedIds]);

  /* =========================
     Traffic Sources (Channel/Device)
  ========================= */

  const channelAgg = useMemo(() => {
    if (!FEATURES.trafficSources) return [];
    const byChannel: Record<string, any> = {};

    gaTrafficSources.forEach((r) => {
      if (!selectedSet.has(r.connection_id)) return;
      // 如果你的 trafficSources 有 date，這裡也能加 range filter
      const k = r.channel_group || "Other";
      if (!byChannel[k]) byChannel[k] = { channel: k, sessions: 0, users: 0, conversions: 0 };
      byChannel[k].sessions += safeNum(r.sessions);
      byChannel[k].users += safeNum(r.users);
      byChannel[k].conversions += safeNum(r.conversions);
    });

    return Object.values(byChannel).sort((a: any, b: any) => b.sessions - a.sessions);
  }, [selectedSet]);

  const deviceAgg = useMemo(() => {
    if (!FEATURES.trafficSources) return [];
    const byDevice: Record<string, any> = {};

    gaTrafficSources.forEach((r) => {
      if (!selectedSet.has(r.connection_id)) return;
      const k = r.device || "Other";
      if (!byDevice[k]) byDevice[k] = { device: k, sessions: 0 };
      byDevice[k].sessions += safeNum(r.sessions);
    });

    return Object.values(byDevice).sort((a: any, b: any) => b.sessions - a.sessions);
  }, [selectedSet]);

  const topChannel = useMemo(() => {
    if (!channelAgg.length) return null;
    return channelAgg[0]?.channel ?? null;
  }, [channelAgg]);

  const topDevice = useMemo(() => {
    if (!deviceAgg.length) return null;
    return deviceAgg[0]?.device ?? null;
  }, [deviceAgg]);

  /* =========================
     Events / Conversions
  ========================= */

  const topEvents = useMemo(() => {
    if (!FEATURES.eventsAndConversions) return [];
    const byName: Record<string, number> = {};

    gaEvents.forEach((e) => {
      if (!selectedSet.has(e.connection_id)) return;
      byName[e.event_name] = (byName[e.event_name] || 0) + safeNum(e.event_count);
    });

    return Object.entries(byName)
      .map(([event_name, event_count]) => ({ event_name, event_count }))
      .sort((a, b) => b.event_count - a.event_count)
      .slice(0, 8);
  }, [selectedSet]);

  const topConversions = useMemo(() => {
    if (!FEATURES.eventsAndConversions) return [];
    const byName: Record<string, { count: number; value: number }> = {};

    gaConversions.forEach((c) => {
      if (!selectedSet.has(c.connection_id)) return;
      const k = c.conversion_name;
      if (!byName[k]) byName[k] = { count: 0, value: 0 };
      byName[k].count += safeNum(c.count);
      byName[k].value += safeNum(c.value);
    });

    return Object.entries(byName)
      .map(([conversion_name, v]) => ({ conversion_name, count: v.count, value: v.value }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [selectedSet]);

  /* =========================
     New vs Returning Pie
  ========================= */

  const newVsReturning = useMemo(() => {
    const newUsers = safeNum(totalOverview.new_users);
    const totalUsers = safeNum(totalOverview.users);
    const returning = Math.max(0, totalUsers - newUsers);

    return [
      { name: "New Users", value: newUsers },
      { name: "Returning Users", value: returning },
    ];
  }, [totalOverview]);

  const newUserRatio = useMemo(() => {
    const totalUsers = Math.max(1, safeNum(totalOverview.users));
    return safeNum(totalOverview.new_users) / totalUsers;
  }, [totalOverview]);

  /* =========================
     Growth (KPI 成長率)
     - 這裡先用「區間前半段 vs 後半段」做 WoW/MoM 的替代（fakeData 也能跑）
     - 真接 GA API 後，把 prev range 換成真正 previous period 即可
  ========================= */

  const growthPack = useMemo(() => {
    // 按 date 排序
    const rows = [...dailyRows].sort((a: any, b: any) => String(a.date).localeCompare(String(b.date)));
    if (rows.length < 4) {
      return {
        sessionsGrowth: null,
        usersGrowth: null,
        pageviewsGrowth: null,
        eventsGrowth: null,
        bounceGrowth: null,
      };
    }

    const mid = Math.floor(rows.length / 2);
    const prev = rows.slice(0, mid);
    const curr = rows.slice(mid);

    const sumBlock = (block: any[]) => {
      let sessions = 0, users = 0, pageviews = 0, events = 0;
      let bounceSum = 0, days = 0;
      block.forEach((r) => {
        sessions += safeNum(r.sessions);
        users += safeNum(r.users);
        pageviews += safeNum(r.pageviews);
        events += safeNum(r.events);
        bounceSum += safeNum(r.bounce_rate);
        days += 1;
      });
      return {
        sessions,
        users,
        pageviews,
        events,
        bounce_rate: avg(bounceSum, days),
      };
    };

    const p = sumBlock(prev);
    const c = sumBlock(curr);

    return {
      sessionsGrowth: calcGrowth(c.sessions, p.sessions),
      usersGrowth: calcGrowth(c.users, p.users),
      pageviewsGrowth: calcGrowth(c.pageviews, p.pageviews),
      eventsGrowth: calcGrowth(c.events, p.events),
      // bounce：越低越好，所以用「當期 - 前期」的百分比變化仍然可參考
      bounceGrowth: calcGrowth(c.bounce_rate, p.bounce_rate),
    };
  }, [dailyRows]);

  /* =========================
     AI Insights (規則保底 + AI 可插拔)
  ========================= */

  const [insights, setInsights] = useState<Insight[]>([]);
  const [aiStatus, setAiStatus] = useState<"off" | "loading" | "rule" | "ai">("off");

  const baseRuleInsights = useMemo(() => {
    return generateRuleInsights({
      sessionsGrowth: growthPack.sessionsGrowth,
      usersGrowth: growthPack.usersGrowth,
      pageviewsGrowth: growthPack.pageviewsGrowth,
      eventsGrowth: growthPack.eventsGrowth,
      bounceGrowth: growthPack.bounceGrowth,
      newUserRatio,
      topChannel,
      topDevice,
    });
  }, [growthPack, newUserRatio, topChannel, topDevice]);

  useEffect(() => {
    if (!FEATURES.insights) {
      setAiStatus("off");
      setInsights([]);
      return;
    }

    // 先上 rule（穩）
    setInsights(baseRuleInsights);
    setAiStatus("rule");

    // ENTERPRISE 才嘗試 AI（你也可以改成 PRO 可用 AI lite）
    if (CURRENT_PLAN !== "ENTERPRISE") return;

    (async () => {
      setAiStatus("loading");
      const payload = {
        dateRange,
        totalOverview,
        growthPack,
        topChannel,
        topDevice,
        newVsReturning,
        // 你也可以把 channelAgg/deviceAgg/topPages/topConversions 帶過去
      };

      const ai = await fetchAIInsights(payload);
      if (ai && ai.length) {
        setInsights(ai);
        setAiStatus("ai");
      } else {
        // AI 失敗就維持 rule
        setAiStatus("rule");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseRuleInsights, dateRange.start, dateRange.end]);

  /* =========================
     UI
  ========================= */

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.headerRow}>
        <div>
          <div style={styles.h1}>GA Dashboard</div>
          <div style={styles.sub}>
            Demo 模式（Fake Data）— 先把視覺與洞察做滿，再接 API　
            <span style={{ marginLeft: 8, fontWeight: 800 }}>
              Plan: {CURRENT_PLAN}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
          {/* Date Range */}
          {FEATURES.dateRange ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange((d) => ({ ...d, start: e.target.value }))}
                style={styles.dateInput}
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange((d) => ({ ...d, end: e.target.value }))}
                style={styles.dateInput}
              />
            </div>
          ) : (
            <div style={{ ...styles.lockNote }}>
              FREE：日期固定（最近區間）
            </div>
          )}

          {/* GA selector */}
          <div style={styles.selectorWrap}>
            {gaConnections.map((ga, idx) => {
              const checked = selectedSet.has(ga.id);
              const disabled = !FEATURES.multiGa && ga.id !== selectedIds[0];
              return (
                <label
                  key={ga.id}
                  style={{
                    ...styles.pill,
                    ...(checked ? styles.pillOn : styles.pillOff),
                    opacity: disabled ? 0.5 : 1,
                    borderColor: checked ? GA_COLORS[idx % GA_COLORS.length] : styles.pillOff.border,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => {
                      if (!FEATURES.multiGa) return;
                      setSelectedIds((prev) =>
                        prev.includes(ga.id) ? prev.filter((x) => x !== ga.id) : [...prev, ga.id]
                      );
                    }}
                    style={{ marginRight: 8 }}
                  />
                  {ga.account_name}
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overview */}
      <Section title="Overview" subtitle="總覽 KPI（跨選取 GA）">
        <div style={styles.grid3}>
          <Kpi title="Total Users" value={totalOverview.users} />
          <Kpi title="Total Sessions" value={totalOverview.sessions} />
          <Kpi title="Total Pageviews" value={totalOverview.pageviews} />
          <Kpi title="Events" value={totalOverview.events} />
          <Kpi title="New Users" value={totalOverview.new_users} />
          <Kpi title="Avg Session Duration (sec)" value={Math.round(totalOverview.avg_session_duration)} />
          <Kpi title="Bounce Rate" value={formatPct(totalOverview.bounce_rate)} isText />
        </div>
      </Section>

      {/* Growth + Insights */}
      {FEATURES.insights && (
        <Section
          title="Growth & Insights"
          subtitle={`KPI 成長率（以區間前半 vs 後半估算） + ${CURRENT_PLAN === "ENTERPRISE" ? "AI" : "Rule"} Insights`}
          right={
            <div style={styles.badgeRow}>
              <Badge label={`Insights: ${aiStatus.toUpperCase()}`} tone={aiStatus === "ai" ? "good" : aiStatus === "loading" ? "warn" : "neutral"} />
            </div>
          }
        >
          <div style={styles.grid2}>
            <Card>
              <div style={styles.cardTitle}>Growth</div>
              <div style={styles.growthGrid}>
                <GrowthRow label="Sessions" value={growthPack.sessionsGrowth} />
                <GrowthRow label="Users" value={growthPack.usersGrowth} />
                <GrowthRow label="Pageviews" value={growthPack.pageviewsGrowth} />
                <GrowthRow label="Events" value={growthPack.eventsGrowth} />
                <GrowthRow label="Bounce Rate" value={growthPack.bounceGrowth} invert />
              </div>
              <div style={styles.mutedNote}>
                ※ Bounce Rate：越低越好（已用 invert 顯示）
              </div>
            </Card>

            <Card>
              <div style={styles.cardTitle}>Insights</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {insights.map((i) => (
                  <div key={i.id} style={styles.insightItem}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span
                        style={{
                          ...styles.dot,
                          background:
                            i.level === "positive"
                              ? "#16a34a"
                              : i.level === "warning"
                              ? "#ea580c"
                              : "#667085",
                        }}
                      />
                      <div style={{ fontWeight: 900 }}>{i.title}</div>
                    </div>
                    <div style={{ color: "#344054", marginTop: 4 }}>{i.message}</div>
                  </div>
                ))}
              </div>
              {CURRENT_PLAN !== "ENTERPRISE" && (
                <div style={styles.mutedNote}>
                  Enterprise：可啟用 AI 增強（/api/ga-insights）
                </div>
              )}
            </Card>
          </div>
        </Section>
      )}

      {/* Per GA */}
      <Section title="Per GA" subtitle="每個 GA 站點的 KPI（利於客戶比較）">
        <div style={styles.gridAuto}>
          {selectedIds.map((id, gaIdx) =>
            visibleMetrics.map((m, mIdx) => (
              <Line
                key={`${id}_${m}`}
                dataKey={`ga_${id}_${m}`}
                name={`${nameById.get(id)} · ${m}`}
                type="monotone"
                stroke={GA_COLORS[(gaIdx + mIdx) % GA_COLORS.length]}
                strokeWidth={2}
                dot={false}
              />
            ))
          )}
        </div>
      </Section>

      {/* Trend */}
      <Section
        title="Trend"
        subtitle={
          FEATURES.multiTrend
            ? "多 KPI 疊圖（可用右側勾選顯示 sessions / users / pageviews / events）"
            : "FREE：僅 Sessions"
        }
        right={
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {TREND_METRICS.map((m) => {
              const checked = visibleMetrics.includes(m);
              return (
                <label
                  key={m}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 10px",
                    borderRadius: 999,
                    cursor: "pointer",
                    background: checked ? "#eff6ff" : "#fff",
                    border: checked ? "1px solid #2563eb" : "1px solid #d8dee8",
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      setVisibleMetrics((prev) => {
                        // 🔒 UX：至少留一個 KPI
                        if (prev.length === 1 && prev[0] === m) return prev;
                        return prev.includes(m)
                          ? prev.filter((x) => x !== m)
                          : [...prev, m];
                      })
                    }
                  />
                  {m}
                </label>
              );
            })}
          </div>
        }
      >
        <Card>
          <div style={{ height: 360 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />

                {FEATURES.multiTrend ? (
                  selectedIds.map((id, gaIdx) =>
                    visibleMetrics.map((m, mIdx) => (
                      <Line
                        key={`${id}_${m}`}
                        dataKey={`ga_${id}_${m}`}
                        name={`${nameById.get(id) || `GA ${id}`} · ${m}`}
                        type="monotone"
                        stroke={GA_COLORS[(gaIdx + mIdx) % GA_COLORS.length]}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))
                  )
                ) : (
                  <Line
                    dataKey={`ga_${selectedIds[0]}_sessions`}
                    name="sessions"
                    type="monotone"
                    stroke={GA_COLORS[0]}
                    strokeWidth={2}
                    dot={false}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Section>

      {/* Pages Compare */}
      {FEATURES.pagesCompare && (
        <Section title="Pages Compare" subtitle="同一頁面在不同 GA 的表現差異（自動高亮最佳者）">
          <Card>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.thLeft}>Page</th>
                    <th style={styles.thLeft}>Title</th>
                    {selectedIds.map((id) => (
                      <th key={id} style={styles.thRight}>
                        {nameById.get(id) || `GA ${id}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pagesCompare.slice(0, 12).map((row: any) => {
                    let bestId: number | null = null;
                    let bestPv = -1;

                    selectedIds.forEach((id) => {
                      const pv = safeNum(row.data[id]?.pageviews);
                      if (pv > bestPv) {
                        bestPv = pv;
                        bestId = id;
                      }
                    });

                    return (
                      <tr key={row.page_path}>
                        <td style={styles.tdLeft}>{row.page_path}</td>
                        <td style={styles.tdLeft}>{row.page_title}</td>
                        {selectedIds.map((id) => {
                          const d = row.data[id];
                          const pv = safeNum(d?.pageviews);
                          const us = safeNum(d?.users);
                          const at = safeNum(d?.avg_time);
                          const isBest = bestId === id && pv > 0;

                          return (
                            <td key={id} style={{ ...styles.tdRight, ...(isBest ? styles.bestCell : {}) }}>
                              <div style={{ fontWeight: 900 }}>{pv}</div>
                              <div style={styles.miniMeta}>
                                {us} users • {Math.round(at)}s
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </Section>
      )}

      {/* Traffic Sources + New vs Returning */}
      {FEATURES.trafficSources && (
        <Section title="Traffic Sources" subtitle="Channel / Device / New vs Returning（商務展示很加分）">
          <div style={styles.grid2}>
            <Card>
              <div style={styles.cardTitle}>Channel Group</div>
              <div style={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={channelAgg}>
                    <XAxis dataKey="channel" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sessions" name="sessions" fill={GA_COLORS[0]} />
                    <Bar dataKey="users" name="users" fill={GA_COLORS[1]} />
                    <Bar dataKey="conversions" name="conversions" fill={GA_COLORS[2]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <div style={styles.cardTitle}>Device (by sessions)</div>
              <div style={{ height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deviceAgg} dataKey="sessions" nameKey="device" outerRadius={110} label>
                      {deviceAgg.map((_: any, idx: number) => (
                        <Cell key={idx} fill={GA_COLORS[idx % GA_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <div style={styles.cardTitle}>New vs Returning Users</div>
              <div style={{ height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={newVsReturning} dataKey="value" nameKey="name" outerRadius={110} label>
                      {newVsReturning.map((_: any, idx: number) => (
                        <Cell key={idx} fill={GA_COLORS[idx % GA_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </Section>
      )}

      {/* Events + Conversions */}
      {FEATURES.eventsAndConversions && (
        <Section title="Events & Conversions" subtitle="這區塊是『能不能收錢』的核心之一">
          <div style={styles.grid2}>
            <Card>
              <div style={styles.cardTitle}>Top Events</div>
              <div style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topEvents}>
                    <XAxis dataKey="event_name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="event_count" name="event_count" fill={GA_COLORS[0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <div style={styles.cardTitle}>Top Conversions</div>
              <div style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topConversions}>
                    <XAxis dataKey="conversion_name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="count" fill={GA_COLORS[1]} />
                    <Bar dataKey="value" name="value" fill={GA_COLORS[2]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </Section>
      )}
    </div>
  );
}

/* =========================
   UI Components
========================= */

function Section({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginTop: 22 }}>
      <div style={styles.sectionHead}>
        <div>
          <div style={styles.h2}>{title}</div>
          {subtitle && <div style={styles.sectionSub}>{subtitle}</div>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div style={styles.card}>{children}</div>;
}

function Kpi({ title, value, isText }: { title: string; value: any; isText?: boolean }) {
  const safe = isText ? String(value ?? "-") : safeNum(value);
  return (
    <div style={styles.kpiCard}>
      <div style={styles.kpiTitle}>{title}</div>
      <div style={styles.kpiValue}>{safe}</div>
    </div>
  );
}

function KpiMini({ title, value, isText }: { title: string; value: any; isText?: boolean }) {
  const safe = isText ? String(value ?? "-") : safeNum(value);
  return (
    <div style={styles.kpiMini}>
      <div style={styles.kpiMiniTitle}>{title}</div>
      <div style={styles.kpiMiniValue}>{safe}</div>
    </div>
  );
}

function GrowthRow({
  label,
  value,
  invert,
}: {
  label: string;
  value: number | null;
  invert?: boolean;
}) {
  // invert: 越低越好（例如 bounce）
  const v = value === null ? null : (invert ? -value : value);
  const sign = v === null ? "—" : v > 0 ? "▲" : v < 0 ? "▼" : "•";
  const tone =
    v === null ? "neutral" : v > 0 ? "good" : v < 0 ? "bad" : "neutral";
  const num = v === null ? "—" : `${Math.round(Math.abs(v))}%`;

  return (
    <div style={styles.growthRow}>
      <div style={{ fontWeight: 800 }}>{label}</div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ ...styles.growthSign, ...(tone === "good" ? styles.good : tone === "bad" ? styles.bad : styles.neutral) }}>
          {sign}
        </span>
        <span style={{ fontWeight: 900 }}>{num}</span>
      </div>
    </div>
  );
}

function Badge({ label, tone }: { label: string; tone: "good" | "warn" | "neutral" }) {
  const bg = tone === "good" ? "#ecfdf3" : tone === "warn" ? "#fff7ed" : "#f2f4f7";
  const bd = tone === "good" ? "#d1fadf" : tone === "warn" ? "#fed7aa" : "#e4e7ec";
  const fg = tone === "good" ? "#027a48" : tone === "warn" ? "#9a3412" : "#344054";
  return (
    <span style={{ padding: "6px 10px", borderRadius: 999, border: `1px solid ${bd}`, background: bg, color: fg, fontWeight: 900, fontSize: 12 }}>
      {label}
    </span>
  );
}

/* =========================
   Styles (inline, zero dependency)
========================= */

const styles: Record<string, any> = {
  page: { padding: 28, background: "#f5f7fa", minHeight: "100vh" },

  headerRow: {
    display: "flex",
    gap: 16,
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  h1: { fontSize: 28, fontWeight: 900 },
  sub: { color: "#5b6472", marginTop: 6, fontSize: 13 },

  selectorWrap: { display: "flex", gap: 10, flexWrap: "wrap" },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
    userSelect: "none",
    background: "#fff",
    border: "1px solid #d8dee8",
  },
  pillOn: { background: "#eff6ff", border: "2px solid #2563eb" },
  pillOff: { background: "#fff", border: "1px solid #d8dee8" },

  dateInput: {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid #d8dee8",
    background: "#fff",
  },
  lockNote: {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px dashed #d8dee8",
    background: "#fff",
    color: "#667085",
    fontSize: 12,
    fontWeight: 800,
  },

  sectionHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 12,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  h2: { fontSize: 18, fontWeight: 900 },
  sectionSub: { color: "#667085", fontSize: 13, marginTop: 4 },

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
    gap: 14,
  },
  gridAuto: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 14,
  },

  card: {
    background: "#fff",
    borderRadius: 14,
    padding: 18,
    boxShadow: "0 10px 30px rgba(16,24,40,0.08)",
  },
  cardTitle: { fontSize: 14, fontWeight: 900, marginBottom: 10, color: "#101828" },

  kpiCard: {
    background: "#fff",
    borderRadius: 14,
    padding: 18,
    boxShadow: "0 10px 30px rgba(16,24,40,0.08)",
  },
  kpiTitle: { fontSize: 12, color: "#667085", fontWeight: 800 },
  kpiValue: { fontSize: 30, fontWeight: 900, marginTop: 6, color: "#101828" },

  kpiMiniGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 10,
    marginTop: 10,
  },
  kpiMini: {
    background: "#f7f8fb",
    border: "1px solid #eef1f6",
    borderRadius: 12,
    padding: 12,
  },
  kpiMiniTitle: { fontSize: 12, color: "#667085", fontWeight: 800 },
  kpiMiniValue: { fontSize: 18, fontWeight: 900, marginTop: 4, color: "#101828" },

  table: { width: "100%", borderCollapse: "collapse" },
  thLeft: {
    textAlign: "left",
    padding: "10px 12px",
    fontSize: 12,
    color: "#667085",
    fontWeight: 900,
    background: "#f7f8fb",
    borderBottom: "1px solid #eef1f6",
  },
  thRight: {
    textAlign: "right",
    padding: "10px 12px",
    fontSize: 12,
    color: "#667085",
    fontWeight: 900,
    background: "#f7f8fb",
    borderBottom: "1px solid #eef1f6",
  },
  tdLeft: {
    textAlign: "left",
    padding: "10px 12px",
    borderBottom: "1px solid #eef1f6",
    fontSize: 13,
    color: "#101828",
    whiteSpace: "nowrap",
  },
  tdRight: {
    textAlign: "right",
    padding: "10px 12px",
    borderBottom: "1px solid #eef1f6",
    fontSize: 13,
    color: "#101828",
    minWidth: 120,
  },
  bestCell: {
    background: "#ecfdf3",
    borderBottom: "1px solid #d1fadf",
  },
  miniMeta: { fontSize: 11, color: "#667085", marginTop: 2 },

  growthGrid: { display: "flex", flexDirection: "column", gap: 10 },
  growthRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: 12,
    background: "#f7f8fb",
    border: "1px solid #eef1f6",
  },
  growthSign: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12,
  },
  good: { background: "#ecfdf3", border: "1px solid #d1fadf", color: "#027a48" },
  bad: { background: "#fff1f3", border: "1px solid #fecdd3", color: "#be123c" },
  neutral: { background: "#f2f4f7", border: "1px solid #e4e7ec", color: "#344054" },

  insightItem: {
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid #eef1f6",
    background: "#ffffff",
  },
  dot: { width: 10, height: 10, borderRadius: 999 },

  mutedNote: { marginTop: 10, fontSize: 12, color: "#667085" },
  badgeRow: { display: "flex", gap: 8, alignItems: "center" },
};
