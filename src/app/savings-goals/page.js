"use client";

import "./savings.css";
import Sidebar from "../../components/Sidebar";
import Navbar  from "../../components/Navbar";

// ── Rupee formatter ──────────────────────────────────────────────────────────
const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,   // goals look cleaner without decimals
  }).format(value);

// ─── Circular Progress ────────────────────────────────────────────────────────
function CircularProgress({ percent }) {
  const radius        = 26;
  const circumference = 2 * Math.PI * radius;
  const offset        = circumference - (percent / 100) * circumference;
  return (
    <div className="circular-progress">
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle className="track" cx="32" cy="32" r={radius} />
        <circle className="fill"  cx="32" cy="32" r={radius}
          strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <span className="label">{percent}%</span>
    </div>
  );
}

// ─── Goal Card ────────────────────────────────────────────────────────────────
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
          <div className="amount">{formatINR(amount)}</div>   {/* ← ₹ formatted */}
          <div className="deadline"><span>📅</span><span>{deadline}</span></div>
        </div>
      </div>
    </div>
  );
}

// ─── Alert Item ───────────────────────────────────────────────────────────────
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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SavingsGoalsPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f0f0f" }}>

      <Sidebar />

      <div className="main-wrapper">
        <div className="main-content">

          <Navbar title="Savings & Alerts" />

          <div className="content-grid">

            {/* ── LEFT COLUMN ── */}
            <div>
              <div className="section-header">
                <div>
                  <div className="section-title">Financial Milestones</div>
                  <div className="section-subtitle">Your active wealth accumulation targets</div>
                </div>
                <button className="btn-new-goal"><span>+</span> New Goal</button>
              </div>

              <div className="goals-grid">
                {/* amounts passed as numbers so formatINR works correctly */}
                <GoalCard icon="✈️" badge="On Track"      badgeClass="badge-on-track"      name="Mediterranean Escape"      percent={75} amount={1250000}  deadline="Deadline: Aug 2024" />
                <GoalCard icon="🚗" badge="High Priority" badgeClass="badge-high-priority"  name="Executive EV Upgrade"      percent={30} amount={7080000}  deadline="Deadline: Jan 2025" />
                <GoalCard icon="🏢" badge="Active"        badgeClass="badge-active"         name="Luxury Portfolio Expansion" percent={50} amount={37500000} deadline="Deadline: Dec 2026" />
                <div className="new-milestone-card">
                  <div className="plus-icon">⊕</div>
                  <div className="nm-title">Start New Milestone</div>
                  <div className="nm-sub">Scale your wealth today</div>
                </div>
              </div>

              {/* Aggregate section — all values in ₹ */}
              <div className="aggregate-section">
                <div className="aggregate-label">Aggregate Accumulation</div>
                <div className="aggregate-grid">
                  <div className="agg-item">
                    <div className="agg-title">Total Goal Value</div>
                    <div className="agg-value">{formatINR(45800000)}</div>       {/* ₹4,58,00,000 */}
                  </div>
                  <div className="agg-item">
                    <div className="agg-title">Currently Saved</div>
                    <div className="agg-value highlight">{formatINR(23770000)}</div> {/* ₹2,37,70,000 */}
                  </div>
                  <div className="agg-item">
                    <div className="agg-title">Monthly Contribution</div>
                    <div className="agg-value">{formatINR(1041500)}</div>        {/* ₹10,41,500 */}
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="intelligence-panel">
              <div className="panel-header">
                <div className="panel-title">Intelligence</div>
                <button className="mark-all-btn">Mark all read</button>
              </div>
              <div className="tab-bar">
                <button className="tab-btn active">Alerts</button>
                <button className="tab-btn">Reminders</button>
              </div>
              <div className="alerts-list">
                <AlertItem iconClass="gold"   icon="📈" title="Threshold Met"       time="2m ago"    text='Savings for "Mediterranean Escape" reached 75% of target amount.' />
                <AlertItem iconClass="red"    icon="⚠"  title="Action Required"     time="4h ago"    text='Automated transfer of ₹4,16,500 for "Luxury EV" failed due to insufficient funds.' />
                <AlertItem iconClass="orange" icon="⏰" title="Upcoming Deadline"   time="Yesterday" text='"Mediterranean Escape" deadline is approaching in 14 days.' />
                <AlertItem iconClass="blue"   icon="ℹ"  title="Interest Adjustment" time="2d ago"    text="APY for your Private High-Yield Savings increased to 5.25%. Your goals will mature 4% faster." />
              </div>
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