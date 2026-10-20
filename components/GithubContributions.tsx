import { cacheLife } from "next/cache";
import { GITHUB } from "@/lib/data";
import GithubContributionsClient, { type ContributionYear } from "./GithubContributionsClient";

const YEARS = [2024, 2025, 2026] as const;

type ContributionCell = { date: string; count: number; level: number };

function parseContributions(html: string, year: number): ContributionYear {
  // Tooltip text holds the real count, e.g. "3 contributions on ..." or "No contributions on ..."
  const counts = new Map<string, number>();
  for (const m of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>\s*(No|\d+)\s+contributions?/g)) {
    counts.set(m[1], m[2] === "No" ? 0 : Number(m[2]));
  }

  const cells: ContributionCell[] = [];
  // Match both the current <td> markup and the older <rect> markup
  const tags = html.match(/<(?:td|rect)\b[^>]*\bdata-date="[^"]+"[^>]*>/g) ?? [];
  for (const tag of tags) {
    const date = tag.match(/data-date="([^"]+)"/)?.[1];
    if (!date?.startsWith(`${year}-`)) continue;
    const level = Number(tag.match(/data-level="(\d+)"/)?.[1] ?? 0);
    const id = tag.match(/\bid="([^"]+)"/)?.[1];
    const count =
      (id ? counts.get(id) : undefined) ?? Number(tag.match(/data-count="(\d+)"/)?.[1] ?? 0);
    cells.push({ date, count, level });
  }
  return { year, cells };
}

async function fetchYear(year: number): Promise<ContributionYear> {
  "use cache"; // must be the first statement in the function
  cacheLife("hours"); // replaces next: { revalidate: 3600 }

  // Safe here because the result is cached
  const now = new Date();
  const from = `${year}-01-01`;
  const to = year === now.getFullYear() ? now.toISOString().slice(0, 10) : `${year}-12-31`;

  const response = await fetch(`https://github.com/users/JjMcdal/contributions?from=${from}&to=${to}`, {
    headers: { "User-Agent": "portfolio-jjmcdal" },
  });
  if (!response.ok) throw new Error(`GitHub returned ${response.status}`);

  const parsed = parseContributions(await response.text(), year);
  // Throw instead of returning empty data, so a bad parse is never cached for an hour
  if (parsed.cells.length === 0) throw new Error(`No contribution cells parsed for ${year}`);
  return parsed;
}

export default async function GithubContributions() {
  let years: ContributionYear[];
  try {
    years = await Promise.all(YEARS.map(fetchYear));
  } catch {
    // Fallback only. It is not cached, because the throw happens inside fetchYear
    years = YEARS.map((year) => ({ year, cells: [] }));
  }
  return <GithubContributionsClient years={years} profileUrl={GITHUB} />;
}