import { Building2, Users, FlaskConical, BookOpen, Factory, Network } from "lucide-react";
import { PageHero, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { EnquiryForm } from "@/components/EnquiryForm";
import { useEffect } from "react";

const models = [
  {
    icon: Building2,
    title: "University collaborations",
    tag: "Academic",
    text: "Co-developed electives and lab modules that bring industry-grade design, verification and implementation practice into engineering curricula.",
    points: ["Curriculum co-design", "Guest engineering lectures", "Student project mentorship"],
  },
  {
    icon: Users,
    title: "Faculty development programs",
    tag: "Academic",
    text: "Structured upskilling for faculty: modern RTL-to-GDSII flows, verification methodology and laboratory pedagogy, taught by practicing engineers.",
    points: ["Hands-on tool workshops", "Take-home teaching material", "Ongoing engineer support"],
  },
  {
    icon: FlaskConical,
    title: "Semiconductor lab setup",
    tag: "Academic",
    text: "Design of teaching laboratory capability: workstation flows, licenses strategy, experiment sequences and assessment rubrics for VLSI lab courses.",
    points: ["Flow & tooling architecture", "Experiment sequences", "TA training"],
  },
  {
    icon: BookOpen,
    title: "Institutional training",
    tag: "Academic",
    text: "Cohort training delivered on campus: full programs or focused modules aligned to academic calendars, with engineer-led review cadences.",
    points: ["On-campus delivery", "Cohort assessments", "Capstone project supervision"],
  },
  {
    icon: Factory,
    title: "Corporate upskilling",
    tag: "Corporate",
    text: "Role-targeted capability building for engineering organisations: verification methodology rollouts, PD refreshers, RTL quality programs.",
    points: ["Needs analysis first", "Delivered by senior engineers", "Measured by artefact quality"],
  },
  {
    icon: Network,
    title: "Engineering talent development",
    tag: "Corporate",
    text: "Graduate onboarding acceleration: turn new hires into productive team members with structured first-90-days engineering programs.",
    points: ["Custom onboarding curricula", "Mentor pairing", "Manager-visible progress"],
  },
];

export default function PartnershipsPage() {
  useEffect(() => {
    document.title = "Academic & Corporate Partnerships — Labs, Curriculum, Upskilling · Chiprion";
  }, []);

  return (
    <>
      <PageHero
        kicker="ACADEMIC & CORPORATE PARTNERSHIPS"
        title={
          <>
            INSTITUTIONS SCALE.
            <br />
            <span className="text-signal">CAPABILITY COMPOUNDS.</span>
          </>
        }
        text="Chiprion partners with universities and engineering organisations to build durable semiconductor capability — curricula, laboratories, faculty and teams."
        image={{ src: "/images/fab.jpg", alt: "Semiconductor cleanroom corridor" }}
      />

      <section className="relative border-t border-line-soft bg-void py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {models.map((m, i) => (
              <Reveal key={m.title} delay={(i % 3) * 70}>
                <article className="corners flex h-full flex-col border border-line bg-panel p-7">
                  <div className="flex items-center justify-between">
                    <m.icon className="h-6 w-6 text-signal" aria-hidden="true" />
                    <span className="border border-line px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-mist">
                      {m.tag}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-xl font-semibold leading-snug text-paper">{m.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{m.text}</p>
                  <ul className="mt-5 space-y-2 border-t border-line-soft pt-4">
                    {m.points.map((p) => (
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
        </div>
      </section>

      {/* process */}
      <section className="relative border-t border-line-soft bg-obsidian py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <SectionHead
            kicker="PARTNERSHIP PROCESS"
            title={
              <>
                FROM FIRST CALL TO
                <br />
                <span className="text-signal">RUNNING PROGRAM.</span>
              </>
            }
          />
          <div className="mt-14 grid gap-px border border-line-soft bg-line-soft md:grid-cols-4">
            {[
              { n: "01", t: "Alignment call", d: "Institutional goals, constraints, calendars and capability gaps — an engineering conversation, not a pitch." },
              { n: "02", t: "Pilot design", d: "A scoped pilot: one module, one cohort, one measurable outcome. Small enough to trust." },
              { n: "03", t: "Pilot delivery", d: "Engineer-led delivery with your faculty or leads embedded throughout. Results documented honestly." },
              { n: "04", t: "Scale agreement", d: "Multi-term roadmap only after the pilot evidence justifies it. Long-term by proof, not by contract pressure." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="h-full bg-obsidian p-8">
                  <span className="font-display text-4xl font-bold text-outline">{s.n}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-paper">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* form */}
      <section className="relative border-t border-line-soft bg-void py-24 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-8 lg:grid-cols-2">
          <SectionHead
            kicker="OPEN A PARTNERSHIP"
            title={
              <>
                TELL US ABOUT
                <br />
                YOUR <span className="text-signal">INSTITUTION.</span>
              </>
            }
            text="Universities: tell us about your department, cohorts and current lab reality. Companies: describe your teams, flows and capability goals. The partnership desk responds with a scoped conversation, not a brochure."
          />
          <EnquiryForm type="partnership" source="partnerships" heading="Partnership enquiry" />
        </div>
      </section>
    </>
  );
}
