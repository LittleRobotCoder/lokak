import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { BrandOrnament } from "@/components/brand/BrandOrnament";
import { PatternOverlay } from "@/components/brand/PatternOverlay";

export const FinalCTA = () => {
  return (
    <Section id="register" className="pb-32 scroll-mt-28">
      <BrandOrnament position="br" size={520} opacity={0.08} rotate={10} />
      <PatternOverlay
        placement="right"
        opacity={0.03}
        fade="left"
        scale={1.1}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative z-10"
      >
        <GlassCard className="text-center py-16 md:py-20 px-8 md:px-16 max-w-4xl mx-auto overflow-visible">
          {/* Decorative gradient border */}
          <div className="absolute inset-0 rounded-xl p-px bg-gradient-to-br from-primary/20 via-transparent to-accent/10 border border-white/10 -z-10">
            <div className="w-full h-full rounded-xl bg-nebula-elevated backdrop-blur-xl" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Your Voice Shapes
            <span className="text-gradient-violet block">AI&apos;s Future</span>
          </h2>

          {/* Supporting text */}
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 text-lg">
            Join world leaders, innovators, and changemakers in New Delhi this
            February. Together, we&apos;ll forge the frameworks that ensure AI serves
            humanity—not the other way around. This is your invitation to be
            part of history.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              as="button"
              className="hero-button-primary group min-w-[220px]"
            >
              Register for Summit
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              as="button"
              variant="outline"
              className="hero-button-outline min-w-[220px]"
            >
              Explore Partnership Opportunities
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-xs text-muted-foreground mb-4">
              Trusted by leading organizations worldwide
            </p>
            <div className="flex items-center justify-center gap-8 opacity-50">
              <div className="w-20 h-6 bg-white/10 rounded" />
              <div className="w-24 h-6 bg-white/10 rounded" />
              <div className="w-16 h-6 bg-white/10 rounded" />
              <div className="w-20 h-6 bg-white/10 rounded hidden sm:block" />
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </Section>
  );
};
