"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { cx } from "@/lib/utils";

const links = [
  { href: "/training", label: "Training" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-line-soft bg-void/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-[72px] md:px-8">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {links.map((l) => {
              const active =
                pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "link-line font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors",
                    active ? "text-signal" : "text-mist hover:text-paper"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="btn btn-primary hidden !px-5 !py-2.5 md:inline-flex"
            >
              Enquire
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center border border-line text-paper transition-colors hover:border-signal hover:text-signal lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        {/* scroll progress */}
        <div
          className="absolute bottom-0 left-0 h-px bg-signal transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-void"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex h-16 items-center justify-between border-b border-line-soft px-5">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center border border-line text-paper hover:border-signal hover:text-signal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6" aria-label="Mobile">
              {[...links, { href: "/contact", label: "Contact" }].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ x: -32, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    className={cx(
                      "group flex items-baseline justify-between border-b border-line-soft py-4",
                      pathname === l.href ? "text-signal" : "text-paper"
                    )}
                  >
                    <span className="font-display text-3xl font-semibold tracking-tight">
                      {l.label}
                    </span>
                    <span className="font-mono text-[0.65rem] tracking-[0.3em] text-ash">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="border-t border-line-soft p-6">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ash">
                Engineering the next generation of silicon
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
