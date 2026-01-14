import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";
import LogoMarquee from "@/components/ui/LogoMarquee";

const logos = Array.from({ length: 8 }, (_, index) => `Logo ${index + 1}`);

export function Partners() {
  return (
    <Section id="partners" className="scroll-mt-28">
      <div className="glow-cyan absolute -top-24 -left-32 opacity-10" />
      <div className="relative z-10 text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">
          Trusted by leading organizations worldwide
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A global coalition of partners supporting responsible AI innovation.
        </p>
      </div>

      <div className="relative z-10">
        <GlassCard className="p-4 md:p-6">
          <LogoMarquee logos={logos} />
        </GlassCard>
      </div>
    </Section>
  );
}
