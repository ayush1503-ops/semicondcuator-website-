"use client";

import type { ReactNode } from "react";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { cx } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
};

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const reduced = useReducedMotion();
  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={cx(
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        !reduced && !inView && "translate-y-8 opacity-0",
        className
      )}
      style={{ transitionDelay: reduced ? "0ms" : `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Parent that toggles .in-view for SVG trace animations */
export function InViewScope({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  return (
    <div ref={ref} className={cx(className, inView && "in-view")}>
      {children}
    </div>
  );
}
