"use client";
import { useEffect, useRef, useState } from "react";

export type ContributionCell = { date: string; count: number; level: number };
export type ContributionYear = { year: number; cells: ContributionCell[] };

const LEVELS = ["none", "low", "medium", "high", "peak"] as const;
const DAY_MS = 24 * 60 * 60 * 1000;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// 1 -> 1st, 2 -> 2nd, 11 -> 11th (same wording GitHub uses)
function ordinal(n: number) {
  if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
  return `${n}${["th", "st", "nd", "rd"][n % 10] ?? "th"}`;
}

function describe(cell: ContributionCell) {
  const [, m, d] = cell.date.split("-").map(Number);
  const when = `${MONTHS[m - 1]} ${ordinal(d)}`;
  if (cell.count === 0) return `No contributions on ${when}`;
  return `${cell.count} contribution${cell.count === 1 ? "" : "s"} on ${when}`;
}

// Every column is one week (Sunday first), every row is one weekday
function buildLayout(year: number, cells: ContributionCell[]) {
  const jan1 = Date.UTC(year, 0, 1);
  const offset = new Date(jan1).getUTCDay(); // blank slots before Jan 1 in the first week
  const dayIndex = (y: number, m: number, d: number) => Math.round((Date.UTC(y, m, d) - jan1) / DAY_MS) + offset;

  const placed = cells.map((cell) => {
    const [y, m, d] = cell.date.split("-").map(Number);
    const idx = dayIndex(y, m - 1, d);
    return { cell, week: Math.floor(idx / 7), day: idx % 7 };
  });
  const months = MONTHS.map((name, i) => ({ label: name.slice(0, 3), week: Math.floor(dayIndex(year, i, 1) / 7) }));
  const weeks = Math.floor(dayIndex(year, 11, 31) / 7) + 1;
  return { placed, months, weeks };
}

type Tip = { text: string; x: number; y: number };

export default function GithubContributionsClient({ years, profileUrl }: { years: ContributionYear[]; profileUrl: string }) {
  const [year, setYear] = useState(years.at(-1)?.year ?? 2026);
  const [tip, setTip] = useState<Tip | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const selected = years.find((entry) => entry.year === year) ?? years[0];
  const cells = selected?.cells ?? [];
  const { placed, months, weeks } = buildLayout(year, cells);
  const total = cells.reduce((sum, cell) => sum + cell.count, 0);

  // Start at the newest week, like GitHub does on small screens
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [year]);

  // One handler for the whole grid instead of 365 listeners
  const showTip = (e: React.SyntheticEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-tip]");
    if (!el) return setTip(null);
    const rect = el.getBoundingClientRect();
    setTip({ text: el.dataset.tip ?? "", x: rect.left + rect.width / 2, y: rect.top });
  };

  return (
    <section className="github-section" aria-labelledby="github-title">
      <div className="github-card">
        <div className="github-card-head">
          <div>
            <p className="github-kicker">GitHub contributions</p>
            <h2 id="github-title">{total} contributions in {year}</h2>
          </div>
          <div className="github-actions">
            <div className="github-years" role="group" aria-label="Contribution year">
              {years.map((entry) => (
                <button
                  key={entry.year}
                  className={entry.year === year ? "active" : ""}
                  aria-pressed={entry.year === year}
                  onClick={() => { setTip(null); setYear(entry.year); }}
                >
                  {entry.year}
                </button>
              ))}
            </div>
            <a href={profileUrl} target="_blank" rel="noopener noreferrer">View profile ↗</a>
          </div>
        </div>

        <div className="github-scroll" ref={scroller} onScroll={() => setTip(null)}>
          <div
            className="github-grid"
            style={{ gridTemplateColumns: `auto repeat(${weeks}, var(--cell))` }}
            onMouseOver={showTip}
            onMouseLeave={() => setTip(null)}
            onClick={showTip}
          >
            {months.map((m) => (
              <span className="github-month" aria-hidden="true" key={m.label} style={{ gridRow: 1, gridColumn: m.week + 2 }}>{m.label}</span>
            ))}
            {[["Mon", 3], ["Wed", 5], ["Fri", 7]].map(([label, row]) => (
              <span className="github-day" aria-hidden="true" key={label} style={{ gridRow: row, gridColumn: 1 }}>{label}</span>
            ))}
            {placed.map(({ cell, week, day }) => (
              <span
                key={cell.date}
                role="img"
                aria-label={describe(cell)}
                data-tip={describe(cell)}
                className={`github-cell ${LEVELS[Math.min(cell.level, 4)]}`}
                style={{ gridRow: day + 2, gridColumn: week + 2 }}
              />
            ))}
          </div>
        </div>

        <div className="github-legend" aria-hidden="true">
          <span>Less</span>{LEVELS.map((level) => <i className={`github-cell ${level}`} key={level} />)}<span>More</span>
        </div>
      </div>

      {tip && <div className="github-tip" aria-hidden="true" style={{ left: tip.x, top: tip.y }}>{tip.text}</div>}
    </section>
  );
}