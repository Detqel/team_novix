"use client";

/**
 * Card — Finance Ledger design system
 *
 * Variants:
 *   "stat"        — KPI metric card (icon + badge + label + value)
 *   "chart"       — wrapper for charts with header + legend
 *   "donut"       — category donut chart card
 *   "bar"         — weekly bar chart card
 *   "transactions"— recent transactions list card
 *   "default"     — plain dark card (just bg + border + radius)
 *
 * Usage examples:
 *
 *   <Card variant="stat"
 *     icon={<YourIcon />}
 *     badge="+4.2%"
 *     badgeType="positive"        // "positive" | "negative" | "neutral" | "luxury"
 *     label="Total Expenses"
 *     value="$42,850.00"
 *   />
 *
 *   <Card variant="chart" title="Monthly Expense Summary" legend={[...]}>
 *     <YourChartComponent />
 *   </Card>
 *
 *   <Card variant="transactions" title="Recent Transactions" onViewAll={() => {}}>
 *     {transactions.map(t => <TransactionItem key={t.id} {...t} />)}
 *   </Card>
 *
 *   <Card variant="default" style={{ padding: "24px" }}>
 *     <p>Any custom content</p>
 *   </Card>
 */

export default function Card({
  variant = "default",
  // stat props
  icon,
  badge,
  badgeType = "positive", // "positive" | "negative" | "neutral" | "luxury"
  label,
  value,
  valueSize,
  // chart/donut/bar props
  title,
  legend = [],           // [{ label, color }]
  // transactions props
  onViewAll,
  // layout
  children,
  style = {},
}) {
  switch (variant) {
    case "stat":
      return <StatCard icon={icon} badge={badge} badgeType={badgeType} label={label} value={value} valueSize={valueSize} style={style} />;
    case "chart":
      return <ChartCard title={title} legend={legend} style={style}>{children}</ChartCard>;
    case "donut":
      return <DonutCard title={title} style={style}>{children}</DonutCard>;
    case "bar":
      return <BarCard title={title} style={style}>{children}</BarCard>;
    case "transactions":
      return <TransactionsCard title={title} onViewAll={onViewAll} style={style}>{children}</TransactionsCard>;
    default:
      return <BaseCard style={style}>{children}</BaseCard>;
  }
}

/* ─── Base card ─── */
function BaseCard({ children, style }) {
  return (
    <div style={{ ...s.base, ...style }}>
      {children}
    </div>
  );
}

/* ─── Stat card ─── */
function StatCard({ icon, badge, badgeType, label, value, valueSize, style }) {
  const badgeStyle = {
    ...s.badge,
    ...(badgeType === "positive" ? s.badgePos : {}),
    ...(badgeType === "negative" ? s.badgeNeg : {}),
    ...(badgeType === "neutral"  ? s.badgeNeu : {}),
    ...(badgeType === "luxury"   ? s.badgeLux : {}),
  };
  return (
    <div style={{ ...s.base, ...style }}>
      <div style={s.statTop}>
        {icon && <div style={s.statIcon}>{icon}</div>}
        {badge && <span style={badgeStyle}>{badge}</span>}
      </div>
      {label && <div style={s.statLabel}>{label}</div>}
      {value && (
        <div style={{ ...s.statValue, ...(valueSize === "small" ? s.statValueSm : {}) }}>
          {value}
        </div>
      )}
    </div>
  );
}

