import type { Game } from "./types";
import { buildReviewLinks } from "./reviews";
import { estimateDifficulty, getGameType, getModes } from "./difficulty";

const localGames: Game[] = [
  {
    id: 1,
    slug: "portal-2",
    name: "Portal 2",
    description: "Solve physics-bending test chambers with portals, gels, lasers and one very chatty AI.",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1800&q=80",
    releaseDate: "2011-04-18",
    genres: ["Puzzle", "Adventure"],
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    modes: ["singleplayer", "2-player", "co-op"],
    gameType: "non-shooter",
    difficulty: 2,
    rating: 4.62,
    ratingCount: 130000,
    metacritic: 95,
    playtime: 9,
    tags: ["singleplayer", "co-op", "puzzle", "physics"],
    reviewLinks: buildReviewLinks("Portal 2", "620"),
    source: "local"
  },
  {
    id: 2,
    slug: "minecraft",
    name: "Minecraft",
    description: "Build, explore, survive or create your own rules in one of gaming's biggest sandboxes.",
    coverImage: "https://images.unsplash.com/photo-1607513746994-51f730a44832?auto=format&fit=crop&w=1200&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?auto=format&fit=crop&w=1800&q=80",
    releaseDate: "2011-11-18",
    genres: ["Sandbox", "Survival"],
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"],
    modes: ["singleplayer", "multiplayer", "co-op"],
    gameType: "non-shooter",
    difficulty: 1,
    rating: 4.58,
    ratingCount: 800000,
    metacritic: 93,
    playtime: 60,
    tags: ["family", "sandbox", "survival", "multiplayer", "co-op"],
    reviewLinks: buildReviewLinks("Minecraft"),
    source: "local"
  },
  {
    id: 3,
    slug: "elden-ring",
    name: "Elden Ring",
    description: "An expansive dark fantasy action RPG with a huge open world and demanding combat.",
    coverImage: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=1200&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=80",
    releaseDate: "2022-02-25",
    genres: ["RPG", "Action"],
    platforms: ["PC", "PlayStation", "Xbox"],
    modes: ["singleplayer", "multiplayer", "co-op"],
    gameType: "non-shooter",
    difficulty: 5,
    rating: 4.72,
    ratingCount: 300000,
    metacritic: 96,
    playtime: 55,
    tags: ["souls-like", "singleplayer", "multiplayer", "co-op", "open world"],
    reviewLinks: buildReviewLinks("Elden Ring", "1245620"),
    source: "local"
  },
  {
    id: 4,
    slug: "valorant",
    name: "VALORANT",
    description: "A competitive 5v5 tactical shooter where precise gunplay meets ability-driven team play.",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1800&q=80",
    releaseDate: "2020-06-02",
    genres: ["Shooter", "Action"],
    platforms: ["PC"],
    modes: ["multiplayer"],
    gameType: "shooter",
    difficulty: 4,
    rating: 4.08,
    ratingCount: 120000,
    metacritic: 80,
    playtime: 300,
    tags: ["shooter", "fps", "multiplayer", "competitive", "5v5"],
    reviewLinks: buildReviewLinks("VALORANT"),
    source: "local"
  },
  {
    id: 5,
    slug: "it-takes-two",
    name: "It Takes Two",
    description: "A co-op adventure built entirely around two players solving problems and moving forward together.",
    coverImage: "https://images.unsplash.com/photo-1600080972464-8e5b4c35c9f4?auto=format&fit=crop&w=1200&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1800&q=80",
    releaseDate: "2021-03-26",
    genres: ["Adventure", "Platformer"],
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    modes: ["2-player", "co-op"],
    gameType: "non-shooter",
    difficulty: 2,
    rating: 4.66,
    ratingCount: 150000,
    metacritic: 88,
    playtime: 14,
    tags: ["co-op", "2 player", "family", "platformer"],
    reviewLinks: buildReviewLinks("It Takes Two", "1426210"),
    source: "local"
  },
  {
    id: 6,
    slug: "hades",
    name: "Hades",
    description: "A fast roguelike action game where every escape attempt teaches you something new.",
    coverImage: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=1200&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1800&q=80",
    releaseDate: "2020-09-17",
    genres: ["Action", "RPG"],
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    modes: ["singleplayer"],
    gameType: "non-shooter",
    difficulty: 4,
    rating: 4.71,
    ratingCount: 220000,
    metacritic: 93,
    playtime: 22,
    tags: ["roguelike", "singleplayer", "action", "isometric"],
    reviewLinks: buildReviewLinks("Hades", "1145360"),
    source: "local"
  }
];

export function getLocalGames(): Game[] {
  return localGames;
}

export function slugifyGameName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function normalizeRawgGame(raw: any): Game {
  const genres = Array.isArray(raw.genres) ? raw.genres.map((g: any) => g.name).filter(Boolean) : [];
  const tags = Array.isArray(raw.tags) ? raw.tags.map((t: any) => t.name).filter(Boolean) : [];
  const platforms = Array.isArray(raw.platforms)
    ? raw.platforms.map((p: any) => p.platform?.name).filter(Boolean)
    : [];
  const description = (raw.description_raw || raw.description || "").replace(/<[^>]+>/g, "");
  const steam = Array.isArray(raw.stores)
    ? raw.stores.find((s: any) => s.store?.slug === "steam")?.url?.match(/\/app\/(\d+)/)?.[1]
    : undefined;

  return {
    id: raw.id,
    slug: raw.slug || slugifyGameName(raw.name),
    name: raw.name,
    description,
    coverImage: raw.background_image || "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    backgroundImage: raw.background_image,
    releaseDate: raw.released,
    genres,
    platforms,
    modes: getModes(tags, description),
    gameType: getGameType(genres, tags),
    difficulty: estimateDifficulty(raw.name, tags, genres),
    rating: Number(raw.rating || 0),
    ratingCount: Number(raw.ratings_count || 0),
    metacritic: raw.metacritic ?? undefined,
    playtime: raw.playtime ?? undefined,
    tags,
    reviewLinks: buildReviewLinks(raw.name, steam),
    source: "rawg"
  };
}

export function allLocalAsApiLike() {
  return localGames;
}
