import { useEffect, useRef, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks";

const ChipCanvas = lazy(() => import("./ChipCanvas"));

/* ================================================================== */
/* Scene copy — five acts                                               */
/* ================================================================== */
const STAGES = [
  {
    code: "00 / SEALED",
    title: (
      <>
        Packaged.
      </>
    ),
    note: "A finished device hides everything that mattered: logic, doubt, geometry, physics — sealed under a nickel heat spreader.",
    mono: "FCBGA · 6.4 × 6.4 mm footprint",
  },
  {
    code: "01 / STRUCTURE",
    title: (
      <>
        Built in
        <br />
        layers.
      </>
    ),
    note: "Laminate substrate, copper routing, silicon die. Every layer is a discipline, a toolchain, and a career.",
    mono: "laminate ▸ routing ▸ die attach ▸ BGA",
  },
  {
    code: "02 / THE DIE",
    title: (
      <>
        2.9 mm
        <br />
        of intent.
      </>
    ),
    note: "Logic clusters, SRAM arrays, an IO ring. A floorplan is a city map of engineering decisions — this is what physical design delivers.",
    mono: "floorplan ▸ std cells ▸ SRAM macros ▸ seal ring",
  },
  {
    code: "03 / INSPECTION",
    title: (
      <>
        Separated,
        <br />
        deliberately.
      </>
    ),
    note: "Heat spreader, die, substrate, solder array. Four components, four engineering owners, one tape-out.",
    mono: "IHS ▸ die ▸ substrate ▸ BGA",
  },
  {
    code: "04 / ORIGIN",
    title: (
      <>
        This is where
        <br />
        you start.
      </>
    ),
    note: "From this anatomy backwards to the first line of RTL — that is the journey the programs teach, stage by stage.",
    cta: true,
  },
];

const WINDOWS: [number, number][] = [
  [0.0, 0.17],
  [0.19, 0.4],
  [0.435, 0.63],
  [0.66, 0.84],
  [0.875, 0.985],
];
const FADE = 0.035;
const TOTAL_VH = 520;

/* Die-detail annotations (appear in scene C) */
const ANN_C = [
  { k: "logic cluster", v: "std-cell placement zones" },
  { k: "SRAM arrays", v: "regular macro grid" },
  { k: "IO ring", v: "pad-limited periphery" },
];
/* Layer annotations (appear in scene D) */
const ANN_D = [
  { k: "IHS", v: "nickel-plated heat spreader" },
  { k: "Die", v: "verified silicon, 2.9 mm" },
  { k: "Substrate", v: "organic laminate artwork" },
  { k: "BGA", v: "solder array to the board" },
];

function stageVis(p: number, [a, b]: [number, number], fade = FADE) {
  if (p < a - fade || p > b + fade) return 0;
  let v = 1;
  if (p < a) v = (p - (a - fade)) / fade;
  if (p > b) v = 1 - (p - b) / fade;
  return Math.max(0, Math.min(1, v));
}

export function ChipExperience() {
  const wrap = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const stageEls = useRef<(HTMLDivElement | null)[]>([]);
  const annCEls = useRef<(HTMLDivElement | null)[]>([]);
  const annDEls = useRef<(HTMLDivElement | null)[]>([]);
  const hudBar = useRef<HTMLDivElement>(null);
  const hudPct = useRef<HTMLSpanElement>(null);
  const hudCode = useRef<HTMLSpanElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const dots = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();

  const onDomUpdate = useRef((p: number) => {
    STAGES.forEach((_, i) => {
      const el = stageEls.current[i];
      if (!el) return;
      const v = stageVis(p, WINDOWS[i]);
      el.style.opacity = String(v);
      el.style.transform = `translateY(-50%) translate3d(0, ${(1 - v) * 28}px, 0)`;
      el.style.pointerEvents = v > 0.6 ? "auto" : "none";
    });
    annCEls.current.forEach((el, i) => {
      if (!el) return;
      const v = stageVis(p, [0.46 + i * 0.035, 0.63], 0.03);
      el.style.opacity = String(v);
      el.style.transform = `translate3d(${(1 - v) * 18}px, 0, 0)`;
    });
    annDEls.current.forEach((el, i) => {
      if (!el) return;
      const v = stageVis(p, [0.69 + i * 0.03, 0.87], 0.03);
      el.style.opacity = String(v);
      el.style.transform = `translate3d(${(1 - v) * 18}px, 0, 0)`;
    });
    if (hudBar.current) hudBar.current.style.width = `${p * 100}%`;
    if (hudPct.current)
      hudPct.current.textContent = `${String(Math.round(p * 100)).padStart(3, "0")}%`;
    let active = 0;
    WINDOWS.forEach((w, i) => {
      if (p >= w[0] - FADE / 2) active = i;
    });
    if (hudCode.current) hudCode.current.textContent = STAGES[active].code;
    dots.current.forEach((d, i) => {
      if (!d) return;
      const on = i === active;
      d.style.background = on ? "#7FA6FF" : "transparent";
      d.style.borderColor = on ? "#7FA6FF" : "rgba(255,255,255,0.3)";
    });
    if (hint.current) hint.current.style.opacity = p < 0.04 ? "1" : "0";
  });

  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: wrap.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        target.current = self.progress;
      },
    });
    onDomUpdate.current(0);
    return () => {
      st.kill();
    };
  }, [reduced]);

  const scrollToStage = (i: number) => {
    const el = wrap.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    const p = (WINDOWS[i][0] + WINDOWS[i][1]) / 2;
    window.scrollTo({ top: top + total * p, behavior: "smooth" });
  };

  if (reduced) return <StaticChipIntro />;

  return (
    <section
      ref={wrap}
      style={{ height: `${TOTAL_VH}vh` }}
      className="relative bg-[#05070B]"
      aria-label="Inside the package — scroll-driven semiconductor visualisation"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-[#05070B]" />}>
          <ChipCanvas progress={target} onDomUpdate={(p: number) => onDomUpdate.current(p)} />
        </Suspense>

        {/* readability wash — keeps text legible without hiding the model */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(5,7,11,0.88)_0%,rgba(5,7,11,0.45)_36%,transparent_62%)]"
          aria-hidden="true"
        />

        {/* stage overlays */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="relative mx-auto h-full w-full max-w-[1440px]">
            <p className="absolute left-5 top-[13vh] font-mono text-[0.62rem] tracking-[0.32em] text-slate-500 md:left-8">
              PRODUCT FEATURE · INSIDE THE PACKAGE
            </p>
            {STAGES.map((s, i) => (
              <div
                key={s.code}
                ref={(el) => {
                  stageEls.current[i] = el;
                }}
                className="absolute inset-x-5 top-1/2 max-w-xl md:inset-x-8"
                style={{ opacity: i === 0 ? 1 : 0, transform: "translateY(-50%)" }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-slate-300 backdrop-blur-sm">
                  <span className="h-1 w-1 rounded-full bg-[#7FA6FF]" />
                  {s.code}
                </span>
                <h2 className="headline-xl mt-5 text-[clamp(2.3rem,4.6vw,3.9rem)] text-white">
                  {s.title}
                </h2>
                <p className="mt-5 max-w-md leading-relaxed text-slate-400 md:text-lg">{s.note}</p>
                {s.mono && (
                  <p className="mt-4 font-mono text-[0.66rem] tracking-[0.18em] text-[#7FA6FF]">
                    {s.mono}
                  </p>
                )}
                {s.cta && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link to="/training" className="btn btn-primary">
                      Explore the programs <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to="/services"
                      className="btn border border-white/25 bg-transparent text-white hover:border-[#7FA6FF] hover:text-[#7FA6FF]"
                    >
                      Engineering services
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* die annotations — scene C (desktop only) */}
        <div className="pointer-events-none absolute right-10 top-1/2 z-10 hidden -translate-y-1/2 space-y-5 xl:block">
          {ANN_C.map((a, i) => (
            <div
              key={a.k}
              ref={(el) => {
                annCEls.current[i] = el;
              }}
              className="flex items-center gap-3"
              style={{ opacity: 0 }}
            >
              <span className="h-px w-8 bg-white/25" aria-hidden="true" />
              <div className="rounded-md border border-white/12 bg-[#05070B]/70 px-3 py-2 backdrop-blur-sm">
                <p className="font-mono text-[0.62rem] tracking-[0.2em] text-white">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full border border-[#7FA6FF]" />
                  {a.k.toUpperCase()}
                </p>
                <p className="mt-0.5 pl-3.5 font-mono text-[0.55rem] tracking-[0.12em] text-slate-400">
                  {a.v.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* layer annotations — scene D (desktop only) */}
        <div className="pointer-events-none absolute right-10 top-1/2 z-10 hidden -translate-y-1/2 space-y-5 xl:block">
          {ANN_D.map((a, i) => (
            <div
              key={a.k}
              ref={(el) => {
                annDEls.current[i] = el;
              }}
              className="flex items-center gap-3"
              style={{ opacity: 0 }}
            >
              <span className="h-px w-8 bg-white/25" aria-hidden="true" />
              <div className="rounded-md border border-white/12 bg-[#05070B]/70 px-3 py-2 backdrop-blur-sm">
                <p className="font-mono text-[0.62rem] tracking-[0.2em] text-white">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#7FA6FF]" />
                  {a.k.toUpperCase()}
                </p>
                <p className="mt-0.5 pl-3.5 font-mono text-[0.55rem] tracking-[0.12em] text-slate-400">
                  {a.v.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* HUD */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 md:px-8 md:pb-7">
          <div className="mx-auto flex max-w-[1440px] items-end justify-between gap-6">
            <div className="min-w-0">
              <div className="flex items-center gap-4 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-slate-500">
                <span>FCBGA · DIE VIEW</span>
                <span ref={hudCode} className="text-[#7FA6FF]">
                  00 / SEALED
                </span>
                <span ref={hudPct}>000%</span>
              </div>
              <div className="mt-2 h-px w-56 bg-white/10 md:w-80">
                <div ref={hudBar} className="h-px bg-[#7FA6FF]" style={{ width: "0%" }} />
              </div>
            </div>
            <div
              ref={hint}
              className="hidden items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-slate-500 md:flex"
            >
              Scroll — open the package
              <ChevronDown className="h-4 w-4 animate-bounce text-[#7FA6FF]" />
            </div>
          </div>
        </div>

        {/* stage dots */}
        <div className="absolute right-5 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3 md:right-8">
          {STAGES.map((s, i) => (
            <button
              key={s.code}
              ref={(el) => {
                dots.current[i] = el;
              }}
              onClick={() => scrollToStage(i)}
              aria-label={`Jump to ${s.code}`}
              className="h-2.5 w-2.5 rounded-full border transition-colors duration-300"
              style={i === 0 ? { background: "#7FA6FF", borderColor: "#7FA6FF" } : { borderColor: "rgba(255,255,255,0.3)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Static equivalent — reduced motion / no autoplay */
function StaticChipIntro() {
  return (
    <section className="relative bg-[#05070B] py-20 text-white md:py-28" aria-label="Inside the package">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <p className="font-mono text-[0.62rem] tracking-[0.32em] text-[#7FA6FF]">
          PRODUCT FEATURE · INSIDE THE PACKAGE
        </p>
        <h2 className="headline-xl mt-5 max-w-2xl text-4xl md:text-5xl">
          One package, four engineering disciplines.
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-slate-400">
          A scroll-driven visualisation of a semiconductor package is shown here with motion
          enabled. The same story, statically:
        </p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {STAGES.slice(1, 4).map((s) => (
            <div key={s.code} className="bg-[#05070B] p-7">
              <span className="font-mono text-[0.62rem] tracking-[0.22em] text-[#7FA6FF]">{s.code}</span>
              <h3 className="mt-4 font-display text-xl leading-snug">{s.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{s.note}</p>
              {s.mono && (
                <p className="mt-4 font-mono text-[0.6rem] tracking-[0.16em] text-[#7FA6FF]/80">{s.mono}</p>
              )}
            </div>
          ))}
          <div className="bg-[#05070B] p-7">
            <span className="font-mono text-[0.62rem] tracking-[0.22em] text-[#7FA6FF]">04 / ORIGIN</span>
            <h3 className="mt-4 font-display text-xl leading-snug">This is where you start.</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              From package anatomy backwards to the first line of RTL — stage by stage.
            </p>
            <Link to="/training" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#7FA6FF]">
              Explore programs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
