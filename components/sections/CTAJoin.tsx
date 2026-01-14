"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
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

export default function CTAJoinSection() {
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-[550px] h-[550px] rounded-full blur-3xl opacity-[0.06]"
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
            Your Voice Shapes AI&apos;s Future
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground max-w-2xl leading-relaxed mb-8"
          >
            Whether you&apos;re a policymaker crafting tomorrow&apos;s regulations, a researcher pushing technical
            boundaries, an industry leader building solutions, or a student imagining what&apos;s possible—your perspective matters.
            Join us in ensuring AI serves humanity&apos;s welfare, not undermines it.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            <Button href="/sponsorship" variant="outline">
              Explore Partnership Opportunities →
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
