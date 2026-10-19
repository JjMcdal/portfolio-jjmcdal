"use client";
import { useState } from "react";
import { STACK, STACK_CATS } from "@/lib/data";
import StackIcon from "./StackIcon";

export default function Stack() {
  const [cat, setCat] = useState("All");
  const list = STACK.filter((t) => cat === "All" || t.cat === cat);

  return (
    <section id="stack">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">03 - TECH STACK</p>
          <h2 className="sec-title">Tools I build with</h2>
        </div>
        {/* These are toggle buttons, not tabs, so aria-pressed is the correct attribute */}
        <div className="filters" role="group" aria-label="Filter tech stack">
          {STACK_CATS.map((c) => (
            <button
              key={c}
              className={"filter" + (c === cat ? " on" : "")}
              aria-pressed={c === cat}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="stack-grid">
          {list.map((t) => (
            <span
              key={t.name}
              className="tool"
              style={{ "--brand": t.color } as React.CSSProperties}
            >
              <StackIcon slug={t.slug} />
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}