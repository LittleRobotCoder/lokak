import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";

const faqs = [
  { q: "Who can attend?", a: "Researchers, policymakers, industry leaders, students, and community builders are all welcome." },
  { q: "How do I join the hackathon?", a: "Register for the hackathon track and form your team once applications open." },
  { q: "What sponsorship opportunities exist?", a: "We offer tiered partnerships across summit, hackathon, and innovation showcases." },
  { q: "Do you provide visa invitation letters?", a: "Yes. Confirmed delegates can request official invitation letters during registration." },
  { q: "Where is the venue and how do I plan travel?", a: "Lokaksema 2026 takes place at Bharat Mandapam, New Delhi. Travel guidance will be shared closer to the event." },
];

export function FAQSection() {
  return (
    <Section id="faq" className="scroll-mt-28">
      <div className="glow-violet absolute -top-24 -left-32 opacity-10" />
      <div className="relative z-10 text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">FAQ</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Quick answers to common questions about Lokaksema 2026.
        </p>
      </div>

      <div className="relative z-10 grid gap-4">
        {faqs.map((item) => (
          <GlassCard key={item.q} className="p-0">
            <details className="group px-6 py-5">
              <summary className="cursor-pointer list-none text-foreground font-medium flex items-center justify-between">
                {item.q}
                <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
            </details>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
