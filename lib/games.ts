export interface GameGenre {
  id?: string;
  description?: string;
}

export interface SteamGame {
  appid?: number;
  steam_appid?: number;
  id?: number;
  name?: string;
  type?: string;
  short_description?: string;
  header_image?: string;
  background?: string;
  background_raw?: string;
  release_date?: {
    coming_soon?: boolean;
    date?: string;
  };
  genres?: GameGenre[];
  metacritic?: {
    score?: number;
    url?: string;
  };
  [key: string]: unknown;
}

export const PLACEHOLDER_HEADER =
  "https://placehold.co/460x215/1e1b2e/ffffff?text=No+Image";

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

export function getAppId(game: unknown): number {
  const record = asRecord(game);
  if (!record) return 0;
  const raw = record.appid ?? record.steam_appid ?? record.id;
  const id = typeof raw === "number" ? raw : Number(raw);
  return Number.isFinite(id) && id > 0 ? id : 0;
}

export function getGenres(game: unknown): string[] {
  const record = asRecord(game);
  if (!record || !Array.isArray(record.genres)) return [];
  return record.genres
    .map((genre) => asRecord(genre)?.description)
    .filter((genre): genre is string => Boolean(genre));
}

export function getRating(game: unknown): number | undefined {
  const record = asRecord(game);
  const score = asRecord(record?.metacritic)?.score;
  return typeof score === "number" && Number.isFinite(score)
    ? score
    : undefined;
}

export function getReleaseDate(game: unknown): string | undefined {
  const record = asRecord(game);
  const date = asRecord(record?.release_date)?.date;
  return typeof date === "string" && date ? date : undefined;
}

export function getHeaderImage(game: unknown): string {
  const record = asRecord(game);
  if (typeof record?.header_image === "string" && record.header_image) {
    return record.header_image;
  }
  const appId = getAppId(game);
  return appId
    ? `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`
    : PLACEHOLDER_HEADER;
}

export function getHeroImage(game: unknown): string {
  const record = asRecord(game);
  if (typeof record?.background === "string" && record.background) {
    return record.background;
  }
  const appId = getAppId(game);
  return appId
    ? `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/library_hero.jpg`
    : getHeaderImage(game);
}

export function getGameName(game: unknown): string {
  const record = asRecord(game);
  return typeof record?.name === "string" && record.name
    ? record.name
    : "Unknown Game";
}

export function normalizeGames(raw: unknown): SteamGame[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<number>();
  const games: SteamGame[] = [];
  for (const game of raw) {
    const id = getAppId(game);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    games.push({ ...(game as SteamGame), appid: id });
  }
  return games;
}
