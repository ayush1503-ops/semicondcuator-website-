import type { Metadata } from "next";
import { Link } from "react-router-dom";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { CTALink } from "@/components/ui";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const a = articles.find((x) => x.slug === slug);
    if (!a) return { title: "Article not found" };
    return { title: a.title, description: a.excerpt };
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = articles.findIndex((x) => x.slug === slug);
  const a = articles[idx];
  if (!a) notFound();
  const next = articles[(idx + 1) % articles.length];
  const prev = articles[(idx - 1 + articles.length) % articles.length];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line-soft pt-36 pb-14 md:pt-48">
        <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 md:px-8">
          <Link to="/resources" className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-mist hover:text-signal">
            <ArrowLeft className="h-4 w-4" /> All resources
          </Link>
          <Reveal className="mt-8">
            <div className="flex items-center gap-4">
              <span className="chip-tab"><span className="dot" />{a.category}</span>
              <span className="font-mono text-[0.62rem] tracking-[0.2em] text-ash">{a.minutes} MIN READ</span>
            </div>
            <h1 className="headline-xl mt-6 text-4xl text-paper md:text-5xl">{a.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-mist">{a.excerpt}</p>
          </Reveal>
        </div>
      </section>

      <article className="bg-void py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          {a.body.map((p, i) => (
            <Reveal key={i} delay={Math.min(i * 40, 200)}>
              <p className="mb-7 leading-[1.85] text-mist md:text-[1.05rem]">
                {i === 0 && (
                  <span className="float-left mr-3 font-display text-6xl font-bold leading-none text-signal">
                    {p.charAt(0)}
                  </span>
                )}
                {i === 0 ? p.slice(1) : p}
              </p>
            </Reveal>
          ))}

          <div className="mt-14 border border-line bg-panel p-7">
            <p className="kicker">KEEP GOING</p>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              This article is part of the Chiprion resource library. The structured programs
              turn these ideas into reviewed engineering skill.
            </p>
            <CTALink href="/training" className="mt-5">Explore programs</CTALink>
          </div>
        </div>
      </article>

      <nav className="border-t border-line-soft bg-obsidian" aria-label="More articles">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
          <Link to={`/resources/${prev.slug}`} className="group border-b border-line-soft p-8 transition-colors hover:bg-navy/50 md:border-b-0 md:border-r">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-ash">← Previous</span>
            <p className="mt-3 font-display text-lg font-semibold leading-snug text-paper">{prev.title}</p>
          </Link>
          <Link to={`/resources/${next.slug}`} className="group flex items-start justify-between gap-4 p-8 transition-colors hover:bg-navy/50">
            <div>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-ash">Next →</span>
              <p className="mt-3 font-display text-lg font-semibold leading-snug text-paper">{next.title}</p>
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-signal" />
          </Link>
        </div>
      </nav>
    </>
  );
}
