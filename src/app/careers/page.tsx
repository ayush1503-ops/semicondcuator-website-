import type { Metadata } from "next";
import Link from "next/link";
import { Target, MessagesSquare, ClipboardCheck, Compass, GraduationCap, Building } from "lucide-react";
import { PageHero, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Careers — Mentorship, Interview Preparation, Internships",
  description:
    "Semiconductor career development with honest expectations: mentorship, technical assessments, interview preparation, internship track, placement assistance and employer partnerships.",
};

const tracks = [
  {
    icon: Compass,
    title: "Career guidance",
    text: "An honest map of the semiconductor roles that fit your background — design, verification, PD, DFT, embedded — and the evidence each one demands.",
    points: ["Role-fit assessment", "Reality-checked timelines", "Skill-gap diagnosis"],
  },
  {
    icon: MessagesSquare,
    title: "Mentorship",
    text: "Scheduled sessions with practicing engineers. Review your code, your coverage reports and your project narrative before an interviewer does.",
    points: ["Code & report reviews", "Project narrative building", "Monthly check-ins"],
  },
  {
    icon: ClipboardCheck,
    title: "Technical assessments",
    text: "Mock assessments built like real industry screens: RTL exercises, verification scenarios, timing questions — with engineer-graded feedback.",
    points: ["Timed practical exercises", "Written, actionable feedback", "Readiness scoring rubric"],
  },
  {
    icon: Target,
    title: "Interview preparation",
    text: "Representative question drills plus deep rehearsal of your own projects — because panels dig into whatever you claim.",
    points: ["Whiteboard CDC & timing drills", "Project deep-dive rehearsal", "Panel-style mock rounds"],
  },
  {
    icon: GraduationCap,
    title: "Internship opportunities",
    text: "The internship track places selected programme graduates into mentored, milestone-driven engineering projects. Places are limited by mentor capacity.",
    points: ["Mentored delivery", "Portfolio-worthy artefacts", "Exit presentation to engineers"],
  },
  {
    icon: Building,
    title: "Placement assistance",
    text: "Introductions through our employer network for candidates whose evidence is ready. We do not publish placement percentages and we do not guarantee outcomes.",
    points: ["Evidence-first introductions", "Employer relationship network", "No invented statistics — ever"],
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        kicker="CAREER DEVELOPMENT"
        title={
          <>
            CAREERS ARE
            <br />
            <span className="text-signal">ENGINEERED, NOT PROMISED.</span>
          </>
        }
        text="Structured mentorship, assessments and interview preparation for semiconductor roles — with the honesty this industry deserves. We build evidence; outcomes follow evidence."
        image={{ src: "/images/lab.jpg", alt: "Engineering laboratory" }}
      />

      <section className="relative border-t border-line-soft bg-void py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tracks.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 70}>
                <article className="corners flex h-full flex-col border border-line bg-panel p-7">
                  <t.icon className="h-6 w-6 text-signal" aria-hidden="true" />
                  <h2 className="mt-5 font-display text-xl font-semibold text-paper">{t.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{t.text}</p>
                  <ul className="mt-5 space-y-2 border-t border-line-soft pt-4">
                    {t.points.map((p) => (
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

      {/* internship banner */}
      <section className="relative border-t border-line-soft bg-obsidian py-24 md:py-32">
        <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <SectionHead
              kicker="THE INTERNSHIP TRACK"
              title={
                <>
                  REAL PROJECTS.
                  <br />
                  <span className="text-signal">REAL REVIEW PRESSURE.</span>
                </>
              }
              text="Selected graduates join scoped engineering projects under mentor supervision: weekly milestones, code review discipline, professional deliverables and an exit presentation to an engineering panel."
            />
            <ul className="mt-8 space-y-3">
              {[
                "Entry requires completion of a Chiprion programme plus a technical selection review",
                "Duration: 8–16 weeks depending on project scope",
                "Places are limited — capacity is bounded by mentors, not demand",
                "Read the full track description on the program page",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-mist">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-signal" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/training/industry-internship" className="btn btn-primary mt-8">
              View the internship track
            </Link>
          </div>
          <div>
            <SectionHead
              kicker="FOR EMPLOYERS"
              title={
                <>
                  HIRE ON
                  <br />
                  <span className="text-signal">EVIDENCE.</span>
                </>
              }
              text="Recruiters and engineering managers can review role-ready candidates with engineer-verified artefacts: reviewed RTL, coverage reports, closure documentation and mentor assessments."
            />
            <div className="mt-8 border border-line bg-panel p-6">
              <p className="kicker">RECRUITMENT ENQUIRIES</p>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                Use the form below and select “employer / recruiter” in your message. We respond with
                our talent review process and current candidate availability windows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* form */}
      <section className="relative border-t border-line-soft bg-void py-24 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-8 lg:grid-cols-2">
          <SectionHead
            kicker="START THE CONVERSATION"
            title={
              <>
                TELL US WHERE
                <br />
                YOU <span className="text-signal">STAND TODAY.</span>
              </>
            }
            text="Candidates: share your background and target role for an honest readiness read. Employers: outline roles, seniority and timeline for the talent desk."
          />
          <EnquiryForm type="career" source="careers" heading="Career / employer enquiry" />
        </div>
      </section>
    </>
  );
}
