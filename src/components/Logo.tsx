import Link from "next/link";
import { cx } from "@/lib/utils";

export function ChipMark({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const primary = onDark ? "#4D7CFF" : "#0052FF";
  const ink = onDark ? "#F1F5F9" : "#0F172A";
  const pins = onDark ? "#475569" : "#94A3B8";
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      <rect x="8" y="8" width="20" height="20" rx="2" stroke={primary} strokeWidth="1.6" />
      <rect x="13" y="13" width="10" height="10" stroke={ink} strokeWidth="1.2" opacity="0.85" />
      <path d="M18 13V8M13 18H8M23 18h5M18 23v5" stroke={primary} strokeWidth="1.2" opacity="0.6" />
      <path
        d="M11 8V2M18 8V2M25 8V2M11 34v-6M18 34v-6M25 34v-6M8 11H2M8 18H2M8 25H2M34 11h-6M34 18h-6M34 25h-6"
        stroke={pins}
        strokeWidth="1.4"
      />
      <rect x="16.5" y="16.5" width="3" height="3" fill={primary} />
    </svg>
  );
}

export function Logo({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Link href="/" aria-label="Chiprion home" className={cx("group flex items-center gap-3", className)}>
      <ChipMark onDark={onDark} className="h-9 w-9 transition-transform duration-500 group-hover:rotate-90" />
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            "font-display text-[1.15rem] tracking-[0.08em]",
            onDark ? "text-white" : "text-paper"
          )}
        >
          Chiprion
        </span>
        <span className={cx("font-mono text-[0.55rem] tracking-[0.38em]", onDark ? "text-slate-500" : "text-ash")}>
          SILICON ENGINEERING
        </span>
      </span>
    </Link>
  );
}
