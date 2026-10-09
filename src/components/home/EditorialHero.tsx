import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const meta = ["10 programs", "7 disciplines", "1 engineering desk", "RTL → GDSII"];

const easeOut = "cubic-bezier(0.22, 1, 0.36, 1)";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut as any } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, rotate: -2 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1, ease: easeOut as any } },
};

export function EditorialHero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-32 md:pt-40" aria-label="Introduction">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent"
        aria-hidden="true"
      />
      <p
        className="pointer-events-none absolute right-6 top-1/2 hidden origin-center -rotate-90 font-mono text-[0.6rem] tracking-[0.5em] text-ash xl:block"
        aria-hidden="true"
      >
        SILICON ENGINEERING · EST. PLATFORM
      </p>

      <div className="relative mx-auto max-w-[1440px] px-5 pb-16 md:px-8 md:pb-24">
        <motion.div
          className="grid items-center gap-14 lg:grid-cols-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="lg:col-span-7" variants={itemVariants}>
            <Reveal>
              <p className="kicker flex items-center gap-3">
                CHIPRION · SEMICONDUCTOR ENGINEERING PLATFORM
                <span className="h-px w-8 bg-signal/60" aria-hidden="true" />
              </p>
              <h1 className="headline-xl mt-7 max-w-3xl text-[clamp(2.8rem,6vw,4.9rem)] text-paper">
                Engineering the next generation of{" "}
                <em className="not-italic text-signal">silicon.</em>
              </h1>
              <p className="mt-7 max-w-xl leading-relaxed text-mist md:text-lg">
                From RTL to tape-out. From engineering fundamentals to industry-ready
                semiconductor innovation — taught the way design teams actually work:
                specifications, reviews, coverage and closure.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/training" className="btn btn-primary group">
                  Explore Programs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/services" className="btn btn-ghost">
                  Discover Engineering Services
                </Link>
              </div>
            </Reveal>

            <Reveal delay={140} variant="slide-up">
              <dl className="mt-14 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
                {meta.map((m) => {
                  const [value, ...label] = m.split(" ");
                  return (
                    <motion.div
                      key={m}
                      className="bg-white px-4 py-4"
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                      <dt className="sr-only">{label.join(" ")}</dt>
                      <dd className="font-display text-lg leading-tight text-paper">{value}</dd>
                      <dd className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ash">
                        {label.join(" ")}
                      </dd>
                    </motion.div>
                  );
                })}
              </dl>
            </Reveal>
          </motion.div>

          <motion.div className="lg:col-span-5" variants={itemVariants}>
            <Reveal className="lg:col-span-5" delay={100} variant="scale">
              <figure className="relative mx-auto max-w-md lg:max-w-none">
                <div
                  className="absolute -left-3 -top-3 h-full w-full rounded-2xl border-2 border-signal/50"
                  aria-hidden="true"
                />
                <motion.div
                  className="corners relative overflow-hidden rounded-2xl border border-line bg-white"
                  variants={imageVariants}
                  whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
                >
                  <img
                    src="/images/hero-plate.jpg"
                    alt="Silicon chip package with exposed die on a light studio background"
                    width={880}
                    height={880}
                    className="aspect-square w-full object-cover"
                    sizes="(max-width: 1024px) 90vw, 40vw"
                  />
                </motion.div>
                <figcaption className="mt-4 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ash">
                  <span>FIG. 01 — Silicon die, illustrative render</span>
                  <span className="text-signal">Scale 1:10⁴</span>
                </figcaption>
              </figure>
            </Reveal>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}