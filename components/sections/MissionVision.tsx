import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "../ui/Chip";

const cards = [
  {
    icon: Target,
    title: "Mission Statement",
    description:
      "To accelerate the deployment of responsible AI solutions for global good by connecting research, policy, industry, and communities in meaningful collaboration.",
  },
  {
    icon: Eye,
    title: "Vision Statement",
    description:
      "By 2030, Lokakṣema will define the global standard for responsible AI governance—the forum where artificial intelligence advances equity, justice, and sustainable prosperity for all nations.",
  },
];

export const MissionVision = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-120px" },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <Section id="mission-vision" className="scroll-mt-28">
      <div className="relative z-10 grid md:grid-cols-2 gap-6 lg:gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <GlassCard className="h-full group">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <card.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Kicker chip */}
              <Chip className="mb-4">{card.title}</Chip>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {card.description}
              </p>

              {/* Hover glow effect */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
