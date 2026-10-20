"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";

const SECTIONS = ["about", "experience", "stack", "projects", "contact"];
type CommandGroup = "Navigate" | "Actions";
type CommandIcon = "home" | "about" | "experience" | "stack" | "projects" | "contact" | "theme";
type Command = { name: string; group: CommandGroup; icon: CommandIcon; run: () => void };

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

const CommandIcon = ({ name }: { name: CommandIcon }) => {
  const paths = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></>,
    about: <><circle cx="12" cy="8" r="3" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
    experience: <><circle cx="12" cy="8" r="3" /><path d="m9 13-1 8 4-2 4 2-1-8" /></>,
    stack: <><path d="M4 6h16v12H4z" /><path d="M8 10h8M8 14h5" /></>,
    projects: <><path d="M3 7h6l2 2h10v9H3z" /><path d="M3 7V5h6l2 2" /></>,
    contact: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    theme: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  };
  return <svg className="command-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

export default function Chrome() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [pill, setPill] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const dark = useSyncExternalStore(subscribeTheme, getDark, getServerDark);
  const mac = useSyncExternalStore(subscribeNone, getMac, getServerMac);

  // Keep the home hero clean; reveal the brand only after the 20px threshold.
  const showLogo = isHome && scrolled;

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
  const navigateToSection = (section: string) => {
    const scrollToSection = () => {
      const target = document.getElementById(section);
      if (!target) return;
      history.pushState(null, "", `/#${section}`);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (isHome) scrollToSection();
    else {
      router.push(`/#${section}`);
      window.setTimeout(scrollToSection, 150);
    }
  };
  const goHomeCommand = () => {
    if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
    else router.push("/");
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setPill(window.scrollY > 20);
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

  const commands: Command[] = [
    { name: "Home", group: "Navigate", icon: "home", run: goHomeCommand },
    ...SECTIONS.map((s) => ({
      name: s === "stack" ? "Tech Stack" : s[0].toUpperCase() + s.slice(1),
      group: "Navigate" as const,
      icon: s as CommandIcon,
      run: () => navigateToSection(s),
    })),
    { name: "Toggle Dark Mode", group: "Actions", icon: "theme", run: toggleTheme },
  ];
  const items = commands.filter((c) => c.name.toLowerCase().includes(q.trim().toLowerCase()));

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
          {SECTIONS.map((s) => {
            const label = s[0].toUpperCase() + s.slice(1);
            return (
              <Link
                key={s}
                href={"/#" + s}
                data-label={label} // read by the CSS ::after that reserves the bold width
                className={active === s ? "active" : ""}
                aria-current={active === s ? "location" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </div>
        <button className={"search-btn" + (pill ? " scrolled" : "")} onClick={openPalette} aria-label="Open command palette">
          <span className="search-icon"><SearchIcon /></span>
          <span className="search-label">Search</span>
          <span className="kbd">{mac ? "⌘ K" : "Ctrl K"}</span>
        </button>
        <button className="switch" onClick={toggleTheme} aria-label="Toggle dark mode">
          <span className="track"><span className="thumb" /></span>
          <span className="switch-label">{dark ? "Light" : "Dark"}</span>
        </button>
      </nav>

      {open && (
        <div className="palette-bg" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div ref={dialog} onKeyDown={onDialogKey} className="palette" role="dialog" aria-modal="true" aria-label="Command palette">
            <div className="palette-search"><SearchIcon /><input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} onKeyDown={onInputKey} placeholder="Type a command or search..." autoComplete="off" /></div>
            <ul>
              {items.length ? (["Navigate", "Actions"] as CommandGroup[]).map((group) => {
                const grouped = items.filter((item) => item.group === group);
                if (!grouped.length) return null;
                return <li className="command-group" key={group}><p>{group}</p>{grouped.map((c) => { const i = items.indexOf(c); return <button key={c.name} className={i === sel ? "sel" : ""} onMouseEnter={() => setSel(i)} onClick={() => run(i)}><CommandIcon name={c.icon} /><span>{c.name}</span></button>; })}</li>;
              }) : <li className="empty">No matches.</li>}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}