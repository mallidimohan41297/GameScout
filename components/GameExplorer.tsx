"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Sparkles, SlidersHorizontal } from "lucide-react";
import dynamic from "next/dynamic";
import type { Game } from "@/lib/types";
import type { FilterState } from "@/lib/filter";
import { matchesFilters } from "@/lib/filter";
import FilterPanel from "./FilterPanel";
import GameCard from "./GameCard";

const ThreeHero = dynamic(() => import("./ThreeHero"), { ssr: false, loading: () => <div className="three-canvas"/> });

const DEFAULT_FILTER: FilterState = {
  difficulty: "all",
  mode: "all",
  genre: "all",
  gameType: "all",
  platform: "all",
  minRating: 0,
  query: ""
};

export default function GameExplorer({ compactHero = false }: { compactHero?: boolean }) {
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiSource, setApiSource] = useState("local-demo");
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [mobileFilters, setMobileFilters] = useState(false);

  async function loadGames(reset = false, explicitPage?: number) {
    setLoading(true);
    const requestedPage = explicitPage ?? (reset ? 1 : page);
    const params = new URLSearchParams({
      q: filter.query,
      genre: filter.genre,
      platform: filter.platform,
      difficulty: String(filter.difficulty),
      mode: filter.mode,
      gameType: filter.gameType,
      page: String(requestedPage)
    });
    try {
      const response = await fetch(`/api/games?${params.toString()}`);
      const data = await response.json();
      setApiSource(data.source || "unknown");
      setGames((current) => reset ? data.results : [...current, ...data.results]);
      setNextPage(data.nextPage);
    } catch {
      setGames([]);
      setNextPage(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPage(1);
      loadGames(true);
    }, 260);
    return () => window.clearTimeout(timer);
  }, [filter.query, filter.genre, filter.platform, filter.difficulty, filter.mode, filter.gameType]);

  const visibleGames = useMemo(() => games.filter((game) => matchesFilters(game, filter)), [games, filter]);

  const reset = () => setFilter(DEFAULT_FILTER);

  return (
    <main>
      <header className="site-header shell">
        <Link href="/" className="brand"><span className="brand-dot" /> GameScout</Link>
        <nav className="nav-links"><Link href="/games">Browse</Link><a href="#how">How it works</a></nav>
        <Link href="/games" className="header-button">Open catalog <ArrowRight size={16}/></Link>
      </header>

      {!compactHero && (
        <section className="hero shell">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15}/> 500K+ game discovery concept</div>
            <h1>Stop scrolling.<br/><em>Start playing.</em></h1>
            <p>Build a game match from difficulty, player count, genre, platform, shooter style and real-world review sources.</p>
            <div className="hero-actions"><a className="primary-button" href="#discover">Find my game <ArrowRight size={18}/></a><Link className="secondary-button" href="/games">Browse everything</Link></div>
            <div className="hero-proof"><span><b>5</b> difficulty levels</span><span><b>4</b> player modes</span><span><b>6</b> review sources</span></div>
          </div>
          <ThreeHero />
        </section>
      )}

      <section id="discover" className="shell explorer-section">
        <div className="explorer-heading">
          <div><span className="section-kicker">DISCOVERY ENGINE</span><h2>{compactHero ? "Game catalog" : "Tell GameScout what you want"}</h2></div>
          <button className="mobile-filter-button" onClick={() => setMobileFilters((v) => !v)}><SlidersHorizontal size={18}/> Filters</button>
        </div>

        <div className="explorer-grid">
          <div className={mobileFilters ? "filter-mobile open" : "filter-mobile"}><FilterPanel filter={filter} setFilter={setFilter} onReset={reset} /></div>
          <div className="results-column">
            <div className="search-row"><div className="search-box"><Search size={18}/><input value={filter.query} onChange={(e) => setFilter((f) => ({ ...f, query: e.target.value }))} placeholder="Search Minecraft, Elden Ring, Valorant..."/></div><div className="result-meta"><strong>{visibleGames.length}</strong> matches <span>·</span> {apiSource === "rawg" ? "RAWG + GameScout" : "Demo data"}</div></div>
            <div className="quick-row"><button className="quick-chip" onClick={() => setFilter((f) => ({ ...f, difficulty: 5 }))}>Boss-level hard</button><button className="quick-chip" onClick={() => setFilter((f) => ({ ...f, mode: "co-op" }))}>Co-op night</button><button className="quick-chip" onClick={() => setFilter((f) => ({ ...f, gameType: "shooter" }))}>Shooters</button><button className="quick-chip" onClick={() => setFilter((f) => ({ ...f, genre: "RPG" }))}>RPGs</button></div>

            {loading && !games.length ? <div className="empty-state"><div className="loader-orbit"/><h3>Loading your next obsession…</h3><p>Pulling game metadata and building matches.</p></div> : visibleGames.length ? <>
              <div className="game-grid">{visibleGames.map((game) => <GameCard game={game} key={`${game.source}-${game.id}`}/>)}</div>
              {nextPage && <button className="load-more" onClick={() => { setPage(nextPage); loadGames(false, nextPage); }} disabled={loading}>{loading ? "Loading…" : "Load more games"}</button>}
            </> : <div className="empty-state"><div className="empty-burst">✦</div><h3>No exact matches yet.</h3><p>Relax one filter or search a broader game title.</p><button className="secondary-button" onClick={reset}>Reset filters</button></div>}
          </div>
        </div>
      </section>

      <section id="how" className="shell feature-strip">
        <div><span className="feature-number">01</span><h3>Normalize</h3><p>Different API fields get converted into a consistent GameScout model.</p></div>
        <div><span className="feature-number">02</span><h3>Match</h3><p>Filters narrow the catalog before a lightweight recommendation layer takes over.</p></div>
        <div><span className="feature-number">03</span><h3>Verify</h3><p>Review buttons send people back to original sources instead of copying their content.</p></div>
      </section>

      <footer className="shell footer">Built for Vercel · Next.js · React · Three.js · RAWG-ready · Add required API attribution in production.</footer>
    </main>
  );
}
