import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function ModelFrame({ children, className }: Props) {
  return (
    <div
      className={cn(
        "relative rounded-3xl border border-[hsl(var(--border))] bg-black/10 shadow-[0_0_60px_rgba(99,102,241,0.18)]",
        className
      )}
    >
      <div className="rounded-3xl overflow-hidden">
        <div className="relative p-10 md:p-12 lg:p-14">
          <div className="aspect-square md:aspect-[5/4] lg:aspect-[4/3] w-full min-h-[340px] md:min-h-[460px] lg:min-h-[560px]">
            <div className="relative h-full w-full flex items-center justify-center overflow-visible">
              <div className="relative h-full w-full origin-center scale-[0.92] md:scale-[0.9] lg:scale-[0.88] [filter:contrast(1.08)_saturate(1.05)_brightness(0.98)_drop-shadow(0_0_22px_rgba(108,99,255,0.25))_drop-shadow(0_0_36px_rgba(0,216,255,0.18))]">
                {children}
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(108,99,255,0.5),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(0,216,255,0.45),transparent_60%)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
