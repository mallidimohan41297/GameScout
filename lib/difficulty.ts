import type { Difficulty, GameMode, GameType } from "./types";

const HARD_TERMS = [
  "souls-like",
  "dark souls",
  "roguelike",
  "roguelite",
  "hardcore",
  "survival horror",
  "bullet hell",
  "strategy",
  "grand strategy",
  "simulator"
];

const EASY_TERMS = ["family", "casual", "puzzle", "party", "hidden object", "kids"];

export function estimateDifficulty(name: string, tags: string[], genres: string[]): Difficulty {
  const haystack = `${name} ${tags.join(" ")} ${genres.join(" ")}`.toLowerCase();
  let score = 3;
  if (HARD_TERMS.some((term) => haystack.includes(term))) score += 1;
  if (haystack.includes("souls") || haystack.includes("precision")) score += 1;
  if (EASY_TERMS.some((term) => haystack.includes(term))) score -= 1;
  if (haystack.includes("relaxing")) score -= 1;
  return Math.max(1, Math.min(5, score)) as Difficulty;
}

export function getGameType(genres: string[], tags: string[]): GameType {
  const haystack = `${genres.join(" ")} ${tags.join(" ")}`.toLowerCase();
  return /(shooter|fps|third-person shooter|first-person shooter|battle royale)/.test(haystack)
    ? "shooter"
    : "non-shooter";
}

export function getModes(tags: string[], description = ""): GameMode[] {
  const haystack = `${tags.join(" ")} ${description}`.toLowerCase();
  const modes = new Set<GameMode>();

  if (/(singleplayer|single-player|single player)/.test(haystack)) modes.add("singleplayer");
  if (/(2 player|two player|local multiplayer|split screen|couch co-op)/.test(haystack)) modes.add("2-player");
  if (/(multiplayer|online pvp|competitive)/.test(haystack)) modes.add("multiplayer");
  if (/(co-op|co op|cooperative)/.test(haystack)) modes.add("co-op");

  return [...modes];
}
