"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ButtonGroup } from "@/components/ui/button-group";
import { Search as SearchIcon, X } from "lucide-react";
import Image from "next/image";

interface Game {
  appid: number;
  name: string;
  relevanceScore?: number;
}

interface SearchResponse {
  total: number;
  page: number;
  perPage: number;
  games: Game[];
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleSearch = async () => {
    if (query.length < 3) return;
    setLoading(true);
    setHasSearched(true);
    setSearchError(false);
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://vaultapi.parcoil.com";
      const res = await fetch(
        `${apiUrl}/games/search?q=${encodeURIComponent(query)}`
      );
      if (res.ok) {
        const data: SearchResponse = await res.json();
        setResults(data.games);
      } else {
        setSearchError(true);
      }
    } catch {
      setSearchError(true);
    }
    setLoading(false);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="mx-auto" style={{ maxWidth: "42rem" }}>
      <div className="relative">
        <ButtonGroup className="w-full">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for games..."
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 text-muted-foreground hover:text-foreground transition-colors"
              style={{ transform: "translateY(-50%)" }}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <Button
            onClick={handleSearch}
            disabled={loading || query.length < 3}
            className="font-semibold"
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </ButtonGroup>
      </div>

      {hasSearched && results.length === 0 && !loading && !searchError && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No games found for &quot;{query}&quot;. Try a different search term.
          </p>
        </div>
      )}

      {searchError && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Oops, something went wrong. Our API seems to be offline.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-8">
          <p className="text-muted-foreground mb-4">
            Found {results.length} game{results.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results
              .filter((game) => game.appid)
              .map((game, index) => (
                <Card
                  key={game.appid}
                  className="group overflow-hidden transition-all duration-300 pt-0"
                  style={{
                    animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`,
                    transform:
                      hoveredCard === game.appid ? "scale(1.02)" : "scale(1)",
                    boxShadow:
                      hoveredCard === game.appid
                        ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                        : undefined,
                  }}
                  onMouseEnter={() => setHoveredCard(game.appid)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardHeader className="p-0">
                    <div
                      className="relative overflow-hidden bg-muted"
                      style={{ aspectRatio: "460/215" }}
                    >
                      <Image
                        src={`https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg?t=1749053861`}
                        alt={`${game.name} header`}
                        width={460}
                        height={215}
                        className="w-full h-full object-cover transition-transform duration-500"
                        style={{
                          transform:
                            hoveredCard === game.appid
                              ? "scale(1.1)"
                              : "scale(1)",
                        }}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent transition-opacity duration-300"
                        style={{
                          opacity: hoveredCard === game.appid ? 1 : 0,
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
                    <Button asChild className="w-full font-semibold">
                      <Link href={`/games/${game.appid}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

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
    </div>
  );
}
