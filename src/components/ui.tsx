import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHead({
  kicker,
  title,
  text,
  align = "left",
  className,
}: {
  kicker: string;
  title: ReactNode;
  text?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className="kicker flex items-center gap-3">
        {align === "center" && <span className="h-px w-6 bg-signal/60" aria-hidden="true" />}
        {kicker}
        <span className="h-px w-6 bg-signal/60" aria-hidden="true" />
      </p>
      <h2 className="headline-xl mt-5 text-4xl text-paper md:text-5xl lg:text-[3.4rem]">
        {title}
      </h2>
      {text && <p className="mt-5 leading-relaxed text-mist md:text-lg">{text}</p>}
    </Reveal>
  );
}

export function PageHero({
  kicker,
  title,
  text,
  image,
  children,
}: {
  kicker: string;
  title: ReactNode;
  text?: string;
  image?: { src: string; alt: string };
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28">
      {image && (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/80 to-void" />
        </>
      )}
      <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        <Reveal>
          <p className="kicker flex items-center gap-3">
            {kicker}
            <span className="h-px w-8 bg-signal/60" aria-hidden="true" />
          </p>
          <h1 className="headline-xl mt-6 max-w-4xl text-5xl text-paper md:text-6xl lg:text-7xl">
            {title}
          </h1>
          {text && (
            <p className="mt-6 max-w-2xl leading-relaxed text-mist md:text-lg">{text}</p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function CTALink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cx("btn", variant === "primary" ? "btn-primary" : "btn-ghost", className)}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="chip-tab">
      <span className="dot" aria-hidden="true" />
      {children}
    </span>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-signal/50 pl-4">
      <p className="font-display text-3xl font-semibold text-paper md:text-4xl">{value}</p>
      <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ash">{label}</p>
    </div>
  );
}
