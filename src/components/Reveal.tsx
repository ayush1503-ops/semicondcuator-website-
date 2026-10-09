import type { ReactNode } from "react";
import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { cx } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
  variant?: "fade" | "slide-up" | "slide-down" | "scale" | "flip";
};

const easeOut = "cubic-bezier(0.22, 1, 0.36, 1)";

const variantStyles: Record<string, { hidden: TargetAndTransition; visible: TargetAndTransition }> = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  "slide-up": { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
  "slide-down": { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  flip: { hidden: { opacity: 0, rotateX: -90 }, visible: { opacity: 1, rotateX: 0 } },
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variant = "slide-up",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = as;
  const { hidden, visible } = variantStyles[variant];

  return (
    <motion.div
      initial={reduced ? visible : hidden}
      whileInView={visible}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        ease: easeOut as any,
        delay: reduced ? 0 : delay / 1000,
      }}
      className={cx(className)}
    >
      <Tag>{children}</Tag>
    </motion.div>
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={cx(className)}
    >
      {children}
    </motion.div>
  );
}