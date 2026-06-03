"use client";
import { useState } from "react";

export default function Navbar({ title = "Executive Overview" }) {
  const [query, setQuery] = useState("");

  return (
    <header style={styles.topbar}>
      {/* Page title */}
      <h1 style={styles.title}>{title}</h1>

      {/* Right actions */}
      <div style={styles.actions}>
        {/* Search */}
        <div style={styles.searchBox}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6E6D67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search entries..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Bell */}
        <NotifButton />

        {/* Avatar */}
        <AvatarButton />
      </div>
    </header>
  );
}

function NotifButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{ ...styles.iconBtn, ...(hovered ? styles.iconBtnHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Notifications"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={hovered ? "#D4A017" : "#9E9D96"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
    </button>
  );
}

function AvatarButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{ ...styles.avatarBtn, ...(hovered ? styles.avatarBtnHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Profile"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    </button>
  );
}

const styles = {
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 28px 14px",
    flexShrink: 0,
    fontFamily: "'Raleway', sans-serif",
    background: "#0E0E12",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  title: {
    fontFamily: "'Cinzel', serif",
    fontSize: "20px",
    fontWeight: 700,
    color: "#D4A017",
    letterSpacing: "0.04em",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    background: "#1A1A20",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "8px",
    padding: "8px 12px",
    gap: "8px",
    width: "200px",
  },
  searchInput: {
    background: "none",
    border: "none",
    outline: "none",
    fontFamily: "'Raleway', sans-serif",
    fontSize: "12px",
    color: "#C8C6BE",
    width: "100%",
  },
  iconBtn: {
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    background: "#1A1A20",
    border: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.18s",
  },
  iconBtnHover: {
    background: "rgba(212,160,23,0.08)",
  },
  avatarBtn: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3A3A4A, #2A2A38)",
    border: "2px solid #D4A017",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "box-shadow 0.18s",
  },
  avatarBtnHover: {
    boxShadow: "0 0 0 3px rgba(212,160,23,0.2)",
  },
};