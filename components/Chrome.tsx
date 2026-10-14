"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { EMAIL, GITHUB, PROJECTS } from "@/lib/data";

const SECTIONS = ["about", "experience", "stack", "projects", "contact"];
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);

export default function Chrome() {
  const router = useRouter();
  const [pill, setPill] = useState(false);
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const toggleTheme = useCallback(() => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    setDark(next === "dark");
  }, []);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
    const onScroll = () => {
      setPill(window.scrollY > 40);
      let cur = "";
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
      });
      setActive(cur);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => { if (open) { setQ(""); setSel(0); input.current?.focus(); } }, [open]);

  const go = (path: string) => () => router.push(path);
  const items = [
    ...SECTIONS.map((s) => ({ name: "Go to " + s[0].toUpperCase() + s.slice(1), hint: "section", run: go("/#" + s) })),
    ...PROJECTS.map((p) => ({ name: "Open " + p.title, hint: "project", run: go("/projects/" + p.id) })),
    { name: dark ? "Switch to light mode" : "Switch to dark mode", hint: "action", run: toggleTheme },
    { name: "Send an email", hint: "action", run: () => { location.href = "mailto:" + EMAIL; } },
    { name: "Open GitHub", hint: "link", run: () => { window.open(GITHUB, "_blank", "noopener"); } },
  ].filter((c) => c.name.toLowerCase().includes(q.trim().toLowerCase()));

  const run = (i: number) => { const it = items[i]; if (it) { setOpen(false); it.run(); } };
  const onInputKey = (e: React.KeyboardEvent) => {
    const n = items.length;
    if (!n) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((sel + 1) % n); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSel((sel - 1 + n) % n); }
    if (e.key === "Enter") { e.preventDefault(); run(sel); }
  };

  return (
    <>
      <nav className={"nav" + (pill ? " pill" : "")} aria-label="Main">
        <Link href="/" className="nav-logo">jj.</Link>
        <div className="nav-links">
          {SECTIONS.map((s) => (
            <Link key={s} href={"/#" + s} className={active === s ? "active" : ""}>{s[0].toUpperCase() + s.slice(1)}</Link>
          ))}
        </div>
        <button className="search-btn" onClick={() => setOpen(true)} aria-label="Open command palette">
          <SearchIcon /><span>Search</span><span className="kbd">Ctrl K</span>
        </button>
        <button className="switch" onClick={toggleTheme} aria-label="Toggle dark mode">
          <span className="track"><span className="thumb" /></span>
          <span className="switch-label">{dark ? "Light" : "Dark"}</span>
        </button>
      </nav>

      {open && (
        <div className="palette-bg" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette">
            <header><h2>Command palette</h2><p>Navigate the site or run a quick action</p></header>
            <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} onKeyDown={onInputKey} placeholder="Type a command or search…" autoComplete="off" />
            <ul>
              {items.length ? items.map((c, i) => (
                <li key={c.name}><button className={i === sel ? "sel" : ""} onMouseEnter={() => setSel(i)} onClick={() => run(i)}>{c.name}<small>{c.hint}</small></button></li>
              )) : <li className="empty">No matches.</li>}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
