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
        <div className="filters" role="tablist">
          {STACK_CATS.map((c) => (
            <button key={c} className={"filter" + (c === cat ? " on" : "")} onClick={() => setCat(c)}>
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