"use client";

export default function ProfileAvatar() {
  return (
    <button style={s.avatarBtn} aria-label="Profile">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="#D4A017" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    </button>
  );
}

const s = {
  avatarBtn: {
    width: "34px", height: "34px", borderRadius: "50%",
    background: "linear-gradient(135deg, #3A3A4A, #2A2A38)",
    border: "2px solid #D4A017", display: "flex",
    alignItems: "center", justifyContent: "center", cursor: "pointer",
  },
};