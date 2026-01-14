import { cn } from "@/lib/utils";

type AspectRatio = "video" | "square" | "portrait";

type Props = {
  aspectRatio?: AspectRatio;
  label?: string;
  className?: string;
};

export function ImagePlaceholder({
  aspectRatio = "video",
  label = "Image Placeholder",
  className,
}: Props) {
  const ratios: Record<AspectRatio, string> = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-primary/15 via-transparent to-accent/10 text-xs uppercase tracking-widest text-muted-foreground",
        ratios[aspectRatio],
        className
      )}
    >
      {label}
    </div>
  );
}
