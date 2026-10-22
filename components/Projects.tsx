"use client";
import { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";

const TAGS = [
  "All", "Web App", "Full-Stack", "React", "Next.js 16", "TypeScript", "JavaScript",
  "Node.js", "Express.js", "PostgreSQL", "Supabase", "Tailwind CSS", "shadcn/ui", "Vite",
  "Web3 / Ethereum", "GitHub Actions", "Postman", "Database Design", "ERD", "3D Simulation",
  "Inventory System", "Dashboard",
];

export default function Projects() {
  const [tag, setTag] = useState("All");
  const list = PROJECTS.filter((p) => tag === "All" || p.tags.includes(tag));

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {TAGS.map((t) => (
          <button
            key={t}
            className={"filter" + (t === tag ? " on" : "")}
            aria-pressed={t === tag}
            onClick={() => setTag(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="proj-grid">
        {list.map((p) => {
          // Show the selected tag first so the card always explains why it matched
          const chips = [...p.tech].sort((a, b) => Number(b === tag) - Number(a === tag)).slice(0, 4);
          return (
            <Link href={`/projects/${p.id}`} className="card" key={p.id}>
              <div className="thumb-box">{p.title}</div>
              <div className="card-body">
                <h3>
                  {p.title}
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                </h3>
                <p>{p.short}</p>
                <div className="chips">{chips.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}