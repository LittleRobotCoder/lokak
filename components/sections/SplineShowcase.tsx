"use client";
import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

// Shimmer skeleton placeholder while Spline loads
function SplineSkeleton() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-purple-900/20">
      <div
        className="w-full h-full animate-shimmer"
        style={{
          background:
            "linear-gradient(90deg, rgba(139,92,246,0.1) 0%, rgba(99,102,241,0.2) 50%, rgba(139,92,246,0.1) 100%)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
}

export default function SplineShowcase() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSplineLoad = () => {
    setIsLoaded(true);
  };

  const handleSplineError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none">
      {/* Background effects: gradient + glow blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Spline 3D Scene - positioned on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-full md:w-1/2 h-full overflow-visible px-6 md:px-10 py-10">
        {!hasError ? (
          <Suspense fallback={<SplineSkeleton />}>
            <Spline
              scene="https://prod.spline.design/SbfEpZPrZUQzk973/scene.splinecode"
              onLoad={handleSplineLoad}
              onError={handleSplineError}
              style={{
                width: "100%",
                padding: "1rem",
                height: "100%",
                pointerEvents: "none",
                transform: "scale(0.9)",
                transformOrigin: "center",
              }}
            />
          </Suspense>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6 opacity-50">
              <p className="text-sm text-neutral-500">3D scene unavailable</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
