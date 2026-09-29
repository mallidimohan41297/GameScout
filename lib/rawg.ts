import { normalizeRawgGame } from "./games";

export async function getRawgGameBySlug(slug: string) {
  const apiKey = process.env.RAWG_API_KEY;
  if (!apiKey) return null;

  const url = new URL(`https://api.rawg.io/api/games/${encodeURIComponent(slug)}`);
  url.searchParams.set("key", apiKey);

  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) return null;

  const raw = await response.json();
  return normalizeRawgGame(raw);
}
