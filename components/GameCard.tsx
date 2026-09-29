"use client";

import Link from "next/link";
import { ArrowUpRight, CircleDot, Gamepad2, Star } from "lucide-react";
import type { Game } from "@/lib/types";

export default function GameCard({ game }: { game: Game }) {
  return (
    <article className="game-card">
      <div className="card-image-wrap">
        <img src={game.coverImage} alt={game.name} className="card-image" loading="lazy" />
        <div className="card-overlay"><span>{game.gameType === "shooter" ? "SHOOTER" : "NORMAL"}</span><span>DIFF {game.difficulty}/5</span></div>
      </div>
      <div className="card-body">
        <div className="card-top"><span className="rating"><Star size={14} fill="currentColor"/> {game.rating.toFixed(2)}</span><span className="year">{game.releaseDate?.slice(0,4) || "—"}</span></div>
        <h3>{game.name}</h3>
        <p>{game.genres.slice(0, 3).join(" · ")}</p>
        <div className="pill-row">{(game.modes.length ? game.modes : ["mode data unavailable"]).slice(0,2).map((m) => <span key={m}><Gamepad2 size={12}/>{m.replace("singleplayer", "Single")}</span>)}</div>
        <Link href={`/games/${game.slug}`} className="card-link">Explore game <ArrowUpRight size={16}/></Link>
      </div>
      <div className="card-pin"><CircleDot size={16}/></div>
    </article>
  );
}
