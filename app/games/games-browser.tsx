"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Flame,
  RefreshCw,
  SearchIcon,
  SearchX,
  WifiOff,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAppId } from "@/lib/games";
import { GameCard, GameCardSkeleton } from "./game-card";
import { FeaturedHero } from "./hero";
import { Ads } from "@/components/ads";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://vaultapi.parcoil.com";

const MIN_QUERY_LENGTH = 3;

interface GamesBrowserProps {
  initialGames: unknown[];
  initialError?: boolean;
}

export function GamesBrowser({
  initialGames,
  initialError = false,
}: GamesBrowserProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const runSearch = useCallback(async (term: string) => {
    const trimmed = term.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setSearchError(false);
    setHasSearched(true);

    try {
      const res = await fetch(
        `${API_URL}/games/search?q=${encodeURIComponent(trimmed)}`,
        { signal: controller.signal }
      );
      if (!res.ok) throw new Error(`Search failed (${res.status})`);
      const data: { games?: unknown[] } = await res.json();
      if (!controller.signal.aborted) {
        setResults(Array.isArray(data.games) ? data.games : []);
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      if (!controller.signal.aborted) setSearchError(true);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query.trim().length < MIN_QUERY_LENGTH) return;
    const timer = window.setTimeout(() => runSearch(query), 350);
    return () => window.clearTimeout(timer);
  }, [query, runSearch]);

  const clearSearch = () => {
    abortRef.current?.abort();
    setQuery("");
    setResults([]);
    setHasSearched(false);
    setSearchError(false);
  };

  const isSearching = query.trim().length >= MIN_QUERY_LENGTH;
  const featuredGame = initialGames[0];
  const remainingGames = initialGames.slice(1);

  return (
    <div>
      <div className="relative mx-auto mb-10" style={{ maxWidth: "42rem" }}>
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runSearch(query)}
          placeholder="Search for games..."
          aria-label="Search for games"
          className="py-2 pl-10 pr-10"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isSearching ? (
        <SearchResults
          query={query}
          results={results}
          loading={loading}
          hasSearched={hasSearched}
          error={searchError}
          onRetry={() => runSearch(query)}
          onClear={clearSearch}
        />
      ) : initialError || initialGames.length === 0 ? (
        <OfflineState
          onRetry={() => {
            window.location.reload();
          }}
        />
      ) : (
        <>
          {featuredGame && <FeaturedHero game={featuredGame} />}

          {remainingGames.length > 0 && (
            <section className="mt-12">
              <div className="mb-6 flex items-center gap-3">
                <h2 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
                  <Flame className="h-7 w-7 text-orange-500" />
                  Hot Games
                </h2>
                <p className="text-sm text-muted-foreground">
                  {remainingGames.length} trending now
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {remainingGames.map((game, index) => (
                  <GameCard
                    key={getAppId(game) || index}
                    game={game}
                    index={index}
                    eager={index < 4}
                  />
                ))}
              </div>
            </section>
          )}

          <Ads variant="native" className="mt-12" />
        </>
      )}
    </div>
  );
}

function SearchResults({
  query,
  results,
  loading,
  hasSearched,
  error,
  onRetry,
  onClear,
}: {
  query: string;
  results: unknown[];
  loading: boolean;
  hasSearched: boolean;
  error: boolean;
  onRetry: () => void;
  onClear: () => void;
}) {
  if (error && !loading) {
    return (
      <SearchErrorState
        query={query}
        onRetry={onRetry}
      />
    );
  }

  if (results.length > 0) {
    return (
      <section>
        <div className="mb-6 flex items-center gap-3">
          <h2 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
            <SearchIcon className="h-7 w-7 text-primary" />
            Results
          </h2>
          <p className="text-sm text-muted-foreground">
            {loading ? (
              "Searching..."
            ) : (
              <>
                Found {results.length} game
                {results.length === 1 ? "" : "s"} for &quot;{query}&quot;
              </>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((game, index) => (
            <GameCard key={getAppId(game) || index} game={game} index={index} />
          ))}
        </div>
      </section>
    );
  }

  if (hasSearched && !loading) {
    return <EmptySearchState query={query} onClear={onClear} />;
  }

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <h2 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
          <SearchIcon className="h-7 w-7 text-primary" />
          Results
        </h2>
        <p className="text-sm text-muted-foreground">Searching...</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <GameCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

function OfflineState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <WifiOff className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="mb-2 text-2xl font-semibold">We couldn&apos;t load games</h2>
      <p className="mb-6 max-w-md text-muted-foreground">
        Our API seems to be offline right now. Please check your connection and
        try again.
      </p>
      <Button variant="outline" className="gap-2" onClick={onRetry}>
        <RefreshCw className="h-4 w-4" />
        Try again
      </Button>
    </div>
  );
}

function SearchErrorState({
  query,
  onRetry,
}: {
  query: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">Search failed</h2>
      <p className="mb-6 max-w-md text-muted-foreground">
        Something went wrong while searching for &quot;{query}&quot;. Please try
        again.
      </p>
      <Button variant="outline" className="gap-2" onClick={onRetry}>
        <RefreshCw className="h-4 w-4" />
        Try again
      </Button>
    </div>
  );
}

function EmptySearchState({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">No games found</h2>
      <p className="mb-6 max-w-md text-muted-foreground">
        We couldn&apos;t find any games matching &quot;{query}&quot;. Try a
        different search term.
      </p>
      <Button variant="outline" onClick={onClear}>
        Clear search
      </Button>
    </div>
  );
}
