import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Chip } from "../ui/Chip";
import { BrandOrnament } from "@/components/brand/BrandOrnament";

export const EditorialIntro = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-120px" },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <Section id="overview" className="scroll-mt-28">
      <BrandOrnament position="tl" size={420} opacity={0.08} rotate={-12} />
      {/* Ambient glow */}
      <div className="glow-violet absolute -top-20 -left-40 w-[500px] h-[500px] opacity-10" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6 leading-tight">
            More Than a Summit—
            <span className="text-gradient-violet block mt-1">
              A Catalyst for Global Transformation
            </span>
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Lokakṣema 2026 brings together heads of state, industry pioneers,
            civil society leaders, and innovators from across the globe to forge
            consensus on AI&apos;s most pressing challenges. This isn&apos;t a
            conference—it&apos;s a movement to ensure technology serves humanity&apos;s
            highest aspirations.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            From binding governance frameworks to breakthrough innovations,
            Lokakṣema creates the space where theory becomes action. Join
            10,000+ delegates in shaping the future of responsible AI at the
            world&apos;s most ambitious gathering on artificial intelligence.
          </p>
        </motion.div>

        {/* Image card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard className="overflow-hidden p-0">
            <ImagePlaceholder
              aspectRatio="video"
              label="Summit Preview"
              className="rounded-t-xl rounded-b-none"
            />
            <div className="p-4 flex items-center justify-between">
              <Chip>Utopian Space × SHV Groups</Chip>
              <span className="text-xs text-muted-foreground">
                Official Partners
              </span>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </Section>
  );
};
