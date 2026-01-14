import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "violet" | "cyan" | "default";

type Props = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function Chip({ variant = "default", className, children }: Props) {
  const base =
    "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-widest";
  const variants: Record<Variant, string> = {
    default: "border-white/10 bg-white/[0.04] text-muted-foreground",
    violet: "border-primary/30 bg-primary/10 text-primary",
    cyan: "border-accent/30 bg-accent/10 text-accent",
  };

  return <span className={cn(base, variants[variant], className)}>{children}</span>;
}
