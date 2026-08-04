"use client";

import Link from "next/link";
import { ArrowRight, Flame, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GameImage } from "./game-image";
import {
  getAppId,
  getGameName,
  getGenres,
  getHeaderImage,
  getHeroImage,
  getRating,
} from "@/lib/games";

interface FeaturedHeroProps {
  game: unknown;
}

export function FeaturedHero({ game }: FeaturedHeroProps) {
  const appId = getAppId(game);
  const name = getGameName(game);
  const rating = getRating(game);
  const genres = getGenres(game);

  const description =
    game && typeof game === "object" && "short_description" in game
      ? String((game as { short_description: unknown }).short_description ?? "")
      : "";

  return (
    <Link
      href={`/games/${appId}`}
      aria-label={`View details for ${name}`}
      className="group relative block overflow-hidden rounded-2xl border shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      <div className="relative aspect-[16/6] min-h-[280px] w-full md:min-h-[340px]">
        <GameImage
          src={getHeaderImage(game)}
          alt={`${name} banner`}
          eager
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-6 md:gap-4 md:p-10">
          <Badge className="w-fit gap-1 bg-primary/90 text-primary-foreground backdrop-blur-sm">
            <Flame className="h-3 w-3" />
            #1 Trending
          </Badge>

          <h2 className="max-w-3xl text-2xl font-bold leading-tight text-white md:text-4xl">
            {name}
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            {typeof rating === "number" && (
              <div className="flex items-center gap-1.5 rounded-md bg-black/50 px-2.5 py-1 backdrop-blur-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-white">{rating}</span>
                <span className="text-xs text-white/70">/100</span>
              </div>
            )}
            {genres.slice(0, 3).map((genre) => (
              <Badge
                key={genre}
                className="border-white/10 bg-white/10 text-xs font-medium text-white backdrop-blur-sm"
              >
                {genre}
              </Badge>
            ))}
          </div>

          {description && (
            <p className="line-clamp-2 max-w-2xl text-sm text-white/85 md:text-base">
              {description}
            </p>
          )}

          <span className="mt-1 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90">
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
