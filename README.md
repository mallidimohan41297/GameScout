# GameScout

A clean, yellow + pink game-discovery web app with a small 3D hero scene, responsive filters, review-source links, and an API-ready backend.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Three.js + React Three Fiber + Drei
- RAWG API (optional)

## Run locally

1. Install Node.js 20.9+.
2. Copy `.env.example` to `.env.local`.
3. Add `RAWG_API_KEY` for live catalog data.
4. Install and run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Without a RAWG key, GameScout works in demo mode with the bundled sample catalog.

## Deploy to Vercel

Push the folder to GitHub, import the repo in Vercel, and add `RAWG_API_KEY` under Project Settings → Environment Variables.

## Notes on data and reviews

GameScout normalizes external metadata into its own internal `Game` model. Difficulty is an app-level estimate on a five-level scale. Review buttons send users to original review/rating platforms rather than copying full review text.

Add the attribution required by the API plan you use. RAWG's current docs describe attribution and usage conditions; check the current terms before production launch.

## Suggested next upgrades

- PostgreSQL/Prisma for persistent cache and favorites
- Redis/Upstash for API caching
- IGDB as a second metadata source
- A dedicated review-source ingestion layer that stores links/ratings only
- A recommendation score using filter match + rating + playtime
- Auth and user collections
- Natural-language recommender: “hard single-player RPG under 30 hours”
