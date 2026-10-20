import Link from "next/link";
import type { Metadata } from "next";
import Chrome from "@/components/Chrome";

export const metadata: Metadata = { title: "My Journey | Jj Mcdal Nabong" };

export default function JourneyPage() {
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
              <Link href="/#about" className="journey-primary">Get Started <span aria-hidden="true">&rarr;</span></Link>
            </div>
            <figure className="journey-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pogi.jpg" alt="Jj Mcdal Nabong working on a laptop" width={520} height={640} />
              <figcaption>Jj Mcdal Nabong, developer and lifelong learner. 2026.</figcaption>
            </figure>
          </div>
        </section>
      </main>
    </>
  );
}