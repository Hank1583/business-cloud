"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BarChart3,
  Search,
  MessageCircle,
  Users,
  Target,
  Bot,
} from "lucide-react";
const MotionLink = motion(Link);

const moduleList = [
  { title: "GA 數據系統", desc: "整合分析、多維報表、自動化事件追蹤" },
  { title: "SEO AI", desc: "網站健康度、關鍵字建議、AI 自動優化建議" },
  { title: "智能客服", desc: "AI 客服 + 人工客服整合、知識庫、訊息中心" },
  { title: "CRM 系統", desc: "客戶資料、標籤管理、漏斗分析、自動化流程" },
  { title: "廣告投放中心", desc: "整合 Meta / Google / LINE 全渠道數據" },
  { title: "業務 AI 助理", desc: "自動跟進、LINE 推播、客戶洞察、AI 總結" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br 
    from-blue-400 via-blue-500 to-blue-600
    text-white relative overflow-hidden">

      {/* 背景動態光圈 */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        animate={{ x: [0, 80, -80, 0], y: [0, -60, 60, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-24 text-center relative">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold leading-tight"
        >
          商務雲 Business Cloud
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-xl opacity-90"
        >
          一站式企業雲平台，整合 GA、SEO、客服、CRM、廣告投放與 AI 業務助理。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex justify-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <MotionLink
            href="/dashboard"
            className="px-7 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            立即開始
          </MotionLink>

          <motion.a
            href="#modules"
            className="px-7 py-3 border border-white/60 rounded-xl font-semibold hover:bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            模組介紹
          </motion.a>
        </motion.div>
      </section>

      {/* Modules */}
{/* Modules */}
      <section id="modules" className="bg-white text-gray-900 py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold text-center mb-12"
          >
            企業級模組 Modules
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "GA 數據系統",
                desc: "整合分析、多維報表、自動化事件追蹤",
                icon: <BarChart3 size={32} className="text-blue-600" />,
              },
              {
                title: "SEO AI",
                desc: "網站健康度、關鍵字建議、AI 自動優化建議",
                icon: <Search size={32} className="text-green-600" />,
              },
              {
                title: "智能客服",
                desc: "AI 客服 + 人工客服整合、知識庫、訊息中心",
                icon: <MessageCircle size={32} className="text-purple-600" />,
              },
              {
                title: "CRM 系統",
                desc: "客戶資料、標籤管理、漏斗分析、自動化流程",
                icon: <Users size={32} className="text-orange-600" />,
              },
              {
                title: "廣告投放中心",
                desc: "整合 Meta / Google / LINE 全渠道數據",
                icon: <Target size={32} className="text-red-600" />,
              },
              {
                title: "業務 AI 助理",
                desc: "自動跟進、LINE 推播、客戶洞察、AI 總結",
                icon: <Bot size={32} className="text-indigo-600" />,
              },
            ].map((m, index) => (
              <motion.div
                key={m.title}
                className="p-6 rounded-2xl border shadow-sm hover:shadow-xl bg-white cursor-pointer transition relative overflow-hidden group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.04 }}
              >
                {/* TOP gradient highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-white opacity-0 group-hover:opacity-100 transition pointer-events-none" />

                <div className="flex items-center gap-3">
                  {m.icon}
                  <h3 className="text-xl font-bold">{m.title}</h3>
                </div>

                <p className="mt-3 opacity-70">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-24 blue-400 via-blue-500 to-blue-600 text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold"
        >
          準備好開始你的商務雲嗎？
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-4 opacity-90"
        >
          立即體驗雲端自動化帶來的企業成長
        </motion.p>

        <MotionLink
          href="/auth/login"
          className="mt-8 inline-block px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl shadow hover:bg-blue-100"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          登入 / 註冊
        </MotionLink>
      </section>
    </main>
  );
}
