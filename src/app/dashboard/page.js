"use client";
import { useState } from "react";
import "./dashboard.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Card, { TransactionItem } from "@/components/Card";

/* ─────────────────────────────────────────
   Chart helpers
───────────────────────────────────────── */
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const currentLine  = [38, 55, 42, 68, 52, 45, 72, 60];
const previousLine = [44, 38, 58, 45, 60, 40, 55, 48];

function buildPath(values, w, h, pad = 14) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = (w - pad * 2) / (values.length - 1);
  const points = values.map((v, i) => {
    const x = pad + i * step;
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    return [x, y];
  });
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const cpx = (points[i][0] + points[i + 1][0]) / 2;
    d += ` C ${cpx} ${points[i][1]}, ${cpx} ${points[i + 1][1]}, ${points[i + 1][0]} ${points[i + 1][1]}`;
  }
  return d;
}

/* ─────────────────────────────────────────
   Donut data
───────────────────────────────────────── */
const DONUT_DATA = [
  { label: "Lifestyle",  pct: 60, color: "#D4A017" },
  { label: "Operations", pct: 25, color: "#D4A017" },
  { label: "Other",      pct: 15, color: "#3A3A4A" },
];

function buildDonutSegments(data, r = 46, gap = 4) {
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  return data.map((item) => {
    const length = (item.pct / 100) * circumference - gap;
    const seg = {
      ...item,
      dashArray: `${length} ${circumference - length}`,
      dashOffset: -offset,
    };
    offset += (item.pct / 100) * circumference;
    return seg;
  });
}

const donutSegs = buildDonutSegments(DONUT_DATA);

/* ─────────────────────────────────────────
   Bar data
───────────────────────────────────────── */
const BARS = [
  { day: "Mon", val: 40 },
  { day: "Tue", val: 65 },
  { day: "Wed", val: 92 },
  { day: "Thu", val: 50 },
  { day: "Fri", val: 35 },
];
const maxBar = Math.max(...BARS.map((b) => b.val));

/* ─────────────────────────────────────────
   Transaction icons
───────────────────────────────────────── */
const TxnIcon = ({ type }) => {
  const icons = {
    plane: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.52 9.78 19.79 19.79 0 01.46 1.14 2 2 0 012.5 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    fork: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z"/>
      </svg>
    ),
    cloud: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
      </svg>
    ),
  };
  return icons[type] || icons.cloud;
};

const TXNS = [
  { icon: "plane", name: "Emirates Airlines",    desc: "Business Class – Dubai Flight", amount: "-$3,450.00", date: "Oct 24, 2023" },
  { icon: "fork",  name: "Michelin Star Dinner", desc: "Corporate Entertainment",       amount: "-$1,240.50", date: "Oct 23, 2023" },
  { icon: "cloud", name: "Cloud Infrastructure", desc: "AWS Enterprise Subscription",  amount: "-$4,200.00", date: "Oct 22, 2023" },
];

/* ─────────────────────────────────────────
   Inline stat icon wrapper
───────────────────────────────────────── */
const CardIcon = ({ children }) => (
  <div style={{ color: "#D4A017", display: "flex", alignItems: "center" }}>{children}</div>
);

