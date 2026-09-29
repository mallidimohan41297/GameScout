import type { Difficulty, Game, GameMode, GameType } from "./types";

export type FilterState = {
  difficulty: Difficulty | "all";
  mode: GameMode | "all";
  genre: string | "all";
  gameType: GameType | "all";
  platform: string | "all";
  minRating: number;
  query: string;
};

export function matchesFilters(game: Game, filter: FilterState) {
  const query = filter.query.trim().toLowerCase();
  const searchHit = !query || `${game.name} ${game.genres.join(" ")} ${game.tags.join(" ")}`.toLowerCase().includes(query);

  if (!searchHit) return false;
  if (filter.difficulty !== "all" && game.difficulty !== filter.difficulty) return false;
  if (filter.mode !== "all" && !game.modes.includes(filter.mode)) return false;
  if (filter.genre !== "all" && !game.genres.some((g) => g.toLowerCase() === filter.genre.toLowerCase())) return false;
  if (filter.gameType !== "all" && game.gameType !== filter.gameType) return false;
  if (filter.platform !== "all" && !game.platforms.some((p) => p.toLowerCase().includes(filter.platform.toLowerCase()))) return false;
  if (game.rating < filter.minRating) return false;

  return true;
}
