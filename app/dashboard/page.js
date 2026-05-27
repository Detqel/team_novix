"use client";
import { useState } from "react";
import "./dashboard.css";

/* ── Icon helpers ── */
const Icon = ({ d, size = 16, stroke = "currentColor", fill = "none", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
);

/* ── Navigation items ── */
const NAV = [
  {
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    label: "Expenses",
    icon: <Icon d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93V18c0-.55-.45-1-1-1s-1 .45-1 1v1.93C7.06 19.44 4.56 16.94 4.07 13H6c.55 0 1-.45 1-1s-.45-1-1-1H4.07C4.56 7.06 7.06 4.56 11 4.07V6c0 .55.45 1 1 1s1-.45 1-1V4.07C16.94 4.56 19.44 7.06 19.93 11H18c-.55 0-1 .45-1 1s.45 1 1 1h1.93c-.49 3.94-2.99 6.44-6.93 6.93z" />,
  },
  {
    label: "Budget",
    icon: <Icon d={["M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z", "M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"]} />,
  },
  {
    label: "Subscriptions",
    icon: <Icon d={["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"]} />,
  },
  {
    label: "Savings Goals",
    icon: <Icon d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 4v8l5.25 3.15" />,
  },
  {
    label: "Notifications",
    icon: <Icon d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />,
  },
  {
    label: "Settings",
    icon: <Icon d={["M12 2a10 10 0 100 20A10 10 0 0012 2z","M12 8v4l3 3"]} />,
  },
];

/* ── Monthly line chart ── */
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

/* ── Donut segments ── */
const DONUT_DATA = [
  { label: "Lifestyle",   pct: 60, color: "#D4A017" },
  { label: "Operations",  pct: 25, color: "#D4A017" },
  { label: "Other",       pct: 15, color: "#3A3A4A" },
];

function buildDonutSegments(data, r = 46, cx = 65, cy = 65, gap = 4) {
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  return data.map((item) => {
    const length = (item.pct / 100) * circumference - gap;
    const seg = { ...item, dashArray: `${length} ${circumference - length}`, dashOffset: -offset };
    offset += (item.pct / 100) * circumference;
    return seg;
  });
}

const donutSegs = buildDonutSegments(DONUT_DATA);

/* ── Bar data ── */
const BARS = [
  { day: "Mon", val: 40 },
  { day: "Tue", val: 65 },
  { day: "Wed", val: 92 },
  { day: "Thu", val: 50 },
  { day: "Fri", val: 35 },
];
const maxBar = Math.max(...BARS.map((b) => b.val));

/* ── Transactions ── */
const TXNS = [
  {
    icon: "plane",
    name: "Emirates Airlines",
    desc: "Business Class – Dubai Flight",
    amount: "-$3,450.00",
    date: "Oct 24, 2023",
  },
  {
    icon: "fork",
    name: "Michelin Star Dinner",
    desc: "Corporate Entertainment",
    amount: "-$1,240.50",
    date: "Oct 23, 2023",
  },
  {
    icon: "cloud",
    name: "Cloud Infrastructure",
    desc: "AWS Enterprise Subscription",
    amount: "-$4,200.00",
    date: "Oct 22, 2023",
  },
];

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

/* ═══════════════════════════════════════
   DASHBOARD PAGE COMPONENT
════════════════════════════════════════ */
export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const chartW = 420;
  const chartH = 120;
  const curPath  = buildPath(currentLine,  chartW, chartH);
  const prevPath = buildPath(previousLine, chartW, chartH);

  return (
    <div className="dashboard-layout">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h2>Finance Ledger</h2>
          <span>Prestige Private Banking</span>
        </div>

        <nav className="sidebar-nav">
          {NAV.map(({ label, icon }) => (
            <a
              key={label}
              className={`nav-item${activeNav === label ? " active" : ""}`}
              href="#"
              onClick={(e) => { e.preventDefault(); setActiveNav(label); }}
            >
              {icon}
              {label}
            </a>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="logout-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main-area">
        {/* Topbar */}
        <header className="topbar">
          <h1 className="topbar-title">Executive Overview</h1>
          <div className="topbar-actions">
            <div className="search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input type="text" placeholder="Search entries..." />
            </div>
            <div className="icon-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
            </div>
            <div className="avatar-btn">
              <svg className="avatar-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="content">

          {/* Stat cards */}
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                  </svg>
                </div>
                <span className="stat-badge">+4.2%</span>
              </div>
              <div className="stat-label">Total Expenses</div>
              <div className="stat-value">$42,850.00</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <span className="stat-badge neutral">Oct 2023</span>
              </div>
              <div className="stat-label">Total Entries</div>
              <div className="stat-value">1,284</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
                <span className="stat-badge negative">-2.1%</span>
              </div>
              <div className="stat-label">Average Expense</div>
              <div className="stat-value">$342.15</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <span className="stat-badge luxury">Luxury</span>
              </div>
              <div className="stat-label">Largest Transaction</div>
              <div className="stat-value smaller">$12,400.00</div>
            </div>
          </div>

          {/* Middle row */}
          <div className="middle-row">
            {/* Line chart */}
            <div className="chart-card">
              <div className="chart-header">
                <span className="chart-title">Monthly Expense Summary</span>
                <div className="chart-legend">
                  <div className="legend-item"><span className="legend-dot gold" />Current</div>
                  <div className="legend-item"><span className="legend-dot grey" />Previous</div>
                </div>
              </div>
              <div className="chart-area">
                <svg className="chart-svg" viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0.2, 0.5, 0.8].map((t) => (
                    <line key={t} x1="0" y1={t * chartH} x2={chartW} y2={t * chartH} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  ))}
                  {/* Previous (grey) */}
                  <path d={prevPath} fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Current area fill */}
                  <path
                    d={`${curPath} L ${chartW - 14} ${chartH} L 14 ${chartH} Z`}
                    fill="url(#goldFade)"
                    opacity="0.18"
                  />
                  {/* Current line */}
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
            </div>

            {/* Donut */}
            <div className="donut-card">
              <span className="chart-title">Category Donut</span>
              <div className="donut-wrapper">
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
                        <span className="donut-legend-dot" style={{ background: i === 2 ? "#3A3A4A" : item.color, opacity: i === 1 ? 0.55 : 1 }} />
                        {item.label}
                      </div>
                      <span className="donut-legend-pct">{item.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="bottom-row">
            {/* Weekly flow bar chart */}
            <div className="bar-chart-card">
              <span className="chart-title">Weekly Flow</span>
              <div className="bar-area">
                {BARS.map((b, i) => {
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
            </div>

            {/* Transactions */}
            <div className="transactions-card">
              <div className="txn-header">
                <span className="chart-title">Recent Transactions</span>
                <a href="#" className="txn-view-all">View All Ledger</a>
              </div>
              <div className="txn-list">
                {TXNS.map((txn, i) => (
                  <div className="txn-item" key={i}>
                    <div className="txn-icon">
                      <TxnIcon type={txn.icon} />
                    </div>
                    <div className="txn-info">
                      <div className="txn-name">{txn.name}</div>
                      <div className="txn-desc">{txn.desc}</div>
                    </div>
                    <div className="txn-amount-col">
                      <span className="txn-amount">{txn.amount}</span>
                      <span className="txn-date">{txn.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>{/* /content */}
      </div>{/* /main-area */}
    </div>
  );
}