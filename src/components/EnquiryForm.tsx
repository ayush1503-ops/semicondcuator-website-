"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { cx } from "@/lib/utils";

export type EnquiryType = "course" | "service" | "partnership" | "career" | "general";

const TYPE_LABELS: Record<EnquiryType, string> = {
  course: "Course enquiry",
  service: "Engineering services enquiry",
  partnership: "Partnership enquiry",
  career: "Career / internship enquiry",
  general: "General enquiry",
};

type Props = {
  type?: EnquiryType;
  interest?: string;
  source: string;
  heading?: string;
  compact?: boolean;
};

type FieldErrors = Record<string, string>;

export function EnquiryForm({ type = "general", interest, source, heading, compact }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMsg, setServerMsg] = useState("");
  const loadedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerMsg("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      type,
      interest,
      source,
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      organization: String(fd.get("organization") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      website: String(fd.get("website") || ""), // honeypot
      elapsedMs: Date.now() - loadedAt.current,
    };

    const local: FieldErrors = {};
    if (payload.name.length < 2) local.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) local.email = "Enter a valid email address.";
    if (payload.message.length < 12) local.message = "Tell us a little more (min. 12 characters).";
    if (Object.keys(local).length) {
      setErrors(local);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors || {});
        setServerMsg(data.message || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      formRef.current?.reset();
      loadedAt.current = Date.now();
    } catch {
      setServerMsg("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border-2 border-signal/40 bg-navy/50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-signal" aria-hidden="true" />
        <h3 className="mt-4 font-display text-xl font-semibold text-paper">Enquiry received.</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mist">
          Thank you — your {TYPE_LABELS[type].toLowerCase()} has been recorded. The engineering
          desk responds within two business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-signal hover:text-flare"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const inputCls = (hasErr?: string) =>
    cx(
      "w-full rounded-lg border bg-void px-4 py-3 text-sm text-paper placeholder:text-ash/70 transition-colors focus:outline-none",
      hasErr ? "border-amber/70" : "border-line focus:border-signal"
    );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:p-8">
      <p className="kicker">{TYPE_LABELS[type]}</p>
      {heading && <h3 className="mt-3 font-display text-2xl font-semibold text-paper">{heading}</h3>}
      {interest && (
        <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-silicon">
          RE: {interest}
        </p>
      )}

      <div className={cx("mt-6 grid gap-4", compact ? "" : "md:grid-cols-2")}>
        <div>
          <label htmlFor={`${source}-name`} className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mist">
            Full name *
          </label>
          <input id={`${source}-name`} name="name" autoComplete="name" className={inputCls(errors.name)} placeholder="Ada Kumar" />
          {errors.name && <p className="mt-1 text-xs text-amber">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${source}-email`} className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mist">
            Email *
          </label>
          <input id={`${source}-email`} name="email" type="email" autoComplete="email" className={inputCls(errors.email)} placeholder="you@university.edu" />
          {errors.email && <p className="mt-1 text-xs text-amber">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor={`${source}-phone`} className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mist">
            Phone
          </label>
          <input id={`${source}-phone`} name="phone" type="tel" autoComplete="tel" className={inputCls()} placeholder="+91 · optional" />
        </div>
        <div>
          <label htmlFor={`${source}-org`} className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mist">
            {type === "partnership" ? "Institution / company" : "Organization"}
          </label>
          <input id={`${source}-org`} name="organization" className={inputCls()} placeholder="Optional" />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`${source}-msg`} className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mist">
          {type === "service" ? "Project outline *" : "Message *"}
        </label>
        <textarea
          id={`${source}-msg`}
          name="message"
          rows={compact ? 4 : 5}
          className={inputCls(errors.message)}
          placeholder={
            type === "service"
              ? "Tell us about the block, node, schedule and what you need delivered…"
              : type === "course"
              ? "Your background, goals and any questions about the program…"
              : "How can the engineering desk help?"
          }
        />
        {errors.message && <p className="mt-1 text-xs text-amber">{errors.message}</p>}
      </div>

      {/* honeypot — hidden from humans */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {serverMsg && (
        <p className="mt-4 flex items-center gap-2 text-sm text-amber">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" /> {serverMsg}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:cursor-wait disabled:opacity-60">
          {status === "sending" ? "Transmitting…" : "Submit enquiry"}
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ash">
          Response within 2 business days · No spam, ever
        </p>
      </div>
    </form>
  );
}
