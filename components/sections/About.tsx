"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

export default function AboutSection() {
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
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #00D8FF 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-x relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 variants={itemVariants} className="mb-4 text-foreground">
            More Than a Summit—A Catalyst for Global Transformation
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mb-4 text-muted-foreground max-w-2xl leading-relaxed"
          >
            Lokakṣema 2026 represents the premier platform where governments, industry leaders,
            researchers, and communities unite to solve humanity&apos;s most pressing challenges
            through responsible AI innovation.
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="mb-6 text-muted-foreground max-w-2xl leading-relaxed"
          >
            Organized by SHV Groups and powered by Utopian Space, we&apos;re building bridges
            between research and reality, policy and practice, vision and action.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            {
              title: "Mission Statement",
              content:
                "To accelerate the deployment of responsible AI solutions for global good by connecting research, policy, industry, and communities in meaningful collaboration.",
            },
            {
              title: "Vision Statement",
              content:
                "By 2030, Lokakṣema will define the global standard for responsible AI governance—the forum where artificial intelligence advances equity, justice, and sustainable prosperity for all nations.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="bg-[rgba(18,18,29,0.6)] backdrop-blur-[16px] border border-white/[0.08] rounded-2xl p-6 transition-all duration-300 hover:border-white/[0.15] hover:shadow-[0_8px_32px_rgba(108,99,255,0.15),0_2px_8px_rgba(0,216,255,0.1)] hover:-translate-y-0.5"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.content}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
