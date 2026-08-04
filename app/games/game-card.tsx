"use client";

import Link from "next/link";
import { CalendarDays, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameImage } from "./game-image";
import {
  getAppId,
  getGameName,
  getGenres,
  getHeaderImage,
  getRating,
  getReleaseDate,
  PLACEHOLDER_HEADER,
} from "@/lib/games";

interface GameCardProps {
  game: unknown;
  index?: number;
  eager?: boolean;
}

export function GameCard({ game, index = 0, eager = false }: GameCardProps) {
  const appId = getAppId(game);
  const name = getGameName(game);
  const rating = getRating(game);
  const genres = getGenres(game);
  const releaseDate = getReleaseDate(game);

  const card = (
    <Card
      className="group relative flex h-full flex-col gap-0 overflow-hidden border p-0 transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
      style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both` }}
    >
      <div className="relative aspect-[460/215] overflow-hidden bg-muted">
        <GameImage
          src={getHeaderImage(game)}
          fallbackSrc={PLACEHOLDER_HEADER}
          alt={`${name} cover art`}
          eager={eager}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {typeof rating === "number" && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 backdrop-blur-sm">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold leading-none text-white">
              {rating}
            </span>
          </div>
        )}

        {genres.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {genres.slice(0, 3).map((genre) => (
              <Badge
                key={genre}
                className="border-white/10 bg-black/50 text-xs font-medium text-white backdrop-blur-sm"
              >
                {genre}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-4">
        <h3 className="line-clamp-2 text-base font-bold leading-snug">
          {name}
        </h3>

        {releaseDate && (
          <p className="mt-auto flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            {releaseDate}
          </p>
        )}

        <span className="mt-3 block w-full rounded-md bg-primary py-2 text-center text-sm font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90">
          View Details
        </span>
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
  );

  if (!appId) return card;

  return (
    <Link
      href={`/games/${appId}`}
      aria-label={`View details for ${name}`}
      className="flex h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {card}
    </Link>
  );
}

export function GameCardSkeleton() {
  return (
    <Card className="flex h-full flex-col gap-0 overflow-hidden border p-0">
      <div className="aspect-[460/215] animate-pulse bg-muted" />
      <CardContent className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        <div className="mt-auto h-9 w-full animate-pulse rounded-md bg-muted" />
      </CardContent>
    </Card>
  );
}
