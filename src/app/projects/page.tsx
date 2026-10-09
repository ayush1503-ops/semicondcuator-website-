import type { Metadata } from "next";

import { PageHero, SectionHead, CTALink } from "@/components/ui";
import { Reveal, InViewScope } from "@/components/Reveal";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects & Laboratories — Evidence Over Claims",
  description:
    "Chiprion training projects and laboratory capabilities: DMA subsystems, RISC-V verification, PnR closure, scan insertion, embedded firmware and SoC integration.",
};

function TimingDiagram() {
  return (
    <svg viewBox="0 0 520 160" fill="none" className="w-full" role="img" aria-label="Static timing analysis setup and hold diagram">
      {Array.from({ length: 13 }).map((_, i) => (
        <line key={i} x1={20 + i * 40} y1="10" x2={20 + i * 40} y2="140" stroke="#EDF1F6" />
      ))}
      <path
        className="anim-trace"
        d="M60 44h40V26h40v18h40V26h40v18h40V26h40v18h40V26h40v18"
        stroke="#0052FF" strokeWidth="1.8"
      />
      <path
        className="anim-trace"
        style={{ animationDelay: "0.4s" }}
        d="M60 100h130c8 0 14-6 20-12l16 24c6 8 12 12 20 12h214"
        stroke="#4D7CFF" strokeWidth="1.8"
      />
      <line x1="205" y1="14" x2="205" y2="140" stroke="#64748B" strokeDasharray="3 5" className="anim-flow" />
      <line x1="245" y1="14" x2="245" y2="140" stroke="#B45309" strokeDasharray="3 5" className="anim-flow" />
      <text x="196" y="154" fill="#64748B" fontFamily="JetBrains Mono, monospace" fontSize="9">CAPTURE−tsu</text>
      <text x="232" y="30" fill="#B45309" fontFamily="JetBrains Mono, monospace" fontSize="9">CAPTURE</text>
      <text x="60" y="60" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="10">CLK</text>
      <text x="60" y="118" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="10">D(Q)</text>
    </svg>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        kicker="PROJECTS & LABORATORIES"
        title={
          <>
            EVIDENCE OVER
            <br />
            <span className="text-signal">CLAIMS.</span>
          </>
        }
        text="Engineering credibility is demonstrated, not declared. These are the realistic, review-grade projects learners execute in the Chiprion lab — each labelled honestly as teaching work."
        image={{ src: "/images/wafer.jpg", alt: "Silicon wafer with printed die grid" }}
      />

      {/* projects */}
      <section className="relative border-t border-line-soft bg-void py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] space-y-6 px-5 md:px-8">
          {projects.map((p, i) => (
            <Reveal key={p.slug}>
              <article className="corners grid gap-8 border border-line bg-panel p-7 md:p-10 lg:grid-cols-[auto_1fr_1fr] lg:gap-12">
                <div className="lg:w-44">
                  <span className="font-display text-5xl font-bold text-outline">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ash">{p.kind}</p>
                  <p className="mt-2 inline-block border border-amber/40 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-amber">
                    {p.note}
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-paper">{p.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-mist md:text-[0.95rem]">{p.brief}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="border border-line-soft px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-mist">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="kicker">ENGINEERING APPROACH</p>
                  <ul className="mt-4 space-y-2.5">
                    {p.approach.map((a) => (
                      <li key={a} className="flex items-start gap-3 text-sm text-mist">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-signal" aria-hidden="true" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <p className="kicker mt-6">HIGHLIGHTS</p>
                  <ul className="mt-4 space-y-2.5">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-sm text-mist">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 border border-signal" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* lab / toolchain */}
      <section className="relative border-t border-line-soft bg-obsidian py-24 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-8 lg:grid-cols-2">
          <Reveal>
            <div className="corners relative aspect-[4/3] overflow-hidden border border-line">
              <img src="/images/fab.jpg" alt="Semiconductor fabrication cleanroom" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/85 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <p className="kicker">PHYSICAL CONTEXT</p>
                <p className="mt-2 max-w-md font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.18em] text-mist">
                  Understanding fabrication economics shapes every design decision we teach
                </p>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHead
              kicker="TIMING & IMPLEMENTATION WORKFLOWS"
              title={
                <>
                  REPORTS ARE
                  <br />
                  <span className="text-signal">EVIDENCE.</span>
                </>
              }
              text="Timing benches teach learners to read STA reports as arguments: which corner, which mode, what fraction of slack is uncertainty. Closure is a diagnosis skill, not button-pressing."
            />
            <InViewScope className="mt-8 border border-line bg-panel p-5">
              <TimingDiagram />
              <div className="mt-3 flex justify-between font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ash">
                <span>▸ setup accounting at capture edge</span>
                <span>multi-corner · multi-mode</span>
              </div>
            </InViewScope>
            <div className="mt-6 flex flex-wrap gap-4">
              <CTALink href="/training">Explore the labs via programs</CTALink>
              <CTALink href="/services" variant="ghost">Engineering services</CTALink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
