import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Clock } from "lucide-react";
import { SectionHead } from "@/components/ui";
import { InViewScope, Reveal } from "@/components/Reveal";
import { useReducedMotion } from "@/lib/hooks";

const capabilities = [
  { name: "Guided simulation & waveform-debug workflows", status: "operational" as const },
  { name: "Coverage-driven verification environments (SV/UVM)", status: "operational" as const },
  { name: "Timing-analysis and closure exercise benches", status: "operational" as const },
  { name: "Weekly design-review cadence with engineer mentors", status: "operational" as const },
  { name: "Remote FPGA prototyping farm", status: "planned" as const },
  { name: "University-hosted physical design lab clusters", status: "planned" as const },
];

function Waveform() {
  return (
    <svg viewBox="0 0 560 210" fill="none" className="w-full" role="img" aria-label="Animated digital timing waveform">
      {Array.from({ length: 15 }).map((_, i) => (
        <line key={i} x1={20 + i * 36} y1="10" x2={20 + i * 36} y2="190" stroke="#EDF1F6" strokeWidth="1" />
      ))}
      <line x1="20" y1="190" x2="540" y2="190" stroke="#E2E8F0" />

      <text x="20" y="30" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">CLK</text>
      <text x="20" y="74" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">VALID</text>
      <text x="20" y="118" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">READY</text>
      <text x="20" y="166" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">DATA</text>

      <path
        className="anim-trace"
        d="M90 36h18v-14h18v14h18v-14h18v14h18v-14h18v14h18v-14h18v14h18v-14h18v14h18v-14h18v14h18v-14h18v14h18v-14h18v14h18v-14h18v14"
        stroke="#0052FF" strokeWidth="1.8" strokeLinecap="square"
      />
      <path className="anim-trace" style={{ animationDelay: "0.3s" }} d="M90 82h126v-14h198v14h136" stroke="#4D7CFF" strokeWidth="1.8" />
      <path className="anim-trace" style={{ animationDelay: "0.6s" }} d="M90 130h198v-14h198v14h54" stroke="#0F172A" strokeWidth="1.8" />
      <path
        className="anim-trace"
        style={{ animationDelay: "0.9s" }}
        d="M90 166h132m6-12l24 24m-24-24l12 12m6-12l24 24m-12-24h144m6-12l24 24m-24-24l12 12m6-12l24 24m-12-24h24"
        stroke="#64748B" strokeWidth="1.5"
      />

      <line x1="288" y1="16" x2="288" y2="184" stroke="#B45309" strokeWidth="1" strokeDasharray="3 5" className="anim-flow" />
      <text x="294" y="26" fill="#B45309" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1.2">
        TRANSFER t2 · VALID∩READY
      </text>
      <circle cx="288" cy="68" r="3.5" fill="#0052FF" className="anim-node" />
      <circle cx="288" cy="112" r="3.5" fill="#0F172A" className="anim-node" style={{ animationDelay: "0.8s" }} />
    </svg>
  );
}

export function LabSection() {
  const imgWrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.fromTo(
      img.current,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: imgWrap.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <section className="relative border-t border-line bg-void py-24 md:py-32" aria-label="The engineering laboratory">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHead
          kicker="SEQUENCE 04 · THE ENGINEERING LABORATORY"
          title={
            <>
              Tools teach syntax.
              <br />
              <span className="text-signal">Labs teach engineering.</span>
            </>
          }
          text="Every Chiprion program runs on laboratory work: simulation workflows, verification environments, timing benches and design challenges reviewed by working engineers."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <figure>
              <div ref={imgWrap} className="corners relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                <div ref={img} className="absolute -inset-y-8 inset-x-0">
                  <img
                    src="/images/lab.jpg"
                    alt="Semiconductor engineering laboratory with oscilloscope waveforms"
                    className="absolute inset-0 w-full h-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              <figcaption className="mt-4 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ash">
                <span>FIG. 04 — Lab bench: waveform debug & protocol analysis</span>
                <span className="flex items-center gap-2 text-signal">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
                  live
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="flex flex-col gap-6">
            <InViewScope className="corners rounded-2xl border border-line bg-white p-6 md:p-7">
              <div className="flex items-center justify-between">
                <p className="kicker">TIMING VIEW · UVM REGRESSION #147</p>
                <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-signal">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
                  sampling
                </span>
              </div>
              <div className="mt-4 rounded-xl border border-line bg-void p-3">
                <Waveform />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ash">
                <span>▸ protocol: valid/ready</span>
                <span>▸ checks: 8 active</span>
                <span>▸ state: passing</span>
              </div>
            </InViewScope>

            <Reveal delay={80}>
              <div className="overflow-hidden rounded-2xl border border-line bg-white">
                <div className="border-b border-line px-6 py-4">
                  <p className="kicker">LABORATORY CAPABILITIES</p>
                </div>
                <ul>
                  {capabilities.map((c) => (
                    <li
                      key={c.name}
                      className="flex items-center justify-between gap-4 border-b border-line-soft px-6 py-3.5 last:border-0"
                    >
                      <span className="flex items-center gap-3 text-sm text-mist">
                        {c.status === "operational" ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
                        ) : (
                          <Clock className="h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                        )}
                        {c.name}
                      </span>
                      <span
                        className={
                          c.status === "operational"
                            ? "font-mono text-[0.55rem] uppercase tracking-[0.2em] text-signal"
                            : "font-mono text-[0.55rem] uppercase tracking-[0.2em] text-amber"
                        }
                      >
                        {c.status === "operational" ? "operational" : "planned"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
