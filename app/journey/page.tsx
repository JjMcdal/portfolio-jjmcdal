"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Chrome from "@/components/Chrome";
import { JOURNEY } from "@/lib/data";

export default function JourneyPage() {
  const [started, setStarted] = useState(false);
  const [journeyReady, setJourneyReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const steps = useRef<(HTMLElement | null)[]>([]);
  const activeStep = JOURNEY[activeIndex];

  // Lock scroll only while the black intro animation is playing
  useEffect(() => {
    document.body.style.overflow = started && !journeyReady ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [started, journeyReady]);

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
    // Swap to the story view while the black overlay covers the screen
    window.setTimeout(() => {
      setActiveIndex(0);
      setJourneyReady(true);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 850);
  };

  const jumpTo = (index: number) => {
    steps.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <Chrome variant="journey" />
      <main className="journey-page">
        {!journeyReady && (
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
        )}

        {journeyReady && (
          <section id="story" className="journey-detail wrap" aria-label="Developer journey story">
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
        )}
      </main>
      {started ? (
        <div className="journey-boom" role="status" aria-label="Starting journey">
          <span>2022-2026</span>
        </div>
      ) : null}
    </>
  );
}