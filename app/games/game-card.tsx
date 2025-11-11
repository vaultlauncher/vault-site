"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface GameCardProps {
  game: any;
  index: number;
}

export function GameCard({ game, index }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/games/${game.appid}`}>
      <Card
        className="group overflow-hidden transition-all duration-300 pt-0 p-0"
        style={{
          animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
          transform: isHovered ? "scale(1.02)" : "scale(1)",
          boxShadow: isHovered
            ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
            : undefined,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="p-0">
          <div
            className="relative overflow-hidden bg-muted"
            style={{ aspectRatio: "460/215" }}
          >
            <Image
              src={game.header_image}
              alt={`${game.name} header`}
              width={460}
              height={215}
              className="w-full h-full object-cover transition-transform duration-500"
              style={{
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent transition-opacity duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
              }}
            />
          </div>

          <CardTitle
            className="text-lg font-bold px-4 pt-4 pb-2"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {game.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-4 pb-4">
          <Button
            asChild
            className="w-full font-semibold transition-all duration-300"
          >
            <Link href={`/games/${game.appid}`}>View Details</Link>
          </Button>
        </CardContent>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </Card>
    </Link>
  );
}
