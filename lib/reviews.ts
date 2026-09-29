import type { ReviewLink } from "./types";

const search = (base: string, query: string) => `${base}${encodeURIComponent(query)}`;

export function buildReviewLinks(name: string, steamSlug?: string): ReviewLink[] {
  const links: ReviewLink[] = [
    {
      source: "IGN",
      label: "Find IGN review",
      url: search("https://www.ign.com/search?q=", name),
      kind: "review"
    },
    {
      source: "GameSpot",
      label: "Find GameSpot review",
      url: search("https://www.gamespot.com/search/?q=", name),
      kind: "review"
    },
    {
      source: "OpenCritic",
      label: "See critic scores",
      url: search("https://opencritic.com/search?q=", name),
      kind: "rating"
    },
    {
      source: "Metacritic",
      label: "See critic + user ratings",
      url: search("https://www.metacritic.com/search/", name),
      kind: "rating"
    }
  ];

  if (steamSlug) {
    links.unshift({
      source: "Steam",
      label: "Open Steam reviews",
      url: `https://store.steampowered.com/app/${steamSlug}/#app_reviews_hash`,
      kind: "reviews"
    });
  }

  return links;
}
