import { PageHero, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { EnquiryForm, type EnquiryType } from "@/components/EnquiryForm";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const desks = [
  { k: "COURSE ENQUIRIES", d: "Program selection, schedules, cohort availability and advisory.", type: "course" as EnquiryType },
  { k: "SERVICES ENQUIRIES", d: "RTL, verification, PD, DFT, SoC and embedded engagements.", type: "service" as EnquiryType },
  { k: "PARTNERSHIP ENQUIRIES", d: "Universities, faculty programs, lab setup and corporate upskilling.", type: "partnership" as EnquiryType },
  { k: "CAREER ENQUIRIES", d: "Mentorship, internships, assessments and employer enquiries.", type: "career" as EnquiryType },
];

const validTypes: EnquiryType[] = ["course", "service", "partnership", "career", "general"];

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams?.get("type");
  const selected: EnquiryType = validTypes.includes(type as EnquiryType)
    ? (type as EnquiryType)
    : "general";

  useEffect(() => {
    document.title = "Contact & Enquiries — Courses, Services, Partnerships · Chiprion";
  }, []);

  return (
    <>
      <PageHero
        kicker="CONTACT & ENQUIRIES"
        title={
          <>
            EVERY BREAKTHROUGH
            <br />
            BEGINS WITH A <span className="text-signal">MESSAGE.</span>
          </>
        }
        text="One desk, four channels. Enquiries are reviewed by engineers and answered within two business days."
        image={{ src: "/images/blueprint.jpg", alt: "Blueprint illustration of a silicon wafer" }}
      />

      <section className="relative border-t border-line-soft bg-void py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHead
              kicker="ROUTING"
              title={
                <>
                  PICK A DESK.
                  <br />
                  <span className="text-signal">OR JUST WRITE.</span>
                </>
              }
              text="All four channels land in the same engineering desk — the envelope icon in your message simply tells us which engineer reads it first."
            />
            <div className="mt-10 space-y-4">
              {desks.map((d, i) => (
                <Reveal key={d.k} delay={i * 60}>
                  <div className="flex items-start justify-between gap-6 border border-line bg-panel p-5">
                    <div>
                      <p className="font-mono text-[0.66rem] tracking-[0.28em] text-signal">{d.k}</p>
                      <p className="mt-2 text-sm leading-relaxed text-mist">{d.d}</p>
                    </div>
                    <span className="font-display text-2xl font-bold text-outline">0{i + 1}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-8">
              <p className="border border-line-soft bg-panel px-5 py-4 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.16em] text-ash">
                ▸ Office address, phone lines and regional contacts will be published once provided.
                Until then, the enquiry form is the single verified channel.
              </p>
            </Reveal>
          </div>
          <div>
            <EnquiryForm
              key={selected}
              type={selected}
              source="contact"
              heading="Send an enquiry"
            />
            <Reveal className="mt-6">
              <div className="grid grid-cols-3 gap-px border border-line-soft bg-line-soft">
                {[
                  ["≤ 2 days", "Response time"],
                  ["4", "Engineering desks"],
                  ["100%", "Human-reviewed"],
                ].map(([v, l]) => (
                  <div key={l} className="bg-obsidian px-4 py-5 text-center">
                    <p className="font-display text-xl font-semibold text-signal">{v}</p>
                    <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-ash">{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
