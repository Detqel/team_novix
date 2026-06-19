"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import "./subscription.css";

// ─── NAV ITEMS ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    label: "Expenses",
    href: "/expenses",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
  {
    label: "Budget",
    href: "/budget",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    label: "Subscriptions",
    href: "/subscription",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
  },
  {
    label: "Savings Goals",
    href: "/savings",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M2 12h2M20 12h2M17.66 17.66l-1.41-1.41M6.34 17.66l1.41-1.41"/>
      </svg>
    ),
  },
];



// ─── SUBSCRIPTION PAGE ────────────────────────────────────────────────────────
export default function SubscriptionPage() {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    let subs = [
      { id: 1, name: "Netflix",    icon: "🎬", amount: 499, cat: "Entertainment", cycle: "monthly", day: 5,  status: "active" },
      { id: 2, name: "Spotify",    icon: "🎵", amount: 119, cat: "Music",         cycle: "monthly", day: 10, status: "active" },
      { id: 3, name: "Google One", icon: "☁️", amount: 130, cat: "Cloud Storage", cycle: "monthly", day: 15, status: "active" },
      { id: 4, name: "Notion",     icon: "📝", amount: 160, cat: "Productivity",  cycle: "monthly", day: 20, status: "active" },
    ];

    let nextId = 5;
    const today = new Date().getDate();

    render();

    function render() {
      renderKPIs();
      renderSubs();
      renderCategories();
      renderNextRenewal();
    }

    function renderKPIs() {
      const active  = subs.filter(s => s.status === "active");
      const paused  = subs.filter(s => s.status !== "active");
      const monthly = active.reduce((s, b) => s + toMonthly(b), 0);

      document.getElementById("kpiMonthly").textContent = fmt(monthly);
      document.getElementById("kpiAnnual").textContent  = fmt(monthly * 12);
      document.getElementById("kpiActive").textContent  = active.length;
      document.getElementById("kpiPaused").textContent  = paused.length;
    }

    function renderSubs() {
      const grid   = document.getElementById("subGrid");
      const sorted = [...subs].sort((a, b) => daysUntil(a.day) - daysUntil(b.day));

      grid.innerHTML = sorted.map(s => {
        const days     = daysUntil(s.day);
        const soon     = days <= 5;
        const pillCls  = s.status === "paused" ? "paused" : s.status === "trial" ? "trial" : "active";
        const pillTxt  = s.status.charAt(0).toUpperCase() + s.status.slice(1);
        const renewTxt = days === 0 ? "Today" : days === 1 ? "Tomorrow" : `in ${days}d`;

        return `
          <div class="sub-card">
            <div class="sub-icon">${s.icon}</div>
            <div class="sub-info">
              <div class="sub-name">${s.name} <span class="pill ${pillCls}">${pillTxt}</span></div>
              <div class="sub-meta">${s.cat} · ${s.cycle}</div>
            </div>
            <div class="sub-renewal">
              <strong class="${soon ? "renewal-soon" : ""}">${renewTxt}</strong>
              day ${s.day}
            </div>
            <div class="sub-amount">
              <div class="price">${fmt(s.amount)}</div>
              <span class="period">/mo</span>
            </div>
          </div>`;
      }).join("");
    }

    function renderCategories() {
      const active = subs.filter(s => s.status === "active");
      const total  = active.reduce((s, b) => s + toMonthly(b), 0) || 1;
      const map    = {};

      active.forEach(s => { map[s.cat] = (map[s.cat] || 0) + toMonthly(s); });

      const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
      const el     = document.getElementById("catList");

      el.innerHTML = sorted.map(([cat, amt]) => `
        <div>
          <div class="cat-row">
            <span class="cat-name">${cat}</span>
            <span class="cat-amt">${fmt(amt)}</span>
          </div>
          <div class="cat-bar-wrap">
            <div class="cat-bar" style="width:${((amt / total) * 100).toFixed(0)}%"></div>
          </div>
        </div>`).join("");
    }

    function renderNextRenewal() {
      const next = [...subs]
        .filter(s => s.status === "active")
        .sort((a, b) => daysUntil(a.day) - daysUntil(b.day))[0];

      if (!next) return;

      const days = daysUntil(next.day);
      document.getElementById("nextRenewal").textContent =
        `${next.name} — ${days === 0 ? "Today" : days === 1 ? "Tomorrow" : `in ${days} days`}`;
    }

    window.addSub = function () {
      const name   = document.getElementById("sName").value.trim();
      const icon   = document.getElementById("sIcon").value.trim() || "📦";
      const amount = parseFloat(document.getElementById("sAmount").value);
      const cat    = document.getElementById("sCat").value;
      const cycle  = document.getElementById("sCycle").value;
      const day    = parseInt(document.getElementById("sDay").value) || today;

      if (!name || !amount) return;

      subs.push({ id: nextId++, name, icon, amount, cat, cycle, day, status: "active" });

      document.getElementById("sName").value   = "";
      document.getElementById("sIcon").value   = "";
      document.getElementById("sAmount").value = "";
      document.getElementById("sDay").value    = "";

      render();
    };

    function toMonthly(s) {
      if (s.cycle === "annual") return s.amount / 12;
      if (s.cycle === "weekly") return s.amount * 4.33;
      return s.amount;
    }

    function daysUntil(day) {
      const now = new Date();
      let d = new Date(now.getFullYear(), now.getMonth(), day);
      if (d <= now) d = new Date(now.getFullYear(), now.getMonth() + 1, day);
      return Math.ceil((d - now) / 86400000);
    }

    function fmt(n) {
      return "₹" + Math.round(n).toLocaleString("en-IN");
    }
  }, []);

  const handleLogout = () => {
    // handle logout
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0E0E12" }}>
      <Sidebar onLogout={handleLogout} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Navbar
          title="My Subscriptions"
          searchValue={searchValue}
          onSearch={setSearchValue}
        />

        {/* Page content */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <header>
            <h1>My <em>Subscriptions</em></h1>
            <div className="header-meta">
              <div className="next-renewal">
                Next Renewal
                <strong id="nextRenewal">—</strong>
              </div>
            </div>
          </header>

          <div className="summary-strip">
            <div className="strip-item">
              <div className="strip-label">Monthly Total</div>
              <div className="strip-value blue" id="kpiMonthly">₹0</div>
            </div>
            <div className="strip-item">
              <div className="strip-label">Annual Cost</div>
              <div className="strip-value red" id="kpiAnnual">₹0</div>
            </div>
            <div className="strip-item">
              <div className="strip-label">Active Plans</div>
              <div className="strip-value green" id="kpiActive">0</div>
            </div>
            <div className="strip-item">
              <div className="strip-label">Paused / Trial</div>
              <div className="strip-value" id="kpiPaused">0</div>
            </div>
          </div>

          <div className="layout">
            <div>
              <div className="sub-grid" id="subGrid"></div>
            </div>

            <div className="sidebar">
              <div className="panel">
                <div className="panel-title">Add Subscription</div>

                <div className="form-group">
                  <label className="form-label">Service Name</label>
                  <input type="text" id="sName" placeholder="Spotify" />
                </div>
                <div className="form-group">
                  <label className="form-label">Icon / Emoji</label>
                  <input type="text" id="sIcon" placeholder="🎵" />
                </div>
                <div className="form-group">
                  <label className="form-label">Amount</label>
                  <input type="number" id="sAmount" placeholder="119" />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select id="sCat">
                    <option>Entertainment</option>
                    <option>Productivity</option>
                    <option>Health</option>
                    <option>Music</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Billing Cycle</label>
                  <select id="sCycle">
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Renewal Day</label>
                  <input type="number" id="sDay" />
                </div>

                <button className="btn" onClick={() => window.addSub()}>
                  + Add Subscription
                </button>
              </div>

              <div className="panel">
                <div className="panel-title">By Category</div>
                <div className="cat-list" id="catList"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const sidebarStyles = {
  sidebar: {
    width: "200px", minHeight: "100vh", background: "#141418",
    display: "flex", flexDirection: "column", padding: "24px 0 20px",
    flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.06)",
    fontFamily: "'Raleway', sans-serif",
  },
  brand: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "0 16px 22px", borderBottom: "1px solid rgba(255,255,255,0.06)",
    marginBottom: "12px",
  },
  brandIcon: {
    width: "36px", height: "36px", background: "#D4A017", borderRadius: "8px",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, boxShadow: "0 3px 12px rgba(212,160,23,0.3)",
  },
  brandName: {
    fontFamily: "'Cinzel', serif", fontSize: "13px", fontWeight: 700,
    color: "#D4A017", letterSpacing: "0.03em", lineHeight: 1.2,
  },
  brandSub: {
    fontSize: "9px", color: "#6E6D67", letterSpacing: "0.08em",
    textTransform: "uppercase", marginTop: "2px",
  },
  nav: { flex: 1, display: "flex", flexDirection: "column", gap: "2px", padding: "0 10px" },
  navItem: {
    display: "flex", alignItems: "center", gap: "9px", padding: "10px 12px",
    borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: "#9E9D96",
    textDecoration: "none", transition: "background 0.18s, color 0.18s", cursor: "pointer",
  },
  navItemActive: { background: "rgba(212,160,23,0.12)", color: "#D4A017", fontWeight: 600 },
  navIcon: { display: "flex", alignItems: "center", opacity: 0.7, flexShrink: 0 },
  navIconActive: { opacity: 1 },
  bottom: { padding: "0 10px", marginTop: "12px" },
  logoutBtn: {
    display: "flex", alignItems: "center", gap: "9px", padding: "10px 12px",
    borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: "#6E6D67",
    background: "none", border: "none", width: "100%", cursor: "pointer",
    fontFamily: "'Raleway', sans-serif", transition: "color 0.18s, background 0.18s",
    textAlign: "left",
  },
};

const navbarStyles = {
  topbar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 24px 14px", flexShrink: 0, background: "#0E0E12",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    fontFamily: "'Raleway', sans-serif", position: "relative", zIndex: 100,
  },
  title: {
    fontFamily: "'Cinzel', serif", fontSize: "18px",
    fontWeight: 700, color: "#D4A017", letterSpacing: "0.04em", margin: 0,
  },
  actions: { display: "flex", alignItems: "center", gap: "10px" },
  searchWrap: {
    display: "flex", alignItems: "center", gap: "8px",
    background: "#1A1A20", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px", padding: "7px 12px",
  },
  searchInput: {
    background: "none", border: "none", outline: "none",
    color: "#C8C6BE", fontSize: "13px", width: "160px",
    fontFamily: "'Raleway', sans-serif",
  },
  iconBtn: {
    background: "#1A1A20", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px", padding: "8px", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  avatar: {
    width: "34px", height: "34px", borderRadius: "50%",
    background: "linear-gradient(135deg, #D4A017, #8B6914)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "12px", fontWeight: 700, color: "#fff",
    fontFamily: "'Cinzel', serif", cursor: "pointer",
  },
};