import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
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

const easeOut = "cubic-bezier(0.22, 1, 0.36, 1)";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut as any } },
};

export function SiteFooter() {
  return (
    <footer className="relative bg-[#0B1220] text-slate-300">
      <div className="relative mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20">
        <motion.div
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Logo onDark />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-slate-400">
              Semiconductor engineering education and design services — connecting
              students, engineers, universities and industry from RTL to silicon.
            </p>
            <p className="mt-6 font-mono text-[0.62rem] tracking-[0.3em] text-slate-500">
              RTL · VERIFY · IMPLEMENT · TAPE-OUT
            </p>
          </motion.div>

          <motion.nav aria-label="Programs" variants={itemVariants}>
            <h3 className="font-mono text-[0.66rem] tracking-[0.28em] text-slate-500">PROGRAMS</h3>
            <ul className="mt-5 space-y-3">
              {courses.slice(0, 6).map((c) => (
                <motion.li key={c.slug} variants={itemVariants}>
                  <Link to={`/training/${c.slug}`} className="text-sm text-slate-300 transition-colors hover:text-[#7DA2FF]">
                    {c.title}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={itemVariants}>
                <Link to="/training" className="text-sm text-[#7DA2FF] transition-colors hover:text-white">
                  All programs →
                </Link>
              </motion.li>
            </ul>
          </motion.nav>

          <motion.nav aria-label="Explore" variants={itemVariants}>
            <h3 className="font-mono text-[0.66rem] tracking-[0.28em] text-slate-500">EXPLORE</h3>
            <ul className="mt-5 space-y-3">
              {explore.map((l) => (
                <motion.li key={l.href} variants={itemVariants}>
                  <Link to={l.href} className="text-sm text-slate-300 transition-colors hover:text-[#7DA2FF]">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav aria-label="Company" variants={itemVariants}>
            <h3 className="font-mono text-[0.66rem] tracking-[0.28em] text-slate-500">COMPANY</h3>
            <ul className="mt-5 space-y-3">
              {company.map((l) => (
                <motion.li key={l.href} variants={itemVariants}>
                  <Link to={l.href} className="text-sm text-slate-300 transition-colors hover:text-[#7DA2FF]">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div className="mt-8 rounded-xl border border-white/10 p-4" variants={itemVariants} whileHover={{ borderColor: "#0052FF", transition: { duration: 0.2 } }}>
              <p className="font-mono text-[0.6rem] tracking-[0.25em] text-slate-500">ENQUIRY DESK</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Course, service and partnership enquiries are answered through the{" "}
                <Link to="/contact" className="text-[#7DA2FF] hover:text-white">
                  enquiry form
                </Link>
                . Typical response within two business days.
              </p>
            </motion.div>
          </motion.nav>
        </motion.div>

        <motion.div
          className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut as any }}
        >
          <p className="font-mono text-[0.62rem] tracking-[0.25em] text-slate-500">
            © {new Date().getFullYear()} CHIPRION. ALL RIGHTS RESERVED.
          </p>
          <p className="max-w-xl font-mono text-[0.6rem] leading-relaxed tracking-[0.1em] text-slate-500">
            Programme content and project examples on this site are illustrative of teaching
            methodology. No placement rates, employer partnerships or outcome guarantees are implied
            unless explicitly stated in writing.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}