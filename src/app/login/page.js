"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [errors, setErrors]     = useState({});

  const validate = () => {
    const e = {};
    if (!email)                           e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email    = "Enter a valid email";
    if (!password)                        e.password = "Password is required";
    else if (password.length < 6)         e.password = "Minimum 6 characters";
    return e;
  };

const handleSubmit = () => {
  console.log("LOGIN CLICKED");

  const errs = validate();

  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  router.push("/dashboard");
};

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div style={s.page}>
      <LeftPanel />
      <div style={s.right}>
        <div style={s.card}>

          <div style={s.cardHead}>
            <div style={s.cardTitle}>Welcome back</div>
            <div style={s.cardSub}>Sign in to your Finance Ledger account</div>
          </div>

          {errors.general && (
            <div style={s.generalError}>{errors.general}</div>
          )}

          <Field
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(v) => { setEmail(v); setErrors((p) => ({ ...p, email: "" })); }}
            onKeyDown={handleKey}
            error={errors.email}
            rightIcon={<EmailIcon />}
          />

          <Field
            label="Password"
            type={showPw ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(v) => { setPassword(v); setErrors((p) => ({ ...p, password: "" })); }}
            onKeyDown={handleKey}
            error={errors.password}
            rightIcon={
              <button style={s.eyeBtn} onClick={() => setShowPw((p) => !p)} type="button">
                {showPw ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          />

          <div style={s.row}>
            <label style={s.rememberWrap}>
              <span style={s.checkBox} />
              <span style={s.rememberLabel}>Remember me</span>
            </label>
            <a href="#" style={s.forgotLink}>Forgot password?</a>
          </div>

          <button
            type="button"
            style={{ ...s.submitBtn, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Sign In →"}
          </button>

          <div style={s.divider}>
            <div style={s.dividerLine} />
            <span style={s.dividerText}>or continue with</span>
            <div style={s.dividerLine} />
          </div>

          <div style={s.socialRow}>
            <SocialBtn label="Google" icon={<GoogleIcon />} />
            <SocialBtn label="GitHub" icon={<GithubIcon />} />
          </div>

          <div style={s.signupRow}>
            Don&apos;t have an account?{" "}
            <a href="#" style={s.signupLink}>Create one free</a>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

function LeftPanel() {
  return (
    <div style={s.left}>
      <div>
        <div style={s.brandName}>Finance Ledger</div>
        <div style={s.brandSub}>Prestige Private Banking</div>
      </div>
      <div>
        <div style={s.headline}>
          Your wealth,<br />
          <span style={{ color: "#F5C518" }}>intelligently</span> managed.
        </div>
        <div style={s.leftDesc}>
          Track every expense, hit every goal, and stay on top of your finances — all in one beautifully designed dashboard.
        </div>
        <div style={s.featureList}>
          {FEATURES.map((f) => <FeatureRow key={f.label} {...f} />)}
        </div>
      </div>
      <div style={s.pillRow}>
        <div style={s.pill}><strong style={{ color: "#F5C518" }}>128+</strong> transactions</div>
        <div style={s.pill}>Wallet <strong style={{ color: "#F5C518" }}>Secure</strong> ●</div>
      </div>
    </div>
  );
}

function FeatureRow({ icon, label, desc }) {
  return (
    <div style={s.featureRow}>
      <div style={s.featureIcon}>{icon}</div>
      <div>
        <div style={s.featureTitle}>{label}</div>
        <div style={s.featureDesc}>{desc}</div>
      </div>
    </div>
  );
}

function Field({ label, type, placeholder, value, onChange, onKeyDown, error, rightIcon }) {
  return (
    <div style={s.fieldGroup}>
      <label style={s.fieldLabel}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          style={{ ...s.fieldInput, borderColor: error ? "#FF5A5A" : "rgba(255,255,255,0.07)" }}
        />
        <div style={s.fieldIcon}>{rightIcon}</div>
      </div>
      {error && <div style={s.fieldError}>{error}</div>}
    </div>
  );
}

function SocialBtn({ label, icon }) {
  return (
    <button type="button" style={s.socialBtn}>
      {icon} {label}
    </button>
  );
}

function Spinner() {
  return (
    <div style={{
      width: "16px", height: "16px", borderRadius: "50%",
      border: "2px solid rgba(17,17,24,0.3)",
      borderTopColor: "#111118",
      animation: "spin 0.7s linear infinite",
    }} />
  );
}

/* ─── Icons ─── */

const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#9898B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#9898B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#9898B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#F0F0F8">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

/* ─── Data ─── */

const FEATURES = [
  { icon: "📊", label: "Real-time Analytics", desc: "Live spending charts & budget health" },
  { icon: "🎯", label: "Savings Goals",        desc: "Set targets and track progress"      },
  { icon: "🔔", label: "Smart Alerts",         desc: "Get notified before overspending"    },
];

/* ─── Styles ─── */

const s = {
  page: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    minHeight: "100vh", background: "#111118",
    fontFamily: "'DM Sans', 'Raleway', sans-serif",
  },
  left: {
    background: "#18181F", borderRight: "1px solid rgba(255,255,255,0.07)",
    display: "flex", flexDirection: "column",
    justifyContent: "space-between", padding: "48px 52px",
  },
  brandName: { fontSize: "22px", fontWeight: 800, color: "#F5C518" },
  brandSub:  { fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9898B8", marginTop: "3px" },
  headline:  { fontSize: "34px", fontWeight: 800, color: "#F0F0F8", lineHeight: 1.25, marginBottom: "14px" },
  leftDesc:  { fontSize: "14px", color: "#9898B8", lineHeight: 1.7 },
  featureList: { display: "flex", flexDirection: "column", gap: "16px", marginTop: "32px" },
  featureRow:  { display: "flex", alignItems: "center", gap: "14px" },
  featureIcon: {
    width: "40px", height: "40px", borderRadius: "10px",
    background: "rgba(245,197,24,0.1)", border: "1px solid rgba(245,197,24,0.2)",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
  },
  featureTitle: { fontSize: "13px", fontWeight: 600, color: "#F0F0F8" },
  featureDesc:  { fontSize: "12px", color: "#9898B8", marginTop: "2px" },
  pillRow: { display: "flex", gap: "12px" },
  pill: {
    background: "#1E1E28", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "40px", padding: "7px 14px", fontSize: "12px", color: "#9898B8",
  },
  right: { display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 52px" },
  card:      { width: "100%", maxWidth: "400px" },
  cardHead:  { marginBottom: "28px" },
  cardTitle: { fontSize: "26px", fontWeight: 800, color: "#F0F0F8", marginBottom: "6px" },
  cardSub:   { fontSize: "14px", color: "#9898B8" },
  generalError: {
    background: "rgba(255,90,90,0.1)", border: "1px solid rgba(255,90,90,0.3)",
    borderRadius: "8px", padding: "10px 14px", fontSize: "13px",
    color: "#FF5A5A", marginBottom: "16px",
  },
  fieldGroup: { marginBottom: "16px" },
  fieldLabel: {
    display: "block", fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.1em", textTransform: "uppercase",
    color: "#9898B8", marginBottom: "7px",
  },
  fieldInput: {
    width: "100%", background: "#18181F",
    border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px",
    padding: "11px 40px 11px 14px", color: "#F0F0F8",
    fontFamily: "'DM Sans', 'Raleway', sans-serif", fontSize: "14px",
    outline: "none", boxSizing: "border-box",
  },
  fieldIcon:  { position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" },
  fieldError: { fontSize: "11px", color: "#FF5A5A", marginTop: "5px" },
  eyeBtn: { background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" },
  row: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" },
  rememberWrap:  { display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" },
  checkBox: {
    width: "16px", height: "16px", borderRadius: "4px",
    border: "1px solid rgba(255,255,255,0.15)", background: "#18181F", display: "inline-block",
  },
  rememberLabel: { fontSize: "13px", color: "#9898B8" },
  forgotLink:    { fontSize: "13px", color: "#F5C518", fontWeight: 600, textDecoration: "none" },
  submitBtn: {
    width: "100%", padding: "13px", background: "#F5C518",
    color: "#111118", fontSize: "15px", fontWeight: 700,
    border: "none", borderRadius: "8px",
    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
    fontFamily: "'DM Sans', 'Raleway', sans-serif",
  },
  divider:     { display: "flex", alignItems: "center", margin: "20px 0", gap: "10px" },
  dividerLine: { flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" },
  dividerText: { fontSize: "12px", color: "#9898B8", whiteSpace: "nowrap" },
  socialRow:  { display: "flex", gap: "10px", marginBottom: "20px" },
  socialBtn: {
    flex: 1, padding: "10px", background: "#18181F",
    border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px",
    color: "#9898B8", fontSize: "13px", fontWeight: 500, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
    fontFamily: "'DM Sans', 'Raleway', sans-serif",
  },
  signupRow:  { textAlign: "center", fontSize: "13px", color: "#9898B8" },
  signupLink: { color: "#F5C518", fontWeight: 600, textDecoration: "none" },
};