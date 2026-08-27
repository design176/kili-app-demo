import { Coins, Eye, ChartLineUp } from "@phosphor-icons/react";
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

export function StripeCardIllustration() {
  return (
    <div className={styles.stripeCard}>
      <svg className={styles.stripeLogo} width="67" height="28" viewBox="0 0 67 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M67 14.4674C67 9.68227 64.6922 5.90654 60.2814 5.90654C55.8518 5.90654 53.1718 9.6824 53.1718 14.43C53.1718 20.0561 56.3359 22.8973 60.8768 22.8973C63.0916 22.8973 64.7666 22.3926 66.0322 21.6824V17.944C64.7668 18.5795 63.315 18.9721 61.4725 18.9721C59.6672 18.9721 58.0666 18.3365 57.862 16.1309H66.9628C66.9628 15.8878 67 14.9159 67 14.4674ZM57.8061 12.6917C57.8061 10.5795 59.0903 9.70093 60.2628 9.70093C61.398 9.70093 62.6078 10.5795 62.6078 12.6917H57.8061ZM45.9882 5.90654C44.1641 5.90654 42.9916 6.76632 42.3403 7.36458L42.0982 6.20566H38.0039V28L42.6566 27.0094L42.6753 21.7197C43.3453 22.2057 44.3316 22.8973 45.9695 22.8973C49.3009 22.8973 52.3345 20.2057 52.3345 14.2805C52.3159 8.85981 49.245 5.90654 45.988 5.90654M44.8713 18.7851C43.7732 18.7851 43.1217 18.3926 42.6752 17.9066L42.6565 10.972C43.1404 10.43 43.8104 10.0562 44.8713 10.0562C46.5649 10.0562 47.7374 11.9626 47.7374 14.4112C47.7374 16.9159 46.5835 18.7851 44.8713 18.7851ZM31.6016 4.80374L36.273 3.79439V0L31.6016 0.990688V4.80374ZM31.6016 6.22433H36.273V22.5795H31.6016V6.22433ZM26.5953 7.60745L26.2975 6.22433H22.2775V22.5795H26.9303V11.4954C28.0282 10.0562 29.8895 10.3178 30.4664 10.5234V6.22433C29.8709 5.99998 27.6934 5.58875 26.5953 7.60745ZM17.2897 2.16826L12.7486 3.14016L12.73 18.1122C12.73 20.8787 14.7959 22.9159 17.5503 22.9159C19.0764 22.9159 20.193 22.6356 20.8072 22.2991V18.5048C20.2118 18.7478 17.2711 19.6075 17.2711 16.8412V10.2056H20.8072V6.22433H17.2711L17.2897 2.16826ZM4.70858 10.972C4.70858 10.2431 5.30412 9.9626 6.29067 9.9626C7.705 9.9626 9.49162 10.3926 10.9061 11.159V6.76633C9.36142 6.14954 7.83534 5.90654 6.29067 5.90654C2.5125 5.90654 0 7.88791 0 11.1964C0 16.3552 7.07216 15.5328 7.07216 17.7572C7.07216 18.6169 6.32784 18.8973 5.28554 18.8973C3.74088 18.8973 1.76804 18.2617 0.204664 17.402V21.8506C1.93554 22.5983 3.685 22.9159 5.28554 22.9159C9.15662 22.9159 11.818 20.9908 11.818 17.645C11.7995 12.0749 4.70858 13.0654 4.70858 10.972Z"
          fill="white"
        />
      </svg>
      <div className={styles.stripeCardNumber}>•••• •••• •••• 4242</div>
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
