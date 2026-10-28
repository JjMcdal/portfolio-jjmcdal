"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";

const TAGS = [
  "All",
  "Web App",
  "Full-Stack",
  "React",
  "Next.js 16",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "Supabase",
  "Tailwind CSS",
  "shadcn/ui",
  "Vite",
  "Web3 / Ethereum",
  "GitHub Actions",
  "Postman",
  "Database Design",
  "ERD",
  "3D Simulation",
  "Inventory System",
  "Dashboard",
];

function ArrowIcon() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function Projects() {
  const [tag, setTag] = useState("All");
  const list = PROJECTS.filter((project) => tag === "All" || project.tags.includes(tag));

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {TAGS.map((item) => (
          <button
            key={item}
            type="button"
            className={`filter${item === tag ? " on" : ""}`}
            aria-pressed={item === tag}
            onClick={() => setTag(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="proj-grid">
        {list.map((project) => {
          // Keep the selected technology near the front when it is also a tech chip.
          const chips = [...project.tech]
            .sort((a, b) => Number(b === tag) - Number(a === tag))
            .slice(0, 3);

          // Prefer a deployed demo; otherwise link to the first available resource.
          const firstLink = project.links[0];
          const action = project.visit
            ? { label: "Demo", href: project.visit }
            : firstLink
              ? {
                  label: firstLink.label === "GitHub repo" ? "GitHub" : firstLink.label,
                  href: firstLink.href,
                }
              : null;

          return (
            <article className="card" key={project.id}>
              {project.image ? (
                <div className="card-media">
                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    fill
                    sizes="(max-width: 520px) calc(100vw - 4rem), (max-width: 860px) 50vw, 33vw"
                    className={project.imageFit === "contain" ? "contain" : undefined}
                  />
                </div>
              ) : (
                <div className="thumb-box" aria-label={`${project.title} preview is not available yet`}>
                  {project.title}
                </div>
              )}

              <div className="card-body">
                {project.labels && project.labels.length > 0 && (
                  <div className="labels" aria-label="Project categories">
                    {project.labels.slice(0, 2).map((label) => (
                      <span className="label" key={label}>
                        {label}
                      </span>
                    ))}
                  </div>
                )}

                <h3>
                  <Link href={`/projects/${project.id}`} className="card-link">
                    <span>{project.title}</span>
                    <svg
                      className="arrow"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </Link>
                </h3>

                <p>{project.short}</p>

                <div className="chips card-tech" aria-label="Technologies used">
                  {chips.map((technology) => (
                    <span className="chip" key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="card-action">
                  {action ? (
                    <a
                      className="btn solid"
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${action.label}: ${project.title}`}
                    >
                      {action.label}
                      <ArrowIcon />
                    </a>
                  ) : (
                    <span
                      className="btn soon"
                      aria-disabled="true"
                      title="This is an internal government system and has no public demo."
                    >
                      Internal system
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
