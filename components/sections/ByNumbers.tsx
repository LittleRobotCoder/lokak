"use client";

import { motion } from "framer-motion";

const STATS: Array<[string, string]> = [
  ["10,000+", "Global Participants"],
  ["30+", "Countries Represented"],
  ["1,000+", "Hackathon Teams"],
  ["$1M+", "Investment in Innovation"],
  ["50+", "Tier-1 Media Partners"],
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

export default function ByNumbers() {
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
          className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/2 right-1/3 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.08]"
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
          className="mb-6 text-foreground"
        >
          Global Scale, Human Focus
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {STATS.map(([value, label]) => (
            <motion.div
              key={label}
              className="bg-[rgba(18,18,29,0.6)] backdrop-blur-[16px] border border-white/[0.08] rounded-2xl p-6 text-center transition-all duration-300 hover:border-white/[0.15] hover:shadow-[0_8px_32px_rgba(108,99,255,0.15),0_2px_8px_rgba(0,216,255,0.1)] hover:-translate-y-0.5"
              variants={itemVariants}
            >
              <div className="text-3xl font-semibold text-foreground mb-2">
                {value}
              </div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
