import { KPITile, type KPITileProps } from "./KPITile";
import styles from "./KPIStrip.module.css";

export type KPIStripProps = {
  tiles: KPITileProps[];
  className?: string;
};

export function KPIStrip({ tiles, className }: KPIStripProps) {
  const columns = Math.min(tiles.length, 6) || 1;

  return (
    <div
      className={`${styles.strip} ${className ?? ""}`}
      style={{ "--kpi-columns": columns } as React.CSSProperties}
    >
      {tiles.map((tile) => (
        <KPITile key={tile.label} {...tile} />
      ))}
    </div>
  );
}
