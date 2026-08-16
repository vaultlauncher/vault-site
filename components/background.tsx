"use client";
import React, { useState } from "react";
import {
  Gamepad2,
  Download,
  DownloadCloud,
  Monitor,
  Cpu,
  Rocket,
  Trophy,
  Swords,
  Target,
  Ghost,
  Joystick,
  Keyboard,
  Headphones,
  HardDrive,
  FolderDown,
  Zap,
} from "lucide-react";

const ICON_POOL = [
  Gamepad2,
  Download,
  DownloadCloud,
  Monitor,
  Cpu,
  Rocket,
  Trophy,
  Swords,
  Target,
  Ghost,
  Joystick,
  Keyboard,
  Headphones,
  HardDrive,
  FolderDown,
  Zap,
];

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

interface IconSpec {
  id: number;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  top: number;
  left: number;
  size: number;
  opacity: number;
  floatDuration: number;
  floatDelay: number;
  spinDuration: number;
  spinDirection: "normal" | "reverse";
  spins: boolean;
  floats: boolean;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
}

function generateIcons(count: number): IconSpec[] {
  return Array.from({ length: count }).map((_, i) => {
    const Icon = ICON_POOL[Math.floor(Math.random() * ICON_POOL.length)];
    const roll = Math.random();
    const isSpinOnly = roll < 0.35; // pure spin, no drifting
    const isBoth = roll >= 0.35 && roll < 0.5; // drifts AND spins
    const depth = rand(0.4, 1); // smaller/dimmer icons read as "further away"
    const size = rand(16, 25) + depth * 20;

    return {
      id: i,
      Icon,
      top: rand(2, 92),
      left: rand(2, 92),
      size,
      opacity: 0.19,
      floatDuration: rand(14, 34),
      floatDelay: rand(-20, 0),
      spinDuration: rand(6, 20),
      spinDirection: Math.random() > 0.5 ? "normal" : "reverse",
      spins: isSpinOnly || isBoth,
      floats: !isSpinOnly,
      x1: rand(-40, 40),
      y1: rand(-30, 30),
      x2: rand(-50, 50),
      y2: rand(-40, 40),
      x3: rand(-30, 30),
      y3: rand(-35, 35),
    };
  });
}

export default function FloatingIconsBackground({
  count = 24,
  className = "",
}: {
  count?: number;
  className?: string;
}): React.JSX.Element {
  const [icons] = useState(() => generateIcons(count));

  return (
    <div
      className={`relative w-full h-full min-h-screen overflow-hidden ${className}`}
      style={{
        background: [
          "radial-gradient(ellipse 120% 60% at 50% -10%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 70%)",
          "radial-gradient(ellipse 100% 50% at 50% 110%, color-mix(in oklab, var(--chart-2) 10%, transparent), transparent 70%)",
          "var(--background)",
        ].join(", "),
      }}
    >
      <style>{`
        @keyframes iconDrift {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(var(--x1), var(--y1)); }
          50%  { transform: translate(var(--x2), var(--y2)); }
          75%  { transform: translate(var(--x3), var(--y3)); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes iconSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .icon-float {
          animation-name: iconDrift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .icon-spin {
          animation-name: iconSpin;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .icon-float, .icon-spin { animation: none !important; }
        }
      `}</style>

      {icons.map(
        ({
          id,
          Icon,
          top,
          left,
          size,
          opacity,
          floatDuration,
          floatDelay,
          spinDuration,
          spinDirection,
          spins,
          floats,
          x1,
          y1,
          x2,
          y2,
          x3,
          y3,
        }) => (
          <div
            key={id}
            className={`absolute ${floats ? "icon-float" : ""}`}
            style={
              {
                top: `${top}%`,
                left: `${left}%`,
                animationDuration: `${floatDuration}s`,
                animationDelay: `${floatDelay}s`,
                "--x1": `${x1}px`,
                "--y1": `${y1}px`,
                "--x2": `${x2}px`,
                "--y2": `${y2}px`,
                "--x3": `${x3}px`,
                "--y3": `${y3}px`,
              } as React.CSSProperties
            }
          >
            <Icon
              className={spins ? "icon-spin" : ""}
              style={{
                width: size,
                height: size,
                color: "var(--primary)",
                opacity,
                animationDuration: `${spinDuration}s`,
                animationDirection: spinDirection,
              }}
              strokeWidth={1.5}
            />
          </div>
        ),
      )}
    </div>
  );
}
