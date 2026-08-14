"use client";

import { useEffect, useRef } from "react";

export type AdVariant = "leaderboard" | "rectangle" | "banner" | "native";

const BANNER_ADS: Record<
  Exclude<AdVariant, "native">,
  { key: string; width: number; height: number }
> = {
  leaderboard: {
    key: "6f03a53b58ea2b76ea16b97726173a12",
    width: 728,
    height: 90,
  },
  rectangle: {
    key: "fd31f3a208951023a4608886cfeb1c42",
    width: 300,
    height: 250,
  },
  banner: {
    key: "792739fe386cbc9cf97f00d8858703f6",
    width: 468,
    height: 60,
  },
};

const NATIVE_KEY = "7b1a36e0db6bd5080c3304b46b3859f4";

interface AdsProps {
  variant: AdVariant;
  className?: string;
}

function createScript(src: string, options?: { async?: boolean }) {
  const script = document.createElement("script");
  script.src = src;
  if (options?.async) script.async = true;
  script.dataset.cfasync = "false";
  return script;
}

export function Ads({ variant, className }: AdsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.querySelector("script")) return;

    if (variant === "native") {
      container.appendChild(
        createScript(
          `https://graduateamazingly.com/${NATIVE_KEY}/invoke.js`,
          { async: true }
        )
      );
      return;
    }

    const ad = BANNER_ADS[variant];
    (window as unknown as { atOptions?: Record<string, unknown> }).atOptions = {
      key: ad.key,
      format: "iframe",
      height: ad.height,
      width: ad.width,
      params: {},
    };

    container.appendChild(
      createScript(`https://graduateamazingly.com/${ad.key}/invoke.js`)
    );
  }, [variant]);

  if (variant === "native") {
    return (
      <div className={`flex justify-center ${className ?? ""}`}>
        <div id={`container-${NATIVE_KEY}`} ref={containerRef} />
      </div>
    );
  }

  return (
    <div className={`flex justify-center ${className ?? ""}`}>
      <div ref={containerRef} />
    </div>
  );
}