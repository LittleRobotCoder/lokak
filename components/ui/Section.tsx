import { ReactNode } from "react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, className, children }: Props) {
  return (
    <section id={id} className={cn("relative overflow-hidden py-20 md:py-28", className)}>
      <Container className="relative">{children}</Container>
    </section>
  );
}
