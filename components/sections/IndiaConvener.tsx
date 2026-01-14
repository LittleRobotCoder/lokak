import { motion } from "framer-motion";
import { Lightbulb, Shield, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "../ui/Chip";

const pillars = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Frontier research, reproducible methodologies, and deployable pilots that transform theoretical breakthroughs into real-world solutions.",
  },
  {
    icon: Shield,
    title: "Governance",
    description:
      "Policy frameworks that balance technological advancement with ethical safeguards, ensuring AI development serves humanity responsibly.",
  },
  {
    icon: Sparkles,
    title: "Impact",
    description:
      "Real-world solutions reaching communities most in need, with measurable outcomes and sustainable deployment models.",
  },
];

export const IndiaConvener = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-120px" },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <Section id="convener" className="scroll-mt-28">
      {/* Ambient glow */}
      <div className="glow-cyan absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-10" />

      {/* Editorial block with accent border */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 pl-6 md:pl-8 mb-16"
      >
        {/* Vertical gradient accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-primary via-accent to-primary/30" />

        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
          India as the Neutral Global Convener
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          Bridging the Global North and South, India offers a unique perspective
          on technology development that balances innovation with inclusivity.
          As the world&apos;s largest democracy and fastest-growing major economy,
          India stands at the crossroads of tradition and transformation.
        </p>

        {/* Mini-chip row */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Chip variant="cyan">Global North</Chip>
          <span className="text-muted-foreground self-center">+</span>
          <Chip variant="cyan">Global South</Chip>
          <span className="text-muted-foreground self-center">=</span>
          <Chip>Unified Vision</Chip>
        </div>
      </motion.div>

      {/* Feature cards grid */}
      <div className="relative z-10 grid md:grid-cols-3 gap-6">
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassCard className="h-full text-center group">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <pillar.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
