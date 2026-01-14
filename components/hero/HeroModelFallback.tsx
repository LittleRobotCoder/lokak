import Image from "next/image";
import purpleMilkyWay from "@/components/elements/purpleMilkyWay.png";

export default function HeroModelFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/10 bg-black/40">
      <Image
        src={purpleMilkyWay}
        alt=""
        aria-hidden="true"
        fill
        sizes="(max-width: 768px) 90vw, 560px"
        className="object-cover opacity-[0.28] blur-[6px]"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/40 to-background/90" />
      <div className="absolute -left-10 -top-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.35)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute -right-12 -bottom-10 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(0,216,255,0.25)_0%,transparent_70%)] blur-3xl" />
    </div>
  );
}
