"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";

const LINKS = [
  { id: "overview", label: "Overview" },
  { id: "mission-vision", label: "Mission" },
  { id: "tracks", label: "Tracks" },
  { id: "stats", label: "Stats" },
  { id: "partners", label: "Partners" },
  { id: "faq", label: "FAQ" },
  { id: "register", label: "Register" },
];

export default function StickySectionNav() {
  const [activeId, setActiveId] = useState<string>("overview");

  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-20 z-40 w-full px-4 md:px-6">
      <GlassCard className="mx-auto flex max-w-5xl items-center justify-center gap-4 px-4 py-2 text-xs md:text-sm">
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={cn(
              "relative px-2 py-1 text-muted-foreground transition-colors hover:text-foreground",
              activeId === link.id && "text-primary"
            )}
          >
            {activeId === link.id && (
              <span className="absolute inset-x-2 -bottom-1 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
            )}
            {link.label}
          </a>
        ))}
      </GlassCard>
    </div>
  );
}
