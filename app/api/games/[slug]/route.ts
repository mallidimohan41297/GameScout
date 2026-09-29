import { NextResponse } from "next/server";
import { getLocalGames } from "@/lib/games";
import { getRawgGameBySlug } from "@/lib/rawg";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const local = getLocalGames().find((game) => game.slug === slug);
  if (local) return NextResponse.json(local);

  const rawg = await getRawgGameBySlug(slug);
  if (!rawg) return NextResponse.json({ error: "Game not found" }, { status: 404 });

  return NextResponse.json(rawg);
}
