import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "@/components/ui/Chip";
import Button from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Briefcase, GraduationCap, Users } from "lucide-react";

const options = [
  {
    icon: Users,
    title: "Attend the Summit",
    description: "Join global leaders shaping responsible AI across policy, research, and industry.",
    href: "/register",
    variant: "filled" as const,
  },
  {
    icon: Briefcase,
    title: "Become a Sponsor",
    description: "Showcase your organization and connect with top decision-makers and innovators.",
    href: "/sponsorship",
    variant: "outline" as const,
  },
  {
    icon: GraduationCap,
    title: "Join the Hackathon",
    description: "Build solutions with world-class mentors and advance AI for humanity.",
    href: "/hackathon",
    variant: "outline" as const,
  },
];

export function DecisionCTA() {
  return (
    <Section className="scroll-mt-28">
      <div className="glow-violet absolute -top-20 -left-32 opacity-10" />
      <div className="glow-cyan absolute -bottom-28 -right-20 opacity-10" />

      <div className="relative z-10 text-center mb-10">
        <Chip className="mb-4">Choose Your Path</Chip>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">
          Choose Your Path
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Whether you want to attend, sponsor, or build, there&apos;s a clear way to participate.
        </p>
      </div>

      <div className="relative z-10 grid gap-6 md:grid-cols-3">
        {options.map((option) => (
          <GlassCard key={option.title} className="h-full">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <option.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">{option.title}</h3>
            <p className="text-sm text-muted-foreground mb-6">{option.description}</p>
            <Button href={option.href} variant={option.variant}>
              {option.variant === "filled" ? "Register Now" : "Learn More"}
            </Button>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
