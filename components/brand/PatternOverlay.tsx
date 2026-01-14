import { cn } from "@/lib/utils";

type PatternOverlayProps = {
  opacity?: number;
  scale?: number;
  placement?: "left" | "right" | "full";
  fade?: "left" | "right" | "center";
};

const placementClasses: Record<
  NonNullable<PatternOverlayProps["placement"]>,
  string
> = {
  left: "left-0 top-0 bottom-0 w-[60%]",
  right: "right-0 top-0 bottom-0 w-[60%]",
  full: "inset-0",
};

const fadeClasses: Record<NonNullable<PatternOverlayProps["fade"]>, string> = {
  left: "brand-mask-left",
  right: "brand-mask-right",
  center: "brand-mask-center",
};

export function PatternOverlay({
  opacity = 0.05,
  scale = 1,
  placement = "full",
  fade = "center",
}: PatternOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "brand-layer bg-[url('/brand/pattern-orbits.png')] bg-repeat mix-blend-normal",
        placementClasses[placement],
        fadeClasses[fade]
      )}
      style={{ opacity, backgroundSize: `${scale * 100}% auto` }}
    />
  );
}
