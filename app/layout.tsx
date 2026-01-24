"use client";


// app/layout.tsx
import "./globals.css";
import "@/styles/prose.css";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { defaultMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import RightClickMenu from "@/components/ui/RightClickMenu";
import CardGlow from "@/components/ui/CardGlow";
import AppShell from "@/components/AppShell"; // new wrapper
import SplashScreen from "@/components/SplashScreen"; // adjust path if needed
import { useState, useEffect } from "react";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	"name": "Lokaksema",
	"url": "https://lokaksema.org",
	"logo": "/images/logo.png"
};



export default function RootLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const [showSplash, setShowSplash] = useState(true);
	useEffect(() => {
		const timer = setTimeout(() => setShowSplash(false), 3400); 
		return () => clearTimeout(timer);
	}, []);

	return (
		<html lang="en">
			<head>
				{/* Favicon / icons (swap with your own if needed) */}
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				{/* Preload above-the-fold media for faster LCP */}
				<link rel="preload" as="image" href="/media/hero-fallback.webp" />
				<link rel="preload" as="video" href="/media/hero.mp4" type="video/mp4" />
				{/* Site fonts: Poppins */}
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				/>
				{/* Structured data */}
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			</head>
			<body className="bg-[#0a0b12] text-white antialiased">
				
				{/* Skip link for a11y */}
				<a
					href="#main"
					className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-black"
				>
					Skip to content
				</a>

				<AnimatePresence>
					{pathname === "/" && showSplash && (
						<motion.div
							key="splash"
							initial={{ opacity: 1 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.6, ease: "easeInOut" }}
							className="fixed inset-0 z-[100] bg-[#0a0b12]" // or your splash styling
						>
							<SplashScreen />
						</motion.div>
					)}
				</AnimatePresence>

				<AnimatePresence>
                    {pathname !== "/" && showSplash && (
                        <motion.div
                            key="splash"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1, ease: "easeInOut" }}
                            className="fixed inset-0 z-[100] bg-[#0a0b12]"
                        >
                            <SplashScreen />
                        </motion.div>
                    )}
                </AnimatePresence>

				<AppShell>
					<CardGlow />
					<Navbar />
					<SmoothScrollProvider>
					{/* pad for fixed nav */}
					<main id="main">{children}</main>
					<Footer />
					</SmoothScrollProvider>
					<RightClickMenu />
				</AppShell>
				
			</body>
		</html>
	);
}
