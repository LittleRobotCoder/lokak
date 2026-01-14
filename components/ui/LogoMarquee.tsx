"use client";

import { useMemo, useState } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/utils";

type Props = {
  logos: string[];
  className?: string;
};

export default function LogoMarquee({ logos, className }: Props) {
  const [paused, setPaused] = useState(false);
  const items = useMemo(() => [...logos, ...logos], [logos]);
  const duration = Math.max(16, logos.length * 2);

  return (
    <div
      className={cn(
        "logo-marquee-wrap relative w-full",
        paused ? "overflow-x-auto cursor-grab" : "overflow-hidden",
        className
      )}
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerCancel={() => setPaused(false)}
      onPointerLeave={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background via-background/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background via-background/70 to-transparent" />

      <div
        className={cn(
          "logo-marquee-track flex w-max items-center gap-4 py-2",
          paused && "animation-paused"
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {items.map((label, index) => (
          <div
            key={`${label}-${index}`}
            className="min-w-[180px] sm:min-w-[200px] opacity-70 transition-opacity hover:opacity-100"
          >
            <ImagePlaceholder
              aspectRatio="video"
              label={label}
              className="h-14 w-full text-[10px]"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .logo-marquee-track {
          animation-name: logo-marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .animation-paused {
          animation-play-state: paused;
        }
        @keyframes logo-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-marquee-wrap {
            overflow-x: auto;
          }
          .logo-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
