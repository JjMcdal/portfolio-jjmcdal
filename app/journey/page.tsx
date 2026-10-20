import Link from "next/link";
import type { Metadata } from "next";
import Chrome from "@/components/Chrome";
import { JOURNEY } from "@/lib/data";

export const metadata: Metadata = { title: "My Journey | Jj Mcdal Nabong" };

export default function JourneyPage() {
  return (
    <>
      <Chrome />
      <div id="detail"><div className="wrap">
        <Link href="/#about" className="back">&larr; Back to about</Link>
        <p className="eyebrow">JOURNEY</p>
        <h1>My path to becoming a developer</h1>
        <p className="lead">The same six chapters from the About section, with the full story behind each one.</p>
        <ol className="chapters">
          {JOURNEY.map((s, i) => (
            <li key={s.year}>
              <p className="chapter-meta">Chapter {i + 1} · {s.year}</p>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div></div>
    </>
  );
}