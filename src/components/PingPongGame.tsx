"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme, type Theme } from "./ThemeProvider";

const TW = 10;
const TH = 5.5;
const PW = 1.6;
const PD = 0.2;
const BR = 0.1;
const PADDLE_Y = TH / 2 - 0.45;
const BASE_SPEED = 4.5;
const SPEED_INC = 0.25;
const MAX_SPEED = 11;
const AI_EASE = 3.5;

interface Palette {
  table: string;
  net: string;
  paddle: string;
  ai: string;
  ball: string;
  line: string;
}

const PALETTES: Record<Theme, Palette> = {
  minimal: {
    table: "#c8cad0",
    net: "#0a0a0a",
    paddle: "#0a0a0a",
    ai: "#4d4d52",
    ball: "#1f1f22",
    line: "#0a0a0a",
  },
  dark: {
    table: "#1a1a20",
    net: "#3a3a44",
    paddle: "#d0d0d8",
    ai: "#6a6a74",
    ball: "#eaeaee",
    line: "#2a2a34",
  },
  cyberpunk: {
    table: "#06081a",
    net: "#00e5ff",
    paddle: "#00e5ff",
    ai: "#ff0080",
    ball: "#ff0080",
    line: "#00e5ff",
  },
  developer: {
    table: "#0d1117",
    net: "#21262d",
    paddle: "#58a6ff",
    ai: "#3fb950",
    ball: "#f0883e",
    line: "#30363d",
  },
};

function Background({ color }: { color: string }) {
  const { scene } = useThree();
  useEffect(() => {
    scene.background = new THREE.Color(color);
  }, [scene, color]);
  return null;
}

