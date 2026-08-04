"use client";

import { useState } from "react";

interface GameImageProps {
  src: string;
  fallbackSrc?: string | undefined;
  alt: string;
  className?: string;
  eager?: boolean;
}

export function GameImage({
  src,
  fallbackSrc,
  alt,
  className,
  eager = false,
}: GameImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      className={className}
      onError={() => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc || "");
      }}
    />
  );
}
