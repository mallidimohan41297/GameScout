import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ChevronLeft, Clock3, Star, Users } from "lucide-react";
import { getLocalGames } from "@/lib/games";
import { getRawgGameBySlug } from "@/lib/rawg";

export default async function GameDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getLocalGames().find((item) => item.slug === slug) || (await getRawgGameBySlug(slug));

  if (!game) notFound();

  return (
    <main>
      <header className="site-header shell">
        <Link href="/" className="brand"><span className="brand-dot" /> GameScout</Link>
        <Link href="/games" className="nav-link">Browse games</Link>
      </header>

      <section className="detail-hero shell">
        <div className="detail-art" style={{ backgroundImage: `linear-gradient(115deg, rgba(255,255,255,.95), rgba(255,255,255,.68)), url(${game.backgroundImage || game.coverImage})` }}>
          <div className="detail-copy">
            <Link href="/games" className="back-link"><ChevronLeft size={17}/> Back to discovery</Link>
            <div className="eyebrow pink">{game.gameType === "shooter" ? "SHOOTER" : "NON-SHOOTER"} · {game.genres.slice(0,2).join(" · ")}</div>
            <h1>{game.name}</h1>
            <p>{game.description || "Explore this title through its metadata, ratings and original review sources."}</p>
            <div className="detail-stat-row">
              <div className="stat-chip"><Star size={16} fill="currentColor"/> {game.rating ? game.rating.toFixed(2) : "—"}</div>
              <div className="stat-chip"><Users size={16}/> {game.modes.length ? game.modes.join(" · ") : "Mode data not listed"}</div>
              <div className="stat-chip"><Clock3 size={16}/> {game.playtime ? `${game.playtime}h listed playtime` : "Playtime varies"}</div>
            </div>
          </div>
          <img src={game.coverImage} alt={game.name} className="detail-cover" />
        </div>
      </section>

      <section className="shell detail-grid">
        <article className="detail-panel">
          <div className="panel-heading">
            <div><span className="section-kicker">MATCH PROFILE</span><h2>How this game fits</h2></div>
            <span className="difficulty-badge">Difficulty {game.difficulty}/5</span>
          </div>
          <div className="match-bars">
            <div><span>Difficulty</span><div className="bar"><i style={{ width: `${game.difficulty * 20}%` }}/></div></div>
            <div><span>Community rating</span><div className="bar"><i style={{ width: `${Math.min(100, game.rating * 20)}%` }}/></div></div>
          </div>
          <div className="tag-cloud">{game.genres.map((g) => <span key={g}>{g}</span>)}{game.platforms.slice(0,8).map((p) => <span key={p} className="alt">{p}</span>)}</div>
          <p className="muted">Difficulty is a GameScout estimate for discovery, not an official rating. API-sourced games are normalized into the same five-level scale.</p>
        </article>

        <article className="detail-panel review-panel">
          <div className="panel-heading"><div><span className="section-kicker">REVIEW SOURCES</span><h2>Go to the originals</h2></div></div>
          <div className="review-list">
            {game.reviewLinks.map((review) => (
              <a href={review.url} target="_blank" rel="noreferrer" className="review-row" key={review.source}>
                <div><strong>{review.source}</strong><span>{review.label}</span></div>
                <ArrowUpRight size={18}/>
              </a>
            ))}
          </div>
          <p className="muted">GameScout links out to original review/rating platforms instead of copying their full review text.</p>
        </article>
      </section>

      <footer className="shell footer">GameScout uses external game metadata and outbound review sources. Add the required attribution for whichever API plan you use.</footer>
    </main>
  );
}
