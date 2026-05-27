"use client";

import "./savings.css";

// ─── Circular Progress Component ──────────────────────────────────────────────
function CircularProgress({ percent }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="circular-progress">
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle className="track" cx="32" cy="32" r={radius} />
        <circle
          className="fill"
          cx="32"
          cy="32"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="label">{percent}%</span>
    </div>
  );
}

// ─── Goal Card Component ───────────────────────────────────────────────────────
function GoalCard({ icon, badge, badgeClass, name, percent, amount, deadline }) {
  return (
    <div className="goal-card">
      <div className="goal-card-header">
        <span className="goal-icon">{icon}</span>
        <span className={`goal-badge ${badgeClass}`}>{badge}</span>
      </div>
      <div className="goal-name">{name}</div>
      <div className="goal-body">
        <CircularProgress percent={percent} />
        <div className="goal-details">
          <div className="label">Target Amount</div>
          <div className="amount">{amount}</div>
          <div className="deadline">
            <span>📅</span>
            <span>{deadline}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Alert Item Component ──────────────────────────────────────────────────────
function AlertItem({ iconClass, icon, title, time, text }) {
  return (
    <div className="alert-item">
      <div className={`alert-icon-wrap ${iconClass}`}>{icon}</div>
      <div className="alert-content">
        <div className="alert-top">
          <span className="alert-title">{title}</span>
          <span className="alert-time">{time}</span>
        </div>
        <p className="alert-text">{text}</p>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function SavingsGoalsPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f0f0f" }}>
      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="brand-name">Finance Ledger</div>
          <div className="brand-sub">Prestige Private Banking</div>
        </div>

        <nav className="sidebar-nav">
          {[
            { icon: "⊞", label: "Dashboard", path: "#" },
            { icon: "↕", label: "Expenses", path: "#" },
            { icon: "⊟", label: "Budget", path: "#" },
            { icon: "↻", label: "Subscriptions", path: "#" },
            { icon: "◎", label: "Savings Goals", path: "#", active: true },
            { icon: "🔔", label: "Notifications", path: "#" },
            { icon: "⚙", label: "Settings", path: "#" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.path}
              className={`nav-item${item.active ? " active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">AS</div>
            <div className="user-info">
              <div className="user-name">Alexander Sterling</div>
              <div className="user-badge">Premium Member</div>
            </div>
          </div>
          <button className="logout-btn">
            <span>⤼</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="main-wrapper">
        <div className="main-content">
          {/* Top Bar */}
          <div className="topbar">
            <h1 className="topbar-title">Savings &amp; Alerts</h1>
            <div className="topbar-actions">
              <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Search wealth assets..." />
              </div>
              <button className="icon-btn">🔔</button>
              <button className="icon-btn">👤</button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="content-grid">
            {/* ── LEFT COLUMN ── */}
            <div>
              {/* Section Header */}
              <div className="section-header">
                <div>
                  <div className="section-title">Financial Milestones</div>
                  <div className="section-subtitle">
                    Your active wealth accumulation targets
                  </div>
                </div>
                <button className="btn-new-goal">
                  <span>+</span> New Goal
                </button>
              </div>

              {/* Goals Grid */}
              <div className="goals-grid">
                <GoalCard
                  icon="✈️"
                  badge="On Track"
                  badgeClass="badge-on-track"
                  name="Mediterranean Escape"
                  percent={75}
                  amount="$15,000"
                  deadline="Deadline: Aug 2024"
                />
                <GoalCard
                  icon="🚗"
                  badge="High Priority"
                  badgeClass="badge-high-priority"
                  name="Executive EV Upgrade"
                  percent={30}
                  amount="$85,000"
                  deadline="Deadline: Jan 2025"
                />
                <GoalCard
                  icon="🏢"
                  badge="Active"
                  badgeClass="badge-active"
                  name="Luxury Portfolio Expansion"
                  percent={50}
                  amount="$450,000"
                  deadline="Deadline: Dec 2026"
                />

                {/* New Milestone Card */}
                <div className="new-milestone-card">
                  <div className="plus-icon">⊕</div>
                  <div className="nm-title">Start New Milestone</div>
                  <div className="nm-sub">Scale your wealth today</div>
                </div>
              </div>

              {/* Aggregate Accumulation */}
              <div className="aggregate-section">
                <div className="aggregate-label">Aggregate Accumulation</div>
                <div className="aggregate-grid">
                  <div className="agg-item">
                    <div className="agg-title">Total Goal Value</div>
                    <div className="agg-value">$550,000</div>
                  </div>
                  <div className="agg-item">
                    <div className="agg-title">Currently Saved</div>
                    <div className="agg-value highlight">$285,450</div>
                  </div>
                  <div className="agg-item">
                    <div className="agg-title">Monthly Contribution</div>
                    <div className="agg-value">$12,500</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN — INTELLIGENCE PANEL ── */}
            <div className="intelligence-panel">
              <div className="panel-header">
                <div className="panel-title">Intelligence</div>
                <button className="mark-all-btn">Mark all read</button>
              </div>

              {/* Tabs */}
              <div className="tab-bar">
                <button className="tab-btn active">Alerts</button>
                <button className="tab-btn">Reminders</button>
              </div>

              {/* Alerts */}
              <div className="alerts-list">
                <AlertItem
                  iconClass="gold"
                  icon="📈"
                  title="Threshold Met"
                  time="2m ago"
                  text='Savings for "Mediterranean Escape" reached 75% of target amount.'
                />
                <AlertItem
                  iconClass="red"
                  icon="⚠"
                  title="Action Required"
                  time="4h ago"
                  text='Automated transfer of $5,000 for "Luxury EV" failed due to insufficient funds in Liquidity Account.'
                />
                <AlertItem
                  iconClass="orange"
                  icon="⏰"
                  title="Upcoming Deadline"
                  time="Yesterday"
                  text='"Mediterranean Escape" deadline is approaching in 14 days. Review your final allocation.'
                />
                <AlertItem
                  iconClass="blue"
                  icon="ℹ"
                  title="Interest Adjustment"
                  time="2d ago"
                  text="APY for your Private High-Yield Savings increased to 5.25%. Your goals will mature 4% faster."
                />
              </div>

              {/* Premium Badge */}
              <div className="premium-badge">
                <span className="badge-icon">🏆</span>
                <div>
                  <div className="badge-text">Schedule Consultation Achieved</div>
                  <div className="badge-sub">Gold Badge awarded for 12...</div>
                </div>
                <button className="close-btn">✕</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}