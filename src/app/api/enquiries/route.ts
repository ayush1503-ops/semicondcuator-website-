import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { enquiries } from "@/db/schema";

const schema = z.object({
  type: z.enum(["course", "service", "partnership", "career", "general"]).default("general"),
  name: z.string().trim().min(2, "Name is too short.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  organization: z.string().trim().max(200).optional().or(z.literal("")),
  interest: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(12, "Message is too short.").max(4000),
  source: z.string().trim().max(120).optional().or(z.literal("")),
  website: z.string().optional(), // honeypot
  elapsedMs: z.number().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return NextResponse.json({ message: "Please fix the highlighted fields.", errors }, { status: 400 });
  }

  const data = parsed.data;

  // Spam guards: honeypot + impossible-fast submission
  if (data.website || (typeof data.elapsedMs === "number" && data.elapsedMs < 1200)) {
    // Pretend success so bots learn nothing.
    return NextResponse.json({ ok: true });
  }

  try {
    await db.insert(enquiries).values({
      type: data.type,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      organization: data.organization || null,
      interest: data.interest || null,
      subject: `${data.type.toUpperCase()} enquiry from ${data.name}`,
      message: data.message,
      source: data.source || null,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Enquiry insert failed:", err);
    return NextResponse.json(
      { message: "The enquiry desk is temporarily unavailable. Please try again shortly." },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
