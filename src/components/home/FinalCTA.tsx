import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const actions = [
  { href: "/training", label: "Explore Training Programs", note: "10 structured programs" },
  { href: "/contact?type=service", label: "Discuss an Engineering Project", note: "RTL · DV · PD · DFT · SoC · embedded" },
  { href: "/partnerships", label: "Partner With Us", note: "Universities & corporates" },
];

export function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden border-t border-line bg-white"
      aria-label="Build what comes next"
    >
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="kicker flex items-center gap-3">
                FINAL SEQUENCE · BUILD WHAT COMES NEXT
                <span className="h-px w-8 bg-signal/60" aria-hidden="true" />
              </p>
              <h2 className="headline-xl mt-6 max-w-2xl text-[clamp(2.6rem,5.5vw,4.6rem)] text-paper">
                Your next breakthrough starts{" "}
                <em className="not-italic text-signal">here.</em>
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-mist md:text-lg">
                Whether you are learning your first HDL, closing a tape-out, or building an
                engineering organisation — the next step is a conversation with an engineer.
              </p>

              <div className="mt-10 max-w-xl space-y-3">
                {actions.map((a, i) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-white px-6 py-4 transition-all hover:border-signal hover:shadow-[0_8px_24px_rgba(0,82,255,0.1)]"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-paper">
                        <span className="mr-3 font-mono text-[0.62rem] tracking-[0.2em] text-ash">
                          0{i + 1}
                        </span>
                        {a.label}
                      </p>
                      <p className="mt-0.5 pl-8 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
                        {a.note}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-signal transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-5" delay={120}>
            <figure className="relative lg:ml-8">
              <div
                className="absolute -right-3 -top-3 h-full w-full rounded-2xl border-2 border-signal/40"
                aria-hidden="true"
              />
              <div className="corners relative overflow-hidden rounded-2xl border border-line bg-white">
                <Image
                  src="/images/blueprint.jpg"
                  alt="Blueprint illustration of a silicon wafer floorplan in blue ink"
                  width={900}
                  height={680}
                  className="aspect-[4/3] w-full object-cover"
                  sizes="(max-width: 1024px) 90vw, 38vw"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ash">
                <span>FIG. 03 — Wafer plan, blueprint sheet</span>
                <span className="text-signal">Rev A</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
