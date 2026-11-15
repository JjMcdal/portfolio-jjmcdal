"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Chrome from "@/components/Chrome";
import { JOURNEY } from "@/lib/data";

export default function JourneyPage() {
  const [started, setStarted] = useState(false);
  const [journeyReady, setJourneyReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const detail = useRef<HTMLElement>(null);
  const activeStep = JOURNEY[activeIndex];

  useEffect(() => {
    document.body.style.overflow = journeyReady ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [journeyReady]);

  const startJourney = () => {
    if (started) return;
    setStarted(true);
    window.setTimeout(() => {
      setJourneyReady(true);
      detail.current?.scrollIntoView({ behavior: "smooth" });
    }, 850);
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
        <section className="journey-detail" ref={detail} aria-label="Developer journey story">
          <aside className="journey-detail-side">
            <p className="journey-detail-year">{activeStep.year}</p>
            <p className="journey-detail-kicker">Where it started</p>
            <nav className="journey-years" aria-label="Journey years">
              {JOURNEY.map((step, index) => (
                <button type="button" className={index === activeIndex ? "active" : ""} key={step.year} onClick={() => setActiveIndex(index)}>
                  {step.year}
                </button>
              ))}
            </nav>
          </aside>
          <article className="journey-detail-content">
            <p className="journey-detail-label">{activeStep.year}</p>
            <h2>{activeStep.title}</h2>
            <p>{activeStep.text}</p>
          </article>
        </section>
      </main>
      {started ? (
        <div className="journey-boom" role="status" aria-label="Starting journey">
          <span>2022</span>
        </div>
      ) : null}
    </>
  );
}