/* ─── Chart card ─── */
function ChartCard({ title, legend, children, style }) {
  return (
    <div style={{ ...s.base, ...style }}>
      <div style={s.chartHeader}>
        <span style={s.cardTitle}>{title}</span>
        {legend.length > 0 && (
          <div style={s.legend}>
            {legend.map((item, i) => (
              <div key={i} style={s.legendItem}>
                <span style={{ ...s.legendDot, background: item.color || "#D4A017" }} />
                <span style={s.legendLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

/* ─── Donut card ─── */
function DonutCard({ title, children, style }) {
  return (
    <div style={{ ...s.base, display: "flex", flexDirection: "column", ...style }}>
      <span style={{ ...s.cardTitle, marginBottom: "14px" }}>{title}</span>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Bar card ─── */
function BarCard({ title, children, style }) {
  return (
    <div style={{ ...s.base, ...style }}>
      <span style={s.cardTitle}>{title}</span>
      {children}
    </div>
  );
}

/* ─── Transactions card ─── */
function TransactionsCard({ title, onViewAll, children, style }) {
  return (
    <div style={{ ...s.base, ...style }}>
      <div style={s.txnHeader}>
        <span style={s.cardTitle}>{title}</span>
        {onViewAll && (
          <button onClick={onViewAll} style={s.viewAllBtn}>
            View All Ledger
          </button>
        )}
      </div>
      <div style={s.txnList}>
        {children}
      </div>
    </div>
  );
}

/* ─── TransactionItem — exported sub-component ─── */
export function TransactionItem({ icon, name, description, amount, date }) {
  return (
    <div style={s.txnItem}>
      <div style={s.txnIcon}>{icon}</div>
      <div style={s.txnInfo}>
        <div style={s.txnName}>{name}</div>
        <div style={s.txnDesc}>{description}</div>
      </div>
      <div style={s.txnAmountCol}>
        <span style={s.txnAmount}>{amount}</span>
        <span style={s.txnDate}>{date}</span>
      </div>
    </div>
  );
}

/* ─── StatIcon — exported helper ─── */
export function StatIcon({ children }) {
  return <div style={s.statIconWrap}>{children}</div>;
}

/* ════════════════════════
   Styles
════════════════════════ */
const s = {
  base: {
    background: "#1A1A20",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "14px",
    padding: "18px 20px",
    fontFamily: "'Raleway', sans-serif",
  },

  /* stat */
  statTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  statIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "rgba(212,160,23,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#D4A017",
  },
  statIconWrap: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "rgba(212,160,23,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#D4A017",
  },
  badge: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    padding: "3px 7px",
    borderRadius: "20px",
  },
  badgePos: { color: "#5DB075", background: "rgba(93,176,117,0.12)" },
  badgeNeg: { color: "#E05B5B", background: "rgba(224,91,91,0.12)" },
  badgeNeu: { color: "#9E9D96", background: "rgba(158,157,150,0.12)" },
  badgeLux: { color: "#D4A017", background: "rgba(212,160,23,0.15)" },
  statLabel: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#6E6D67",
    marginBottom: "4px",
  },
  statValue: {
    fontFamily: "'Cinzel', serif",
    fontSize: "22px",
    fontWeight: 700,
    color: "#FFFFFF",
    lineHeight: 1.1,
    letterSpacing: "0.01em",
  },
  statValueSm: {
    fontSize: "17px",
  },

  /* chart */
  chartHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "14px",
  },
  cardTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: "13px",
    fontWeight: 600,
    color: "#FFFFFF",
    letterSpacing: "0.02em",
  },
  legend: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  legendDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    display: "inline-block",
  },
  legendLabel: {
    fontSize: "10px",
    color: "#9E9D96",
  },

  /* transactions */
  txnHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  viewAllBtn: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#D4A017",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Raleway', sans-serif",
    padding: 0,
    transition: "color 0.2s",
  },
  txnList: {
    display: "flex",
    flexDirection: "column",
  },
  txnItem: {
    display: "flex",
    alignItems: "center",
    padding: "13px 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    gap: "12px",
  },
  txnIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "9px",
    background: "rgba(212,160,23,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#D4A017",
    flexShrink: 0,
  },
  txnInfo: {
    flex: 1,
  },
  txnName: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#FFFFFF",
    marginBottom: "2px",
  },
  txnDesc: {
    fontSize: "11px",
    color: "#6E6D67",
    fontWeight: 400,
  },
  txnAmountCol: {
    textAlign: "right",
  },
  txnAmount: {
    fontFamily: "'Cinzel', serif",
    fontSize: "13px",
    fontWeight: 700,
    color: "#FFFFFF",
    display: "block",
  },
  txnDate: {
    fontSize: "10px",
    color: "#6E6D67",
    marginTop: "2px",
    display: "block",
  },
};