/* ═══════════════════════════════════════════
   DASHBOARD PAGE
══════════════════════════════════════════ */
export default function DashboardPage() {
  const chartW = 420;
  const chartH = 120;
  const curPath  = buildPath(currentLine,  chartW, chartH);
  const prevPath = buildPath(previousLine, chartW, chartH);

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-layout">

      {/* ── Sidebar ── */}
      <Sidebar onLogout={handleLogout} />

      {/* ── Main area ── */}
      <div className="main-area">

        {/* ── Navbar ── */}
        <Navbar title="Executive Overview" />

        {/* ── Scrollable content ── */}
        <div className="content">

          {/* ── Stat cards ── */}
          <div className="stat-grid">

            <Card
              variant="stat"
              badge="+4.2%"
              badgeType="positive"
              label="Total Expenses"
              value="$42,850.00"
              icon={
                <CardIcon>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                  </svg>
                </CardIcon>
              }
            />

            <Card
              variant="stat"
              badge="Oct 2023"
              badgeType="neutral"
              label="Total Entries"
              value="1,284"
              icon={
                <CardIcon>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </CardIcon>
              }
            />

            <Card
              variant="stat"
              badge="-2.1%"
              badgeType="negative"
              label="Average Expense"
              value="$342.15"
              icon={
                <CardIcon>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </CardIcon>
              }
            />

            <Card
              variant="stat"
              badge="Luxury"
              badgeType="luxury"
              label="Largest Transaction"
              value="$12,400.00"
              valueSize="small"
              icon={
                <CardIcon>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </CardIcon>
              }
            />

          </div>

          {/* ── Middle row ── */}
          <div className="middle-row">

            {/* Line chart */}
            <Card
              variant="chart"
              title="Monthly Expense Summary"
              legend={[
                { label: "Current",  color: "#D4A017" },
                { label: "Previous", color: "#555555" },
              ]}
            >
              <div className="chart-area">
                <svg className="chart-svg" viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none">
                  {[0.2, 0.5, 0.8].map((t) => (
                    <line key={t} x1="0" y1={t * chartH} x2={chartW} y2={t * chartH} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  ))}
                  <path d={prevPath} fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d={`${curPath} L ${chartW - 14} ${chartH} L 14 ${chartH} Z`} fill="url(#goldFade)" opacity="0.18" />
                  <path d={curPath} fill="none" stroke="#D4A017" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="goldFade" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4A017" stopOpacity="1" />
                      <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="chart-labels">
                {months.map((m) => <span key={m}>{m}</span>)}
              </div>
            </Card>

            {/* Donut chart */}
            <Card variant="donut" title="Category Donut">
              <div className="donut-svg-wrap">
                <svg className="donut-svg" viewBox="0 0 130 130">
                  <circle cx="65" cy="65" r="46" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="14" />
                  {donutSegs.map((seg, i) => (
                    <circle
                      key={i}
                      cx="65" cy="65" r="46"
                      fill="none"
                      stroke={seg.color}
                      strokeWidth="14"
                      strokeDasharray={seg.dashArray}
                      strokeDashoffset={seg.dashOffset}
                      strokeLinecap="round"
                      opacity={i === 1 ? 0.55 : 1}
                    />
                  ))}
                </svg>
                <div className="donut-center-text">
                  <span className="donut-center-label">Total</span>
                  <span className="donut-center-value">100%</span>
                </div>
              </div>
              <div className="donut-legend">
                {DONUT_DATA.map((item, i) => (
                  <div className="donut-legend-item" key={i}>
                    <div className="donut-legend-label">
                      <span
                        className="donut-legend-dot"
                        style={{ background: i === 2 ? "#3A3A4A" : item.color, opacity: i === 1 ? 0.55 : 1 }}
                      />
                      {item.label}
                    </div>
                    <span className="donut-legend-pct">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* ── Bottom row ── */}
          <div className="bottom-row">

            {/* Weekly bar chart */}
            <Card variant="bar" title="Weekly Flow">
              <div className="bar-area">
                {BARS.map((b) => {
                  const heightPct = (b.val / maxBar) * 100;
                  const isMax = b.val === maxBar;
                  return (
                    <div className="bar-col" key={b.day}>
                      {isMax && <span className="bar-max-label">MAX</span>}
                      <div
                        className={`bar-fill${isMax ? " active" : ""}`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="bar-labels">
                {BARS.map((b) => (
                  <span className="bar-day" key={b.day}>{b.day}</span>
                ))}
              </div>
            </Card>

            {/* Recent transactions */}
            <Card
              variant="transactions"
              title="Recent Transactions"
              onViewAll={() => window.location.href = "/expenses"}
            >
              {TXNS.map((txn, i) => (
                <TransactionItem
                  key={i}
                  icon={<TxnIcon type={txn.icon} />}
                  name={txn.name}
                  description={txn.desc}
                  amount={txn.amount}
                  date={txn.date}
                />
              ))}
            </Card>

          </div>

        </div>{/* /content */}
      </div>{/* /main-area */}
    </div>
  );
}