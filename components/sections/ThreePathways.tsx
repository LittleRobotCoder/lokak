import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "@/components/ui/Chip";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CheckCircle2 } from "lucide-react";

const pathways = [
  {
    title: "Technical & Research Deep Dive",
    description:
      "Advancing foundation models, MLOps, and reproducibility standards. Each session paired with open-source artifact releases to maximize global impact and accelerate research collaboration.",
    tag: "Research",
    imageLabel: "Research Track",
  },
  {
    title: "Business Strategy & Investment",
    description:
      "Linking innovation to markets through documented case studies, investor roundtables, and structured deal rooms. Where commercial viability meets social responsibility.",
    tag: "Investment",
    imageLabel: "Investment Track",
  },
  {
    title: "Policy, Ethics & Society",
    description:
      "Developing governance frameworks, procurement standards, and ethical principles that work across diverse regulatory environments and cultural contexts.",
    tag: "Policy",
    imageLabel: "Policy Track",
  },
];

export const ThreePathways = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-120px" },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <Section id="tracks" className="scroll-mt-28">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-16"
      >
        <Chip className="mb-4">Core Themes</Chip>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
          Three Pathways to{" "}
          <span className="text-gradient-violet">Responsible AI</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our summit agenda is structured around three interconnected tracks,
          each designed to produce actionable outcomes.
        </p>
      </motion.div>

      {/* Pathway rows */}
      <div className="relative z-10 space-y-12 md:space-y-16">
        {pathways.map((pathway, index) => {
          const isEven = index % 2 === 1;

          return (
            <motion.div
              key={pathway.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text content */}
              <div className={isEven ? "lg:order-2" : ""}>
                <GlassCard>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                    {pathway.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {pathway.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/90">
                        {pathway.tag}
                      </span>
                    </li>
                  </ul>
                </GlassCard>
              </div>

              {/* Image */}
              <div className={isEven ? "lg:order-1" : ""}>
                <div className="relative">
                  {/* Glow behind image */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-radial-violet opacity-30 blur-2xl" />

                  <ImagePlaceholder
                    aspectRatio="video"
                    label={pathway.imageLabel ?? "Pathway Visual"}
                    className="relative z-10 border border-white/10 shadow-glass"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};
