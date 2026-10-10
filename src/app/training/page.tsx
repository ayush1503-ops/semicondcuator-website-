import { PageHero, SectionHead, CTALink } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { TrainingList } from "@/components/TrainingList";
import { EnquiryForm } from "@/components/EnquiryForm";
import { courses, workflowStages } from "@/lib/content";
import { useEffect } from "react";

export default function TrainingPage() {
  useEffect(() => {
    document.title = "Training & Education — VLSI Programs from RTL to Tape-Out · Chiprion";
  }, []);

  return (
    <>
      <PageHero
        kicker="TRAINING & EDUCATION"
        title={
          <>
            PROGRAMS BUILT LIKE
            <br />
            <span className="text-signal">ENGINEERING PROJECTS.</span>
          </>
        }
        text="Every program pairs structured theory with laboratory work, staged code reviews and a defensible final project. Choose a level, or talk to the desk about where to start."
        image={{ src: "/images/circuit-macro.jpg", alt: "Macro view of circuit routing on silicon" }}
      />

      <section className="relative border-t border-line-soft bg-void py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <TrainingList courses={courses} />
        </div>
      </section>

      {/* learning path */}
      <section className="relative border-t border-line-soft bg-obsidian py-24 md:py-32" aria-label="The learning ladder">
        <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
          <SectionHead
            kicker="THE LEARNING LADDER"
            title={
              <>
                SIX STAGES FROM
                <br />
                FIRST PRINCIPLES TO <span className="text-signal">INDUSTRY.</span>
              </>
            }
            text="Programs map onto one deliberate progression. You can enter at any rung — the desk will help you place honestly."
          />
          <div className="mt-14 grid gap-px border border-line-soft bg-line-soft md:grid-cols-2 xl:grid-cols-3">
            {workflowStages.map((s, i) => (
              <Reveal key={s.code} delay={i * 60}>
                <div className="h-full bg-obsidian p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.62rem] tracking-[0.3em] text-signal">{s.code}</span>
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ash">{s.tag}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-paper">{s.name}</h3>
                  <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-silicon">{s.discipline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-mist">{s.lab}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* corporate + advisory */}
      <section className="relative border-t border-line-soft bg-void py-24 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <SectionHead
              kicker="NOT SURE WHERE TO START?"
              title={
                <>
                  TALK TO THE
                  <br />
                  <span className="text-signal">ENGINEERING DESK.</span>
                </>
              }
              text="Tell us your background and target role — we will recommend an honest entry point, including when the answer is 'strengthen fundamentals first'."
            />
            <div className="mt-8 space-y-4">
              <div className="border border-line bg-panel p-6">
                <p className="kicker">CORPORATE TRAINING</p>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  Team upskilling, graduate onboarding acceleration and custom curricula are
                  delivered through our partnerships and corporate engagements.
                </p>
                <CTALink href="/partnerships" variant="ghost" className="mt-5">
                  Corporate & institutional training
                </CTALink>
              </div>
            </div>
          </div>
          <EnquiryForm type="course" source="training-index" heading="Program advisory" />
        </div>
      </section>
    </>
  );
}
