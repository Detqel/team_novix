"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import "./budget.css";

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



// ─── BUDGET PAGE ──────────────────────────────────────────────────────────────
export default function BudgetPage() {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const COLORS = [
      "#f0c060", "#60d0a0", "#60a8f0", "#c07af0",
      "#f08060", "#80d0f0", "#f0a0c0",
    ];
   


    let budgets = [
      { id: 1, name: "Food & Dining",   limit: 12000, spent: 4200 },
      { id: 2, name: "Transport",       limit: 4000,  spent: 1800 },
      { id: 3, name: "Entertainment",   limit: 3000,  spent: 2700 },
      { id: 4, name: "Utilities",       limit: 5000,  spent: 4900 },
      { id: 5, name: "Shopping",        limit: 8000,  spent: 2100 }, 
      { id: 6, name: "Health & Fitness",limit: 3000,  spent: 600  },
    ];

    const transactions = [
      { name: "Swiggy Order",    amount: 650,  cat: "Food & Dining" },
      { name: "Metro Card",      amount: 500,  cat: "Transport"     },
      { name: "Netflix",         amount: 499,  cat: "Entertainment" },
      { name: "Electricity Bill",amount: 1800, cat: "Utilities"     },
    ];

    document.getElementById("currentMonth").textContent =
      new Date()
        .toLocaleString("default", { month: "long", year: "numeric" })
        .toUpperCase();

    populateCategorySelect();
    render();

    function render() {
      renderKPIs();
      renderBudgetList();
      renderTransactions();
      renderDonut();
    }

    function renderKPIs() {
      const total  = budgets.reduce((s, b) => s + b.limit, 0);
      const spent  = budgets.reduce((s, b) => s + b.spent, 0);
      const remain = total - spent;
      const pct    = ((spent / total) * 100).toFixed(1);

      document.getElementById("kpiTotal").textContent   = fmt(total);
      document.getElementById("kpiSpent").textContent   = fmt(spent);
      document.getElementById("kpiRemain").textContent  = fmt(Math.abs(remain));
      document.getElementById("kpiSpentPct").textContent = `${pct}% of budget used`;
      document.getElementById("kpiRemainNote").textContent = remain < 0 ? "OVER BUDGET" : "budget left";
    }

    function renderBudgetList() {
      const el = document.getElementById("budgetList");
      el.innerHTML = budgets.map((b, i) => {
        const pct = Math.min((b.spent / b.limit) * 100, 100);
        const cls = pct >= 100 ? "over" : pct >= 80 ? "warn" : "";
        return `
          <div class="budget-item">
               <div class="budget-header">
              <div class="budget-name">${b.name}</div>
              <div class="budget-amounts"><strong>${fmt(b.spent)}</strong> / ${fmt(b.limit)}</div>
            </div>
            <div class="track">
              <div class="fill ${cls}" style="width:${pct}%;background:${cls ? "" : COLORS[i % COLORS.length]}"></div>
            </div>
            <div class="budget-pct">${pct.toFixed(0)}% used</div>
          </div>`;
      }).join("");
    }
  
    function renderTransactions() {
      const el = document.getElementById("txList");
      el.innerHTML = [...transactions].reverse().slice(0, 6).map(t => `
        <div class="tx">
          <div>
            <div>${t.name}</div>
            <div class="tx-cat">${t.cat}</div>
          </div>
          <div class="tx-amt">−${fmt(t.amount)}</div>
        </div>`).join("");
    }

    function renderDonut() {
      const canvas = document.getElementById("donut");
      const ctx    = canvas.getContext("2d");
      const W = canvas.width, H = canvas.height;
      const cx = W / 2, cy = H / 2;
      const R = W * 0.42, r = W * 0.26;
      const total = budgets.reduce((s, b) => s + b.spent, 0) || 1;

      ctx.clearRect(0, 0, W, H);
      let angle = -Math.PI / 2;
      budgets.forEach((b, i) => {
        const slice = (b.spent / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, R, angle, angle + slice);
        ctx.closePath();
        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.fill();
        angle += slice;
      });

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = "#151820";
      ctx.fill();

      const spent = budgets.reduce((s, b) => s + b.spent, 0);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(fmt(spent), cx, cy - 6);
      ctx.font = "9px monospace";
      ctx.fillStyle = "#999";
      ctx.fillText("SPENT", cx, cy + 9);

      const leg        = document.getElementById("legend");
      const totalSpent = budgets.reduce((s, b) => s + b.spent, 0) || 1;
      leg.innerHTML = budgets.map((b, i) => `
        <div class="legend-item">
          <div class="legend-dot" style="background:${COLORS[i % COLORS.length]}"></div>
          <div class="legend-label">${b.name}</div>
          <div class="legend-pct">${((b.spent / totalSpent) * 100).toFixed(0)}%</div>
        </div>`).join("");
    }

    window.addTransaction = function () {
      const name   = document.getElementById("txName").value.trim();
      const amount = parseFloat(document.getElementById("txAmount").value);
      const cat    = document.getElementById("txCat").value;
      if (!name || !amount || !cat) return;
      transactions.push({ name, amount, cat });
      const b = budgets.find(b => b.name === cat);
      if (b) b.spent += amount;
      document.getElementById("txName").value   = "";
      document.getElementById("txAmount").value = "";
      document.getElementById("txCat").value    = "";
      render();
    };

    function populateCategorySelect() {
      const sel = document.getElementById("txCat");
      budgets.forEach(b => {
        const opt = document.createElement("option");
        opt.value = opt.textContent = b.name;
        sel.appendChild(opt);
      });
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
          title="Budget Tracker"
          searchValue={searchValue}
          onSearch={setSearchValue}
        />

        {/* Page content */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <header>
            <h1>Budget <span>Tracker</span></h1>
            <div className="month-badge" id="currentMonth"></div>
          </header>

          <div className="kpi-row">
            <div className="kpi">
              <div className="kpi-label">Total Budget</div>
              <div className="kpi-value yellow" id="kpiTotal">₹0</div>
              <div className="kpi-sub">across all categories</div>
            </div>
            <div className="kpi green">
              <div className="kpi-label">Amount Spent</div>
              <div className="kpi-value green" id="kpiSpent">₹0</div>
              <div className="kpi-sub" id="kpiSpentPct">0% of budget used</div>
            </div>
            <div className="kpi red">
              <div className="kpi-label">Remaining</div>
              <div className="kpi-value red" id="kpiRemain">₹0</div>
              <div className="kpi-sub" id="kpiRemainNote">budget left</div>
            </div>
          </div>

          <div className="main-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="panel">
                <div className="panel-title">Category Budgets</div>
                <div className="budget-list" id="budgetList"></div>
              </div>

              <div className="panel">
                <div className="panel-title">Add Expense</div>
                <div className="add-form">
                  <input type="text" id="txName" placeholder="Description" />
                  <div className="form-row">
                    <input type="number" id="txAmount" placeholder="Amount (₹)" />
                    <select id="txCat">
                      <option value="">Select category</option>
                    </select>
                  </div>
                  <button className="btn"onClick={() => {
            if (typeof window !== "undefined" && window.addTransaction) {
                window.addTransaction();
                        }
                          }}
>
                         + Add Expense
                        </button>
                </div>
                <div className="panel-title" style={{ marginTop: "8px" }}>Recent Transactions</div>
                <div className="tx-list" id="txList"></div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-title">Spending Breakdown</div>
              <div className="chart-wrap">
                <canvas id="donut" width="200" height="200"></canvas>
                <div className="legend" id="legend"></div>
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