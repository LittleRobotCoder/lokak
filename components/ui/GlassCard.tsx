import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: ReactNode;
};

export function GlassCard({ className, children }: Props) {
  return (
    <div className={cn("nebula-glass relative rounded-2xl p-6 md:p-8", className)}>
      {children}
    </div>
  );
}
