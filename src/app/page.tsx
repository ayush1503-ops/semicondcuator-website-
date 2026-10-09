import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { EditorialHero } from "@/components/home/EditorialHero";
import { ChipExperience } from "@/components/ChipExperience";
import { WorkflowScroll } from "@/components/home/WorkflowScroll";
import { DisciplineIndex } from "@/components/home/DisciplineIndex";
import { LabSection } from "@/components/home/LabSection";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { SectionHead, Tag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { courses, articles } from "@/lib/content";

const marquee = [
  "RTL DESIGN", "UVM VERIFICATION", "PHYSICAL DESIGN", "DFT", "ASIC / SOC",
  "EMBEDDED", "AI × SILICON", "TIMING CLOSURE", "TAPE-OUT",
];

function MarqueeStrip() {
  const row = [...marquee, ...marquee];
  return (
    <div className="overflow-hidden border-b border-line bg-white py-4" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-10">
        {row.map((m, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-[0.64rem] tracking-[0.32em] text-ash">
            {m}
            <span className="h-1 w-1 rounded-full bg-signal/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Mission() {
  return (
    <section className="relative bg-void py-24 md:py-32" aria-label="About the platform">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="kicker">THE PLATFORM</p>
            <h2 className="headline-xl mt-6 max-w-xl text-4xl text-paper md:text-[3.2rem] md:leading-[1.08]">
              Silicon is the substrate of modern civilisation.
              <span className="text-signal"> We engineer the engineers.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-end lg:col-span-5">
            <p className="leading-relaxed text-mist md:text-lg">
              Chiprion is a semiconductor engineering platform combining deep technical
              education with real design services. We train engineers the way design teams
              actually work — then connect that talent to universities, recruiters and chip
              companies.
            </p>
            <Link to="/about" className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-signal hover:text-flare">
              How Chiprion works <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {[
            {
              k: "01 · LEARN",
              t: "Engineering education",
              d: "Ten structured programs from VLSI fundamentals to AI-assisted design, built around laboratory work and professional review discipline.",
            },
            {
              k: "02 · BUILD",
              t: "Design services",
              d: "RTL, verification, physical design, DFT and embedded engineering services delivered by practicing engineers.",
            },
            {
              k: "03 · CONNECT",
              t: "Industry ecosystem",
              d: "Universities, recruiters and semiconductor companies connected through one credible engineering channel.",
            },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 90}>
              <div className="h-full bg-white p-8">
                <span className="font-mono text-[0.62rem] tracking-[0.28em] text-signal">{c.k}</span>
                <h3 className="mt-4 font-display text-xl text-paper">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedPrograms() {
  const featured = courses.filter((c) => c.featured);
  return (
    <section className="relative border-t border-line bg-white py-24 md:py-32" aria-label="Featured programs">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            kicker="FEATURED PROGRAMS"
            title={
              <>
                Training built like
                <br />
                an <span className="text-signal">engineering project.</span>
              </>
            }
          />
          <Reveal>
            <Link to="/training" className="btn btn-ghost">
              All 10 programs <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((c, i) => (
            <Reveal key={c.slug} delay={i * 80}>
              <Link to={`/training/${c.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-signal/60 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <Tag>{c.level}</Tag>
                  <span className="font-mono text-[0.62rem] tracking-[0.2em] text-ash">{c.code}</span>
                </div>
                <h3 className="mt-6 font-display text-[1.3rem] leading-snug text-paper">{c.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{c.short}</p>
                <div className="mt-6 border-t border-line-soft pt-4">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">{c.duration}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-signal">
                    Curriculum
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourceTeaser() {
  return (
    <section className="relative border-t border-line bg-void py-24 md:py-32" aria-label="Resources and insights">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            kicker="RESOURCES & INSIGHTS"
            title={
              <>
                Engineering knowledge,
                <br />
                <span className="text-signal">written by practitioners.</span>
              </>
            }
          />
          <Reveal>
            <Link to="/resources" className="btn btn-ghost">
              All resources <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => (
            <Reveal key={a.slug} delay={i * 90}>
              <Link to={`/resources/${a.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-8 transition-all hover:-translate-y-1 hover:border-signal/60 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <span className="chip-tab">
                    <span className="dot" />
                    {a.category}
                  </span>
                  <span className="font-mono text-[0.6rem] tracking-[0.2em] text-ash">{a.minutes} MIN</span>
                </div>
                <h3 className="mt-5 font-display text-xl leading-snug text-paper">{a.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{a.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-signal">
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <Link to="/careers"
            className="group flex flex-col gap-6 rounded-2xl border border-line bg-white p-8 transition-all hover:border-signal/60 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="kicker">CAREER DEVELOPMENT</p>
              <p className="mt-3 font-display text-2xl text-paper">
                Mentorship, interview preparation and the internship track.
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist">
                Structured career support with honest expectations — no invented statistics,
                no guaranteed outcomes, just engineered preparation.
              </p>
            </div>
            <span className="btn btn-ghost shrink-0">
              Careers <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <EditorialHero />
      <MarqueeStrip />
      <Mission />
      <ChipExperience />
      <WorkflowScroll />
      <DisciplineIndex />
      <FeaturedPrograms />
      <LabSection />
      <EcosystemSection />
      <ResourceTeaser />
      <FinalCTA />
    </>
  );
}
