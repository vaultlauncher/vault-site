import type { Metadata } from "next/types";
import { Flame } from "lucide-react";
import { GamesBrowser } from "./games-browser";
import { normalizeGames } from "@/lib/games";

export const metadata: Metadata = {
  title: "Browse Games",
  description:
    "Discover the hottest games on Vault Launcher right now. Search thousands of titles and find your next favorite.",
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://vaultapi.parcoil.com";

async function getHotGames(): Promise<unknown[]> {
  const res = await fetch(`${API_URL}/games/hot`, {
    next: { revalidate: 18000 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch hot games (${res.status})`);
  }
  return normalizeGames(await res.json());
}

export default async function GamesPage() {
  let games: unknown[] = [];
  let apiError = false;

  try {
    games = await getHotGames();
  } catch {
    apiError = true;
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Flame className="h-4 w-4" />
            Trending on Vault
          </div>
          <h1 className="text-4xl font-bold md:text-6xl">
            Browse <span className="text-primary">Games</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Discover what&apos;s hot right now. Search thousands of titles and
            find your next favorite game.
          </p>
        </header>

        <GamesBrowser initialGames={games} initialError={apiError} />
      </div>
    </div>
  );
}
