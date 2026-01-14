"use client";

import type { ReactNode } from "react";

export default function AppShell({ children }: { children: ReactNode }) {
  // AppShell is a thin wrapper; splash handling is managed at the Root layout
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none select-none fixed inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[url('/brand/nebula-grain.png')] bg-cover opacity-[0.05] mix-blend-screen" />
        <div className="absolute inset-0 brand-vignette" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
