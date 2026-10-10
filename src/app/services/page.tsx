import { Layers, Search, PencilRuler, FileCheck } from "lucide-react";
import { PageHero, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { EnquiryForm } from "@/components/EnquiryForm";
import { services } from "@/lib/content";
import { cx } from "@/lib/utils";
import { useEffect } from "react";

const statusStyle: Record<string, string> = {
  Offered: "text-signal border-signal/40",
  "Scoped per engagement": "text-silicon border-silicon/40",
  Planned: "text-amber border-amber/40",
};

const steps = [
  {
    icon: Search,
    title: "Discovery review",
    text: "A senior engineer reviews the specification, flow and constraints with your team. No sales theatre — an engineering conversation.",
  },
  {
    icon: PencilRuler,
    title: "Scoped proposal",
    text: "Deliverables, interfaces, review cadence and exit criteria defined in writing. You see exactly what engineering you are buying.",
  },
  {
    icon: Layers,
    title: "Delivery sprints",
    text: "Milestone-based execution inside your toolchain or ours, with code review culture and documented decisions throughout.",
  },
  {
    icon: FileCheck,
    title: "Handover & support",
    text: "Complete documentation, knowledge transfer sessions and a defined support window. Your team owns the result.",
  },
];

export default function ServicesPage() {
  useEffect(() => {
    document.title = "Engineering Services — RTL, Verification, Physical Design, DFT, SoC · Chiprion";
  }, []);

  return (
    <>
      <PageHero
        kicker="ENGINEERING SERVICES"
        title={
          <>
            DESIGN CAPACITY THAT
            <br />
            SPEAKS <span className="text-signal">FLUENT FLOW.</span>
          </>
        }
        text="RTL, verification, physical design, DFT, SoC and embedded engineering services — delivered to the same evidentiary standard we teach. Capabilities marked 'scoped' are sized per engagement; nothing here is oversold."
        image={{ src: "/images/die-top.jpg", alt: "Silicon die functional blocks" }}
      />

      <section className="relative border-t border-line-soft bg-void py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 70}>
                <article className="corners flex h-full flex-col border border-line bg-panel p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[0.62rem] tracking-[0.25em] text-ash">{s.code}</span>
                    <span className={cx("border px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.18em]", statusStyle[s.status])}>
                      {s.status}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-xl font-semibold leading-snug text-paper">{s.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{s.text}</p>
                  <ul className="mt-5 flex-1 space-y-2 border-t border-line-soft pt-4">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-[0.82rem] text-mist">
                        <span className="h-px w-4 shrink-0 bg-signal/60" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <p className="border border-line-soft bg-panel px-6 py-4 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.16em] text-ash">
              ▸ Scope discipline: “Offered” capabilities are deliverable today. “Scoped per engagement”
              items are staffed from our engineer network and confirmed in the proposal stage. Planned
              capabilities appear on the laboratory page and are never sold prematurely.
            </p>
          </Reveal>
        </div>
      </section>

      {/* engagement model */}
      <section className="relative border-t border-line-soft bg-obsidian py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <SectionHead
            kicker="HOW ENGAGEMENTS WORK"
            title={
              <>
                FOUR STAGES.
                <br />
                <span className="text-signal">ZERO AMBIGUITY.</span>
              </>
            }
          />
          <div className="mt-14 grid gap-px border border-line-soft bg-line-soft md:grid-cols-2 xl:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="h-full bg-obsidian p-8">
                  <div className="flex items-center justify-between">
                    <s.icon className="h-6 w-6 text-signal" aria-hidden="true" />
                    <span className="font-display text-4xl font-bold text-outline">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold text-paper">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* enquiry */}
      <section className="relative border-t border-line-soft bg-void py-24 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <SectionHead
              kicker="START AN ENGAGEMENT"
              title={
                <>
                  DESCRIBE THE BLOCK.
                  <br />
                  <span className="text-signal">WE SCOPE THE REST.</span>
                </>
              }
              text="Share the artefact, node, schedule and constraints. A senior engineer — not a sales rep — reviews every services enquiry before the first call."
            />
            <ul className="mt-8 space-y-3">
              {[
                "NDA-ready discovery process",
                "Fixed-scope or capacity-based models",
                "Toolchain-agnostic: we work inside your flow",
                "Graduate-intern augmentation available on longer engagements",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-mist">
                  <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <EnquiryForm type="service" source="services" heading="Engineering services enquiry" />
        </div>
      </section>
    </>
  );
}
