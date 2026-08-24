import {
  ArrowsClockwise,
  CheckCircle,
  CircleNotch,
  Key,
  Warning,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";
import { IconButton } from "./IconButton";
import styles from "./HeartbeatIndicator.module.css";

export type HeartbeatStatus = "healthy" | "warning" | "critical" | "empty" | "refreshing";

export type HeartbeatIndicatorProps = {
  label?: string;
  status?: HeartbeatStatus;
  onRefresh?: () => void;
  className?: string;
};

const STATUS_CONFIG: Record<HeartbeatStatus, { text: string; icon: typeof CheckCircle }> = {
  healthy: { text: "Live", icon: CheckCircle },
  warning: { text: "Partially Available", icon: Warning },
  critical: { text: "Not Live", icon: WarningCircle },
  empty: { text: "No API Keys Created", icon: Key },
  refreshing: { text: "Refreshing Status", icon: CircleNotch },
};

const ECG_PATH =
  "M0 26 H20 L26 26 L32 8 L38 44 L44 26 L50 26 H70 " +
  "L96 26 L102 8 L108 44 L114 26 L120 26 H140 " +
  "L146 26 L152 8 L158 44 L164 26 H200";

const FLATTER_PATH =
  "M0 26 H20 L26 26 L32 18 L38 34 L44 26 L50 26 H70 " +
  "L96 26 L102 18 L108 34 L114 26 L120 26 H140 " +
  "L146 26 L152 18 L158 34 L164 26 H200";

// Gap in the middle lets the heart's own backing hide the line without
// relying on it (that backing fades during the "refreshing" pulse).
const FLAT_PATH = "M0 26 H65 M135 26 H200";

const WAVE_PATH: Record<HeartbeatStatus, string> = {
  healthy: ECG_PATH,
  warning: FLATTER_PATH,
  critical: FLAT_PATH,
  empty: FLAT_PATH,
  refreshing: FLAT_PATH,
};

// Pixel-block heart, 9 cols x 8 rows.
const HEART_MATRIX = [
  [0, 1, 1, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
];

type Point = readonly [number, number];

// Traces the outer boundary of a filled-cell matrix into a CSS clip-path
// polygon, so a backing fill can follow the pixel silhouette instead of the
// grid's bounding box. Works by keeping only the edges that border exactly
// one filled cell (the interior ones are shared by two, so they cancel out),
// then walking those edges from point to point until the loop closes.
function buildHeartClipPath(matrix: number[][]): string {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const edges = new Map<string, { a: Point; b: Point; count: number }>();
  const addEdge = (a: Point, b: Point) => {
    const key = `${a}-${b}`;
    const edge = edges.get(`${b}-${a}`) ?? edges.get(key);
    if (edge) edge.count++;
    else edges.set(key, { a, b, count: 1 });
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!matrix[r][c]) continue;
      const corners: Point[] = [
        [c, r],
        [c + 1, r],
        [c + 1, r + 1],
        [c, r + 1],
      ];
      for (let i = 0; i < 4; i++) addEdge(corners[i], corners[(i + 1) % 4]);
    }
  }

  const outline = Array.from(edges.values()).filter((edge) => edge.count === 1);

  const neighbors = new Map<string, Point[]>();
  const link = (from: Point, to: Point) => {
    const key = `${from}`;
    neighbors.set(key, [...(neighbors.get(key) ?? []), to]);
  };
  for (const { a, b } of outline) {
    link(a, b);
    link(b, a);
  }

  const start = outline[0].a;
  const loop: Point[] = [start];
  let current = start;
  let previous: Point | null = null;
  while (loop.length <= outline.length) {
    const next = neighbors.get(`${current}`)!.find((p) => `${p}` !== `${previous}`)!;
    if (`${next}` === `${start}`) break;
    loop.push(next);
    previous = current;
    current = next;
  }

  const percent = (v: number, total: number) => `${((v / total) * 100).toFixed(2)}%`;
  return `polygon(${loop.map(([x, y]) => `${percent(x, cols)} ${percent(y, rows)}`).join(", ")})`;
}

const HEART_CLIP_PATH = buildHeartClipPath(HEART_MATRIX);

export function HeartbeatIndicator({
  label = "API Status",
  status = "empty",
  onRefresh,
  className,
}: HeartbeatIndicatorProps) {
  const { text: statusText, icon: Icon } = STATUS_CONFIG[status];
  const showRefresh = status !== "empty" && status !== "refreshing";
  const classes = [styles.card, styles[status], className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <div className={styles.header}>
        <span className={styles.title}>{label}</span>
        {showRefresh && (
          <IconButton variant="secondary" size="sm" label="Refresh" onClick={onRefresh}>
            <ArrowsClockwise size={14} weight="bold" />
          </IconButton>
        )}
      </div>

      <div className={styles.waveform}>
        <svg viewBox="0 0 200 60" preserveAspectRatio="none" className={styles.svg}>
          <g className={styles.waveGroup}>
            <path d={WAVE_PATH[status]} className={styles.wavePath} />
            <path d={WAVE_PATH[status]} className={styles.wavePath} transform="translate(200, 0)" />
          </g>
        </svg>
        <div className={styles.heartWrap}>
          <div className={styles.heart} style={{ clipPath: HEART_CLIP_PATH }}>
            {HEART_MATRIX.map((row, rowIndex) =>
              row.map((filled, colIndex) => (
                <span
                  key={`${rowIndex}-${colIndex}`}
                  className={filled ? styles.block : styles.blockEmpty}
                />
              )),
            )}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerText}>
          <span className={styles.footerLabel}>STATUS</span>
          <span className={styles.footerValue}>{statusText}</span>
        </div>
        <span className={styles.iconBadge}>
          <Icon size={16} weight="bold" className={status === "refreshing" ? styles.spin : undefined} />
        </span>
      </div>
    </div>
  );
}
