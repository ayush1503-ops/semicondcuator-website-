import Link from "next/link";
import { Logo } from "./Logo";
import { courses } from "@/lib/content";

const explore = [
  { href: "/services", label: "Engineering Services" },
  { href: "/projects", label: "Projects & Labs" },
  { href: "/resources", label: "Resources" },
  { href: "/careers", label: "Careers" },
];

const company = [
  { href: "/about", label: "About Chiprion" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/contact", label: "Contact & Enquiries" },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-[#0B1220] text-slate-300">
      <div className="relative mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo onDark />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-slate-400">
              Semiconductor engineering education and design services — connecting
              students, engineers, universities and industry from RTL to silicon.
            </p>
            <p className="mt-6 font-mono text-[0.62rem] tracking-[0.3em] text-slate-500">
              RTL · VERIFY · IMPLEMENT · TAPE-OUT
            </p>
          </div>

          <nav aria-label="Programs">
            <h3 className="font-mono text-[0.66rem] tracking-[0.28em] text-slate-500">PROGRAMS</h3>
            <ul className="mt-5 space-y-3">
              {courses.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/training/${c.slug}`} className="text-sm text-slate-300 transition-colors hover:text-[#7DA2FF]">
                    {c.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/training" className="text-sm text-[#7DA2FF] transition-colors hover:text-white">
                  All programs →
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Explore">
            <h3 className="font-mono text-[0.66rem] tracking-[0.28em] text-slate-500">EXPLORE</h3>
            <ul className="mt-5 space-y-3">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-300 transition-colors hover:text-[#7DA2FF]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="font-mono text-[0.66rem] tracking-[0.28em] text-slate-500">COMPANY</h3>
            <ul className="mt-5 space-y-3">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-300 transition-colors hover:text-[#7DA2FF]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-white/10 p-4">
              <p className="font-mono text-[0.6rem] tracking-[0.25em] text-slate-500">ENQUIRY DESK</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Course, service and partnership enquiries are answered through the{" "}
                <Link href="/contact" className="text-[#7DA2FF] hover:text-white">
                  enquiry form
                </Link>
                . Typical response within two business days.
              </p>
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[0.62rem] tracking-[0.25em] text-slate-500">
            © {new Date().getFullYear()} CHIPRION. ALL RIGHTS RESERVED.
          </p>
          <p className="max-w-xl font-mono text-[0.6rem] leading-relaxed tracking-[0.1em] text-slate-500">
            Programme content and project examples on this site are illustrative of teaching
            methodology. No placement rates, employer partnerships or outcome guarantees are implied
            unless explicitly stated in writing.
          </p>
        </div>
      </div>
    </footer>
  );
}
