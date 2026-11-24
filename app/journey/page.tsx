"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Chrome from "@/components/Chrome";
import { JOURNEY } from "@/lib/data";

export default function JourneyPage() {
  const [started, setStarted] = useState(false);
  const [journeyReady, setJourneyReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const story = useRef<HTMLElement>(null);
  const steps = useRef<(HTMLElement | null)[]>([]);
  const activeStep = JOURNEY[activeIndex];

  // Page stays locked on the hero until Get Started is pressed and the intro finishes.
  // After that it unlocks for good, so the hero is still reachable by scrolling up.
  useEffect(() => {
    document.body.style.overflow = journeyReady ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [journeyReady]);

  // Scroll-spy: the story crossing the middle of the screen becomes the active year
  useEffect(() => {
    if (!journeyReady) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    steps.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [journeyReady]);

  const startJourney = () => {
    if (started) return;
    setStarted(true);
    // Jump to the story while the black overlay covers the screen. The hero stays above it.
    window.setTimeout(() => {
      setActiveIndex(0);
      setJourneyReady(true);
      const top = (story.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
      window.scrollTo({ top, behavior: "instant" });
    }, 850);
  };

  const jumpTo = (index: number) => {
    const el = steps.current[index];
    if (!el) return;
    // scrollIntoView adds the 6rem scroll-padding-top from globals.css, which pushes the first year down
    // and reveals the hero above it. Compute the exact position instead, so the step is centered.
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY + rect.height / 2 - window.innerHeight / 2;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <Chrome variant="journey" />
      <main className="journey-page">
        <section className="journey-hero">
          <div className="wrap journey-hero-grid">
            <div className="journey-hero-copy">
              <Link href="/#about" className="back">&larr; Back to about</Link>
              <p className="eyebrow">JOURNEY</p>
              <h1>MY PATH TO BECOMING A DEVELOPER</h1>
              <p className="lead">A story about learning in public, finding my footing, and building systems that help real people do meaningful work.</p>
              <button type="button" onClick={startJourney} className="journey-primary">Get Started <span aria-hidden="true">&rarr;</span></button>
            </div>
            <figure className="journey-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pogi.jpg" alt="Jj Mcdal Nabong working on a laptop" width={520} height={640} />
              <figcaption>Jj Mcdal Nabong, developer and lifelong learner.</figcaption>
            </figure>
          </div>
        </section>

        <section id="story" ref={story} className="journey-detail wrap" aria-label="Developer journey story">
          <aside className="journey-detail-side">
            <p className="journey-detail-year">{activeStep.year}</p>
            <p className="journey-detail-kicker">Where it started</p>
            <nav className="journey-years" aria-label="Journey years">
              {JOURNEY.map((step, index) => (
                <button
                  type="button"
                  className={index === activeIndex ? "active" : ""}
                  aria-current={index === activeIndex ? "true" : undefined}
                  key={step.year}
                  onClick={() => jumpTo(index)}
                >
                  {step.year}
                </button>
              ))}
            </nav>
          </aside>
          <div className="journey-detail-stories">
            {JOURNEY.map((step, index) => (
              <article
                className="journey-step"
                key={step.year}
                data-index={index}
                ref={(el) => { steps.current[index] = el; }}
              >
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      {started ? (
        <div className="journey-boom" role="status" aria-label="Starting journey">
          <span>2022-2026</span>
        </div>
      ) : null}
    </>
  );
}