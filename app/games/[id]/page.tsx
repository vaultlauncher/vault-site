import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GameDetailClient } from "./game-detail-client";

interface GameDetail {
  [key: string]: unknown;
}

async function getGameDetails(appid: string): Promise<GameDetail> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://vaultapi.parcoil.com";
  try {
    const res = await fetch(`${apiUrl}/games/${appid}`, {
      next: { revalidate: 18000 },
    });
    if (!res.ok) {
      console.error(
        `API Error: ${res.status} ${res.statusText} for ${apiUrl}/games/${appid}`
      );
      throw new Error(
        `Failed to fetch game details: ${res.status} ${res.statusText}`
      );
    }
    const data = await res.json();
    return data[appid]?.data || data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch game details");
  }
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const game = await getGameDetails(id);
    return {
      title: game.name ? `${game.name}` : "Null",
    };
  } catch (error) {
    return {
      title: "Game Not Found - Vault",
    };
  }
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id || id === "undefined" || isNaN(Number(id))) {
    return (
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto text-center" style={{ maxWidth: "56rem" }}>
          <h1 className="text-3xl font-bold mb-4">Invalid Game ID</h1>
          <p className="text-muted-foreground mb-6">
            The game ID provided is not valid.
          </p>
          <Button asChild>
            <Link href="/games">Browse Games</Link>
          </Button>
        </div>
      </div>
    );
  }

  let game: GameDetail | null = null;

  try {
    game = await getGameDetails(id);
    console.log(game);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error("Error fetching game data:", error);
  }

  if (!game) {
    return (
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto text-center" style={{ maxWidth: "56rem" }}>
          <h1 className="text-3xl font-bold mb-4">Game Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn&apos;t load the details for this game. The game
            might not exist or there might be an issue with our API.
          </p>
          <Button asChild>
            <Link href="/games">Browse Games</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto" style={{ maxWidth: "56rem" }}>
        <GameDetailClient game={game} />
      </div>
    </div>
  );
}
