import { cn } from "@/lib/utils";

type BrandOrnamentProps = {
  position: "tl" | "tr" | "bl" | "br";
  size: number;
  opacity?: number;
  rotate?: number;
};

const positionClasses: Record<BrandOrnamentProps["position"], string> = {
  tl: "top-0 left-0 -translate-x-1/3 -translate-y-1/3",
  tr: "top-0 right-0 translate-x-1/3 -translate-y-1/3",
  bl: "bottom-0 left-0 -translate-x-1/3 translate-y-1/3",
  br: "bottom-0 right-0 translate-x-1/3 translate-y-1/3",
};

export function BrandOrnament({
  position,
  size,
  opacity = 0.08,
  rotate = 0,
}: BrandOrnamentProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute z-0 pointer-events-none select-none mix-blend-normal",
        positionClasses[position]
      )}
      style={{ width: size, height: size, opacity }}
    >
      <img
        src="/brand/ornament-star.svg"
        alt=""
        className="w-full h-auto blur-[0.5px]"
        style={{ transform: `rotate(${rotate}deg)` }}
      />
    </div>
  );
}
