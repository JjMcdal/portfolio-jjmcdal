import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Chrome from "@/components/Chrome";
import { PROJECTS } from "@/lib/data";

type Props = { params: Promise<{ id: string }> };

export const generateStaticParams = () => PROJECTS.map((p) => ({ id: p.id }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = PROJECTS.find((x) => x.id === id);
  return { title: p ? `${p.title} | Jj Mcdal Nabong` : "Project" };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) notFound();
  return (
    <>
      <Chrome />
      <div id="detail"><div className="wrap">
        <Link href="/#projects" className="back">&larr; Back to projects</Link>
        <p className="eyebrow">{p.subtitle}</p>
        <h1>{p.title}</h1>
        <p className="lead">{p.short}</p>
        <div className="thumb-box detail-hero">{p.title}</div>
        <div className="detail-grid">
          <div>
            <h2>Highlights</h2>
            <ul>{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            {p.note && <p className="note">{p.note}</p>}
          </div>
          <dl className="side-box">
            <div><dt>Role</dt><dd>{p.role}</dd></div>
            <div><dt>Period</dt><dd>{p.period}</dd></div>
            <div><dt>Built with</dt><dd className="chips">{p.tech.map((t) => <span className="chip" key={t}>{t}</span>)}</dd></div>
            {p.links.map((l) => <a className="btn solid" key={l.href} href={l.href} target="_blank" rel="noopener">{l.label}</a>)}
          </dl>
        </div>
      </div></div>
    </>
  );
}
