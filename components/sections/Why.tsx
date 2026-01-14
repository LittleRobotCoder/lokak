"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function WhySection() {
  return (
    <motion.section
      className="section relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Section separator */}
      <div className="gradient-divider absolute top-0 left-0 right-0" />

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 right-1/4 w-[550px] h-[550px] rounded-full blur-3xl opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] rounded-full blur-3xl opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, #00D8FF 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-x relative z-10">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-4 text-foreground"
        >
          India as the Neutral Global Convener
        </motion.h2>
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-6 text-muted-foreground max-w-2xl leading-relaxed"
        >
          Unlike bilateral summits or bloc-based conferences, Lokakṣema positions India as a
          trusted multilateral convener. We bring together stakeholders from the Global North
          and South for balanced, inclusive dialogue that transcends geopolitical divisions.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            {
              t: "Innovation",
              d: "Frontier research, reproducible methodologies, and deployable pilots that transform theoretical breakthroughs into real-world solutions.",
            },
            {
              t: "Governance",
              d: "Policy frameworks that balance technological advancement with ethical safeguards, ensuring AI development serves humanity responsibly.",
            },
            {
              t: "Impact",
              d: "Real-world solutions reaching communities most in need, with measurable outcomes and sustainable deployment models.",
            },
          ].map((x) => (
            <motion.div
              key={x.t}
              className="bg-[rgba(18,18,29,0.6)] backdrop-blur-[16px] border border-white/[0.08] rounded-2xl p-6 transition-all duration-300 hover:border-white/[0.15] hover:shadow-[0_8px_32px_rgba(108,99,255,0.15),0_2px_8px_rgba(0,216,255,0.1)] hover:-translate-y-0.5"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {x.t}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{x.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
