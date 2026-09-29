"use client";

import type { FilterState } from "@/lib/filter";
import type { Difficulty, GameMode, GameType } from "@/lib/types";

const difficulties: Array<Difficulty | "all"> = ["all", 1, 2, 3, 4, 5];
const difficultyLabels: Record<string, string> = { all: "Any", "1": "Very easy", "2": "Easy", "3": "Medium", "4": "Hard", "5": "Very hard" };
const modes: Array<GameMode | "all"> = ["all", "singleplayer", "2-player", "multiplayer", "co-op"];
const genres = ["all", "Action", "Adventure", "RPG", "Strategy", "Shooter", "Puzzle", "Racing", "Sports", "Simulation", "Platformer"];
const platforms = ["all", "PC", "PlayStation", "Xbox", "Switch", "Mobile"];

export default function FilterPanel({ filter, setFilter, onReset }: { filter: FilterState; setFilter: React.Dispatch<React.SetStateAction<FilterState>>; onReset: () => void }) {
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) => setFilter((current) => ({ ...current, [key]: value }));

  return (
    <aside className="filter-panel">
      <div className="filter-title-row"><div><span className="section-kicker">CONTROL ROOM</span><h2>Build your match</h2></div><button className="text-button" onClick={onReset}>Reset</button></div>

      <section className="filter-group"><label>Difficulty</label><div className="choice-grid six">{difficulties.map((item) => <button key={String(item)} className={filter.difficulty === item ? "choice active" : "choice"} onClick={() => set("difficulty", item)}>{difficultyLabels[String(item)]}</button>)}</div></section>
      <section className="filter-group"><label>Players</label><div className="choice-grid">{modes.map((item) => <button key={item} className={filter.mode === item ? "choice active" : "choice"} onClick={() => set("mode", item)}>{item === "all" ? "Any" : item.replace("singleplayer", "Single").replace("multiplayer", "Multi").replace("co-op", "Co-op")}</button>)}</div></section>
      <section className="filter-group"><label>Genre</label><select value={filter.genre} onChange={(e) => set("genre", e.target.value)}>{genres.map((g) => <option key={g} value={g}>{g === "all" ? "Any genre" : g}</option>)}</select></section>
      <section className="filter-group"><label>Game type</label><div className="choice-grid"><button className={filter.gameType === "all" ? "choice active" : "choice"} onClick={() => set("gameType", "all")}>All</button><button className={filter.gameType === "non-shooter" ? "choice active" : "choice"} onClick={() => set("gameType", "non-shooter")}>Normal</button><button className={filter.gameType === "shooter" ? "choice active" : "choice"} onClick={() => set("gameType", "shooter")}>Shooting</button></div></section>
      <section className="filter-group"><label>Platform</label><select value={filter.platform} onChange={(e) => set("platform", e.target.value)}>{platforms.map((p) => <option key={p} value={p}>{p === "all" ? "Any platform" : p}</option>)}</select></section>
      <section className="filter-group"><div className="range-row"><label>Minimum rating</label><strong>{filter.minRating.toFixed(1)}+</strong></div><input type="range" min="0" max="5" step="0.1" value={filter.minRating} onChange={(e) => set("minRating", Number(e.target.value))}/></section>

      <div className="filter-note">API games are normalized into GameScout's five-level difficulty scale. That difficulty is an estimate, not an official publisher metric.</div>
    </aside>
  );
}
