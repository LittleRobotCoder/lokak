import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "@/components/ui/Chip";
import { Section } from "@/components/ui/Section";

const days = [
  {
    title: "Day 1",
    date: "Date TBD",
    highlights: ["Opening keynotes & welcome", "Global policy forum", "Foundational AI research"],
  },
  {
    title: "Day 2",
    date: "Date TBD",
    highlights: ["Industry showcases", "Investment roundtables", "Responsible AI labs"],
  },
  {
    title: "Day 3",
    date: "Date TBD",
    highlights: ["Community impact tracks", "Hackathon finals", "Closing summit commitments"],
  },
];

export function AgendaPreview() {
  return (
    <Section id="agenda" className="scroll-mt-28">
      <div className="glow-violet absolute -top-24 -right-32 opacity-10" />
      <div className="relative z-10 text-center mb-10">
        <Chip className="mb-4">Preview</Chip>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">
          Agenda Preview
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A three-day journey designed to connect governance, research, and impact.
        </p>
      </div>

      <div className="relative z-10 grid gap-6 md:grid-cols-3">
        {days.map((day) => (
          <GlassCard key={day.title} className="h-full">
            <Chip className="mb-4">Preview</Chip>
            <div className="text-sm text-muted-foreground">{day.date}</div>
            <h3 className="text-xl font-semibold text-foreground mt-2 mb-4">{day.title}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {day.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
