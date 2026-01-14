"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import SplashScreen from "@/components/SplashScreen";
import Image from "next/image";
import purpleStar from "@/components/elements/purpleStar.png";
import purpleMilkyWay from "@/components/elements/purpleMilkyWay.png";
import HeroModelFallback from "@/components/hero/HeroModelFallback";
import useWebGLSupport from "@/components/hero/useWebGLSupport";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { EditorialIntro } from "@/components/sections/EditorialIntro";
import { MissionVision } from "@/components/sections/MissionVision";
import { IndiaConvener } from "@/components/sections/IndiaConvener";
import { DecisionCTA } from "@/components/sections/DecisionCTA";
import { AgendaPreview } from "@/components/sections/AgendaPreview";
import { StatsGrid } from "@/components/sections/StatsGrid";
import { ThreePathways } from "@/components/sections/ThreePathways";
import { Partners } from "@/components/sections/Partners";
import { FAQSection } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import SectionDivider from "@/components/ui/SectionDivider";
import { cn } from "@/lib/utils";

const GlassKnotScene = dynamic(
  () => import("@/components/hero/GlassKnotScene"),
  { ssr: false }
);

// ============================================================================
// Constants
// ============================================================================

const SPLASH_TRANSITION_DELAY = 500;
const NAVBAR_ANIMATION_DELAY = 100;

const GLOW_COLORS = {
  violet: "radial-gradient(circle, #6C63FF 0%, transparent 70%)",
  purple: "radial-gradient(circle, #402A95 0%, transparent 70%)",
  cyan: "radial-gradient(circle, #00D8FF 0%, transparent 70%)",
} as const;

// ============================================================================
// Animation Variants
// ============================================================================

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const modelVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const modelTransition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

// ============================================================================
// Components
// ============================================================================

function GlowBlob({
  className,
  style,
}: {
  className: string;
  style: { background: string };
}) {
  return (
    <div
      className={cn("absolute rounded-full blur-3xl", className)}
      style={style}
    />
  );
}

// ============================================================================
// Main Component
// ============================================================================

export default function HomeLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const webglSupported = useWebGLSupport();

  const handleSplashComplete = () => {
    setTimeout(() => {
      setTimeout(() => setShowSplash(false), NAVBAR_ANIMATION_DELAY);
    }, SPLASH_TRANSITION_DELAY);
  };

  return (
    <main className="overflow-x-hidden">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col justify-between items-center overflow-visible">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-background/85" />
        </div>
        {/* Background Glow Layers */}
        <div className="absolute inset-0 pointer-events-none overlay-top">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/60" />
        </div>
        <Image
          src={purpleMilkyWay}
          alt=""
          aria-hidden="true"
          className="w-full h-full z-[-10] absolute top-0 left-0 object-cover opacity-[0.32] blur-[2px]"
          priority={false}
        />

        {/* Container Grid */}
        <div className="container-x relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[100svh] pt-24 sm:pt-28 pb-16 lg:py-24">
            {/* LEFT Column: 3D Model + Glow */}
            <motion.div
              className="relative order-2 lg:order-1 flex items-center justify-center"
              initial="hidden"
              animate={!showSplash ? "visible" : "hidden"}
              variants={modelVariants}
              transition={modelTransition}
            >
              <div className="relative w-full max-w-[560px] mx-auto">
                {/* Glow blobs behind model */}
                <div className="absolute inset-0 -z-10">
                  <GlowBlob
                    className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.35]"
                    style={{ background: GLOW_COLORS.violet }}
                  />
                  <GlowBlob
                    className="top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] opacity-[0.25]"
                    style={{ background: GLOW_COLORS.purple }}
                  />
                  <GlowBlob
                    className="bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] opacity-[0.22]"
                    style={{ background: GLOW_COLORS.cyan }}
                  />
                </div>

                {/* 3D Model Container with safe area */}
                <div className="relative w-full aspect-square min-h-[320px] sm:min-h-[380px] lg:min-h-[560px] overflow-visible">
                  <Image
                    src={purpleStar}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -bottom-8 right-4 z-[10] w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain opacity-[0.34] blur-sm [filter:drop-shadow(0_0_30px_rgba(108,99,255,0.25))]"
                    priority={false}
                  />
                  <div className="relative h-full w-full overflow-visible p-4 sm:p-6">
                    <div className="absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 scale-100 md:scale-[1.05]">
                      {!webglSupported ? (
                        <HeroModelFallback />
                      ) : (
                        <ErrorBoundary fallback={<HeroModelFallback />}>
                          <GlassKnotScene />
                        </ErrorBoundary>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT Column: Text + CTAs */}
            <motion.div
              className="order-1 lg:order-2 space-y-6"
              initial="hidden"
              animate={!showSplash ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {/* Kicker Badge */}
              <motion.div variants={itemVariants}>
                <div className="glass inline-flex items-center rounded-full px-4 py-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    New Delhi • Q4 2026 • Bharat Mandapam
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.1] text-foreground text-balance"
              >
                Where AI Meets{" "}
                <span className="bg-gradient-to-br from-[#6C63FF] to-[#402A95] bg-clip-text text-transparent">
                  Humanity&apos;s Future
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
              >
                Lokakṣema 2026: The Global AI Well-being Summit. Convening world
                leaders, researchers, and innovators to ensure artificial
                intelligence serves the welfare of all.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3 pt-2"
              >
                <Button href="/register" className="min-h-[48px] rounded-full w-full sm:w-auto">
                  Register for Summit
                </Button>
                <Button
                  href="/sponsorship"
                  variant="outline"
                  className="min-h-[48px] rounded-full w-full sm:w-auto"
                >
                  Become a Sponsor
                </Button>
                <Button
                  href="/hackathon"
                  variant="outline"
                  className="min-h-[48px] rounded-full w-full sm:w-auto"
                >
                  Join the Hackathon
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sections below hero */}
      <EditorialIntro />
      <SectionDivider />
      <MissionVision />
      <SectionDivider />
      <IndiaConvener />
      <SectionDivider />
      <DecisionCTA />
      <SectionDivider />
      <AgendaPreview />
      <SectionDivider />
      <StatsGrid />
      <SectionDivider />
      <ThreePathways />
      <SectionDivider />
      <Partners />
      <SectionDivider />
      <FAQSection />
      <SectionDivider />
      <FinalCTA />
    </main>
  );
}
