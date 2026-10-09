import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Cpu, Building2, Users, BriefcaseBusiness } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { SectionHead } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

const nodes = [
  { id: "students", label: "Students", sub: "Programs · mentorship", icon: GraduationCap, x: 12, y: 14 },
  { id: "engineers", label: "Engineers", sub: "Upskilling · consulting", icon: Cpu, x: 76, y: 10 },
  { id: "universities", label: "Universities", sub: "Curriculum · labs", icon: Building2, x: 84, y: 62 },
  { id: "recruiters", label: "Recruiters", sub: "Technical talent pool", icon: Users, x: 16, y: 70 },
  { id: "companies", label: "Companies", sub: "Design · DV · PD services", icon: BriefcaseBusiness, x: 47, y: 86 },
];

const links = [
  {
    title: "Learn with us",
    text: "Structured programs in design, verification, implementation and embedded engineering.",
    href: "/training",
    cta: "Explore training",
  },
  {
    title: "Build with us",
    text: "RTL, verification, physical design and embedded services for engineering teams.",
    href: "/services",
    cta: "Engineering services",
  },
  {
    title: "Partner with us",
    text: "University collaborations, faculty development and corporate capability programs.",
    href: "/partnerships",
    cta: "Partnership models",
  },
];

const easeOut = "cubic-bezier(0.22, 1, 0.36, 1)";

const mapVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut as any },
  },
};

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 0.4, transition: { duration: 1, ease: "easeInOut" } },
};

function EcosystemMap() {
  return (
    <motion.div
      className="corners relative hidden h-[540px] rounded-2xl border border-line bg-white md:block"
      initial="hidden"
      animate="visible"
      variants={mapVariants}
    >
      <div className="grid-bg-fine absolute inset-0 rounded-2xl" aria-hidden="true" />
      <svg viewBox="0 0 1000 540" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        {nodes.map((n, i) => {
          const cx = (n.x / 100) * 1000;
          const cy = (n.y / 100) * 540;
          const pathLength = Math.sqrt(Math.pow(cx - 500, 2) + Math.pow(cy - 270, 2));
          return (
            <motion.g key={n.id} variants={nodeVariants}>
              <motion.path
                d={`M500 270 L ${cx} ${cy}`}
                stroke="#D7DEE8"
                strokeWidth="1.2"
                fill="none"
                initial={false}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.15, ease: "easeInOut" }}
              />
              <motion.path
                d={`M500 270 L ${cx} ${cy}`}
                stroke="#0052FF"
                strokeWidth="1"
                fill="none"
                variants={lineVariants}
              />
              <motion.circle
                cx={cx}
                cy={cy}
                r={3.5}
                fill="#0052FF"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.2 + 0.3, type: "spring", stiffness: 200 }}
              />
            </motion.g>
          );
        })}
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border-2 border-signal/60 bg-white text-center shadow-[0_12px_32px_rgba(0,82,255,0.12)]"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 180 }}
      >
        <span className="font-display text-lg tracking-[0.04em] text-paper">Chiprion</span>
        <span className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-signal">ecosystem</span>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={mapVariants}
        style={{ pointerEvents: "none" }}
      >
        {nodes.map((n) => (
          <motion.div
            key={n.id}
            className="absolute w-44 rounded-xl border border-line bg-white/95 p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)]"
            style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-10%)" }}
            variants={nodeVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(15,23,42,0.12)", transition: { duration: 0.2 } }}
          >
            <div className="flex items-center gap-2">
              <n.icon className="h-4 w-4 text-signal" aria-hidden="true" />
              <span className="text-sm font-semibold text-paper">{n.label}</span>
            </div>
            <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ash">{n.sub}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function EcosystemSection() {
  return (
    <section className="relative border-t border-line bg-white py-24 md:py-32" aria-label="Engineering meets industry">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHead
          kicker="SEQUENCE 05 · ENGINEERING MEETS INDUSTRY"
          title={
            <>
              One ecosystem.
              <br />
              Education, engineering, <span className="text-signal">industry.</span>
            </>
          }
          text="Chiprion is built as a connector: students become engineers, engineers deliver services, universities scale labs, and industry gains a credible talent channel."
          align="center"
        />

        <Reveal className="mt-14">
          <EcosystemMap />
          {/* mobile simple grid */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:hidden">
            {nodes.map((n) => (
              <motion.div
                key={n.id}
                className="bg-white p-4"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <n.icon className="h-5 w-5 text-signal" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold text-paper">{n.label}</p>
                <p className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ash">{n.sub}</p>
              </motion.div>
            ))}
            <div className="col-span-2 bg-navy p-4 text-center">
              <span className="font-display text-base tracking-[0.04em] text-paper">Chiprion</span>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-signal">the connecting layer</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {links.map((l, i) => (
            <Reveal key={l.title} delay={i * 90} variant="slide-up">
              <motion.div
                className="group flex h-full flex-col justify-between bg-white p-8 transition-colors hover:bg-navy/60"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Link to={l.href} className="flex h-full flex-col justify-between">
                  <div>
                    <span className="font-mono text-[0.62rem] tracking-[0.3em] text-signal">0{i + 1}</span>
                    <h3 className="mt-4 font-display text-2xl text-paper">{l.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{l.text}</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-signal">
                    {l.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}