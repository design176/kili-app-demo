"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useMounted } from "@/lib/use-mounted";
import styles from "./DotSwirl.module.css";

export type DotSwirlProps = {
  className?: string;
};

const PX_SIZE = 9;
const CHARS = ["o", "+", "*", "#"];
const HOVER_CHARS = ["x", "X", "@", "%"];
const HOVER_RADIUS = 270;
const SWIRL_STRENGTH = 2.6;
const SWIRL_FALLOFF_K = 0.0025;
const TIME_SPEED = 0.00012;
const NOISE_FREQ = 0.075;
const NOISE_TIME_SPEED = 0.00045;
const RING_FREQ = 0.02;
const ARM_COUNT = 7;
const ARM_EDGE0 = -1.75;
const ARM_EDGE1 = 0.75;
const MIN_ALPHA = 0.2;
const HOLE_RADIUS_RATIO = 0.08;
const RING_RAMP_RATIO = 0.1;

// Standard 4x4 Bayer ordered-dithering threshold matrix, normalized to (0, 1)
// with each threshold centered within its 1/16th bucket.
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => (v + 0.5) / 16));

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function DotSwirl({ className }: DotSwirlProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const colorRef = useRef("255, 255, 255");

  useEffect(() => {
    colorRef.current = isDark ? "20, 20, 20" : "255, 255, 255";
  }, [isDark]);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = (width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { width, height };
    };

    let frameId = 0;
    let running = false;

    const draw = (time: number) => {
      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);

      const minDim = Math.min(width, height);
      const center = { x: width / 2, y: height / 2 };
      const holeRadius = minDim * HOLE_RADIUS_RATIO;
      const ringRampEnd = holeRadius + minDim * RING_RAMP_RATIO;
      const t = reducedMotion ? 0 : time;
      const noiseT = t * NOISE_TIME_SPEED;
      const color = colorRef.current;
      const pointer = pointerRef.current;

      ctx.font = `${PX_SIZE + 2}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let by = 0; by < height; by += PX_SIZE) {
        const bayerRow = BAYER_4X4[(by / PX_SIZE) % 4];
        for (let bx = 0; bx < width; bx += PX_SIZE) {
          const x = bx + PX_SIZE / 2;
          const y = by + PX_SIZE / 2;
          const dx = x - center.x;
          const dy = y - center.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          const swirlFalloff = 1 / (1 + dist * SWIRL_FALLOFF_K);
          const warpedAngle =
            angle + SWIRL_STRENGTH * swirlFalloff + t * TIME_SPEED;
          const wx = center.x + dist * Math.cos(warpedAngle);
          const wy = center.y + dist * Math.sin(warpedAngle);

          const armLobe = Math.cos(warpedAngle * ARM_COUNT);
          const armBand = smoothstep(ARM_EDGE0, ARM_EDGE1, armLobe);

          const ringRipple =
            0.5 + 0.5 * Math.sin(dist * RING_FREQ - t * TIME_SPEED * 2);

          const fineNoise =
            Math.sin(wx * NOISE_FREQ + noiseT) *
            Math.cos(wy * NOISE_FREQ - noiseT * 0.7);
          const grain = 0.85 + 0.15 * fineNoise;

          const value = armBand * (0.35 + 0.65 * ringRipple) * grain;

          const radialBias = smoothstep(holeRadius, ringRampEnd, dist);
          const intensity = value * radialBias;

          const threshold = bayerRow[(bx / PX_SIZE) % 4];
          if (intensity <= threshold) continue;

          const alpha = MIN_ALPHA + intensity * (1 - MIN_ALPHA);

          const charIndex = Math.min(
            CHARS.length - 1,
            Math.floor(intensity * CHARS.length),
          );

          let char = CHARS[charIndex];
          if (pointer) {
            const pdx = x - pointer.x;
            const pdy = y - pointer.y;
            if (pdx * pdx + pdy * pdy <= HOVER_RADIUS * HOVER_RADIUS) {
              char = HOVER_CHARS[charIndex];
            }
          }

          ctx.fillStyle = `rgba(${color}, ${alpha})`;
          ctx.fillText(char, x, y);
        }
      }

      if (!reducedMotion) {
        frameId = requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      frameId = requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      resize(width, height);
      if (width > 0 && height > 0) {
        start();
      } else {
        stop();
      }
    });
    observer.observe(parent);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        pointerRef.current = { x, y };
      } else {
        pointerRef.current = null;
      }
    };

    const handlePointerLeave = () => {
      pointerRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [mounted]);

  return (
    <canvas
      ref={canvasRef}
      className={[styles.canvas, className ?? ""].filter(Boolean).join(" ")}
    />
  );
}
