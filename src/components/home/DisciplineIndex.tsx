import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { disciplines } from "@/lib/content";
import { cx } from "@/lib/utils";
import { SectionHead } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

function DiscIcon({ id, className }: { id: string; className?: string }) {
  const common = "stroke-current";
  switch (id) {
    case "rtl":
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path d="M2 16h6l3-8 4 16 4-20 4 16 3-8h4" className={common} strokeWidth="1.4" />
        </svg>
      );
    case "dv":
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <circle cx="8" cy="8" r="2.2" className={common} strokeWidth="1.4" />
          <circle cx="24" cy="9" r="2.2" className={common} strokeWidth="1.4" />
          <circle cx="15" cy="17" r="2.2" className={common} strokeWidth="1.4" />
          <circle cx="25" cy="24" r="2.2" className={common} strokeWidth="1.4" />
          <circle cx="7" cy="25" r="2.2" className={common} strokeWidth="1.4" />
          <path d="M2 3v26h28" className={common} strokeWidth="1.1" opacity="0.6" />
        </svg>
      );
    case "pd":
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect x="3" y="3" width="26" height="26" className={common} strokeWidth="1.4" />
          <rect x="6" y="6" width="10" height="8" className={common} strokeWidth="1.2" />
          <rect x="18" y="6" width="8" height="12" className={common} strokeWidth="1.2" />
          <rect x="6" y="16" width="10" height="10" className={common} strokeWidth="1.2" />
          <path d="M18 20h8v6h-8z" className={common} strokeWidth="1.2" />
        </svg>
      );
    case "dft":
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect x="3" y="12" width="6" height="8" className={common} strokeWidth="1.4" />
          <rect x="13" y="12" width="6" height="8" className={common} strokeWidth="1.4" />
          <rect x="23" y="12" width="6" height="8" className={common} strokeWidth="1.4" />
          <path d="M9 16h4M19 16h4M6 8V4h20v4M6 24v4h20v-4" className={common} strokeWidth="1.2" opacity="0.7" />
        </svg>
      );
    case "soc":
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect x="3" y="13" width="26" height="4" className={common} strokeWidth="1.4" />
          <rect x="6" y="6" width="6" height="5" className={common} strokeWidth="1.2" />
          <rect x="20" y="6" width="6" height="5" className={common} strokeWidth="1.2" />
          <rect x="12" y="19" width="8" height="7" className={common} strokeWidth="1.2" />
          <path d="M9 11v2M23 11v2M16 19v-2" className={common} strokeWidth="1.2" />
        </svg>
      );
    case "emb":
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect x="8" y="8" width="16" height="16" className={common} strokeWidth="1.4" />
          <path d="M13 15l-3 3 3 3M19 15l3 3-3 3" className={common} strokeWidth="1.4" />
          <path d="M12 8V3M20 8V3M12 29v-5M20 29v-5M8 12H3M8 20H3M29 12h-5M29 20h-5" className={common} strokeWidth="1.2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="3" className={common} strokeWidth="1.4" />
          <circle cx="6" cy="7" r="2" className={common} strokeWidth="1.2" />
          <circle cx="26" cy="7" r="2" className={common} strokeWidth="1.2" />
          <circle cx="6" cy="25" r="2" className={common} strokeWidth="1.2" />
          <circle cx="26" cy="25" r="2" className={common} strokeWidth="1.2" />
          <path d="M13.5 13.8L7.5 8.5M18.5 13.8l6-5.3M13.5 18.2l-6 5.3M18.5 18.2l6 5.3" className={common} strokeWidth="1.1" />
        </svg>
      );
  }
}

export function DisciplineIndex() {
  const [active, setActive] = useState<string>("rtl");
  const current = disciplines.find((d) => d.id === active)!;

  return (
    <section className="relative bg-void py-24 md:py-32" aria-label="Explore the disciplines">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            kicker="SEQUENCE 03 · EXPLORE THE DISCIPLINES"
            title={
              <>
                Seven disciplines.
                <br />
                One <span className="text-signal">silicon mindset.</span>
              </>
            }
            text="Each discipline is taught as working engineers practice it — with the tools, review discipline and deliverable standards of real design teams."
          />

          <Reveal className="mt-10 hidden lg:block">
            <div className="corners rounded-2xl border border-line bg-white p-8" key={current.id}>
              <div className="flex items-center justify-between">
                <span className="font-display text-6xl text-outline">{current.code}</span>
                <DiscIcon id={current.id} className="h-12 w-12 text-signal" />
              </div>
              <p className="mt-6 font-display text-2xl text-paper">{current.name}</p>
              <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-silicon">
                {current.hook}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {current.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line bg-void px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-mist"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <Link to={`/training/${current.course}`}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-signal hover:text-flare"
              >
                View program details <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          {disciplines.map((d, i) => {
            const isActive = active === d.id;
            return (
              <Reveal key={d.id}>
                <button
                  onMouseEnter={() => setActive(d.id)}
                  onFocus={() => setActive(d.id)}
                  onClick={() => setActive(d.id)}
                  aria-expanded={isActive}
                  className={cx(
                    "group w-full px-6 py-6 text-left transition-colors md:px-8 md:py-7",
                    i > 0 && "border-t border-line-soft",
                    isActive ? "bg-navy/50" : "hover:bg-void"
                  )}
                >
                  <div className="flex items-center gap-5 md:gap-8">
                    <span
                      className={cx(
                        "font-mono text-[0.7rem] tracking-[0.24em] transition-colors",
                        isActive ? "text-signal" : "text-ash"
                      )}
                    >
                      {d.code}
                    </span>
                    <DiscIcon
                      id={d.id}
                      className={cx(
                        "h-8 w-8 shrink-0 transition-colors md:h-10 md:w-10",
                        isActive ? "text-signal" : "text-ash group-hover:text-mist"
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <h3
                        className={cx(
                          "font-display text-xl transition-colors md:text-2xl",
                          isActive ? "text-paper" : "text-mist group-hover:text-paper"
                        )}
                      >
                        {d.name}
                      </h3>
                      <p className="mt-1 hidden font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ash md:block">
                        {d.hook}
                      </p>
                    </div>
                    <ArrowUpRight
                      className={cx(
                        "h-5 w-5 shrink-0 transition-all",
                        isActive ? "rotate-0 text-signal" : "-rotate-45 text-ash"
                      )}
                    />
                  </div>

                  <div
                    className={cx(
                      "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl text-sm leading-relaxed text-mist md:pl-[4.5rem]">{d.text}</p>
                      <div className="mt-4 flex flex-wrap gap-2 md:pl-[4.5rem] lg:hidden">
                        {d.skills.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-line bg-white px-2 py-0.5 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-mist"
                          >
                            {s}
                          </span>
                        ))}
                        <Link to={`/training/${d.course}`}
                          className="px-2 py-0.5 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-signal"
                        >
                          Program details →
                        </Link>
                      </div>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
