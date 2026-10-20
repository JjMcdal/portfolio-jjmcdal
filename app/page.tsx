import Stack from "@/components/Stack";
import Link from "next/link";
import Chrome from "@/components/Chrome";
import { BUILT_FOR, CERTS, CONTACTS, EMAIL, FACEBOOK, GITHUB, JOURNEY, JOURNEY_LABEL, JOURNEY_PATH, LINKEDIN, PROJECTS, type ContactLink } from "@/lib/data";

const Label = ({ n, children }: { n: string; children: string }) => (
  <p className="eyebrow">{n} - {children.toUpperCase()}</p>
);
const MailIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
const FolderIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
);
const LinkedInIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);
const GlobeIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
);
const Arrow = () => (
  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
);
const ArrowRight = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
const Brand = ({ slug }: { slug: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img className="bi" src={`https://cdn.simpleicons.org/${slug}/0a0a0a`} alt="" width={22} height={22} />
);
const ContactIcon = ({ icon }: { icon: ContactLink["icon"] }) => {
  switch (icon) {
    case "facebook": return <Brand slug="facebook" />;
    case "github": return <Brand slug="github" />;
    case "gmail": return <Brand slug="gmail" />;
    case "linkedin": return <LinkedInIcon />;
    case "site": return <GlobeIcon />;
  }
};

const FOOTER_LINKS = [
  { label: "Email", href: `mailto:${EMAIL}`, icon: "gmail" as const },
  { label: "Facebook", href: FACEBOOK, icon: "facebook" as const },
  { label: "GitHub", href: GITHUB, icon: "github" as const },
  { label: "LinkedIn", href: LINKEDIN, icon: "linkedin" as const },
];

export default function Home() {
  const marquee = [...BUILT_FOR, ...BUILT_FOR, ...BUILT_FOR, ...BUILT_FOR];
  return (
    <>
      <Chrome />
      <main>
        <section className="hero" id="home">
          <div className="wrap">
            {/* h1 so the page has a main heading for SEO and screen readers */}
            <h1 className="hero-title"><span className="iam">I am</span><span className="name">jjmcdal</span></h1>
            <p>Full-stack developer building web and mobile systems, from database and API to polished UI.</p>
            <div className="hero-actions">
              <Link href="/#projects" className="btn solid"><FolderIcon />View projects</Link>
              <a href="/jjmcdal-cv.pdf" target="_blank" rel="noopener noreferrer" className="btn"><MailIcon />Open CV</a>
            </div>
          </div>
        </section>

        <section className="marquee-sec" aria-label="Built for">
          <p className="marquee-label">Built for</p>
          <div className="marquee"><div className="marquee-track">
            {/* Only the first set is read by screen readers; the rest are visual duplicates for the loop */}
            {[...marquee, ...marquee].map((n, i) => (
              <span className="marquee-item" key={i} aria-hidden={i >= BUILT_FOR.length ? true : undefined}>{n}</span>
            ))}
          </div></div>
        </section>

        <section id="about">
          <div className="wrap">
            <Label n="01">About</Label>
            <div className="about">
              <div className="avatar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/pogi.jpg" alt="Jj Mcdal Nabong" width={220} height={220} />
              </div>
              <div>
                <h2>Hi, I&apos;m Jj Mcdal Nabong</h2>
                <p>I&apos;m a Computer Science graduate from the University of Caloocan City. I build web systems end to end: the database, the API, and the interface people actually use. My thesis, the Regulatory Compliance Verification System, was handed over to the Bureau of Animal Industry.</p>
                <p>During my OJT at the Schools Division Office of Caloocan City, I built an inventory system that tracks 1,000+ digital assets across 80+ public schools. I&apos;m now looking for a Full-Stack Engineer role in Metro Manila.</p>
              </div>
            </div>

            {/* Sibling of .about, not a child of it, so the avatar/text grid stays untouched */}
            <h3 className="story-title">The entire tale <span>is presented correctly.</span></h3>
            <div className="journey">
              <div className="journey-intro">
                <p className="journey-url">{JOURNEY_LABEL}</p>
                <h4>My path to becoming a developer.</h4>
                <p>From exploring Computer Science in 2022 to a thesis handed over to a government agency. Four years, told in six chapters.</p>
                <Link href={JOURNEY_PATH} className="journey-btn">Go through the narrative <ArrowRight /></Link>
              </div>
              <ol className="journey-list">
                {JOURNEY.map((s) => (
                  <li key={s.year}>
                    <span className="journey-year">{s.year}</span>
                    <span>{s.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="wrap">
            <div className="sec-head"><Label n="02">Experience</Label><h2 className="sec-title">Where I&apos;ve worked</h2></div>
            <div className="exp-grid">
              <div>
                <p className="col-label">Work</p>
                <article className="entry">
                  <div className="entry-icon" aria-hidden="true">UCC</div>
                  <div>
                    <p className="entry-meta">Aug 2025 – Mar 2026 · Caloocan City</p>
                    <h3>Research Developer</h3>
                    <p className="org">Thesis: Regulatory Compliance Verification System</p>
                    <ul>
                      <li>Built a Web3-enabled compliance platform that was handed over to the Bureau of Animal Industry.</li>
                      <li>Set up GitHub Actions CI/CD to deploy to Vercel, Railway, Heroku, and Firebase.</li>
                      <li>Won Thesis of the Year, Best Technical Documentation, and Best Research Developer.</li>
                    </ul>
                  </div>
                </article>
                <article className="entry">
                  <div className="entry-icon" aria-hidden="true">SDO</div>
                  <div>
                    <p className="entry-meta">May – Jul 2025 · Caloocan City</p>
                    <h3>OJT Developer</h3>
                    <p className="org">Schools Division Office of Caloocan City</p>
                    <ul>
                      <li>Built an inventory management system with React and Node.js for 1,000+ digital assets across 80+ public schools.</li>
                      <li>Optimized PostgreSQL queries, making data retrieval 40% faster.</li>
                      <li>Added automated reporting and audit logs.</li>
                    </ul>
                  </div>
                </article>
              </div>
              <div>
                <p className="col-label">Education</p>
                <article className="entry">
                  <div className="entry-icon" aria-hidden="true">UCC</div>
                  <div><p className="entry-meta">Class of 2026</p><h3>University of Caloocan City</h3><p className="org">BS Computer Science</p></div>
                </article>
                <p className="col-label" style={{ marginTop: "2.5rem" }}>Certifications</p>
                <ul className="chips">{CERTS.map((c) => <li className="chip" key={c}>{c}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <Stack />

        <section id="projects">
          <div className="wrap">
            <div className="sec-head"><Label n="04">Projects</Label><h2 className="sec-title">My Projects</h2></div>
            <div className="proj-grid">
              {PROJECTS.map((p) => (
                <Link href={`/projects/${p.id}`} className="card" key={p.id}>
                  <div className="thumb-box">{p.title}</div>
                  <div className="card-body">
                    <h3>{p.title}<Arrow /></h3>
                    <p>{p.short}</p>
                    <div className="chips">{p.tech.slice(0, 4).map((t) => <span className="chip" key={t}>{t}</span>)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="wrap">
            <div className="sec-head"><Label n="05">Contact</Label><h2 className="sec-title">Get in touch</h2><p className="sec-sub">Hiring, or have a project in mind? Reach me here.</p></div>
            <div className="contact-list">
              {CONTACTS.map((c) => (
                <a className="contact-row" key={c.name} href={c.href} target="_blank" rel="noopener noreferrer">
                  <ContactIcon icon={c.icon} />
                  <span className="val">{c.label}</span>
                  <Arrow />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="wrap foot">
          <div className="foot-left"><b>jj.</b> <span>&copy; 2026 Jj Mcdal Nabong</span></div>
          <nav className="footer-links" aria-label="Social and contact links">
            {FOOTER_LINKS.map((link) => (
              <a
                className="footer-link"
                key={link.label}
                href={link.href}
                target={link.icon === "gmail" ? undefined : "_blank"}
                rel={link.icon === "gmail" ? undefined : "noopener noreferrer"}
                aria-label={link.label}
              >
                <ContactIcon icon={link.icon} />
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}