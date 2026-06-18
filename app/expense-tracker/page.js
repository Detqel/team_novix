"use client";

"use client";

import { useState, useEffect } from "react";
import "./expense.css";

const sampleTransactions = [
  { id: 1, name: "Whole Foods Market", icon: "🛒", category: "Groceries", date: "Oct 24, 2023", amount: 245.50 },
  { id: 2, name: "Emirates – Business Class", icon: "✈️", category: "Transport", date: "Oct 22, 2023", amount: 4820.00 },
  { id: 3, name: "Harvard Online Ed", icon: "🎓", category: "Education", date: "Oct 19, 2023", amount: 1200.00 },
  { id: 4, name: "Michelin Dinner", icon: "🍽️", category: "Fine Dining", date: "Oct 17, 2023", amount: 620.00 },
  { id: 5, name: "Apple Store", icon: "💻", category: "Electronics", date: "Oct 15, 2023", amount: 1999.00 },
  { id: 6, name: "Gym Membership", icon: "💪", category: "Health", date: "Oct 12, 2023", amount: 150.00 },
  { id: 7, name: "Amazon Prime", icon: "📦", category: "Subscriptions", date: "Oct 10, 2023", amount: 14.99 },
  { id: 8, name: "Uber Eats", icon: "🍕", category: "Food", date: "Oct 8, 2023", amount: 45.75 },
  { id: 9, name: "Netflix", icon: "🎬", category: "Subscriptions", date: "Oct 5, 2023", amount: 15.99 },
  { id: 10, name: "Pharmacy", icon: "💊", category: "Health", date: "Oct 2, 2023", amount: 89.30 },
];

const categories = ["Food", "Transport", "Groceries", "Fine Dining", "Education", "Electronics", "Health", "Subscriptions", "Entertainment", "Other"];

const ITEMS_PER_PAGE = 3;

export default function ExpensePage() {
 const [transactions, setTransactions] = useState([]);
  useEffect(() => {
  fetch("http://localhost:5000/expenses")
    .then((res) => res.json())
    .then((data) => {
      const formatted = data.map((item) => ({
        id: item.id,
        name: item.description,
        icon: "💳",
        category: item.category,
        date: new Date(item.expense_date).toLocaleDateString(),
        amount: parseFloat(item.amount),
      }));

      setTransactions(formatted);
    })
    .catch((err) => console.error(err));
}, []);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Food");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeNav, setActiveNav] = useState("Expenses");
  const [searchQuery, setSearchQuery] = useState("");

  const totalSpending = transactions.reduce((sum, t) => sum + t.amount, 0);

  const topCategoryName = (() => {
    const counts = {};
    transactions.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + t.amount;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  })();

  const filteredTransactions = transactions.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

 const handleAddExpense = async () => {
  if (!title || !amount || !date) return;

  try {
    const response = await fetch("http://127.0.0.1:5000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: title,
        amount: parseFloat(amount),
        category,
        expense_date: date,
        payment_mode: "UPI",
      }),
    });

    console.log(await response.json());

    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};
  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const navItems = [
    { name: "Dashboard", icon: "▣" },
    { name: "Expenses", icon: "💳" },
    { name: "Budget", icon: "📊" },
    { name: "Subscriptions", icon: "🔄" },
    { name: "Savings Goals", icon: "🎯" },
    { name: "Notifications", icon: "🔔" },
  ];

  return (
    <div className="app-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-title">Finance Ledger</span>
          <span className="logo-sub">PRESTIGE PRIVATE BANKING</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activeNav === item.name ? "active" : ""}`}
              onClick={() => setActiveNav(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item">⚙ Settings</button>
          <button className="nav-item">⎋ Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <div className="topbar">
          <h1 className="page-title">Expenses</h1>
          <div className="topbar-right">
            <div className="search-box">
              <input
                type="text"
                placeholder="Global search..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
              <span className="search-icon">🔍</span>
            </div>
            <button className="icon-btn">🔔</button>
            <div className="avatar">JD</div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Record Expense Card */}
          <div className="card record-card">
            <div className="card-header">
              <h2>Record Expense</h2>
              <span className="card-icon">🧾</span>
            </div>

            <label className="field-label">EXPENSE TITLE</label>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="e.g., Michelin Dinner"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-input"
              />
              <span className="input-icon">🎙</span>
            </div>

            <div className="row-fields">
              <div className="field-group">
                <label className="field-label">AMOUNT</label>
                <div className="input-wrapper">
                  <span className="prefix">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-input prefixed"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="field-group">
                <label className="field-label">DATE</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="text-input date-input"
                />
              </div>
            </div>

            <label className="field-label">CATEGORY</label>
            <div className="select-wrapper">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="select-input">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span className="select-arrow">▼</span>
            </div>

            <button className="add-btn" onClick={handleAddExpense}>
              Add Expense <span>⊕</span>
            </button>
          </div>

          {/* Stats Panel */}
          <div className="stats-panel">
            <div className="stat-cards-row">
              {/* Monthly Spending */}
              <div className="stat-card">
                <span className="stat-label">MONTHLY SPENDING</span>
                <span className="stat-value">
                  ${totalSpending.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  <span className="stat-arrow up">↑</span>
                </span>
              </div>

              {/* Top Category */}
              <div className="stat-card">
                <span className="stat-label">TOP CATEGORY</span>
                <div className="stat-category">
                  <span className="cat-icon">🍽️</span>
                  <span className="stat-value small">{topCategoryName}</span>
                </div>
              </div>

              {/* Wallet Status */}
              <div className="stat-card">
                <span className="stat-label">WALLET STATUS</span>
                <span className="stat-value wallet-status">
                  Secure <span className="status-dot green"></span>
                </span>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="transactions-card">
              <div className="transactions-header">
                <h2>Recent Transactions</h2>
                <div className="transactions-actions">
                  <button className="icon-btn small">⇅</button>
                  <button className="icon-btn small">⬇</button>
                </div>
              </div>

              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>EXPENSE</th>
                    <th>CATEGORY</th>
                    <th>DATE</th>
                    <th>AMOUNT</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((t) => (
                    <tr key={t.id}>
                      <td>
                        <div className="expense-name">
                          <span className="expense-icon">{t.icon}</span>
                          <span>{t.name}</span>
                        </div>
                      </td>
                      <td><span className="category-badge">{t.category}</span></td>
                      <td className="date-cell">{t.date}</td>
                      <td className="amount-cell">${t.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                      <td>
                        <button className="delete-btn" onClick={() => handleDelete(t.id)}>🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="pagination">
                <span className="pagination-info">
                  Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredTransactions.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredTransactions.length)} of {filteredTransactions.length} entries
                </span>
                <div className="pagination-controls">
                  <button
                    className="page-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >‹</button>
                  {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`page-btn ${currentPage === page ? "active" : ""}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >›</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}