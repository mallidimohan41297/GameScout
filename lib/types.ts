export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type GameMode = "singleplayer" | "2-player" | "multiplayer" | "co-op";

export type GameType = "shooter" | "non-shooter";

export type ReviewLink = {
  source: string;
  label: string;
  url: string;
  kind: "rating" | "review" | "reviews";
};

export type Game = {
  id: number | string;
  slug: string;
  name: string;
  description: string;
  coverImage: string;
  backgroundImage?: string;
  releaseDate?: string;
  genres: string[];
  platforms: string[];
  modes: GameMode[];
  gameType: GameType;
  difficulty: Difficulty;
  rating: number;
  ratingCount: number;
  metacritic?: number;
  playtime?: number;
  tags: string[];
  reviewLinks: ReviewLink[];
  source: "rawg" | "local";
};
