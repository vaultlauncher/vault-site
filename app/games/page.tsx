import Search from "./search";
import { GameCard } from "./game-card";
import { Metadata } from "next/types";

interface DetailedGame {
  steam_appid?: number;
  appid?: number;
  name: string;
  [key: string]: unknown;
}

export const metadata: Metadata = {
  title: "Browse Games",
};

async function getHotGames(): Promise<any[]> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://vaultapi.parcoil.com";
  const res = await fetch(`${apiUrl}/games/hot`, {
    next: { revalidate: 18000 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch hot games");
  }
  const detailedGames: DetailedGame[] = await res.json();
  return detailedGames.map((game) => ({
    ...game,
    appid: game.steam_appid || game.appid || 0,
  }));
}

export default async function GamesPage() {
  const games = await getHotGames();

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto" style={{ maxWidth: "80rem" }}>
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Hot Games</h1>

          <p
            className="text-muted-foreground text-lg mx-auto"
            style={{ maxWidth: "42rem" }}
          >
            Discover the most popular games right now. Find your next gaming
            adventure.
          </p>
        </div>

        <div className="mb-12">
          <Search />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <GameCard key={game.appid} game={game} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
