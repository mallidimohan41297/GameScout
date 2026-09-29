import { NextRequest, NextResponse } from "next/server";
import { allLocalAsApiLike, normalizeRawgGame } from "@/lib/games";
import type { Difficulty, GameMode, GameType } from "@/lib/types";

const genreIds: Record<string, number> = {
  action: 4, adventure: 3, rpg: 5, strategy: 10, shooter: 2, puzzle: 7,
  racing: 1, sports: 15, simulation: 14, platformer: 83, arcade: 11, fighting: 6
};

const platformIds: Record<string, number> = {
  pc: 4, playstation: 18, ps5: 187, xbox: 1, "xbox series": 186, switch: 7, mobile: 3
};

function parseDifficulty(value: string | null): Difficulty | null {
  if (!value || value === "all") return null;
  const number = Number(value);
  return number >= 1 && number <= 5 ? (number as Difficulty) : null;
}

function parseMode(value: string | null): GameMode | null {
  return value && value !== "all" ? (value as GameMode) : null;
}

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const query = sp.get("q") || "";
  const genre = sp.get("genre") || "all";
  const platform = sp.get("platform") || "all";
  const difficulty = parseDifficulty(sp.get("difficulty"));
  const mode = parseMode(sp.get("mode"));
  const gameType = (sp.get("gameType") || "all") as GameType | "all";
  const page = Math.max(1, Number(sp.get("page") || "1"));

  const local = allLocalAsApiLike().filter((game) => {
    if (query && !game.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (genre !== "all" && !game.genres.some((g) => g.toLowerCase() === genre.toLowerCase())) return false;
    if (platform !== "all" && !game.platforms.some((p) => p.toLowerCase().includes(platform.toLowerCase()))) return false;
    if (difficulty && game.difficulty !== difficulty) return false;
    if (mode && !game.modes.includes(mode)) return false;
    if (gameType !== "all" && game.gameType !== gameType) return false;
    return true;
  });

  const apiKey = process.env.RAWG_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ results: local, nextPage: null, source: "local-demo" });
  }

  const url = new URL("https://api.rawg.io/api/games");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("page", String(page));
  url.searchParams.set("page_size", "24");
  url.searchParams.set("ordering", "-rating");
  if (query) url.searchParams.set("search", query);
  if (genre !== "all" && genreIds[genre]) url.searchParams.set("genres", String(genreIds[genre]));
  if (platform !== "all" && platformIds[platform]) url.searchParams.set("platforms", String(platformIds[platform]));

  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) {
    return NextResponse.json({ results: local, nextPage: null, source: "local-fallback", warning: "RAWG request failed" }, { status: 200 });
  }

  const data = await response.json();
  const results = data.results.map(normalizeRawgGame).filter((game: any) => {
    if (difficulty && game.difficulty !== difficulty) return false;
    if (mode && !game.modes.includes(mode)) return false;
    if (gameType !== "all" && game.gameType !== gameType) return false;
    return true;
  });

  return NextResponse.json({ results, nextPage: data.next ? page + 1 : null, source: "rawg" });
}
