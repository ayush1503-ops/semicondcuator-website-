import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Course } from "@/lib/content";
import { cx } from "@/lib/utils";
import { Tag } from "./ui";

const filters = ["All", "Foundation", "Core", "Advanced", "Elective"] as const;

export function TrainingList({ courses }: { courses: Course[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = filter === "All" ? courses : courses.filter((c) => c.level === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter programs by level">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cx(
              "border px-5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] transition-colors",
              filter === f
                ? "border-signal bg-signal/10 text-signal"
                : "border-line text-mist hover:border-mist/50 hover:text-paper"
            )}
          >
            {f}
            <span className="ml-2 text-ash">
              {f === "All" ? courses.length : courses.filter((c) => c.level === f).length}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((c) => (
          <Link
            key={c.slug}
            to={`/training/${c.slug}`}
            className="corners group flex h-full flex-col border border-line bg-panel overflow-hidden transition-all hover:border-signal/50 hover:bg-navy/40"
          >
            <div className="h-48 w-full overflow-hidden">
              <img src={c.image} alt={c.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-col flex-1 p-7">
              <div className="flex items-center justify-between">
                <Tag>{c.level}</Tag>
                <span className="font-mono text-[0.62rem] tracking-[0.2em] text-ash">{c.code}</span>
              </div>
              <h2 className="mt-6 font-display text-xl font-semibold leading-snug text-paper">
                {c.title}
              </h2>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-silicon">
                {c.discipline}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-mist">{c.short}</p>
              <div className="mt-6 space-y-1.5 border-t border-line-soft pt-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
                <p>{c.duration}</p>
                <p>{c.format}</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-signal">
                View curriculum
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
