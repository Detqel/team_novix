"use client";
import { useState, useMemo } from "react";
import "./dashboard.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

/* ── Category colors ── */
const CAT_COLORS = {
  Food: "#1D9E75", Transport: "#378ADD", Shopping: "#D4537E",
  Utilities: "#BA7517", Health: "#E24B4A", Entertainment: "#7F77DD",
  Rent: "#888780", Other: "#5DCAA5",
};

const CATEGORIES = ["Food", "Transport", "Shopping", "Utilities", "Health", "Entertainment", "Rent", "Other"];
const PAYMENT_MODES = ["UPI", "Cash", "Card", "Net Banking"];

const SAMPLE_EXPENSES = [
  { id: 1, desc: "Zomato order",       amount: 450,   cat: "Food",         date: "2026-06-01", mode: "UPI" },
  { id: 2, desc: "Ola cab",            amount: 280,   cat: "Transport",    date: "2026-06-02", mode: "UPI" },
  { id: 3, desc: "Electricity bill",   amount: 1850,  cat: "Utilities",    date: "2026-06-03", mode: "Net Banking" },
  { id: 4, desc: "Grocery – BigBasket",amount: 2340,  cat: "Food",         date: "2026-06-03", mode: "Card" },
  { id: 5, desc: "Monthly rent",       amount: 18000, cat: "Rent",         date: "2026-06-01", mode: "Net Banking" },
  { id: 6, desc: "Movie tickets",      amount: 680,   cat: "Entertainment",date: "2026-06-04", mode: "UPI" },
];

/* ── Rupee formatter ── */
const fmt = (n) =>
  "₹" + Math.round(n).toLocaleString("en-IN");

/* ── Today's date string ── */
const todayStr = () => new Date().toISOString().split("T")[0];

