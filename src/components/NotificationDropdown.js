"use client";
import { useState, useRef, useEffect } from "react";

const NOTIFICATIONS = [
  { id: 1, title: "Rent due in 3 days",    desc: "₹18,000 due on Jun 7",       time: "Just now",  unread: true  },
  { id: 2, title: "Budget limit reached",  desc: "Food category hit ₹5,000",   time: "2h ago",    unread: true  },
  { id: 3, title: "New expense added",     desc: "Zomato order — ₹450",        time: "5h ago",    unread: false },
  { id: 4, title: "Monthly report ready",  desc: "May 2026 summary available", time: "Yesterday", unread: false },
];

export default function NotificationDropdown() {
  const [bellOpen, setBellOpen]    = useState(false);
  const [notifications, setNotifs] = useState(NOTIFICATIONS);
  const bellRef                    = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target))
        setBellOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));

  const dismiss = (id) =>
    setNotifs((prev) => prev.filter((n) => n.id !== id));

  return (
    <div ref={bellRef} style={{ position: "relative" }}>
      <button
        style={s.iconBtn}
        onClick={() => setBellOpen((o) => !o)}
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke={bellOpen ? "#D4A017" : "#9E9D96"} strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 01-3.46 0"/>
        </svg>
        {unreadCount > 0 && <span style={s.badge}>{unreadCount}</span>}
      </button>

      {bellOpen && (
        <div style={s.dropdown}>
          <div style={s.dropHeader}>
            <span style={s.dropTitle}>Notifications</span>
            {unreadCount > 0 && (
              <button style={s.markAllBtn} onClick={markAllRead}>
                Mark all read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div style={s.emptyState}>No notifications</div>
          ) : (
            notifications.map((n) => (
              <div key={n.id} style={{ ...s.notifItem, ...(n.unread ? s.notifUnread : {}) }}>
                <div style={s.notifDot}>
                  {n.unread && <span style={s.unreadDot} />}
                </div>
                <div style={s.notifBody}>
                  <div style={s.notifTitle}>{n.title}</div>
                  <div style={s.notifDesc}>{n.desc}</div>
                  <div style={s.notifTime}>{n.time}</div>
                </div>
                <button style={s.dismissBtn} onClick={() => dismiss(n.id)} aria-label="Dismiss">
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const s = {
 iconBtn: {
  width: "34px", height: "34px", borderRadius: "8px", background: "#1A1A20",
  border: "1px solid rgba(255,255,255,0.06)", display: "flex",
  alignItems: "center", justifyContent: "center",
  cursor: "pointer", position: "relative", transition: "background 0.18s",
  flexShrink: 0,   // ← add
  outline: "none", // ← add
},
  badge: {
    position: "absolute", top: "4px", right: "4px",
    width: "14px", height: "14px", borderRadius: "50%",
    background: "#D4A017", color: "#1A1400",
    fontSize: "9px", fontWeight: 700, display: "flex",
    alignItems: "center", justifyContent: "center", lineHeight: 1,
  },
  dropdown: {
    position: "absolute", top: "calc(100% + 10px)", right: 0,
    width: "300px", background: "#1A1A20",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px",
    boxShadow: "0 16px 48px rgba(0,0,0,0.4)", overflow: "hidden", zIndex: 200,
  },
  dropHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 16px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  dropTitle: {
    fontFamily: "'Cinzel', serif", fontSize: "13px", fontWeight: 600, color: "#fff",
  },
  markAllBtn: {
    background: "none", border: "none", cursor: "pointer",
    fontSize: "11px", color: "#D4A017",
    fontFamily: "'Raleway', sans-serif", fontWeight: 600, padding: 0,
  },
  notifItem: {
    display: "flex", alignItems: "flex-start", gap: "10px",
    padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)",
    transition: "background 0.15s",
  },
  notifUnread: { background: "rgba(212,160,23,0.05)" },
  notifDot: { width: "16px", flexShrink: 0, paddingTop: "3px" },
  unreadDot: {
    display: "block", width: "7px", height: "7px",
    borderRadius: "50%", background: "#D4A017",
  },
  notifBody: { flex: 1, minWidth: 0 },
  notifTitle: { fontSize: "12px", fontWeight: 600, color: "#fff", marginBottom: "2px" },
  notifDesc:  { fontSize: "11px", color: "#9E9D96", marginBottom: "3px" },
  notifTime:  { fontSize: "10px", color: "#6E6D67" },
  dismissBtn: {
    background: "none", border: "none", cursor: "pointer",
    color: "#6E6D67", fontSize: "11px", padding: "2px 4px",
    borderRadius: "4px", flexShrink: 0, transition: "color 0.15s",
  },
  emptyState: {
    padding: "24px 16px", textAlign: "center", fontSize: "13px", color: "#6E6D67",
  },
};