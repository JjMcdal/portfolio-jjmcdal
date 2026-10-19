"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { EMAIL, GITHUB, PROJECTS } from "@/lib/data";

const SECTIONS = ["about", "experience", "stack", "projects", "contact"];

// Theme state is read from <html data-theme>, so no setState is needed inside an effect
const subscribeTheme = (cb: () => void) => {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
};
const getDark = () => document.documentElement.dataset.theme === "dark";
const getServerDark = () => false;

// Mac detection (⌘K vs Ctrl K), hydration-safe
const subscribeNone = () => () => {};
const getMac = () => /Mac|iPhone|iPad/.test(navigator.userAgent);
const getServerMac = () => false;

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);

export default function Chrome() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [pill, setPill] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const dark = useSyncExternalStore(subscribeTheme, getDark, getServerDark);
  const mac = useSyncExternalStore(subscribeNone, getMac, getServerMac);

  // Show the "jj." logo once the user scrolls, or always on project pages (no hero there)
  const showLogo = pill || !isHome;

  const toggleTheme = useCallback(() => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  }, []);

  const openPalette = () => { setQ(""); setSel(0); setOpen(true); };

  // On the home page, scroll smoothly to the top instead of navigating
  const goHome = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", "/"); // remove the #section from the URL
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setPill(window.scrollY > 40);
      // Scroll-spy: the last section whose top passed 40% of the viewport is "active"
      let cur = "";
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
      });
      setActive(cur);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQ(""); setSel(0);
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);

  // While the palette is open: focus the input, lock body scroll, and restore focus on close
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    input.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      prev?.focus?.({ preventScroll: true });
    };
  }, [open]);

  const go = (path: string) => () => router.push(path);
  const items = [
    ...SECTIONS.map((s) => ({ name: "Go to " + s[0].toUpperCase() + s.slice(1), hint: "section", run: go("/#" + s) })),
    ...PROJECTS.map((p) => ({ name: "Open " + p.title, hint: "project", run: go("/projects/" + p.id) })),
    { name: dark ? "Switch to light mode" : "Switch to dark mode", hint: "action", run: toggleTheme },
    { name: "Send an email", hint: "action", run: () => { window.location.assign("mailto:" + EMAIL); } },
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

  // Focus trap: keep Tab / Shift+Tab inside the dialog
  const onDialogKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !dialog.current) return;
    const f = dialog.current.querySelectorAll<HTMLElement>("input, button");
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  return (
    <>
      <nav className={"nav" + (pill ? " pill" : "")} aria-label="Main">
        <Link
          href="/"
          onClick={goHome}
          className={"nav-logo" + (showLogo ? "" : " hide")}
          aria-hidden={!showLogo}
          tabIndex={showLogo ? 0 : -1}
        >
          jj.
        </Link>
        <div className="nav-links">
          {SECTIONS.map((s) => (
            <Link key={s} href={"/#" + s} className={active === s ? "active" : ""} aria-current={active === s ? "location" : undefined}>
              {s[0].toUpperCase() + s.slice(1)}
            </Link>
          ))}
        </div>
        <button className="search-btn" onClick={openPalette} aria-label="Open command palette">
          <SearchIcon /><span>Search</span><span className="kbd">{mac ? "⌘ K" : "Ctrl K"}</span>
        </button>
        <button className="switch" onClick={toggleTheme} aria-label="Toggle dark mode">
          <span className="track"><span className="thumb" /></span>
          <span className="switch-label">{dark ? "Light" : "Dark"}</span>
        </button>
      </nav>

      {open && (
        <div className="palette-bg" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div ref={dialog} onKeyDown={onDialogKey} className="palette" role="dialog" aria-modal="true" aria-label="Command palette">
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