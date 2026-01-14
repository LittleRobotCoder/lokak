import Image from "next/image";
import Link from "next/link";

const COL1 = [
  { name: "About", href: "/about" },
  { name: "Summit", href: "/summit" },
  { name: "Agenda", href: "/summit/agenda" },
  { name: "Hackathon", href: "/hackathon" },
];

const COL2 = [
  { name: "Sponsorship", href: "/sponsorship" },
  { name: "Legacy & Impact", href: "/legacy-impact" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const LEGAL = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
];

const QUICK_LINKS = [
  { name: "Overview", href: "/#overview" },
  { name: "Mission", href: "/#mission-vision" },
  { name: "Tracks", href: "/#tracks" },
  { name: "Stats", href: "/#stats" },
  { name: "Partners", href: "/#partners" },
  { name: "FAQ", href: "/#faq" },
  { name: "Register", href: "/#register" },
];

export default function Footer() {
  return (
    <footer className="relative z-30 mt-24 border-t border-white/10 bg-[#07080f]">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Lokaksema" width={152} height={38} className="h-6 w-auto" />
              <span className="font-semibold">Lokaksema 2026</span>
            </div>
            <p className="text-sm text-neutral-300 max-w-sm">
              Where AI Serves Humanity. Bharat Mandapam, New Delhi - Q4 2026.
            </p>
            <p className="text-xs text-neutral-400">
              Organized by SHV Groups - In partnership with Utopian Space (SHV Creative Labs)
            </p>
            <div className="mt-4 text-xs text-neutral-400 space-y-2">
              <div>
                <span className="text-neutral-300">Contact:</span>{" "}
                <span>hello@lokaksema.org</span>
              </div>
              <div>
                <span className="text-neutral-300">Location:</span>{" "}
                <span>New Delhi, Bharat Mandapam</span>
              </div>
              <div className="flex gap-4">
                <Link className="hover:opacity-80" href="#">
                  X
                </Link>
                <Link className="hover:opacity-80" href="#">
                  LinkedIn
                </Link>
                <Link className="hover:opacity-80" href="#">
                  YouTube
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-neutral-200">Program</h4>
            <ul className="space-y-2 text-sm">
              {COL1.map((i) => (
                <li key={i.name}>
                  <Link className="hover:opacity-80" href={i.href}>
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-neutral-200">Explore</h4>
            <ul className="space-y-2 text-sm">
              {COL2.map((i) => (
                <li key={i.name}>
                  <Link className="hover:opacity-80" href={i.href}>
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-neutral-200">Quick Links</h4>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {QUICK_LINKS.map((i) => (
                  <li key={i.name}>
                    <Link className="hover:opacity-80" href={i.href}>
                      {i.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-neutral-200">Stay Updated</h4>
            <form action="/api/newsletter" method="post" className="flex gap-2">
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm placeholder:text-neutral-500"
              />
              <button className="rounded-lg bg-white text-black px-3 py-2 text-sm font-medium hover:bg-neutral-200 transition">
                Subscribe
              </button>
            </form>
            <div className="mt-3 text-xs text-neutral-500">
              By subscribing you agree to our{" "}
              <Link className="underline hover:opacity-80" href="/privacy">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            (c) {new Date().getFullYear()} SHV Groups. All rights reserved.
          </p>
          <ul className="flex gap-6 text-xs text-neutral-400">
            {LEGAL.map((i) => (
              <li key={i.name}>
                <Link className="hover:opacity-80" href={i.href}>
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-center text-[11px] text-neutral-500">
          <em>Footer Tagline:</em> Lokaksema 2026 - Where AI Serves Humanity
        </p>
      </div>
    </footer>
  );
}