/* ═══════════════════════════════════════════
   DASHBOARD PAGE
══════════════════════════════════════════ */
export default function DashboardPage() {
  const [expenses, setExpenses] = useState(SAMPLE_EXPENSES);
  const [nextId, setNextId]     = useState(7);
  const [filterCat, setFilterCat]   = useState("All");
  const [filterMode, setFilterMode] = useState("All");
  const [search, setSearch]         = useState("");
  const [toast, setToast]           = useState("");

  /* form state */
  const [form, setForm] = useState({
    desc: "", amount: "", cat: "", date: todayStr(), mode: "UPI",
  });

  /* ── Filtered list ── */
  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      if (filterCat  !== "All" && e.cat  !== filterCat)  return false;
      if (filterMode !== "All" && e.mode !== filterMode) return false;
      if (search && !e.desc.toLowerCase().includes(search.toLowerCase()) &&
          !e.cat.toLowerCase().includes(search.toLowerCase()))            return false;
      return true;
    });
  }, [expenses, filterCat, filterMode, search]);

  /* ── Stats ── */
  const total    = filtered.reduce((s, e) => s + e.amount, 0);
  const avg      = filtered.length ? total / filtered.length : 0;
  const maxExp   = filtered.length ? filtered.reduce((a, b) => (a.amount > b.amount ? a : b)) : null;
  const now      = new Date();
  const monthExp = filtered.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthTotal = monthExp.reduce((s, e) => s + e.amount, 0);

  /* ── Category totals for bar chart ── */
  const catTotals = filtered.reduce((acc, e) => {
    acc[e.cat] = (acc[e.cat] || 0) + e.amount;
    return acc;
  }, {});
  const maxCat = Math.max(1, ...Object.values(catTotals));
  const sortedCats = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
  const topCat = sortedCats[0];

  /* ── Add expense ── */
  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.desc.trim())              return alert("Please enter a description.");
    if (!form.amount || +form.amount <= 0) return alert("Please enter a valid amount.");
    if (!form.cat)                      return alert("Please select a category.");
    if (!form.date)                     return alert("Please select a date.");

    setExpenses([{ id: nextId, ...form, amount: parseFloat(form.amount) }, ...expenses]);
    setNextId(nextId + 1);
    setForm({ desc: "", amount: "", cat: "", date: todayStr(), mode: "UPI" });
    showToast(`Expense added — ${fmt(parseFloat(form.amount))}`);
  };

  /* ── Delete ── */
  const handleDelete = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
    showToast("Expense removed");
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleLogout = () => { window.location.href = "/login"; };

  return (
    <div className="dashboard-layout">
      <Sidebar onLogout={handleLogout} />

      <div className="main-area">
        <Navbar
          title="Executive overview"
          searchValue={search}
          onSearch={(v) => setSearch(v)}
        />

        <div className="content">

          {/* ── Stats ── */}
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-label">Total expenses</div>
              <div className="stat-value">{fmt(total)}</div>
              <div className="stat-sub">{filtered.length} entries</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">This month</div>
              <div className="stat-value">{fmt(monthTotal)}</div>
              <div className="stat-sub">{now.toLocaleString("en-IN", { month: "long", year: "numeric" })}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Average per entry</div>
              <div className="stat-value">{fmt(avg)}</div>
              <div className="stat-sub">per transaction</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Largest expense</div>
              <div className="stat-value">{maxExp ? fmt(maxExp.amount) : "₹0"}</div>
              <div className="stat-sub">{maxExp ? maxExp.cat : "—"}</div>
            </div>
          </div>

          {/* ── Add form + Transactions ── */}
          <div className="middle-row">

            {/* Add expense form */}
            <div className="chart-card">
              <span className="chart-title">Add expense</span>
              <form onSubmit={handleAdd} className="expense-form">
                <div className="form-field full">
                  <label>Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Grocery shopping"
                    value={form.desc}
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  />
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Amount (₹)</label>
                    <div className="rupee-wrap">
                      <span className="rupee-sym">₹</span>
                      <input
                        type="number"
                        placeholder="0"
                        min="0"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Category</label>
                    <select value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })}>
                      <option value="">Select category</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label>Payment mode</label>
                    <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
                      {PAYMENT_MODES.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-add-expense">+ Add expense</button>
              </form>
            </div>

            {/* Transactions list */}
            <div className="transactions-card">
              <div className="txn-header">
                <span className="chart-title">Recent transactions</span>
                <span className="txn-count">{filtered.length} entries</span>
              </div>
              <div className="txn-list">
                {filtered.length === 0 ? (
                  <div className="empty-state">No expenses found</div>
                ) : (
                  filtered.slice(0, 8).map((exp) => (
                    <div className="txn-item" key={exp.id}>
                      <span
                        className="cat-dot"
                        style={{ background: CAT_COLORS[exp.cat] || "#888" }}
                      />
                      <div className="txn-info">
                        <div className="txn-name">{exp.desc}</div>
                        <div className="txn-desc">{exp.cat} · {exp.date} · {exp.mode}</div>
                      </div>
                      <span className="txn-amount">{fmt(exp.amount)}</span>
                      <button
                        className="txn-delete"
                        onClick={() => handleDelete(exp.id)}
                        aria-label={`Delete ${exp.desc}`}
                      >✕</button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* ── Category bars + Filters ── */}
          <div className="bottom-row">

            {/* Category bar chart */}
            <div className="bar-chart-card">
              <span className="chart-title">Spending by category</span>
              <div className="cat-bars">
                {sortedCats.length === 0 ? (
                  <div className="empty-state">Add expenses to see breakdown</div>
                ) : (
                  sortedCats.map(([cat, amt]) => (
                    <div className="cat-bar-row" key={cat}>
                      <span className="cat-bar-label">{cat}</span>
                      <div className="cat-bar-track">
                        <div
                          className="cat-bar-fill"
                          style={{
                            width: `${Math.round((amt / maxCat) * 100)}%`,
                            background: CAT_COLORS[cat] || "#888",
                          }}
                        />
                      </div>
                      <span className="cat-bar-amt">{fmt(amt)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Filters + summary */}
            <div className="transactions-card">
              <span className="chart-title">Filter by category</span>
              <div className="filter-tags">
                {["All", ...CATEGORIES].map((c) => (
                  <button
                    key={c}
                    className={`filter-tag${filterCat === c ? " active" : ""}`}
                    onClick={() => setFilterCat(c)}
                  >{c}</button>
                ))}
              </div>

              <span className="chart-title" style={{ marginTop: 16, display: "block" }}>Payment mode</span>
              <div className="filter-tags">
                {["All", ...PAYMENT_MODES].map((m) => (
                  <button
                    key={m}
                    className={`filter-tag${filterMode === m ? " active" : ""}`}
                    onClick={() => setFilterMode(m)}
                  >{m}</button>
                ))}
              </div>

              <div className="quick-summary">
                {topCat ? (
                  <>Top spend: <strong>{topCat[0]}</strong> at {fmt(topCat[1])}<br />
                  Total: <strong>{fmt(total)}</strong> across {filtered.length} entries</>
                ) : "No data yet."}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}