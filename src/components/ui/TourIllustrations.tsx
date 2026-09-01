import { Coins, Eye, ChartLineUp, Wallet } from "@phosphor-icons/react";
import styles from "./TourCoachmark.module.css";

export function KpiIconsIllustration() {
  return (
    <div className={styles.kpiIcons}>
      <div className={styles.kpiIconBox}>
        <Coins size={18} weight="bold" />
      </div>
      <div className={styles.kpiIconBox}>
        <Eye size={18} weight="bold" />
      </div>
      <div className={styles.kpiIconBox}>
        <ChartLineUp size={18} weight="bold" />
      </div>
    </div>
  );
}

export function WalletIllustration() {
  return (
    <div className={styles.walletCard}>
      <div className={styles.walletIconBox}>
        <Wallet size={22} weight="bold" />
      </div>
      <div className={styles.walletAddress}>0x71C7…8976</div>
    </div>
  );
}

export function HexagonsIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="171"
      height="83"
      viewBox="0 0 285 139"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M152.911 70.0094L111.969 136.604L43.3913 137.662L0.914062 70.0094L43.3913 3.94275H110.433L152.911 70.0094Z"
        fill="var(--color-brand-soft)"
      />
      <path
        d="M110.433 3.94275L70.5156 70.0094M111.969 136.604L43.3913 137.662L0.914062 70.0094L43.3913 3.94275H110.433L152.911 70.0094L111.969 136.604ZM70.5156 70.0094L111.969 136.604M70.5156 70.0094H0.914062"
        stroke="var(--color-brand)"
        strokeWidth="1.543"
      />
      <path
        d="M211.764 66.3095L168.263 134.49H153.934L113.504 66.3095L153.934 0.771484H168.263L211.764 66.3095Z"
        fill="var(--color-surface-1)"
      />
      <path
        d="M168.263 0.771484L127.833 66.3095M168.263 134.49H153.934L113.504 66.3095L153.934 0.771484H168.263L211.764 66.3095L168.263 134.49ZM127.833 66.3095L168.263 134.49M127.833 66.3095H113.504"
        stroke="var(--color-border-strong)"
        strokeWidth="1.543"
      />
      <path
        d="M283.414 66.3095L239.914 134.49H217.396L176.965 66.3095L217.396 0.771484H239.914L283.414 66.3095Z"
        fill="var(--color-surface-1)"
      />
      <path
        d="M239.914 0.771484L199.483 66.3095M239.914 134.49H217.396L176.965 66.3095L217.396 0.771484H239.914L283.414 66.3095L239.914 134.49ZM199.483 66.3095L239.914 134.49M199.483 66.3095H176.965"
        stroke="var(--color-border-strong)"
        strokeWidth="1.543"
      />
    </svg>
  );
}

/** Mirrors TrendChart's Catmull-Rom smoothing so this static illustration reads as the same chart. */
function buildSmoothPath(points: { x: number; y: number }[]) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

const GRAPH_HEIGHT = 100;
const GRAPH_POINTS = [
  { x: 0, y: 82 },
  { x: 40, y: 60 },
  { x: 80, y: 68 },
  { x: 120, y: 32 },
  { x: 160, y: 42 },
  { x: 200, y: 10 },
];
const GRAPH_LINE_PATH = buildSmoothPath(GRAPH_POINTS);
const GRAPH_AREA_PATH = `${GRAPH_LINE_PATH} L 200 ${GRAPH_HEIGHT} L 0 ${GRAPH_HEIGHT} Z`;

export function LineGraphIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 200 ${GRAPH_HEIGHT}`}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="tour-line-graph-hatch"
          patternUnits="userSpaceOnUse"
          width="7"
          height="7"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="7" stroke="var(--color-brand)" strokeWidth="1.2" strokeOpacity="0.55" />
        </pattern>
      </defs>
      <path d={GRAPH_AREA_PATH} fill="var(--color-brand)" opacity="0.1" />
      <path d={GRAPH_AREA_PATH} fill="url(#tour-line-graph-hatch)" />
      <path d={GRAPH_LINE_PATH} stroke="var(--color-brand)" strokeWidth="2" />
    </svg>
  );
}
