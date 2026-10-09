import type { Metadata } from "next";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHero, SectionHead, CTALink } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources — VLSI Roadmaps, Tutorials & Interview Preparation",
  description:
    "Semiconductor engineering resources: VLSI learning roadmaps, UVM and timing-closure tutorials, interview preparation guides and honest industry analysis.",
};

export default function ResourcesPage() {
  const [featured, ...rest] = articles;
  return (
    <>
      <PageHero
        kicker="RESOURCES & INSIGHTS"
        title={
          <>
            KNOWLEDGE THAT
            <br />
            <span className="text-signal">SURVIVES INTERVIEWS.</span>
          </>
        }
        text="Practitioner-written articles, roadmaps and preparation guides. No recycled question lists — the mental models engineers actually get tested on."
        image={{ src: "/images/circuit-macro.jpg", alt: "Circuit routing macro" }}
      />

      <section className="relative border-t border-line-soft bg-void py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          {/* featured */}
          <Reveal>
            <Link to={`/resources/${featured.slug}`}
              className="corners group grid gap-8 border border-line bg-panel p-8 transition-colors hover:border-signal/50 md:grid-cols-[1fr_auto] md:p-12"
            >
              <div>
                <div className="flex items-center gap-4">
                  <span className="chip-tab"><span className="dot" />{featured.category}</span>
                  <span className="font-mono text-[0.6rem] tracking-[0.2em] text-ash">{featured.minutes} MIN READ</span>
                </div>
                <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-tight text-paper md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-mist">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-signal">
                  Read the roadmap
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
              <span className="hidden font-display text-8xl font-bold text-outline md:block" aria-hidden="true">
                R.01
              </span>
            </Link>
          </Reveal>

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 70}>
                <Link to={`/resources/${a.slug}`}
                  className="group flex h-full flex-col border border-line bg-panel p-7 transition-colors hover:border-signal/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="chip-tab"><span className="dot" />{a.category}</span>
                    <span className="font-mono text-[0.6rem] tracking-[0.2em] text-ash">{a.minutes} MIN</span>
                  </div>
                  <h2 className="mt-5 font-display text-xl font-semibold leading-snug text-paper">{a.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{a.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal">
                    Read article <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-line-soft bg-obsidian py-24 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <SectionHead
              kicker="WANT STRUCTURED LEARNING?"
              title={
                <>
                  ARTICLES INFORM.
                  <br />
                  <span className="text-signal">PROGRAMS TRANSFORM.</span>
                </>
              }
              text="Everything in this library is free to read. When you are ready for laboratories, reviews and mentorship, the programs are the next step."
            />
            <div className="flex flex-wrap gap-4 md:justify-end">
              <CTALink href="/training">Browse programs</CTALink>
              <CTALink href="/contact" variant="ghost">Request a topic</CTALink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
