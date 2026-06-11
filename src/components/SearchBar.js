"use client";
import { useState } from "react";

export default function SearchBar({ searchValue = "", onSearch }) {
  const [query, setQuery] = useState(searchValue);

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div style={s.wrap}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="#6E6D67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ flexShrink: 0 }}>
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        type="text"
        placeholder="Search entries..."
        value={query}
        onChange={handleChange}
        style={s.input}
      />
    </div>
  );
}

const s = {
  wrap: {
    display: "flex", alignItems: "center", background: "#1A1A20",
    border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px",
    padding: "8px 12px", gap: "8px", width: "200px",
  },
  input: {
    background: "none", border: "none", outline: "none",
    fontFamily: "'Raleway', sans-serif", fontSize: "12px",
    color: "#C8C6BE", width: "100%",
  },
};