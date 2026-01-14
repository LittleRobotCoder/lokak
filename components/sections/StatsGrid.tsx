import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { PatternOverlay } from "@/components/brand/PatternOverlay";

const stats = [
  { number: "10,000+", label: "Global Participants" },
  { number: "30+", label: "Countries Represented" },
  { number: "1,000+", label: "Hackathon Teams" },
  { number: "$1M+", label: "Investment in Innovation" },
  { number: "50+", label: "Tier-1 Media Partners" },
  { number: "100+", label: "Expert Speakers" },
];

export const StatsGrid = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-120px" },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <Section id="stats" className="scroll-mt-28">
      <PatternOverlay placement="full" opacity={0.05} fade="center" />
      {/* Ambient glows */}
      <div className="glow-violet absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-10" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
          Global Scale,{" "}
          <span className="text-gradient-violet">Human Focus</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The numbers behind the world&apos;s most ambitious AI governance summit.
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <GlassCard className="text-center py-8 md:py-10 group">
              {/* Number */}
              <div className="stat-number mb-2 group-hover:scale-105 transition-transform">
                {stat.number}
              </div>

              {/* Label */}
              <p className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-1/2 transition-all duration-300" />
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