function CameraRig() {
  const { camera, size } = useThree();
  useEffect(() => {
    const c = camera as THREE.OrthographicCamera;
    c.zoom = Math.min(size.width / (TW + 1.2), size.height / (TH + 1.0));
    c.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

interface GameProps {
  mx: React.RefObject<number>;
  active: boolean;
  colors: Palette;
  resetKey: number;
  onPoint: (forPlayer: boolean) => void;
}

function GameScene({ mx, active, colors, resetKey, onPoint }: GameProps) {
  const ball = useRef<THREE.Mesh>(null!);
  const shadow = useRef<THREE.Mesh>(null!);
  const pp = useRef<THREE.Mesh>(null!);
  const ap = useRef<THREE.Mesh>(null!);

  const g = useRef({
    bx: 0,
    by: 0,
    vx: 0,
    vy: BASE_SPEED,
    px: 0,
    ax: 0,
    spd: BASE_SPEED,
  });

  const pointFired = useRef(false);

  useEffect(() => {
    const s = g.current;
    s.bx = 0;
    s.by = 0;
    s.px = 0;
    s.ax = 0;
    s.spd = BASE_SPEED;
    const a = (Math.random() - 0.5) * 1.0;
    const d = Math.random() > 0.5 ? 1 : -1;
    s.vx = Math.sin(a) * s.spd;
    s.vy = Math.cos(a) * s.spd * d;
    pointFired.current = false;
  }, [resetKey]);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.04);
    const s = g.current;
    const hw = TW / 2;

    const target = (mx.current ?? 0) * (hw - PW / 2);
    s.px += (target - s.px) * Math.min(1, 14 * dt);
    s.px = THREE.MathUtils.clamp(s.px, -hw + PW / 2, hw - PW / 2);
    if (pp.current) pp.current.position.x = s.px;

    if (!active) {
      if (ball.current) ball.current.position.set(s.bx, s.by, 0.06);
      if (shadow.current) shadow.current.position.set(s.bx, s.by, 0.001);
      return;
    }

    const aiTarget = THREE.MathUtils.clamp(s.bx, -hw + PW / 2, hw - PW / 2);
    s.ax += (aiTarget - s.ax) * AI_EASE * dt;
    if (ap.current) ap.current.position.x = s.ax;

    s.bx += s.vx * dt;
    s.by += s.vy * dt;

    if (s.bx - BR < -hw) {
      s.bx = -hw + BR;
      s.vx = Math.abs(s.vx);
    }
    if (s.bx + BR > hw) {
      s.bx = hw - BR;
      s.vx = -Math.abs(s.vx);
    }

    const ppTop = -PADDLE_Y + PD / 2;
    if (
      s.vy < 0 &&
      s.by - BR < ppTop &&
      s.by + BR > -PADDLE_Y - PD / 2
    ) {
      if (Math.abs(s.bx - s.px) < PW / 2 + BR) {
        s.by = ppTop + BR;
        s.spd = Math.min(s.spd + SPEED_INC, MAX_SPEED);
        const off = (s.bx - s.px) / (PW / 2);
        s.vx = off * s.spd * 0.7;
        s.vy = Math.sqrt(Math.max(s.spd * s.spd - s.vx * s.vx, 1));
      }
    }

    const apBottom = PADDLE_Y - PD / 2;
    if (
      s.vy > 0 &&
      s.by + BR > apBottom &&
      s.by - BR < PADDLE_Y + PD / 2
    ) {
      if (Math.abs(s.bx - s.ax) < PW / 2 + BR) {
        s.by = apBottom - BR;
        s.spd = Math.min(s.spd + SPEED_INC, MAX_SPEED);
        const off = (s.bx - s.ax) / (PW / 2);
        s.vx = off * s.spd * 0.7;
        s.vy = -Math.sqrt(Math.max(s.spd * s.spd - s.vx * s.vx, 1));
      }
    }

    if (s.by < -TH / 2 - 0.8) {
      if (!pointFired.current) {
        pointFired.current = true;
        onPoint(false);
      }
      s.bx = 0;
      s.by = 0;
      s.spd = BASE_SPEED;
      s.vx = (Math.random() - 0.5) * 2;
      s.vy = BASE_SPEED;
      pointFired.current = false;
    }
    if (s.by > TH / 2 + 0.8) {
      if (!pointFired.current) {
        pointFired.current = true;
        onPoint(true);
      }
      s.bx = 0;
      s.by = 0;
      s.spd = BASE_SPEED;
      s.vx = (Math.random() - 0.5) * 2;
      s.vy = -BASE_SPEED;
      pointFired.current = false;
    }

    if (ball.current) ball.current.position.set(s.bx, s.by, 0.06);
    if (shadow.current) shadow.current.position.set(s.bx, s.by, 0.001);
  });

  const hw = TW / 2;
  const hh = TH / 2;

  return (
    <>
      <CameraRig />
      <Background color={colors.table} />
      <ambientLight intensity={0.75} />
      <pointLight position={[0, 0, 8]} intensity={0.5} />

      {/* table surface */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[TW, TH]} />
        <meshStandardMaterial color={colors.table} roughness={0.85} />
      </mesh>

      {/* border */}
      {[
        { pos: [-hw + 0.015, 0, 0.005] as const, size: [0.03, TH] as const },
        { pos: [hw - 0.015, 0, 0.005] as const, size: [0.03, TH] as const },
        { pos: [0, -hh + 0.015, 0.005] as const, size: [TW, 0.03] as const },
        { pos: [0, hh - 0.015, 0.005] as const, size: [TW, 0.03] as const },
      ].map((l, i) => (
        <mesh key={i} position={[l.pos[0], l.pos[1], l.pos[2]]}>
          <planeGeometry args={l.size} />
          <meshBasicMaterial color={colors.line} transparent opacity={0.25} />
        </mesh>
      ))}

      {/* center line (net) */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[TW - 0.15, 0.05]} />
        <meshBasicMaterial color={colors.net} transparent opacity={0.45} />
      </mesh>

      {/* center circle */}
      <mesh position={[0, 0, 0.005]}>
        <ringGeometry args={[0.38, 0.42, 32]} />
        <meshBasicMaterial color={colors.line} transparent opacity={0.15} />
      </mesh>

      {/* dashed center line dots */}
      {Array.from({ length: 31 }).map((_, i) => {
        const x = ((i / 30) * (TW - 0.6)) - (TW - 0.6) / 2;
        return (
          <mesh key={`dot-${i}`} position={[x, 0, 0.006]}>
            <circleGeometry args={[0.025, 8]} />
            <meshBasicMaterial color={colors.net} transparent opacity={0.6} />
          </mesh>
        );
      })}

      {/* player paddle */}
      <mesh ref={pp} position={[0, -PADDLE_Y, 0.04]}>
        <boxGeometry args={[PW, PD, 0.08]} />
        <meshStandardMaterial
          color={colors.paddle}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* AI paddle */}
      <mesh ref={ap} position={[0, PADDLE_Y, 0.04]}>
        <boxGeometry args={[PW, PD, 0.08]} />
        <meshStandardMaterial
          color={colors.ai}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* ball shadow */}
      <mesh ref={shadow} position={[0, 0, 0.001]}>
        <circleGeometry args={[BR * 1.6, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.12} />
      </mesh>

      {/* ball */}
      <mesh ref={ball} position={[0, 0, 0.06]}>
        <sphereGeometry args={[BR, 20, 20]} />
        <meshStandardMaterial
          color={colors.ball}
          emissive={colors.ball}
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
    </>
  );
}

