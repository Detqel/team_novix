"use client";
import SearchBar            from "./SearchBar";
import NotificationDropdown from "./NotificationDropdown";
import ProfileAvatar        from "./ProfileAvatar";

export default function Navbar({ title = "Executive Overview", searchValue = "", onSearch }) {
  return (
    <header style={s.topbar}>
      <h1 style={s.title}>{title}</h1>

      <div style={s.actions}>
        <SearchBar searchValue={searchValue} onSearch={onSearch} />
        <NotificationDropdown />
        <ProfileAvatar />
      </div>
    </header>
  );
}

const s = {
  topbar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 24px 14px", flexShrink: 0, background: "#0E0E12",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    fontFamily: "'Raleway', sans-serif", position: "relative", zIndex: 100,
  },
  title: {
    fontFamily: "'Cinzel', serif", fontSize: "18px",
    fontWeight: 700, color: "#D4A017", letterSpacing: "0.04em",
  },
  actions: { display: "flex", alignItems: "center", gap: "10px" },
};