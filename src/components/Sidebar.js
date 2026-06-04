"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    label: "Expenses",
    href: "/expenses",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
  {
    label: "Budget",
    href: "/budget",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    label: "Subscriptions",
    href: "/subscriptions",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/>
        <line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
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

export default function Sidebar({ onLogout }) {
  const pathname = usePathname();

  return (
    <aside style={styles.sidebar}>
      {/* Brand */}
      <div style={styles.brand}>
        <div style={styles.brandIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
            <rect x="2" y="2" width="8" height="8" rx="1.5"/>
            <rect x="14" y="2" width="8" height="8" rx="1.5"/>
            <rect x="2" y="14" width="8" height="8" rx="1.5"/>
            <rect x="14" y="14" width="8" height="8" rx="1.5" opacity="0.4"/>
          </svg>
        </div>
        <div>
          <div style={styles.brandName}>Finance Ledger</div>
          <div style={styles.brandSub}>Prestige Private Banking</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={styles.nav}>
        {NAV_ITEMS.map(({ label, href, icon }) => {
          const isActive = pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={label}
              href={href}
              style={{
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {}),
              }}
            >
              <span style={{ ...styles.navIcon, ...(isActive ? styles.navIconActive : {}) }}>
                {icon}
              </span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={styles.bottom}>
        <button
          style={styles.logoutBtn}
          onClick={onLogout}
          onMouseEnter={e => {
            e.currentTarget.style.color = "#C8C6BE";
            e.currentTarget.style.background = "rgba(212,160,23,0.08)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = "#6E6D67";
            e.currentTarget.style.background = "none";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    minHeight: "100vh",
    background: "#141418",
    display: "flex",
    flexDirection: "column",
    padding: "24px 0 20px",
    flexShrink: 0,
    borderRight: "1px solid rgba(255,255,255,0.06)",
    fontFamily: "'Raleway', sans-serif",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "0 16px 22px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    marginBottom: "12px",
  },
  brandIcon: {
    width: "36px",
    height: "36px",
    background: "#D4A017",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 3px 12px rgba(212,160,23,0.3)",
  },
  brandName: {
    fontFamily: "'Cinzel', serif",
    fontSize: "13px",
    fontWeight: 700,
    color: "#D4A017",
    letterSpacing: "0.03em",
    lineHeight: 1.2,
  },
  brandSub: {
    fontSize: "9px",
    color: "#6E6D67",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginTop: "2px",
  },
  nav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    padding: "0 10px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "10px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 500,
    color: "#9E9D96",
    textDecoration: "none",
    transition: "background 0.18s, color 0.18s",
    cursor: "pointer",
  },
  navItemActive: {
    background: "rgba(212,160,23,0.12)",
    color: "#D4A017",
    fontWeight: 600,
  },
  navIcon: {
    display: "flex",
    alignItems: "center",
    opacity: 0.7,
    flexShrink: 0,
  },
  navIconActive: {
    opacity: 1,
  },
  bottom: {
    padding: "0 10px",
    marginTop: "12px",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "10px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 500,
    color: "#6E6D67",
    background: "none",
    border: "none",
    width: "100%",
    cursor: "pointer",
    fontFamily: "'Raleway', sans-serif",
    transition: "color 0.18s, background 0.18s",
    textAlign: "left",
  },
};