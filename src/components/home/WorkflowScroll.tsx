"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, FlaskConical, Wrench, Briefcase } from "lucide-react";
import { workflowStages } from "@/lib/content";
import { useReducedMotion } from "@/lib/hooks";
import { SectionHead } from "@/components/ui";

export function WorkflowScroll() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const el = track.current!;
      const getScroll = () => el.scrollWidth - window.innerWidth + 64;
      const tween = gsap.to(el, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${getScroll()}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.width = `${self.progress * 100}%`;
          },
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, [reduced]);

  return (
    <section
      ref={section}
      className="relative overflow-hidden border-b border-line bg-white py-24 lg:py-0"
      aria-label="From learning to engineering"
    >
      <div className="grid-bg absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:pt-24">
          <SectionHead
            kicker="SEQUENCE 02 · FROM LEARNING TO ENGINEERING"
            title={
              <>
                A deliberate path from first
                <br />
                principles to <span className="text-signal">tape-out ready.</span>
              </>
            }
          />
          <div className="mt-6 hidden h-px w-full bg-line lg:block">
            <div ref={bar} className="h-px bg-signal" style={{ width: "0%" }} aria-hidden="true" />
          </div>
        </div>

        <div className="mt-12 lg:mt-14">
          <div
            ref={track}
            className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 md:px-8 lg:mx-0 lg:max-w-none lg:flex-row lg:flex-nowrap lg:gap-6 lg:pl-8"
          >
            {workflowStages.map((s, i) => (
              <article
                key={s.code}
                className="corners relative w-full shrink-0 rounded-2xl border border-line bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] lg:w-[26rem] lg:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[0.62rem] tracking-[0.28em] text-signal">{s.code}</span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ash">{s.tag}</span>
                </div>
                <h3 className="mt-5 font-display text-3xl text-paper">{s.name}</h3>
                <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-[0.2em] text-silicon">
                  {s.discipline}
                </p>

                <ul className="mt-6 space-y-2">
                  {s.skills.map((sk) => (
                    <li key={sk} className="flex items-center gap-3 text-sm text-mist">
                      <span className="h-px w-4 bg-signal/70" aria-hidden="true" />
                      {sk}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-3 border-t border-line-soft pt-5">
                  <p className="flex gap-3 text-[0.8rem] leading-relaxed text-mist">
                    <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
                    {s.tools}
                  </p>
                  <p className="flex gap-3 text-[0.8rem] leading-relaxed text-mist">
                    <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
                    {s.lab}
                  </p>
                  <p className="flex gap-3 text-[0.8rem] leading-relaxed text-paper">
                    <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
                    {s.career}
                  </p>
                </div>

                <span
                  className="text-outline pointer-events-none absolute -bottom-4 right-4 font-display text-8xl"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </article>
            ))}

            <div className="flex w-full shrink-0 items-center lg:w-[22rem]">
              <Link
                href="/training"
                className="group flex w-full flex-col justify-between gap-8 rounded-2xl border-2 border-signal/40 bg-navy/60 p-8 transition-all hover:border-signal hover:shadow-[0_16px_40px_rgba(0,82,255,0.12)] lg:h-72"
              >
                <span className="kicker">VIEW THE CURRICULUM</span>
                <div>
                  <p className="font-display text-2xl leading-tight text-paper">
                    Ten structured programs.
                    <br />
                    One engineering ladder.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-signal">
                    Explore training
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
