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

function currentStreak(cells: ContributionCell[], today: Date) {
  const dates = new Set(cells.filter((cell) => cell.count > 0).map((cell) => cell.date));
  const current = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const todayKey = current.toISOString().slice(0, 10);
  const yesterday = new Date(current);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const startKey = dates.has(todayKey) ? todayKey : yesterday.toISOString().slice(0, 10);

  if (!dates.has(startKey)) return 0;

  let streak = 0;
  while (dates.has(startKey)) {
    streak += 1;
    const day = new Date(`${startKey}T00:00:00Z`);
    day.setUTCDate(day.getUTCDate() - streak);
    if (!dates.has(day.toISOString().slice(0, 10))) break;
  }
  return streak;
}

function longestStreak(cells: ContributionCell[]) {
  const dates = new Set(cells.filter((cell) => cell.count > 0).map((cell) => cell.date));
  let longest = 0;

  for (const date of dates) {
    const previous = new Date(`${date}T00:00:00Z`);
    previous.setUTCDate(previous.getUTCDate() - 1);
    if (dates.has(previous.toISOString().slice(0, 10))) continue;

    let streak = 0;
    const day = new Date(`${date}T00:00:00Z`);
    while (dates.has(day.toISOString().slice(0, 10))) {
      streak += 1;
      day.setUTCDate(day.getUTCDate() + 1);
    }
    longest = Math.max(longest, streak);
  }

  return longest;
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
  const currentYearCells = years.at(-1)?.cells ?? [];
  const [streak, setStreak] = useState(0);
  const longest = longestStreak(currentYearCells);

  // Start at the newest week, like GitHub does on small screens
  useEffect(() => {
    const timer = window.setTimeout(() => setStreak(currentStreak(years.at(-1)?.cells ?? [], new Date())), 0);
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
    return () => window.clearTimeout(timer);
  }, [years, year]);

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
            <p className="github-kicker"><svg className="github-mark" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.64 0 8.13c0 3.59 2.29 6.63 5.47 7.7.4.08.55-.18.55-.39 0-.19-.01-.83-.01-1.5-2.23.5-2.7-1.1-2.7-1.1-.36-.95-.89-1.2-.89-1.2-.73-.51.06-.5.06-.5.81.06 1.24.85 1.24.85.72 1.26 1.88.9 2.34.69.07-.53.28-.9.51-1.11-1.78-.21-3.65-.91-3.65-4.02 0-.89.31-1.62.82-2.19-.08-.21-.36-1.04.08-2.16 0 0 .67-.22 2.2.84A7.4 7.4 0 0 1 8 3.87c.68 0 1.37.1 2.01.3 1.53-1.06 2.2-.84 2.2-.84.44 1.12.16 1.95.08 2.16.51.57.82 1.3.82 2.19 0 3.12-1.87 3.8-3.66 4.01.29.26.54.77.54 1.56 0 1.12-.01 2.02-.01 2.3 0 .22.14.48.55.39A8.14 8.14 0 0 0 16 8.13C16 3.64 12.42 0 8 0Z" /></svg><span>GitHub contributions</span></p>
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

        <div className="github-card-foot">
          <div className="github-streaks">
            <p className="github-streak"><strong>{streak}-day streak</strong><span>current streak</span></p>
            <p className="github-streak"><strong>{longest}-day streak</strong><span>longest streak</span></p>
          </div>
          <div className="github-legend" aria-hidden="true">
            <span>Less</span>{LEVELS.map((level) => <i className={`github-cell ${level}`} key={level} />)}<span>More</span>
          </div>
        </div>
      </div>

      {tip && <div className="github-tip" aria-hidden="true" style={{ left: tip.x, top: tip.y }}>{tip.text}</div>}
    </section>
  );
}