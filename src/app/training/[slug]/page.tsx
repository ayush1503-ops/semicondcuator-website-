import type { Metadata } from "next";
import { Link } from "react-router-dom";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, FlaskConical } from "lucide-react";
import { courses } from "@/lib/content";
import { Tag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { EnquiryForm } from "@/components/EnquiryForm";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const course = courses.find((c) => c.slug === slug);
    if (!course) return { title: "Program not found" };
    return {
      title: `${course.title} (${course.code})`,
      description: course.short,
    };
  });
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const related = courses.filter((c) => c.slug !== slug && (c.discipline === course.discipline || c.level === course.level)).slice(0, 3);

  return (
    <>
      {/* header */}
      <section className="relative overflow-hidden border-b border-line-soft pt-36 pb-16 md:pt-48 md:pb-20">
        <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,82,255,0.06),transparent_55%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
          <Link to="/training" className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-mist transition-colors hover:text-signal">
            <ArrowLeft className="h-4 w-4" /> All programs
          </Link>
          <Reveal className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <Tag>{course.level}</Tag>
              <span className="chip-tab"><span className="dot" />{course.discipline}</span>
              <span className="font-mono text-[0.66rem] tracking-[0.25em] text-ash">{course.code}</span>
            </div>
            <h1 className="headline-xl mt-6 max-w-4xl text-4xl text-paper md:text-6xl">
              {course.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{course.short}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-void py-16 md:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-8 lg:grid-cols-[1fr_360px]">
          {/* main */}
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-paper md:text-3xl">Program overview</h2>
              <p className="mt-5 leading-relaxed text-mist md:text-lg">{course.overview}</p>
            </Reveal>

            <Reveal className="mt-14">
              <h2 className="font-display text-2xl font-semibold text-paper md:text-3xl">
                What you will be able to do
              </h2>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 border border-line-soft bg-panel p-4 text-sm leading-relaxed text-mist">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-14">
              <h2 className="font-display text-2xl font-semibold text-paper md:text-3xl">Curriculum</h2>
              <div className="mt-6 space-y-4">
                {course.modules.map((m, i) => (
                  <div key={m.title} className="corners border border-line bg-panel p-6">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.7rem] tracking-[0.25em] text-signal">
                        M{String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-paper">{m.title}</h3>
                    </div>
                    <ul className="mt-4 space-y-2 pl-14">
                      {m.points.map((p) => (
                        <li key={p} className="flex items-center gap-3 text-sm text-mist">
                          <span className="h-px w-4 shrink-0 bg-signal/60" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-14">
              <div className="border border-signal/40 bg-navy/30 p-7">
                <p className="kicker flex items-center gap-2">
                  <FlaskConical className="h-4 w-4" aria-hidden="true" /> LAB PROJECT
                </p>
                <p className="mt-4 leading-relaxed text-paper md:text-lg">{course.project}</p>
              </div>
            </Reveal>

            <Reveal className="mt-14 grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="font-display text-xl font-semibold text-paper">Prerequisites</h2>
                <ul className="mt-4 space-y-2">
                  {course.prerequisites.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-mist">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-signal" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-paper">Career pathways</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.careers.map((c) => (
                    <span key={c} className="border border-line px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-mist">
                      {c}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-ash">
                  Programs build evidence and skill. Admission does not include employment guarantees
                  — see the careers page for how placement assistance actually works.
                </p>
              </div>
            </Reveal>

            {/* enquiry */}
            <Reveal className="mt-16">
              <div id="enquiry" className="scroll-mt-28">
              <EnquiryForm
                type="course"
                interest={`${course.code} — ${course.title}`}
                source={`training/${course.slug}`}
                heading="Enquire about this program"
              />
              </div>
            </Reveal>
          </div>

          {/* aside */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-line bg-panel">
              <div className="border-b border-line-soft px-6 py-4">
                <p className="kicker">FACT SHEET</p>
              </div>
              <dl className="divide-y divide-line-soft">
                {[
                  ["Program code", course.code],
                  ["Level", course.level],
                  ["Discipline", course.discipline],
                  ["Duration", course.duration],
                  ["Format", course.format],
                ].map(([k, v]) => (
                  <div key={k} className="px-6 py-4">
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ash">{k}</dt>
                    <dd className="mt-1 text-sm text-paper">{v}</dd>
                  </div>
                ))}
                <div className="px-6 py-4">
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ash">Tooling exposure</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {course.tools.map((t) => (
                      <span key={t} className="border border-line-soft px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-mist">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
              <div className="border-t border-line-soft p-6">
                <a href="#enquiry" className="btn btn-primary w-full justify-center">
                  Enquire / Reserve a seat
                </a>
                <p className="mt-3 text-center font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ash">
                  Cohort sizes are capped · Mentor-led
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* related */}
      <section className="border-t border-line-soft bg-obsidian py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <h2 className="font-display text-2xl font-semibold text-paper md:text-3xl">Continue the path</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/training/${r.slug}`} className="group border border-line bg-panel p-6 transition-colors hover:border-signal/50">
                <span className="font-mono text-[0.62rem] tracking-[0.25em] text-ash">{r.code}</span>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-paper">{r.title}</h3>
                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-signal">
                  View program <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
