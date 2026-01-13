"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import SplashScreen from "@/components/SplashScreen";
import AboutSection from "@/components/sections/About";
import WhySection from "@/components/sections/Why";
import ByNumbersSection from "@/components/sections/ByNumbers";
import FeaturedTracksSection from "@/components/sections/FeaturedTracks";
import CTAJoinSection from "@/components/sections/CTAJoin";
import Spline from "@splinetool/react-spline";
import { cn } from "@/lib/utils";

// ============================================================================
// Constants
// ============================================================================

const SPLINE_SCENE_URL =
  "https://prod.spline.design/SbfEpZPrZUQzk973/scene.splinecode";

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

const splineVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const splineTransition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

// ============================================================================
// Components
// ============================================================================

function SplineSkeleton() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-purple-900/20 animate-shimmer rounded-3xl" />
  );
}

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
  const [splineError, setSplineError] = useState(false);

  const handleSplashComplete = () => {
    setTimeout(() => {
      setTimeout(() => setShowSplash(false), NAVBAR_ANIMATION_DELAY);
    }, SPLASH_TRANSITION_DELAY);
  };

  const handleSplineError = () => {
    setSplineError(true);
  };

  return (
    <main>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center overflow-visible">
        {/* Background Glow Layers */}
        <div className="absolute inset-0 pointer-events-none overlay-top">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/60" />
        </div>

        {/* Container Grid */}
        <div className="container-x relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[100svh] pt-28 pb-16 lg:py-24">
            {/* LEFT Column: Spline + Glow */}
            <motion.div
              className="relative order-2 lg:order-1 flex items-center justify-center"
              initial="hidden"
              animate={!showSplash ? "visible" : "hidden"}
              variants={splineVariants}
              transition={splineTransition}
            >
              <div className="relative w-full max-w-[560px] aspect-square p-6 md:p-10">
                {/* Glow blobs behind Spline */}
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

                {/* Spline Container with safe area */}
                <div className="relative z-10 w-full h-full pointer-events-none overflow-visible">
                  <div className="absolute -inset-10 md:-inset-16 lg:-inset-20">
                    <div className="relative w-full h-full">
                      {!splineError ? (
                        <Suspense fallback={<SplineSkeleton />}>
                          <Spline
                            scene={SPLINE_SCENE_URL}
                            onError={handleSplineError}
                            style={{
                              width: "100%",
                              height: "100%",
                              pointerEvents: "none",
                            }}
                          />
                        </Suspense>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-sm text-muted-foreground opacity-50">
                            3D scene unavailable
                          </p>
                        </div>
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
                className="text-4xl md:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.1] text-foreground"
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
                <Button href="/register" className="min-h-[48px] rounded-full">
                  Register for Summit
                </Button>
                <Button
                  href="/sponsorship"
                  variant="outline"
                  className="min-h-[48px] rounded-full"
                >
                  Become a Sponsor
                </Button>
                <Button
                  href="/hackathon"
                  variant="outline"
                  className="min-h-[48px] rounded-full"
                >
                  Join the Hackathon
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sections below hero */}
      <AboutSection />
      <WhySection />
      <ByNumbersSection />
      <FeaturedTracksSection />
      <CTAJoinSection />
    </main>
  );
}
