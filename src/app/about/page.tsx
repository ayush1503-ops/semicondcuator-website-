import type { Metadata } from "next";

import { PageHero, SectionHead, CTALink } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { disciplines } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — Mission, Method and Engineering Standards",
  description:
    "Chiprion's mission: engineer the engineers the semiconductor industry needs — through evidence-based education, real design services and an honest industry ecosystem.",
};

const principles = [
  {
    k: "EVIDENCE OVER CLAIMS",
    t: "Artefacts, not adjectives",
    d: "Reviewed RTL, coverage reports and closure documents are the only résumé language that matters. We teach engineers to produce evidence — and we produce it ourselves.",
  },
  {
    k: "REVIEW CULTURE",
    t: "Nothing ships un-reviewed",
    d: "Every learner artefact and every client deliverable passes engineer review. The habit of being reviewed is the habit of the industry.",
  },
  {
    k: "HONEST SCOPE",
    t: "Offered, scoped, or planned",
    d: "Capabilities are labelled truthfully across this site. Planned laboratory and partnership capabilities are never sold before they exist.",
  },
  {
    k: "NO INVENTED NUMBERS",
    t: "Statistics are earned",
    d: "We do not publish placement rates, employer logos or outcome guarantees that cannot be verified. When real data exists, it will be published with method.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="ABOUT CHIPRION"
        title={
          <>
            WE ENGINEER
            <br />
            THE <span className="text-signal">ENGINEERS.</span>
          </>
        }
        text="A semiconductor engineering platform built on one conviction: the industry needs engineers with defensible skill, and defensible skill is built through real work under real review."
        image={{ src: "/images/die-top.jpg", alt: "Silicon die close-up" }}
      />

      {/* mission/vision */}
      <section className="relative border-t border-line-soft bg-void py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-5 md:px-8 lg:grid-cols-2">
          <Reveal>
            <div className="corners h-full border border-line bg-panel p-8 md:p-10">
              <p className="kicker">MISSION</p>
              <p className="mt-5 font-display text-2xl font-semibold leading-snug text-paper">
                Close the gap between what universities teach and what design teams need — through
                engineering education that is indistinguishable from engineering practice.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="corners h-full border border-line bg-panel p-8 md:p-10">
              <p className="kicker">VISION</p>
              <p className="mt-5 font-display text-2xl font-semibold leading-snug text-paper">
                A semiconductor ecosystem where talent flows on evidence: students, engineers,
                universities and companies connected by demonstrated capability, not marketing.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* principles */}
      <section className="relative border-t border-line-soft bg-obsidian py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <SectionHead
            kicker="HOW WE WORK"
            title={
              <>
                FOUR RULES,
                <br />
                <span className="text-signal">NON-NEGOTIABLE.</span>
              </>
            }
          />
          <div className="mt-14 grid gap-px border border-line-soft bg-line-soft md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.k} delay={(i % 2) * 80}>
                <div className="h-full bg-obsidian p-8 md:p-10">
                  <span className="font-mono text-[0.62rem] tracking-[0.34em] text-signal">{p.k}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-paper">{p.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* expertise */}
      <section className="relative border-t border-line-soft bg-void py-24 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <SectionHead
              kicker="TECHNICAL FOOTPRINT"
              title={
                <>
                  SEVEN DISCIPLINES,
                  <br />
                  <span className="text-signal">ONE FLOW.</span>
                </>
              }
              text="Education and services span the complete RTL-to-silicon flow. Depth is maintained per discipline; breadth is maintained through engineers who live inside the flow."
            />
            <div className="mt-8 space-y-3">
              {disciplines.map((d) => (
                <div key={d.id} className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-3">
                  <span className="font-display text-base font-semibold text-paper">{d.name}</span>
                  <span className="text-right font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ash">{d.hook}</span>
                </div>
              ))}
            </div>
          </div>
          <Reveal delay={100}>
            <div className="corners relative aspect-[4/3] overflow-hidden border border-line lg:sticky lg:top-28">
              <img src="/images/wafer.jpg" alt="Silicon wafer macro" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-mist">
                  Every discipline ends at the same place: working silicon
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* leadership placeholder */}
      <section className="relative border-t border-line-soft bg-obsidian py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <SectionHead
            kicker="LEADERSHIP & TEAM"
            title={
              <>
                ENGINEER-LED,
                <br />
                <span className="text-signal">BY DESIGN.</span>
              </>
            }
          />
          <Reveal className="mt-12">
            <div className="border border-dashed border-line bg-panel/50 p-10 text-center md:p-16">
              <span className="mx-auto block h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
              <p className="mx-auto mt-6 max-w-xl font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.2em] text-ash">
                Placeholder — leadership profiles, founding story and advisory board information
                will be published here once provided by the company. No names, photos or
                credentials are displayed until verified.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 flex flex-wrap gap-4">
            <CTALink href="/contact">Contact the team</CTALink>
            <CTALink href="/services" variant="ghost">Engineering services</CTALink>
          </div>
        </div>
      </section>
    </>
  );
}