export function PingPongGame() {
  const { theme } = useTheme();
  const isDev = theme === "developer";
  const colors = PALETTES[theme];
  const mxRef = useRef(0);
  const [hovering, setHovering] = useState(false);
  const [score, setScore] = useState({ p: 0, a: 0 });
  const [resetKey, setResetKey] = useState(0);

  const handlePoint = useCallback((forPlayer: boolean) => {
    setScore((prev) => ({
      p: prev.p + (forPlayer ? 1 : 0),
      a: prev.a + (forPlayer ? 0 : 1),
    }));
  }, []);

  const reset = useCallback(() => {
    setScore({ p: 0, a: 0 });
    setResetKey((k) => k + 1);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className="relative rounded-2xl overflow-hidden border shadow-[0_16px_48px_-16px_rgba(0,0,0,0.15)]"
        style={{
          aspectRatio: "16/9",
          borderColor: "var(--card-border)",
        }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mxRef.current = ((e.clientX - r.left) / r.width) * 2 - 1;
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Canvas
          orthographic
          camera={{ position: [0, 0, 10], zoom: 50, near: 0.1, far: 100 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
          style={{ touchAction: "pan-y" }}
        >
          <GameScene
            mx={mxRef}
            active={hovering}
            colors={colors}
            resetKey={resetKey}
            onPoint={handlePoint}
          />
        </Canvas>

        {/* score */}
        <div
          className="absolute top-2.5 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-1.5 rounded-lg border backdrop-blur-md"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--card-border)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="text-[9px] uppercase tracking-[0.15em] opacity-45"
              style={{
                color: "var(--mist-muted)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {isDev ? "cpu" : "CPU"}
            </span>
            <span
              className="text-sm font-semibold tabular-nums"
              style={{
                color: "var(--ink)",
                fontFamily: "var(--font-outfit)",
              }}
            >
              {score.a}
            </span>
          </div>
          <span
            className="text-[10px] opacity-25"
            style={{ color: "var(--mist-muted)" }}
          >
            :
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className="text-sm font-semibold tabular-nums"
              style={{
                color: "var(--ink)",
                fontFamily: "var(--font-outfit)",
              }}
            >
              {score.p}
            </span>
            <span
              className="text-[9px] uppercase tracking-[0.15em] opacity-45"
              style={{
                color: "var(--mist-muted)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {isDev ? "usr" : "You"}
            </span>
          </div>
        </div>

        {/* reset */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            reset();
          }}
          className="absolute top-2.5 right-2.5 px-2 py-1 rounded-md border text-[9px] tracking-wider uppercase backdrop-blur-md transition-opacity hover:opacity-70 cursor-pointer"
          style={{
            background: "var(--pill-bg)",
            borderColor: "var(--card-border)",
            color: "var(--mist-muted)",
            fontFamily: "var(--font-inter)",
          }}
        >
          {isDev ? "rst" : "Reset"}
        </button>

        {/* hover overlay */}
        {!hovering && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 backdrop-blur-[2px] transition-opacity"
            style={{ background: "rgba(0,0,0,0.12)" }}
          >
            <p
              className="text-sm tracking-wide"
              style={{
                color: "var(--ink)",
                fontFamily: "var(--font-outfit)",
              }}
            >
              {isDev ? "$ hover --start" : "Hover to play"}
            </p>
            <p
              className="text-[9px] opacity-45"
              style={{
                color: "var(--mist-muted)",
                fontFamily: "var(--font-inter)",
              }}
            >
              move cursor to control paddle
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
